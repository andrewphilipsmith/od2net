use std::f64;
use std::io::{BufReader, Cursor};

use anyhow::Result;
use fs_err::File;
use geojson::{Feature, FeatureReader, Value};
use mvt::{GeomEncoder, GeomType, MapGrid, Tile, TileId};
use pmtiles2::{util::tile_id, Compression, PMTiles, TileType};
use pointy::Transform;

fn main() -> Result<()> {
    let args: Vec<String> = std::env::args().collect();
    if args.len() != 2 {
        panic!("Pass in a .geojson file");
    }

    let zoom_levels: Vec<u8> = (0..10).collect();

    let reader = FeatureReader::from_reader(BufReader::new(File::open(&args[1])?));
    let pmtiles = geojson_to_pmtiles(reader, zoom_levels)?;
    let mut file = File::create("out.pmtiles")?;
    pmtiles.to_writer(&mut file)?;
    Ok(())
}

type PMTilesFile = PMTiles<Cursor<&'static [u8]>>;

fn geojson_to_pmtiles(reader: FeatureReader<BufReader<File>>, zoom_levels: Vec<u8>) -> Result<PMTilesFile> {
    // TODO Put these in an rtree or similar. For now, just read all at once.
    let mut features = Vec::new();
    for f in reader.features() {
        features.push(f?);
    }

    let bbox = calculate_bbox(&features);
    println!("bbox of {} features: {:?}", features.len(), bbox);

    for zoom in zoom_levels {
        let (x_min, y_min, x_max, y_max) = bbox_to_tiles(bbox, zoom);
        println!("for zoom {zoom}, we need tiles from x={x_min} to {x_max} and y={y_min} to {y_max}");
    }

    let mut pmtiles = PMTiles::new(TileType::Mvt, Compression::None);
    pmtiles.meta_data = Some(serde_json::json!(
        {
            "antimeridian_adjusted_bounds":"-180,-90,180,90",
            "vector_layers": [
            {
                "id": "layer1",
                "minzoom": 0,
                "maxzoom": 1,
                "fields": {
                    "key": "String"
                }
            }
            ]
        }
    ));
    pmtiles.min_latitude = -90.0;
    pmtiles.min_longitude = -180.0;
    pmtiles.max_latitude = 90.0;
    pmtiles.max_longitude = 180.0;
    pmtiles.center_zoom = 0;

    make_tile(TileId::new(0, 0, 0)?, &mut pmtiles, &features)?;

    Ok(pmtiles)
}

fn make_tile(
    current_tile_id: TileId,
    pmtiles: &mut PMTilesFile,
    features: &Vec<Feature>,
) -> Result<()> {
    let web_mercator_transform = MapGrid::default();
    let transform = web_mercator_transform.tile_transform(current_tile_id);
    let mut tile = Tile::new(4096);

    let mut layer = tile.create_layer("layer1");

    for feature in features {
        let mut b = GeomEncoder::new(GeomType::Linestring, Transform::default());

        if let Some(ref geometry) = feature.geometry {
            if let Value::LineString(ref line_string) = geometry.value {
                for pt in line_string {
                    // Transform to mercator
                    let mercator_pt = forward([pt[0], pt[1]]);
                    // Transform to 0-1 tile coords (not sure why this doesnt work with passing the
                    // transform through)
                    let transformed_pt = transform * (mercator_pt[0], mercator_pt[1]);
                    // Same as extent
                    b = b.point(transformed_pt.x * 4096.0, transformed_pt.y * 4096.0)?;
                }
            }
        }
        let id = layer.num_features() as u64;
        // The ownership swaps between layer and write_feature due to how feature properties are
        // encoded
        let mut write_feature = layer.into_feature(b.encode()?);
        write_feature.set_id(id);
        // TODO actual things
        write_feature.add_tag_string("key", "value");
        layer = write_feature.into_layer();
    }

    println!(
        "Added {} features into {}",
        layer.num_features(),
        current_tile_id
    );
    tile.add_layer(layer)?;

    pmtiles.add_tile(
        tile_id(
            current_tile_id.z() as u8,
            current_tile_id.x() as u64,
            current_tile_id.y() as u64,
        ),
        tile.to_bytes()?,
    );

    Ok(())
}

// WGS84 to Mercator
fn forward(c: [f64; 2]) -> [f64; 2] {
    static A: f64 = 6378137.0;
    static MAXEXTENT: f64 = 20037508.342789244;
    static D2R: f64 = f64::consts::PI / 180.0;

    [
        (A * c[0] * D2R).max(-MAXEXTENT).min(MAXEXTENT) as f64,
        (A * (((f64::consts::PI * 0.25f64) + (0.5f64 * c[1] * D2R)).tan()).ln())
            .max(-MAXEXTENT)
            .min(MAXEXTENT) as f64,
    ]
}

fn calculate_bbox(features: &Vec<Feature>) -> (f64, f64, f64, f64) {
    // TODO Convert to geo and just use something there?
    let mut min_lon = f64::MAX;
    let mut max_lon = f64::MIN;
    let mut min_lat = f64::MAX;
    let mut max_lat = f64::MIN;

    for f in features {
        if let Some(ref geometry) = f.geometry {
            if let Value::LineString(ref line_string) = geometry.value {
                for pt in line_string {
                    min_lon = min_lon.min(pt[0]);
                    min_lat = min_lon.min(pt[1]);
                    max_lon = max_lon.max(pt[0]);
                    max_lat = max_lon.max(pt[1]);
                }
            }
        }
    }

    (min_lon, min_lat, max_lon, max_lat)
}

// Via chatgpt, don't trust this yet. https://wiki.openstreetmap.org/wiki/Slippy_map_tilenames
// better reference.
fn bbox_to_tiles(bbox: (f64, f64, f64, f64), zoom: u8) -> (u32, u32, u32, u32) {
    let (min_lon, min_lat, max_lon, max_lat) = bbox;

    let num_tiles = 2u32.pow(zoom.into());

    let x_min = ((min_lon + 180.0) / 360.0 * num_tiles as f64).floor() as u32;
    let y_min = ((1.0 - (max_lat.to_radians().tan().sin() + 1.0) / 2.0) * num_tiles as f64).floor() as u32;
    let x_max = ((max_lon + 180.0) / 360.0 * num_tiles as f64).floor() as u32;
    let y_max = ((1.0 - (min_lat.to_radians().tan().sin() + 1.0) / 2.0) * num_tiles as f64).floor() as u32;

    (x_min, y_min, x_max, y_max)
}
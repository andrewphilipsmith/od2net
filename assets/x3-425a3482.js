import{S as te,i as ne,s as le,V as N,e as $,f as O,z as w,l as k,E as P,v,ad as V,g as B,n as g,X as se,L as re,c as y,a as S,t as h,b,d as L,o as ie,H as oe,h as R,j as I,k as ue,p as W,q as X,r as fe,u as ce,w as pe,M as _e,x as ae,y as me,A as de,_ as ge,a3 as $e,ae as Z,C as he,af as z,ac as be,a7 as E,a6 as we,a4 as J,a8 as ke,a9 as ve}from"./Legend-7948e5f4.js";import{_ as ye,J as Se,G as Le}from"./@vite-plugin-wasm-pack@wasm-od2net-acbe675d.js";function K(s,e,n){const t=s.slice();return t[2]=e[n],t}function Q(s,e,n){const t=s.slice();return t[5]=e[n],t}function Y(s){let e,n;return{c(){e=$("span"),n=B(` 
    `),w(e,"background",s[5]),w(e,"width","100%"),w(e,"border","1px solid black")},m(t,l){k(t,e,l),g(e,n)},p(t,l){l&1&&w(e,"background",t[5])},d(t){t&&v(e)}}}function x(s){let e,n=s[2]+"",t;return{c(){e=$("span"),t=B(n)},m(l,a){k(l,e,a),g(e,t)},p(l,a){a&2&&n!==(n=l[2]+"")&&se(t,n)},d(l){l&&v(e)}}}function Ce(s){let e,n,t,l=N(s[0]),a=[];for(let i=0;i<l.length;i+=1)a[i]=Y(Q(s,l,i));let u=N(s[1]),o=[];for(let i=0;i<u.length;i+=1)o[i]=x(K(s,u,i));return{c(){e=$("div");for(let i=0;i<a.length;i+=1)a[i].c();n=O(),t=$("div");for(let i=0;i<o.length;i+=1)o[i].c();w(e,"display","flex"),w(t,"display","flex"),w(t,"justify-content","space-between")},m(i,f){k(i,e,f);for(let r=0;r<a.length;r+=1)a[r]&&a[r].m(e,null);k(i,n,f),k(i,t,f);for(let r=0;r<o.length;r+=1)o[r]&&o[r].m(t,null)},p(i,[f]){if(f&1){l=N(i[0]);let r;for(r=0;r<l.length;r+=1){const d=Q(i,l,r);a[r]?a[r].p(d,f):(a[r]=Y(d),a[r].c(),a[r].m(e,null))}for(;r<a.length;r+=1)a[r].d(1);a.length=l.length}if(f&2){u=N(i[1]);let r;for(r=0;r<u.length;r+=1){const d=K(i,u,r);o[r]?o[r].p(d,f):(o[r]=x(d),o[r].c(),o[r].m(t,null))}for(;r<o.length;r+=1)o[r].d(1);o.length=u.length}},i:P,o:P,d(i){i&&(v(e),v(n),v(t)),V(a,i),V(o,i)}}}function Te(s,e,n){let{colorScale:t}=e,{limits:l}=e;return s.$$set=a=>{"colorScale"in a&&n(0,t=a.colorScale),"limits"in a&&n(1,l=a.limits)},[t,l]}class je extends te{constructor(e){super(),ne(this,e,Te,Ce,le,{colorScale:0,limits:1})}}function qe(s){let e,n;return e=new je({props:{colorScale:z,limits:H(s[2])}}),{c(){y(e.$$.fragment)},m(t,l){S(e,t,l),n=!0},p(t,l){const a={};l&4&&(a.limits=H(t[2])),e.$set(a)},i(t){n||(h(e.$$.fragment,t),n=!0)},o(t){b(e.$$.fragment,t),n=!1},d(t){L(e,t)}}}function Oe(s){let e,n,t,l;return e=new be({props:{rows:[["LTS 1 - suitable for children",E.lts1],["LTS 2 - low stress",E.lts2],["LTS 3 - medium stress",E.lts3],["LTS 4 - high stress",E.lts4]]}}),{c(){y(e.$$.fragment),n=O(),t=$("p"),t.innerHTML='Note: LTS model from <a href="https://github.com/BikeOttawa/stressmodel/blob/master/stressmodel.js" target="_blank">BikeOttawa</a>'},m(a,u){S(e,a,u),k(a,n,u),k(a,t,u),l=!0},p:P,i(a){l||(h(e.$$.fragment,a),l=!0)},o(a){b(e.$$.fragment,a),l=!1},d(a){a&&(v(n),v(t)),L(e,a)}}}function Me(s){let e,n,t,l,a,u,o,i,f,r,d,C,T,c,p,_,M,A,G;n=new oe({props:{app:"costs"}});const D=[Oe,qe],j=[];function U(m,q){return m[2]=="lts"?0:1}return p=U(s),_=j[p]=D[p](s),{c(){e=$("div"),y(n.$$.fragment),t=O(),l=$("label"),a=B("Open a "),u=$("i"),u.textContent=".bin",o=B(` network file
      `),i=$("input"),f=O(),r=$("select"),d=$("option"),d.textContent="LTS",C=$("option"),C.textContent="Edge cost (relative to length)",T=$("option"),T.textContent="Nearby amenities",c=O(),_.c(),R(i,"type","file"),d.__value="lts",I(d,d.__value),C.__value="cost",I(C,C.__value),T.__value="nearby_amenities",I(T,T.__value),s[2]===void 0&&ue(()=>s[9].call(r)),R(e,"slot","left")},m(m,q){k(m,e,q),S(n,e,null),g(e,t),g(e,l),g(l,a),g(l,u),g(l,o),g(l,i),s[8](i),g(e,f),g(e,r),g(r,d),g(r,C),g(r,T),W(r,s[2],!0),g(e,c),j[p].m(e,null),M=!0,A||(G=[X(i,"change",s[4]),X(r,"change",s[9])],A=!0)},p(m,q){q&4&&W(r,m[2]);let F=p;p=U(m),p===F?j[p].p(m,q):(fe(),b(j[F],1,1,()=>{j[F]=null}),ce(),_=j[p],_?_.p(m,q):(_=j[p]=D[p](m),_.c()),h(_,1),_.m(e,null))},i(m){M||(h(n.$$.fragment,m),h(_),M=!0)},o(m){b(n.$$.fragment,m),b(_),M=!1},d(m){m&&v(e),L(n),s[8](null),j[p].d(),A=!1,pe(G)}}}function Ne(s){let e,n;return e=new ve({props:{properties:s[11][0].properties}}),{c(){y(e.$$.fragment)},m(t,l){S(e,t,l),n=!0},p(t,l){const a={};l&2048&&(a.properties=t[11][0].properties),e.$set(a)},i(t){n||(h(e.$$.fragment,t),n=!0)},o(t){b(e.$$.fragment,t),n=!1},d(t){L(e,t)}}}function Ee(s){let e,n;return e=new ke({props:{openOn:"hover",$$slots:{default:[Ne,({features:t})=>({11:t}),({features:t})=>t?2048:0]},$$scope:{ctx:s}}}),{c(){y(e.$$.fragment)},m(t,l){S(e,t,l),n=!0},p(t,l){const a={};l&6144&&(a.$$scope={dirty:l,ctx:t}),e.$set(a)},i(t){n||(h(e.$$.fragment,t),n=!0)},o(t){b(e.$$.fragment,t),n=!1},d(t){L(e,t)}}}function Je(s){let e,n;return e=new we({props:{manageHoverState:!0,hoverCursor:"pointer",paint:{"line-width":5,"line-color":s[5](s[2]),"line-opacity":s[2]=="nearby_amenities"?["case",["==",0,["get","nearby_amenities"]],0,J(1,.5)]:J(1,.5)},beforeId:"Road labels",$$slots:{default:[Ee]},$$scope:{ctx:s}}}),e.$on("click",s[6]),{c(){y(e.$$.fragment)},m(t,l){S(e,t,l),n=!0},p(t,l){const a={};l&4&&(a.paint={"line-width":5,"line-color":t[5](t[2]),"line-opacity":t[2]=="nearby_amenities"?["case",["==",0,["get","nearby_amenities"]],0,J(1,.5)]:J(1,.5)}),l&4096&&(a.$$scope={dirty:l,ctx:t}),e.$set(a)},i(t){n||(h(e.$$.fragment,t),n=!0)},o(t){b(e.$$.fragment,t),n=!1},d(t){L(e,t)}}}function Be(s){let e,n;return e=new Le({props:{data:s[1],$$slots:{default:[Je]},$$scope:{ctx:s}}}),{c(){y(e.$$.fragment)},m(t,l){S(e,t,l),n=!0},p(t,l){const a={};l&2&&(a.data=t[1]),l&4100&&(a.$$scope={dirty:l,ctx:t}),e.$set(a)},i(t){n||(h(e.$$.fragment,t),n=!0)},o(t){b(e.$$.fragment,t),n=!1},d(t){L(e,t)}}}function He(s){let e,n,t,l;function a(o){s[7](o)}let u={style:"https://api.maptiler.com/maps/dataviz/style.json?key=MZEJTanw3WpxRvt7qDfo",standardControls:!0,hash:!0,$$slots:{default:[Be]},$$scope:{ctx:s}};return s[0]!==void 0&&(u.map=s[0]),n=new _e({props:u}),ae.push(()=>me(n,"map",a)),{c(){e=$("div"),y(n.$$.fragment),R(e,"slot","main"),w(e,"position","relative"),w(e,"width","100%"),w(e,"height","100vh")},m(o,i){k(o,e,i),S(n,e,null),l=!0},p(o,i){const f={};i&4102&&(f.$$scope={dirty:i,ctx:o}),!t&&i&1&&(t=!0,f.map=o[0],de(()=>t=!1)),n.$set(f)},i(o){l||(h(n.$$.fragment,o),l=!0)},o(o){b(n.$$.fragment,o),l=!1},d(o){o&&v(e),L(n)}}}function Ae(s){let e,n;return e=new re({props:{$$slots:{main:[He],left:[Me]},$$scope:{ctx:s}}}),{c(){y(e.$$.fragment)},m(t,l){S(e,t,l),n=!0},p(t,[l]){const a={};l&4111&&(a.$$scope={dirty:l,ctx:t}),e.$set(a)},i(t){n||(h(e.$$.fragment,t),n=!0)},o(t){b(e.$$.fragment,t),n=!1},d(t){L(e,t)}}}function Fe(s){let e=s.properties.way;window.open(`http://openstreetmap.org/way/${e}`,"_blank")}function H(s){if(s=="lts")return null;if(s=="cost")return ee(1,30);if(s=="nearby_amenities")return ee(0,20)}function ee(s,e){let n=[],t=(e-s)/5;for(let l=0;l<6;l++)n.push(s+l*t);return n}function Ie(s,e,n){ie(async()=>{await ye(),await ge()});let t,l,a={type:"FeatureCollection",features:[]},u="lts",o;async function i(c){try{let p=await o.files[0].arrayBuffer();l=new Se(new Uint8Array(p));let _=l.getBounds();t.fitBounds([[_[0],_[1]],[_[2],_[3]]],{padding:20,animate:!1}),n(1,a=JSON.parse(l.debugNetwork()))}catch(p){window.alert(`Problem loading network file: ${p}`)}}function f(c){if(c=="lts")return $e;if(c=="cost")return Z(["/",["get","cost"],["get","length"]],H(c),z);if(c=="nearby_amenities")return Z(["get","nearby_amenities"],H(c),z)}const r=c=>Fe(c.detail.features[0]);function d(c){t=c,n(0,t)}function C(c){ae[c?"unshift":"push"](()=>{o=c,n(3,o)})}function T(){u=he(this),n(2,u)}return[t,a,u,o,i,f,r,d,C,T]}class Pe extends te{constructor(e){super(),ne(this,e,Ie,Ae,le,{})}}new Pe({target:document.getElementById("app")});

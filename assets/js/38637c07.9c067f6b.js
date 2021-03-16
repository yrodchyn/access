(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{72:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return r})),n.d(t,"metadata",(function(){return i})),n.d(t,"toc",(function(){return l})),n.d(t,"default",(function(){return p}));var c=n(3),a=n(7),o=(n(0),n(88)),r={id:"locks",title:"Locks",slug:"/locks"},i={unversionedId:"locks",id:"locks",isDocsHomePage:!1,title:"Locks",description:"A simple locking mechanism is in place to prevent race-conditions.",source:"@site/../docs/locks.md",slug:"/locks",permalink:"/docs/locks",editUrl:"https://github.com/justim/access/edit/master/website/../docs/locks.md",version:"current",sidebar:"docs",previous:{title:"Transactions",permalink:"/docs/transactions"},next:{title:"Profiler",permalink:"/docs/profiler"}},l=[{value:"Setup lock",id:"setup-lock",children:[]},{value:"Locking tables",id:"locking-tables",children:[]},{value:"Unlocking tables",id:"unlocking-tables",children:[]}],s={toc:l};function p(e){var t=e.components,n=Object(a.a)(e,["components"]);return Object(o.b)("wrapper",Object(c.a)({},s,n,{components:t,mdxType:"MDXLayout"}),Object(o.b)("p",null,"A simple locking mechanism is in place to prevent race-conditions."),Object(o.b)("h2",{id:"setup-lock"},"Setup lock"),Object(o.b)("p",null,"You create an ",Object(o.b)("inlineCode",{parentName:"p"},"Access\\Lock")," instance, this instance in itself will not so\nanything. You need to tell the lock which tables you want to lock and for what\nkind of access."),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-php",metastring:'title="Setup lock"',title:'"Setup','lock"':!0},"use Access\\Database;\n\n$db = new Database(..);\n\n// returns a `Access\\Lock` instance\n$lock = $db->createLock();\n$lock->read(User::class);\n$lock->write(Project::class);\n")),Object(o.b)("h2",{id:"locking-tables"},"Locking tables"),Object(o.b)("p",null,"Once you've setup the lock you need to actually lock the tables with\n",Object(o.b)("inlineCode",{parentName:"p"},"Lock::lock()"),", this will send a ",Object(o.b)("inlineCode",{parentName:"p"},"LOCK")," query to the database."),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-php",metastring:'title="Locking the tables"',title:'"Locking',the:!0,'tables"':!0},"$lock->lock();\n")),Object(o.b)("h2",{id:"unlocking-tables"},"Unlocking tables"),Object(o.b)("p",null,"When you're done with the tables you can unlock the tables with\n",Object(o.b)("inlineCode",{parentName:"p"},"Lock::unlock()"),", which will send a ",Object(o.b)("inlineCode",{parentName:"p"},"UNLOCK")," query to the database."),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-php",metastring:'title="Unlocking the tables"',title:'"Unlocking',the:!0,'tables"':!0},"$lock->unlock();\n")),Object(o.b)("div",{className:"admonition admonition-note alert alert--secondary"},Object(o.b)("div",{parentName:"div",className:"admonition-heading"},Object(o.b)("h5",{parentName:"div"},Object(o.b)("span",{parentName:"h5",className:"admonition-icon"},Object(o.b)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},Object(o.b)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),Object(o.b)("div",{parentName:"div",className:"admonition-content"},Object(o.b)("p",{parentName:"div"},"Failing to unlock the tables after will result in an exception, this happens\nwhen the ",Object(o.b)("inlineCode",{parentName:"p"},"$lock")," instance goes out of scope. Make sure to keep it around for as\nlong as you need your lock."))))}p.isMDXComponent=!0},88:function(e,t,n){"use strict";n.d(t,"a",(function(){return u})),n.d(t,"b",(function(){return m}));var c=n(0),a=n.n(c);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);t&&(c=c.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,c)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,c,a=function(e,t){if(null==e)return{};var n,c,a={},o=Object.keys(e);for(c=0;c<o.length;c++)n=o[c],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(c=0;c<o.length;c++)n=o[c],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=a.a.createContext({}),p=function(e){var t=a.a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},u=function(e){var t=p(e.components);return a.a.createElement(s.Provider,{value:t},e.children)},b={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},d=a.a.forwardRef((function(e,t){var n=e.components,c=e.mdxType,o=e.originalType,r=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),u=p(n),d=c,m=u["".concat(r,".").concat(d)]||u[d]||b[d]||o;return n?a.a.createElement(m,i(i({ref:t},s),{},{components:n})):a.a.createElement(m,i({ref:t},s))}));function m(e,t){var n=arguments,c=t&&t.mdxType;if("string"==typeof e||c){var o=n.length,r=new Array(o);r[0]=d;var i={};for(var l in t)hasOwnProperty.call(t,l)&&(i[l]=t[l]);i.originalType=e,i.mdxType="string"==typeof e?e:c,r[1]=i;for(var s=2;s<o;s++)r[s]=n[s];return a.a.createElement.apply(null,r)}return a.a.createElement.apply(null,n)}d.displayName="MDXCreateElement"}}]);
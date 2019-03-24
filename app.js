!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";const o=n(1),r=n(2);document.getElementById("game"),canvas.getContext("2d");canvas.width=window.innerWidth,canvas.height=window.innerHeight;let i={};document.addEventListener("keydown",function(e){i[o(e)]=!0,40!==e.keyCode&&38!==e.keyCode&&37!==e.keyCode&&39!==e.keyCode&&32!==e.keyCode||e.preventDefault()},!1),document.addEventListener("keyup",function(e){delete i[o(e)]},!1);const c={x:100,y:100,width:20,height:20,speed:4,velocity:{x:0,y:0},move:function(){i.up&&(c.velocity.y=-c.speed),i.down&&(c.velocity.y=c.speed),i.right&&(c.velocity.x=c.speed),i.left&&(c.velocity.x=-c.speed)},update:function(e){c.x+=c.velocity.x||0,c.y+=c.velocity.y||0,c.velocity.x*=.9,c.velocity.y*=.9},draw:function(e){e.fillStyle="#4f8d3e",e.fillRect(c.x,c.y,c.width,c.height)}};r.setGameLoop(function(e){c.move(),c.update(e),context.fillStyle="#d3ea2e",context.fillRect(0,0,canvas.width,canvas.height),c.draw(context)},1e3/30)},function(e,t){function n(e){if(e&&"object"==typeof e){var t=e.which||e.keyCode||e.charCode;t&&(e=t)}if("number"==typeof e)return c[e];var n,i=String(e);return(n=o[i.toLowerCase()])?n:(n=r[i.toLowerCase()])||(1===i.length?i.charCodeAt(0):void 0)}n.isEventKey=function(e,t){if(e&&"object"==typeof e){var n=e.which||e.keyCode||e.charCode;if(null==n)return!1;if("string"==typeof t){var i;if(i=o[t.toLowerCase()])return i===n;if(i=r[t.toLowerCase()])return i===n}else if("number"==typeof t)return t===n;return!1}};var o=(t=e.exports=n).code=t.codes={backspace:8,tab:9,enter:13,shift:16,ctrl:17,alt:18,"pause/break":19,"caps lock":20,esc:27,space:32,"page up":33,"page down":34,end:35,home:36,left:37,up:38,right:39,down:40,insert:45,delete:46,command:91,"left command":91,"right command":93,"numpad *":106,"numpad +":107,"numpad -":109,"numpad .":110,"numpad /":111,"num lock":144,"scroll lock":145,"my computer":182,"my calculator":183,";":186,"=":187,",":188,"-":189,".":190,"/":191,"`":192,"[":219,"\\":220,"]":221,"'":222},r=t.aliases={windows:91,"⇧":16,"⌥":18,"⌃":17,"⌘":91,ctl:17,control:17,option:18,pause:19,break:19,caps:20,return:13,escape:27,spc:32,spacebar:32,pgup:33,pgdn:34,ins:45,del:46,cmd:91};
/*!
 * Programatically add the following
 */
for(i=97;i<123;i++)o[String.fromCharCode(i)]=i-32;for(var i=48;i<58;i++)o[i-48]=i;for(i=1;i<13;i++)o["f"+i]=i+111;for(i=0;i<10;i++)o["numpad "+i]=i+96;var c=t.names=t.title={};for(i in o)c[o[i]]=i;for(var a in r)o[a]=r[a]},function(e,t,n){e.exports=n(3)},function(e,t){let n=[];const o=function(){let e=0;return function(){return e++}}();function r(){var e=process.hrtime();return+e[0]*i+ +e[1]}const i=1e9,c=1/i;e.exports.setGameLoop=function(e,t=1e3/30){let i=o();n.push(i);const a=1e6*t,u=Math.floor(t-1),d=1e6*u;let f=r(),l=r();const s=function(){0;const t=r();if(t>=l){const n=t-f;f=t,l=t+a,e(n*c)}-1!==n.indexOf(i)&&(l-r()>d?setTimeout(s,Math.max(u,16)):setImmediate(s))};return s(),i},e.exports.clearGameLoop=function(e){n.splice(n.indexOf(e),1)}}]);
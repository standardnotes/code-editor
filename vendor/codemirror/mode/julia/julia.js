!function(e){"object"==typeof exports&&"object"==typeof module?e(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],e):e(CodeMirror)}((function(e){"use strict";e.defineMode("julia",(function(t,n){function r(e,t,n){return void 0===n&&(n=""),void 0===t&&(t="\\b"),new RegExp("^"+n+"(("+e.join(")|(")+"))"+t)}var i=["[<>]:","[<>=]=","<<=?",">>>?=?","=>","--?>","<--[->]?","\\/\\/","\\.{2,3}","[\\.\\\\%*+\\-<>!\\/^|&]=?","\\?","\\$","~",":"],a=n.operators||r(["[<>]:","[<>=]=","<<=?",">>>?=?","=>","--?>","<--[->]?","\\/\\/","[\\\\%*+\\-<>!\\/^|&\\u00F7\\u22BB]=?","\\?","\\$","~",":","\\u00D7","\\u2208","\\u2209","\\u220B","\\u220C","\\u2218","\\u221A","\\u221B","\\u2229","\\u222A","\\u2260","\\u2264","\\u2265","\\u2286","\\u2288","\\u228A","\\u22C5","\\b(in|isa)\\b(?!.?\\()"],""),o=n.delimiters||/^[;,()[\]{}]/,u=n.identifiers||/^[_A-Za-z\u00A1-\u2217\u2219-\uFFFF][\w\u00A1-\u2217\u2219-\uFFFF]*!*/,s=r(["\\\\[0-7]{1,3}","\\\\x[A-Fa-f0-9]{1,2}","\\\\[abefnrtv0%?'\"\\\\]","([^\\u0027\\u005C\\uD800-\\uDFFF]|[\\uD800-\\uDFFF][\\uDC00-\\uDFFF])"],"'"),c=["if","else","elseif","while","for","begin","let","end","do","try","catch","finally","return","break","continue","global","local","const","export","import","importall","using","function","where","macro","module","baremodule","struct","type","mutable","immutable","quote","typealias","abstract","primitive","bitstype"],l=["true","false","nothing","NaN","Inf"];e.registerHelper("hintWords","julia",c.concat(l));var m=r(["begin","function","type","struct","immutable","let","macro","for","while","quote","if","else","elseif","try","finally","catch","do"]),f=r(["end","else","elseif","catch","finally"]),d=r(c),p=r(l),h=/^@[_A-Za-z\u00A1-\uFFFF][\w\u00A1-\uFFFF]*!*/,F=/^:[_A-Za-z\u00A1-\uFFFF][\w\u00A1-\uFFFF]*!*/,b=/^(`|([_A-Za-z\u00A1-\uFFFF]*"("")?))/,k=r(i,"","@"),v=r(i,"",":");function g(e){return e.nestedArrays>0}function x(e,t){return void 0===t&&(t=0),e.scopes.length<=t?null:e.scopes[e.scopes.length-(t+1)]}function y(e,t){if(e.match("#=",!1))return t.tokenize=z,t.tokenize(e,t);var n=t.leavingExpr;if(e.sol()&&(n=!1),t.leavingExpr=!1,n&&e.match(/^'+/))return"operator";if(e.match(/\.{4,}/))return"error";if(e.match(/\.{1,3}/))return"operator";if(e.eatSpace())return null;var r,i,s=e.peek();if("#"===s)return e.skipToEnd(),"comment";if("["===s&&(t.scopes.push("["),t.nestedArrays++),"("===s&&(t.scopes.push("("),t.nestedGenerators++),g(t)&&"]"===s){for(;t.scopes.length&&"["!==x(t);)t.scopes.pop();t.scopes.pop(),t.nestedArrays--,t.leavingExpr=!0}if(function(e){return e.nestedGenerators>0}(t)&&")"===s){for(;t.scopes.length&&"("!==x(t);)t.scopes.pop();t.scopes.pop(),t.nestedGenerators--,t.leavingExpr=!0}if(g(t)){if("end"==t.lastToken&&e.match(":"))return"operator";if(e.match("end"))return"number"}if((r=e.match(m,!1))&&t.scopes.push(r[0]),e.match(f,!1)&&t.scopes.pop(),e.match(/^::(?![:\$])/))return t.tokenize=A,t.tokenize(e,t);if(!n&&(e.match(F)||e.match(v)))return"builtin";if(e.match(a))return"operator";if(e.match(/^\.?\d/,!1)){var c=RegExp(/^im\b/),l=!1;if(e.match(/^0x\.[0-9a-f_]+p[\+\-]?[_\d]+/i)&&(l=!0),e.match(/^0x[0-9a-f_]+/i)&&(l=!0),e.match(/^0b[01_]+/i)&&(l=!0),e.match(/^0o[0-7_]+/i)&&(l=!0),e.match(/^(?:(?:\d[_\d]*)?\.(?!\.)(?:\d[_\d]*)?|\d[_\d]*\.(?!\.)(?:\d[_\d]*))?([Eef][\+\-]?[_\d]+)?/i)&&(l=!0),e.match(/^\d[_\d]*(e[\+\-]?\d+)?/i)&&(l=!0),l)return e.match(c),t.leavingExpr=!0,"number"}if(e.match("'"))return t.tokenize=E,t.tokenize(e,t);if(e.match(b))return t.tokenize=('"""'===(i=e.current()).substr(-3)?i='"""':'"'===i.substr(-1)&&(i='"'),function(e,t){if(e.eat("\\"))e.next();else{if(e.match(i))return t.tokenize=y,t.leavingExpr=!0,"string";e.eat(/[`"]/)}return e.eatWhile(/[^\\`"]/),"string"}),t.tokenize(e,t);if(e.match(h)||e.match(k))return"meta";if(e.match(o))return null;if(e.match(d))return"keyword";if(e.match(p))return"builtin";var _=t.isDefinition||"function"==t.lastToken||"macro"==t.lastToken||"type"==t.lastToken||"struct"==t.lastToken||"immutable"==t.lastToken;return e.match(u)?_?"."===e.peek()?(t.isDefinition=!0,"variable"):(t.isDefinition=!1,"def"):(t.leavingExpr=!0,"variable"):(e.next(),"error")}function A(e,t){return e.match(/.*?(?=[,;{}()=\s]|$)/),e.match("{")?t.nestedParameters++:e.match("}")&&t.nestedParameters>0&&t.nestedParameters--,t.nestedParameters>0?e.match(/.*?(?={|})/)||e.next():0==t.nestedParameters&&(t.tokenize=y),"builtin"}function z(e,t){return e.match("#=")&&t.nestedComments++,e.match(/.*?(?=(#=|=#))/)||e.skipToEnd(),e.match("=#")&&(t.nestedComments--,0==t.nestedComments&&(t.tokenize=y)),"comment"}function E(e,t){var n,r=!1;if(e.match(s))r=!0;else if(n=e.match(/\\u([a-f0-9]{1,4})(?=')/i))((i=parseInt(n[1],16))<=55295||i>=57344)&&(r=!0,e.next());else if(n=e.match(/\\U([A-Fa-f0-9]{5,8})(?=')/)){var i;(i=parseInt(n[1],16))<=1114111&&(r=!0,e.next())}return r?(t.leavingExpr=!0,t.tokenize=y,"string"):(e.match(/^[^']+(?=')/)||e.skipToEnd(),e.match("'")&&(t.tokenize=y),"error")}return{startState:function(){return{tokenize:y,scopes:[],lastToken:null,leavingExpr:!1,isDefinition:!1,nestedArrays:0,nestedComments:0,nestedGenerators:0,nestedParameters:0,firstParenPos:-1}},token:function(e,t){var n=t.tokenize(e,t),r=e.current();return r&&n&&(t.lastToken=r),n},indent:function(e,n){var r=0;return("]"===n||")"===n||/^end\b/.test(n)||/^else/.test(n)||/^catch\b/.test(n)||/^elseif\b/.test(n)||/^finally/.test(n))&&(r=-1),(e.scopes.length+r)*t.indentUnit},electricInput:/\b(end|else|catch|finally)\b/,blockCommentStart:"#=",blockCommentEnd:"=#",lineComment:"#",closeBrackets:'()[]{}""',fold:"indent"}})),e.defineMIME("text/x-julia","julia")}));
!function(e){"object"==typeof exports&&"object"==typeof module?e(require("../../lib/codemirror"),require("../htmlmixed/htmlmixed"),require("../../addon/mode/overlay")):"function"==typeof define&&define.amd?define(["../../lib/codemirror","../htmlmixed/htmlmixed","../../addon/mode/overlay"],e):e(CodeMirror)}((function(e){"use strict";e.defineMode("django:inner",(function(){var e=["block","endblock","for","endfor","true","false","filter","endfilter","loop","none","self","super","if","elif","endif","as","else","import","with","endwith","without","context","ifequal","endifequal","ifnotequal","endifnotequal","extends","include","load","comment","endcomment","empty","url","static","trans","blocktrans","endblocktrans","now","regroup","lorem","ifchanged","endifchanged","firstof","debug","cycle","csrf_token","autoescape","endautoescape","spaceless","endspaceless","ssi","templatetag","verbatim","endverbatim","widthratio"],t=["add","addslashes","capfirst","center","cut","date","default","default_if_none","dictsort","dictsortreversed","divisibleby","escape","escapejs","filesizeformat","first","floatformat","force_escape","get_digit","iriencode","join","last","length","length_is","linebreaks","linebreaksbr","linenumbers","ljust","lower","make_list","phone2numeric","pluralize","pprint","random","removetags","rjust","safe","safeseq","slice","slugify","stringformat","striptags","time","timesince","timeuntil","title","truncatechars","truncatechars_html","truncatewords","truncatewords_html","unordered_list","upper","urlencode","urlize","urlizetrunc","wordcount","wordwrap","yesno"],r=["==","!=","<",">","<=",">="],i=["in","not","or","and"];function n(e,t){if(e.match("{{"))return t.tokenize=a,"tag";if(e.match("{%"))return t.tokenize=l,"tag";if(e.match("{#"))return t.tokenize=u,"comment";for(;null!=e.next()&&!e.match(/\{[{%#]/,!1););return null}function o(e,t){return function(r,i){return!i.escapeNext&&r.eat(e)?i.tokenize=t:(i.escapeNext&&(i.escapeNext=!1),"\\"==r.next()&&(i.escapeNext=!0)),"string"}}function a(e,r){if(r.waitDot){if(r.waitDot=!1,"."!=e.peek())return"null";if(e.match(/\.\W+/))return"error";if(e.eat("."))return r.waitProperty=!0,"null";throw Error("Unexpected error while waiting for property.")}if(r.waitPipe){if(r.waitPipe=!1,"|"!=e.peek())return"null";if(e.match(/\.\W+/))return"error";if(e.eat("|"))return r.waitFilter=!0,"null";throw Error("Unexpected error while waiting for filter.")}return r.waitProperty&&(r.waitProperty=!1,e.match(/\b(\w+)\b/))?(r.waitDot=!0,r.waitPipe=!0,"property"):r.waitFilter&&(r.waitFilter=!1,e.match(t))?"variable-2":e.eatSpace()?(r.waitProperty=!1,"null"):e.match(/\b\d+(\.\d+)?\b/)?"number":e.match("'")?(r.tokenize=o("'",r.tokenize),"string"):e.match('"')?(r.tokenize=o('"',r.tokenize),"string"):e.match(/\b(\w+)\b/)&&!r.foundVariable?(r.waitDot=!0,r.waitPipe=!0,"variable"):e.match("}}")?(r.waitProperty=null,r.waitFilter=null,r.waitDot=null,r.waitPipe=null,r.tokenize=n,"tag"):(e.next(),"null")}function l(a,l){if(l.waitDot){if(l.waitDot=!1,"."!=a.peek())return"null";if(a.match(/\.\W+/))return"error";if(a.eat("."))return l.waitProperty=!0,"null";throw Error("Unexpected error while waiting for property.")}if(l.waitPipe){if(l.waitPipe=!1,"|"!=a.peek())return"null";if(a.match(/\.\W+/))return"error";if(a.eat("|"))return l.waitFilter=!0,"null";throw Error("Unexpected error while waiting for filter.")}if(l.waitProperty&&(l.waitProperty=!1,a.match(/\b(\w+)\b/)))return l.waitDot=!0,l.waitPipe=!0,"property";if(l.waitFilter&&(l.waitFilter=!1,a.match(t)))return"variable-2";if(a.eatSpace())return l.waitProperty=!1,"null";if(a.match(/\b\d+(\.\d+)?\b/))return"number";if(a.match("'"))return l.tokenize=o("'",l.tokenize),"string";if(a.match('"'))return l.tokenize=o('"',l.tokenize),"string";if(a.match(r))return"operator";if(a.match(i))return"keyword";var u=a.match(e);return u?("comment"==u[0]&&(l.blockCommentTag=!0),"keyword"):a.match(/\b(\w+)\b/)?(l.waitDot=!0,l.waitPipe=!0,"variable"):a.match("%}")?(l.waitProperty=null,l.waitFilter=null,l.waitDot=null,l.waitPipe=null,l.blockCommentTag?(l.blockCommentTag=!1,l.tokenize=c):l.tokenize=n,"tag"):(a.next(),"null")}function u(e,t){return e.match(/^.*?#\}/)?t.tokenize=n:e.skipToEnd(),"comment"}function c(e,t){return e.match(/\{%\s*endcomment\s*%\}/,!1)?(t.tokenize=l,e.match("{%"),"tag"):(e.next(),"comment")}return e=new RegExp("^\\b("+e.join("|")+")\\b"),t=new RegExp("^\\b("+t.join("|")+")\\b"),r=new RegExp("^\\b("+r.join("|")+")\\b"),i=new RegExp("^\\b("+i.join("|")+")\\b"),{startState:function(){return{tokenize:n}},token:function(e,t){return t.tokenize(e,t)},blockCommentStart:"{% comment %}",blockCommentEnd:"{% endcomment %}"}})),e.defineMode("django",(function(t){var r=e.getMode(t,"text/html"),i=e.getMode(t,"django:inner");return e.overlayMode(r,i)})),e.defineMIME("text/x-django","django")}));
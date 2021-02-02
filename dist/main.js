document.addEventListener("DOMContentLoaded",(function(){const e=CodeMirror.modeInfo.reduce((function(e,n){return e[n.mode]?e[n.mode].push(n):e[n.mode]=[n],e}),{}),n=CodeMirror.modeInfo.reduce((function(e,n){return e[n.name]={mode:n.mode,mime:n.mime},e}),{}),t=Object.keys(n);let o,d,i,m,r,c,a,u=!1,s=!0;function l(){if(d){let e=d;o.saveItemWithPresave(e,(()=>{m=c.getValue(),e.content.text=m,e.clientData=i,e.content.preview_plain=null,e.content.preview_html=null}))}}function f(o){if(!o)return;const d=function(t){const o=function(e){return e?{name:e.name,mode:e.mode,mime:e.mime}:null},d=/.+\.([^.]+)$/.exec(t),i=/\//.test(t);if(d)return o(CodeMirror.findModeByExtension(d[1]));if(i)return o(CodeMirror.findModeByMIME(i[1]));if(n[t])return{name:t,mode:n[t].mode,mime:n[t].mime};if(e[t]){const n=e[t][0];return{name:n.name,mode:n.mode,mime:n.mime}}return{name:t,mode:t,mime:t}}(o);d?(c.setOption("mode",d.mime),CodeMirror.autoLoadMode(c,d.mode),i&&(i.mode=d.name),document.getElementById("select").selectedIndex=t.indexOf(d.name)):console.error("Could not find a mode corresponding to "+o)}c=CodeMirror.fromTextArea(document.getElementById("code"),{lineNumbers:!0,styleSelectedText:!0,lineWrapping:!0}),c.setSize("100%","100%"),setTimeout((function(){f("JavaScript")}),1),function(){a=document.getElementById("select");for(let e=0;e<t.length;e++){const n=document.createElement("option");n.value=e,n.innerHTML=t[e],a.appendChild(n)}}(),c.on("change",(function(){u||l()})),o=new ComponentRelay({targetWindow:window,onReady:()=>{const e=o.platform;e&&document.body.classList.add(e)}}),o.streamContextItem((e=>{!function(e){if(e.uuid!==r&&(m=null,s=!0,r=e.uuid),d=e,e.isMetadataUpdate)return;i=e.clientData;f(i.mode||o.getComponentDataValueForKey("language")),c&&(e.content.text!==m&&(u=!0,c.getDoc().setValue(d.content.text),u=!1),s&&(s=!1,c.getDoc().clearHistory()))}(e)})),window.setKeyMap=function(e){c.setOption("keyMap",e)},window.onLanguageSelect=function(){f(t[a.selectedIndex]),l()},window.setDefaultLanguage=function(){const e=t[a.selectedIndex];o.setComponentDataValueForKey("language",e);const n=document.getElementById("default-label"),d=n.innerHTML;n.innerHTML="Success",n.classList.add("success"),setTimeout((function(){n.classList.remove("success"),n.innerHTML=d}),750)}}));
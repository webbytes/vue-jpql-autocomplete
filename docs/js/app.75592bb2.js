(function(e){function t(t){for(var s,i,u=t[0],a=t[1],l=t[2],p=0,g=[];p<u.length;p++)i=u[p],r[i]&&g.push(r[i][0]),r[i]=0;for(s in a)Object.prototype.hasOwnProperty.call(a,s)&&(e[s]=a[s]);c&&c(t);while(g.length)g.shift()();return o.push.apply(o,l||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],s=!0,u=1;u<n.length;u++){var a=n[u];0!==r[a]&&(s=!1)}s&&(o.splice(t--,1),e=i(i.s=n[0]))}return e}var s={},r={app:0},o=[];function i(t){if(s[t])return s[t].exports;var n=s[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=e,i.c=s,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)i.d(n,s,function(t){return e[t]}.bind(null,s));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/";var u=window["webpackJsonp"]=window["webpackJsonp"]||[],a=u.push.bind(u);u.push=t,u=u.slice();for(var l=0;l<u.length;l++)t(u[l]);var c=a;o.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"034f":function(e,t,n){"use strict";var s=n("e2a1"),r=n.n(s);r.a},"3f8c":function(e,t,n){t=e.exports=n("2350")(!1),t.push([e.i,"#app{font-family:Avenir,Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-align:center;color:#2c3e50;margin-top:60px}.autosuggest,.autosuggest__results-container,div{width:100%}.autosuggest>input:invalid,input.autosuggest[aria-invalid=true]{border-color:red}.autosuggest__results{margin:0;position:absolute;z-index:10000001;width:calc(100% - 20px);border-bottom-left-radius:4px;border-bottom-right-radius:4px;padding:0;border:1px solid silver;background:#fff;overflow:scroll;max-height:400px}.autosuggest__results ul{-webkit-padding-start:10px;padding-inline-start:10px}.autosuggest__results ul li{list-style:none;display:block;text-align:left}",""])},"56d7":function(e,t,n){"use strict";n.r(t);n("cadf"),n("551c"),n("f751"),n("097d");var s=n("2b0e"),r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[e._v("\n  Simple auto complete:\n  "),n("vue-jpql-autocomplete",{attrs:{"field-settings":e.fieldSettings}}),n("br"),n("br"),e._v("\n  Auto complete with more options and slots:\n  "),n("vue-jpql-autocomplete",{ref:"autocomplete",attrs:{placeholder:"enter query here...","field-settings":e.fieldSettings,operators:["=","<>",">",">=","<","<="]},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.suggestion;return[e._v("\n      "+e._s(n.name)+": "+e._s(n.item)+"\n    ")]}}]),model:{value:e.query,callback:function(t){e.query=t},expression:"query"}}),e.query?[e._v("\n    The query typed is "+e._s(e.query)+" which is "+e._s(e.$refs.autocomplete.isValid?"valid":"invalid")+".\n  ")]:e._e()],2)},o=[],i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("vue-autosuggest",{ref:"autosuggest",attrs:{suggestions:e.suggestions,"input-props":{placeholder:e.placeholder,class:"autosuggest"},"get-suggestion-value":e.suggestionSelected},on:{input:e.onInputChange,focus:e.logEvent,selected:e.focusInputBox},scopedSlots:e._u([e._l(e.$scopedSlots,function(t,n){return{key:n,fn:function(t){return[e._t(n,null,null,t)]}}})],null,!0),model:{value:e.query,callback:function(t){e.query=t},expression:"query"}},[e._l(e.$slots,function(t,n){return e._t(n,null,{slot:n})})],2)},u=[],a=(n("ac6a"),n("4917"),n("3b2b"),n("a481"),n("7f7f"),n("55dd"),n("2831")),l=n("7d94"),c=n.n(l),p={name:"VueJpqlAutocomplete",components:{VueAutosuggest:a["a"]},data:function(){return{token:"",tokens:[],tokenType:0,suggestions:[],query:"",sqlParser:new c.a}},props:{value:{type:String,default:""},placeholder:{type:String,default:"Type query here..."},operators:{type:Array,default:function(){return["=","<>",">",">=","<","<="]}},fieldSettings:{type:Array,default:function(){return[{name:"status",values:["Open","Closed"],type:"string"},{name:"id",type:"number"},{name:"description",type:"string"}]}}},computed:{fieldSuggestions:function(){return this.fieldSettings.map(function(e){return e.name}).sort()},isValid:function(){var e=this.query;try{e=this.sqlParser.parse(this.query)}catch(n){return!1}var t=!e||e&&"string"!==typeof e&&-1==JSON.stringify(e).indexOf("null");return this.$refs.autosuggest.$el.querySelector("input.autosuggest").setAttribute("aria-invalid",t?"false":"true"),t}},methods:{logEvent:function(){},focusInputBox:function(){this.$refs.autosuggest.$el.querySelector("input.autosuggest").focus()},suggestionSelected:function(e){return this.query.replace(new RegExp(this.token+"$"),e.item)},onInputChange:function(e){this.$emit("input",e);var t=e.substring(0,this.$refs.autosuggest.$el.querySelector("input.autosuggest").selectionStart);this.token="";var n=0;switch(t.trimStart().length>0&&(t=t.trimStart().replace(this.bracketsRegex,""),this.tokens=t.match(this.parser),this.token=this.tokens[this.tokens.length-1].trim(),n=(this.tokens.length-1)%4),n){case 0:this.suggestFields(this.token);break;case 1:this.suggestOperators(this.token);break;case 2:this.suggestValues(this.token);break;case 3:this.suggestLogicalOps(this.token);break}},suggestFields:function(e){this.suggestions=[{name:"Fields",data:this.fieldSuggestions.filter(function(t){return t.indexOf(e)>-1})}]},suggestOperators:function(e){e=e.toUpperCase(),this.suggestions=[{name:"Operators",data:this.operators.filter(function(t){return t.indexOf(e)>-1})}]},suggestValues:function(e){var t=this.tokens[this.tokens.length-3].trim(),n=this.fieldSettings.filter(function(e){return e.name==t})[0];this.suggestions=[{name:"Values",data:n.values?n.values.filter(function(t){return t.indexOf(e)>-1}):["Provide a ".concat(n.type||"text"," value for searching.")]}]},suggestLogicalOps:function(){this.suggestions=[{name:"Logical Operators",data:["AND","OR"]}]}},mounted:function(){this.suggestFields("");var e="([\\s]+'?[\\w%]+'?|[\\w]+|[\\s]+"+this.operators.join("?|[\\s]+")+"?)";this.parser=new RegExp(e,"ig")},created:function(){this.bracketsRegex=/[()]/g}},g=p,f=n("2877"),d=Object(f["a"])(g,i,u,!1,null,null,null),h=d.exports,m={name:"app",components:{VueJpqlAutocomplete:h},data:function(){return{query:"",fieldSettings:[{name:"status",values:["Open","Closed"],type:"string"},{name:"id",type:"number"},{name:"description",type:"string"}]}}},y=m,v=(n("034f"),Object(f["a"])(y,r,o,!1,null,null,null)),b=v.exports;s["a"].config.productionTip=!1,new s["a"]({render:function(e){return e(b)}}).$mount("#app")},e2a1:function(e,t,n){var s=n("3f8c");"string"===typeof s&&(s=[[e.i,s,""]]),s.locals&&(e.exports=s.locals);var r=n("499e").default;r("1f50beb8",s,!0,{sourceMap:!1,shadowMode:!1})}});
//# sourceMappingURL=app.75592bb2.js.map
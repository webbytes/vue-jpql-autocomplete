(function(e){function t(t){for(var s,i,a=t[0],u=t[1],l=t[2],p=0,g=[];p<a.length;p++)i=a[p],r[i]&&g.push(r[i][0]),r[i]=0;for(s in u)Object.prototype.hasOwnProperty.call(u,s)&&(e[s]=u[s]);c&&c(t);while(g.length)g.shift()();return o.push.apply(o,l||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],s=!0,a=1;a<n.length;a++){var u=n[a];0!==r[u]&&(s=!1)}s&&(o.splice(t--,1),e=i(i.s=n[0]))}return e}var s={},r={app:0},o=[];function i(t){if(s[t])return s[t].exports;var n=s[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=e,i.c=s,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)i.d(n,s,function(t){return e[t]}.bind(null,s));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/vue-jpql-autocomplete/";var a=window["webpackJsonp"]=window["webpackJsonp"]||[],u=a.push.bind(a);a.push=t,a=a.slice();for(var l=0;l<a.length;l++)t(a[l]);var c=u;o.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"034f":function(e,t,n){"use strict";var s=n("e2a1"),r=n.n(s);r.a},"3f8c":function(e,t,n){t=e.exports=n("2350")(!1),t.push([e.i,"#app{font-family:Avenir,Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-align:center;color:#2c3e50;margin-top:60px}.autosuggest,.autosuggest__results-container,div{width:100%}.autosuggest>input:invalid,input.autosuggest[aria-invalid=true]{border-color:red}.autosuggest__results{margin:0;position:absolute;z-index:10000001;width:calc(100% - 20px);border-bottom-left-radius:4px;border-bottom-right-radius:4px;padding:0;border:1px solid silver;background:#fff;overflow:scroll;max-height:400px}.autosuggest__results ul{-webkit-padding-start:10px;padding-inline-start:10px}.autosuggest__results ul li{list-style:none;display:block;text-align:left}li.autosuggest__results-before.autosuggest__results-before--default{font-style:italic;font-size:smaller}#app,details,pre{text-align:left}",""])},"56d7":function(e,t,n){"use strict";n.r(t);n("cadf"),n("551c"),n("f751"),n("097d");var s=n("2b0e"),r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[e._v("\n  Simple auto complete:\n  "),n("vue-jpql-autocomplete",{attrs:{"field-settings":e.fieldSettings}}),n("br"),e._m(0),n("br"),n("br"),e._v("\n  Auto complete with more options and slots:\n  "),n("vue-jpql-autocomplete",{ref:"autocomplete",attrs:{placeholder:"enter query here...","field-settings":e.fieldSettings,operators:["=","<>",">",">=","<","<=","LIKE","IN"]},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.suggestion;return[e._v("\n      "+e._s(n.name)+": "+e._s(n.item)+"\n    ")]}}]),model:{value:e.query,callback:function(t){e.query=t},expression:"query"}}),e.query?[e._v("\n    The query typed is "+e._s(e.query)+" which is "+e._s(e.$refs.autocomplete.isValid?"valid":"invalid")+".\n  ")]:e._e(),n("br"),n("details",[n("summary",[e._v("Template")]),n("pre",[e._v("    <vue-jpql-autocomplete \n      ref=\"autocomplete\"\n      v-model=\"query\"\n      placeholder=\"enter query here...\" \n      :field-settings=\"fieldSettings\"\n      :operators=\"['LIKE','IN','=','<>','>','>=','<','<=']\">\n      <template v-slot=\""+e._s("{suggestion}")+'">\n        '+e._s("{{suggestion.name}}")+": "+e._s("{{suggestion.item}}")+'\n      </template>\n    </vue-jpql-autocomplete>\n    <template v-if="query">\n      The query typed is '+e._s("{{ query }}")+" which is "+e._s("{{ $refs.autocomplete.isValid ? 'valid' : 'invalid' }}")+".\n    </template>\n    ")])]),n("br"),n("br"),e._v("\n    Styling and script:\n    "),e._m(1),e._m(2)],2)},o=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("details",[n("summary",[e._v("Template")]),n("pre",[e._v('    <vue-jpql-autocomplete :field-settings="fieldSettings"/>\n    ')])])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("details",[n("summary",[e._v("Style")]),n("pre",[e._v('    div, .autosuggest, .autosuggest__results-container {\n      width: 100%;\n    }\n    .autosuggest > input:invalid, input.autosuggest[aria-invalid="true"] {\n      border-color: red;\n    }\n    .autosuggest__results {\n      margin: 0;\n      position: absolute;\n      z-index: 10000001;\n      width: calc(100% - 20px);\n      border-bottom-left-radius: 4px;\n      border-bottom-right-radius: 4px;\n      padding: 0;\n      border: silver solid 1px;\n      background: white;\n      overflow: scroll;\n      max-height: 400px;\n    }\n    .autosuggest__results ul {\n      padding-inline-start: 10px;\n    }\n    .autosuggest__results ul li {\n      list-style: none;\n      display: block;\n      text-align: left;\n    }\n    li.autosuggest__results-before.autosuggest__results-before--default {\n      font-style: italic;\n      font-size: smaller;\n    }\n    ')])])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("details",[n("summary",[e._v("Script")]),n("pre",[e._v("      import VueJpqlAutocomplete from '@webbytes/vue-jpql-autocomplete'\n\n      export default {\n        name: 'app',\n        components: {\n          VueJpqlAutocomplete\n        },\n        data: function() {\n          return {\n            query: '',\n            fieldSettings: [\n              { name: 'status', values: ['Open','Closed'], type: 'text' },\n              { name: 'id', type: 'number' },\n              { name: 'description', type: 'text' },\n              { name: 'category', type: 'text', values: function(val) { \n                  val = val.toLowerCase();\n                  return new Promise(function(resolve) {\n                    // Can be ajax call or any other custom logic\n                    setTimeout(function() {\n                      resolve(['Category A','Category B','Category C'].filter(v => { \n                        return v.toLowerCase().indexOf(val) != -1;\n                      }));\n                    }, 300);\n                  });\n                }\n              }\n            ]\n          }\n        }\n      }        \n    ")])])}],i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("vue-autosuggest",{ref:"autosuggest",attrs:{suggestions:e.suggestions,"input-props":{placeholder:e.placeholder,class:"autosuggest"},"get-suggestion-value":e.suggestionSelected},on:{input:e.onInputChange,focus:e.logEvent,selected:e.focusInputBox},scopedSlots:e._u([e._l(e.$scopedSlots,function(t,n){return{key:n,fn:function(t){return[e._t(n,null,null,t)]}}})],null,!0),model:{value:e.query,callback:function(t){e.query=t},expression:"query"}},[e._l(e.$slots,function(t,n){return e._t(n,null,{slot:n})})],2)},a=[],u=(n("6762"),n("2fdb"),n("ac6a"),n("96cf"),n("3b8d")),l=(n("3b2b"),n("a481"),n("28a5"),n("7f7f"),n("55dd"),n("2831")),c=n("7d94"),p=n.n(c),g={bracketsRegex:/[()]/g,inBracketRegex:/IN\s\(([',\s\w]*)\)?/gi,multiSpaceRegex:/\s\s+/g,field:"[\\s](?!and|or)[\\w_.]",logicalop:"[\\s](?:AND|OR)"},f={name:"VueJpqlAutocomplete",components:{VueAutosuggest:l["a"]},data:function(){return{token:"",tokens:[],tokenType:0,suggestions:[],query:"",sqlParser:new p.a}},props:{value:{type:String,default:""},placeholder:{type:String,default:"Type query here..."},operators:{type:Array,default:function(){return["=","<>",">",">=","<","<=","LIKE","IN"]}},fieldSettings:{type:Array,default:function(){return[{name:"status",values:["Open","Closed"],type:"text"},{name:"id",type:"number"},{name:"description",type:"text"}]}}},computed:{fieldSuggestions:function(){return this.fieldSettings.map(function(e){return e.name}).sort()},isValid:function(){var e=this.query;try{e=this.sqlParser.parse(this.query)}catch(n){return!1}var t=!e||e&&"string"!==typeof e&&-1==JSON.stringify(e).indexOf("null");return this.$refs.autosuggest.$el.querySelector("input.autosuggest").setAttribute("aria-invalid",t?"false":"true"),t},ops:function(){return this.operators.slice().sort(function(e,t){return t.length-e.length}).join("|")}},methods:{logEvent:function(){},focusInputBox:function(){this.searchBox.focus(),this.onInputChange(this.query,this.query.length)},suggestionSelected:function(e){var t=this.token;if(this.tokens["operator2"]&&"IN"==this.tokens["operator2"].trim().toUpperCase()){var n=t.replace(/[[\]]/gi,"").split(",").map(function(e){return e.replace(/'/g,"").trim()});t=n.length>0?n[n.length-1]:""}return this.query=this.query.substring(0,this.searchBox.selectionStart).replace(new RegExp(t+"$"),e.item)+this.query.substring(this.searchBox.selectionStart),this.token=e.item,this.query},onInputChange:function(e,t){this.$emit("input",e);var n=e.substring(0,t||this.searchBox.selectionStart).trimStart();if(this.token="",this.tokenType="field",n.length>0){if(n=" "+n.replace(g.multiSpaceRegex," ").replace(g.inBracketRegex,"IN [$1]").replace(g.bracketsRegex,"").replace(g.multiSpaceRegex," "),this.tokens=new RegExp(this.regex,"ig").exec(n),!this.tokens)return;this.tokens=this.tokens.groups;for(var s=["logicalop","values","operator","field"],r=0;r<s.length;r++){var o=s[r];if(this.token=this.tokens[o+"3"]||this.tokens[o+"2"]||this.tokens[o+"1"]||this.tokens[o+"0"],this.token){this.tokenType=o,this.token=this.token.trim();break}}}switch(this.tokenType){case"field":this.suggestFields(this.token);break;case"operator":this.suggestOperators(this.token);break;case"values":this.suggestValues(this.token);break;case"logicalop":this.suggestLogicalOps(this.token);break}},suggestFields:function(e){e=e.toLowerCase(),this.suggestions=[{label:"Fields",data:this.fieldSuggestions.filter(function(t){return t.toLowerCase().indexOf(e)>-1})}]},suggestOperators:function(e){e=e.toUpperCase(),this.suggestions=[{label:"Operators",data:this.operators.filter(function(t){return t.indexOf(e)>-1})}]},suggestValues:function(){var e=Object(u["a"])(regeneratorRuntime.mark(function e(t){var n,s,r,o,i;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:if(n=[],s=this.tokens["field2"].trim(),t.length>0&&"IN"==this.tokens["operator2"].trim().toUpperCase()&&(n=t.replace(/[[\]]/gi,"").split(",").map(function(e){return e.replace(/'/g,"").trim()}),t=n.length>0?n[n.length-1].toLowerCase():""),r=this.fieldSettings.filter(function(e){return e.name==s})[0],r){e.next=6;break}return e.abrupt("return");case 6:if(o=["''"],!r.values){e.next=18;break}if("function"!=typeof r.values){e.next=16;break}if(i=r.values.call(this,t,r.name),!(i instanceof Promise)){e.next=14;break}return e.next=13,i;case 13:o=e.sent;case 14:e.next=17;break;case 16:o=r.values?r.values.filter(function(e){return!n.includes(e)&&e.toLowerCase().indexOf(t)>-1}):null;case 17:"text"==r.type&&(o=o.map(function(e){return"'"+e+"'"}));case 18:this.suggestions=[{label:r.values?"Values":"Hint: Provide a ".concat(r.type||"text"," value for ").concat(s,"."),data:o}];case 19:case"end":return e.stop()}},e,this)}));function t(t){return e.apply(this,arguments)}return t}(),suggestLogicalOps:function(){this.suggestions=[{name:"Logical Operators",data:["AND","OR"]}]}},mounted:function(){this.suggestFields(""),this.searchBox=this.$refs.autosuggest.$el.querySelector("input.autosuggest")},created:function(){var e="[\\s](?:".concat(this.ops,")");this.regex="(?:(?<field3>".concat(g.field,"+)(?<operator3>").concat(e,")(?<values3>[\\s](?:[\\w]+|'[\\w\\s%]*'|\\[[\\w%,\\s']*\\]))(?<logicalop3>").concat(g.logicalop,"?)")+"|(?<field2>".concat(g.field,"+)(?<operator2>").concat(e,")(?<values2>[\\s](?:[\\w]+|'[\\w\\s%]*'?|\\[[\\w%,\\s']*\\]?)?)")+"|(?<field1>".concat(g.field,"+)(?<operator1>").concat(e,"?)")+"|(?<field0>".concat(g.field,"*))$")}},d=f,h=n("2877"),m=Object(h["a"])(d,i,a,!1,null,null,null),v=m.exports,y={name:"app",components:{VueJpqlAutocomplete:v},data:function(){return{query:"",fieldSettings:[{name:"status",values:["Open","Closed"],type:"text"},{name:"id",type:"number"},{name:"description",type:"text"},{name:"category",type:"text",values:function(e){return e=e.toLowerCase(),new Promise(function(t){setTimeout(function(){t(["Category A","Category B","Category C"].filter(function(t){return-1!=t.toLowerCase().indexOf(e)}))},300)})}}]}}},b=y,x=(n("034f"),Object(h["a"])(b,r,o,!1,null,null,null)),_=x.exports;s["a"].config.productionTip=!1,new s["a"]({render:function(e){return e(_)}}).$mount("#app")},e2a1:function(e,t,n){var s=n("3f8c");"string"===typeof s&&(s=[[e.i,s,""]]),s.locals&&(e.exports=s.locals);var r=n("499e").default;r("1f50beb8",s,!0,{sourceMap:!1,shadowMode:!1})}});
//# sourceMappingURL=app.d656447f.js.map
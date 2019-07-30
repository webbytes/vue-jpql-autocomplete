/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "5a74");
/******/ })
/************************************************************************/
/******/ ({

/***/ "01f9":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__("2d00");
var $export = __webpack_require__("5ca1");
var redefine = __webpack_require__("2aba");
var hide = __webpack_require__("32e9");
var Iterators = __webpack_require__("84f2");
var $iterCreate = __webpack_require__("41a0");
var setToStringTag = __webpack_require__("7f20");
var getPrototypeOf = __webpack_require__("38fd");
var ITERATOR = __webpack_require__("2b4c")('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),

/***/ "02f4":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("4588");
var defined = __webpack_require__("be13");
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),

/***/ "0390":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var at = __webpack_require__("02f4")(true);

 // `AdvanceStringIndex` abstract operation
// https://tc39.github.io/ecma262/#sec-advancestringindex
module.exports = function (S, index, unicode) {
  return index + (unicode ? at(S, index).length : 1);
};


/***/ }),

/***/ "0bfb":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 21.2.5.3 get RegExp.prototype.flags
var anObject = __webpack_require__("cb7c");
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};


/***/ }),

/***/ "0d58":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__("ce10");
var enumBugKeys = __webpack_require__("e11e");

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),

/***/ "1126":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (x) {
	if (!x) return false;
	if (typeof x === 'symbol') return true;
	if (!x.constructor) return false;
	if (x.constructor.name !== 'Symbol') return false;
	return (x[x.constructor.toStringTag] === 'Symbol');
};


/***/ }),

/***/ "11e9":
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__("52a7");
var createDesc = __webpack_require__("4630");
var toIObject = __webpack_require__("6821");
var toPrimitive = __webpack_require__("6a99");
var has = __webpack_require__("69a8");
var IE8_DOM_DEFINE = __webpack_require__("c69a");
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__("9e1e") ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),

/***/ "1495":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("86cc");
var anObject = __webpack_require__("cb7c");
var getKeys = __webpack_require__("0d58");

module.exports = __webpack_require__("9e1e") ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),

/***/ "14ab":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function () {
	var assign = Object.assign, obj;
	if (typeof assign !== "function") return false;
	obj = { foo: "raz" };
	assign(obj, { bar: "dwa" }, { trzy: "trzy" });
	return (obj.foo + obj.bar + obj.trzy) === "razdwatrzy";
};


/***/ }),

/***/ "1793":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isFunction = __webpack_require__("6321");

var classRe = /^\s*class[\s{/}]/, functionToString = Function.prototype.toString;

module.exports = function (value) {
	if (!isFunction(value)) return false;
	if (classRe.test(functionToString.call(value))) return false;
	return true;
};


/***/ }),

/***/ "18ec":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var str = "razdwatrzy";

module.exports = function () {
	if (typeof str.contains !== "function") return false;
	return (str.contains("dwa") === true) && (str.contains("foo") === false);
};


/***/ }),

/***/ "1c4a":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__("ba61")() ? Symbol : __webpack_require__("94ee");


/***/ }),

/***/ "2031":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__("14ab")()
	? Object.assign
	: __webpack_require__("f60e");


/***/ }),

/***/ "214f":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

__webpack_require__("b0c5");
var redefine = __webpack_require__("2aba");
var hide = __webpack_require__("32e9");
var fails = __webpack_require__("79e5");
var defined = __webpack_require__("be13");
var wks = __webpack_require__("2b4c");
var regexpExec = __webpack_require__("520a");

var SPECIES = wks('species');

var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
  // #replace needs built-in support for named groups.
  // #match works fine because it just return the exec results, even if it has
  // a "grops" property.
  var re = /./;
  re.exec = function () {
    var result = [];
    result.groups = { a: '7' };
    return result;
  };
  return ''.replace(re, '$<a>') !== '7';
});

var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = (function () {
  // Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
  var re = /(?:)/;
  var originalExec = re.exec;
  re.exec = function () { return originalExec.apply(this, arguments); };
  var result = 'ab'.split(re);
  return result.length === 2 && result[0] === 'a' && result[1] === 'b';
})();

module.exports = function (KEY, length, exec) {
  var SYMBOL = wks(KEY);

  var DELEGATES_TO_SYMBOL = !fails(function () {
    // String methods call symbol-named RegEp methods
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  });

  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL ? !fails(function () {
    // Symbol-named RegExp methods call .exec
    var execCalled = false;
    var re = /a/;
    re.exec = function () { execCalled = true; return null; };
    if (KEY === 'split') {
      // RegExp[@@split] doesn't call the regex's exec method, but first creates
      // a new one. We need to return the patched regex when creating the new one.
      re.constructor = {};
      re.constructor[SPECIES] = function () { return re; };
    }
    re[SYMBOL]('');
    return !execCalled;
  }) : undefined;

  if (
    !DELEGATES_TO_SYMBOL ||
    !DELEGATES_TO_EXEC ||
    (KEY === 'replace' && !REPLACE_SUPPORTS_NAMED_GROUPS) ||
    (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
  ) {
    var nativeRegExpMethod = /./[SYMBOL];
    var fns = exec(
      defined,
      SYMBOL,
      ''[KEY],
      function maybeCallNative(nativeMethod, regexp, str, arg2, forceStringMethod) {
        if (regexp.exec === regexpExec) {
          if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
            // The native String method already delegates to @@method (this
            // polyfilled function), leasing to infinite recursion.
            // We avoid it by directly calling the native @@method method.
            return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
          }
          return { done: true, value: nativeMethod.call(str, regexp, arg2) };
        }
        return { done: false };
      }
    );
    var strfn = fns[0];
    var rxfn = fns[1];

    redefine(String.prototype, KEY, strfn);
    hide(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) { return rxfn.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) { return rxfn.call(string, this); }
    );
  }
};


/***/ }),

/***/ "230e":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("d3f4");
var document = __webpack_require__("7726").document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),

/***/ "2350":
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),

/***/ "23c6":
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__("2d95");
var TAG = __webpack_require__("2b4c")('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),

/***/ "2aba":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("7726");
var hide = __webpack_require__("32e9");
var has = __webpack_require__("69a8");
var SRC = __webpack_require__("ca5a")('src');
var $toString = __webpack_require__("fa5b");
var TO_STRING = 'toString';
var TPL = ('' + $toString).split(TO_STRING);

__webpack_require__("8378").inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});


/***/ }),

/***/ "2aeb":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__("cb7c");
var dPs = __webpack_require__("1495");
var enumBugKeys = __webpack_require__("e11e");
var IE_PROTO = __webpack_require__("613b")('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__("230e")('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__("fab2").appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),

/***/ "2b4c":
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__("5537")('wks');
var uid = __webpack_require__("ca5a");
var Symbol = __webpack_require__("7726").Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),

/***/ "2d00":
/***/ (function(module, exports) {

module.exports = false;


/***/ }),

/***/ "2d95":
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ "2f21":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fails = __webpack_require__("79e5");

module.exports = function (method, arg) {
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call
    arg ? method.call(null, function () { /* empty */ }, 1) : method.call(null);
  });
};


/***/ }),

/***/ "32e9":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("86cc");
var createDesc = __webpack_require__("4630");
module.exports = __webpack_require__("9e1e") ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "340c":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_VueJpqlAutocomplete_vue_vue_type_style_index_0_id_1aff63aa_scoped_true_lang_css_shadow__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("dad7");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_VueJpqlAutocomplete_vue_vue_type_style_index_0_id_1aff63aa_scoped_true_lang_css_shadow__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_VueJpqlAutocomplete_vue_vue_type_style_index_0_id_1aff63aa_scoped_true_lang_css_shadow__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_VueJpqlAutocomplete_vue_vue_type_style_index_0_id_1aff63aa_scoped_true_lang_css_shadow__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_VueJpqlAutocomplete_vue_vue_type_style_index_0_id_1aff63aa_scoped_true_lang_css_shadow__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_VueJpqlAutocomplete_vue_vue_type_style_index_0_id_1aff63aa_scoped_true_lang_css_shadow__WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "35d6":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-style-loader/lib/listToStyles.js
/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}

// CONCATENATED MODULE: ./node_modules/vue-style-loader/lib/addStylesShadow.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return addStylesToShadowDOM; });


function addStylesToShadowDOM (parentId, list, shadowRoot) {
  var styles = listToStyles(parentId, list)
  addStyles(styles, shadowRoot)
}

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

function addStyles (styles /* Array<StyleObject> */, shadowRoot) {
  const injectedStyles =
    shadowRoot._injectedStyles ||
    (shadowRoot._injectedStyles = {})
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var style = injectedStyles[item.id]
    if (!style) {
      for (var j = 0; j < item.parts.length; j++) {
        addStyle(item.parts[j], shadowRoot)
      }
      injectedStyles[item.id] = true
    }
  }
}

function createStyleElement (shadowRoot) {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  shadowRoot.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */, shadowRoot) {
  var styleElement = createStyleElement(shadowRoot)
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),

/***/ "38fd":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__("69a8");
var toObject = __webpack_require__("4bf8");
var IE_PROTO = __webpack_require__("613b")('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),

/***/ "3b2b":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("7726");
var inheritIfRequired = __webpack_require__("5dbc");
var dP = __webpack_require__("86cc").f;
var gOPN = __webpack_require__("9093").f;
var isRegExp = __webpack_require__("aae3");
var $flags = __webpack_require__("0bfb");
var $RegExp = global.RegExp;
var Base = $RegExp;
var proto = $RegExp.prototype;
var re1 = /a/g;
var re2 = /a/g;
// "new" creates a new object, old webkit buggy here
var CORRECT_NEW = new $RegExp(re1) !== re1;

if (__webpack_require__("9e1e") && (!CORRECT_NEW || __webpack_require__("79e5")(function () {
  re2[__webpack_require__("2b4c")('match')] = false;
  // RegExp constructor can alter flags and IsRegExp works correct with @@match
  return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
}))) {
  $RegExp = function RegExp(p, f) {
    var tiRE = this instanceof $RegExp;
    var piRE = isRegExp(p);
    var fiU = f === undefined;
    return !tiRE && piRE && p.constructor === $RegExp && fiU ? p
      : inheritIfRequired(CORRECT_NEW
        ? new Base(piRE && !fiU ? p.source : p, f)
        : Base((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? $flags.call(p) : f)
      , tiRE ? this : proto, $RegExp);
  };
  var proxy = function (key) {
    key in $RegExp || dP($RegExp, key, {
      configurable: true,
      get: function () { return Base[key]; },
      set: function (it) { Base[key] = it; }
    });
  };
  for (var keys = gOPN(Base), i = 0; keys.length > i;) proxy(keys[i++]);
  proto.constructor = $RegExp;
  $RegExp.prototype = proto;
  __webpack_require__("2aba")(global, 'RegExp', $RegExp);
}

__webpack_require__("7a56")('RegExp');


/***/ }),

/***/ "41a0":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__("2aeb");
var descriptor = __webpack_require__("4630");
var setToStringTag = __webpack_require__("7f20");
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__("32e9")(IteratorPrototype, __webpack_require__("2b4c")('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),

/***/ "4588":
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),

/***/ "4630":
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ "4917":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var anObject = __webpack_require__("cb7c");
var toLength = __webpack_require__("9def");
var advanceStringIndex = __webpack_require__("0390");
var regExpExec = __webpack_require__("5f1b");

// @@match logic
__webpack_require__("214f")('match', 1, function (defined, MATCH, $match, maybeCallNative) {
  return [
    // `String.prototype.match` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.match
    function match(regexp) {
      var O = defined(this);
      var fn = regexp == undefined ? undefined : regexp[MATCH];
      return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
    },
    // `RegExp.prototype[@@match]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@match
    function (regexp) {
      var res = maybeCallNative($match, regexp, this);
      if (res.done) return res.value;
      var rx = anObject(regexp);
      var S = String(this);
      if (!rx.global) return regExpExec(rx, S);
      var fullUnicode = rx.unicode;
      rx.lastIndex = 0;
      var A = [];
      var n = 0;
      var result;
      while ((result = regExpExec(rx, S)) !== null) {
        var matchStr = String(result[0]);
        A[n] = matchStr;
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
        n++;
      }
      return n === 0 ? null : A;
    }
  ];
});


/***/ }),

/***/ "4bf8":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__("be13");
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),

/***/ "520a":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var regexpFlags = __webpack_require__("0bfb");

var nativeExec = RegExp.prototype.exec;
// This always refers to the native implementation, because the
// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
// which loads this file before patching the method.
var nativeReplace = String.prototype.replace;

var patchedExec = nativeExec;

var LAST_INDEX = 'lastIndex';

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/,
      re2 = /b*/g;
  nativeExec.call(re1, 'a');
  nativeExec.call(re2, 'a');
  return re1[LAST_INDEX] !== 0 || re2[LAST_INDEX] !== 0;
})();

// nonparticipating capturing group, copied from es5-shim's String#split patch.
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED;

if (PATCH) {
  patchedExec = function exec(str) {
    var re = this;
    var lastIndex, reCopy, match, i;

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + re.source + '$(?!\\s)', regexpFlags.call(re));
    }
    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re[LAST_INDEX];

    match = nativeExec.call(re, str);

    if (UPDATES_LAST_INDEX_WRONG && match) {
      re[LAST_INDEX] = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
      // eslint-disable-next-line no-loop-func
      nativeReplace.call(match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    return match;
  };
}

module.exports = patchedExec;


/***/ }),

/***/ "52a7":
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),

/***/ "5537":
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__("8378");
var global = __webpack_require__("7726");
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__("2d00") ? 'pure' : 'global',
  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
});


/***/ }),

/***/ "55dd":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__("5ca1");
var aFunction = __webpack_require__("d8e8");
var toObject = __webpack_require__("4bf8");
var fails = __webpack_require__("79e5");
var $sort = [].sort;
var test = [1, 2, 3];

$export($export.P + $export.F * (fails(function () {
  // IE8-
  test.sort(undefined);
}) || !fails(function () {
  // V8 bug
  test.sort(null);
  // Old WebKit
}) || !__webpack_require__("2f21")($sort)), 'Array', {
  // 22.1.3.25 Array.prototype.sort(comparefn)
  sort: function sort(comparefn) {
    return comparefn === undefined
      ? $sort.call(toObject(this))
      : $sort.call(toObject(this), aFunction(comparefn));
  }
});


/***/ }),

/***/ "5a74":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  if (Object({"NODE_ENV":"production","BASE_URL":"/"}).NEED_CURRENTSCRIPT_POLYFILL) {
    __webpack_require__("f6fd")
  }

  var i
  if ((i = window.document.currentScript) && (i = i.src.match(/(.+\/)[^/]+\.js(\?.*)?$/))) {
    __webpack_require__.p = i[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

// EXTERNAL MODULE: external "Vue"
var external_Vue_ = __webpack_require__("8bbf");
var external_Vue_default = /*#__PURE__*/__webpack_require__.n(external_Vue_);

// CONCATENATED MODULE: ./node_modules/@vue/web-component-wrapper/dist/vue-wc-wrapper.js
const camelizeRE = /-(\w)/g;
const camelize = str => {
  return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : '')
};

const hyphenateRE = /\B([A-Z])/g;
const hyphenate = str => {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
};

function getInitialProps (propsList) {
  const res = {};
  propsList.forEach(key => {
    res[key] = undefined;
  });
  return res
}

function injectHook (options, key, hook) {
  options[key] = [].concat(options[key] || []);
  options[key].unshift(hook);
}

function callHooks (vm, hook) {
  if (vm) {
    const hooks = vm.$options[hook] || [];
    hooks.forEach(hook => {
      hook.call(vm);
    });
  }
}

function createCustomEvent (name, args) {
  return new CustomEvent(name, {
    bubbles: false,
    cancelable: false,
    detail: args
  })
}

const isBoolean = val => /function Boolean/.test(String(val));
const isNumber = val => /function Number/.test(String(val));

function convertAttributeValue (value, name, { type } = {}) {
  if (isBoolean(type)) {
    if (value === 'true' || value === 'false') {
      return value === 'true'
    }
    if (value === '' || value === name) {
      return true
    }
    return value != null
  } else if (isNumber(type)) {
    const parsed = parseFloat(value, 10);
    return isNaN(parsed) ? value : parsed
  } else {
    return value
  }
}

function toVNodes (h, children) {
  const res = [];
  for (let i = 0, l = children.length; i < l; i++) {
    res.push(toVNode(h, children[i]));
  }
  return res
}

function toVNode (h, node) {
  if (node.nodeType === 3) {
    return node.data.trim() ? node.data : null
  } else if (node.nodeType === 1) {
    const data = {
      attrs: getAttributes(node),
      domProps: {
        innerHTML: node.innerHTML
      }
    };
    if (data.attrs.slot) {
      data.slot = data.attrs.slot;
      delete data.attrs.slot;
    }
    return h(node.tagName, data)
  } else {
    return null
  }
}

function getAttributes (node) {
  const res = {};
  for (let i = 0, l = node.attributes.length; i < l; i++) {
    const attr = node.attributes[i];
    res[attr.nodeName] = attr.nodeValue;
  }
  return res
}

function wrap (Vue, Component) {
  const isAsync = typeof Component === 'function' && !Component.cid;
  let isInitialized = false;
  let hyphenatedPropsList;
  let camelizedPropsList;
  let camelizedPropsMap;

  function initialize (Component) {
    if (isInitialized) return

    const options = typeof Component === 'function'
      ? Component.options
      : Component;

    // extract props info
    const propsList = Array.isArray(options.props)
      ? options.props
      : Object.keys(options.props || {});
    hyphenatedPropsList = propsList.map(hyphenate);
    camelizedPropsList = propsList.map(camelize);
    const originalPropsAsObject = Array.isArray(options.props) ? {} : options.props || {};
    camelizedPropsMap = camelizedPropsList.reduce((map, key, i) => {
      map[key] = originalPropsAsObject[propsList[i]];
      return map
    }, {});

    // proxy $emit to native DOM events
    injectHook(options, 'beforeCreate', function () {
      const emit = this.$emit;
      this.$emit = (name, ...args) => {
        this.$root.$options.customElement.dispatchEvent(createCustomEvent(name, args));
        return emit.call(this, name, ...args)
      };
    });

    injectHook(options, 'created', function () {
      // sync default props values to wrapper on created
      camelizedPropsList.forEach(key => {
        this.$root.props[key] = this[key];
      });
    });

    // proxy props as Element properties
    camelizedPropsList.forEach(key => {
      Object.defineProperty(CustomElement.prototype, key, {
        get () {
          return this._wrapper.props[key]
        },
        set (newVal) {
          this._wrapper.props[key] = newVal;
        },
        enumerable: false,
        configurable: true
      });
    });

    isInitialized = true;
  }

  function syncAttribute (el, key) {
    const camelized = camelize(key);
    const value = el.hasAttribute(key) ? el.getAttribute(key) : undefined;
    el._wrapper.props[camelized] = convertAttributeValue(
      value,
      key,
      camelizedPropsMap[camelized]
    );
  }

  class CustomElement extends HTMLElement {
    constructor () {
      super();
      this.attachShadow({ mode: 'open' });

      const wrapper = this._wrapper = new Vue({
        name: 'shadow-root',
        customElement: this,
        shadowRoot: this.shadowRoot,
        data () {
          return {
            props: {},
            slotChildren: []
          }
        },
        render (h) {
          return h(Component, {
            ref: 'inner',
            props: this.props
          }, this.slotChildren)
        }
      });

      // Use MutationObserver to react to future attribute & slot content change
      const observer = new MutationObserver(mutations => {
        let hasChildrenChange = false;
        for (let i = 0; i < mutations.length; i++) {
          const m = mutations[i];
          if (isInitialized && m.type === 'attributes' && m.target === this) {
            syncAttribute(this, m.attributeName);
          } else {
            hasChildrenChange = true;
          }
        }
        if (hasChildrenChange) {
          wrapper.slotChildren = Object.freeze(toVNodes(
            wrapper.$createElement,
            this.childNodes
          ));
        }
      });
      observer.observe(this, {
        childList: true,
        subtree: true,
        characterData: true,
        attributes: true
      });
    }

    get vueComponent () {
      return this._wrapper.$refs.inner
    }

    connectedCallback () {
      const wrapper = this._wrapper;
      if (!wrapper._isMounted) {
        // initialize attributes
        const syncInitialAttributes = () => {
          wrapper.props = getInitialProps(camelizedPropsList);
          hyphenatedPropsList.forEach(key => {
            syncAttribute(this, key);
          });
        };

        if (isInitialized) {
          syncInitialAttributes();
        } else {
          // async & unresolved
          Component().then(resolved => {
            if (resolved.__esModule || resolved[Symbol.toStringTag] === 'Module') {
              resolved = resolved.default;
            }
            initialize(resolved);
            syncInitialAttributes();
          });
        }
        // initialize children
        wrapper.slotChildren = Object.freeze(toVNodes(
          wrapper.$createElement,
          this.childNodes
        ));
        wrapper.$mount();
        this.shadowRoot.appendChild(wrapper.$el);
      } else {
        callHooks(this.vueComponent, 'activated');
      }
    }

    disconnectedCallback () {
      callHooks(this.vueComponent, 'deactivated');
    }
  }

  if (!isAsync) {
    initialize(Component);
  }

  return CustomElement
}

/* harmony default export */ var vue_wc_wrapper = (wrap);

// EXTERNAL MODULE: ./node_modules/css-loader/lib/css-base.js
var css_base = __webpack_require__("2350");

// EXTERNAL MODULE: ./node_modules/vue-style-loader/lib/addStylesShadow.js + 1 modules
var addStylesShadow = __webpack_require__("35d6");

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"4a148d8c-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/VueJpqlAutocomplete.vue?vue&type=template&id=1aff63aa&scoped=true&shadow
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('vue-autosuggest',{ref:"autosuggest",attrs:{"suggestions":_vm.suggestions,"input-props":{placeholder: _vm.placeholder, class: 'autosuggest' },"get-suggestion-value":_vm.suggestionSelected},on:{"input":_vm.onInputChange,"focus":_vm.logEvent,"selected":_vm.focusInputBox,"click":_vm.getCursorPosition},scopedSlots:_vm._u([_vm._l((_vm.$scopedSlots),function(_,name){return {key:name,fn:function(slotData){return [_vm._t(name,null,null,slotData)]}}})],null,true),model:{value:(_vm.query),callback:function ($$v) {_vm.query=$$v},expression:"query"}},[_vm._l((_vm.$slots),function(_,name){return _vm._t(name,null,{"slot":name})})],2)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/VueJpqlAutocomplete.vue?vue&type=template&id=1aff63aa&scoped=true&shadow

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom.iterable.js
var web_dom_iterable = __webpack_require__("ac6a");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.regexp.match.js
var es6_regexp_match = __webpack_require__("4917");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.regexp.constructor.js
var es6_regexp_constructor = __webpack_require__("3b2b");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.regexp.replace.js
var es6_regexp_replace = __webpack_require__("a481");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.array.sort.js
var es6_array_sort = __webpack_require__("55dd");

// CONCATENATED MODULE: ./node_modules/vue-autosuggest/dist/vue-autosuggest.esm.js
var DefaultSection={name:"default-section",props:{section:{type:Object,required:!0},currentIndex:{type:[Number,String],required:!1,default:1/0},renderSuggestion:{type:Function,required:!1},normalizeItemFunction:{type:Function,required:!0}},data:function(){return{_currentIndex:null}},computed:{list:function(){var e=this.section,t=e.limit,n=e.data;return n.length<t&&(t=n.length),n.slice(0,t)}},methods:{getItemIndex:function(e){return this.section.start_index+e},getItemByIndex:function(e){return this.section.data[e]},onMouseEnter:function(e){var t=e.currentTarget.getAttribute("data-suggestion-index");this._currentIndex=t,this.$emit("updateCurrentIndex",t)},onMouseLeave:function(){this.$emit("updateCurrentIndex",null)}},render:function(e){var t=this,n={beforeSection:this.$scopedSlots["before-section-"+this.section.name],afterSectionDefault:this.$scopedSlots["after-section"],afterSectionNamed:this.$scopedSlots["after-section-"+this.section.name]},s="autosuggest__results-before autosuggest__results-before--"+this.section.name,i=n.beforeSection&&n.beforeSection({section:this.section,className:s})||[];return e("ul",{attrs:{role:"listbox","aria-labelledby":"autosuggest"}},[i[0]&&i[0]||this.section.label&&e("li",{class:s},this.section.label)||"",this.list.map(function(n,s){var i=t.normalizeItemFunction(t.section.name,t.section.type,t.section.label,n);return e("li",{attrs:{role:"option","data-suggestion-index":t.getItemIndex(s),"data-section-name":t.section.name,id:"autosuggest__results-item--"+t.getItemIndex(s)},key:t.getItemIndex(s),class:{"autosuggest__results-item--highlighted":t.getItemIndex(s)==t._currentIndex,"autosuggest__results-item":!0},on:{mouseenter:t.onMouseEnter,mouseleave:t.onMouseLeave}},[t.renderSuggestion?t.renderSuggestion(i):t.$scopedSlots.default&&t.$scopedSlots.default({_key:s,suggestion:i})])}),n.afterSectionDefault&&n.afterSectionDefault({section:this.section,className:"autosuggest__results-after autosuggest__results-after--"+this.section.name}),n.afterSectionNamed&&n.afterSectionNamed({section:this.section,className:"autosuggest__results_after autosuggest__results-after--"+this.section.name})])}};function hasClass(e,t){return!!e.className.match(new RegExp("(\\s|^)"+t+"(\\s|$)"))}function addClass(e,t){hasClass(e,t)||(e.className+=" "+t)}function removeClass(e,t){e.classList&&e.classList.remove(t)}var defaultSectionConfig={name:"default",type:"default-section"},VueAutosuggest={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:e.componentAttrIdAutosuggest}},[e._t("before-input"),n("input",e._g(e._b({class:[e.isOpen?"autosuggest__input--open":"",e.internal_inputProps.class],attrs:{type:e.internal_inputProps.type,autocomplete:e.internal_inputProps.autocomplete,role:"combobox","aria-autocomplete":"list","aria-owns":"autosuggest__results","aria-activedescendant":e.isOpen&&null!==e.currentIndex?"autosuggest__results-item--"+e.currentIndex:"","aria-haspopup":e.isOpen?"true":"false","aria-expanded":e.isOpen?"true":"false"},domProps:{value:e.internalValue},on:{input:e.inputHandler,keydown:e.handleKeyStroke}},"input",e.internal_inputProps,!1),e.listeners)),e._t("after-input"),e._v(" "),n("div",{class:e.componentAttrClassAutosuggestResultsContainer},[e.isOpen?n("div",{class:e.componentAttrClassAutosuggestResults,attrs:{"aria-labelledby":e.componentAttrIdAutosuggest}},[e._t("before-suggestions"),e._v(" "),e._l(e.computedSections,function(t,s){return n(t.type,{key:e.getSectionRef(s),ref:e.getSectionRef(s),refInFor:!0,tag:"component",attrs:{"current-index":e.currentIndex,"normalize-item-function":e.normalizeItem,"render-suggestion":e.renderSuggestion,section:t},on:{updateCurrentIndex:e.updateCurrentIndex},scopedSlots:e._u([{key:"before-section-"+(t.name||t.label),fn:function(n){var s=n.section,i=n.className;return[e._t("before-section-"+(t.name||t.label),null,{section:s,className:i})]}},{key:"default",fn:function(t){var n=t.suggestion,s=t._key;return[e._t("default",[e._v(" "+e._s(n.item)+" ")],{suggestion:n,index:s})]}},{key:"after-section-"+(t.name||t.label),fn:function(n){var s=n.section;return[e._t("after-section-"+(t.name||t.label),null,{section:s})]}},{key:"after-section",fn:function(t){var n=t.section;return[e._t("after-section",null,{section:n})]}}])})}),e._v(" "),e._t("after-suggestions")],2):e._e()])],2)},staticRenderFns:[],name:"Autosuggest",components:{DefaultSection:DefaultSection},props:{value:{type:String,default:null},inputProps:{type:Object,required:!0},limit:{type:Number,required:!1,default:1/0},suggestions:{type:Array,required:!0},renderSuggestion:{type:Function,required:!1,default:null},getSuggestionValue:{type:Function,required:!1,default:function(e){var t=e.item;return"object"==typeof t&&t.hasOwnProperty("name")?t.name:t}},shouldRenderSuggestions:{type:Function,required:!1,default:function(e,t){return e>0&&!t}},sectionConfigs:{type:Object,required:!1,default:function(){return{default:{onSelected:null}}}},onSelected:{type:Function,required:!1,default:null},componentAttrIdAutosuggest:{type:String,required:!1,default:"autosuggest"},componentAttrClassAutosuggestResultsContainer:{type:String,required:!1,default:"autosuggest__results-container"},componentAttrClassAutosuggestResults:{type:String,required:!1,default:"autosuggest__results"}},data:function(){return{internalValue:null,searchInputOriginal:null,currentIndex:null,currentItem:null,loading:!1,didSelectFromOptions:!1,internal_inputProps:{},defaultInputProps:{type:"text",autocomplete:"off"},clientXMouseDownInitial:null}},computed:{listeners:function(){var e=this;return Object.assign({},this.$listeners,{input:function(e){},click:function(){e.loading=!1,e.$listeners.click&&e.$listeners.click(e.currentItem),e.ensureItemVisible(e.currentItem,e.currentIndex)},selected:function(){e.currentItem&&e.sectionConfigs[e.currentItem.name]&&e.sectionConfigs[e.currentItem.name].onSelected?e.sectionConfigs[e.currentItem.name].onSelected(e.currentItem,e.searchInputOriginal):e.sectionConfigs.default.onSelected?e.sectionConfigs.default.onSelected(null,e.searchInputOriginal):e.$listeners.selected&&e.$emit("selected",e.currentItem),e.setChangeItem(null)}})},isOpen:function(){return this.shouldRenderSuggestions(this.totalResults,this.loading)},computedSections:function(){var e=this,t=0;return this.suggestions.map(function(n){if(n.data){var s,i,u=n.name?n.name:defaultSectionConfig.name,r=null;e.sectionConfigs[u]&&(s=e.sectionConfigs[u].limit,r=e.sectionConfigs[u].type,i=e.sectionConfigs[u].label),r=r||defaultSectionConfig.type,s=(s=s||e.limit)||1/0,s=n.data.length<s?n.data.length:s;var o={name:u,label:i=i||n.label,type:r,limit:s,data:n.data,start_index:t,end_index:t+s-1};return t+=s,o}})},totalResults:function(){return this.computedSections.reduce(function(e,t){var n=t.limit,s=t.data;return e+(s.length>=n?n:s.length)},0)}},watch:{value:{handler:function(e){this.internalValue=e},immediate:!0}},created:function(){this.internal_inputProps=Object.assign({},this.defaultInputProps,this.inputProps),this.loading=!0},mounted:function(){document.addEventListener("mouseup",this.onDocumentMouseUp),document.addEventListener("mousedown",this.onDocumentMouseDown)},beforeDestroy:function(){document.removeEventListener("mouseup",this.onDocumentMouseUp),document.removeEventListener("mousedown",this.onDocumentMouseDown)},methods:{inputHandler:function(e){var t=e.target.value;this.$emit("input",t),this.internalValue=t,this.didSelectFromOptions||(this.searchInputOriginal=t,this.currentIndex=null)},getSectionRef:function(e){return"computed_section_"+e},getItemByIndex:function(e){var t=!1;if(null===e)return t;for(var n=0;n<this.computedSections.length;n++)if(e>=this.computedSections[n].start_index&&e<=this.computedSections[n].end_index){var s=e-this.computedSections[n].start_index,i=this.$refs["computed_section_"+n][0];if(i){t=this.normalizeItem(this.computedSections[n].name,this.computedSections[n].type,i.section.label,i.getItemByIndex(s));break}}return t},handleKeyStroke:function(e){var t=e.keyCode;if(!([16,9,18,91,93].indexOf(t)>-1))switch(this.loading=!1,this.didSelectFromOptions=!1,t){case 40:case 38:if(e.preventDefault(),this.isOpen){if(38===t&&null===this.currentIndex)break;var n=40===t?1:-1,s=parseInt(this.currentIndex)+n;this.setCurrentIndex(s,this.totalResults),this.didSelectFromOptions=!0,this.totalResults>0&&this.currentIndex>=0?(this.setChangeItem(this.getItemByIndex(this.currentIndex)),this.didSelectFromOptions=!0):-1==this.currentIndex&&(this.currentIndex=null,this.internalValue=this.searchInputOriginal,e.preventDefault())}break;case 13:e.preventDefault(),this.totalResults>0&&this.currentIndex>=0&&(this.setChangeItem(this.getItemByIndex(this.currentIndex),!0),this.didSelectFromOptions=!0),this.loading=!0,this.listeners.selected(this.didSelectFromOptions);break;case 27:this.isOpen&&(this.loading=!0,this.currentIndex=null,this.internalValue=this.searchInputOriginal,this.$emit("input",this.searchInputOriginal),e.preventDefault())}},setChangeItem:function(e,t){if(void 0===t&&(t=!1),null!==this.currentIndex&&e){if(e){this.currentItem=e;var n=this.getSuggestionValue(e);this.internalValue=n,t&&(this.searchInputOriginal=n),this.ensureItemVisible(e,this.currentIndex)}}else this.currentItem=null},normalizeItem:function(e,t,n,s){return{name:e,type:t,label:n,item:s}},ensureItemVisible:function(e,t){var n=this.$el.querySelector("."+this.componentAttrClassAutosuggestResults);if(e&&(t||0===t)&&n){var s=this.$el.querySelector("#autosuggest__results-item--"+t);if(s){var i=n.clientHeight,u=n.scrollTop,r=s.clientHeight,o=s.offsetTop;r+o>=u+i?n.scrollTop=r+o-i:o<u&&u>0&&(n.scrollTop=o)}}},updateCurrentIndex:function(e){this.setCurrentIndex(e,-1,!0)},clickedOnScrollbar:function(e,t){var n=this.$el.querySelector("."+this.componentAttrClassAutosuggestResults),s=n&&n.clientWidth<=t+17&&t+17<=n.clientWidth+34;return"DIV"===e.target.tagName&&n&&s||!1},onDocumentMouseDown:function(e){var t=e.target.getBoundingClientRect?e.target.getBoundingClientRect():0;this.clientXMouseDownInitial=e.clientX-t.left},onDocumentMouseUp:function(e){this.$el.contains(e.target)&&"INPUT"===e.target.tagName||this.clickedOnScrollbar(e,this.clientXMouseDownInitial)||(null!==this.currentIndex&&this.isOpen?(this.loading=!0,this.didSelectFromOptions=!0,this.setChangeItem(this.getItemByIndex(this.currentIndex),!0),this.listeners.selected(!0)):this.loading=!0)},setCurrentIndex:function(e,t,n){void 0===t&&(t=-1),void 0===n&&(n=!1);var s=e;n||(null===this.currentIndex||e>=t)&&(s=0);this.currentIndex=s;var i=this.$el.querySelector("#autosuggest__results-item--"+this.currentIndex),u="autosuggest__results-item--highlighted";this.$el.querySelector("."+u)&&removeClass(this.$el.querySelector("."+u),u),i&&addClass(i,u)}}},VueAutosuggestPlugin={install:function(e){e.component("vue-autosuggest-default-section",DefaultSection),e.component("vue-autosuggest",VueAutosuggest)}};"undefined"!=typeof window&&window.Vue&&window.Vue.use(VueAutosuggestPlugin);/* harmony default export */ var vue_autosuggest_esm = (VueAutosuggestPlugin);

// EXTERNAL MODULE: ./node_modules/sql-where-parser/SqlWhereParser.js
var SqlWhereParser = __webpack_require__("7d94");
var SqlWhereParser_default = /*#__PURE__*/__webpack_require__.n(SqlWhereParser);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/VueJpqlAutocomplete.vue?vue&type=script&lang=js&shadow





//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var VueJpqlAutocompletevue_type_script_lang_js_shadow = ({
  name: 'VueJpqlAutocomplete',
  components: {
    VueAutosuggest: VueAutosuggest
  },
  data: function data() {
    return {
      token: '',
      tokens: [],
      tokenType: 0,
      // 0-field, 1-operator, 2-value, 3-logicalop
      suggestions: [],
      query: '',
      sqlParser: new SqlWhereParser_default.a()
    };
  },
  props: {
    placeholder: {
      type: String,
      default: 'Type query here...'
    },
    operators: {
      type: Array,
      default: function _default() {
        return ['=', '<>', '>', '>=', '<', '<='];
      }
    },
    fieldSettings: {
      type: Array,
      default: function _default() {
        return [{
          name: 'status',
          values: ['Open', 'Closed'],
          type: 'string'
        }, {
          name: 'id',
          type: 'number'
        }, {
          name: 'description',
          type: 'string'
        }];
      }
    }
  },
  computed: {
    fieldSuggestions() {
      return this.fieldSettings.map(fs => {
        return fs.name;
      }).sort();
    },

    isValid() {
      var parsed = this.query;

      try {
        parsed = this.sqlParser.parse(this.query);
      } catch (err) {
        return false;
      }

      return typeof parsed !== 'string';
    }

  },
  methods: {
    logEvent: function logEvent() {},
    focusInputBox: function focusInputBox() {
      this.$refs.autosuggest.$el.querySelector('input.autosuggest').focus();
    },
    suggestionSelected: function suggestionSelected(val) {
      return this.query.replace(new RegExp(this.token + '$'), val.item);
    },
    getCursorPosition: function getCursorPosition() {},
    onInputChange: function onInputChange(originalVal) {
      var val = originalVal.substring(0, this.$refs.autosuggest.$el.querySelector('input.autosuggest').selectionStart);
      this.token = '';
      var i = 0;

      if (val.trimStart().length > 0) {
        val = val.trimStart().replace(this.bracketsRegex, '');
        this.tokens = val.match(this.parser); //console.log(this.tokens);

        this.token = this.tokens[this.tokens.length - 1].trim();
        i = (this.tokens.length - 1) % 4;
      }

      switch (i) {
        case 0:
          this.suggestFields(this.token);
          break;

        case 1:
          this.suggestOperators(this.token);
          break;

        case 2:
          this.suggestValues(this.token);
          break;

        case 3:
          this.suggestLogicalOps(this.token);
          break;
      }
    },
    suggestFields: function suggestFields(val) {
      this.suggestions = [{
        data: this.fieldSuggestions.filter(f => {
          return f.indexOf(val) > -1;
        })
      }];
    },
    suggestOperators: function suggestOperators(val) {
      val = val.toUpperCase();
      this.suggestions = [{
        data: this.operators.filter(o => {
          return o.indexOf(val) > -1;
        })
      }];
    },
    suggestValues: function suggestValues(val) {
      var fieldToken = this.tokens[this.tokens.length - 3].trim();
      var fieldSetting = this.fieldSettings.filter(fs => {
        return fs.name == fieldToken;
      })[0];
      this.suggestions = [{
        data: fieldSetting.values ? fieldSetting.values.filter(f => {
          return f.indexOf(val) > -1;
        }) : [`Provide a ${fieldSetting.type || 'text'} value for searching.`]
      }];
    },
    suggestLogicalOps: function suggestLogicalOps() {
      this.suggestions = [{
        data: ['AND', 'OR']
      }];
    }
  },

  mounted() {
    this.suggestFields('');
    var regex = '([\\s]+\'?[\\w%]+\'?|[\\w]+|[\\s]+' + this.operators.join('?|[\\s]+') + '?)';
    this.parser = new RegExp(regex, 'ig');
  },

  created() {
    this.bracketsRegex = /[()]/g;
  }

});
// CONCATENATED MODULE: ./src/components/VueJpqlAutocomplete.vue?vue&type=script&lang=js&shadow
 /* harmony default export */ var components_VueJpqlAutocompletevue_type_script_lang_js_shadow = (VueJpqlAutocompletevue_type_script_lang_js_shadow); 
// CONCATENATED MODULE: ./src/components/VueJpqlAutocomplete.vue?shadow



function injectStyles (context) {
  
  var style0 = __webpack_require__("340c")
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var component = normalizeComponent(
  components_VueJpqlAutocompletevue_type_script_lang_js_shadow,
  render,
  staticRenderFns,
  false,
  injectStyles,
  "1aff63aa",
  null
  ,true
)

/* harmony default export */ var VueJpqlAutocompleteshadow = (component.exports);
// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-wc.js




// runtime shared by every component chunk





window.customElements.define('vue-jpql-autocomplete', vue_wc_wrapper(external_Vue_default.a, VueJpqlAutocompleteshadow))

/***/ }),

/***/ "5ca1":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("7726");
var core = __webpack_require__("8378");
var hide = __webpack_require__("32e9");
var redefine = __webpack_require__("2aba");
var ctx = __webpack_require__("9b43");
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),

/***/ "5dbc":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("d3f4");
var setPrototypeOf = __webpack_require__("8b97").set;
module.exports = function (that, target, C) {
  var S = target.constructor;
  var P;
  if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf) {
    setPrototypeOf(that, P);
  } return that;
};


/***/ }),

/***/ "5edd":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isValue = __webpack_require__("936a");

// prettier-ignore
var possibleTypes = { "object": true, "function": true, "undefined": true /* document.all */ };

module.exports = function (value) {
	if (!isValue(value)) return false;
	return hasOwnProperty.call(possibleTypes, typeof value);
};


/***/ }),

/***/ "5f1b":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var classof = __webpack_require__("23c6");
var builtinExec = RegExp.prototype.exec;

 // `RegExpExec` abstract operation
// https://tc39.github.io/ecma262/#sec-regexpexec
module.exports = function (R, S) {
  var exec = R.exec;
  if (typeof exec === 'function') {
    var result = exec.call(R, S);
    if (typeof result !== 'object') {
      throw new TypeError('RegExp exec method returned something other than an Object or null');
    }
    return result;
  }
  if (classof(R) !== 'RegExp') {
    throw new TypeError('RegExp#exec called on incompatible receiver');
  }
  return builtinExec.call(R, S);
};


/***/ }),

/***/ "613b":
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__("5537")('keys');
var uid = __webpack_require__("ca5a");
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),

/***/ "626a":
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__("2d95");
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),

/***/ "62c4":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _undefined = __webpack_require__("e76c")(); // Support ES3 engines

module.exports = function (val) {
 return (val !== _undefined) && (val !== null);
};


/***/ }),

/***/ "6321":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isPrototype = __webpack_require__("9013");

module.exports = function (value) {
	if (typeof value !== "function") return false;

	if (!hasOwnProperty.call(value, "length")) return false;

	try {
		if (typeof value.length !== "number") return false;
		if (typeof value.call !== "function") return false;
		if (typeof value.apply !== "function") return false;
	} catch (error) {
		return false;
	}

	return !isPrototype(value);
};


/***/ }),

/***/ "6821":
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__("626a");
var defined = __webpack_require__("be13");
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),

/***/ "69a8":
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),

/***/ "6a99":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__("d3f4");
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "6c58":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const MODE_NONE = 'modeNone';
const MODE_DEFAULT = 'modeDefault';
const MODE_MATCH = 'modeMatch';

/**
 * Sorts the tokenizable substrings by their length DESC.
 *
 * @param {string} a
 * @param {string} b
 * @returns {number}
 */
const sortTokenizableSubstrings = (a, b) => {

    if (a.length > b.length) {
        return -1;
    }
    if (a.length < b.length) {
        return 1;
    }
    return 0;
};

const endsWith = (str, suffix) => {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
};

/**
 * Create an instance of this class for each new string you wish to parse.
 */
class Tokenizer {

    /**
     *
     * @param {TokenizeThis} factory
     * @param {string} str
     * @param {function} forEachToken
     */
    constructor(factory, str, forEachToken) {

        /**
         * Holds the processed configuration.
         *
         * @type {TokenizeThis}
         */
        this.factory = factory;

        /**
         * The string to tokenize.
         *
         * @type {string}
         */
        this.str = str;

        /**
         * The function to call for teach token.
         *
         * @type {Function}
         */
        this.forEachToken = forEachToken;

        /**
         * The previous character consumed.
         *
         * @type {string}
         */
        this.previousChr = '';

        /**
         * The current quote to match.
         *
         * @type {string}
         */
        this.toMatch = '';

        /**
         * The current token being created.
         *
         * @type {string}
         */
        this.currentToken = '';

        /**
         * Keeps track of the current "mode" of tokenization.
         * The tokenization rules are different depending if you are tokenizing an explicit string (surrounded by quotes),
         * versus a non-explicit string (not surrounded by quotes).
         *
         * @type {*[]}
         */
        this.modeStack = [MODE_NONE];
    }

    /**
     *
     * @returns {string}
     */
    getCurrentMode() {

        return this.modeStack[this.modeStack.length - 1];
    }

    /**
     *
     * @param {string} mode
     * @returns {Number}
     */
    setCurrentMode(mode) {
        
        return this.modeStack.push(mode);
    }

    /**
     *
     * @returns {string}
     */
    completeCurrentMode() {

        const currentMode = this.getCurrentMode();

        if (currentMode === MODE_DEFAULT) {
            this.pushDefaultModeTokenizables();
        }

        /**
         * Don't push out empty tokens, unless they were an explicit string, e.g. ""
         */
        if ((currentMode === MODE_MATCH && this.currentToken === '') || this.currentToken !== '') {
            this.push(this.currentToken);
        }
        this.currentToken = '';

        return this.modeStack.pop();
    }

    /**
     *
     * @param {*} token
     */
    push(token) {

        let surroundedBy = '';

        if (this.factory.convertLiterals && this.getCurrentMode() !== MODE_MATCH) {

            /**
             * Convert the string version of literals into their...literal..form.
             */
            switch(token.toLowerCase()) {
                case 'null':
                    token = null;
                    break;
                case 'true':
                    token = true;
                    break;
                case 'false':
                    token = false;
                    break;
                default:
                    if (isFinite(token)) {
                        token = Number(token);
                    }
                    break;
            }
        } else {

            /**
             * The purpose of also transmitting the surroundedBy quote is to inform whether or not the token was an explicit string,
             * versus a non-explicit string, e.g. "=" vs. =
             * @type {string}
             */
            surroundedBy = this.toMatch;
        }

        if (this.forEachToken) {
            this.forEachToken(token, surroundedBy);
        }
    }

    tokenize() {

        let index = 0;

        while(index < this.str.length) {

            this.consume(this.str.charAt(index++));
        }

        while (this.getCurrentMode() !== MODE_NONE) {

            this.completeCurrentMode();
        }
    }

    /**
     *
     * @param {string} chr
     */
    consume(chr) {

        this[this.getCurrentMode()](chr);
        this.previousChr = chr;
    }

    /**
     *
     * @param {string} chr
     * @returns {*}
     */
    [MODE_NONE](chr) {

        if (!this.factory.matchMap[chr]) {

            this.setCurrentMode(MODE_DEFAULT);
            return this.consume(chr);
        }

        this.setCurrentMode(MODE_MATCH);
        this.toMatch = chr;
    }

    /**
     *
     * @param {string} chr
     * @returns {string}
     */
    [MODE_DEFAULT](chr) {

        /**
         * If we encounter a delimiter, its time to push out the current token.
         */
        if (this.factory.delimiterMap[chr]) {

            return this.completeCurrentMode();
        }

        /**
         * If we encounter a quote, only push out the current token if there's a sub-token directly before it.
         */
        if (this.factory.matchMap[chr]) {

            let tokenizeIndex = 0;

            while (tokenizeIndex < this.factory.tokenizeList.length) {

                if (endsWith(this.currentToken, this.factory.tokenizeList[tokenizeIndex++])) {
                    this.completeCurrentMode();
                    return this.consume(chr);
                }
            }
        }

        this.currentToken+=chr;

        return this.currentToken;
    }

    /**
     * This crazy function parses out potential tokenizable substrings out of the current token.
     *
     * @returns {*}
     */
    pushDefaultModeTokenizables() {

        // TODO: refactor this to be more performant.

        let tokenizeIndex = 0;
        let lowestIndexOfTokenize = Infinity;
        let toTokenize = null;

        /**
         * Iterate through the list of tokenizable substrings.
         */
        while(this.currentToken && tokenizeIndex < this.factory.tokenizeList.length) {

            const tokenize = this.factory.tokenizeList[tokenizeIndex++];
            const indexOfTokenize = this.currentToken.indexOf(tokenize);

            /**
             * Find the substring closest to the beginning of the current token.
             */
            if (indexOfTokenize !== -1 && indexOfTokenize < lowestIndexOfTokenize) {

                lowestIndexOfTokenize = indexOfTokenize;
                toTokenize = tokenize;
            }
        }

        /**
         * No substrings to tokenize.  You're done.
         */
        if (!toTokenize) {
            return;
        }

        /**
         * A substring was found, but not at the very beginning of the string, e.g. A=B, where "=" is the substring.
         * This will push out "A" first.
         */
        if (lowestIndexOfTokenize > 0) {
            this.push(this.currentToken.substring(0, lowestIndexOfTokenize));
        }

        /**
         * Push out the substring, then modify the current token to be everything past that substring.
         * Recursively call this function again until there are no more substrings to tokenize.
         */
        if (lowestIndexOfTokenize !== -1) {

            this.push(toTokenize);
            this.currentToken = this.currentToken.substring(lowestIndexOfTokenize + toTokenize.length);
            return this.pushDefaultModeTokenizables();
        }
    }

    /**
     *
     * @param {string} chr
     * @returns {string}
     */
    [MODE_MATCH](chr) {

        if (chr === this.toMatch) {

            if (this.previousChr !== this.factory.escapeCharacter) {

                return this.completeCurrentMode();
            }
            this.currentToken = this.currentToken.substring(0, this.currentToken.length - 1);
        }

        this.currentToken+=chr;
        
        return this.currentToken;
    }
}

/**
 * This is the main class.  It takes in the config, processes it, and creates tokenizer instances based on that config.
 */
class TokenizeThis {

    /**
     *
     * @param {{shouldTokenize: string[], shouldMatch: string[], shouldDelimitBy: string[]}} [config]
     */
    constructor(config) {

        if (!config) {
            config = {};
        }

        /**
         *
         * @type {{shouldTokenize: string[], shouldMatch: string[], shouldDelimitBy: string[], convertLiterals: boolean, escapeCharacter: string}}
         */
        config = Object.assign({}, this.constructor.defaultConfig, config);

        /**
         *
         * @type {boolean}
         */
        this.convertLiterals = config.convertLiterals;

        /**
         * 
         * @type {string}
         */
        this.escapeCharacter = config.escapeCharacter;

        /**
         * Holds the list of tokenizable substrings.
         *
         * @type {Array}
         */
        this.tokenizeList = [];

        /**
         * Holds an easy lookup map of tokenizable substrings.
         *
         * @type {{}}
         */
        this.tokenizeMap = {};

        /**
         * Holds the list of quotes to match explicit strings with.
         *
         * @type {Array}
         */
        this.matchList = [];

        /**
         * Holds an easy lookup map of quotes to match explicit strings with.
         *
         * @type {{}}
         */
        this.matchMap = {};

        /**
         * Holds the list of delimiters.
         *
         * @type {Array}
         */
        this.delimiterList = [];

        /**
         * Holds an easy lookup map of delimiters.
         *
         * @type {{}}
         */
        this.delimiterMap = {};

        /**
         * Sorts the tokenizable substrings based on their length,
         * such that "<=" will get matched before "<" does.
         */
        config.shouldTokenize.sort(sortTokenizableSubstrings).forEach((token) => {

            if (!this.tokenizeMap[token]) {
                this.tokenizeList.push(token);
                this.tokenizeMap[token] = token;
            }
        });

        config.shouldMatch.forEach((match) => {

            if (!this.matchMap[match]) {
                this.matchList.push(match);
                this.matchMap[match] = match;
            }
        });

        config.shouldDelimitBy.forEach((delimiter) => {

            if (!this.delimiterMap[delimiter]) {
                this.delimiterList.push(delimiter);
                this.delimiterMap[delimiter] = delimiter;
            }
        });
    }

    /**
     * Creates a Tokenizer, then immediately calls "tokenize".
     *
     * @param {string} str
     * @param {function} forEachToken
     * @returns {*}
     */
    tokenize(str, forEachToken) {

        const tokenizerInstance = new Tokenizer(this, str, forEachToken);
        return tokenizerInstance.tokenize();
    }

    /**
     *
     * @returns {{shouldTokenize: string[], shouldMatch: string[], shouldDelimitBy: string[], convertLiterals: boolean, escapeCharacter: string}}
     */
    static get defaultConfig() {

        return {
            shouldTokenize: ['(', ')', ',', '*', '/', '%', '+', '-', '=', '!=', '!', '<', '>', '<=', '>=', '^'],
            shouldMatch: ['"', "'", '`'],
            shouldDelimitBy: [' ', "\n", "\r", "\t"],
            convertLiterals: true,
            escapeCharacter: "\\"
        };
    }
}

/**
 *
 * @type {TokenizeThis}
 */
module.exports = TokenizeThis;

/***/ }),

/***/ "7373":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isValue = __webpack_require__("62c4");

var keys = Object.keys;

module.exports = function (object) { return keys(isValue(object) ? Object(object) : object); };


/***/ }),

/***/ "7726":
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),

/***/ "77f1":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("4588");
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),

/***/ "79e5":
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),

/***/ "7a56":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__("7726");
var dP = __webpack_require__("86cc");
var DESCRIPTORS = __webpack_require__("9e1e");
var SPECIES = __webpack_require__("2b4c")('species');

module.exports = function (KEY) {
  var C = global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),

/***/ "7bdf":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__("ecf9")() ? Object.keys : __webpack_require__("7373");


/***/ }),

/***/ "7d94":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const Symbol = __webpack_require__("1c4a");
const TokenizeThis = __webpack_require__("6c58");

/**
 * To distinguish between the binary minus and unary.
 *
 * @type {Symbol}
 */
const OPERATOR_UNARY_MINUS = Symbol('-');

/**
 * Number of operands in a unary operation.
 *
 * @type {number}
 */
const OPERATOR_TYPE_UNARY = 1;

/**
 * Number of operands in a binary operation.
 *
 * @type {number}
 */
const OPERATOR_TYPE_BINARY = 2;

/**
 * Number of operands in a ternary operation.
 *
 * @type {number}
 */
const OPERATOR_TYPE_TERNARY = 3;

/**
 * Defining the use of the unary minus.
 *
 * @type {{operators: [{}], tokenizer: {shouldTokenize: string[], shouldMatch: string[], shouldDelimitBy: string[]}}}
 */
const unaryMinusDefinition = {
    [OPERATOR_UNARY_MINUS]: OPERATOR_TYPE_UNARY
};

/**
 * A wrapper class around operators to distinguish them from regular tokens.
 */
class Operator {
    
    constructor(value, type, precedence) {
        this.value = value;
        this.type = type;
        this.precedence = precedence;
    }
    toJSON() {
        return this.value;
    }
    toString() {
        return `${this.value}`;
    }
}

/**
 * The main parser class.
 */
class SqlWhereParser {

    /**
     *
     * @param {{operators: [{}], tokenizer: {shouldTokenize: string[], shouldMatch: string[], shouldDelimitBy: string[]}}} [config]
     */
    constructor(config) {

        if (!config) {
            config = {};
        }

        /**
         *
         * @type {{operators: [{}], tokenizer: {shouldTokenize: string[], shouldMatch: string[], shouldDelimitBy: string[]}}}
         */
        config = Object.assign({}, this.constructor.defaultConfig, config);

        /**
         *
         * @type {TokenizeThis}
         */
        this.tokenizer = new TokenizeThis(config.tokenizer);

        /**
         *
         * @type {{}}
         */
        this.operators = {};

        /**
         * Flattens the operator definitions into a single object,
         * whose keys are the operators, and the values are the Operator class wrappers.
         */
        config.operators.forEach((operators, precedence) => {
            
            Object.keys(operators).concat(Object.getOwnPropertySymbols(operators)).forEach((operator) => {

                this.operators[operator] = new Operator(operator, operators[operator], precedence);
            });
        });
    }

    /**
     *
     * @param {string} sql
     * @param {function} [evaluator]
     * @returns {{}}
     */
    parse(sql, evaluator) {

        const operatorStack = [];
        const outputStream = [];
        let lastOperator = undefined;
        let tokenCount = 0;
        let lastTokenWasOperatorOrLeftParenthesis = false;

        if (!evaluator) {
            evaluator = this.defaultEvaluator;
        }

        /**
         * The following mess is an implementation of the Shunting-Yard Algorithm: http://wcipeg.com/wiki/Shunting_yard_algorithm
         * See also: https://en.wikipedia.org/wiki/Shunting-yard_algorithm
         */
        this.tokenizer.tokenize(`(${sql})`, (token, surroundedBy) => {

            tokenCount++;

            /**
             * Read a token.
             */

            if (typeof token === 'string' && !surroundedBy) {

                let normalizedToken = token.toUpperCase();

                /**
                 * If the token is an operator, o1, then:
                 */
                if (this.operators[normalizedToken]) {

                    /**
                     * Hard-coded rule for between to ignore the next AND.
                     */
                    if (lastOperator === 'BETWEEN' && normalizedToken === 'AND') {
                        lastOperator = 'AND';
                        return;
                    }

                    /**
                     * If the conditions are right for unary minus, convert it.
                     */
                    if (normalizedToken === '-' && (tokenCount === 1 || lastTokenWasOperatorOrLeftParenthesis)) {
                        normalizedToken = OPERATOR_UNARY_MINUS;
                    }

                    /**
                     * While there is an operator token o2 at the top of the operator stack,
                     * and o1's precedence is less than or equal to that of o2,
                     * pop o2 off the operator stack, onto the output queue:
                     */
                    while (operatorStack[operatorStack.length - 1] && operatorStack[operatorStack.length - 1] !== '(' && this.operatorPrecedenceFromValues(normalizedToken, operatorStack[operatorStack.length - 1])) {

                        const operator = this.operators[operatorStack.pop()];
                        const operands = [];
                        let numOperands = operator.type;
                        while (numOperands--) {
                            operands.unshift(outputStream.pop());
                        }
                        outputStream.push(evaluator(operator.value, operands));
                    }

                    /**
                     * At the end of iteration push o1 onto the operator stack.
                     */
                    operatorStack.push(normalizedToken);
                    lastOperator = normalizedToken;

                    lastTokenWasOperatorOrLeftParenthesis = true;

                    /**
                     * If the token is a left parenthesis (i.e. "("), then push it onto the stack:
                     */
                } else if (token === '(') {

                    operatorStack.push(token);
                    lastTokenWasOperatorOrLeftParenthesis = true;

                    /**
                     * If the token is a right parenthesis (i.e. ")"):
                     */
                } else if (token === ')') {

                    /**
                     * Until the token at the top of the stack is a left parenthesis,
                     * pop operators off the stack onto the output queue.
                     */
                    while(operatorStack.length && operatorStack[operatorStack.length - 1] !== '(') {

                        const operator = this.operators[operatorStack.pop()];
                        const operands = [];
                        let numOperands = operator.type;
                        while (numOperands--) {
                            operands.unshift(outputStream.pop());
                        }

                        outputStream.push(evaluator(operator.value, operands));
                    }
                    if (!operatorStack.length) {
                        throw new SyntaxError('Unmatched parenthesis.');
                    }
                    /**
                     * Pop the left parenthesis from the stack, but not onto the output queue.
                     */
                    operatorStack.pop();
                    lastTokenWasOperatorOrLeftParenthesis = false;

                    /**
                     * Push everything else to the output queue.
                     */
                } else {
                    outputStream.push(token);
                    lastTokenWasOperatorOrLeftParenthesis = false;
                }

                /**
                 * Push explicit strings to the output queue.
                 */
            } else {
                outputStream.push(token);
                lastTokenWasOperatorOrLeftParenthesis = false;
            }
        });


        /**
         * While there are still operator tokens in the stack:
         */
        while (operatorStack.length) {

            const operatorValue = operatorStack.pop();

            /**
             * If the operator token on the top of the stack is a parenthesis, then there are mismatched parentheses.
             */
            if (operatorValue === '(') {
                throw new SyntaxError('Unmatched parenthesis.');
            }
            const operator = this.operators[operatorValue];
            const operands = [];
            let numOperands = operator.type;
            while (numOperands--) {
                operands.unshift(outputStream.pop());
            }

            /**
             * Pop the operator onto the output queue.
             */
            outputStream.push(evaluator(operator.value, operands));
        }

        if (outputStream.length > 1) {
            throw new SyntaxError('Could not reduce to a single expression.');
        }

        return outputStream[0];
    }

    /**
     *
     * @param {string} sql
     * @returns {[]}
     */
    toArray(sql) {

        let expression = [];
        let tokenCount = 0;
        let lastToken = undefined;
        const expressionParentheses = [];

        this.tokenizer.tokenize(`(${sql})`, (token, surroundedBy) => {
            
            tokenCount++;
            
            switch (token) {
                case '(':
                    expressionParentheses.push(expression.length);
                    break;
                case ')':
                    const precedenceParenthesisIndex = expressionParentheses.pop();

                    let expressionTokens = expression.splice(precedenceParenthesisIndex, expression.length);

                    while(expressionTokens && expressionTokens.constructor === Array && expressionTokens.length === 1) {
                        expressionTokens = expressionTokens[0];
                    }
                    expression.push(expressionTokens);
                    break;
                case '':
                    break;
                case ',':
                    break;
                default:
                    let operator = null;
                    if (!surroundedBy) {
                        operator = this.getOperator(token);
                        if (token === '-' && (tokenCount === 1 || (lastToken === '(' || (lastToken && lastToken.constructor === Operator)))) {
                            operator = this.getOperator(OPERATOR_UNARY_MINUS);
                        }
                    }
                    expression.push(operator ? operator : token);
                    break;
            }
            lastToken = token;
        });

        while(expression && expression.constructor === Array && expression.length === 1) {
            expression = expression[0];
        }

        return expression;
    }

    /**
     *
     * @param {string|Symbol} operatorValue1
     * @param {string|Symbol} operatorValue2
     * @returns {boolean}
     */
    operatorPrecedenceFromValues(operatorValue1, operatorValue2) {

        return this.operators[operatorValue2].precedence <= this.operators[operatorValue1].precedence;
    }

    /**
     *
     * @param {string|Symbol} operatorValue
     * @returns {*}
     */
    getOperator(operatorValue) {

        if (typeof operatorValue === 'string') {
            return this.operators[operatorValue.toUpperCase()];
        }
        if (typeof operatorValue === 'symbol') {
            return this.operators[operatorValue];
        }
        return null;
    }


    /**
     *
     * @param {string|Symbol} operatorValue
     * @param {[]} operands
     * @returns {*}
     */
    defaultEvaluator(operatorValue, operands) {

        /**
         * Convert back to regular minus, now that we have the proper number of operands.
         */
        if (operatorValue === OPERATOR_UNARY_MINUS) {
            operatorValue = '-';
        }
        /**
         * This is a trick to avoid the problem of inconsistent comma usage in SQL.
         */
        if (operatorValue === ',') {
            return [].concat(operands[0], operands[1]);
        }

        return {
            [operatorValue]: operands
        };
    }

    /**
     * 
     * @returns {{operators: [{}], tokenizer: {shouldTokenize: string[], shouldMatch: string[], shouldDelimitBy: string[]}}}
     */
    static get defaultConfig() {
        
        return {
            operators: [ // TODO: add more operator definitions
                {
                    '!': OPERATOR_TYPE_UNARY
                },
                unaryMinusDefinition,
                {
                    '^': OPERATOR_TYPE_BINARY
                },
                {
                    '*': OPERATOR_TYPE_BINARY,
                    '/': OPERATOR_TYPE_BINARY,
                    '%': OPERATOR_TYPE_BINARY
                },
                {
                    '+': OPERATOR_TYPE_BINARY,
                    '-': OPERATOR_TYPE_BINARY
                },
                {
                    '=': OPERATOR_TYPE_BINARY,
                    '<': OPERATOR_TYPE_BINARY,
                    '>': OPERATOR_TYPE_BINARY,
                    '<=': OPERATOR_TYPE_BINARY,
                    '>=': OPERATOR_TYPE_BINARY,
                    '!=': OPERATOR_TYPE_BINARY
                },
                {
                    ',': OPERATOR_TYPE_BINARY // We treat commas as an operator, to aid in turning arbitrary numbers of comma-separated values into arrays.
                },
                {
                    'NOT': OPERATOR_TYPE_UNARY
                },
                {
                    'BETWEEN': OPERATOR_TYPE_TERNARY,
                    'IN': OPERATOR_TYPE_BINARY,
                    'IS': OPERATOR_TYPE_BINARY,
                    'LIKE': OPERATOR_TYPE_BINARY
                },
                {
                    'AND': OPERATOR_TYPE_BINARY
                },
                {
                    'OR': OPERATOR_TYPE_BINARY
                }
            ],
            tokenizer: {
                shouldTokenize: ['(', ')', ',', '*', '/', '%', '+', '-', '=', '!=','!', '<', '>', '<=', '>=', '^'],
                shouldMatch: ['"', "'", '`'],
                shouldDelimitBy: [' ', "\n", "\r", "\t"]
            }
        };
    }

    static get Operator() {
        return Operator;
    }

    static get OPERATOR_UNARY_MINUS() {
        return OPERATOR_UNARY_MINUS;
    }
}

/**
 *
 * @type {SqlWhereParser}
 */
module.exports = SqlWhereParser;

/***/ }),

/***/ "7f20":
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__("86cc").f;
var has = __webpack_require__("69a8");
var TAG = __webpack_require__("2b4c")('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),

/***/ "8378":
/***/ (function(module, exports) {

var core = module.exports = { version: '2.6.9' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),

/***/ "84f2":
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ "86cc":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("cb7c");
var IE8_DOM_DEFINE = __webpack_require__("c69a");
var toPrimitive = __webpack_require__("6a99");
var dP = Object.defineProperty;

exports.f = __webpack_require__("9e1e") ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "8b97":
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__("d3f4");
var anObject = __webpack_require__("cb7c");
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__("9b43")(Function.call, __webpack_require__("11e9").f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),

/***/ "8bbf":
/***/ (function(module, exports) {

module.exports = Vue;

/***/ }),

/***/ "9013":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isObject = __webpack_require__("5edd");

module.exports = function (value) {
	if (!isObject(value)) return false;
	try {
		if (!value.constructor) return false;
		return value.constructor.prototype === value;
	} catch (error) {
		return false;
	}
};


/***/ }),

/***/ "9093":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__("ce10");
var hiddenKeys = __webpack_require__("e11e").concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),

/***/ "936a":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// ES3 safe
var _undefined = void 0;

module.exports = function (value) { return value !== _undefined && value !== null; };


/***/ }),

/***/ "94ee":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// ES2015 Symbol polyfill for environments that do not (or partially) support it



var d              = __webpack_require__("f508")
  , validateSymbol = __webpack_require__("b380")

  , create = Object.create, defineProperties = Object.defineProperties
  , defineProperty = Object.defineProperty, objPrototype = Object.prototype
  , NativeSymbol, SymbolPolyfill, HiddenSymbol, globalSymbols = create(null)
  , isNativeSafe;

if (typeof Symbol === 'function') {
	NativeSymbol = Symbol;
	try {
		String(NativeSymbol());
		isNativeSafe = true;
	} catch (ignore) {}
}

var generateName = (function () {
	var created = create(null);
	return function (desc) {
		var postfix = 0, name, ie11BugWorkaround;
		while (created[desc + (postfix || '')]) ++postfix;
		desc += (postfix || '');
		created[desc] = true;
		name = '@@' + desc;
		defineProperty(objPrototype, name, d.gs(null, function (value) {
			// For IE11 issue see:
			// https://connect.microsoft.com/IE/feedbackdetail/view/1928508/
			//    ie11-broken-getters-on-dom-objects
			// https://github.com/medikoo/es6-symbol/issues/12
			if (ie11BugWorkaround) return;
			ie11BugWorkaround = true;
			defineProperty(this, name, d(value));
			ie11BugWorkaround = false;
		}));
		return name;
	};
}());

// Internal constructor (not one exposed) for creating Symbol instances.
// This one is used to ensure that `someSymbol instanceof Symbol` always return false
HiddenSymbol = function Symbol(description) {
	if (this instanceof HiddenSymbol) throw new TypeError('Symbol is not a constructor');
	return SymbolPolyfill(description);
};

// Exposed `Symbol` constructor
// (returns instances of HiddenSymbol)
module.exports = SymbolPolyfill = function Symbol(description) {
	var symbol;
	if (this instanceof Symbol) throw new TypeError('Symbol is not a constructor');
	if (isNativeSafe) return NativeSymbol(description);
	symbol = create(HiddenSymbol.prototype);
	description = (description === undefined ? '' : String(description));
	return defineProperties(symbol, {
		__description__: d('', description),
		__name__: d('', generateName(description))
	});
};
defineProperties(SymbolPolyfill, {
	for: d(function (key) {
		if (globalSymbols[key]) return globalSymbols[key];
		return (globalSymbols[key] = SymbolPolyfill(String(key)));
	}),
	keyFor: d(function (s) {
		var key;
		validateSymbol(s);
		for (key in globalSymbols) if (globalSymbols[key] === s) return key;
	}),

	// To ensure proper interoperability with other native functions (e.g. Array.from)
	// fallback to eventual native implementation of given symbol
	hasInstance: d('', (NativeSymbol && NativeSymbol.hasInstance) || SymbolPolyfill('hasInstance')),
	isConcatSpreadable: d('', (NativeSymbol && NativeSymbol.isConcatSpreadable) ||
		SymbolPolyfill('isConcatSpreadable')),
	iterator: d('', (NativeSymbol && NativeSymbol.iterator) || SymbolPolyfill('iterator')),
	match: d('', (NativeSymbol && NativeSymbol.match) || SymbolPolyfill('match')),
	replace: d('', (NativeSymbol && NativeSymbol.replace) || SymbolPolyfill('replace')),
	search: d('', (NativeSymbol && NativeSymbol.search) || SymbolPolyfill('search')),
	species: d('', (NativeSymbol && NativeSymbol.species) || SymbolPolyfill('species')),
	split: d('', (NativeSymbol && NativeSymbol.split) || SymbolPolyfill('split')),
	toPrimitive: d('', (NativeSymbol && NativeSymbol.toPrimitive) || SymbolPolyfill('toPrimitive')),
	toStringTag: d('', (NativeSymbol && NativeSymbol.toStringTag) || SymbolPolyfill('toStringTag')),
	unscopables: d('', (NativeSymbol && NativeSymbol.unscopables) || SymbolPolyfill('unscopables'))
});

// Internal tweaks for real symbol producer
defineProperties(HiddenSymbol.prototype, {
	constructor: d(SymbolPolyfill),
	toString: d('', function () { return this.__name__; })
});

// Proper implementation of methods exposed on Symbol.prototype
// They won't be accessible on produced symbol instances as they derive from HiddenSymbol.prototype
defineProperties(SymbolPolyfill.prototype, {
	toString: d(function () { return 'Symbol (' + validateSymbol(this).__description__ + ')'; }),
	valueOf: d(function () { return validateSymbol(this); })
});
defineProperty(SymbolPolyfill.prototype, SymbolPolyfill.toPrimitive, d('', function () {
	var symbol = validateSymbol(this);
	if (typeof symbol === 'symbol') return symbol;
	return symbol.toString();
}));
defineProperty(SymbolPolyfill.prototype, SymbolPolyfill.toStringTag, d('c', 'Symbol'));

// Proper implementaton of toPrimitive and toStringTag for returned symbol instances
defineProperty(HiddenSymbol.prototype, SymbolPolyfill.toStringTag,
	d('c', SymbolPolyfill.prototype[SymbolPolyfill.toStringTag]));

// Note: It's important to define `toPrimitive` as last one, as some implementations
// implement `toPrimitive` natively without implementing `toStringTag` (or other specified symbols)
// And that may invoke error in definition flow:
// See: https://github.com/medikoo/es6-symbol/issues/13#issuecomment-164146149
defineProperty(HiddenSymbol.prototype, SymbolPolyfill.toPrimitive,
	d('c', SymbolPolyfill.prototype[SymbolPolyfill.toPrimitive]));


/***/ }),

/***/ "96ae":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isValue = __webpack_require__("62c4");

module.exports = function (value) {
	if (!isValue(value)) throw new TypeError("Cannot use null or undefined");
	return value;
};


/***/ }),

/***/ "9b43":
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__("d8e8");
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ "9c6c":
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = __webpack_require__("2b4c")('unscopables');
var ArrayProto = Array.prototype;
if (ArrayProto[UNSCOPABLES] == undefined) __webpack_require__("32e9")(ArrayProto, UNSCOPABLES, {});
module.exports = function (key) {
  ArrayProto[UNSCOPABLES][key] = true;
};


/***/ }),

/***/ "9def":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__("4588");
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),

/***/ "9e1e":
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__("79e5")(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "a481":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var anObject = __webpack_require__("cb7c");
var toObject = __webpack_require__("4bf8");
var toLength = __webpack_require__("9def");
var toInteger = __webpack_require__("4588");
var advanceStringIndex = __webpack_require__("0390");
var regExpExec = __webpack_require__("5f1b");
var max = Math.max;
var min = Math.min;
var floor = Math.floor;
var SUBSTITUTION_SYMBOLS = /\$([$&`']|\d\d?|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&`']|\d\d?)/g;

var maybeToString = function (it) {
  return it === undefined ? it : String(it);
};

// @@replace logic
__webpack_require__("214f")('replace', 2, function (defined, REPLACE, $replace, maybeCallNative) {
  return [
    // `String.prototype.replace` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.replace
    function replace(searchValue, replaceValue) {
      var O = defined(this);
      var fn = searchValue == undefined ? undefined : searchValue[REPLACE];
      return fn !== undefined
        ? fn.call(searchValue, O, replaceValue)
        : $replace.call(String(O), searchValue, replaceValue);
    },
    // `RegExp.prototype[@@replace]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
    function (regexp, replaceValue) {
      var res = maybeCallNative($replace, regexp, this, replaceValue);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);
      var functionalReplace = typeof replaceValue === 'function';
      if (!functionalReplace) replaceValue = String(replaceValue);
      var global = rx.global;
      if (global) {
        var fullUnicode = rx.unicode;
        rx.lastIndex = 0;
      }
      var results = [];
      while (true) {
        var result = regExpExec(rx, S);
        if (result === null) break;
        results.push(result);
        if (!global) break;
        var matchStr = String(result[0]);
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
      }
      var accumulatedResult = '';
      var nextSourcePosition = 0;
      for (var i = 0; i < results.length; i++) {
        result = results[i];
        var matched = String(result[0]);
        var position = max(min(toInteger(result.index), S.length), 0);
        var captures = [];
        // NOTE: This is equivalent to
        //   captures = result.slice(1).map(maybeToString)
        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
        for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));
        var namedCaptures = result.groups;
        if (functionalReplace) {
          var replacerArgs = [matched].concat(captures, position, S);
          if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
          var replacement = String(replaceValue.apply(undefined, replacerArgs));
        } else {
          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
        }
        if (position >= nextSourcePosition) {
          accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
          nextSourcePosition = position + matched.length;
        }
      }
      return accumulatedResult + S.slice(nextSourcePosition);
    }
  ];

    // https://tc39.github.io/ecma262/#sec-getsubstitution
  function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
    var tailPos = position + matched.length;
    var m = captures.length;
    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
    if (namedCaptures !== undefined) {
      namedCaptures = toObject(namedCaptures);
      symbols = SUBSTITUTION_SYMBOLS;
    }
    return $replace.call(replacement, symbols, function (match, ch) {
      var capture;
      switch (ch.charAt(0)) {
        case '$': return '$';
        case '&': return matched;
        case '`': return str.slice(0, position);
        case "'": return str.slice(tailPos);
        case '<':
          capture = namedCaptures[ch.slice(1, -1)];
          break;
        default: // \d\d?
          var n = +ch;
          if (n === 0) return match;
          if (n > m) {
            var f = floor(n / 10);
            if (f === 0) return match;
            if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
            return match;
          }
          capture = captures[n - 1];
      }
      return capture === undefined ? '' : capture;
    });
  }
});


/***/ }),

/***/ "aae3":
/***/ (function(module, exports, __webpack_require__) {

// 7.2.8 IsRegExp(argument)
var isObject = __webpack_require__("d3f4");
var cof = __webpack_require__("2d95");
var MATCH = __webpack_require__("2b4c")('match');
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
};


/***/ }),

/***/ "ac6a":
/***/ (function(module, exports, __webpack_require__) {

var $iterators = __webpack_require__("cadf");
var getKeys = __webpack_require__("0d58");
var redefine = __webpack_require__("2aba");
var global = __webpack_require__("7726");
var hide = __webpack_require__("32e9");
var Iterators = __webpack_require__("84f2");
var wks = __webpack_require__("2b4c");
var ITERATOR = wks('iterator');
var TO_STRING_TAG = wks('toStringTag');
var ArrayValues = Iterators.Array;

var DOMIterables = {
  CSSRuleList: true, // TODO: Not spec compliant, should be false.
  CSSStyleDeclaration: false,
  CSSValueList: false,
  ClientRectList: false,
  DOMRectList: false,
  DOMStringList: false,
  DOMTokenList: true,
  DataTransferItemList: false,
  FileList: false,
  HTMLAllCollection: false,
  HTMLCollection: false,
  HTMLFormElement: false,
  HTMLSelectElement: false,
  MediaList: true, // TODO: Not spec compliant, should be false.
  MimeTypeArray: false,
  NamedNodeMap: false,
  NodeList: true,
  PaintRequestList: false,
  Plugin: false,
  PluginArray: false,
  SVGLengthList: false,
  SVGNumberList: false,
  SVGPathSegList: false,
  SVGPointList: false,
  SVGStringList: false,
  SVGTransformList: false,
  SourceBufferList: false,
  StyleSheetList: true, // TODO: Not spec compliant, should be false.
  TextTrackCueList: false,
  TextTrackList: false,
  TouchList: false
};

for (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {
  var NAME = collections[i];
  var explicit = DOMIterables[NAME];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  var key;
  if (proto) {
    if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
    if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    if (explicit) for (key in $iterators) if (!proto[key]) redefine(proto, key, $iterators[key], true);
  }
}


/***/ }),

/***/ "b0c5":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var regexpExec = __webpack_require__("520a");
__webpack_require__("5ca1")({
  target: 'RegExp',
  proto: true,
  forced: regexpExec !== /./.exec
}, {
  exec: regexpExec
});


/***/ }),

/***/ "b380":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isSymbol = __webpack_require__("1126");

module.exports = function (value) {
	if (!isSymbol(value)) throw new TypeError(value + " is not a symbol");
	return value;
};


/***/ }),

/***/ "ba61":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var validTypes = { object: true, symbol: true };

module.exports = function () {
	var symbol;
	if (typeof Symbol !== 'function') return false;
	symbol = Symbol('test symbol');
	try { String(symbol); } catch (e) { return false; }

	// Return 'true' also for polyfills
	if (!validTypes[typeof Symbol.iterator]) return false;
	if (!validTypes[typeof Symbol.toPrimitive]) return false;
	if (!validTypes[typeof Symbol.toStringTag]) return false;

	return true;
};


/***/ }),

/***/ "be13":
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),

/***/ "c366":
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__("6821");
var toLength = __webpack_require__("9def");
var toAbsoluteIndex = __webpack_require__("77f1");
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),

/***/ "c69a":
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__("9e1e") && !__webpack_require__("79e5")(function () {
  return Object.defineProperty(__webpack_require__("230e")('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "ca5a":
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),

/***/ "cadf":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__("9c6c");
var step = __webpack_require__("d53b");
var Iterators = __webpack_require__("84f2");
var toIObject = __webpack_require__("6821");

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__("01f9")(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),

/***/ "cb7c":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("d3f4");
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),

/***/ "ce10":
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__("69a8");
var toIObject = __webpack_require__("6821");
var arrayIndexOf = __webpack_require__("c366")(false);
var IE_PROTO = __webpack_require__("613b")('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),

/***/ "d3f4":
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ "d53b":
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),

/***/ "d8e8":
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),

/***/ "dad7":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("de8f");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to Shadow Root
var add = __webpack_require__("35d6").default
module.exports.__inject__ = function (shadowRoot) {
  add("18ee016e", content, shadowRoot)
};

/***/ }),

/***/ "de8f":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("2350")(false);
// imports


// module
exports.push([module.i, "div[data-v-1aff63aa],div[data-v-1aff63aa] .autosuggest,div[data-v-1aff63aa] .autosuggest__results-container{width:100%}div[data-v-1aff63aa] .autosuggest__results{margin:0;position:absolute;z-index:10000001;width:calc(100% - 20px);background:#fff;border:1px solid #e0e0e0;border-bottom-left-radius:4px;border-bottom-right-radius:4px;padding:0;overflow:scroll;max-height:400px}div[data-v-1aff63aa] .autosuggest__results ul{-webkit-padding-start:10px;padding-inline-start:10px}div[data-v-1aff63aa] .autosuggest__results ul li{list-style:none;display:block;text-align:left}", ""]);

// exports


/***/ }),

/***/ "e11e":
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),

/***/ "e76c":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// eslint-disable-next-line no-empty-function
module.exports = function () {};


/***/ }),

/***/ "ecf9":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function () {
	try {
		Object.keys("primitive");
		return true;
	} catch (e) {
		return false;
	}
};


/***/ }),

/***/ "f3a6":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isValue = __webpack_require__("62c4");

var forEach = Array.prototype.forEach, create = Object.create;

var process = function (src, obj) {
	var key;
	for (key in src) obj[key] = src[key];
};

// eslint-disable-next-line no-unused-vars
module.exports = function (opts1 /*, …options*/) {
	var result = create(null);
	forEach.call(arguments, function (options) {
		if (!isValue(options)) return;
		process(Object(options), result);
	});
	return result;
};


/***/ }),

/***/ "f508":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isValue         = __webpack_require__("936a")
  , isPlainFunction = __webpack_require__("1793")
  , assign          = __webpack_require__("2031")
  , normalizeOpts   = __webpack_require__("f3a6")
  , contains        = __webpack_require__("f973");

var d = (module.exports = function (dscr, value/*, options*/) {
	var c, e, w, options, desc;
	if (arguments.length < 2 || typeof dscr !== "string") {
		options = value;
		value = dscr;
		dscr = null;
	} else {
		options = arguments[2];
	}
	if (isValue(dscr)) {
		c = contains.call(dscr, "c");
		e = contains.call(dscr, "e");
		w = contains.call(dscr, "w");
	} else {
		c = w = true;
		e = false;
	}

	desc = { value: value, configurable: c, enumerable: e, writable: w };
	return !options ? desc : assign(normalizeOpts(options), desc);
});

d.gs = function (dscr, get, set/*, options*/) {
	var c, e, options, desc;
	if (typeof dscr !== "string") {
		options = set;
		set = get;
		get = dscr;
		dscr = null;
	} else {
		options = arguments[3];
	}
	if (!isValue(get)) {
		get = undefined;
	} else if (!isPlainFunction(get)) {
		options = get;
		get = set = undefined;
	} else if (!isValue(set)) {
		set = undefined;
	} else if (!isPlainFunction(set)) {
		options = set;
		set = undefined;
	}
	if (isValue(dscr)) {
		c = contains.call(dscr, "c");
		e = contains.call(dscr, "e");
	} else {
		c = true;
		e = false;
	}

	desc = { get: get, set: set, configurable: c, enumerable: e };
	return !options ? desc : assign(normalizeOpts(options), desc);
};


/***/ }),

/***/ "f60e":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var keys  = __webpack_require__("7bdf")
  , value = __webpack_require__("96ae")
  , max   = Math.max;

module.exports = function (dest, src /*, …srcn*/) {
	var error, i, length = max(arguments.length, 2), assign;
	dest = Object(value(dest));
	assign = function (key) {
		try {
			dest[key] = src[key];
		} catch (e) {
			if (!error) error = e;
		}
	};
	for (i = 1; i < length; ++i) {
		src = arguments[i];
		keys(src).forEach(assign);
	}
	if (error !== undefined) throw error;
	return dest;
};


/***/ }),

/***/ "f6fd":
/***/ (function(module, exports) {

// document.currentScript polyfill by Adam Miller

// MIT license

(function(document){
  var currentScript = "currentScript",
      scripts = document.getElementsByTagName('script'); // Live NodeList collection

  // If browser needs currentScript polyfill, add get currentScript() to the document object
  if (!(currentScript in document)) {
    Object.defineProperty(document, currentScript, {
      get: function(){

        // IE 6-10 supports script readyState
        // IE 10+ support stack trace
        try { throw new Error(); }
        catch (err) {

          // Find the second match for the "at" string to get file src url from stack.
          // Specifically works with the format of stack traces in IE.
          var i, res = ((/.*at [^\(]*\((.*):.+:.+\)$/ig).exec(err.stack) || [false])[1];

          // For all scripts on the page, if src matches or if ready state is interactive, return the script tag
          for(i in scripts){
            if(scripts[i].src == res || scripts[i].readyState == "interactive"){
              return scripts[i];
            }
          }

          // If no match, return null
          return null;
        }
      }
    });
  }
})(document);


/***/ }),

/***/ "f967":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var indexOf = String.prototype.indexOf;

module.exports = function (searchString/*, position*/) {
	return indexOf.call(this, searchString, arguments[1]) > -1;
};


/***/ }),

/***/ "f973":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__("18ec")()
	? String.prototype.contains
	: __webpack_require__("f967");


/***/ }),

/***/ "fa5b":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("5537")('native-function-to-string', Function.toString);


/***/ }),

/***/ "fab2":
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__("7726").document;
module.exports = document && document.documentElement;


/***/ })

/******/ });
//# sourceMappingURL=vue-jpql-autocomplete.js.map
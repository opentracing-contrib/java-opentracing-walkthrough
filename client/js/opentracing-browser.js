(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Tracer"] = factory();
	else
		root["Tracer"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = __webpack_require__(1);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _singleton = __webpack_require__(2);
	
	var _singleton2 = _interopRequireDefault(_singleton);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	module.exports = new _singleton2.default();

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _tracer = __webpack_require__(3);
	
	var _tracer2 = _interopRequireDefault(_tracer);
	
	var _constants = __webpack_require__(5);
	
	var Constants = _interopRequireWildcard(_constants);
	
	var _binary_carrier = __webpack_require__(6);
	
	var _binary_carrier2 = _interopRequireDefault(_binary_carrier);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	/**
	 * The Singleton object extends the standard Tracer object so that the default
	 * exported object of the package can be conveniently be used both as the
	 * default tracer and an interface to the library.
	 */
	
	var Singleton = function (_Tracer) {
	    _inherits(Singleton, _Tracer);
	
	    _createClass(Singleton, [{
	        key: 'initGlobalTracer',
	
	
	        // ---------------------------------------------------------------------- //
	        // OpenTracing API methods
	        // ---------------------------------------------------------------------- //
	
	        /**
	         * Set the global Tracer's underlying implementation.
	         *
	         * The behavior is undefined if this function is called more than once.
	         *
	         * @param {TracerImp} The Tracer implementation object
	         */
	        value: function initGlobalTracer(tracerImp) {
	            this._imp = tracerImp;
	
	            // Provide the implementation with a handle to the interface. This can
	            // also be used a post-initialization signal.
	            if (tracerImp) {
	                tracerImp.setInterface(this);
	            }
	        }
	
	        /**
	         * Create a new Tracer object with the given underlying implementation.
	         *
	         * @return {Tracer} a new Tracer object
	         */
	
	    }, {
	        key: 'initNewTracer',
	        value: function initNewTracer(tracerImp) {
	            var tracer = new _tracer2.default(tracerImp);
	            if (tracerImp) {
	                tracerImp.setInterface(this);
	            }
	            return tracer;
	        }
	
	        // ---------------------------------------------------------------------- //
	        // Private and non-standard methods
	        // ---------------------------------------------------------------------- //
	
	        /**
	         * Creates the Singleton with no underlying implementation (i.e. defaults
	         * to no-op behavior for all functions).
	         *
	         * The OpenTracing package-level object acts both at the singleton and the
	         * package interface itself, so this Singleton is both a the Tracer and
	         * also includes all the global library symbols.
	         *
	         * Note: this should never be called directly by consumers of the library.
	         */
	
	    }]);
	
	    function Singleton() {
	        _classCallCheck(this, Singleton);
	
	        // Merge the constants into the singleton object so they are accessible at the
	        // package level.
	
	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Singleton).call(this));
	
	        for (var key in Constants) {
	            _this[key] = Constants[key];
	        }
	
	        // Carrier objects to be exposed at the package level
	        _this.BinaryCarrier = _binary_carrier2.default;
	        return _this;
	    }
	
	    return Singleton;
	}(_tracer2.default);

	exports.default = Singleton;
	module.exports = exports['default'];

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _span = __webpack_require__(4);
	
	var _span2 = _interopRequireDefault(_span);
	
	var _constants = __webpack_require__(5);
	
	var _constants2 = _interopRequireDefault(_constants);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * Tracer is the entry-point between the instrumentation API and the tracing
	 * implementation.
	 *
	 * The default object acts as a no-op implementation.
	 */
	
	var Tracer = function () {
	    _createClass(Tracer, [{
	        key: 'startSpan',
	
	
	        // ---------------------------------------------------------------------- //
	        // OpenTracing API methods
	        // ---------------------------------------------------------------------- //
	
	        /**
	         * Starts and returns a new Span representing a logical unit of work.
	         *
	         * @param  {string|object} nameOrFields
	         *         If the given argument is a `string`, it is the name of the
	         *         the operation from the perpsective of the current service.
	         *
	         *         If the given argument is a object, it is treated as a set of
	         *         fields to set on the newly created span.
	         *
	         *         - `operationName` {string} Required. This is the name to use for
	         *              the newly created span.
	         *         - `parent` {Span}  Optional. The newly created Span will be created
	         *              as a child of `parent`.
	         *         - `tags` {object} Optional set of key-value pairs which will be set as
	         *              tags on the newly created Span. Ownership of the object is
	         *              passed to the created span and the caller for efficiency
	         *              reasons.
	         *         - `startTime` {Number} Optional manually specified start time for the
	         *              created Span object. The time should be specified in
	         *              milliseconds as Unix timestamp. Decimal value are supported
	         *              to represent time values with sub-millisecond accuracy.
	         *
	         * @return {Span}
	         *         A new Span object.
	         */
	        value: function startSpan(nameOrFields, fields) {
	            if (true) {
	                if (arguments.length > 2) {
	                    throw new Error('Invalid number of arguments.');
	                }
	                if (typeof nameOrFields !== 'string' && typeof nameOrFields !== 'object') {
	                    throw new Error('argument expected to be a string or object');
	                }
	                if (typeof nameOrFields === 'string' && nameOrFields.length === 0) {
	                    throw new Error('operation name cannot be length zero');
	                }
	                if (typeof nameOrFields === 'object') {
	                    if (arguments.length !== 1) {
	                        throw new Error('Unexpected number of arguments');
	                    }
	                    if (nameOrFields === null) {
	                        throw new Error('fields should not be null');
	                    }
	                    if (!nameOrFields.operationName) {
	                        throw new Error('operationName is a required parameter');
	                    }
	                }
	            }
	
	            var spanImp = null;
	            if (this._imp) {
	                // Normalize the argument so the implementation is always provided
	                // an associative array of fields.
	                if (arguments.length === 1) {
	                    if (typeof nameOrFields === 'string') {
	                        fields = {
	                            operationName: nameOrFields
	                        };
	                    } else {
	                        fields = nameOrFields;
	                    }
	                } else {
	                    fields.operationName = nameOrFields;
	                }
	                spanImp = this._imp.startSpan(fields);
	            }
	            return new _span2.default(spanImp);
	        }
	
	        /**
	         * Injects the information about the given span into the carrier
	         * so that the span can propogate across inter-process barriers.
	         *
	         * See FORMAT_TEXT_MAP and FORMAT_BINARY for the two required carriers.
	         *
	         * Consider this pseudocode example:
	         *
	         *     var clientSpan = ...;
	         *     ...
	         *     // Inject clientSpan into a text carrier.
	         *     var textCarrier = {};
	         *     Tracer.inject(clientSpan, Tracer.FORMAT_TEXT_MAP, textCarrier);
	         *     // Incorporate the textCarrier into the outbound HTTP request header
	         *     // map.
	         *     outboundHTTPReq.headers.extend(textCarrier);
	         *     // ... send the httpReq
	         *
	         * For FORMAT_BINARY, inject() will set the buffer field to an Array-like
	         * (Array, ArrayBuffer, or TypedBuffer) object containing the injected
	         * binary data.  Any valid Object can be used as long as the buffer field of
	         * the object can be set.
	         *
	         * @param  {Span} span
	         *         The span whose information should be injected into the carrier.
	         * @param  {string} format
	         *         The format of the carrier.
	         * @param  {any} carrier
	         *         See the method description for details on the carrier object.
	         */
	
	    }, {
	        key: 'inject',
	        value: function inject(span, format, carrier) {
	            if (true) {
	                if (arguments.length !== 3) {
	                    throw new Error('Invalid number of arguments.');
	                }
	                if (!(span instanceof _span2.default)) {
	                    throw new Error('Expected span object as first argument');
	                }
	                if (typeof format !== 'string') {
	                    throw new Error('format expected to be a string. Found: ' + typeof format);
	                }
	                if (format === _constants2.default.FORMAT_TEXT_MAP && typeof carrier !== 'object') {
	                    throw new Error('Unexpected carrier object for TEXT_MAP format');
	                }
	                if (format === _constants2.default.FORMAT_BINARY && typeof carrier !== 'object') {
	                    throw new Error('Unexpected carrier object for BINARY format');
	                }
	            }
	
	            if (this._imp) {
	                this._imp.inject(span._imp, format, carrier);
	            }
	        }
	
	        /**
	         * Returns a new Span object with the given operation name using the trace
	         * information from the carrier.
	         *
	         * See FORMAT_TEXT_MAP and FORMAT_BINARY for the two required carriers.
	         *
	         * Consider this pseudocode example:
	         *
	         *     // Use the inbound HTTP request's headers as a text map carrier.
	         *     var textCarrier = inboundHTTPReq.headers;
	         *     var serverSpan = Tracer.join(
	         *         "operation name", Tracer.FORMAT_TEXT_MAP, textCarrier);
	         *
	         * For FORMAT_BINARY, `carrier` is expected to have a field named `buffer`
	         * that contains an Array-like object (Array, ArrayBuffer, or TypedBuffer).
	         *
	         * @param  {string} operationName
	         *         Operation name to use on the newly created span.
	         * @param  {string} format
	         *         The format of the carrier.
	         * @param  {any} carrier
	         *         The type of the carrier object is determined by the format.
	         * @return {Span}
	         */
	
	    }, {
	        key: 'join',
	        value: function join(operationName, format, carrier) {
	            if (true) {
	                if (arguments.length !== 3) {
	                    throw new Error('Invalid number of arguments.');
	                }
	                if (typeof operationName !== 'string' || !operationName.length) {
	                    throw new Error('operationName is expected to be a string of non-zero length');
	                }
	                if (typeof format !== 'string' || !format.length) {
	                    throw new Error('format is expected to be a string of non-zero length');
	                }
	                if (format === _constants2.default.FORMAT_TEXT_MAP && !(typeof carrier === 'object')) {
	                    throw new Error('Unexpected carrier object for FORMAT_TEXT_MAP');
	                }
	                if (format === _constants2.default.FORMAT_BINARY) {
	                    if (carrier.buffer !== undefined && typeof carrier.buffer !== 'object') {
	                        throw new Error('Unexpected carrier object for FORMAT_BINARY');
	                    }
	                }
	            }
	            var spanImp = null;
	            if (this._imp) {
	                spanImp = this._imp.join(operationName, format, carrier);
	            }
	            return new _span2.default(spanImp);
	        }
	
	        /**
	         * Request that any buffered or in-memory data is flushed out of the process.
	         *
	         * @param {function} done
	         *        Optional callback function with the signature `function(err)` that
	         *        will be called as soon as the flush completes. `err` should be
	         *        null or undefined if the flush was successful.
	         */
	
	    }, {
	        key: 'flush',
	        value: function flush(done) {
	            if (true) {
	                if (arguments.length > 1) {
	                    throw new Error('Invalid number of arguments');
	                }
	                if (done !== undefined && typeof done !== 'function') {
	                    throw new Error('callback expected to be a function');
	                }
	            }
	            if (!this._imp) {
	                done(null);
	                return;
	            }
	            this._imp.flush(done);
	        }
	
	        // ---------------------------------------------------------------------- //
	        // Private and non-standard methods
	        // ---------------------------------------------------------------------- //
	
	        /**
	         * Note: this constructor should not be called directly by consumers of this
	         * code. The singleton's initNewTracer() method should be invoked instead.
	         */
	
	    }]);
	
	    function Tracer(imp) {
	        _classCallCheck(this, Tracer);
	
	        this._imp = imp || null;
	    }
	
	    /**
	     * Handle to implementation object.
	     *
	     * Use of this method is discouraged as it greatly reduces the portability of
	     * the calling code. Use only when implementation-specific functionality must
	     * be used and cannot accessed otherwise.
	     *
	     * @return {object}
	     *         An implementation-dependent object.
	     */
	
	
	    _createClass(Tracer, [{
	        key: 'imp',
	        value: function imp() {
	            return this._imp;
	        }
	    }]);
	
	    return Tracer;
	}();

	exports.default = Tracer;
	module.exports = exports['default'];

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _tracer = __webpack_require__(3);
	
	var _tracer2 = _interopRequireDefault(_tracer);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var defaultTracer = __webpack_require__(1);
	
	var kKeyRegExp = new RegExp(/^[a-z0-9][-a-z0-9]*/);
	
	/**
	 * Span represents a logical unit of work as part of a broader Trace. Examples
	 * of span might include remote procedure calls or a in-process function calls
	 * to sub-components. A Trace has a single, top-level "root" Span that in turn
	 * may have zero or more child Spans, which in turn may have children.
	 */
	
	var Span = function () {
	    _createClass(Span, [{
	        key: 'tracer',
	
	
	        // ---------------------------------------------------------------------- //
	        // OpenTracing API methods
	        // ---------------------------------------------------------------------- //
	
	        /**
	         * Returns the Tracer object used to create this Span.
	         *
	         * @return {Tracer}
	         */
	        value: function tracer() {
	            if (true) {
	                if (arguments.length !== 0) {
	                    throw new Error('Invalid number of arguments');
	                }
	            }
	            if (this._imp) {
	                return new _tracer2.default(this._imp.tracer());
	            }
	            return defaultTracer;
	        }
	
	        /**
	         * Sets the string name for the logical operation this span represents.
	         *
	         * @param {string} name
	         */
	
	    }, {
	        key: 'setOperationName',
	        value: function setOperationName(name) {
	            if (true) {
	                if (arguments.length !== 1) {
	                    throw new Error('Invalid number of arguments');
	                }
	                if (typeof name !== 'string' || name.length > 0) {
	                    throw new Error('Name must be a string of length > 0');
	                }
	            }
	            if (this._imp) {
	                this._imp.setOperationName(name);
	            }
	            return this;
	        }
	
	        /**
	         * Adds a single tag to the span.  See `AddTags()` for details.
	         *
	         * @param {string} key
	         * @param {any} value
	         */
	
	    }, {
	        key: 'setTag',
	        value: function setTag(key, value) {
	            if (true) {
	                if (arguments.length !== 2) {
	                    throw new Error('Invalid number of arguments');
	                }
	                if (typeof key !== 'string') {
	                    throw new Error('Tag key must be a string');
	                }
	            }
	            this.addTags(_defineProperty({}, key, value));
	            return this;
	        }
	
	        /**
	         * Adds the given key value pairs to the set of span tags.
	         *
	         * Multiple calls to addTags() results in the tags being the superset of
	         * all calls.
	         *
	         * The behavior of setting the same key multiple times on the same span
	         * is undefined.
	         *
	         * The supported type of the values is implementation-dependent.
	         * Implementations are expected to safely handle all types of values but
	         * may choose to ignore unrecognized / unhandle-able values (e.g. objects
	         * with cyclic references, function objects).
	         *
	         * @return {[type]} [description]
	         */
	
	    }, {
	        key: 'addTags',
	        value: function addTags(keyValuePairs) {
	            if (true) {
	                if (arguments.length !== 1) {
	                    throw new Error('Invalid number of arguments');
	                }
	                if (typeof keyValuePairs !== 'object') {
	                    throw new Error('Invalid argument type');
	                }
	            }
	
	            if (!this._imp) {
	                return;
	            }
	            this._imp.addTags(keyValuePairs);
	            return this;
	        }
	
	        /**
	         * Set an arbitrary key-value string pair that will be carried along the
	         * full path of a trace.
	         *
	         * All spans created as children of this span will inherit the baggage items
	         * of this span.
	         *
	         * Baggage items are copied between all spans, both in-process and across
	         * distributed requests, therefore this feature should be used with care to
	         * ensure undue overhead is not incurred.
	         *
	         * Keys are case insensitive and must match the regular expresssion
	         * `[a-z0-9][-a-z0-9]*`.
	         *
	         * @param {string} key
	         * @param {string} value
	         */
	
	    }, {
	        key: 'setBaggageItem',
	        value: function setBaggageItem(key, value) {
	            if (true) {
	                if (arguments.length !== 2) {
	                    throw new Error('Expected 2 arguments');
	                }
	                if (typeof key !== 'string' || key.length === 0) {
	                    throw new Error('Key must be a string');
	                }
	                if (!kKeyRegExp.test(key)) {
	                    throw new Error('Invalid trace key');
	                }
	
	                var valueType = typeof value;
	                if (value !== null && valueType !== 'boolean' && valueType !== 'number' && valueType !== 'string') {
	                    throw new Error('Trace attribute values can only be basic types');
	                }
	            }
	
	            if (this._imp) {
	                this._imp.setBaggageItem(key, value);
	            }
	            return this;
	        }
	
	        /**
	         * Returns the value for the given baggage item key.
	         *
	         * @param  {string} key
	         *         The key for the given trace attribute.
	         * @return {string}
	         *         String value for the given key, or undefined if the key does not
	         *         correspond to a set trace attribute.
	         */
	
	    }, {
	        key: 'getBaggageItem',
	        value: function getBaggageItem(key) {
	            if (true) {
	                if (arguments.length !== 1) {
	                    throw new Error('Expected 1 arguments');
	                }
	                if (typeof key !== 'string' || key.length === 0) {
	                    throw new Error('Key must be a string');
	                }
	                if (!kKeyRegExp.test(key)) {
	                    throw new Error('Invalid trace key');
	                }
	            }
	
	            if (!this._imp) {
	                return undefined;
	            }
	            return this._imp.getBaggageItem(key);
	        }
	
	        /**
	         * Explicitly create a log record associated with the span.
	         *
	         * @param  {[type]} fields [description]
	         * @param  {object} fields
	         *         Optional associative array of fields.
	         *         - `timestamp` {Number} Optional field specifying the timestamp
	         *              in milliseconds as a Unix timestamp. Fractional values are
	         *              allowed so that timestamps with sub-millisecond accuracy
	         *              can be represented. If not specified, the implementation
	         *              is expected to use it's notion of the current time of the
	         *              call.
	         *         - `event` {string}
	         *              The event name.
	         *         - `payload` {object}
	         *              An arbitrary structured payload. It is implementation-dependent
	         *              how this will be processed.
	         */
	
	    }, {
	        key: 'log',
	        value: function log(fields) {
	            if (true) {
	                if (arguments.length !== 1) {
	                    throw new Error('Invalid number of arguments');
	                }
	                if (typeof fields !== 'object') {
	                    throw new Error('Expected fields to be an object');
	                }
	            }
	            if (!this._imp) {
	                return;
	            }
	            this._imp.log(fields);
	            return this;
	        }
	
	        /**
	         * Logs a event with an optional payload.
	         *
	         * @param  {string} eventName [description]
	         * @param  {} payload   [description]
	         * @return {[type]}           [description]
	         */
	
	    }, {
	        key: 'logEvent',
	        value: function logEvent(eventName, payload) {
	            return this.log({
	                'event': eventName,
	                'payload': payload
	            });
	        }
	
	        /**
	         * Indicates that the unit of work represented by the span is complete or
	         * has otherwise been terminated.
	         *
	         * All Span objects must have finish() called on them before they are
	         * reported to the backend implementation.
	         *
	         * Once `finish()` is called on a Span object, the behavior of all methods
	         * on the object is considered undefined.
	         *
	         * @param  {Number} finishTime
	         *         Optional finish time in milliseconds as a Unix timestamp. Decimal
	         *         values are supported for timestamps with sub-millisecond accuracy.
	         *         If not specified, the current time (as defined by the
	         *         implementation) will be used.
	         */
	
	    }, {
	        key: 'finish',
	        value: function finish(finishTime) {
	            if (true) {
	                if (arguments.length > 1) {
	                    throw new Error('Invalid arguments');
	                }
	                if (arguments.length === 1 && typeof finishTime !== 'number') {
	                    throw new Error('Unexpected argument type');
	                }
	            }
	
	            if (!this._imp) {
	                return;
	            }
	            this._imp.finish(finishTime);
	        }
	
	        // ---------------------------------------------------------------------- //
	        // Private and non-standard methods
	        // ---------------------------------------------------------------------- //
	
	        /**
	         * Constructs a new Span object. This method should not be called directly.
	         */
	
	    }]);
	
	    function Span(imp) {
	        _classCallCheck(this, Span);
	
	        this._imp = imp;
	    }
	
	    /**
	     * Returns the Span implementation object. The returned object is by its
	     * nature entirely implementation-dependent.
	     */
	
	
	    _createClass(Span, [{
	        key: 'imp',
	        value: function imp() {
	            return this._imp;
	        }
	    }]);
	
	    return Span;
	}();

	exports.default = Span;
	module.exports = exports['default'];

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = {
	  /**
	   * Used to inject/join a span using a binary format.
	   *
	   * A valid binary carrier is any Object with a field named 'buffer' that
	   * contains or will contain the binary data.
	   */
	  FORMAT_BINARY: 'binary',
	
	  /**
	   * Used to inject/join a span using a string->string map as a carrier.
	   *
	   * NOTE: Since HTTP headers are a particularly important use case for the
	   * TEXT_MAP carrier, map keys identify their respective values in a
	   * case-insensitive manner.
	   *
	   * NOTE: The TEXT_MAP carrier map may contain unrelated data (e.g.,
	   * arbitrary HTTP headers). As such, the Tracer implementation should use a
	   * prefix or other convention to distinguish Tracer-specific key:value
	   * pairs.
	   */
	  FORMAT_TEXT_MAP: 'text_map'
	};

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';
	
	/**
	 * Convenience class to use as a binary carrier.
	 *
	 * Any valid Object with a field named `buffer` may be used as a binary carrier;
	 * this class is only one such type of object that can be used.
	 */
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var BinaryCarrier = function BinaryCarrier(binaryData) {
	    _classCallCheck(this, BinaryCarrier);
	
	    this.buffer = binaryData;
	};
	
	exports.default = BinaryCarrier;
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;
//# sourceMappingURL=opentracing-browser.js.map
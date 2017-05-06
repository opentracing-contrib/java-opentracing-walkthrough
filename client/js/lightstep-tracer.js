(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["LightStep"] = factory();
	else
		root["LightStep"] = factory();
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
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _globals = __webpack_require__(1);
	
	var _globals2 = _interopRequireDefault(_globals);
	
	var _constants = __webpack_require__(2);
	
	var Constants = _interopRequireWildcard(_constants);
	
	var _tracer_imp = __webpack_require__(3);
	
	var _tracer_imp2 = _interopRequireDefault(_tracer_imp);
	
	var _platform_abstraction_layer = __webpack_require__(5);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Library = function () {
	    function Library() {
	        _classCallCheck(this, Library);
	
	        this._singleton = null;
	
	        // Make the constants accessible off the LightStep object
	        for (var key in Constants) {
	            this[key] = this[key] || Constants[key];
	        }
	    }
	
	    /**
	     * Creates a new OpenTracing-compatible tracer implementation object.
	     */
	
	
	    _createClass(Library, [{
	        key: 'tracer',
	        value: function tracer(opts) {
	            var tracerImp = new _tracer_imp2.default(opts);
	            if (!this._singleton) {
	                _globals2.default.setOptions(opts);
	                this._singleton = tracerImp;
	            }
	            return tracerImp;
	        }
	    }]);
	
	    return Library;
	}();
	
	var library = new Library();
	_platform_abstraction_layer.Platform.initLibrary(library);
	module.exports = library;

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var PackageGlobals = function () {
	    function PackageGlobals() {
	        _classCallCheck(this, PackageGlobals);
	
	        this.options = {};
	    }
	
	    _createClass(PackageGlobals, [{
	        key: "setOptions",
	        value: function setOptions(opts) {
	            for (var key in opts) {
	                this.options[key] = opts[key];
	            }
	        }
	    }]);
	
	    return PackageGlobals;
	}();
	
	module.exports = new PackageGlobals();

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var LOG_INFO = exports.LOG_INFO = 0;
	var LOG_WARN = exports.LOG_WARN = 1;
	var LOG_ERROR = exports.LOG_ERROR = 2;
	var LOG_FATAL = exports.LOG_FATAL = 3;
	
	var LOG_LEVEL_TO_STRING = exports.LOG_LEVEL_TO_STRING = {
	    LOG_INFO: 'I',
	    LOG_WARN: 'W',
	    LOG_ERROR: 'E',
	    LOG_FATAL: 'F'
	};
	var LOG_STRING_TO_LEVEL = exports.LOG_STRING_TO_LEVEL = {
	    I: LOG_INFO,
	    W: LOG_WARN,
	    E: LOG_ERROR,
	    F: LOG_FATAL
	};
	
	// The report interval for empty reports used to sample the clock skew
	var CLOCK_STATE_REFRESH_INTERVAL_MS = exports.CLOCK_STATE_REFRESH_INTERVAL_MS = 350;
	
	var LIGHTSTEP_APP_URL_PREFIX = exports.LIGHTSTEP_APP_URL_PREFIX = 'https://app.lightstep.com';
	
	var JOIN_ID_PREFIX = exports.JOIN_ID_PREFIX = 'join:';

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _eventemitter = __webpack_require__(4);
	
	var _eventemitter2 = _interopRequireDefault(_eventemitter);
	
	var _platform_abstraction_layer = __webpack_require__(5);
	
	var _span_imp = __webpack_require__(15);
	
	var _span_imp2 = _interopRequireDefault(_span_imp);
	
	var _globals = __webpack_require__(1);
	
	var _globals2 = _interopRequireDefault(_globals);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } //============================================================================//
	// Imports
	//============================================================================//
	
	// eslint-disable-line camelcase
	
	
	var constants = __webpack_require__(2);
	var coerce = __webpack_require__(16);
	var util = __webpack_require__(17);
	var LogBuilder = __webpack_require__(18);
	var ClockState = __webpack_require__(19);
	var packageObject = __webpack_require__(20);
	
	var CARRIER_TRACER_STATE_PREFIX = 'ot-tracer-';
	var CARRIER_BAGGAGE_PREFIX = 'ot-baggage-';
	
	var DEFAULT_COLLECTOR_HOSTNAME = 'collector.lightstep.com';
	var DEFAULT_COLLECTOR_PORT_TLS = 443;
	var DEFAULT_COLLECTOR_PORT_PLAIN = 80;
	
	// Internal errors should be rare. Set a low limit to ensure a cascading failure
	// does not compound an existing problem by trying to send a great deal of
	// internal error data.
	var MAX_INTERNAL_LOGS = 20;
	
	var TracerImp = function (_EventEmitter) {
	    _inherits(TracerImp, _EventEmitter);
	
	    function TracerImp(opts) {
	        _classCallCheck(this, TracerImp);
	
	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(TracerImp).call(this));
	
	        opts = opts || {};
	
	        _this._interface = null;
	
	        // Platform abstraction layer
	        _this._platform = new _platform_abstraction_layer.Platform(_this);
	        _this._runtimeGUID = opts.guid || _this.override_runtime_guid || null; // Set once the group name is set
	        _this._plugins = {};
	        _this._options = {};
	        _this._optionDescs = [];
	        _this._makeOptionsTable();
	
	        var now = _this._platform.nowMicros();
	
	        // The thrift authentication and runtime struct are created as soon as
	        // the necessary initialization options are available.
	        _this._startMicros = now;
	        _this._thriftAuth = null;
	        _this._thriftRuntime = null;
	        _this._transport = (opts ? opts.override_transport : null) || new _platform_abstraction_layer.Transport();
	
	        _this._reportingLoopActive = false;
	        _this._reportYoungestMicros = now;
	        _this._reportTimer = null;
	        _this._reportErrorStreak = 0; // Number of consecutive errors
	        _this._visibleErrorCount = 0;
	
	        // Set addActiveRootSpan() for detail
	        _this._activeRootSpanSet = {};
	        _this._activeRootSpan = null;
	
	        // For clock skew adjustment.
	        _this._useClockState = false;
	        _this._clockState = new ClockState({
	            nowMicros: function () {
	                return _this._platform.nowMicros();
	            },
	            localStoreGet: function () {
	                var key = 'clock_state/' + _this._options.collector_host;
	                return _this._platform.localStoreGet(key);
	            },
	            localStoreSet: function (value) {
	                var key = 'clock_state/' + _this._options.collector_host;
	                return _this._platform.localStoreSet(key, value);
	            }
	        });
	
	        // Report buffers and per-report data
	        // These data are reset on every successful report.
	        _this._logRecords = [];
	        _this._spanRecords = [];
	
	        // The counter names need to match those accepted by the collector.
	        // These are internal counters only.
	        _this._counters = {
	            'internal.errors': 0,
	            'internal.warnings': 0,
	            'spans.dropped': 0,
	            'logs.dropped': 0,
	            'logs.payloads.over_limit': 0,
	            'reports.errors.send': 0
	        };
	
	        // For internal (not client) logs reported to the collector
	        _this._internalLogs = [];
	
	        // Current runtime state / status
	        _this._flushIsActive = false;
	
	        // Built-in plugins
	        _this.addPlugin(__webpack_require__(21));
	
	        // Initialize the platform options after the built-in plugins in
	        // case any of those options affect the built-ins.
	        _this.addPlatformPlugins(opts);
	        _this.setPlatformOptions(opts);
	
	        // Set constructor arguments
	        if (opts) {
	            _this.options(opts);
	        }
	
	        _this._info('TracerImp created with guid ' + _this._runtimeGUID);
	        return _this;
	    }
	
	    _createClass(TracerImp, [{
	        key: '_makeOptionsTable',
	        value: function _makeOptionsTable() {
	            /* eslint-disable key-spacing, no-multi-spaces */
	
	            // NOTE: make 'verbosity' the first option so it is processed first on
	            // options changes and takes effect as soon as possible.
	            this.addOption('verbosity', { type: 'int', min: 0, max: 9, defaultValue: 1 });
	
	            // Core options
	            this.addOption('access_token', { type: 'string', defaultValue: '' });
	            this.addOption('component_name', { type: 'string', defaultValue: '' });
	            this.addOption('collector_host', { type: 'string', defaultValue: DEFAULT_COLLECTOR_HOSTNAME });
	            this.addOption('collector_port', { type: 'int', defaultValue: DEFAULT_COLLECTOR_PORT_TLS });
	            this.addOption('collector_encryption', { type: 'string', defaultValue: 'tls' });
	            this.addOption('tags', { type: 'any', defaultValue: {} });
	            this.addOption('max_reporting_interval_millis', { type: 'int', defaultValue: 2500 });
	
	            // Non-standard, may be deprecated
	            this.addOption('disabled', { type: 'bool', defaultValue: false });
	            this.addOption('max_log_records', { type: 'int', defaultValue: 4096 });
	            this.addOption('max_span_records', { type: 'int', defaultValue: 4096 });
	            this.addOption('default_span_tags', { type: 'any', defaultValue: {} });
	
	            // Debugging options
	            //
	            // These are not part of the supported public API.
	            //
	            // If false, SSL certificate verification is skipped. Useful for testing.
	            this.addOption('certificate_verification', { type: 'bool', defaultValue: true });
	            // I.e. report only on explicit calls to flush()
	            this.addOption('disable_reporting_loop', { type: 'bool', defaultValue: false });
	
	            // Unit testing options
	            this.addOption('override_transport', { type: 'any', defaultValue: null });
	            this.addOption('silent', { type: 'bool', defaultValue: false });
	
	            // Hard upper limits to protect against worst-case scenarios
	            this.addOption('log_message_length_hard_limit', { type: 'int', defaultValue: 512 * 1024 });
	            this.addOption('log_payload_length_hard_limit', { type: 'int', defaultValue: 512 * 1024 });
	
	            /* eslint-disable key-spacing, no-multi-spaces */
	        }
	
	        // ---------------------------------------------------------------------- //
	        // OpenTracing API
	        // ---------------------------------------------------------------------- //
	
	    }, {
	        key: 'setInterface',
	        value: function setInterface(tracerInterface) {
	            this._interface = tracerInterface;
	            this.startPlugins();
	            this._infoV(3, 'Initialization complete', this._options);
	        }
	    }, {
	        key: 'newTracer',
	        value: function newTracer(opts) {
	            // Inherit all options of the global tracer unless explicitly specified
	            // otherwise
	            opts = opts || {};
	            for (var key in _globals2.default.options) {
	                if (opts[key] === undefined) {
	                    opts[key] = _globals2.default.options[key];
	                }
	            }
	            return new TracerImp(opts);
	        }
	    }, {
	        key: 'startSpan',
	        value: function startSpan(fields) {
	            var spanImp = new _span_imp2.default(this);
	            spanImp.addTags(this._options.default_span_tags);
	            spanImp.setFields(fields);
	
	            this.emit('start_trace', spanImp);
	            return spanImp;
	        }
	    }, {
	        key: 'inject',
	        value: function inject(span, format, carrier) {
	            switch (format) {
	                case this._interface.FORMAT_TEXT_MAP:
	                    this._injectToTextMap(span, carrier);
	                    break;
	
	                // The binary encoding here is optimized for correctness and uniformity
	                // across platforms: it is currently not efficient.
	                case this._interface.FORMAT_BINARY:
	                    carrier.buffer = this._objectToUint8Array(this._injectToTextMap(span, {}));
	                    break;
	
	                default:
	                    this._error('Unknown format: ' + format);
	                    break;
	            }
	        }
	    }, {
	        key: '_injectToTextMap',
	        value: function _injectToTextMap(span, carrier) {
	            if (!carrier) {
	                this._error('Unexpected null FORMAT_TEXT_MAP carrier in call to inject');
	                return;
	            }
	            if (typeof carrier !== 'object') {
	                this._error('Unexpected \'' + typeof carrier + '\' FORMAT_TEXT_MAP carrier in call to inject');
	                return;
	            }
	
	            var baggage = span.getBaggage();
	            var traceGUID = span.traceGUID();
	
	            carrier[CARRIER_TRACER_STATE_PREFIX + 'spanid'] = span.guid();
	            if (traceGUID) {
	                carrier[CARRIER_TRACER_STATE_PREFIX + 'traceid'] = traceGUID;
	            }
	            carrier[CARRIER_TRACER_STATE_PREFIX + 'sampled'] = 'true';
	            for (var key in baggage) {
	                carrier['' + CARRIER_BAGGAGE_PREFIX + key] = baggage[key];
	            }
	            return carrier;
	        }
	    }, {
	        key: 'join',
	        value: function join(operationName, format, carrier) {
	            // Simplify the logic by converting the binary carrier to a split text
	            // carrier.
	            if (format === this._interface.FORMAT_BINARY) {
	                format = this._interface.FORMAT_TEXT_MAP;
	                carrier = this._uint8ArrayToObject(carrier.buffer);
	            }
	
	            // Create the empty, raw span
	            var span = new _span_imp2.default(this);
	            span.setOperationName(operationName);
	
	            switch (format) {
	
	                // Iterate over the contents of the carrier and set the properties
	                // accordingly.
	                case this._interface.FORMAT_TEXT_MAP:
	                    for (var key in carrier) {
	                        var value = carrier[key];
	                        key = key.toLowerCase();
	                        if (key.substr(0, CARRIER_TRACER_STATE_PREFIX.length) !== CARRIER_TRACER_STATE_PREFIX) {
	                            continue;
	                        }
	                        var suffix = key.substr(CARRIER_TRACER_STATE_PREFIX.length);
	
	                        switch (suffix) {
	                            case 'traceid':
	                                span.setFields({ trace_guid: value });
	                                break;
	                            case 'spanid':
	                                // Transfer the carrier's "span_guid" to be the parent of this
	                                // new span
	                                span.setFields({ parent_guid: value });
	                                break;
	                            default:
	                                this._error('Unrecognized carrier key with recognized prefix. Ignoring.');
	                                break;
	                        }
	                    }
	                    for (var _key in carrier) {
	                        var _value = carrier[_key];
	                        _key = _key.toLowerCase();
	                        if (_key.substr(0, CARRIER_BAGGAGE_PREFIX.length) !== CARRIER_BAGGAGE_PREFIX) {
	                            continue;
	                        }
	                        var _suffix = _key.substr(CARRIER_BAGGAGE_PREFIX.length);
	                        span.setBaggageItem(_suffix, _value);
	                    }
	                    break;
	
	                default:
	                    this._error('Unknown format: ' + format);
	                    break;
	            }
	
	            return span;
	        }
	    }, {
	        key: 'flush',
	        value: function flush(done) {
	            if (arguments.length === 0) {
	                done = function () {};
	            }
	            this._flushReport(false, done);
	        }
	
	        //-----------------------------------------------------------------------//
	        // Options
	        //-----------------------------------------------------------------------//
	
	    }, {
	        key: 'guid',
	        value: function guid() {
	            return this._runtimeGUID;
	        }
	    }, {
	        key: 'verbosity',
	        value: function verbosity() {
	            // The 'undefined' handling below is for logs that may occur before the
	            // options are initialized.
	            var v = this._options.verbosity;
	            return v === undefined ? 1 : v;
	        }
	
	        // Call to generate a new Trace GUID
	
	    }, {
	        key: 'generateTraceGUIDForRootSpan',
	        value: function generateTraceGUIDForRootSpan() {
	            var guid = this._platform.generateUUID();
	            if (this._activeRootSpan) {
	                guid = this._activeRootSpan.traceGUID();
	            }
	            return guid;
	        }
	    }, {
	        key: 'setPlatformOptions',
	        value: function setPlatformOptions(userOptions) {
	            var opts = this._platform.options(this) || {};
	            if (userOptions) {
	                for (var key in userOptions) {
	                    opts[key] = userOptions[key];
	                }
	            }
	            this.options(opts);
	        }
	
	        // Register a new option.  Used by plug-ins.
	
	    }, {
	        key: 'addOption',
	        value: function addOption(name, desc) {
	            desc.name = name;
	            this._optionDescs.push(desc);
	            this._options[desc.name] = desc.defaultValue;
	        }
	    }, {
	        key: 'options',
	        value: function options(opts) {
	            if (arguments.length === 0) {
	                console.assert(typeof this._options === 'object', // eslint-disable-line
	                'Internal error: _options field incorrect');
	                return this._options;
	            }
	            if (typeof opts !== 'object') {
	                throw new Error('options() must be called with an object: type was ' + typeof opts);
	            }
	
	            // "collector_port" 0 acts as an alias for "use the default".
	            if (opts.collector_port === 0) {
	                delete opts.collector_port;
	            }
	
	            // "collector_encryption" acts an alias for the common cases of 'collector_port'
	            if (opts.collector_encryption !== undefined && opts.collector_port === undefined) {
	                opts.collector_port = opts.collector_encryption !== 'none' ? DEFAULT_COLLECTOR_PORT_TLS : DEFAULT_COLLECTOR_PORT_PLAIN;
	            }
	
	            // Track what options have been modified
	            var modified = {};
	            var unchanged = {};
	            for (var i in this._optionDescs) {
	                var desc = this._optionDescs[i];
	                this._setOptionInternal(modified, unchanged, opts, desc);
	            }
	
	            // Check for any invalid options: is there a key in the specified operation
	            // that didn't result either in a change or a reset to the existing value?
	            for (var key in opts) {
	                if (modified[key] === undefined && unchanged[key] === undefined) {
	                    throw new Error('Invalid option ' + key);
	                }
	            }
	
	            //
	            // Update the state information based on the changes
	            //
	            this._initReportingDataIfNeeded(modified);
	
	            if (!this._reportingLoopActive) {
	                this._startReportingLoop();
	            }
	
	            if (this.verbosity() >= 3) {
	                var optionsString = '';
	                var count = 0;
	                for (var _key2 in modified) {
	                    var val = modified[_key2];
	                    optionsString += '\t' + JSON.stringify(_key2) + ': ' + JSON.stringify(val.newValue) + '\n';
	                    count++;
	                }
	                if (count > 0) {
	                    this._infoV(3, 'Options modified:\n' + optionsString);
	                }
	            }
	            this.emit('options', modified, this._options, this);
	        }
	    }, {
	        key: '_setOptionInternal',
	        value: function _setOptionInternal(modified, unchanged, opts, desc) {
	            var name = desc.name;
	            var value = opts[name];
	            var valueType = typeof value;
	            if (value === undefined) {
	                return;
	            }
	
	            // Parse the option (and check constraints)
	            switch (desc.type) {
	
	                case 'any':
	                    break;
	
	                case 'bool':
	                    if (value !== true && value !== false) {
	                        this._error('Invalid boolean option \'' + name + '\' \'' + value + '\'');
	                        return;
	                    }
	                    break;
	
	                case 'int':
	                    if (valueType !== 'number' || Math.floor(value) !== value) {
	                        this._error('Invalid int option \'' + name + '\' \'' + value + '\'');
	                        return;
	                    }
	                    if (desc.min !== undefined && desc.max !== undefined) {
	                        if (!(value >= desc.min && value <= desc.max)) {
	                            this._error('Option \'' + name + '\' out of range \'' + value + '\' is not between ' + desc.min + ' and ' + desc.max); // eslint-disable-line max-len
	                            return;
	                        }
	                    }
	                    break;
	
	                case 'string':
	                    switch (valueType) {
	                        case 'string':
	                            break;
	                        case 'number':
	                            value = coerce.toString(value);
	                            break;
	                        default:
	                            this._error('Invalid string option ' + name + ' ' + value);
	                            return;
	                    }
	                    break;
	
	                case 'array':
	                    // Per http://stackoverflow.com/questions/4775722/check-if-object-is-array
	                    if (Object.prototype.toString.call(value) !== '[object Array]') {
	                        this._error('Invalid type for array option ' + name + ': found \'' + valueType + '\'');
	                        return;
	                    }
	                    break;
	
	                default:
	                    this._error('Unknown option type \'' + desc.type + '\'');
	                    return;
	            }
	
	            // Set the new value, recording any modifications
	            var oldValue = this._options[name];
	            if (oldValue === undefined) {
	                throw new Error('Attempt to set unknown option ' + name);
	            }
	
	            // Ignore no-op changes for types that can be checked quickly
	            if (valueType !== 'object' && oldValue === value) {
	                unchanged[name] = true;
	                return;
	            }
	
	            modified[name] = {
	                oldValue: oldValue,
	                newValue: value
	            };
	            this._options[name] = value;
	        }
	
	        // The Thrift authorization and runtime information is initializaed as soon
	        // as it is available.  This allows logs and spans to be buffered before
	        // the library is initialized, which can be helpul in a complex setup with
	        // many subsystems.
	        //
	
	    }, {
	        key: '_initReportingDataIfNeeded',
	        value: function _initReportingDataIfNeeded(modified) {
	            // Ignore redundant initialization; complaint on inconsistencies
	            if (this._thriftAuth !== null) {
	                if (!this._thriftRuntime) {
	                    return this._error('Inconsistent state: thrift auth initialized without runtime.');
	                }
	                if (modified.access_token) {
	                    throw new Error('Cannot change access_token after it has been set.');
	                }
	                if (modified.component_name) {
	                    throw new Error('Cannot change component_name after it has been set.');
	                }
	                if (modified.collector_host) {
	                    throw new Error('Cannot change collector_host after the connection is established');
	                }
	                if (modified.collector_port) {
	                    throw new Error('Cannot change collector_port after the connection is established');
	                }
	                if (modified.collector_encryption) {
	                    throw new Error('Cannot change collector_encryption after the connection is established');
	                }
	                return;
	            }
	
	            // See if the Thrift data can be initialized
	            if (this._options.access_token.length > 0 && this._options.component_name.length > 0) {
	                this._runtimeGUID = this._platform.runtimeGUID(this._options.component_name);
	
	                this._thriftAuth = new _platform_abstraction_layer.crouton_thrift.Auth({
	                    access_token: this._options.access_token
	                });
	
	                //
	                // Assemble the tracer tags from the user-specified and automatic,
	                // internal tags.
	                //
	                var tags = {};
	                for (var key in this._options.tags) {
	                    var value = this._options.tags[key];
	                    if (typeof value !== 'string') {
	                        this._error('Tracer tag value is not a string: key=' + key);
	                        continue;
	                    }
	                    tags[key] = value;
	                }
	                tags.lightstep_tracer_version = packageObject.version;
	                var platformTags = this._platform.tracerTags();
	                for (var _key3 in platformTags) {
	                    tags[_key3] = platformTags[_key3];
	                }
	
	                var thriftAttrs = [];
	                for (var _key4 in tags) {
	                    thriftAttrs.push(new _platform_abstraction_layer.crouton_thrift.KeyValue({
	                        Key: coerce.toString(_key4),
	                        Value: coerce.toString(tags[_key4])
	                    }));
	                }
	
	                // NOTE: for legacy reasons, the Thrift field is called "group_name"
	                // but is semantically equivalen to the "component_name"
	                this._thriftRuntime = new _platform_abstraction_layer.crouton_thrift.Runtime({
	                    guid: this._runtimeGUID,
	                    start_micros: this._startMicros,
	                    group_name: this._options.component_name,
	                    attrs: thriftAttrs
	                });
	
	                this._info('Initializing thrift reporting data', {
	                    component_name: this._options.component_name,
	                    access_token: this._thriftAuth.access_token
	                });
	                this.emit('reporting_initialized');
	            }
	        }
	
	        //-----------------------------------------------------------------------//
	        // Plugins
	        //-----------------------------------------------------------------------//
	
	    }, {
	        key: 'addPlatformPlugins',
	        value: function addPlatformPlugins(opts) {
	            var pluginSet = this._platform.plugins(opts);
	            for (var key in pluginSet) {
	                this.addPlugin(pluginSet[key]);
	            }
	        }
	    }, {
	        key: 'addPlugin',
	        value: function addPlugin(plugin) {
	            // Don't add plug-ins twice
	            var name = plugin.name();
	            if (this._plugins[name]) {
	                return;
	            }
	
	            this._plugins[name] = plugin;
	            plugin.addOptions(this);
	        }
	    }, {
	        key: 'startPlugins',
	        value: function startPlugins() {
	            for (var key in this._plugins) {
	                this._plugins[key].start(this._interface, this);
	            }
	        }
	
	        //-----------------------------------------------------------------------//
	        // Spans
	        //-----------------------------------------------------------------------//
	
	        // This is a LightStep-specific feature that should be sparingly. It sets
	        // a "global" root span such that spans that would *otherwise* be root span
	        // instead inherit the trace GUID of the active root span. This is best
	        // clarified by example:
	        //
	        // On document load in the browser, an "active root span" is created for
	        // the page load process. Any spans started without an explicit parent
	        // will the document load trace GUID instead of starting a trace GUID.
	        // This implicit root remains active only until the page is done loading.
	        //
	        // Any span adding itself as a root span *must* remove itself along with
	        // calling finish(). This will *not* be done automatically.
	        //
	        // NOTE: currently, only the trace GUID is transferred; it may or may not
	        // make sure to make this a proper parent.
	        //
	        // NOTE: the root span tracking is handled as a set rather than a single
	        // global to avoid conflicts between libraries.
	
	    }, {
	        key: 'addActiveRootSpan',
	        value: function addActiveRootSpan(span) {
	            this._activeRootSpanSet[span._guid] = span;
	            this._setActiveRootSpanToYoungest();
	        }
	    }, {
	        key: 'removeActiveRootSpan',
	        value: function removeActiveRootSpan(span) {
	            delete this._activeRootSpanSet[span._guid];
	            this._setActiveRootSpanToYoungest();
	        }
	    }, {
	        key: '_setActiveRootSpanToYoungest',
	        value: function _setActiveRootSpanToYoungest() {
	            // Set the _activeRootSpan to the youngest of the roots in case of
	            // multiple.
	            this._activeRootSpan = null;
	            for (var guid in this._activeRootSpanSet) {
	                var span = this._activeRootSpanSet[guid];
	                if (!this._activeRootSpan || span._beginMicros > this._activeRootSpan._beginMicros) {
	                    this._activeRootSpan = span;
	                }
	            }
	        }
	
	        //-----------------------------------------------------------------------//
	        // Encoding / decoding
	        //-----------------------------------------------------------------------//
	
	    }, {
	        key: '_objectToUint8Array',
	        value: function _objectToUint8Array(obj) {
	            var jsonString = void 0;
	            try {
	                // encodeURIComponent() is a *very* inefficient, but simple and
	                // well-supported way to avoid having to think about Unicode in
	                // in the conversion to a UInt8Array.
	                //
	                // Writing multiple bytes for String.charCodeAt and
	                // String.codePointAt would be an alternate approach; again,
	                // simplicitly is being preferred over efficiency for the moment.
	                jsonString = encodeURIComponent(JSON.stringify(obj));
	            } catch (e) {
	                this._error('Could not binary encode carrier data.');
	                return null;
	            }
	
	            var buffer = new ArrayBuffer(jsonString.length);
	            var view = new Uint8Array(buffer);
	            for (var i = 0; i < jsonString.length; i++) {
	                var code = jsonString.charCodeAt(i);
	                if (!(code >= 0 && code <= 255)) {
	                    this._error('Unexpected character code');
	                    return null;
	                }
	                view[i] = code;
	            }
	            return view;
	        }
	    }, {
	        key: '_uint8ArrayToObject',
	        value: function _uint8ArrayToObject(arr) {
	            if (!arr) {
	                this._error('Array is null');
	                return null;
	            }
	
	            var jsonString = '';
	            for (var i = 0; i < arr.length; i++) {
	                jsonString += String.fromCharCode(arr[i]);
	            }
	            try {
	                return JSON.parse(decodeURIComponent(jsonString));
	            } catch (e) {
	                this._error('Could not decode binary data.');
	                return null;
	            }
	        }
	
	        //-----------------------------------------------------------------------//
	        // Logging
	        //-----------------------------------------------------------------------//
	
	    }, {
	        key: 'log',
	        value: function log() {
	            var b = new LogBuilder(this);
	            return b;
	        }
	
	        //-----------------------------------------------------------------------//
	        // Buffers
	        //-----------------------------------------------------------------------//
	
	    }, {
	        key: '_clearBuffers',
	        value: function _clearBuffers() {
	            this._logRecords = [];
	            this._spanRecords = [];
	            this._internalLogs = [];
	
	            // Create a new object to avoid overwriting the values in any references
	            // to the old object
	            var counters = {};
	            for (var key in this._counters) {
	                counters[key] = 0;
	            }
	            this._counters = counters;
	        }
	    }, {
	        key: '_buffersAreEmpty',
	        value: function _buffersAreEmpty() {
	            if (this._logRecords.length > 0) {
	                return false;
	            }
	            if (this._spanRecords.length > 0) {
	                return false;
	            }
	            if (this._internalLogs.length > 0) {
	                return false;
	            }
	            for (var key in this._counters) {
	                if (this._counters[key] > 0) {
	                    return false;
	                }
	            }
	            return true;
	        }
	
	        // Adds a completed record into the log buffer
	
	    }, {
	        key: '_addLogRecord',
	        value: function _addLogRecord(record) {
	            // Check record content against the hard-limits
	            if (record.message && record.message.length > this._options.log_message_length_hard_limit) {
	                var truncated = record.message.substr(0, this._options.log_message_length_hard_limit - 1);
	                record.message = truncated + '…';
	            }
	
	            if (record.payload_json && record.payload_json.length > this._options.log_payload_length_hard_limit) {
	                this._counters['logs.payloads.over_limit']++;
	                this._warn('Payload too large. Dropped', {
	                    length: record.payload_json.length,
	                    limit: this._options.log_payload_length_hard_limit
	                });
	                record.payload_json = undefined;
	            }
	
	            this._internalAddLogRecord(record);
	            this.emit('log_added', record);
	
	            if (record.level === constants.LOG_FATAL) {
	                this._platform.fatal(record.message);
	            }
	        }
	
	        // Internal worker for adding the log record to the buffer.
	        //
	        // Note: this is also used when a failed report needs to restores records
	        // back to the buffer, therefore it should not do things like echo the
	        // log message to the console with the assumption this is a new record.
	
	    }, {
	        key: '_internalAddLogRecord',
	        value: function _internalAddLogRecord(record) {
	            if (!record) {
	                this._error('Attempt to add null record to buffer');
	                return;
	            }
	            if (this._logRecords.length >= this._options.max_log_records) {
	                var index = Math.floor(this._logRecords.length * Math.random());
	                this._logRecords[index] = record;
	                this._counters['logs.dropped']++;
	            } else {
	                this._logRecords.push(record);
	            }
	        }
	    }, {
	        key: '_addSpanRecord',
	        value: function _addSpanRecord(record) {
	            this._internalAddSpanRecord(record);
	            this.emit('span_added', record);
	        }
	    }, {
	        key: '_internalAddSpanRecord',
	        value: function _internalAddSpanRecord(record) {
	            if (!record) {
	                this._error('Attempt to add null record to buffer');
	                return;
	            }
	
	            if (this._spanRecords.length >= this._options.max_span_records) {
	                var index = Math.floor(this._spanRecords.length * Math.random());
	                this._spanRecords[index] = record;
	                this._counters['spans.dropped']++;
	            } else {
	                this._spanRecords.push(record);
	            }
	        }
	    }, {
	        key: '_restoreRecords',
	        value: function _restoreRecords(logs, spans, internalLogs, counters) {
	            for (var i in logs) {
	                this._internalAddLogRecord(logs[i]);
	            }
	            for (var _i in spans) {
	                this._internalAddSpanRecord(spans[_i]);
	            }
	
	            var currentInternalLogs = this._internalLogs;
	            this._internalLogs = [];
	            var toAdd = internalLogs.concat(currentInternalLogs);
	            for (var _i2 in toAdd) {
	                this._pushInternalLog(toAdd[_i2]);
	            }
	
	            for (var key in counters) {
	                var record = counters[key];
	                if (this._counters[record.Name]) {
	                    this._counters[record.Name] += record.Value;
	                } else {
	                    this._error('Bad counter name: ' + record.Name);
	                }
	            }
	        }
	
	        //-----------------------------------------------------------------------//
	        // Reporting loop
	        //-----------------------------------------------------------------------//
	
	        // flush()
	        //
	        // detached bool - indicates the report should assume the script is about
	        //      to exit or otherwise wants the report to be sent as quickly and
	        //      low-overhead as possible.
	        //
	
	    }, {
	        key: '_flush',
	        value: function _flush(detached) {
	            detached = detached || false;
	
	            if (this._options.disabled) {
	                return;
	            }
	            this._flushReport(detached, function (err) {});
	        }
	    }, {
	        key: '_startReportingLoop',
	        value: function _startReportingLoop() {
	            var _this2 = this;
	
	            if (this._options.disabled) {
	                this._info('Not starting reporting loop: instrumentation is disabled.');
	                return;
	            }
	            if (this._options.disable_reporting_loop) {
	                this._info('Not starting reporting loop: reporting loop is disabled.');
	                return;
	            }
	            if (this._thriftAuth === null) {
	                // Don't start the loop until the thrift data necessary to do the
	                // report is set up.
	                return;
	            }
	            if (this._reportingLoopActive) {
	                this._info('Reporting loop already started!');
	                return;
	            }
	
	            this._info('Starting reporting loop:', this._thriftRuntime);
	            this._reportingLoopActive = true;
	
	            // Set up the script exit clean-up: stop the reporting loop (so it does
	            // not turn a Node process into a zombie) and do a final explicit flush.
	            // Note that the final flush may enqueue asynchronous callbacks that cause
	            // the 'beforeExit' event to be re-emitted when those callbacks finish.
	            var finalFlushOnce = 0;
	            var finalFlush = function () {
	                if (finalFlushOnce++ > 0) {
	                    return;
	                }
	                _this2._info('Final flush before exit.');
	                _this2._flushReport(true);
	            };
	            var stopReportingOnce = 0;
	            var stopReporting = function () {
	                if (stopReportingOnce++ > 0) {
	                    return;
	                }
	                _this2._stopReportingLoop();
	            };
	            this._platform.onBeforeExit(stopReporting);
	            this._platform.onBeforeExit(finalFlush);
	
	            // Begin the asynchronous reporting loop
	            var loop = function () {
	                _this2._enqueueNextReport(function (err) {
	                    if (_this2._reportingLoopActive) {
	                        loop();
	                    }
	                });
	            };
	            loop();
	        }
	    }, {
	        key: '_stopReportingLoop',
	        value: function _stopReportingLoop() {
	            this._infoV(3, 'Stopping reporting loop');
	
	            this._reportingLoopActive = false;
	            clearTimeout(this._reportTimer);
	            this._reportTimer = null;
	        }
	    }, {
	        key: '_enqueueNextReport',
	        value: function _enqueueNextReport(done) {
	            var _this3 = this;
	
	            // If there's already a report request enqueued, ignore this new
	            // request.
	            if (this._reportTimer) {
	                return;
	            }
	
	            // If the clock state is still being primed, potentially use the
	            // shorted report interval
	            var reportInterval = this._options.max_reporting_interval_millis;
	            if (this._useClockState && !this._clockState.isReady()) {
	                reportInterval = Math.min(constants.CLOCK_STATE_REFRESH_INTERVAL_MS, reportInterval);
	            }
	
	            // After 3 consecutive errors, expand the retry delay up to 8x the
	            // normal interval. Also, jitter the delay by +/- 10%
	            var backOff = 1 + Math.min(7, Math.max(0, this._reportErrorStreak - 3));
	            var basis = backOff * reportInterval;
	            var jitter = 1.0 + (Math.random() * 0.2 - 0.1);
	            var delay = Math.floor(Math.max(0, jitter * basis));
	
	            this._infoV(3, 'Delaying next flush for ' + delay + 'ms');
	            this._reportTimer = util.detachedTimeout(function () {
	                _this3._reportTimer = null;
	                _this3._flushReport(false, done);
	            }, delay);
	        }
	    }, {
	        key: '_flushReport',
	        value: function _flushReport(detached, done) {
	            var _this4 = this;
	
	            done = done || function (err) {};
	
	            var clockReady = this._clockState.isReady();
	            var clockOffsetMicros = this._clockState.offsetMicros();
	
	            // Diagnostic information on the clock correction
	            this._infoV(3, 'time correction state', {
	                offset_micros: clockOffsetMicros,
	                active_samples: this._clockState.activeSampleCount(),
	                ready: clockReady
	            });
	
	            var logRecords = this._logRecords;
	            var spanRecords = this._spanRecords;
	            var counters = this._counters;
	            var internalLogs = this._internalLogs;
	
	            // If the clock is not ready, do an "empty" flush to build more clock
	            // samples before the real data is reported.
	            // A detached flush (i.e. one intended to fire at exit or other "last
	            // ditch effort" event) should always use the real data.
	            if (this._useClockState && !clockReady && !detached) {
	                this._infoV(3, 'Flushing empty report to prime clock state');
	                logRecords = [];
	                spanRecords = [];
	                counters = {};
	                internalLogs = [];
	            } else {
	                // Early out if we can.
	                if (this._buffersAreEmpty()) {
	                    this._infoV(3, 'Skipping empty report');
	                    return done(null);
	                }
	
	                // Clear the object buffers as the data is now in the local
	                // variables
	                this._clearBuffers();
	                this._infoV(3, 'Flushing report (' + logRecords.length + ' logs, ' + spanRecords.length + ' spans)');
	            }
	
	            this._transport.ensureConnection(this._options);
	
	            // Ensure the runtime GUID is set as it is possible buffer logs and
	            // spans before the GUID is necessarily set.
	            console.assert(this._runtimeGUID !== null, 'No runtime GUID for Tracer'); // eslint-disable-line no-console
	
	            for (var key in logRecords) {
	                logRecords[key].runtime_guid = this._runtimeGUID;
	            }
	            for (var _key5 in spanRecords) {
	                spanRecords[_key5].runtime_guid = this._runtimeGUID;
	            }
	
	            var thriftCounters = [];
	            for (var _key6 in counters) {
	                var value = counters[_key6];
	                if (value === 0) {
	                    continue;
	                }
	                thriftCounters.push(new _platform_abstraction_layer.crouton_thrift.MetricsSample({
	                    name: coerce.toString(_key6),
	                    double_value: coerce.toNumber(value)
	                }));
	            }
	
	            var timestampOffset = this._useClockState ? clockOffsetMicros : 0;
	            var now = this._platform.nowMicros();
	            var report = new _platform_abstraction_layer.crouton_thrift.ReportRequest({
	                runtime: this._thriftRuntime,
	                oldest_micros: this._reportYoungestMicros,
	                youngest_micros: now,
	                log_records: logRecords,
	                span_records: spanRecords,
	                internal_logs: internalLogs,
	                internal_metrics: new _platform_abstraction_layer.crouton_thrift.Metrics({
	                    counts: thriftCounters
	                }),
	
	                timestamp_offset_micros: timestampOffset
	            });
	            this._infoV(3, 'timestamp_offset_micros = ' + timestampOffset);
	
	            this.emit('prereport', report);
	            var originMicros = this._platform.nowMicros();
	
	            this._transport.report(detached, this._thriftAuth, report, function (err, res) {
	                var destinationMicros = _this4._platform.nowMicros();
	                if (err) {
	                    // How many errors in a row? Influences the report backoff.
	                    _this4._reportErrorStreak++;
	
	                    // On a failed report, re-enqueue the data that was going to be
	                    // sent.
	                    if (err.message) {
	                        _this4._error('Error in report: ' + err.message, err);
	                    } else {
	                        _this4._error('Error in report: ' + err, err);
	                    }
	                    _this4._restoreRecords(report.log_records, report.span_records, report.internal_logs, report.counters);
	
	                    // Increment the counter *after* the counters are restored
	                    _this4._counters['reports.errors.send']++;
	
	                    _this4.emit('report_error', err, {
	                        error: err,
	                        streak: _this4._reportErrorStreak,
	                        detached: detached
	                    });
	                } else {
	                    if (_this4.verbosity() >= 3) {
	                        var reportWindowSeconds = (now - report.oldest_micros) / 1e6;
	                        _this4._infoV(4, 'Report flushed for last ' + reportWindowSeconds + ' seconds', {
	                            spans_reported: report.span_records.length,
	                            logs_reported: report.log_records.length
	                        });
	                    }
	
	                    // Update internal data after the successful report
	                    _this4._reportErrorStreak = 0;
	                    _this4._reportYoungestMicros = now;
	
	                    // Update the clock state if there's info from the report
	                    if (res) {
	                        if (res.timing && res.timing.receive_micros && res.timing.transmit_micros) {
	                            _this4._clockState.addSample(originMicros, res.timing.receive_micros, res.timing.transmit_micros, destinationMicros);
	                        } else {
	                            // The response does not have timing information. Disable
	                            // the clock state assuming there'll never be timing data
	                            // to use.
	                            _this4._useClockState = false;
	                        }
	
	                        if (res.errors && res.errors.length > 0) {
	                            _this4._error('Errors in report', res.errors);
	                        }
	                    } else {
	                        _this4._useClockState = false;
	                    }
	
	                    _this4.emit('report', report, res);
	                }
	                return done(err);
	            });
	        }
	
	        //-----------------------------------------------------------------------//
	        // Stats and metrics
	        //-----------------------------------------------------------------------//
	
	        /**
	         * Internal API that returns some internal metrics.
	         */
	
	    }, {
	        key: 'stats',
	        value: function stats() {
	            return {
	                counters: this._counters
	            };
	        }
	
	        //-----------------------------------------------------------------------//
	        // Internal logging & errors
	        //-----------------------------------------------------------------------//
	        // The rules for how internal logs are processed:
	        //
	        // * Internal logs that are included in the Collector report:
	        //      - Always send errors logs along with the reports
	        //      - Never include any other logs
	        // * Internal logs that are echoed to the host application:
	        //      - If verbosity == 0, echo nothing
	        //      - If verbosity == 1, echo the first error only
	        //      - If verbosity > 1, always echo errors, warnings, info, and any info
	        //        log where v >= the log's verbosity level
	        //
	
	    }, {
	        key: '_infoV',
	        value: function _infoV(v, msg, payload) {
	            if (this.verbosity() < v) {
	                return;
	            }
	            this._printToConsole('log', '[LightStep:INFO' + v + ' ' + new Date() + '] ' + msg, payload);
	        }
	    }, {
	        key: '_info',
	        value: function _info(msg, payload) {
	            this._infoV(2, msg, payload);
	        }
	    }, {
	        key: '_warn',
	        value: function _warn(msg, payload) {
	            this._counters['internal.warnings']++;
	
	            if (this.verbosity() < 2) {
	                return;
	            }
	            this._printToConsole('warn', '[LightStep:WARN ' + new Date() + '] ' + msg, payload);
	        }
	    }, {
	        key: '_error',
	        value: function _error(msg, payload) {
	            this._counters['internal.errors']++;
	
	            // Internal errors are always reported to the collector
	            var record = this.log().level(constants.LOG_ERROR).message(msg).payload(payload).record();
	            this._pushInternalLog(record);
	
	            // Internal errors are reported to the host console conditionally based
	            // on the verbosity level.
	            var verbosity = this.verbosity();
	            if (verbosity === 0) {
	                return;
	            }
	            if (verbosity === 1 && this._visibleErrorCount > 0) {
	                return;
	            }
	            this._visibleErrorCount++;
	            this._printToConsole('error', '[LightStep:ERROR ' + new Date() + '] ' + msg, payload);
	        }
	    }, {
	        key: '_printToConsole',
	        value: function _printToConsole(type, msg, payload) {
	            // Internal option to silence intentional errors generated by the unit
	            // tests.
	            if (this._options.silent) {
	                return;
	            }
	
	            if (payload !== undefined) {
	                console[type](msg, payload); // eslint-disable-line no-console
	            } else {
	                    console[type](msg); // eslint-disable-line no-console
	                }
	        }
	    }, {
	        key: '_pushInternalLog',
	        value: function _pushInternalLog(record) {
	            if (!record) {
	                return;
	            }
	            if (this._internalLogs.length >= MAX_INTERNAL_LOGS) {
	                record.message = 'MAX_INTERNAL_LOGS limit hit. Last error: ' + record.message;
	                this._internalLogs[this._internalLogs.length - 1] = record;
	            } else {
	                this._internalLogs.push(record);
	            }
	        }
	    }]);
	
	    return TracerImp;
	}(_eventemitter2.default);

	exports.default = TracerImp;
	module.exports = exports['default'];

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var has = Object.prototype.hasOwnProperty;
	
	//
	// We store our EE objects in a plain object whose properties are event names.
	// If `Object.create(null)` is not supported we prefix the event names with a
	// `~` to make sure that the built-in object properties are not overridden or
	// used as an attack vector.
	// We also assume that `Object.create(null)` is available when the event name
	// is an ES6 Symbol.
	//
	var prefix = typeof Object.create !== 'function' ? '~' : false;
	
	/**
	 * Representation of a single EventEmitter function.
	 *
	 * @param {Function} fn Event handler to be called.
	 * @param {Mixed} context Context for function execution.
	 * @param {Boolean} [once=false] Only emit once
	 * @api private
	 */
	function EE(fn, context, once) {
	  this.fn = fn;
	  this.context = context;
	  this.once = once || false;
	}
	
	/**
	 * Minimal EventEmitter interface that is molded against the Node.js
	 * EventEmitter interface.
	 *
	 * @constructor
	 * @api public
	 */
	function EventEmitter() { /* Nothing to set */ }
	
	/**
	 * Hold the assigned EventEmitters by name.
	 *
	 * @type {Object}
	 * @private
	 */
	EventEmitter.prototype._events = undefined;
	
	/**
	 * Return an array listing the events for which the emitter has registered
	 * listeners.
	 *
	 * @returns {Array}
	 * @api public
	 */
	EventEmitter.prototype.eventNames = function eventNames() {
	  var events = this._events
	    , names = []
	    , name;
	
	  if (!events) return names;
	
	  for (name in events) {
	    if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
	  }
	
	  if (Object.getOwnPropertySymbols) {
	    return names.concat(Object.getOwnPropertySymbols(events));
	  }
	
	  return names;
	};
	
	/**
	 * Return a list of assigned event listeners.
	 *
	 * @param {String} event The events that should be listed.
	 * @param {Boolean} exists We only need to know if there are listeners.
	 * @returns {Array|Boolean}
	 * @api public
	 */
	EventEmitter.prototype.listeners = function listeners(event, exists) {
	  var evt = prefix ? prefix + event : event
	    , available = this._events && this._events[evt];
	
	  if (exists) return !!available;
	  if (!available) return [];
	  if (available.fn) return [available.fn];
	
	  for (var i = 0, l = available.length, ee = new Array(l); i < l; i++) {
	    ee[i] = available[i].fn;
	  }
	
	  return ee;
	};
	
	/**
	 * Emit an event to all registered event listeners.
	 *
	 * @param {String} event The name of the event.
	 * @returns {Boolean} Indication if we've emitted an event.
	 * @api public
	 */
	EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
	  var evt = prefix ? prefix + event : event;
	
	  if (!this._events || !this._events[evt]) return false;
	
	  var listeners = this._events[evt]
	    , len = arguments.length
	    , args
	    , i;
	
	  if ('function' === typeof listeners.fn) {
	    if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);
	
	    switch (len) {
	      case 1: return listeners.fn.call(listeners.context), true;
	      case 2: return listeners.fn.call(listeners.context, a1), true;
	      case 3: return listeners.fn.call(listeners.context, a1, a2), true;
	      case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
	      case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
	      case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
	    }
	
	    for (i = 1, args = new Array(len -1); i < len; i++) {
	      args[i - 1] = arguments[i];
	    }
	
	    listeners.fn.apply(listeners.context, args);
	  } else {
	    var length = listeners.length
	      , j;
	
	    for (i = 0; i < length; i++) {
	      if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);
	
	      switch (len) {
	        case 1: listeners[i].fn.call(listeners[i].context); break;
	        case 2: listeners[i].fn.call(listeners[i].context, a1); break;
	        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
	        default:
	          if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {
	            args[j - 1] = arguments[j];
	          }
	
	          listeners[i].fn.apply(listeners[i].context, args);
	      }
	    }
	  }
	
	  return true;
	};
	
	/**
	 * Register a new EventListener for the given event.
	 *
	 * @param {String} event Name of the event.
	 * @param {Function} fn Callback function.
	 * @param {Mixed} [context=this] The context of the function.
	 * @api public
	 */
	EventEmitter.prototype.on = function on(event, fn, context) {
	  var listener = new EE(fn, context || this)
	    , evt = prefix ? prefix + event : event;
	
	  if (!this._events) this._events = prefix ? {} : Object.create(null);
	  if (!this._events[evt]) this._events[evt] = listener;
	  else {
	    if (!this._events[evt].fn) this._events[evt].push(listener);
	    else this._events[evt] = [
	      this._events[evt], listener
	    ];
	  }
	
	  return this;
	};
	
	/**
	 * Add an EventListener that's only called once.
	 *
	 * @param {String} event Name of the event.
	 * @param {Function} fn Callback function.
	 * @param {Mixed} [context=this] The context of the function.
	 * @api public
	 */
	EventEmitter.prototype.once = function once(event, fn, context) {
	  var listener = new EE(fn, context || this, true)
	    , evt = prefix ? prefix + event : event;
	
	  if (!this._events) this._events = prefix ? {} : Object.create(null);
	  if (!this._events[evt]) this._events[evt] = listener;
	  else {
	    if (!this._events[evt].fn) this._events[evt].push(listener);
	    else this._events[evt] = [
	      this._events[evt], listener
	    ];
	  }
	
	  return this;
	};
	
	/**
	 * Remove event listeners.
	 *
	 * @param {String} event The event we want to remove.
	 * @param {Function} fn The listener that we need to find.
	 * @param {Mixed} context Only remove listeners matching this context.
	 * @param {Boolean} once Only remove once listeners.
	 * @api public
	 */
	EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
	  var evt = prefix ? prefix + event : event;
	
	  if (!this._events || !this._events[evt]) return this;
	
	  var listeners = this._events[evt]
	    , events = [];
	
	  if (fn) {
	    if (listeners.fn) {
	      if (
	           listeners.fn !== fn
	        || (once && !listeners.once)
	        || (context && listeners.context !== context)
	      ) {
	        events.push(listeners);
	      }
	    } else {
	      for (var i = 0, length = listeners.length; i < length; i++) {
	        if (
	             listeners[i].fn !== fn
	          || (once && !listeners[i].once)
	          || (context && listeners[i].context !== context)
	        ) {
	          events.push(listeners[i]);
	        }
	      }
	    }
	  }
	
	  //
	  // Reset the array, or remove it completely if we have no more listeners.
	  //
	  if (events.length) {
	    this._events[evt] = events.length === 1 ? events[0] : events;
	  } else {
	    delete this._events[evt];
	  }
	
	  return this;
	};
	
	/**
	 * Remove all listeners or only the listeners for the specified event.
	 *
	 * @param {String} event The event want to remove all listeners for.
	 * @api public
	 */
	EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
	  if (!this._events) return this;
	
	  if (event) delete this._events[prefix ? prefix + event : event];
	  else this._events = prefix ? {} : Object.create(null);
	
	  return this;
	};
	
	//
	// Alias methods names because people roll like that.
	//
	EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
	EventEmitter.prototype.addListener = EventEmitter.prototype.on;
	
	//
	// This function doesn't apply anymore.
	//
	EventEmitter.prototype.setMaxListeners = function setMaxListeners() {
	  return this;
	};
	
	//
	// Expose the prefix.
	//
	EventEmitter.prefixed = prefix;
	
	//
	// Expose the module.
	//
	if (true) {
	  module.exports = EventEmitter;
	}


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	//
	// Hide the differences in how the Thrift compiler generates code for the
	// different platforms as well as expose a Platform class to abstract a few
	// general differences in the platforms.
	//
	if (false) {
	    // eslint-disable-line no-undef
	    module.exports = {
	        Platform: require('./imp/platform/node/platform_node.js'),
	        Transport: require('./imp/platform/node/transport_httpjson.js'),
	        thrift: require('thrift'),
	        crouton_thrift: require('./imp/platform/node/crouton_thrift.js')
	    };
	} else if (true) {
	    // eslint-disable-line no-undef
	    module.exports = {
	        Platform: __webpack_require__(6),
	        Transport: __webpack_require__(11),
	        thrift: __webpack_require__(12),
	        crouton_thrift: __webpack_require__(14)
	    };
	}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var optionsParser = __webpack_require__(7);
	var util = __webpack_require__(8);
	
	var kRuntimeGUIDCookiePrefix = 'lightstep_guid';
	var kSessionIDCookieKey = 'lightstep_session_id';
	var kCookieTimeToLiveSeconds = 7 * 24 * 60 * 60;
	
	var nowMicrosImp = function () {
	    // Is a hi-res timer available?
	    if (window.performance && window.performance.now && window.performance.timing && window.performance.timing.navigationStart) {
	        var _ret = function () {
	            var start = performance.timing.navigationStart;
	            return {
	                v: function () {
	                    return Math.floor((start + performance.now()) * 1000.0);
	                }
	            };
	        }();
	
	        if (typeof _ret === "object") return _ret.v;
	    }
	    // The low-res timer is the best we can do
	    return function () {
	        return Date.now() * 1000.0;
	    };
	}();
	
	var PlatformBrowser = function () {
	    function PlatformBrowser() {
	        _classCallCheck(this, PlatformBrowser);
	    }
	
	    _createClass(PlatformBrowser, [{
	        key: 'name',
	        value: function name() {
	            return 'browser';
	        }
	    }, {
	        key: 'nowMicros',
	        value: function nowMicros() {
	            return nowMicrosImp();
	        }
	
	        // Return the GUID to use for the runtime. The intention is to reuse the
	        // GUID so that logically a single browser session looks like a single
	        // runtime.
	
	    }, {
	        key: 'runtimeGUID',
	        value: function runtimeGUID(groupName) {
	            // Account for the groupName in the same that multiple apps or services
	            // are running on the same domain (and should not share the same
	            // runtime GUID).
	            var cookieKey = kRuntimeGUIDCookiePrefix + '/' + groupName;
	            var uuid = util.cookie(cookieKey) || this._generateLongUUID();
	            util.cookie(cookieKey, uuid, kCookieTimeToLiveSeconds, '/');
	
	            // Also create a session ID as well to give the server more information
	            // to coordinate with.
	            var sessionID = util.cookie(kSessionIDCookieKey) || this._generateLongUUID();
	            util.cookie(kSessionIDCookieKey, sessionID, kCookieTimeToLiveSeconds, '/');
	
	            return uuid;
	        }
	
	        // A low-quality UUID: this is just a 53-bit random integer! (53 bits since the
	        // backing store for the number is a 64-bit float).
	
	    }, {
	        key: 'generateUUID',
	        value: function generateUUID() {
	            return Math.floor(Math.random() * 9e15).toString(16);
	        }
	    }, {
	        key: '_generateLongUUID',
	        value: function _generateLongUUID() {
	            var a = Math.floor(Math.random() * 0xFFFFFFFF).toString(16);
	            var b = Math.floor(Math.random() * 0xFFFFFFFF).toString(16);
	            while (b.length < 8) {
	                b = '0' + b;
	            }
	            return a + b;
	        }
	    }, {
	        key: 'onBeforeExit',
	        value: function onBeforeExit() {
	            if (window) {
	                var _window;
	
	                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	                    args[_key] = arguments[_key];
	                }
	
	                (_window = window).addEventListener.apply(_window, ['beforeunload'].concat(args));
	            }
	        }
	    }, {
	        key: 'plugins',
	        value: function plugins(opts) {
	            return [__webpack_require__(9), __webpack_require__(10)];
	        }
	    }, {
	        key: 'options',
	        value: function options(imp) {
	            var tracerOpts = {};
	            var browserOpts = {};
	            optionsParser.parseScriptElementOptions(tracerOpts, browserOpts);
	            optionsParser.parseURLQueryOptions(tracerOpts, browserOpts);
	            return tracerOpts;
	        }
	    }, {
	        key: 'tracerTags',
	        // eslint-disable-line no-undef
	        value: function tracerTags() {
	            return {
	                lightstep_tracer_platform: 'browser'
	            };
	        }
	
	        // There's no way to truly "fatal" on the browser; the best approximation
	        // is an Error exception.
	
	    }, {
	        key: 'fatal',
	        value: function fatal(message) {
	            throw new Error(message);
	        }
	    }, {
	        key: 'localStoreGet',
	        value: function localStoreGet(key) {
	            if (!window.sessionStorage) {
	                return null;
	            }
	            try {
	                return JSON.parse(sessionStorage.getItem('lightstep/' + key));
	            } catch (_ignored) {
	                return null;
	            }
	        }
	    }, {
	        key: 'localStoreSet',
	        value: function localStoreSet(key, value) {
	            if (!window.sessionStorage) {
	                return;
	            }
	            try {
	                sessionStorage.setItem('lightstep/' + key, JSON.stringify(value));
	            } catch (_ignored) {/* Ignored */}
	        }
	    }], [{
	        key: 'initLibrary',
	        value: function initLibrary(lib) {
	            var tracerOpts = {};
	            var browserOpts = {};
	            optionsParser.parseScriptElementOptions(tracerOpts, browserOpts);
	
	            if (browserOpts.init_global_tracer) {
	                PlatformBrowser.initGlobalTracer(lib, tracerOpts);
	            }
	        }
	    }, {
	        key: 'initGlobalTracer',
	        value: function initGlobalTracer(lib, opts) {
	            if (typeof window !== 'object') {
	                return;
	            }
	            if (typeof window.Tracer !== 'object') {
	                return;
	            }
	            Tracer.initGlobalTracer(lib.tracer(opts));
	        }
	    }]);
	
	    return PlatformBrowser;
	}();
	
	module.exports = PlatformBrowser;

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';
	
	// Find the HTML element that included the tracing library (if there is one).
	// This relies on the fact that scripts are executed as soon as they are
	// included -- thus 'this' script is the last one in the array at the time
	// this is run.
	var hostScriptElement = function () {
	    var scripts = document.getElementsByTagName('SCRIPT');
	    if (!(scripts.length > 0)) {
	        return null;
	    }
	    return scripts[scripts.length - 1];
	}();
	
	function urlQueryParameters(defaults) {
	    var vars = {};
	    var qi = window.location.href.indexOf('?');
	    if (qi < 0) {
	        return vars;
	    }
	    var slice = window.location.href.slice(qi + 1);
	    if (slice.indexOf('#') >= 0) {
	        slice = slice.slice(0, slice.indexOf('#'));
	    }
	    var hashes = slice.replace(/\+/, '%20').split('&');
	    for (var i = 0; i < hashes.length; i++) {
	        var hash = hashes[i].split('=');
	        vars[decodeURIComponent(hash[0])] = decodeURIComponent(hash[1]);
	    }
	    return vars;
	}
	
	// Parses options out of the host <script> element. Allows for easy configuration
	// via the HTML element. Example:
	//
	// <script src='lightstep.min.js'
	//      data-access_token='{my_access_token}'
	//      data-component_name='my_component'></script>
	//
	// Note: relies on the global hostScriptElement variable defined above.
	//
	module.exports.parseScriptElementOptions = function (opts, browserOpts) {
	    if (!hostScriptElement) {
	        return;
	    }
	
	    var dataset = hostScriptElement.dataset;
	
	    var accessToken = dataset.access_token;
	    if (typeof accessToken === 'string' && accessToken.length > 0) {
	        opts.access_token = accessToken;
	    }
	
	    var componentName = dataset.component_name;
	    if (typeof componentName === 'string' && componentName.length > 0) {
	        opts.component_name = componentName;
	    }
	
	    var collectorHost = dataset.collector_host;
	    if (typeof collectorHost === 'string' && collectorHost.length > 0) {
	        opts.collector_host = collectorHost;
	    }
	    var collectorPort = dataset.collector_port;
	    if (collectorPort) {
	        opts.collector_port = parseInt(collectorPort, 10);
	    }
	    var collectorEncryption = dataset.collector_encryption;
	    if (collectorEncryption) {
	        opts.collector_encryption = collectorEncryption;
	    }
	
	    var enable = dataset.enable;
	    if (typeof enable === 'string') {
	        if (enable === 'true') {
	            opts.enable = true;
	        } else if (enable === 'false') {
	            opts.enable = false;
	        }
	    }
	    var verbosity = dataset.verbosity;
	    if (typeof verbosity === 'string') {
	        opts.verbosity = parseInt(verbosity, 10);
	    }
	
	    var init = dataset.init_global_tracer;
	    if (typeof init === 'string') {
	        if (init === 'true') {
	            browserOpts.init_global_tracer = true;
	        } else if (init === 'false') {
	            browserOpts.init_global_tracer = false;
	        }
	    }
	
	    // NOTE: this is a little inelegant as this is hard-coding support for a
	    // "plug-in" option.
	    var xhrInstrumentation = dataset.xhr_instrumentation;
	    if (typeof xhrInstrumentation === 'string' && xhrInstrumentation === 'true') {
	        opts.xhr_instrumentation = true;
	    }
	};
	
	// Parses options out of the current URL query string. The query parameters use
	// the 'lightstep_' prefix to reduce the chance of collision with
	// application-specific query parameters.
	//
	// This mechanism is particularly useful for debugging purposes as it does not
	// require any code or configuration changes.
	//
	module.exports.parseURLQueryOptions = function (opts) {
	    if (!window) {
	        return;
	    }
	
	    var params = urlQueryParameters();
	    if (params.lightstep_verbosity) {
	        try {
	            opts.verbosity = parseInt(params.lightstep_verbosity, 10);
	        } catch (_ignored) {/* Ignored */}
	    }
	    if (params.lightstep_log_to_console) {
	        opts.log_to_console = true;
	    }
	};

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';
	
	/* eslint-disable */
	
	// This function is copied directly from https://github.com/litejs/browser-cookie-lite.
	// It is licensed under the MIT License and authored by Lauri Rooden.
	function cookie(name, value, ttl, path, domain, secure) {
	    if (arguments.length > 1) {
	        var newCookie = name + '=' + encodeURIComponent(value) + (ttl ? "; expires=" + new Date(+new Date() + ttl * 1000).toUTCString() : '') + (path ? "; path=" + path : '') + (domain ? "; domain=" + domain : '') + (secure ? "; secure" : '');
	        document.cookie = newCookie;
	        return newCookie;
	    }
	    return decodeURIComponent((("; " + document.cookie).split("; " + name + "=")[1] || "").split(";")[0]);
	}
	
	/* eslint-enable */
	
	module.exports = {
	    cookie: cookie
	};

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	// Capture the proxied values on script load (i.e. ASAP) in case there are
	// multiple layers of instrumentation.
	var proxied = {};
	if (typeof window === 'object' && typeof window.XMLHttpRequest !== 'undefined') {
	    proxied = {
	        XMLHttpRequest: XMLHttpRequest,
	        open: XMLHttpRequest.prototype.open,
	        send: XMLHttpRequest.prototype.send,
	        setRequestHeader: XMLHttpRequest.prototype.setRequestHeader
	    };
	}
	
	function getCookies() {
	    if (typeof document === 'undefined' || !document.cookie) {
	        return null;
	    }
	    var cookies = document.cookie.split(';');
	    var data = {};
	    var count = 0;
	    for (var i = 0; i < cookies.length; i++) {
	        var parts = cookies[i].split('=', 2);
	        if (parts.length === 2) {
	            var key = parts[0].replace(/^\s+/, '').replace(/\s+$/, '');
	            data[key] = decodeURIComponent(parts[1]);
	            try {
	                data[key] = JSON.parse(data[key]);
	            } catch (_ignored) {/* Ignored */}
	            count++;
	        }
	    }
	    if (count > 0) {
	        return data;
	    }
	    return null;
	}
	
	// Normalize the getAllResponseHeaders output
	function getResponseHeaders(xhr) {
	    var raw = xhr.getAllResponseHeaders();
	    var parts = raw.replace(/\s+$/, '').split(/\n/);
	    for (var i in parts) {
	        parts[i] = parts[i].replace(/\r/g, '').replace(/^\s+/, '').replace(/\s+$/, '');
	    }
	    return parts;
	}
	
	// Automatically create spans for all XMLHttpRequest objects.
	//
	// NOTE: this code currently works only with a single Tracer.
	//
	
	var InstrumentXHR = function () {
	    function InstrumentXHR() {
	        _classCallCheck(this, InstrumentXHR);
	
	        this._enabled = this._isValidContext();
	        this._proxyInited = false;
	        this._internalExclusions = [];
	        this._tracer = null;
	        this._handleOptions = this._handleOptions.bind(this);
	
	        if (!this._enabled) {
	            return;
	        }
	    }
	
	    _createClass(InstrumentXHR, [{
	        key: 'name',
	        value: function name() {
	            return 'instrument_xhr';
	        }
	    }, {
	        key: 'addOptions',
	        value: function addOptions(tracerImp) {
	            tracerImp.addOption('xhr_instrumentation', { type: 'bool', defaultValue: false });
	            tracerImp.addOption('xhr_url_inclusion_patterns', { type: 'array', defaultValue: [/.*/] });
	            tracerImp.addOption('xhr_url_exclusion_patterns', { type: 'array', defaultValue: [] });
	        }
	    }, {
	        key: 'start',
	        value: function start(tracer, tracerImp) {
	            if (!this._enabled) {
	                return;
	            }
	            this._tracer = tracer;
	
	            var currentOptions = tracerImp.options();
	            this._addServiceHostToExclusions(currentOptions);
	            this._handleOptions({}, currentOptions);
	            tracerImp.on('options', this._handleOptions);
	        }
	    }, {
	        key: 'stop',
	        value: function stop() {
	            if (!this._enabled) {
	                return;
	            }
	            var proto = proxied.XMLHttpRequest.prototype;
	            proto.open = proxied.open;
	            proto.send = proxied.send;
	        }
	
	        /**
	         * Respond to options changes on the Tracer.
	         *
	         * Note that `modified` is the options that have changed in this call,
	         * along with their previous and new values. `current` is the full set of
	         * current options *including* the newly modified values.
	         */
	
	    }, {
	        key: '_handleOptions',
	        value: function _handleOptions(modified, current) {
	            // Automatically add the service host itself to the list of exclusions
	            // to avoid reporting on the reports themselves
	            var serviceHost = modified.collector_host;
	            if (serviceHost) {
	                this._addServiceHostToExclusions(current);
	            }
	
	            // Set up the proxied XHR calls unless disabled
	            if (!this._proxyInited && current.xhr_instrumentation) {
	                this._proxyInited = true;
	                var proto = proxied.XMLHttpRequest.prototype;
	                proto.setRequestHeader = this._instrumentSetRequestHeader();
	                proto.open = this._instrumentOpen();
	                proto.send = this._instrumentSend();
	            }
	        }
	
	        /**
	         * Ensure that the reports to the collector don't get instrumented as well,
	         * as that recursive instrumentation is more confusing than valuable!
	         */
	
	    }, {
	        key: '_addServiceHostToExclusions',
	        value: function _addServiceHostToExclusions(opts) {
	            if (opts.collector_host.length === 0) {
	                return;
	            }
	
	            // http://stackoverflow.com/questions/3446170/escape-string-for-use-in-javascript-regex
	            function escapeRegExp(str) {
	                return ('' + str).replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
	            }
	
	            // Check against the hostname without the port as well as the canonicalized
	            // URL may drop the standard port.
	            var host = escapeRegExp(opts.collector_host);
	            var port = escapeRegExp(opts.collector_port);
	            var set = [new RegExp('^https?://' + host + ':' + port)];
	            if (port === '80') {
	                set.push(new RegExp('^http://' + host));
	            } else if (port === '443') {
	                set.push(new RegExp('^https://' + host));
	            }
	            this._internalExclusions = set;
	        }
	
	        /**
	         * Check preconditions for the auto-instrumentation of XHRs to work properly.
	         * There are a lot of potential JavaScript platforms.
	         */
	
	    }, {
	        key: '_isValidContext',
	        value: function _isValidContext() {
	            if (typeof window === 'undefined') {
	                return false;
	            }
	            if (!window.XMLHttpRequest) {
	                return false;
	            }
	            if (!window.XMLHttpRequest.prototype) {
	                return false;
	            }
	            return true;
	        }
	    }, {
	        key: '_instrumentSetRequestHeader',
	        value: function _instrumentSetRequestHeader() {
	            return function (header, value) {
	                this.__requestHeaders = this.__requestHeaders || {};
	                this.__requestHeaders[header] = value;
	                return proxied.setRequestHeader.apply(this, arguments);
	            };
	        }
	    }, {
	        key: '_instrumentOpen',
	        value: function _instrumentOpen() {
	            var self = this;
	            var tracer = this._tracer;
	
	            return function (method, url, asyncArg, user, password) {
	                if (!self._shouldTrace(tracer, this, url)) {
	                    return proxied.open.apply(this, arguments);
	                }
	
	                var span = tracer.startSpan('XMLHttpRequest');
	                tracer.imp().addActiveRootSpan(span.imp());
	                this.__tracer_span = span;
	                this.__tracer_url = url;
	
	                var tags = {
	                    method: method,
	                    url: url,
	                    async: asyncArg,
	                    user: user
	                };
	                if (url) {
	                    tags.url_pathname = url.split('?')[0];
	                }
	
	                var openPayload = {};
	                for (var key in tags) {
	                    openPayload[key] = tags[key];
	                }
	                openPayload.cookies = getCookies();
	
	                // Note: async defaults to true
	                var async = asyncArg === undefined ? true : asyncArg;
	                if (async) {
	                    this.addEventListener('readystatechange', function () {
	                        if (this.readyState === 0) {
	                            span.imp().info('XMLHttpRequest unsent (readyState=0)');
	                        } else if (this.readyState === 1) {
	                            span.imp().info('XMLHttpRequest unsent (readyState=1)');
	                        } else if (this.readyState === 2) {
	                            span.imp().info('XMLHttpRequest: ' + method + ' ' + url, openPayload);
	                            span.imp().addTags(tags);
	                            span.imp().info('XMLHttpRequest headers received (readyState=2)', {
	                                headers: getResponseHeaders(this)
	                            });
	                        } else if (this.readyState === 3) {
	                            span.imp().info('XMLHttpRequest loading (readyState=3)');
	                        } else if (this.readyState === 4) {
	                            var responseType = this.responseType;
	                            var payload = {
	                                url: url,
	                                method: method,
	                                headers: getResponseHeaders(this),
	                                status: this.status,
	                                statusText: this.statusText,
	                                responseType: responseType
	                            };
	
	                            // The responseText property is only valid if the responseType is
	                            // '' or 'text'.  There are other types like 'arraybuffer' for which
	                            // attempting to read responseText will throw an exception.
	                            var validResponseType = responseType === '' || responseType === 'text';
	                            if (validResponseType && this.responseText) {
	                                // Display the payload as JSON if it's parseable as such
	                                try {
	                                    payload.responseJSON = JSON.parse(this.responseText);
	                                } catch (e) {
	                                    payload.responseText = this.responseText;
	                                }
	                            } else {
	                                payload.response = this.response;
	                            }
	
	                            var prefix = 'XMLHttpRequest ' + tags.method + ' done (readyState=4), status ' + this.status;
	                            if (!(this.status > 99)) {
	                                span.imp().error(prefix + ' (unknown)', payload);
	                            } else if (this.status < 199) {
	                                span.imp().info(prefix + ' (informational)', payload);
	                            } else if (this.status < 299) {
	                                span.imp().info(prefix + ' (successful)', payload);
	                            } else if (this.status < 399) {
	                                span.info(prefix + ' (redirection)', payload);
	                            } else if (this.status < 499) {
	                                span.imp().error(prefix + ' (client error)', payload);
	                            } else if (this.status < 599) {
	                                span.imp().error(prefix + ' (server error)', payload);
	                            } else {
	                                span.imp().error(prefix + ' (unknown)', payload);
	                            }
	                            tracer.imp().removeActiveRootSpan(span.imp());
	                            span.finish();
	                        } else {
	                            span.imp().info('XMLHttpRequest readyState=' + this.readyState);
	                        }
	                    });
	                }
	
	                var result = proxied.open.apply(this, arguments);
	                if (!async) {
	                    tracer.imp().removeActiveRootSpan(span.imp());
	                    span.finish();
	                }
	                return result;
	            };
	        }
	    }, {
	        key: '_instrumentSend',
	        value: function _instrumentSend() {
	            var self = this;
	            var tracer = this._tracer;
	            return function () {
	                if (!self._shouldTrace(tracer, this, this.__tracer_url)) {
	                    return proxied.send.apply(this, arguments);
	                }
	
	                var span = this.__tracer_span;
	                if (!span) {
	                    return proxied.send.apply(this, arguments);
	                }
	
	                var data = Array.prototype.slice.call(arguments);
	                var len = undefined;
	                if (data.length === 1) {
	                    if (data[0] && data[0].length) {
	                        len = data[0].length;
	                    }
	                    try {
	                        data = JSON.parse(data[0]);
	                    } catch (e) {
	                        // Ignore the error
	                    }
	                }
	                var lenStr = len === undefined ? '' : ', data length=' + len;
	                span.imp().info('XMLHttpRequest send' + lenStr, data ? { data: data } : undefined);
	                return proxied.send.apply(this, arguments);
	            };
	        }
	    }, {
	        key: '_shouldTrace',
	        value: function _shouldTrace(tracer, xhr, url) {
	            // This shouldn't be possible, but let's be paranoid
	            if (!tracer.imp()) {
	                return false;
	            }
	
	            var opts = tracer.imp().options();
	            if (opts.disabled) {
	                return false;
	            }
	            if (!url) {
	                return false;
	            }
	            for (var key in this._internalExclusions) {
	                var ex = this._internalExclusions[key];
	                if (ex.test(url)) {
	                    return false;
	                }
	            }
	            var include = false;
	            for (var _key in opts.xhr_url_inclusion_patterns) {
	                var inc = opts.xhr_url_inclusion_patterns[_key];
	                if (inc.test(url)) {
	                    include = true;
	                    break;
	                }
	            }
	            if (!include) {
	                return false;
	            }
	            for (var _key2 in opts.xhr_url_exclusion_patterns) {
	                var _ex = opts.xhr_url_exclusion_patterns[_key2];
	                if (_ex.test(url)) {
	                    return false;
	                }
	            }
	            return true;
	        }
	    }]);
	
	    return InstrumentXHR;
	}();
	
	module.exports = new InstrumentXHR();

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var InstrumentPageLoad = function () {
	    function InstrumentPageLoad() {
	        _classCallCheck(this, InstrumentPageLoad);
	
	        this._inited = false;
	        this._span = null;
	    }
	
	    _createClass(InstrumentPageLoad, [{
	        key: 'name',
	        value: function name() {
	            return 'instrument_page_load';
	        }
	    }, {
	        key: 'addOptions',
	        value: function addOptions(tracerImp) {}
	    }, {
	        key: 'start',
	        value: function start(tracer, tracerImp) {
	            if (this._inited) {
	                return;
	            }
	            this._inited = true;
	
	            if (typeof window !== 'object' || typeof document !== 'object') {
	                return;
	            }
	            this._ensureSpanStarted(tracer, tracerImp);
	            document.addEventListener('readystatechange', this._handleReadyStateChange.bind(this));
	        }
	    }, {
	        key: 'stop',
	        value: function stop() {}
	    }, {
	        key: '_ensureSpanStarted',
	        value: function _ensureSpanStarted(tracer, tracerImp) {
	            if (!this._span) {
	                this._span = tracer.startSpan('document/load');
	                tracerImp.addActiveRootSpan(this._span.imp());
	            }
	        }
	    }, {
	        key: '_handleReadyStateChange',
	        value: function _handleReadyStateChange() {
	            if (!this._span) {
	                return;
	            }
	
	            var span = this._span;
	            var state = document.readyState;
	            var payload = undefined;
	            if (state === 'complete') {
	                payload = {};
	                if (window.performance && performance.timing) {
	                    this._addTimingSpans(span, performance.timing);
	                    payload['window.performance.timing'] = performance.timing;
	                }
	            }
	
	            span.logEvent('document.readystatechange ' + state, payload);
	
	            if (state === 'complete') {
	                var tracerImp = span.tracer().imp();
	                if (tracerImp) {
	                    tracerImp.removeActiveRootSpan(span.imp());
	                }
	                span.finish();
	            }
	        }
	    }, {
	        key: '_copyNavigatorProperties',
	        value: function _copyNavigatorProperties(nav) {
	            var dst = {};
	            for (var key in nav) {
	                try {
	                    var value = nav[key];
	                    switch (key) {
	
	                        case 'plugins':
	                            {
	                                var p = [];
	                                for (var i = 0; i < value.length; i++) {
	                                    var item = value.item(i);
	                                    p.push({
	                                        name: item.name,
	                                        description: item.description
	                                    });
	                                }
	                                dst[key] = p;
	                            }break;
	
	                        case 'mimeTypes':
	                            {
	                                var _p = [];
	                                for (var _i = 0; _i < value.length; _i++) {
	                                    var _item = value.item(_i);
	                                    _p.push({
	                                        type: _item.type,
	                                        description: _item.description,
	                                        suffixes: _item.suffixes
	                                    });
	                                }
	                                dst[key] = _p;
	                            }break;
	
	                        default:
	                            dst[key] = value;
	                            break;
	                    }
	                } catch (e) {
	                    // Skip, just in case
	                }
	            }
	            return dst;
	        }
	
	        // Retroactively create the appropriate spans and logs
	
	    }, {
	        key: '_addTimingSpans',
	        value: function _addTimingSpans(parent, timing) {
	            // NOTE: this currently relies on LightStep-specific APIs
	            var parentImp = parent.imp();
	            if (!parentImp) {
	                return;
	            }
	
	            parent.setTag('user_agent', navigator.userAgent);
	
	            for (var key in timing) {
	                var value = timing[key];
	
	                // e.g. secureConnectionStart is not always set
	                if (typeof value !== 'number' || value === 0) {
	                    continue;
	                }
	
	                var micros = value * 1000.0;
	                var payload = undefined;
	
	                if (key === 'navigationStart' && typeof navigator === 'object') {
	                    payload = {
	                        navigator: this._copyNavigatorProperties(navigator)
	                    };
	                }
	                parentImp.log({
	                    message: 'document ' + key,
	                    timestamp_micros: micros,
	                    payload: payload
	                });
	            }
	
	            if (window.chrome && window.chrome.loadTimes) {
	                var chromeTimes = window.chrome.loadTimes();
	                if (chromeTimes) {
	                    parentImp.log({
	                        message: 'window.chrome.loadTimes()',
	                        timestamp_micros: timing.domComplete * 1000.0,
	                        payload: chromeTimes
	                    });
	                }
	            }
	
	            parentImp.modify({
	                begin_micros: timing.navigationStart * 1000.0
	            });
	            parent.tracer().startSpan('document/time_to_first_byte', { parent: parent }).imp().modify({
	                begin_micros: timing.requestStart * 1000.0,
	                end_micros: timing.responseStart * 1000.0
	            }).finish();
	            parent.tracer().startSpan('document/response_transfer', { parent: parent }).imp().modify({
	                begin_micros: timing.responseStart * 1000.0,
	                end_micros: timing.responseEnd * 1000.0
	            }).finish();
	            parent.tracer().startSpan('document/dom_load', { parent: parent }).imp().modify({
	                begin_micros: timing.domLoading * 1000.0,
	                end_micros: timing.domInteractive * 1000.0
	            }).finish();
	        }
	    }]);
	
	    return InstrumentPageLoad;
	}();
	
	module.exports = new InstrumentPageLoad();

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var TransportBrowser = function () {
	    function TransportBrowser() {
	        _classCallCheck(this, TransportBrowser);
	
	        this._host = '';
	        this._port = 0;
	        this._encryption = '';
	    }
	
	    _createClass(TransportBrowser, [{
	        key: 'ensureConnection',
	        value: function ensureConnection(opts) {
	            this._host = opts.collector_host;
	            this._port = opts.collector_port;
	            this._encryption = opts.collector_encryption;
	        }
	    }, {
	        key: 'report',
	        value: function report(detached, auth, _report, done) {
	            try {
	                if (!detached) {
	                    this._reportAJAX(auth, _report, done);
	                } else {
	                    this._reportAsyncScript(auth, _report, done);
	                }
	            } catch (e) {
	                return done(e, null);
	            }
	        }
	    }, {
	        key: '_reportAJAX',
	        value: function _reportAJAX(auth, report, done) {
	            var payload = JSON.stringify(report);
	            var protocol = this._encryption === 'none' ? 'http' : 'https';
	            var url = protocol + '://' + this._host + ':' + this._port + '/api/v0/reports';
	            var xhr = new XMLHttpRequest();
	            xhr.open('POST', url);
	            // Note: the browser automatically sets 'Connection' and 'Content-Length'
	            // and *does not* allow they to be set manually
	            xhr.setRequestHeader('LightStep-Access-Token', auth.access_token);
	            xhr.setRequestHeader('Content-Type', 'application/json');
	            //req.setRequestHeader('Content-Encoding', 'gzip');
	            xhr.onreadystatechange = function () {
	                if (this.readyState === 4) {
	                    var err = null;
	                    var resp = null;
	                    if (this.status !== 200) {
	                        err = new Error('status code = ' + this.status);
	                    } else if (!this.responseText) {
	                        err = new Error('unexpected empty response');
	                    } else {
	                        try {
	                            resp = JSON.parse(this.responseText);
	                        } catch (exception) {
	                            err = exception;
	                        }
	                    }
	                    return done(err, resp);
	                }
	            };
	            xhr.send(payload);
	        }
	
	        // Do a "tail flush" using an async browser script load.  This does not get
	        // interrupted as a normal Thirft RPC would when navigating away from
	        // the page.
	
	    }, {
	        key: '_reportAsyncScript',
	        value: function _reportAsyncScript(auth, report, done) {
	            var authJSON = JSON.stringify(auth);
	            var reportJSON = JSON.stringify(report);
	            var protocol = this._encryption === 'none' ? 'http' : 'https';
	            var url = protocol + '://' + this._host + ':' + this._port + '/_rpc/v1/reports/uri_encoded' + ('?auth=' + encodeURIComponent(authJSON)) + ('&report=' + encodeURIComponent(reportJSON));
	
	            var elem = document.createElement('script');
	            elem.async = true;
	            elem.defer = true;
	            elem.src = url;
	            elem.type = 'text/javascript';
	
	            var hostElem = document.getElementsByTagName('head')[0];
	            if (hostElem) {
	                hostElem.appendChild(elem);
	            }
	            return done(null, null);
	        }
	    }]);
	
	    return TransportBrowser;
	}();

	exports.default = TransportBrowser;
	module.exports = exports['default'];

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = __webpack_require__(13).Thrift;

/***/ },
/* 13 */
/***/ function(module, exports) {

	'use strict';
	
	//
	// GENERATED FILE - DO NOT EDIT DIRECTLY
	//
	// See scripts/build_browser_thrift_lib.js
	//
	//
	(function () {
	  var Thrift = {};
	  var crouton_thrift = {};
	  //
	  // Autogenerated by Thrift Compiler (0.9.2)
	  //
	  // DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
	  //
	
	  if (typeof crouton_thrift === 'undefined') {
	    crouton_thrift = {};
	  }
	  crouton_thrift.KeyValue = function (args) {
	    this.Key = null;
	    this.Value = null;
	    if (args) {
	      if (args.Key !== undefined) {
	        this.Key = args.Key;
	      } else {
	        throw new Thrift.TProtocolException(Thrift.TProtocolExceptionType.UNKNOWN, 'Required field Key is unset!');
	      }
	      if (args.Value !== undefined) {
	        this.Value = args.Value;
	      } else {
	        throw new Thrift.TProtocolException(Thrift.TProtocolExceptionType.UNKNOWN, 'Required field Value is unset!');
	      }
	    }
	  };
	  crouton_thrift.KeyValue.prototype = {};
	  crouton_thrift.KeyValue.prototype.read = false && function (input) {
	    input.readStructBegin();
	    while (true) {
	      var ret = input.readFieldBegin();
	      var fname = ret.fname;
	      var ftype = ret.ftype;
	      var fid = ret.fid;
	      if (ftype == Thrift.Type.STOP) {
	        break;
	      }
	      switch (fid) {
	        case 1:
	          if (ftype == Thrift.Type.STRING) {
	            this.Key = input.readString().value;
	          } else {
	            input.skip(ftype);
	          }
	          break;
	        case 2:
	          if (ftype == Thrift.Type.STRING) {
	            this.Value = input.readString().value;
	          } else {
	            input.skip(ftype);
	          }
	          break;
	        default:
	          input.skip(ftype);
	      }
	      input.readFieldEnd();
	    }
	    input.readStructEnd();
	    return;
	  };
	
	  crouton_thrift.KeyValue.prototype.write = false && function (output) {
	    output.writeStructBegin('KeyValue');
	    if (this.Key !== null && this.Key !== undefined) {
	      output.writeFieldBegin('Key', Thrift.Type.STRING, 1);
	      output.writeString(this.Key);
	      output.writeFieldEnd();
	    }
	    if (this.Value !== null && this.Value !== undefined) {
	      output.writeFieldBegin('Value', Thrift.Type.STRING, 2);
	      output.writeString(this.Value);
	      output.writeFieldEnd();
	    }
	    output.writeFieldStop();
	    output.writeStructEnd();
	    return;
	  };
	
	  crouton_thrift.NamedCounter = function (args) {
	    this.Name = null;
	    this.Value = null;
	    if (args) {
	      if (args.Name !== undefined) {
	        this.Name = args.Name;
	      } else {
	        throw new Thrift.TProtocolException(Thrift.TProtocolExceptionType.UNKNOWN, 'Required field Name is unset!');
	      }
	      if (args.Value !== undefined) {
	        this.Value = args.Value;
	      } else {
	        throw new Thrift.TProtocolException(Thrift.TProtocolExceptionType.UNKNOWN, 'Required field Value is unset!');
	      }
	    }
	  };
	  crouton_thrift.NamedCounter.prototype = {};
	  crouton_thrift.NamedCounter.prototype.read = false && function (input) {
	    input.readStructBegin();
	    while (true) {
	      var ret = input.readFieldBegin();
	      var fname = ret.fname;
	      var ftype = ret.ftype;
	      var fid = ret.fid;
	      if (ftype == Thrift.Type.STOP) {
	        break;
	      }
	      switch (fid) {
	        case 1:
	          if (ftype == Thrift.Type.STRING) {
	            this.Name = input.readString().value;
	          } else {
	            input.skip(ftype);
	          }
	          break;
	        case 2:
	          if (ftype == Thrift.Type.I64) {
	            this.Value = input.readI64().value;
	          } else {
	            input.skip(ftype);
	          }
	          break;
	        default:
	          input.skip(ftype);
	      }
	      input.readFieldEnd();
	    }
	    input.readStructEnd();
	    return;
	  };
	
	  crouton_thrift.NamedCounter.prototype.write = false && function (output) {
	    output.writeStructBegin('NamedCounter');
	    if (this.Name !== null && this.Name !== undefined) {
	      output.writeFieldBegin('Name', Thrift.Type.STRING, 1);
	      output.writeString(this.Name);
	      output.writeFieldEnd();
	    }
	    if (this.Value !== null && this.Value !== undefined) {
	      output.writeFieldBegin('Value', Thrift.Type.I64, 2);
	      output.writeI64(this.Value);
	      output.writeFieldEnd();
	    }
	    output.writeFieldStop();
	    output.writeStructEnd();
	    return;
	  };
	
	  crouton_thrift.Runtime = function (args) {
	    this.guid = null;
	    this.start_micros = null;
	    this.group_name = null;
	    this.attrs = null;
	    if (args) {
	      if (args.guid !== undefined) {
	        this.guid = args.guid;
	      }
	      if (args.start_micros !== undefined) {
	        this.start_micros = args.start_micros;
	      }
	      if (args.group_name !== undefined) {
	        this.group_name = args.group_name;
	      }
	      if (args.attrs !== undefined) {
	        this.attrs = args.attrs;
	      }
	    }
	  };
	  crouton_thrift.Runtime.prototype = {};
	  crouton_thrift.Runtime.prototype.read = false && function (input) {
	    input.readStructBegin();
	    while (true) {
	      var ret = input.readFieldBegin();
	      var fname = ret.fname;
	      var ftype = ret.ftype;
	      var fid = ret.fid;
	      if (ftype == Thrift.Type.STOP) {
	        break;
	      }
	      switch (fid) {
	        case 1:
	          if (ftype == Thrift.Type.STRING) {
	            this.guid = input.readString().value;
	          } else {
	            input.skip(ftype);
	          }
	          break;
	        case 2:
	          if (ftype == Thrift.Type.I64) {
	            this.start_micros = input.readI64().value;
	          } else {
	            input.skip(ftype);
	          }
	          break;
	        case 3:
	          if (ftype == Thrift.Type.STRING) {
	            this.group_name = input.readString().value;
	          } else {
	            input.skip(ftype);
	          }
	          break;
	        case 4:
	          if (ftype == Thrift.Type.LIST) {
	            var _size0 = 0;
	            var _rtmp34;
	            this.attrs = [];
	            var _etype3 = 0;
	            _rtmp34 = input.readListBegin();
	            _etype3 = _rtmp34.etype;
	            _size0 = _rtmp34.size;
	            for (var _i5 = 0; _i5 < _size0; ++_i5) {
	              var elem6 = null;
	              elem6 = new crouton_thrift.KeyValue();
	              elem6.read(input);
	              this.attrs.push(elem6);
	            }
	            input.readListEnd();
	          } else {
	            input.skip(ftype);
	          }
	          break;
	        default:
	          input.skip(ftype);
	      }
	      input.readFieldEnd();
	    }
	    input.readStructEnd();
	    return;
	  };
	
	  crouton_thrift.Runtime.prototype.write = false && function (output) {
	    output.writeStructBegin('Runtime');
	    if (this.guid !== null && this.guid !== undefined) {
	      output.writeFieldBegin('guid', Thrift.Type.STRING, 1);
	      output.writeString(this.guid);
	      output.writeFieldEnd();
	    }
	    if (this.start_micros !== null && this.start_micros !== undefined) {
	      output.writeFieldBegin('start_micros', Thrift.Type.I64, 2);
	      output.writeI64(this.start_micros);
	      output.writeFieldEnd();
	    }
	    if (this.group_name !== null && this.group_name !== undefined) {
	      output.writeFieldBegin('group_name', Thrift.Type.STRING, 3);
	      output.writeString(this.group_name);
	      output.writeFieldEnd();
	    }
	    if (this.attrs !== null && this.attrs !== undefined) {
	      output.writeFieldBegin('attrs', Thrift.Type.LIST, 4);
	      output.writeListBegin(Thrift.Type.STRUCT, this.attrs.length);
	      for (var iter7 in this.attrs) {
	        if (this.attrs.hasOwnProperty(iter7)) {
	          iter7 = this.attrs[iter7];
	          iter7.write(output);
	        }
	      }
	      output.writeListEnd();
	      output.writeFieldEnd();
	    }
	    output.writeFieldStop();
	    output.writeStructEnd();
	    return;
	  };
	
	  crouton_thrift.LogRecord = function (args) {
	    this.timestamp_micros = null;
	    this.runtime_guid = null;
	    this.span_guid = null;
	    this.stable_name = null;
	    this.message = null;
	    this.level = null;
	    this.thread_id = null;
	    this.filename = null;
	    this.line_number = null;
	    this.stack_frames = null;
	    this.payload_json = null;
	    this.error_flag = null;
	    if (args) {
	      if (args.timestamp_micros !== undefined) {
	        this.timestamp_micros = args.timestamp_micros;
	      }
	      if (args.runtime_guid !== undefined) {
	        this.runtime_guid = args.runtime_guid;
	      }
	      if (args.span_guid !== undefined) {
	        this.span_guid = args.span_guid;
	      }
	      if (args.stable_name !== undefined) {
	        this.stable_name = args.stable_name;
	      }
	      if (args.message !== undefined) {
	        this.message = args.message;
	      }
	      if (args.level !== undefined) {
	        this.level = args.level;
	      }
	      if (args.thread_id !== undefined) {
	        this.thread_id = args.thread_id;
	      }
	      if (args.filename !== undefined) {
	        this.filename = args.filename;
	      }
	      if (args.line_number !== undefined) {
	        this.line_number = args.line_number;
	      }
	      if (args.stack_frames !== undefined) {
	        this.stack_frames = args.stack_frames;
	      }
	      if (args.payload_json !== undefined) {
	        this.payload_json = args.payload_json;
	      }
	      if (args.error_flag !== undefined) {
	        this.error_flag = args.error_flag;
	      }
	    }
	  };
	  crouton_thrift.LogRecord.prototype = {};
	  crouton_thrift.LogRecord.prototype.read = false && function (input) {
	    input.readStructBegin();
	    while (true) {
	      var ret = input.readFieldBegin();
	      var fname = ret.fname;
	      var ftype = ret.ftype;
	      var fid = ret.fid;
	      if (ftype == Thrift.Type.STOP) {
	        break;
	      }
	      switch (fid) {
	        case 1:
	          if (ftype == Thrift.Type.I64) {
	            this.timestamp_micros = input.readI64().value;
	          } else {
	            input.skip(ftype);
	          }
	          break;
	        case 2:
	          if (ftype == Thrift.Type.STRING) {
	            this.runtime_guid = input.readString().value;
	          } else {
	            input.skip(ftype);
	          }
	          break;
	        case 3:
	          if (ftype == Thrift.Type.STRING) {
	            this.span_guid = input.readString().value;
	          } else {
	            input.skip(ftype);
	          }
	          break;
	        case 4:
	          if (ftype == Thrift.Type.STRING) {
	            this.stable_name = input.readString().value;
	          } else {
	            input.skip(ftype);
	          }
	          break;
	        case 5:
	          if (ftype == Thrift.Type.STRING) {
	            this.message = input.readString().value;
	          } else {
	            input.skip(ftype);
	          }
	          break;
	        case 6:
	          if (ftype == Thrift.Type.STRING) {
	            this.level = input.readString().value;
	          } else {
	            input.skip(ftype);
	          }
	          break;
	        case 7:
	          if (ftype == Thrift.Type.I64) {
	            this.thread_id = input.readI64().value;
	          } else {
	            input.skip(ftype);
	          }
	          break;
	        case 8:
	          if (ftype == Thrift.Type.STRING) {
	            this.filename = input.readString().value;
	          } else {
	            input.skip(ftype);
	          }
	          break;
	        case 9:
	          if (ftype == Thrift.Type.I64) {
	            this.line_number = input.readI64().value;
	          } else {
	            input.skip(ftype);
	          }
	          break;
	        case 10:
	          if (ftype == Thrift.Type.LIST) {
	            var _size8 = 0;
	            var _rtmp312;
	            this.stack_frames = [];
	            var _etype11 = 0;
	            _rtmp312 = input.readListBegin();
	            _etype11 = _rtmp312.etype;
	            _size8 = _rtmp312.size;
	            for (var _i13 = 0; _i13 < _size8; ++_i13) {
	              var elem14 = null;
	              elem14 = input.readString().value;
	              this.stack_frames.push(elem14);
	            }
	            input.readListEnd();
	          } else {
	            input.skip(ftype);
	          }
	          break;
	        case 11:
	          if (ftype == Thrift.Type.STRING) {
	            this.payload_json = input.readString().value;
	          } else {
	            input.skip(ftype);
	          }
	          break;
	        case 12:
	          if (ftype == Thrift.Type.BOOL) {
	            this.error_flag = input.readBool().value;
	          } else {
	            input.skip(ftype);
	          }
	          break;
	        default:
	          input.skip(ftype);
	      }
	      input.readFieldEnd();
	    }
	    input.readStructEnd();
	    return;
	  };
	
	  crouton_thrift.LogRecord.prototype.write = false && function (output) {
	    output.writeStructBegin('LogRecord');
	    if (this.timestamp_micros !== null && this.timestamp_micros !== undefined) {
	      output.writeFieldBegin('timestamp_micros', Thrift.Type.I64, 1);
	      output.writeI64(this.timestamp_micros);
	      output.writeFieldEnd();
	    }
	    if (this.runtime_guid !== null && this.runtime_guid !== undefined) {
	      output.writeFieldBegin('runtime_guid', Thrift.Type.STRING, 2);
	      output.writeString(this.runtime_guid);
	      output.writeFieldEnd();
	    }
	    if (this.span_guid !== null && this.span_guid !== undefined) {
	      output.writeFieldBegin('span_guid', Thrift.Type.STRING, 3);
	      output.writeString(this.span_guid);
	      output.writeFieldEnd();
	    }
	    if (this.stable_name !== null && this.stable_name !== undefined) {
	      output.writeFieldBegin('stable_name', Thrift.Type.STRING, 4);
	      output.writeString(this.stable_name);
	      output.writeFieldEnd();
	    }
	    if (this.message !== null && this.message !== undefined) {
	      output.writeFieldBegin('message', Thrift.Type.STRING, 5);
	      output.writeString(this.message);
	      output.writeFieldEnd();
	    }
	    if (this.level !== null && this.level !== undefined) {
	      output.writeFieldBegin('level', Thrift.Type.STRING, 6);
	      output.writeString(this.level);
	      output.writeFieldEnd();
	    }
	    if (this.thread_id !== null && this.thread_id !== undefined) {
	      output.writeFieldBegin('thread_id', Thrift.Type.I64, 7);
	      output.writeI64(this.thread_id);
	      output.writeFieldEnd();
	    }
	    if (this.filename !== null && this.filename !== undefined) {
	      output.writeFieldBegin('filename', Thrift.Type.STRING, 8);
	      output.writeString(this.filename);
	      output.writeFieldEnd();
	    }
	    if (this.line_number !== null && this.line_number !== undefined) {
	      output.writeFieldBegin('line_number', Thrift.Type.I64, 9);
	      output.writeI64(this.line_number);
	      output.writeFieldEnd();
	    }
	    if (this.stack_frames !== null && this.stack_frames !== undefined) {
	      output.writeFieldBegin('stack_frames', Thrift.Type.LIST, 10);
	      output.writeListBegin(Thrift.Type.STRING, this.stack_frames.length);
	      for (var iter15 in this.stack_frames) {
	        if (this.stack_frames.hasOwnProperty(iter15)) {
	          iter15 = this.stack_frames[iter15];
	          output.writeString(iter15);
	        }
	      }
	      output.writeListEnd();
	      output.writeFieldEnd();
	    }
	    if (this.payload_json !== null && this.payload_json !== undefined) {
	      output.writeFieldBegin('payload_json', Thrift.Type.STRING, 11);
	      output.writeString(this.payload_json);
	      output.writeFieldEnd();
	    }
	    if (this.error_flag !== null && this.error_flag !== undefined) {
	      output.writeFieldBegin('error_flag', Thrift.Type.BOOL, 12);
	      output.writeBool(this.error_flag);
	      output.writeFieldEnd();
	    }
	    output.writeFieldStop();
	    output.writeStructEnd();
	    return;
	  };
	
	  crouton_thrift.TraceJoinId = function (args) {
	    this.TraceKey = null;
	    this.Value = null;
	    if (args) {
	      if (args.TraceKey !== undefined) {
	        this.TraceKey = args.TraceKey;
	      } else {
	        throw new Thrift.TProtocolException(Thrift.TProtocolExceptionType.UNKNOWN, 'Required field TraceKey is unset!');
	      }
	      if (args.Value !== undefined) {
	        this.Value = args.Value;
	      } else {
	        throw new Thrift.TProtocolException(Thrift.TProtocolExceptionType.UNKNOWN, 'Required field Value is unset!');
	      }
	    }
	  };
	  crouton_thrift.TraceJoinId.prototype = {};
	  crouton_thrift.TraceJoinId.prototype.read = false && function (input) {
	    input.readStructBegin();
	    while (true) {
	      var ret = input.readFieldBegin();
	      var fname = ret.fname;
	      var ftype = ret.ftype;
	      var fid = ret.fid;
	      if (ftype == Thrift.Type.STOP) {
	        break;
	      }
	      switch (fid) {
	        case 1:
	          if (ftype == Thrift.Type.STRING) {
	            this.TraceKey = input.readString().value;
	          } else {
	            input.skip(ftype);
	          }
	          break;
	        case 2:
	          if (ftype == Thrift.Type.STRING) {
	            this.Value = input.readString().value;
	          } else {
	            input.skip(ftype);
	          }
	          break;
	        default:
	          input.skip(ftype);
	      }
	      input.readFieldEnd();
	    }
	    input.readStructEnd();
	    return;
	  };
	
	  crouton_thrift.TraceJoinId.prototype.write = false && function (output) {
	    output.writeStructBegin('TraceJoinId');
	    if (this.TraceKey !== null && this.TraceKey !== undefined) {
	      output.writeFieldBegin('TraceKey', Thrift.Type.STRING, 1);
	      output.writeString(this.TraceKey);
	      output.writeFieldEnd();
	    }
	    if (this.Value !== null && this.Value !== undefined) {
	      output.writeFieldBegin('Value', Thrift.Type.STRING, 2);
	      output.writeString(this.Value);
	      output.writeFieldEnd();
	    }
	    output.writeFieldStop();
	    output.writeStructEnd();
	    return;
	  };
	
	  crouton_thrift.SpanRecord = function (args) {
	    this.span_guid = null;
	    this.trace_guid = null;
	    this.runtime_guid = null;
	    this.span_name = null;
	    this.join_ids = null;
	    this.oldest_micros = null;
	    this.youngest_micros = null;
	    this.attributes = null;
	    this.error_flag = null;
	    this.log_records = null;
	    if (args) {
	      if (args.span_guid !== undefined) {
	        this.span_guid = args.span_guid;
	      }
	      if (args.trace_guid !== undefined) {
	        this.trace_guid = args.trace_guid;
	      }
	      if (args.runtime_guid !== undefined) {
	        this.runtime_guid = args.runtime_guid;
	      }
	      if (args.span_name !== undefined) {
	        this.span_name = args.span_name;
	      }
	      if (args.join_ids !== undefined) {
	        this.join_ids = args.join_ids;
	      }
	      if (args.oldest_micros !== undefined) {
	        this.oldest_micros = args.oldest_micros;
	      }
	      if (args.youngest_micros !== undefined) {
	        this.youngest_micros = args.youngest_micros;
	      }
	      if (args.attributes !== undefined) {
	        this.attributes = args.attributes;
	      }
	      if (args.error_flag !== undefined) {
	        this.error_flag = args.error_flag;
	      }
	      if (args.log_records !== undefined) {
	        this.log_records = args.log_records;
	      }
	    }
	  };
	  crouton_thrift.SpanRecord.prototype = {};
	  crouton_thrift.SpanRecord.prototype.read = false && function (input) {
	    input.readStructBegin();
	    while (true) {
	      var ret = input.readFieldBegin();
	      var fname = ret.fname;
	      var ftype = ret.ftype;
	      var fid = ret.fid;
	      if (ftype == Thrift.Type.STOP) {
	        break;
	      }
	      switch (fid) {
	        case 1:
	          if (ftype == Thrift.Type.STRING) {
	            this.span_guid = input.readString().value;
	          } else {
	            input.skip(ftype);
	          }
	          break;
	        case 11:
	          if (ftype == Thrift.Type.STRING) {
	            this.trace_guid = input.readString().value;
	          } else {
	            input.skip(ftype);
	          }
	          break;
	        case 2:
	          if (ftype == Thrift.Type.STRING) {
	            this.runtime_guid = input.readString().value;
	          } else {
	            input.skip(ftype);
	          }
	          break;
	        case 3:
	          if (ftype == Thrift.Type.STRING) {
	            this.span_name = input.readString().value;
	          } else {
	            input.skip(ftype);
	          }
	          break;
	        case 4:
	          if (ftype == Thrift.Type.LIST) {
	            var _size16 = 0;
	            var _rtmp320;
	            this.join_ids = [];
	            var _etype19 = 0;
	            _rtmp320 = input.readListBegin();
	            _etype19 = _rtmp320.etype;
	            _size16 = _rtmp320.size;
	            for (var _i21 = 0; _i21 < _size16; ++_i21) {
	              var elem22 = null;
	              elem22 = new crouton_thrift.TraceJoinId();
	              elem22.read(input);
	              this.join_ids.push(elem22);
	            }
	            input.readListEnd();
	          } else {
	            input.skip(ftype);
	          }
	          break;
	        case 5:
	          if (ftype == Thrift.Type.I64) {
	            this.oldest_micros = input.readI64().value;
	          } else {
	            input.skip(ftype);
	          }
	          break;
	        case 6:
	          if (ftype == Thrift.Type.I64) {
	            this.youngest_micros = input.readI64().value;
	          } else {
	            input.skip(ftype);
	          }
	          break;
	        case 8:
	          if (ftype == Thrift.Type.LIST) {
	            var _size23 = 0;
	            var _rtmp327;
	            this.attributes = [];
	            var _etype26 = 0;
	            _rtmp327 = input.readListBegin();
	            _etype26 = _rtmp327.etype;
	            _size23 = _rtmp327.size;
	            for (var _i28 = 0; _i28 < _size23; ++_i28) {
	              var elem29 = null;
	              elem29 = new crouton_thrift.KeyValue();
	              elem29.read(input);
	              this.attributes.push(elem29);
	            }
	            input.readListEnd();
	          } else {
	            input.skip(ftype);
	          }
	          break;
	        case 9:
	          if (ftype == Thrift.Type.BOOL) {
	            this.error_flag = input.readBool().value;
	          } else {
	            input.skip(ftype);
	          }
	          break;
	        case 10:
	          if (ftype == Thrift.Type.LIST) {
	            var _size30 = 0;
	            var _rtmp334;
	            this.log_records = [];
	            var _etype33 = 0;
	            _rtmp334 = input.readListBegin();
	            _etype33 = _rtmp334.etype;
	            _size30 = _rtmp334.size;
	            for (var _i35 = 0; _i35 < _size30; ++_i35) {
	              var elem36 = null;
	              elem36 = new crouton_thrift.LogRecord();
	              elem36.read(input);
	              this.log_records.push(elem36);
	            }
	            input.readListEnd();
	          } else {
	            input.skip(ftype);
	          }
	          break;
	        default:
	          input.skip(ftype);
	      }
	      input.readFieldEnd();
	    }
	    input.readStructEnd();
	    return;
	  };
	
	  crouton_thrift.SpanRecord.prototype.write = false && function (output) {
	    output.writeStructBegin('SpanRecord');
	    if (this.span_guid !== null && this.span_guid !== undefined) {
	      output.writeFieldBegin('span_guid', Thrift.Type.STRING, 1);
	      output.writeString(this.span_guid);
	      output.writeFieldEnd();
	    }
	    if (this.trace_guid !== null && this.trace_guid !== undefined) {
	      output.writeFieldBegin('trace_guid', Thrift.Type.STRING, 11);
	      output.writeString(this.trace_guid);
	      output.writeFieldEnd();
	    }
	    if (this.runtime_guid !== null && this.runtime_guid !== undefined) {
	      output.writeFieldBegin('runtime_guid', Thrift.Type.STRING, 2);
	      output.writeString(this.runtime_guid);
	      output.writeFieldEnd();
	    }
	    if (this.span_name !== null && this.span_name !== undefined) {
	      output.writeFieldBegin('span_name', Thrift.Type.STRING, 3);
	      output.writeString(this.span_name);
	      output.writeFieldEnd();
	    }
	    if (this.join_ids !== null && this.join_ids !== undefined) {
	      output.writeFieldBegin('join_ids', Thrift.Type.LIST, 4);
	      output.writeListBegin(Thrift.Type.STRUCT, this.join_ids.length);
	      for (var iter37 in this.join_ids) {
	        if (this.join_ids.hasOwnProperty(iter37)) {
	          iter37 = this.join_ids[iter37];
	          iter37.write(output);
	        }
	      }
	      output.writeListEnd();
	      output.writeFieldEnd();
	    }
	    if (this.oldest_micros !== null && this.oldest_micros !== undefined) {
	      output.writeFieldBegin('oldest_micros', Thrift.Type.I64, 5);
	      output.writeI64(this.oldest_micros);
	      output.writeFieldEnd();
	    }
	    if (this.youngest_micros !== null && this.youngest_micros !== undefined) {
	      output.writeFieldBegin('youngest_micros', Thrift.Type.I64, 6);
	      output.writeI64(this.youngest_micros);
	      output.writeFieldEnd();
	    }
	    if (this.attributes !== null && this.attributes !== undefined) {
	      output.writeFieldBegin('attributes', Thrift.Type.LIST, 8);
	      output.writeListBegin(Thrift.Type.STRUCT, this.attributes.length);
	      for (var iter38 in this.attributes) {
	        if (this.attributes.hasOwnProperty(iter38)) {
	          iter38 = this.attributes[iter38];
	          iter38.write(output);
	        }
	      }
	      output.writeListEnd();
	      output.writeFieldEnd();
	    }
	    if (this.error_flag !== null && this.error_flag !== undefined) {
	      output.writeFieldBegin('error_flag', Thrift.Type.BOOL, 9);
	      output.writeBool(this.error_flag);
	      output.writeFieldEnd();
	    }
	    if (this.log_records !== null && this.log_records !== undefined) {
	      output.writeFieldBegin('log_records', Thrift.Type.LIST, 10);
	      output.writeListBegin(Thrift.Type.STRUCT, this.log_records.length);
	      for (var iter39 in this.log_records) {
	        if (this.log_records.hasOwnProperty(iter39)) {
	          iter39 = this.log_records[iter39];
	          iter39.write(output);
	        }
	      }
	      output.writeListEnd();
	      output.writeFieldEnd();
	    }
	    output.writeFieldStop();
	    output.writeStructEnd();
	    return;
	  };
	
	  crouton_thrift.Auth = function (args) {
	    this.access_token = null;
	    if (args) {
	      if (args.access_token !== undefined) {
	        this.access_token = args.access_token;
	      }
	    }
	  };
	  crouton_thrift.Auth.prototype = {};
	  crouton_thrift.Auth.prototype.read = false && function (input) {
	    input.readStructBegin();
	    while (true) {
	      var ret = input.readFieldBegin();
	      var fname = ret.fname;
	      var ftype = ret.ftype;
	      var fid = ret.fid;
	      if (ftype == Thrift.Type.STOP) {
	        break;
	      }
	      switch (fid) {
	        case 1:
	          if (ftype == Thrift.Type.STRING) {
	            this.access_token = input.readString().value;
	          } else {
	            input.skip(ftype);
	          }
	          break;
	        case 0:
	          input.skip(ftype);
	          break;
	        default:
	          input.skip(ftype);
	      }
	      input.readFieldEnd();
	    }
	    input.readStructEnd();
	    return;
	  };
	
	  crouton_thrift.Auth.prototype.write = false && function (output) {
	    output.writeStructBegin('Auth');
	    if (this.access_token !== null && this.access_token !== undefined) {
	      output.writeFieldBegin('access_token', Thrift.Type.STRING, 1);
	      output.writeString(this.access_token);
	      output.writeFieldEnd();
	    }
	    output.writeFieldStop();
	    output.writeStructEnd();
	    return;
	  };
	
	  crouton_thrift.Timing = function (args) {
	    this.receive_micros = null;
	    this.transmit_micros = null;
	    if (args) {
	      if (args.receive_micros !== undefined) {
	        this.receive_micros = args.receive_micros;
	      }
	      if (args.transmit_micros !== undefined) {
	        this.transmit_micros = args.transmit_micros;
	      }
	    }
	  };
	  crouton_thrift.Timing.prototype = {};
	  crouton_thrift.Timing.prototype.read = false && function (input) {
	    input.readStructBegin();
	    while (true) {
	      var ret = input.readFieldBegin();
	      var fname = ret.fname;
	      var ftype = ret.ftype;
	      var fid = ret.fid;
	      if (ftype == Thrift.Type.STOP) {
	        break;
	      }
	      switch (fid) {
	        case 1:
	          if (ftype == Thrift.Type.I64) {
	            this.receive_micros = input.readI64().value;
	          } else {
	            input.skip(ftype);
	          }
	          break;
	        case 2:
	          if (ftype == Thrift.Type.I64) {
	            this.transmit_micros = input.readI64().value;
	          } else {
	            input.skip(ftype);
	          }
	          break;
	        default:
	          input.skip(ftype);
	      }
	      input.readFieldEnd();
	    }
	    input.readStructEnd();
	    return;
	  };
	
	  crouton_thrift.Timing.prototype.write = false && function (output) {
	    output.writeStructBegin('Timing');
	    if (this.receive_micros !== null && this.receive_micros !== undefined) {
	      output.writeFieldBegin('receive_micros', Thrift.Type.I64, 1);
	      output.writeI64(this.receive_micros);
	      output.writeFieldEnd();
	    }
	    if (this.transmit_micros !== null && this.transmit_micros !== undefined) {
	      output.writeFieldBegin('transmit_micros', Thrift.Type.I64, 2);
	      output.writeI64(this.transmit_micros);
	      output.writeFieldEnd();
	    }
	    output.writeFieldStop();
	    output.writeStructEnd();
	    return;
	  };
	
	  crouton_thrift.SampleCount = function (args) {
	    this.oldest_micros = null;
	    this.youngest_micros = null;
	    this.count = null;
	    if (args) {
	      if (args.oldest_micros !== undefined) {
	        this.oldest_micros = args.oldest_micros;
	      }
	      if (args.youngest_micros !== undefined) {
	        this.youngest_micros = args.youngest_micros;
	      }
	      if (args.count !== undefined) {
	        this.count = args.count;
	      }
	    }
	  };
	  crouton_thrift.SampleCount.prototype = {};
	  crouton_thrift.SampleCount.prototype.read = false && function (input) {
	    input.readStructBegin();
	    while (true) {
	      var ret = input.readFieldBegin();
	      var fname = ret.fname;
	      var ftype = ret.ftype;
	      var fid = ret.fid;
	      if (ftype == Thrift.Type.STOP) {
	        break;
	      }
	      switch (fid) {
	        case 1:
	          if (ftype == Thrift.Type.I64) {
	            this.oldest_micros = input.readI64().value;
	          } else {
	            input.skip(ftype);
	          }
	          break;
	        case 2:
	          if (ftype == Thrift.Type.I64) {
	            this.youngest_micros = input.readI64().value;
	          } else {
	            input.skip(ftype);
	          }
	          break;
	        case 3:
	          if (ftype == Thrift.Type.I64) {
	            this.count = input.readI64().value;
	          } else {
	            input.skip(ftype);
	          }
	          break;
	        default:
	          input.skip(ftype);
	      }
	      input.readFieldEnd();
	    }
	    input.readStructEnd();
	    return;
	  };
	
	  crouton_thrift.SampleCount.prototype.write = false && function (output) {
	    output.writeStructBegin('SampleCount');
	    if (this.oldest_micros !== null && this.oldest_micros !== undefined) {
	      output.writeFieldBegin('oldest_micros', Thrift.Type.I64, 1);
	      output.writeI64(this.oldest_micros);
	      output.writeFieldEnd();
	    }
	    if (this.youngest_micros !== null && this.youngest_micros !== undefined) {
	      output.writeFieldBegin('youngest_micros', Thrift.Type.I64, 2);
	      output.writeI64(this.youngest_micros);
	      output.writeFieldEnd();
	    }
	    if (this.count !== null && this.count !== undefined) {
	      output.writeFieldBegin('count', Thrift.Type.I64, 3);
	      output.writeI64(this.count);
	      output.writeFieldEnd();
	    }
	    output.writeFieldStop();
	    output.writeStructEnd();
	    return;
	  };
	
	  crouton_thrift.MetricsSample = function (args) {
	    this.name = null;
	    this.int64_value = null;
	    this.double_value = null;
	    if (args) {
	      if (args.name !== undefined) {
	        this.name = args.name;
	      } else {
	        throw new Thrift.TProtocolException(Thrift.TProtocolExceptionType.UNKNOWN, 'Required field name is unset!');
	      }
	      if (args.int64_value !== undefined) {
	        this.int64_value = args.int64_value;
	      }
	      if (args.double_value !== undefined) {
	        this.double_value = args.double_value;
	      }
	    }
	  };
	  crouton_thrift.MetricsSample.prototype = {};
	  crouton_thrift.MetricsSample.prototype.read = false && function (input) {
	    input.readStructBegin();
	    while (true) {
	      var ret = input.readFieldBegin();
	      var fname = ret.fname;
	      var ftype = ret.ftype;
	      var fid = ret.fid;
	      if (ftype == Thrift.Type.STOP) {
	        break;
	      }
	      switch (fid) {
	        case 1:
	          if (ftype == Thrift.Type.STRING) {
	            this.name = input.readString().value;
	          } else {
	            input.skip(ftype);
	          }
	          break;
	        case 2:
	          if (ftype == Thrift.Type.I64) {
	            this.int64_value = input.readI64().value;
	          } else {
	            input.skip(ftype);
	          }
	          break;
	        case 3:
	          if (ftype == Thrift.Type.DOUBLE) {
	            this.double_value = input.readDouble().value;
	          } else {
	            input.skip(ftype);
	          }
	          break;
	        default:
	          input.skip(ftype);
	      }
	      input.readFieldEnd();
	    }
	    input.readStructEnd();
	    return;
	  };
	
	  crouton_thrift.MetricsSample.prototype.write = false && function (output) {
	    output.writeStructBegin('MetricsSample');
	    if (this.name !== null && this.name !== undefined) {
	      output.writeFieldBegin('name', Thrift.Type.STRING, 1);
	      output.writeString(this.name);
	      output.writeFieldEnd();
	    }
	    if (this.int64_value !== null && this.int64_value !== undefined) {
	      output.writeFieldBegin('int64_value', Thrift.Type.I64, 2);
	      output.writeI64(this.int64_value);
	      output.writeFieldEnd();
	    }
	    if (this.double_value !== null && this.double_value !== undefined) {
	      output.writeFieldBegin('double_value', Thrift.Type.DOUBLE, 3);
	      output.writeDouble(this.double_value);
	      output.writeFieldEnd();
	    }
	    output.writeFieldStop();
	    output.writeStructEnd();
	    return;
	  };
	
	  crouton_thrift.Metrics = function (args) {
	    this.counts = null;
	    if (args) {
	      if (args.counts !== undefined) {
	        this.counts = args.counts;
	      }
	    }
	  };
	  crouton_thrift.Metrics.prototype = {};
	  crouton_thrift.Metrics.prototype.read = false && function (input) {
	    input.readStructBegin();
	    while (true) {
	      var ret = input.readFieldBegin();
	      var fname = ret.fname;
	      var ftype = ret.ftype;
	      var fid = ret.fid;
	      if (ftype == Thrift.Type.STOP) {
	        break;
	      }
	      switch (fid) {
	        case 1:
	          if (ftype == Thrift.Type.LIST) {
	            var _size40 = 0;
	            var _rtmp344;
	            this.counts = [];
	            var _etype43 = 0;
	            _rtmp344 = input.readListBegin();
	            _etype43 = _rtmp344.etype;
	            _size40 = _rtmp344.size;
	            for (var _i45 = 0; _i45 < _size40; ++_i45) {
	              var elem46 = null;
	              elem46 = new crouton_thrift.MetricsSample();
	              elem46.read(input);
	              this.counts.push(elem46);
	            }
	            input.readListEnd();
	          } else {
	            input.skip(ftype);
	          }
	          break;
	        case 0:
	          input.skip(ftype);
	          break;
	        default:
	          input.skip(ftype);
	      }
	      input.readFieldEnd();
	    }
	    input.readStructEnd();
	    return;
	  };
	
	  crouton_thrift.Metrics.prototype.write = false && function (output) {
	    output.writeStructBegin('Metrics');
	    if (this.counts !== null && this.counts !== undefined) {
	      output.writeFieldBegin('counts', Thrift.Type.LIST, 1);
	      output.writeListBegin(Thrift.Type.STRUCT, this.counts.length);
	      for (var iter47 in this.counts) {
	        if (this.counts.hasOwnProperty(iter47)) {
	          iter47 = this.counts[iter47];
	          iter47.write(output);
	        }
	      }
	      output.writeListEnd();
	      output.writeFieldEnd();
	    }
	    output.writeFieldStop();
	    output.writeStructEnd();
	    return;
	  };
	
	  crouton_thrift.ReportRequest = function (args) {
	    this.runtime = null;
	    this.span_records = null;
	    this.log_records = null;
	    this.timestamp_offset_micros = null;
	    this.oldest_micros = null;
	    this.youngest_micros = null;
	    this.counters = null;
	    this.internal_logs = null;
	    this.internal_metrics = null;
	    if (args) {
	      if (args.runtime !== undefined) {
	        this.runtime = args.runtime;
	      }
	      if (args.span_records !== undefined) {
	        this.span_records = args.span_records;
	      }
	      if (args.log_records !== undefined) {
	        this.log_records = args.log_records;
	      }
	      if (args.timestamp_offset_micros !== undefined) {
	        this.timestamp_offset_micros = args.timestamp_offset_micros;
	      }
	      if (args.oldest_micros !== undefined) {
	        this.oldest_micros = args.oldest_micros;
	      }
	      if (args.youngest_micros !== undefined) {
	        this.youngest_micros = args.youngest_micros;
	      }
	      if (args.counters !== undefined) {
	        this.counters = args.counters;
	      }
	      if (args.internal_logs !== undefined) {
	        this.internal_logs = args.internal_logs;
	      }
	      if (args.internal_metrics !== undefined) {
	        this.internal_metrics = args.internal_metrics;
	      }
	    }
	  };
	  crouton_thrift.ReportRequest.prototype = {};
	  crouton_thrift.ReportRequest.prototype.read = false && function (input) {
	    input.readStructBegin();
	    while (true) {
	      var ret = input.readFieldBegin();
	      var fname = ret.fname;
	      var ftype = ret.ftype;
	      var fid = ret.fid;
	      if (ftype == Thrift.Type.STOP) {
	        break;
	      }
	      switch (fid) {
	        case 1:
	          if (ftype == Thrift.Type.STRUCT) {
	            this.runtime = new crouton_thrift.Runtime();
	            this.runtime.read(input);
	          } else {
	            input.skip(ftype);
	          }
	          break;
	        case 3:
	          if (ftype == Thrift.Type.LIST) {
	            var _size48 = 0;
	            var _rtmp352;
	            this.span_records = [];
	            var _etype51 = 0;
	            _rtmp352 = input.readListBegin();
	            _etype51 = _rtmp352.etype;
	            _size48 = _rtmp352.size;
	            for (var _i53 = 0; _i53 < _size48; ++_i53) {
	              var elem54 = null;
	              elem54 = new crouton_thrift.SpanRecord();
	              elem54.read(input);
	              this.span_records.push(elem54);
	            }
	            input.readListEnd();
	          } else {
	            input.skip(ftype);
	          }
	          break;
	        case 4:
	          if (ftype == Thrift.Type.LIST) {
	            var _size55 = 0;
	            var _rtmp359;
	            this.log_records = [];
	            var _etype58 = 0;
	            _rtmp359 = input.readListBegin();
	            _etype58 = _rtmp359.etype;
	            _size55 = _rtmp359.size;
	            for (var _i60 = 0; _i60 < _size55; ++_i60) {
	              var elem61 = null;
	              elem61 = new crouton_thrift.LogRecord();
	              elem61.read(input);
	              this.log_records.push(elem61);
	            }
	            input.readListEnd();
	          } else {
	            input.skip(ftype);
	          }
	          break;
	        case 5:
	          if (ftype == Thrift.Type.I64) {
	            this.timestamp_offset_micros = input.readI64().value;
	          } else {
	            input.skip(ftype);
	          }
	          break;
	        case 7:
	          if (ftype == Thrift.Type.I64) {
	            this.oldest_micros = input.readI64().value;
	          } else {
	            input.skip(ftype);
	          }
	          break;
	        case 8:
	          if (ftype == Thrift.Type.I64) {
	            this.youngest_micros = input.readI64().value;
	          } else {
	            input.skip(ftype);
	          }
	          break;
	        case 9:
	          if (ftype == Thrift.Type.LIST) {
	            var _size62 = 0;
	            var _rtmp366;
	            this.counters = [];
	            var _etype65 = 0;
	            _rtmp366 = input.readListBegin();
	            _etype65 = _rtmp366.etype;
	            _size62 = _rtmp366.size;
	            for (var _i67 = 0; _i67 < _size62; ++_i67) {
	              var elem68 = null;
	              elem68 = new crouton_thrift.NamedCounter();
	              elem68.read(input);
	              this.counters.push(elem68);
	            }
	            input.readListEnd();
	          } else {
	            input.skip(ftype);
	          }
	          break;
	        case 10:
	          if (ftype == Thrift.Type.LIST) {
	            var _size69 = 0;
	            var _rtmp373;
	            this.internal_logs = [];
	            var _etype72 = 0;
	            _rtmp373 = input.readListBegin();
	            _etype72 = _rtmp373.etype;
	            _size69 = _rtmp373.size;
	            for (var _i74 = 0; _i74 < _size69; ++_i74) {
	              var elem75 = null;
	              elem75 = new crouton_thrift.LogRecord();
	              elem75.read(input);
	              this.internal_logs.push(elem75);
	            }
	            input.readListEnd();
	          } else {
	            input.skip(ftype);
	          }
	          break;
	        case 11:
	          if (ftype == Thrift.Type.STRUCT) {
	            this.internal_metrics = new crouton_thrift.Metrics();
	            this.internal_metrics.read(input);
	          } else {
	            input.skip(ftype);
	          }
	          break;
	        default:
	          input.skip(ftype);
	      }
	      input.readFieldEnd();
	    }
	    input.readStructEnd();
	    return;
	  };
	
	  crouton_thrift.ReportRequest.prototype.write = false && function (output) {
	    output.writeStructBegin('ReportRequest');
	    if (this.runtime !== null && this.runtime !== undefined) {
	      output.writeFieldBegin('runtime', Thrift.Type.STRUCT, 1);
	      this.runtime.write(output);
	      output.writeFieldEnd();
	    }
	    if (this.span_records !== null && this.span_records !== undefined) {
	      output.writeFieldBegin('span_records', Thrift.Type.LIST, 3);
	      output.writeListBegin(Thrift.Type.STRUCT, this.span_records.length);
	      for (var iter76 in this.span_records) {
	        if (this.span_records.hasOwnProperty(iter76)) {
	          iter76 = this.span_records[iter76];
	          iter76.write(output);
	        }
	      }
	      output.writeListEnd();
	      output.writeFieldEnd();
	    }
	    if (this.log_records !== null && this.log_records !== undefined) {
	      output.writeFieldBegin('log_records', Thrift.Type.LIST, 4);
	      output.writeListBegin(Thrift.Type.STRUCT, this.log_records.length);
	      for (var iter77 in this.log_records) {
	        if (this.log_records.hasOwnProperty(iter77)) {
	          iter77 = this.log_records[iter77];
	          iter77.write(output);
	        }
	      }
	      output.writeListEnd();
	      output.writeFieldEnd();
	    }
	    if (this.timestamp_offset_micros !== null && this.timestamp_offset_micros !== undefined) {
	      output.writeFieldBegin('timestamp_offset_micros', Thrift.Type.I64, 5);
	      output.writeI64(this.timestamp_offset_micros);
	      output.writeFieldEnd();
	    }
	    if (this.oldest_micros !== null && this.oldest_micros !== undefined) {
	      output.writeFieldBegin('oldest_micros', Thrift.Type.I64, 7);
	      output.writeI64(this.oldest_micros);
	      output.writeFieldEnd();
	    }
	    if (this.youngest_micros !== null && this.youngest_micros !== undefined) {
	      output.writeFieldBegin('youngest_micros', Thrift.Type.I64, 8);
	      output.writeI64(this.youngest_micros);
	      output.writeFieldEnd();
	    }
	    if (this.counters !== null && this.counters !== undefined) {
	      output.writeFieldBegin('counters', Thrift.Type.LIST, 9);
	      output.writeListBegin(Thrift.Type.STRUCT, this.counters.length);
	      for (var iter78 in this.counters) {
	        if (this.counters.hasOwnProperty(iter78)) {
	          iter78 = this.counters[iter78];
	          iter78.write(output);
	        }
	      }
	      output.writeListEnd();
	      output.writeFieldEnd();
	    }
	    if (this.internal_logs !== null && this.internal_logs !== undefined) {
	      output.writeFieldBegin('internal_logs', Thrift.Type.LIST, 10);
	      output.writeListBegin(Thrift.Type.STRUCT, this.internal_logs.length);
	      for (var iter79 in this.internal_logs) {
	        if (this.internal_logs.hasOwnProperty(iter79)) {
	          iter79 = this.internal_logs[iter79];
	          iter79.write(output);
	        }
	      }
	      output.writeListEnd();
	      output.writeFieldEnd();
	    }
	    if (this.internal_metrics !== null && this.internal_metrics !== undefined) {
	      output.writeFieldBegin('internal_metrics', Thrift.Type.STRUCT, 11);
	      this.internal_metrics.write(output);
	      output.writeFieldEnd();
	    }
	    output.writeFieldStop();
	    output.writeStructEnd();
	    return;
	  };
	
	  crouton_thrift.Command = function (args) {
	    this.disable = null;
	    if (args) {
	      if (args.disable !== undefined) {
	        this.disable = args.disable;
	      }
	    }
	  };
	  crouton_thrift.Command.prototype = {};
	  crouton_thrift.Command.prototype.read = false && function (input) {
	    input.readStructBegin();
	    while (true) {
	      var ret = input.readFieldBegin();
	      var fname = ret.fname;
	      var ftype = ret.ftype;
	      var fid = ret.fid;
	      if (ftype == Thrift.Type.STOP) {
	        break;
	      }
	      switch (fid) {
	        case 1:
	          if (ftype == Thrift.Type.BOOL) {
	            this.disable = input.readBool().value;
	          } else {
	            input.skip(ftype);
	          }
	          break;
	        case 0:
	          input.skip(ftype);
	          break;
	        default:
	          input.skip(ftype);
	      }
	      input.readFieldEnd();
	    }
	    input.readStructEnd();
	    return;
	  };
	
	  crouton_thrift.Command.prototype.write = false && function (output) {
	    output.writeStructBegin('Command');
	    if (this.disable !== null && this.disable !== undefined) {
	      output.writeFieldBegin('disable', Thrift.Type.BOOL, 1);
	      output.writeBool(this.disable);
	      output.writeFieldEnd();
	    }
	    output.writeFieldStop();
	    output.writeStructEnd();
	    return;
	  };
	
	  crouton_thrift.ReportResponse = function (args) {
	    this.commands = null;
	    this.timing = null;
	    this.errors = null;
	    if (args) {
	      if (args.commands !== undefined) {
	        this.commands = args.commands;
	      }
	      if (args.timing !== undefined) {
	        this.timing = args.timing;
	      }
	      if (args.errors !== undefined) {
	        this.errors = args.errors;
	      }
	    }
	  };
	  crouton_thrift.ReportResponse.prototype = {};
	  crouton_thrift.ReportResponse.prototype.read = false && function (input) {
	    input.readStructBegin();
	    while (true) {
	      var ret = input.readFieldBegin();
	      var fname = ret.fname;
	      var ftype = ret.ftype;
	      var fid = ret.fid;
	      if (ftype == Thrift.Type.STOP) {
	        break;
	      }
	      switch (fid) {
	        case 1:
	          if (ftype == Thrift.Type.LIST) {
	            var _size80 = 0;
	            var _rtmp384;
	            this.commands = [];
	            var _etype83 = 0;
	            _rtmp384 = input.readListBegin();
	            _etype83 = _rtmp384.etype;
	            _size80 = _rtmp384.size;
	            for (var _i85 = 0; _i85 < _size80; ++_i85) {
	              var elem86 = null;
	              elem86 = new crouton_thrift.Command();
	              elem86.read(input);
	              this.commands.push(elem86);
	            }
	            input.readListEnd();
	          } else {
	            input.skip(ftype);
	          }
	          break;
	        case 2:
	          if (ftype == Thrift.Type.STRUCT) {
	            this.timing = new crouton_thrift.Timing();
	            this.timing.read(input);
	          } else {
	            input.skip(ftype);
	          }
	          break;
	        case 3:
	          if (ftype == Thrift.Type.LIST) {
	            var _size87 = 0;
	            var _rtmp391;
	            this.errors = [];
	            var _etype90 = 0;
	            _rtmp391 = input.readListBegin();
	            _etype90 = _rtmp391.etype;
	            _size87 = _rtmp391.size;
	            for (var _i92 = 0; _i92 < _size87; ++_i92) {
	              var elem93 = null;
	              elem93 = input.readString().value;
	              this.errors.push(elem93);
	            }
	            input.readListEnd();
	          } else {
	            input.skip(ftype);
	          }
	          break;
	        default:
	          input.skip(ftype);
	      }
	      input.readFieldEnd();
	    }
	    input.readStructEnd();
	    return;
	  };
	
	  crouton_thrift.ReportResponse.prototype.write = false && function (output) {
	    output.writeStructBegin('ReportResponse');
	    if (this.commands !== null && this.commands !== undefined) {
	      output.writeFieldBegin('commands', Thrift.Type.LIST, 1);
	      output.writeListBegin(Thrift.Type.STRUCT, this.commands.length);
	      for (var iter94 in this.commands) {
	        if (this.commands.hasOwnProperty(iter94)) {
	          iter94 = this.commands[iter94];
	          iter94.write(output);
	        }
	      }
	      output.writeListEnd();
	      output.writeFieldEnd();
	    }
	    if (this.timing !== null && this.timing !== undefined) {
	      output.writeFieldBegin('timing', Thrift.Type.STRUCT, 2);
	      this.timing.write(output);
	      output.writeFieldEnd();
	    }
	    if (this.errors !== null && this.errors !== undefined) {
	      output.writeFieldBegin('errors', Thrift.Type.LIST, 3);
	      output.writeListBegin(Thrift.Type.STRING, this.errors.length);
	      for (var iter95 in this.errors) {
	        if (this.errors.hasOwnProperty(iter95)) {
	          iter95 = this.errors[iter95];
	          output.writeString(iter95);
	        }
	      }
	      output.writeListEnd();
	      output.writeFieldEnd();
	    }
	    output.writeFieldStop();
	    output.writeStructEnd();
	    return;
	  };
	
	  module.exports.crouton_thrift = crouton_thrift;
	  module.exports.Thrift = {};
	})();

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = __webpack_require__(13).crouton_thrift;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _coerce = __webpack_require__(16);
	
	var coerce = _interopRequireWildcard(_coerce);
	
	var _constants = __webpack_require__(2);
	
	var constants = _interopRequireWildcard(_constants);
	
	var _platform_abstraction_layer = __webpack_require__(5);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	// eslint-disable-line camelcase
	
	var SpanImp = function () {
	    _createClass(SpanImp, [{
	        key: 'tracer',
	
	
	        // ---------------------------------------------------------------------- //
	        // OpenTracing Implementation
	        // ---------------------------------------------------------------------- //
	
	        value: function tracer() {
	            return this._tracer;
	        }
	    }, {
	        key: 'setOperationName',
	        value: function setOperationName(name) {
	            this._operation = name;
	        }
	    }, {
	        key: 'addTags',
	        value: function addTags(keyValuePairs) {
	            for (var key in keyValuePairs) {
	                // NB: Older versions of IE don't support `String.prototype.startsWith()`
	                if (key.substr(0, constants.JOIN_ID_PREFIX.length) === constants.JOIN_ID_PREFIX) {
	                    this.setJoinID(key, keyValuePairs[key]);
	                } else {
	                    this._tags[key] = keyValuePairs[key];
	                }
	            }
	        }
	    }, {
	        key: 'setBaggageItem',
	        value: function setBaggageItem(key, value) {
	            this._baggage[key] = value;
	        }
	    }, {
	        key: 'getBaggageItem',
	        value: function getBaggageItem(key) {
	            return this._baggage[key];
	        }
	
	        /**
	         * The set of OpenTracing fields is:
	         * - 'event'
	         * - 'timestamp'
	         * - 'payload'
	         */
	        // Log record specified by fields
	
	    }, {
	        key: 'log',
	        value: function log(fields) {
	            var rec = this._tracer.log().span(this._guid).level(constants.LOG_STRING_TO_LEVEL[fields.level] || constants.LOG_INFO);
	
	            //
	            // OpenTracing attributes
	            //
	            if (fields.event !== undefined) {
	                rec.name(fields.event);
	            }
	            if (fields.timestamp !== undefined) {
	                // The incoming 'timestamp' field is in milliseconds. The internal
	                // timestamp is in microseconds.
	                rec.timestamp(fields.timestamp * 1000);
	            }
	            if (fields.payload !== undefined) {
	                rec.payload(fields.payload);
	            }
	
	            //
	            // LightStep-specific attributes
	            //
	            if (fields.message !== undefined) {
	                rec.message(fields.message);
	            }
	            if (fields.timestamp_micros !== undefined) {
	                rec.timestamp(fields.timestamp_micros);
	            }
	            rec.end();
	        }
	    }, {
	        key: 'finish',
	        value: function finish(finishTime) {
	            return this.end(finishTime);
	        }
	
	        // ---------------------------------------------------------------------- //
	        // Private methods
	        // ---------------------------------------------------------------------- //
	
	    }]);
	
	    function SpanImp(tracer) {
	        _classCallCheck(this, SpanImp);
	
	        console.assert(typeof tracer === 'object', 'Invalid runtime'); // eslint-disable-line no-console
	
	        this._tracer = tracer;
	        this._ended = false;
	
	        this._guid = tracer._platform.generateUUID();
	        this._traceGUID = tracer.generateTraceGUIDForRootSpan();
	        this._operation = '';
	        this._tags = {};
	        this._baggage = {};
	        this._joinIDs = {};
	        this._beginMicros = tracer._platform.nowMicros();
	        this._endMicros = 0;
	        this._errorFlag = false;
	    }
	
	    // ---------------------------------------------------------------------- //
	    // LightStep Extensions
	    // ---------------------------------------------------------------------- //
	
	    _createClass(SpanImp, [{
	        key: 'getOperationName',
	        value: function getOperationName() {
	            return this._operation;
	        }
	
	        // Getter only. The GUID is immutable once set internally.
	
	    }, {
	        key: 'guid',
	        value: function guid() {
	            return this._guid;
	        }
	    }, {
	        key: 'traceGUID',
	        value: function traceGUID() {
	            return this._traceGUID;
	        }
	    }, {
	        key: 'parentGUID',
	        value: function parentGUID() {
	            return this._tags.parent_span_guid;
	        }
	    }, {
	        key: 'setParentGUID',
	        value: function setParentGUID(guid) {
	            this._tags.parent_span_guid = coerce.toString(guid);
	        }
	
	        /**
	         * Returns a URL to the trace containing this span.
	         *
	         * Unlike most methods, it *is* safe to call this method after `finish()`.
	         *
	         * @return {string} the absolute URL for the span
	         */
	
	    }, {
	        key: 'generateTraceURL',
	        value: function generateTraceURL() {
	            var micros = void 0;
	            if (this._beginMicros > 0 && this._endMicros > 0) {
	                micros = Math.floor((this._beginMicros + this._endMicros) / 2);
	            } else {
	                micros = this._tracer._platform.nowMicros();
	            }
	
	            var urlPrefix = constants.LIGHTSTEP_APP_URL_PREFIX;
	            var accessToken = encodeURIComponent(this._tracer.options().access_token);
	            var guid = encodeURIComponent(this.guid());
	            return urlPrefix + '/' + accessToken + '/trace?span_guid=' + guid + '&at_micros=' + micros;
	        }
	    }, {
	        key: 'getTags',
	        value: function getTags() {
	            return this._tags;
	        }
	    }, {
	        key: 'getBaggage',
	        value: function getBaggage() {
	            return this._baggage;
	        }
	    }, {
	        key: 'setFields',
	        value: function setFields(fields) {
	            for (var key in fields) {
	                var value = fields[key];
	                switch (key) {
	                    case 'operationName':
	                        this._operation = value;
	                        break;
	                    case 'startTime':
	                        // startTime is in milliseconds
	                        this._beginMicros = value * 1000;
	                        break;
	                    case 'tags':
	                        this.addTags(value);
	                        break;
	                    case 'span_guid':
	                        this._guid = coerce.toString(value);
	                        break;
	                    case 'trace_guid':
	                        this._traceGUID = coerce.toString(value);
	                        break;
	                    case 'parent':
	                        if (value) {
	                            this.parent(value.imp());
	                        }
	                        break;
	                    case 'parent_guid':
	                        this.setParentGUID(value);
	                        break;
	                    default:
	                        this._tracer._warn('Ignoring unknown field ' + key);
	                        break;
	                }
	            }
	        }
	
	        // TODO: deprecate this and combine with setFields
	
	    }, {
	        key: 'modify',
	        value: function modify(fields) {
	            if (!fields) {
	                return this;
	            }
	            if (fields.begin_micros) {
	                this._beginMicros = fields.begin_micros;
	            }
	            if (fields.end_micros) {
	                this._endMicros = fields.end_micros;
	            }
	            return this;
	        }
	    }, {
	        key: 'setJoinID',
	        value: function setJoinID(key, value) {
	            this._tags[key] = value;
	            this._joinIDs[key] = true;
	        }
	    }, {
	        key: 'parent',
	        value: function parent(parentSpan) {
	            if (!parentSpan) {
	                return;
	            }
	            this.setParentGUID(parentSpan.guid());
	            this._traceGUID = parentSpan.traceGUID();
	        }
	    }, {
	        key: 'span',
	        value: function span(operation) {
	            var child = new SpanImp(this._tracer);
	            child.operation(operation);
	
	            // TODO: what is the expected behavior on OpenTracing tags on
	            // child spans? The legacy Traceguide behavior relies (?) on the
	            // child spans inheriting the join IDs of the parent.
	            for (var key in this._tags) {
	                child._tags[key] = this._tags[key];
	                if (this._joinIDs[key]) {
	                    child._joinIDs[key] = true;
	                }
	            }
	            child.parent(this);
	            return child;
	        }
	
	        /**
	         * Finishes the span.
	         *
	         * @param  {Number} finishTime
	         *         	Optional Unix timestamp in milliseconds setting an explicit
	         *         	finish time for the span.
	         */
	
	    }, {
	        key: 'end',
	        value: function end(finishTime) {
	            // Ensure a single span is not recorded multiple times
	            if (this._ended) {
	                return;
	            }
	            this._ended = true;
	
	            if (finishTime !== undefined) {
	                this._endMicros = finishTime * 1000;
	            }
	
	            // Do not set endMicros if it has already been set. This accounts for
	            // the case of a span that has had it's times set manually (i.e. allows
	            // for retroactively created spans that might not be possible to create
	            // in real-time).
	            if (this._endMicros === 0) {
	                this._endMicros = this._tracer._platform.nowMicros();
	            }
	            this._tracer._addSpanRecord(this._toThrift());
	        }
	
	        // Info log record with an optional payload
	
	    }, {
	        key: 'info',
	        value: function info(msg, payload) {
	            this._tracer.log().span(this._guid).level(constants.LOG_INFO).message(msg).payload(payload).end();
	        }
	    }, {
	        key: 'warn',
	        value: function warn(msg, payload) {
	            this._tracer.log().span(this._guid).level(constants.LOG_WARN).message(msg).payload(payload).end();
	        }
	    }, {
	        key: 'error',
	        value: function error(msg, payload) {
	            this._tracer.log().span(this._guid).level(constants.LOG_ERROR).message(msg).payload(payload).end();
	        }
	
	        // Special case to format exception information a little bit more nicely
	        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error
	
	    }, {
	        key: 'exception',
	        value: function exception(msg, _exception) {
	            if (_exception.message === undefined || _exception.stack === undefined) {
	                return this.error(msg, _exception);
	            }
	
	            var stack = _exception.stack.split('\n');
	            this._tracer.log().span(this._guid).level(constants.LOG_ERROR).message(msg).payload({
	                name: _exception.name,
	                message: _exception.message,
	                filename: _exception.filename,
	                line_number: _exception.lineNumber,
	                stack: stack
	            }).end();
	        }
	    }, {
	        key: 'fatal',
	        value: function fatal(msg, payload) {
	            this._tracer.log().span(this._guid).level(constants.LOG_FATAL).message(msg).payload(payload).end();
	        }
	    }, {
	        key: '_toThrift',
	        value: function _toThrift() {
	            // TODO: the backend understands join IDs and attributes.  The outer API
	            // understands trace context attributes and tags.  The mapping is a
	            // little confusing at the moment...
	
	            var joinIDs = [];
	            var attributes = [];
	            for (var key in this._tags) {
	                if (key in this._joinIDs) {
	                    this._addTagAsJoinID(joinIDs, key);
	                } else {
	                    attributes.push(new _platform_abstraction_layer.crouton_thrift.KeyValue({
	                        Key: coerce.toString(key),
	                        Value: coerce.toString(this._tags[key])
	                    }));
	                }
	            }
	
	            var record = new _platform_abstraction_layer.crouton_thrift.SpanRecord({
	                span_guid: this._guid,
	                trace_guid: this._traceGUID,
	                runtime_guid: this._tracer.guid(),
	                span_name: this._operation,
	                join_ids: joinIDs,
	                oldest_micros: this._beginMicros,
	                youngest_micros: this._endMicros,
	                attributes: attributes,
	                error_flag: this._errorFlag
	            });
	            return record;
	        }
	
	        // Helper to reduce duplicated code
	
	    }, {
	        key: '_addTagAsJoinID',
	        value: function _addTagAsJoinID(joinIDs, key) {
	            var value = this._tags[key];
	            if (value === undefined) {
	                return;
	            }
	            joinIDs.push(new _platform_abstraction_layer.crouton_thrift.TraceJoinId({
	                TraceKey: coerce.toString(key),
	                Value: coerce.toString(value)
	            }));
	        }
	    }]);
	
	    return SpanImp;
	}();

	exports.default = SpanImp;
	module.exports = exports['default'];

/***/ },
/* 16 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.toString = toString;
	exports.toNumber = toNumber;
	exports.toBoolean = toBoolean;
	function toString(value) {
	    return '' + value; // eslint-disable-line prefer-template
	}
	
	function toNumber(value) {
	    return Number(value);
	}
	
	function toBoolean(value) {
	    return !!value;
	}

/***/ },
/* 17 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Util = function () {
	    function Util() {
	        _classCallCheck(this, Util);
	    }
	
	    _createClass(Util, [{
	        key: "detachedTimeout",
	
	
	        // Similar to a regular setTimeout() call, but dereferences the timer so the
	        // program execution will not be held up by this timer.
	        value: function detachedTimeout(callback, delay) {
	            var timer = setTimeout(callback, delay);
	            if (timer.unref) {
	                timer.unref();
	            }
	            return timer;
	        }
	    }]);
	
	    return Util;
	}();
	
	exports.default = new Util();
	module.exports = exports['default'];

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _platform_abstraction_layer = __webpack_require__(5);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	// eslint-disable-line camelcase
	var constants = __webpack_require__(2);
	var coerce = __webpack_require__(16);
	
	// Facade on the thrift log data structure to make constructing log records more
	// convenient.
	
	var LogBuilder = function () {
	    function LogBuilder(runtime) {
	        _classCallCheck(this, LogBuilder);
	
	        this._runtime = runtime;
	        this._record = new _platform_abstraction_layer.crouton_thrift.LogRecord({
	            timestamp_micros: runtime._platform.nowMicros(),
	            runtime_guid: null,
	            span_guid: null,
	            stable_name: null,
	            message: null,
	            level: null,
	            thread_id: null,
	            filename: null,
	            line_number: null,
	            stack_frames: null,
	            payload_json: null,
	            error_flag: null
	        });
	    }
	
	    _createClass(LogBuilder, [{
	        key: 'record',
	        value: function record() {
	            return this._record;
	        }
	    }, {
	        key: 'end',
	        value: function end() {
	            this._runtime._addLogRecord(this._record);
	        }
	    }, {
	        key: 'timestamp',
	        value: function timestamp(micros) {
	            this._record.timestamp_micros = coerce.toNumber(micros);
	            return this;
	        }
	    }, {
	        key: 'message',
	        value: function message(msg) {
	            this._record.message = coerce.toString(msg);
	            return this;
	        }
	    }, {
	        key: 'level',
	        value: function level(num) {
	            this._record.level = constants.LOG_LEVEL_TO_STRING[num] || null;
	            if (num >= constants.LOG_ERROR) {
	                this.error(true);
	            }
	            return this;
	        }
	    }, {
	        key: 'span',
	        value: function span(guid) {
	            if (guid !== undefined) {
	                this._record.span_guid = coerce.toString(guid);
	            }
	            return this;
	        }
	    }, {
	        key: 'name',
	        value: function name(stableName) {
	            this._record.stable_name = coerce.toString(stableName);
	            return this;
	        }
	    }, {
	        key: 'error',
	        value: function error(flag) {
	            this._record.error_flag = coerce.toBoolean(flag);
	            return this;
	        }
	    }, {
	        key: 'payload',
	        value: function payload(data) {
	            if (data !== undefined) {
	                this._record.payload_json = this._encodePayload(data);
	            }
	            return this;
	        }
	    }, {
	        key: '_encodePayload',
	        value: function _encodePayload(data) {
	            var payloadJSON = null;
	            try {
	                payloadJSON = JSON.stringify(data);
	            } catch (_ignored) {
	                // TODO: this should log an internal warning that a payload could
	                // not be encoded as JSON.
	                return undefined;
	            }
	            return payloadJSON;
	        }
	    }]);
	
	    return LogBuilder;
	}();
	
	module.exports = LogBuilder;

/***/ },
/* 19 */
/***/ function(module, exports) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	// How many updates before a sample is considered old. This happens to
	// be one less than the number of samples in our buffer but that's
	// somewhat arbitrary.
	var kMaxOffsetAge = 7;
	
	var kStoredSamplesTTLMicros = 60 * 60 * 1000 * 1000; // 1 hour
	
	var ClockState = function () {
	    function ClockState(opts) {
	        _classCallCheck(this, ClockState);
	
	        this._nowMicros = opts.nowMicros;
	        this._localStoreGet = opts.localStoreGet;
	        this._localStoreSet = opts.localStoreSet;
	
	        // The last eight samples, computed from timing information in
	        // RPCs.
	        this._samples = [];
	        this._currentOffsetMicros = 0;
	
	        // How many updates since we've updated currentOffsetMicros.
	        this._currentOffsetAge = kMaxOffsetAge + 1;
	
	        // Try to load samples from the local store.
	        // Only use the data if it's recent.
	        var storedData = this._localStoreGet();
	        if (storedData && storedData.timestamp_micros && storedData.timestamp_micros > this._nowMicros() - kStoredSamplesTTLMicros) {
	            // Make sure there are no more than (kMaxOffsetAge+1) elements
	            this._samples = storedData.samples.slice(-(kMaxOffsetAge + 1));
	        }
	        // Update the current offset based on these data.
	        this.update();
	    }
	
	    // Add a new timing sample and update the offset.
	
	
	    _createClass(ClockState, [{
	        key: "addSample",
	        value: function addSample(originMicros, receiveMicros, transmitMicros, destinationMicros) {
	            var latestDelayMicros = Number.MAX_NUMBER;
	            var latestOffsetMicros = 0;
	            // Ensure that all of the data are valid before using them. If
	            // not, we'll push a {0, MAX} record into the queue.
	            if (originMicros > 0 && receiveMicros > 0 && transmitMicros > 0 && destinationMicros > 0) {
	                latestDelayMicros = destinationMicros - originMicros - (transmitMicros - receiveMicros);
	                latestOffsetMicros = (receiveMicros - originMicros + (transmitMicros - destinationMicros)) / 2;
	            }
	
	            // Discard the oldest sample and push the new one.
	            if (this._samples.length === kMaxOffsetAge + 1) {
	                this._samples.shift();
	            }
	            this._samples.push({
	                delayMicros: latestDelayMicros,
	                offsetMicros: latestOffsetMicros
	            });
	            this._currentOffsetAge++;
	
	            // Update the local store with this new sample.
	            this._localStoreSet({
	                timestamp_micros: this._nowMicros(),
	                samples: this._samples
	            });
	            this.update();
	        }
	
	        // Update the time offset based on the current samples.
	
	    }, {
	        key: "update",
	        value: function update() {
	            // This is simplified version of the clock filtering in Simple
	            // NTP. It ignores precision and dispersion (frequency error). In
	            // brief, it keeps the 8 (kMaxOffsetAge+1) most recent
	            // delay-offset pairs, and considers the offset with the smallest
	            // delay to be the best one. However, it only uses this new offset
	            // if the change (relative to the last offset) is small compared
	            // to the estimated error.
	            //
	            // See:
	            // https://tools.ietf.org/html/rfc5905#appendix-A.5.2
	            // http://books.google.com/books?id=pdTcJBfnbq8C
	            //   esp. section 3.5
	            // http://www.eecis.udel.edu/~mills/ntp/html/filter.html
	            // http://www.eecis.udel.edu/~mills/database/brief/algor/algor.pdf
	            // http://www.eecis.udel.edu/~mills/ntp/html/stats.html
	
	            // TODO: Consider huff-n'-puff if the delays are highly asymmetric.
	            // http://www.eecis.udel.edu/~mills/ntp/html/huffpuff.html
	
	            // Find the sample with the smallest delay; the corresponding
	            // offset is the "best" one.
	            var minDelayMicros = Number.MAX_VALUE;
	            var bestOffsetMicros = 0;
	            for (var key in this._samples) {
	                var sample = this._samples[key];
	                if (sample.delayMicros < minDelayMicros) {
	                    minDelayMicros = sample.delayMicros;
	                    bestOffsetMicros = sample.offsetMicros;
	                }
	            }
	
	            // No update.
	            if (bestOffsetMicros === this._currentOffsetMicros) {
	                return;
	            }
	
	            // Now compute the jitter, i.e. the error relative to the new
	            // offset were we to use it.
	            var jitter = 0;
	            for (var _key in this._samples) {
	                var _sample = this._samples[_key];
	                jitter += Math.pow(bestOffsetMicros - _sample.offsetMicros, 2);
	            }
	            jitter = Math.sqrt(jitter / this._samples.length);
	
	            // Ignore spikes: only use the new offset if the change is not too
	            // large... unless the current offset is too old. The "too old"
	            // condition is also triggered when update() is called from the
	            // constructor.
	            var kSGATE = 3; // See RFC 5905
	            if (this._currentOffsetAge > kMaxOffsetAge || Math.abs(this._currentOffsetMicros - bestOffsetMicros) < kSGATE * jitter) {
	                this._currentOffsetMicros = bestOffsetMicros;
	                this._currentOffsetAge = 0;
	            }
	        }
	
	        // Returns the difference in microseconds between the server's clock
	        // and our clock. This should be added to any local timestamps before
	        // sending them to the server. Note that a negative offset means that
	        // the local clock is ahead of the server's.
	
	    }, {
	        key: "offsetMicros",
	        value: function offsetMicros() {
	            return Math.floor(this._currentOffsetMicros);
	        }
	
	        // Returns true if we've performed enough measurements to be confident
	        // in the current offset.
	
	    }, {
	        key: "isReady",
	        value: function isReady() {
	            return this._samples.length > 3;
	        }
	    }, {
	        key: "activeSampleCount",
	        value: function activeSampleCount() {
	            return this._samples.length;
	        }
	    }]);
	
	    return ClockState;
	}();
	
	module.exports = ClockState;

/***/ },
/* 20 */
/***/ function(module, exports) {

	module.exports = {
		"name": "lightstep-tracer",
		"version": "0.10.2",
		"main": "index.js",
		"engines": {
			"node": ">=0.12.0"
		},
		"scripts": {
			"thrift-browser": "node ./scripts/build_browser_thrift_lib.js",
			"thrift-node": "node ./scripts/build_node_thrift_lib.js",
			"webpack": "npm run thrift-browser && npm run thrift-node && npm run webpack-node-debug && npm run webpack-node-prod && npm run webpack-browser-debug && npm run webpack-browser-prod",
			"webpack-node-debug": "BUILD_PLATFORM=node BUILD_CONFIG=debug webpack --display-error-details",
			"webpack-node-prod": "BUILD_PLATFORM=node BUILD_CONFIG=prod webpack --display-error-details",
			"webpack-browser-debug": "BUILD_PLATFORM=browser BUILD_CONFIG=debug webpack --display-error-details",
			"webpack-browser-prod": "BUILD_PLATFORM=browser BUILD_CONFIG=prod webpack --display-error-details",
			"test": "rm -f test/results/*.json && node node_modules/mocha/bin/mocha -c test/unittest_node.js"
		},
		"license": "MIT",
		"repository": {
			"type": "git",
			"url": "http://github.com/lightstep/lightstep-tracer-javascript.git"
		},
		"dependencies": {
			"async": "^1.5.0",
			"eventemitter3": "^1.1.1",
			"source-map-support": "^0.3.3",
			"thrift": "0.9.2"
		},
		"devDependencies": {
			"babel-core": "^6.3.26",
			"babel-loader": "^6.2.0",
			"babel-plugin-add-module-exports": "^0.1.2",
			"babel-plugin-check-es2015-constants": "^6.7.2",
			"babel-plugin-transform-es2015-arrow-functions": "^6.5.2",
			"babel-plugin-transform-es2015-block-scoped-functions": "^6.6.5",
			"babel-plugin-transform-es2015-block-scoping": "^6.7.1",
			"babel-plugin-transform-es2015-classes": "^6.6.5",
			"babel-plugin-transform-es2015-computed-properties": "^6.6.5",
			"babel-plugin-transform-es2015-destructuring": "^6.6.5",
			"babel-plugin-transform-es2015-duplicate-keys": "^6.6.4",
			"babel-plugin-transform-es2015-literals": "^6.5.0",
			"babel-plugin-transform-es2015-modules-commonjs": "^6.7.4",
			"babel-plugin-transform-es2015-object-super": "^6.6.5",
			"babel-plugin-transform-es2015-parameters": "^6.7.0",
			"babel-plugin-transform-es2015-spread": "^6.6.5",
			"babel-plugin-transform-es2015-sticky-regex": "^6.5.0",
			"babel-plugin-transform-es2015-template-literals": "^6.6.5",
			"babel-plugin-transform-es2015-unicode-regex": "^6.5.0",
			"babel-polyfill": "^6.3.14",
			"babel-preset-es2015": "^6.3.13",
			"chai": "^3.4.1",
			"clone": "^1.0.2",
			"colors": "^1.1.2",
			"eslint": "^2.4.0",
			"eslint-config-airbnb": "^6.2.0",
			"eslint-plugin-react": "^4.2.3",
			"json-loader": "^0.5.4",
			"mocha": "^2.3.4",
			"opentracing": "^0.9.18",
			"shelljs": "^0.5.3",
			"sprintf-js": "^1.0.3",
			"underscore": "^1.8.3",
			"watch-trigger": "0.0.5",
			"webpack": "^1.12.9"
		}
	};

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var constants = __webpack_require__(2);
	
	var LogToConsole = function () {
	    function LogToConsole() {
	        _classCallCheck(this, LogToConsole);
	
	        this._enabled = false;
	        this._tracer = null;
	        this._optionsCb = this._handleOptions.bind(this);
	        this._logAddedCb = this._handleLogAdded.bind(this);
	    }
	
	    _createClass(LogToConsole, [{
	        key: 'name',
	        value: function name() {
	            return 'log_to_console';
	        }
	    }, {
	        key: 'addOptions',
	        value: function addOptions(tracerImp) {
	            tracerImp.addOption('log_to_console', {
	                type: 'bool',
	                defaultValue: false
	            });
	            tracerImp.on('options', this._optionsCb);
	        }
	    }, {
	        key: 'start',
	        value: function start(tracer, tracerImp) {
	            this._tracer = tracer;
	        }
	    }, {
	        key: 'stop',
	        value: function stop() {
	            this._tracer.imp().removeListener('options', this._optionsCb);
	        }
	    }, {
	        key: '_handleOptions',
	        value: function _handleOptions(modified, current, tracerImp) {
	            var enabled = current.log_to_console;
	            if (this._enabled === enabled) {
	                return;
	            }
	            this._enabled = enabled;
	            if (this._enabled) {
	                tracerImp.on('log_added', this._logAddedCb);
	            } else {
	                tracerImp.removeListener('log_added', this._logAddedCb);
	            }
	        }
	    }, {
	        key: '_handleLogAdded',
	        value: function _handleLogAdded(record) {
	            var level = constants.LOG_STRING_TO_LEVEL[record.level];
	            var message = record.message;
	
	            // Ignore records without a message (e.g. a stable_name log record)
	            if (!message) {
	                return;
	            }
	
	            var payload = record.payload_json;
	            if (payload) {
	                try {
	                    payload = JSON.parse(payload);
	                } catch (_ignored) {/* ignored */}
	            }
	
	            switch (level) {
	                case constants.LOG_ERROR:
	                case constants.LOG_FATAL:
	                    if (payload !== undefined) {
	                        console.error(message, payload); // eslint-disable-line no-console
	                    } else {
	                            console.error(message); // eslint-disable-line no-console
	                        }
	                    break;
	                case constants.LOG_WARN:
	                    if (payload !== undefined) {
	                        console.warn(message, payload); // eslint-disable-line no-console
	                    } else {
	                            console.warn(message); // eslint-disable-line no-console
	                        }
	                    break;
	                case constants.LOG_INFO:
	                default:
	                    if (payload !== undefined) {
	                        console.log(message, payload); // eslint-disable-line no-console
	                    } else {
	                            console.log(message); // eslint-disable-line no-console
	                        }
	                    break;
	            }
	        }
	    }]);
	
	    return LogToConsole;
	}();
	
	module.exports = new LogToConsole();

/***/ }
/******/ ])
});
;
//# sourceMappingURL=lightstep-tracer.js.map

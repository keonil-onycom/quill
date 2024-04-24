/*!
 * version: 1.2.1
 * Build time: 2024-04-23T08:49:35.092Z
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 61:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.IMQAAgent = void 0;
var IMQAConfig_1 = __webpack_require__(86);
var OnWeb_1 = __webpack_require__(134);
var IMQAAgent = /** @class */function () {
  function IMQAAgent(window) {
    if (window !== undefined) {
      this.config = new IMQAConfig_1.IMQAConfig(window);
    }
  }
  IMQAAgent.prototype.window = function () {
    return this.config.root_window;
  };
  Object.defineProperty(IMQAAgent.prototype, "config", {
    get: function get() {
      return this._config;
    },
    set: function set(value) {
      this._config = value;
    },
    enumerable: false,
    configurable: true
  });
  IMQAAgent.GetInstance = function (window) {
    if (!this.instance) {
      this.instance = new IMQAAgent(window);
    }
    return this.instance;
  };
  IMQAAgent.prototype.isConnect = function () {
    var _a, _b, _c, _d;
    var clientAgentCheck = (_b = (_a = this.window()) === null || _a === void 0 ? void 0 : _a.imqaClientConfig) === null || _b === void 0 ? void 0 : _b.imqaAgentUse;
    var clientProjectKeyCheck = (_d = (_c = this.window()) === null || _c === void 0 ? void 0 : _c.imqaClientConfig) === null || _d === void 0 ? void 0 : _d.projectKey;
    if (this.config.isDebug) {
      return true;
    }
    if (clientAgentCheck) {
      // Web 연결 확인
      if (typeof clientAgentCheck === 'boolean') {
        this.config.bridge_connected = true;
      } else {
        console.error('[IMQA Error] imqaAgentUse value is NOT a boolean');
        this.config.bridge_connected = false;
      }
      if (!clientProjectKeyCheck) {
        console.error('[IMQA Error] projectKey value is empty');
        this.config.bridge_connected = false;
      }
    }
    // SDK 브릿지 연결 여부 확인
    this.config.bridge_connected ? console.log("IMQA web Bridge", "connected") : console.log("IMQA web Bridge", "cannot connect");
    return this.config.bridge_connected;
  };
  IMQAAgent.prototype.send = function (data) {
    console.log("[IMQA Web Agent] - Send()", data);
    OnWeb_1.OnWeb.GetInstance().update(data);
  };
  IMQAAgent.prototype.sendError = function (data) {
    console.log("[IMQA Web Agent] - SendError()", data);
    OnWeb_1.OnWeb.GetInstance().update(data);
  };
  return IMQAAgent;
}();
exports.IMQAAgent = IMQAAgent;

/***/ }),

/***/ 305:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Header = void 0;
var Util_1 = __webpack_require__(410);
var IMQAAgent_1 = __webpack_require__(61);
var decode_1 = __webpack_require__(592);
var Header = /** @class */function () {
  function Header() {
    this.imqa_web_agent_version = 0;
    this.protocol = "";
    this.host = "";
    this.pathname = "";
    this.hash = "";
    this.screen_name = "";
    this.screen_alias = undefined;
    this.startTime = 0;
    this.webviewTxId = "";
    this.viewportSize = {
      width: 0,
      height: 0
    };
    this.viewportMeta = "";
    this.screen = {
      width: 0,
      height: 0
    };
  }
  Header.prototype.set = function (config) {
    var _a;
    var startTime = Math.floor(new Date().getTime());
    var _b = (0, Util_1.parseURL)(config.root_window.location.href),
      protocol = _b.protocol,
      host = _b.host,
      pathname = _b.pathname,
      search = _b.search;
    var locationList = IMQAAgent_1.IMQAAgent.GetInstance().config.root_window.location.pathname.split("/");
    this.imqa_web_agent_version = config.imqa_web_agent_version;
    this.protocol = protocol;
    this.host = host;
    this.pathname = (0, decode_1.decodeUrl)(config.customPathName || pathname);
    this.hash = (0, decode_1.decodeUrl)(config.root_window.location.hash);
    this.screen_name = (0, decode_1.decodeUrl)(config.root_window.location.href);
    this.screen_alias = config.customAliasName ? config.customAliasName : config.screen_alias;
    this.startTime = startTime;
    this.webviewTxId = config.root_window.webviewTxId;
    this.viewportSize = {
      width: config.root_window.innerWidth,
      height: config.root_window.innerHeight
    };
    this.viewportMeta = ((_a = document === null || document === void 0 ? void 0 : document.querySelector('meta[name="viewport"]')) === null || _a === void 0 ? void 0 : _a.getAttribute("content")) || "";
    this.screen = {
      width: window.screen.width,
      height: window.screen.height
    };
  };
  return Header;
}();
exports.Header = Header;

/***/ }),

/***/ 86:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.IMQAConfig = void 0;
var IMQAConfig = /** @class */function () {
  function IMQAConfig(window) {
    this.imqa_web_agent_version = 1; // Agent 버전( 숫자형으로 정수로만 변경 )
    this.bridge_connected = false; //기본값 false SDK에서 인지해서 수정해줌 (기본값 false)
    this.agentType = "web"; // agent 타입 web, webview (기본값 WEBVIEW)
    this.imqa_head_enable = true;
    this.imqa_xhr_enable = true;
    this.imqa_load_enable = true;
    this.isDebug = false;
    this.collectInitTime = 1000; // collectTime 초기수치
    this.SPACollectInitTime = 3000; // SPACollectTime 초기수치
    this.collectTime = this.collectInitTime; // collectTime 수치(기본값 초기수치)
    this.SPACollectTime = this.SPACollectInitTime; // SPACollectTime 수치(기본값 초기수치)
    this.SPARootDom = "#app"; // SPA에서 DOM이 변경될 root DOM 타겟
    this.onRenderDurationLimit = 50; // Render 데이터 수집시 duration 수치가 해당 수치 초과인경우만 수집
    this.customAliasName = null;
    this.customPathName = null;
    this.browser = null;
    this.browserVersion = null;
    this.resourceLimit = 30; // 수집할 리소스 개수 제한
    this.collectorHost = "121.0.136.27:3980";
    this.collectorUrl = "http://121.0.136.27:3980/api/web/upload";
    this.crashCollectorUrl = "http://121.0.136.27:3980/api/web/exception/upload";
    this.sessionUrl = "http://121.0.136.27:3980/api/web/session/upload";
    // web dump config data (AgentType.WEB 일 경우 설정)
    this.browserTxIdIntervalTime = 1800000; // web에서 TxID 변경주기(밀리초 단위 : 기본 30분)
    this.webIntervalTime = 3000; // 수집주기(3초마다 수집)
    this.package_name = "imqa.web";
    this.process_name = "imqa.web";
    this.projectKey = "";
    this.root_window = window;
  }
  return IMQAConfig;
}();
exports.IMQAConfig = IMQAConfig;

/***/ }),

/***/ 652:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.TransactionManager = void 0;
var uuid_1 = __webpack_require__(935);
var TransactionManager = /** @class */function () {
  function TransactionManager() {}
  /**
   * TxID
   * 사용자가 앱을 끌때까지 하나의 ID로 추적하기 위해 생성
   * @constructor
   */
  TransactionManager.GetTxID = function () {
    return this.TxID;
  };
  TransactionManager.GenerateTxID = function () {
    this.TxID = (0, uuid_1.v4)();
    return this.GetTxID();
  };
  /**
   * Web browser USER ID
   * 사용자가 브라우저에서 접근하면 브라우저에 해당 아이디값이 저장되어 동일 브라우저인지 아닌지 파악가능
   * @constructor
   */
  TransactionManager.GetUserID = function () {
    return this.UserID;
  };
  TransactionManager.GenerateUserID = function () {
    this.UserID = (0, uuid_1.v4)();
    return this.GetUserID();
  };
  /**
   * onRender Script ID
   * Data에서 추적한 measure에 ID를 부여
   * @constructor
   */
  TransactionManager.GetScriptID = function () {
    return this.ScriptID;
  };
  TransactionManager.GenerateScriptID = function () {
    this.ScriptID = (0, uuid_1.v4)();
    return this.GetScriptID();
  };
  /**
   * Browser tx-id ID
   * 브라우저 localstorage의 tx-id
   * static 웹에서 행동분석 아이디를 부여하기 위해 만듦
   * @constructor
   */
  TransactionManager.GetBrowserTxID = function () {
    var webview_tx_id = localStorage.getItem("IMQA-Browser-Tx-Id");
    if (!webview_tx_id) return localStorage.getItem("IMQA-Browser-Prev-Tx-Id");
    return localStorage.getItem("IMQA-Browser-Tx-Id");
  };
  TransactionManager.GenerateBrowserTxID = function () {
    this.ProcessID = (0, uuid_1.v4)();
    var webview_tx_id = localStorage.getItem("IMQA-Browser-Tx-Id");
    if (!webview_tx_id) localStorage.setItem("IMQA-Browser-Tx-Id", this.ProcessID);
    return this.GetBrowserTxID();
  };
  return TransactionManager;
}();
exports.TransactionManager = TransactionManager;

/***/ }),

/***/ 533:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Crash = void 0;
var TransactionManager_1 = __webpack_require__(652);
var userPlatform_1 = __webpack_require__(398);
var WebBridge_1 = __webpack_require__(548);
var CrashWindowManager_1 = __webpack_require__(246);
var Crash = /** @class */function () {
  function Crash(crashData) {
    this.type = "web";
    this.exception = crashData;
  }
  Crash.prototype.init = function (config) {
    var ua = new userPlatform_1.userPlatform();
    // 모바일 더미 데이터
    this.boottime = new Date().valueOf();
    this.instance = {
      id: new Date().valueOf()
    };
    this.custom_user_id = {
      id: "",
      name: "",
      email: ""
    };
    this.version = "1.0.0";
    this.sdk_name = "1.0.0";
    this.core_version = "1.0.0";
    this.uuid = TransactionManager_1.TransactionManager.GetBrowserTxID();
    this.osversion = ua.getOs(config.root_window.navigator.userAgent);
    this.appversion = "1.0.0";
    this.kernelversion = "1.0.0";
    this.device = ua.getDevice(config.root_window.navigator.userAgent);
    this.manufacturer = "";
    var now = new Date();
    this.datetime = "".concat(now.getUTCFullYear(), "-").concat(now.getUTCMonth() + 1, "-").concat(now.getUTCDate(), " ").concat(now.getUTCHours(), ":").concat(now.getUTCMinutes(), ":").concat(now.getUTCSeconds());
    this.apikey = config.projectKey;
    this.device_id = TransactionManager_1.TransactionManager.GetBrowserTxID();
    this.locale = "";
    this.country = "";
    this.carrier_name = "";
    this.build_id = "";
    this.version_code = "1";
    this.version_name = "1.0.0";
    this.architecture = "";
    this.rooted = 0;
    this.sysmemlow = 0;
    this.xdpi = 0;
    this.ydpi = 0;
    this.console_log = {
      data: ""
    };
    this.device_info = CrashWindowManager_1.CrashWindowManager.DeviceInfoData(config);
    this.send();
  };
  Crash.prototype.send = function () {
    var data = {
      body: this
    };
    new WebBridge_1.WebBridge().sendCrash(data)["catch"](function () {
      console.error("[Error]::IMQA Agent Crash Send Error");
    });
    console.log("[Crash]::::", data);
  };
  return Crash;
}();
exports.Crash = Crash;

/***/ }),

/***/ 249:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.CrashBody = void 0;
var decode_1 = __webpack_require__(592);
var CrashBody = /** @class */function () {
  /**
   * WebCrash 생성
   * @param message 사용자가 만든 new Error의 메세지 네임
   * @param file error가 생성된 파일
   * @param line error line
   * @param column error column
   * @param errorObj error object로 name과 stack(에러스택) 포함
   * @param screenName error가 발생된 url
   * @param webviewTxId error가 발생된 화면 ID
   */
  function CrashBody(message, file, line, column, errorObj, screenName, webviewTxId) {
    this.errorname = message;
    this.file = (0, decode_1.decodeUrl)(file);
    this.linenum = line;
    this.column = column;
    this.crash_callstack = (0, decode_1.decodeUrl)(errorObj.stack);
    this.lastactivity = (0, decode_1.decodeUrl)(screenName);
    this.errorclassname = errorObj.name;
    this.webviewTxId = webviewTxId;
    // 모바일 더미 데이터
    this.tag = "";
    this.rank = 0;
    this.gpson = false;
    this.wifion = false;
    this.mobileon = false;
    this.scrwidth = 0;
    this.scrheight = 0;
    this.batterylevel = 0;
    this.availsdcard = false;
    this.rooted = 0;
    this.xdpi = 0;
    this.ydpi = 0;
    this.scrorientation = 0;
    this.cpuusage = 0;
    this.appmemtotal = 0;
    this.appmemfree = 0;
    this.appmemmax = 0;
    this.appmemalloc = 0;
    this.sysmemlow = 0;
    this.eventpaths = [];
    this.custom_key = [];
    this.custom_log = [];
  }
  return CrashBody;
}();
exports.CrashBody = CrashBody;

/***/ }),

/***/ 641:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.CrashSession = void 0;
var TransactionManager_1 = __webpack_require__(652);
var userPlatform_1 = __webpack_require__(398);
var WebBridge_1 = __webpack_require__(548);
var CrashWindowManager_1 = __webpack_require__(246);
var CrashSession = /** @class */function () {
  function CrashSession() {
    this.type = "session";
  }
  CrashSession.prototype.init = function (config) {
    var ua = new userPlatform_1.userPlatform();
    // 모바일 더미 데이터
    this.boottime = new Date().valueOf();
    this.instance = {
      id: new Date().valueOf()
    };
    this.custom_user_id = {
      id: "",
      name: "",
      email: ""
    };
    this.version = "1.0.0";
    this.sdk_name = "1.0.0";
    this.core_version = "1.0.0";
    this.uuid = TransactionManager_1.TransactionManager.GetBrowserTxID();
    this.osversion = ua.getOs(config.root_window.navigator.userAgent);
    this.appversion = "1.0.0";
    this.kernelversion = "1.0.0";
    this.device = ua.getDevice(config.root_window.navigator.userAgent);
    this.manufacturer = "";
    var now = new Date();
    this.datetime = "".concat(now.getUTCFullYear(), "-").concat(now.getUTCMonth() + 1, "-").concat(now.getUTCDate(), " ").concat(now.getUTCHours(), ":").concat(now.getUTCMinutes(), ":").concat(now.getUTCSeconds());
    this.apikey = config.projectKey;
    this.device_id = TransactionManager_1.TransactionManager.GetBrowserTxID();
    this.locale = "";
    this.country = "";
    this.carrier_name = "";
    this.stage = "";
    this.build_id = "";
    this.version_code = "1";
    this.version_name = "1.0.0";
    this.architecture = "";
    this.rooted = 0;
    this.sysmemlow = 0;
    this.xdpi = 0;
    this.ydpi = 0;
    this.device_info = CrashWindowManager_1.CrashWindowManager.DeviceInfoData(config);
    this.send();
  };
  CrashSession.prototype.send = function () {
    var data = {
      body: this
    };
    new WebBridge_1.WebBridge().sendSession(data)["catch"](function () {
      console.error("[Error]::IMQA Agent Crash Session Send Error");
    });
  };
  return CrashSession;
}();
exports.CrashSession = CrashSession;

/***/ }),

/***/ 246:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



var __assign = this && this.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.CrashWindowManager = void 0;
var Crash_1 = __webpack_require__(533);
var IMQAAgent_1 = __webpack_require__(61);
var TransactionManager_1 = __webpack_require__(652);
var CrashBody_1 = __webpack_require__(249);
var CrashSession_1 = __webpack_require__(641);
var userPlatform_1 = __webpack_require__(398);
var CrashWindowManager = /** @class */function () {
  function CrashWindowManager() {}
  CrashWindowManager.prototype.init = function (config) {
    var session = new CrashSession_1.CrashSession();
    session.init(config);
    window.onerror = function (message, file, line, column, errorObj) {
      return CrashWindowManager.IMQAErrorHandler(message, file, line, column, errorObj, config);
    };
    window['IMQAAgent'] = __assign(__assign({}, window['IMQAAgent']), {
      onError: function onError(message, file, line, column, errorObj) {
        CrashWindowManager.IMQAErrorHandler(message, file, line, column, errorObj, config);
      },
      onVueError: function onVueError(stack) {
        var message = stack.split('\n')[0].trim();
        var file = stack.match(/at\s.*\(([^)]+)\)/)[1].split(":")[0].trim();
        var line = parseInt(stack.match(/at\s.*\(([^)]+)\)/)[1].split(":")[1].trim()) || 0;
        var column = parseInt(stack.match(/at\s.*\(([^)]+)\)/)[1].split(":")[2].trim()) || 0;
        CrashWindowManager.IMQAErrorHandler(message, file, line, column, {
          message: "",
          'stack': stack,
          'name': message
        }, config);
      }
    });
  };
  CrashWindowManager.IMQAErrorHandler = function (message, file, line, column, errorObj, config) {
    var screenName = IMQAAgent_1.IMQAAgent.GetInstance(window).config.root_window.location.href || "";
    var webviewTxId = TransactionManager_1.TransactionManager.GetTxID();
    var crashBody = new CrashBody_1.CrashBody(message, file, line, column, errorObj, screenName, webviewTxId);
    var crash = new Crash_1.Crash(crashBody);
    crash.init(config);
    return false; // so you still log errors into console
  };
  CrashWindowManager.DeviceInfoData = function (config) {
    var ua = new userPlatform_1.userPlatform();
    return {
      os: ua.getOs(config.root_window.navigator.userAgent),
      browser: ua.getBrowser(config.root_window.navigator.userAgent),
      browserVersion: ua.getBrowserVersion(config.root_window.navigator.userAgent),
      app: "1.0.0",
      brand: config.root_window.navigator.vendor,
      carrier: "-",
      ip: "-",
      location: {
        code: "",
        country_name: ""
      },
      city: {
        code: "",
        city_name: ""
      },
      userAgent: config.root_window.navigator.userAgent
    };
  };
  return CrashWindowManager;
}();
exports.CrashWindowManager = CrashWindowManager;

/***/ }),

/***/ 261:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



var __assign = this && this.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.main = void 0;
var IMQAAgent_1 = __webpack_require__(61);
var CrashWindowManager_1 = __webpack_require__(246);
var PerformanceObserverManager_1 = __webpack_require__(362);
var DomOnLoad_1 = __webpack_require__(681);
var XHRInterceptor_1 = __webpack_require__(306);
var XHRManager_1 = __webpack_require__(753);
var OnWeb_1 = __webpack_require__(134);
var OnRender_1 = __webpack_require__(989);
var TransactionManager_1 = __webpack_require__(652);
var AjaxInterceptor_1 = __webpack_require__(698);
var onSPAManager_1 = __webpack_require__(243);
function main(window) {
  console.log("%cIMQA WEB AGENT", "color:#736efe; font-size:30px; font-weight:bold; font-style:italic;");
  // BridgeConnector 연결확인
  var agent = IMQAAgent_1.IMQAAgent.GetInstance(window);
  // 동적 클라이언트 세팅
  var clientConfig = window.imqaClientConfig;
  if (clientConfig) {
    var connected = clientConfig.imqaAgentUse;
    agent.config = __assign(__assign({}, agent.config), {
      projectKey: clientConfig.projectKey,
      browserTxIdIntervalTime: clientConfig.browserTxIdIntervalTime || agent.config.browserTxIdIntervalTime,
      SPARootDom: (clientConfig === null || clientConfig === void 0 ? void 0 : clientConfig.SPARootDom) || agent.config.SPARootDom,
      SPACollectInitTime: (clientConfig === null || clientConfig === void 0 ? void 0 : clientConfig.SPACollectInitTime) || agent.config.SPACollectInitTime,
      SPACollectTime: (clientConfig === null || clientConfig === void 0 ? void 0 : clientConfig.SPACollectInitTime) || agent.config.SPACollectTime,
      onRenderDurationLimit: (clientConfig === null || clientConfig === void 0 ? void 0 : clientConfig.onRenderDurationLimit) === 0 ? 0 : clientConfig.onRenderDurationLimit || agent.config.onRenderDurationLimit,
      resourceLimit: typeof (clientConfig === null || clientConfig === void 0 ? void 0 : clientConfig.resourceLimit) === "number" ? (clientConfig === null || clientConfig === void 0 ? void 0 : clientConfig.resourceLimit) >= 0 ? clientConfig === null || clientConfig === void 0 ? void 0 : clientConfig.resourceLimit : agent.config.resourceLimit : agent.config.resourceLimit,
      bridge_connected: connected
    });
  }
  var config = agent.config;
  // Web Data 프로세스ID, UserID 생성
  TransactionManager_1.TransactionManager.GenerateBrowserTxID();
  TransactionManager_1.TransactionManager.GenerateUserID();
  if (!agent.isConnect()) return;
  TransactionManager_1.TransactionManager.GenerateTxID();
  new AjaxInterceptor_1.AjaxInterceptor().init(); //jquery major version 1에서만 동작함
  new XHRInterceptor_1.XHRInterceptor();
  new XHRManager_1.XHRManager();
  var POM = PerformanceObserverManager_1.PerformanceObserverManager.GetInstance();
  var DOMOnLoad = new DomOnLoad_1.DomOnLoad();
  DOMOnLoad.init(config);
  var SPAManager = new onSPAManager_1.onSPAManager();
  SPAManager.init(config);
  var DOMOnRender = new OnRender_1.OnRender();
  DOMOnRender.init(config);
  POM.subscribe(DOMOnLoad);
  POM.subscribe(DOMOnRender);
  var webCrash = new CrashWindowManager_1.CrashWindowManager();
  webCrash.init(config);
  OnWeb_1.OnWeb.GetInstance().init(config);
  OnWeb_1.OnWeb.GetInstance().create();
}
exports.main = main;
window["IMQAWebMain"] = main;

/***/ }),

/***/ 2:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.MutationObserverManager = void 0;
var IMQAAgent_1 = __webpack_require__(61);
var MutationObserverManager = /** @class */function () {
  function MutationObserverManager() {
    this.dataList = [];
    this.IMQAConfig = IMQAAgent_1.IMQAAgent.GetInstance().config;
  }
  /**
   * MutationObserverManger 인스턴스 불러오기
   * @constructor
   */
  MutationObserverManager.GetInstance = function () {
    // PerformanceObserverManager의 instance가 없으면 생성
    if (!MutationObserverManager.instance) {
      MutationObserverManager.instance = new MutationObserverManager();
    }
    // PerformanceObserverManager의 performanceObserver 없으면 생성
    if (!this.mutationObserver) {
      MutationObserverManager.instance.init();
    }
    return MutationObserverManager.instance;
  };
  MutationObserverManager.prototype.init = function () {
    var _this = this;
    if (!IMQAAgent_1.IMQAAgent.GetInstance().config.SPARootDom) {
      return;
    } else if (typeof IMQAAgent_1.IMQAAgent.GetInstance().config.SPARootDom !== "string") {
      console.error("[IMQA Agent Error] IMQA Config SPARootDom type not string");
      return;
    }
    var targetNode = document.querySelector(IMQAAgent_1.IMQAAgent.GetInstance().config.SPARootDom);
    try {
      MutationObserverManager.mutationObserver = new MutationObserver(function (mutationList) {
        mutationList.forEach(function (mutation) {
          _this.notify(mutation);
        });
      });
      var observerOptions = {
        childList: true
      };
      // MutationObserverManager observe options
      MutationObserverManager.mutationObserver.observe(targetNode, observerOptions);
    } catch (e) {
      console.error("[IMQA Agent Error] SPARootDom is set up incorrectly");
    }
  };
  /**
   * DataList에 subscriber 등록
   * @param subscriber
   */
  MutationObserverManager.prototype.subscribe = function (subscriber) {
    this.dataList.push(subscriber);
  };
  /**
   * DataList에 있는 subscriber 제거
   * @param subscriber
   */
  MutationObserverManager.prototype.unsubscribe = function (subscriber) {
    this.dataList = this.dataList.filter(function (registedSubscriber) {
      return registedSubscriber !== subscriber;
    });
  };
  /**
   * DataList에 있는 subscriber에 entry 데이터 전파
   * @param entry
   */
  MutationObserverManager.prototype.notify = function (entry) {
    this.dataList.forEach(function (subscriber) {
      return subscriber.update(entry);
    });
  };
  return MutationObserverManager;
}();
exports.MutationObserverManager = MutationObserverManager;

/***/ }),

/***/ 125:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.OnLoad = void 0;
var Header_1 = __webpack_require__(305);
var OnLoadBody_1 = __webpack_require__(145);
var TransactionManager_1 = __webpack_require__(652);
var OnLoadManager_1 = __webpack_require__(981);
var IMQAAgent_1 = __webpack_require__(61);
var OnLoad = /** @class */function () {
  function OnLoad() {
    this.header = new Header_1.Header();
    this.body = new OnLoadBody_1.OnLoadBody();
    this.startTime = 0;
    this.endTime = 0;
  }
  OnLoad.prototype.init = function (config) {
    this.startTime = new Date().valueOf();
    this.header.set(config);
    this.header.webviewTxId = TransactionManager_1.TransactionManager.GetTxID();
    this.onLoadManager = new OnLoadManager_1.OnLoadManager(this);
    this.onLoadManager.init();
  };
  OnLoad.prototype.create = function () {};
  OnLoad.prototype.finish = function () {
    this.endTime = this.onLoadManager.getEndTime();
    var data = {
      header: this.header,
      body: this.body,
      startTime: this.startTime,
      endTime: this.endTime
    };
    IMQAAgent_1.IMQAAgent.GetInstance().send(data);
  };
  OnLoad.prototype.update = function (entry) {
    // onLoadManager가 body에 맞게 데이터 변경
    this.onLoadManager.pushEntry(entry);
    this.body = this.onLoadManager.getBody();
  };
  return OnLoad;
}();
exports.OnLoad = OnLoad;

/***/ }),

/***/ 145:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.OnLoadBody = void 0;
var OnLoadBody = /** @class */function () {
  function OnLoadBody() {
    this.type = "onload";
    this.location_data = {
      pathname: "",
      host: "",
      protocol: "",
      startTime: 0,
      endTime: 0,
      takeTime: 0,
      domainLookupTime: 0,
      domTime: 0,
      responseTime: 0
    };
    this.duration = 0;
    this.timing = {
      total: 0,
      wait: 0,
      server: 0,
      network: 0,
      dom: 0,
      loading: 0,
      content: 0
    };
    this.entries = [];
    this.events = [];
  }
  return OnLoadBody;
}();
exports.OnLoadBody = OnLoadBody;

/***/ }),

/***/ 981:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.OnLoadManager = void 0;
// BODY - LOCATION_DATA 데이터 넣는 함수
var Util_1 = __webpack_require__(410);
var IMQAAgent_1 = __webpack_require__(61);
var decode_1 = __webpack_require__(592);
var OnLoadManager = /** @class */function () {
  function OnLoadManager(onLoad) {
    this.IMQAConfig = IMQAAgent_1.IMQAAgent.GetInstance().config;
    this.onLoad = onLoad;
    this.onLoadBody = this.onLoad.body;
  }
  OnLoadManager.prototype.init = function () {
    this.onLoadBody.location_data = this.getOnloadLocationDataWithLowVersion(window.performance.timing);
    this.onLoadBody.duration = this.getOnloadDurationWithLowVersion(window.performance.timing);
    this.onLoadBody.timing = this.getOnloadTimingWithLowVersion(window.performance.timing);
    this.onDOMContentLoaded();
    this.onLoaded();
  };
  OnLoadManager.prototype.onDOMContentLoaded = function () {
    var _this = this;
    window.addEventListener("DOMContentLoaded", function (event) {
      _this.onLoadBody.events.push({
        name: "dom-content-loaded",
        time: event.timeStamp || 0
      });
    });
  };
  OnLoadManager.prototype.onLoaded = function () {
    var _this = this;
    window.addEventListener("load", function (event) {
      _this.endTime = new Date().valueOf();
      setTimeout(function () {
        _this.onLoad.finish();
      }, _this.IMQAConfig.collectTime);
    });
  };
  OnLoadManager.prototype.getEndTime = function () {
    return this.endTime;
  };
  OnLoadManager.prototype.getBody = function () {
    return this.onLoadBody;
  };
  OnLoadManager.prototype.pushEntry = function (entry, timeStamp) {
    if (timeStamp === void 0) {
      timeStamp = 0;
    }
    switch (entry.constructor.name) {
      case "PerformanceNavigationTiming":
        this.onLoadBody.location_data = this.getOnloadLocationData(entry);
        this.onLoadBody.duration = this.getOnloadDuration(entry);
        this.onLoadBody.timing = this.getOnloadTiming(entry);
        break;
      case "PerformanceResourceTiming":
        if (entry.initiatorType === "xmlhttprequest" && entry.name.includes(IMQAAgent_1.IMQAAgent.GetInstance().config.collectorHost)) break;
        this.onLoadBody.entries.push(this.getNetworkEntries(entry, timeStamp));
        break;
      case "PerformancePaintTiming":
      case "PerformanceEventTiming":
        // BODY - EVENT 데이터 push
        this.onLoadBody.events.push(this.getEventData(entry));
        break;
      default:
        break;
    }
  };
  OnLoadManager.prototype.getOnloadLocationData = function (navigation) {
    var startTime = new Date().valueOf();
    var _a = (0, Util_1.parseURL)(navigation.name),
      protocol = _a.protocol,
      host = _a.host,
      pathname = _a.pathname;
    return {
      pathname: (0, decode_1.decodeUrl)(pathname),
      host: host,
      protocol: protocol,
      startTime: startTime,
      endTime: Math.abs(startTime + Math.floor(navigation.loadEventEnd)),
      takeTime: Math.abs(navigation.loadEventEnd - navigation.redirectStart),
      domainLookupTime: Math.abs(navigation.domainLookupEnd - navigation.domainLookupStart),
      domTime: Math.abs(navigation.domComplete - navigation.domContentLoadedEventStart),
      responseTime: Math.abs(navigation.responseEnd - navigation.responseStart)
    };
  };
  // BODY - DURATION 데이터 넣는 함수
  OnLoadManager.prototype.getOnloadDuration = function (navigation) {
    return Math.abs(this.getLoadEndTime(navigation) - this.getLoadStartTime(navigation));
  };
  // BODY - TIMING 데이터 넣는 함수
  OnLoadManager.prototype.getOnloadTiming = function (navigation) {
    return {
      // on load 전체
      total: Math.abs(navigation.loadEventEnd - navigation.redirectStart),
      // 대기
      wait: Math.abs(navigation.domainLookupStart - navigation.redirectStart),
      // 서버
      server: Math.abs(navigation.responseEnd - navigation.connectEnd),
      // 네트워크
      network: Math.abs(navigation.connectEnd - navigation.domainLookupStart),
      // 돔
      dom: Math.abs(navigation.domContentLoadedEventEnd - navigation.responseEnd),
      // 로딩
      loading: Math.abs(navigation.domComplete - navigation.domContentLoadedEventEnd),
      // 콘텐츠 다운로드
      content: Math.abs(navigation.loadEventEnd - navigation.loadEventStart)
    };
  };
  // BODY - ENTRIES 데이터 넣는 함수
  OnLoadManager.prototype.getNetworkEntries = function (entry, timeStamp) {
    // let url = new URL(entry.name);
    var _a = (0, Util_1.parseURL)(entry.name),
      protocol = _a.protocol,
      host = _a.host,
      pathname = _a.pathname,
      search = _a.search;
    return {
      protocol: protocol,
      host: host,
      pathname: (0, decode_1.decodeUrl)(pathname),
      parmas: search,
      resource_type: entry.initiatorType,
      start_time: Math.abs(entry.startTime - timeStamp),
      // xxxStart, xxxEnd 는 하나가 0이 나오면 다른 하나도 0인 경향이 있음. (response쪽 제외)
      // 반대로 하나가 정상 값이면, 다른 하나도 정상 값임.
      timing: {
        wating: Math.abs(entry.redirectStart - entry.startTime),
        redirect: Math.abs(entry.redirectEnd - entry.redirectStart),
        // timeline상 fetchStart 후에
        // 차례대로 domainLookup, connect, request, response 과정이 있다.
        // 하지만 responseEnd를 제외한 나머지 지표들은 값이 0이거나 똑같을 수 있다.
        // 위 지표들이 0일 때, 단순히 빼버리면 음수값이 나오므로
        // fetch 구간의 end 기준을 늘려주었다.
        fetch: Math.abs(this.getFetchEndTime(entry) - entry.fetchStart),
        domainlookup: Math.abs(entry.domainLookupEnd - entry.domainLookupStart),
        connect: Math.abs(entry.connectEnd - entry.connectStart),
        request_sent: Math.abs(entry.responseStart - entry.requestStart),
        // responseStart === 0일 경우,
        // 위에서 언급했듯이, fetch 길이가 respnoseEnd까지 늘어나기 때문에
        // 구간이 중복되지 않도록 0으로 설정함.
        response: Math.abs(entry.responseEnd - this.getResponseStartTime(entry))
      }
    };
  };
  OnLoadManager.prototype.getLoadEndTime = function (navigation_entry) {
    var loadEventEnd = navigation_entry.loadEventEnd,
      domComplete = navigation_entry.domComplete,
      domContentLoadedEventEnd = navigation_entry.domContentLoadedEventEnd,
      domInteractive = navigation_entry.domInteractive,
      domContentLoadedEventStart = navigation_entry.domContentLoadedEventStart;
    if (loadEventEnd) return loadEventEnd;else if (domComplete) return domComplete;else if (domContentLoadedEventEnd) return domContentLoadedEventEnd;else if (domInteractive) return domInteractive;
    return domContentLoadedEventStart;
  };
  OnLoadManager.prototype.getLoadStartTime = function (navigation_entry) {
    var redirectStart = navigation_entry.redirectStart,
      redirectEnd = navigation_entry.redirectEnd,
      fetchStart = navigation_entry.fetchStart,
      domainLookupStart = navigation_entry.domainLookupStart,
      requestStart = navigation_entry.requestStart;
    if (redirectStart) return redirectStart;else if (redirectEnd) return redirectEnd;else if (fetchStart) return fetchStart;else if (domainLookupStart) return domainLookupStart;
    return requestStart;
  };
  OnLoadManager.prototype.getFetchEndTime = function (xhr_entry) {
    var fetchStart = xhr_entry.fetchStart,
      domainLookupStart = xhr_entry.domainLookupStart,
      connectStart = xhr_entry.connectStart,
      requestStart = xhr_entry.requestStart,
      responseStart = xhr_entry.responseStart;
    if (domainLookupStart) return domainLookupStart;else if (connectStart) return connectStart;else if (requestStart) return requestStart;else if (responseStart) return responseStart;
    // 모두 0일 때 fetchStart 값을 줘서 fetch 지표를 0으로 만든다.
    return fetchStart;
  };
  OnLoadManager.prototype.getResponseStartTime = function (xhr_entry) {
    var fetchStart = xhr_entry.fetchStart,
      domainLookupStart = xhr_entry.domainLookupStart,
      connectStart = xhr_entry.connectStart,
      requestStart = xhr_entry.requestStart,
      responseStart = xhr_entry.responseStart;
    if (responseStart) return responseStart;else if (requestStart) return requestStart;else if (connectStart) return connectStart;else if (domainLookupStart) return domainLookupStart;
    return fetchStart;
  };
  OnLoadManager.prototype.getEventData = function (entry) {
    return {
      name: entry.name,
      time: entry.startTime
    };
  };
  // Low-version onload 로직
  OnLoadManager.prototype.getOnloadLocationDataWithLowVersion = function (navigation) {
    var startTime = new Date().valueOf();
    var _a = (0, Util_1.parseURL)(location.href),
      protocol = _a.protocol,
      host = _a.host,
      pathname = _a.pathname;
    return {
      pathname: (0, decode_1.decodeUrl)(pathname),
      host: host,
      protocol: protocol,
      startTime: startTime,
      endTime: Math.abs(startTime + Math.floor(navigation.loadEventEnd)),
      takeTime: Math.abs((navigation.loadEventEnd || startTime) - (navigation.redirectStart || startTime)),
      domainLookupTime: Math.abs((navigation.domainLookupEnd || startTime) - (navigation.domainLookupStart || startTime)),
      domTime: Math.abs((navigation.domComplete || startTime) - (navigation.domContentLoadedEventStart || startTime)),
      responseTime: Math.abs((navigation.responseEnd || startTime) - (navigation.responseStart || startTime))
    };
  };
  // Low-version - DURATION 데이터 넣는 함수
  OnLoadManager.prototype.getOnloadDurationWithLowVersion = function (navigation) {
    var duration_result = Math.abs(this.getLoadEndTime(navigation) - this.getLoadStartTime(navigation));
    if (duration_result === 0) {
      var _a = this.getOnloadTimingWithLowVersion(navigation),
        server = _a.server,
        network = _a.network,
        dom = _a.dom,
        loading = _a.loading;
      var totalData = Math.abs(server + network + dom + loading);
      return totalData;
    }
    return duration_result;
  };
  // Low-version - TIMING 데이터 넣는 함수
  OnLoadManager.prototype.getOnloadTimingWithLowVersion = function (navigation) {
    var now = new Date().valueOf();
    return {
      // on load 전체
      total: Math.abs((navigation.loadEventEnd || now) - (navigation.redirectStart || now)),
      // 대기
      wait: Math.abs((navigation.domainLookupStart || now) - (navigation.redirectStart || now)),
      // 서버
      server: Math.abs((navigation.responseEnd || now) - (navigation.connectEnd || now)),
      // 네트워크
      network: Math.abs((navigation.connectEnd || now) - (navigation.domainLookupStart || now)),
      // 돔
      dom: Math.abs((navigation.domContentLoadedEventEnd || now) - (navigation.responseEnd || now)),
      // 로딩
      loading: Math.abs((navigation.domComplete || now) - (navigation.domContentLoadedEventEnd || now)),
      // 콘텐츠 다운로드
      content: Math.abs((navigation.loadEventEnd || now) - (navigation.loadEventStart || now))
    };
  };
  return OnLoadManager;
}();
exports.OnLoadManager = OnLoadManager;

/***/ }),

/***/ 681:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
    };
    return _extendStatics(d, b);
  };
  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    _extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.DomOnLoad = void 0;
var OnLoad_1 = __webpack_require__(125);
var DomOnLoad = /** @class */function (_super) {
  __extends(DomOnLoad, _super);
  function DomOnLoad() {
    return _super.call(this) || this;
  }
  return DomOnLoad;
}(OnLoad_1.OnLoad);
exports.DomOnLoad = DomOnLoad;

/***/ }),

/***/ 989:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.OnRender = void 0;
var Header_1 = __webpack_require__(305);
var TransactionManager_1 = __webpack_require__(652);
var IMQAAgent_1 = __webpack_require__(61);
var OnRenderManager_1 = __webpack_require__(194);
var OnRenderBody_1 = __webpack_require__(73);
var OnRender = /** @class */function () {
  function OnRender() {
    this.header = new Header_1.Header();
    this.body = new OnRenderBody_1.OnRenderBody();
    this.startTime = 0;
    this.endTime = 0;
  }
  OnRender.prototype.init = function (config) {
    this.startTime = new Date().valueOf();
    this.header.set(config);
    this.header.webviewTxId = TransactionManager_1.TransactionManager.GetTxID();
    this.onRenderManager = new OnRenderManager_1.OnRenderManager(this);
    this.onRenderManager.init();
  };
  OnRender.prototype.create = function () {};
  OnRender.prototype.finish = function () {
    this.endTime = this.onRenderManager.getEndTime();
    this.body = this.onRenderManager.getBody();
    var data = {
      header: this.header,
      body: this.body,
      startTime: this.startTime,
      endTime: this.endTime
    };
    IMQAAgent_1.IMQAAgent.GetInstance().send(data);
  };
  OnRender.prototype.update = function (entry) {
    this.onRenderManager.pushEntry(entry);
  };
  return OnRender;
}();
exports.OnRender = OnRender;

/***/ }),

/***/ 73:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.OnRenderBody = void 0;
var OnRenderBody = /** @class */function () {
  function OnRenderBody() {
    this.type = "onRender";
    this.timings = [];
    this.scripts = [];
  }
  return OnRenderBody;
}();
exports.OnRenderBody = OnRenderBody;

/***/ }),

/***/ 194:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.OnRenderManager = void 0;
var TransactionManager_1 = __webpack_require__(652);
var IMQAAgent_1 = __webpack_require__(61);
var OnWebVitalsManager_1 = __webpack_require__(203);
var OnRenderManager = /** @class */function () {
  function OnRenderManager(onRender) {
    this.IMQAConfig = IMQAAgent_1.IMQAAgent.GetInstance().config;
    this.onRender = onRender;
    this.onRenderBody = this.onRender.body;
    this.measures = [];
    this.lcps = [];
    this.onWebVitalsManager = new OnWebVitalsManager_1.OnWebVitalsManager();
    this.isFid = false;
    this.eventFids = [];
  }
  OnRenderManager.prototype.init = function () {
    this.onDOMContentLoaded();
    this.onLoaded();
    this.onPointerEvent();
    this.onKeyEvent();
    this.onTouchEvent();
  };
  OnRenderManager.prototype.onDOMContentLoaded = function () {
    var _this = this;
    window.addEventListener("DOMContentLoaded", function (event) {
      _this.onRenderBody.timings.push({
        name: "DCL",
        fullName: "dom-content-loaded",
        timing: event.timeStamp || 0
      });
    });
  };
  OnRenderManager.prototype.onPointerEvent = function () {
    var _this = this;
    var fid = {
      startTime: 0,
      name: "",
      processingStart: 0,
      processingEnd: 0,
      duration: 0,
      cancelable: false
    };
    document.addEventListener("pointerdown", function (event) {
      fid.startTime = performance.now();
      fid.name = event.type;
      fid.processingStart = performance.now();
      fid.cancelable = event.cancelable;
    });
    document.addEventListener("pointerup", function (event) {
      fid.processingEnd = performance.now();
      fid.duration = fid.processingEnd - fid.processingStart;
      _this.eventFids.push(fid);
    });
  };
  OnRenderManager.prototype.onKeyEvent = function () {
    var _this = this;
    var fid = {
      startTime: 0,
      name: "",
      processingStart: 0,
      processingEnd: 0,
      duration: 0,
      cancelable: false
    };
    document.addEventListener("keydown", function (event) {
      fid.startTime = performance.now();
      fid.name = event.type;
      fid.processingStart = performance.now();
      fid.cancelable = event.cancelable;
    });
    document.addEventListener("keyup", function (event) {
      fid.processingEnd = performance.now();
      fid.duration = fid.processingEnd - fid.processingStart;
      _this.eventFids.push(fid);
    });
  };
  OnRenderManager.prototype.onTouchEvent = function () {
    var _this = this;
    var fid = {
      startTime: 0,
      name: "",
      processingStart: 0,
      processingEnd: 0,
      duration: 0,
      cancelable: false
    };
    document.addEventListener("touchstart", function (event) {
      fid.startTime = performance.now();
      fid.name = event.type;
      fid.processingStart = performance.now();
      fid.cancelable = event.cancelable;
    });
    document.addEventListener("touchend", function (event) {
      fid.processingEnd = performance.now();
      fid.duration = fid.processingEnd - fid.processingStart;
      _this.eventFids.push(fid);
    });
  };
  OnRenderManager.prototype.onLoaded = function () {
    var _this = this;
    window.addEventListener("load", function (event) {
      _this.onRenderBody.timings.push({
        name: "LOAD",
        fullName: "dom-loaded",
        timing: event.timeStamp || 0
      });
      _this.onRenderBody.timings.push(_this.lcps[_this.lcps.length - 1]);
      _this.endTime = new Date().valueOf();
      setTimeout(function () {
        _this.onRender.finish();
        _this.lcps = [];
      }, _this.IMQAConfig.collectTime);
    });
  };
  OnRenderManager.prototype.getEndTime = function () {
    return this.endTime;
  };
  OnRenderManager.prototype.getBody = function () {
    //FID가 발생하지않고 event로 발생한 FID가 수집되었을 경우 tmings에 넣어줌
    if (!this.isFid && this.eventFids.length > 0) this.onRenderBody.timings.push(this.onWebVitalsManager.pushEventFID(this.eventFids));
    var filterTimings = this.onRender.body.timings.filter(function (timing) {
      return timing !== undefined && timing.timing > 0;
    });
    this.onRender.body.timings = filterTimings;
    return this.onRender.body;
  };
  OnRenderManager.prototype.pushEntry = function (entry, timeStamp) {
    if (timeStamp === void 0) {
      timeStamp = 0;
    }
    switch (entry.entryType) {
      case "measure":
        this.onRenderBody.scripts = this.getMeasureData(entry);
        break;
      case "paint":
        this.onRenderBody.timings.push(this.getPaintData(entry));
        break;
      case "largest-contentful-paint":
        // 마지막 LCP만 보내기 위해서 따로 배열에 담음
        this.lcps.push(this.onWebVitalsManager.pushLCP(entry));
        break;
      case "layout-shift":
        this.onRenderBody.timings.push(this.onWebVitalsManager.pushCLS(entry));
        break;
      case "first-input":
        // FID 발생여부 확인 (사파리는 발생하지않음)
        this.isFid = true;
        this.onRenderBody.timings.push(this.onWebVitalsManager.pushFID(entry));
        break;
      default:
        break;
    }
  };
  OnRenderManager.prototype.getPaintData = function (entry) {
    var shortName;
    switch (entry.name) {
      case "first-paint":
        shortName = "FP";
        break;
      case "first-contentful-paint":
        shortName = "FCP";
        break;
      default:
        shortName = "Other";
        break;
    }
    return {
      name: shortName,
      fullName: entry.name,
      timing: entry.startTime
    };
  };
  /**
   * measure 데이터 가져오기
   * @param entry
   */
  OnRenderManager.prototype.getMeasureData = function (entry) {
    var _a, _b, _c;
    // dration 값이 0인 것들 수집 제외
    if (entry.duration < this.IMQAConfig.onRenderDurationLimit) {
      return this.measures;
    }
    this.measures.push({
      name: entry.name,
      start: entry.startTime,
      type: "function",
      parentId: ((_a = entry.detail) === null || _a === void 0 ? void 0 : _a.parentName) ? this.getParentId((_b = entry.detail) === null || _b === void 0 ? void 0 : _b.parentName) : "",
      scriptId: TransactionManager_1.TransactionManager.GenerateScriptID(),
      parentName: ((_c = entry.detail) === null || _c === void 0 ? void 0 : _c.parentName) || "",
      duration: entry.duration
    });
    return this.measures;
  };
  OnRenderManager.prototype.getParentId = function (params_name) {
    var result = this.measures.filter(function (item) {
      return item.name === params_name;
    });
    return result[result.length - 1]["scriptId"];
  };
  /**
   * 특정 조건에 따른 트리 노드추가
   * @param parent
   * @param node
   */
  OnRenderManager.prototype.insertNode = function (parent, node) {
    if (parent.children.length > 0) {
      var lastChild = parent.children[parent.children.length - 1];
      if (node.start >= lastChild.start + lastChild.duration && node.duration !== 0) {
        parent.children.push(node);
        return;
      }
      this.insertNode(lastChild, node);
    } else {
      parent.children.push(node);
    }
  };
  /**
   * 트리 생성 로직
   * @param data
   */
  OnRenderManager.prototype.buildTree = function (data) {
    var root = {
      children: [],
      start: 0,
      duration: 0,
      type: "function",
      scriptId: TransactionManager_1.TransactionManager.GenerateScriptID()
    };
    for (var i = 0; i < data.length; i++) {
      var node = {
        name: data[i].name,
        start: data[i].startTime,
        duration: data[i].duration,
        children: [],
        type: "function",
        scriptId: TransactionManager_1.TransactionManager.GenerateScriptID()
      };
      this.insertNode(root, node);
    }
    return root.children;
  };
  return OnRenderManager;
}();
exports.OnRenderManager = OnRenderManager;

/***/ }),

/***/ 362:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.PerformanceObserverManager = void 0;
var IMQAAgent_1 = __webpack_require__(61);
var PerformanceObserverManager = /** @class */function () {
  function PerformanceObserverManager() {
    this.dataList = [];
    this.IMQAConfig = IMQAAgent_1.IMQAAgent.GetInstance().config;
  }
  /**
   * PerformanceObserverManger 인스턴스 불러오기
   * @constructor
   */
  PerformanceObserverManager.GetInstance = function () {
    // PerformanceObserverManager의 instance가 없으면 생성
    if (!PerformanceObserverManager.instance) {
      PerformanceObserverManager.instance = new PerformanceObserverManager();
    }
    // PerformanceObserverManager의 performanceObserver 없으면 생성
    if (!this.performanceObserver) {
      PerformanceObserverManager.instance.init();
    }
    return PerformanceObserverManager.instance;
  };
  PerformanceObserverManager.prototype.init = function () {
    var _this = this;
    PerformanceObserverManager.performanceObserver = new PerformanceObserver(function (list) {
      for (var _i = 0, _a = list.getEntries(); _i < _a.length; _i++) {
        var entry = _a[_i];
        if (entry.entryType === "measure" && entry.duration < _this.IMQAConfig.onRenderDurationLimit) return;
        _this.notify(entry);
      }
    });
    // PerformanceObserverManager observe options
    PerformanceObserverManager.performanceObserver.observe({
      entryTypes: ["measure", "navigation", "paint", "resource", "first-input", "largest-contentful-paint", "layout-shift"]
    });
  };
  /**
   * DataList에 subscriber 등록
   * @param subscriber
   */
  PerformanceObserverManager.prototype.subscribe = function (subscriber) {
    this.dataList.push(subscriber);
  };
  /**
   * DataList에 있는 subscriber 제거
   * @param subscriber
   */
  PerformanceObserverManager.prototype.unsubscribe = function (subscriber) {
    this.dataList = this.dataList.filter(function (registedSubscriber) {
      return registedSubscriber !== subscriber;
    });
  };
  /**
   * DataList에 있는 subscriber에 entry 데이터 전파
   * @param entry
   */
  PerformanceObserverManager.prototype.notify = function (entry) {
    this.dataList.forEach(function (subscriber) {
      return subscriber.update(entry);
    });
  };
  return PerformanceObserverManager;
}();
exports.PerformanceObserverManager = PerformanceObserverManager;

/***/ }),

/***/ 243:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.onSPAManager = void 0;
var SPAOnRender_1 = __webpack_require__(536);
var SPAOnLoad_1 = __webpack_require__(464);
var OnWeb_1 = __webpack_require__(134);
var TransactionManager_1 = __webpack_require__(652);
var onSPAManager = /** @class */function () {
  function onSPAManager() {
    this.SPAOnLoads = [];
    this.SPAOnRenders = [];
  }
  onSPAManager.prototype.init = function (config) {
    this.pushState();
    this.locationPush(config);
    this.agentSendHook(config);
    this.createHook(config);
  };
  /**
   * pushState()
   * window history 객체의 pushState 이벤트가 감지되면 locationChage 이벤트를 생성하
   * SPA에서 route가 변경될때 해당 이벤트를 사용함
   */
  onSPAManager.prototype.pushState = function () {
    window.history.pushState = function (f) {
      return function pushState() {
        var ret = f.apply(this, arguments);
        window.dispatchEvent(new Event("locationChange"));
        return ret;
      };
    }(window.history.pushState);
  };
  /**
   * locationPush(config)
   * pushState()에서 생성된 이벤트를 감지하여 SPAOnLoad, SPAOnRender 객체 생성 및 데이터 추가
   * @param config main함수에서 init할때 받는 config값
   */
  onSPAManager.prototype.locationPush = function (config) {
    var _this = this;
    window.addEventListener("locationChange", function (event) {
      _this.spaDataManager(config, event);
    });
  };
  /**
   * createHook(config)
   * 화면이 변경되었다는 것을 알려주는 훅
   * locationChange 이벤트를 생성할 수 없는 경우 hook으로 호출하여 사용
   * @param config main함수에서 init할때 받는 config값
   */
  onSPAManager.prototype.createHook = function (config) {
    window["IMQAAgent"] = {
      collect: function collect(options) {
        if (options === void 0) {
          options = null;
        }
        if (!options) {
          window.dispatchEvent(new Event("imqaDataSend"));
          return;
        }
        // collect_time: 수집 주기 시간
        // path_name: url host제외 path_name
        // alias_name: 수집별명
        var collect_time = options.collect_time,
          path_name = options.path_name,
          alias_name = options.alias_name;
        if (_typeof(collect_time) !== undefined && typeof collect_time === "number") {
          config.SPACollectTime = collect_time;
        }
        if (alias_name) {
          config.customAliasName = alias_name;
        }
        if (path_name) {
          var regexpLastPath = /\/([a-zA-Z0-9._]+)(?:\?.*)?$/;
          var isPath = regexpLastPath.test(path_name);
          isPath ? config.customPathName = path_name : config.customPathName = "/" + path_name;
        }
        window.dispatchEvent(new Event("imqaDataSend"));
      }
    };
  };
  /**
   * agentSendHook(config)
   * hook을 통해서 만들어진 imqaDataSend 이벤트를 감지하여 SPAOnLoad 데이터를 생성하여 추가
   * @param config
   */
  onSPAManager.prototype.agentSendHook = function (config) {
    var _this = this;
    window.addEventListener("imqaDataSend", function (event) {
      _this.spaDataManager(config, event);
    });
  };
  /**
   * spaDataManager(config, event)
   * spa에서 생성되는 SPAOnLoad, SPAOnRender 관리
   * SPAOnLoad, SPAOnRender가 수집중인데 이벤트로 인해 다시 생성되면 수집중인 데이터를 바로 Finish시킴
   * @param config IMQA Config 설정 값
   * @param event 이벤트에서 넘겨주는 데이터 값
   */
  onSPAManager.prototype.spaDataManager = function (config, event) {
    var _this = this;
    if (this.SPAOnLoads && this.SPAOnLoads.length > 0) {
      this.SPAOnLoads[0].finish();
      this.SPAOnLoads.shift();
    }
    if (this.SPAOnRenders && this.SPAOnRenders.length > 0) {
      this.SPAOnRenders[0].finish();
      this.SPAOnRenders.shift();
    }
    // tx-id
    var webview_tx_id = localStorage.getItem("IMQA-Browser-Tx-Id");
    if (!webview_tx_id) TransactionManager_1.TransactionManager.GenerateBrowserTxID();
    OnWeb_1.OnWeb.GetInstance().init(config);
    OnWeb_1.OnWeb.GetInstance().create();
    var SPAonLoad = new SPAOnLoad_1.SPAOnLoad();
    var SPAonRender = new SPAOnRender_1.SPAOnRender();
    SPAonLoad.init(config);
    SPAonRender.init(config);
    this.SPAOnLoads.push(SPAonLoad);
    this.SPAOnRenders.push(SPAonRender);
    setTimeout(function () {
      _this.SPAOnLoads.shift();
      _this.SPAOnRenders.shift();
    }, config.SPACollectTime);
    SPAonLoad.setStartTime(event.timeStamp);
  };
  return onSPAManager;
}();
exports.onSPAManager = onSPAManager;

/***/ }),

/***/ 464:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
    };
    return _extendStatics(d, b);
  };
  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    _extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.SPAOnLoad = void 0;
var OnLoad_1 = __webpack_require__(125);
var TransactionManager_1 = __webpack_require__(652);
var SPAOnLoadManager_1 = __webpack_require__(25);
var IMQAAgent_1 = __webpack_require__(61);
var MutationObserverManager_1 = __webpack_require__(2);
var SPAOnLoad = /** @class */function (_super) {
  __extends(SPAOnLoad, _super);
  function SPAOnLoad() {
    return _super.call(this) || this;
  }
  SPAOnLoad.prototype.init = function (config) {
    var _this = this;
    this.startTime = new Date().valueOf();
    this.header.set(config);
    this.header.webviewTxId = TransactionManager_1.TransactionManager.GenerateTxID();
    this.SPAOnLoadManager = new SPAOnLoadManager_1.SPAOnLoadManager(this);
    this.SPAOnLoadManager.init();
    // 변경되는 DOM 리스트 (SPA 화면로딩구하기 위해서 쓰임)
    this.mutations = [];
    // DOM 변경 관찰자
    var MOM = MutationObserverManager_1.MutationObserverManager.GetInstance();
    MOM.subscribe(this);
    this.timeStamp = 0;
    this.finishSetTime = setTimeout(function () {
      _this.finish();
    }, config.SPACollectTime);
  };
  SPAOnLoad.prototype.setStartTime = function (domStartTime) {
    this.timeStamp = domStartTime;
  };
  SPAOnLoad.prototype.update = function (entry) {
    if (entry.type === "childList") {
      this.mutations.push({
        mutation: entry,
        timing: new Date().valueOf()
      });
    }
    this.SPAOnLoadManager.pushEntry(entry, this.timeStamp);
    this.body = this.SPAOnLoadManager.getBody();
  };
  SPAOnLoad.prototype.finish = function () {
    clearTimeout(this.finishSetTime);
    this.SPAOnLoadManager.disconnect();
    this.endTime = new Date().valueOf();
    this.body = this.SPAOnLoadManager.getMutationBodyData(this.body, this.startTime, this.mutations, this.header);
    var data = {
      header: this.header,
      body: this.body,
      startTime: this.startTime,
      endTime: this.endTime
    };
    IMQAAgent_1.IMQAAgent.GetInstance().send(data);
    // 데이터 보낸 이후 초기화
    IMQAAgent_1.IMQAAgent.GetInstance().config.customAliasName = null;
    IMQAAgent_1.IMQAAgent.GetInstance().config.customPathName = null;
    IMQAAgent_1.IMQAAgent.GetInstance().config.SPACollectTime = IMQAAgent_1.IMQAAgent.GetInstance().config.SPACollectInitTime;
  };
  return SPAOnLoad;
}(OnLoad_1.OnLoad);
exports.SPAOnLoad = SPAOnLoad;

/***/ }),

/***/ 25:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



var __assign = this && this.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.SPAOnLoadManager = void 0;
var Util_1 = __webpack_require__(410);
var IMQAAgent_1 = __webpack_require__(61);
var decode_1 = __webpack_require__(592);
var SPAOnLoadManager = /** @class */function () {
  function SPAOnLoadManager(SPAOnLoad) {
    this.dataList = [];
    this.SPAOnLoad = SPAOnLoad;
  }
  SPAOnLoadManager.prototype.init = function () {
    var _this = this;
    SPAOnLoadManager.performanceObserver = new PerformanceObserver(function (list) {
      for (var _i = 0, _a = list.getEntries(); _i < _a.length; _i++) {
        var entry = _a[_i];
        _this.SPAOnLoad.update(entry);
      }
    });
    // performanceObserver entryType 등록
    SPAOnLoadManager.performanceObserver.observe({
      entryTypes: ["navigation", "paint", "resource", "first-input", "largest-contentful-paint"]
    });
  };
  SPAOnLoadManager.prototype.disconnect = function () {
    SPAOnLoadManager.performanceObserver.disconnect();
  };
  /**
   * DataList에 subscriber 등록
   * @param subscriber
   */
  SPAOnLoadManager.prototype.add = function (SPAOnLoad) {
    this.dataList.push(SPAOnLoad);
  };
  /**
   * DataList에 있는 subscriber에 entry 데이터 전파
   * @param entry
   */
  SPAOnLoadManager.prototype.notify = function (entry) {
    this.dataList.forEach(function (subscriber) {
      return subscriber.update(entry);
    });
  };
  SPAOnLoadManager.prototype.reset = function () {
    this.dataList = [];
  };
  SPAOnLoadManager.prototype.finish = function () {
    this.dataList[0].finish();
  };
  SPAOnLoadManager.prototype.getBody = function () {
    return this.SPAOnLoad.body;
  };
  /**
   * mutations 데이터를 합친 body로 변환
   * @param body
   * @param startTime
   * @param mutation
   * @param header
   */
  SPAOnLoadManager.prototype.getMutationBodyData = function (body, startTime, mutations, header) {
    var _a;
    // @ts-ignore
    var lastMutationStartTime = ((_a = mutations[mutations.length - 1]) === null || _a === void 0 ? void 0 : _a.timing) || 0;
    return __assign(__assign({}, body), {
      duration: lastMutationStartTime ? lastMutationStartTime - startTime : 0,
      location_data: __assign(__assign({}, body.location_data), {
        host: header.host,
        pathname: header.pathname,
        protocol: header.protocol,
        domTime: lastMutationStartTime ? lastMutationStartTime - startTime : 0,
        startTime: startTime
      }),
      timing: __assign(__assign({}, body.timing), {
        dom: lastMutationStartTime ? lastMutationStartTime - startTime : 0,
        total: lastMutationStartTime ? lastMutationStartTime - startTime : 0
      })
    });
  };
  SPAOnLoadManager.prototype.pushEntry = function (entry, timeStamp) {
    if (timeStamp === void 0) {
      timeStamp = 0;
    }
    switch (entry.constructor.name) {
      case "PerformanceNavigationTiming":
        this.SPAOnLoad.body.location_data = this.getOnloadLocationData(entry);
        this.SPAOnLoad.body.duration = this.getOnloadDuration(entry);
        this.SPAOnLoad.body.timing = this.getOnloadTiming(entry);
        break;
      case "PerformanceResourceTiming":
        if (entry.initiatorType === "xmlhttprequest" && entry.name.includes(IMQAAgent_1.IMQAAgent.GetInstance().config.collectorHost)) break;
        this.SPAOnLoad.body.entries.push(this.getNetworkEntries(entry, timeStamp));
        break;
      case "PerformancePaintTiming":
      case "PerformanceEventTiming":
        // BODY - EVENT 데이터 push
        this.SPAOnLoad.body.events.push(this.getEventData(entry));
        break;
      default:
        break;
    }
  };
  SPAOnLoadManager.prototype.getOnloadLocationData = function (navigation) {
    var startTime = new Date().valueOf();
    var _a = (0, Util_1.parseURL)(navigation.name),
      protocol = _a.protocol,
      host = _a.host,
      pathname = _a.pathname;
    return {
      pathname: (0, decode_1.decodeUrl)(pathname),
      host: host,
      protocol: protocol,
      startTime: startTime,
      endTime: Math.abs(startTime + Math.floor(navigation.loadEventEnd)),
      takeTime: Math.abs(navigation.loadEventEnd - navigation.redirectStart),
      domainLookupTime: Math.abs(navigation.domainLookupEnd - navigation.domainLookupStart),
      domTime: Math.abs(navigation.domComplete - navigation.domContentLoadedEventStart),
      responseTime: Math.abs(navigation.responseEnd - navigation.responseStart)
    };
  };
  // BODY - DURATION 데이터 넣는 함수
  SPAOnLoadManager.prototype.getOnloadDuration = function (navigation) {
    return Math.abs(this.getLoadEndTime(navigation) - this.getLoadStartTime(navigation));
  };
  // BODY - TIMING 데이터 넣는 함수
  SPAOnLoadManager.prototype.getOnloadTiming = function (navigation) {
    return {
      // on load 전체
      total: Math.abs(navigation.loadEventEnd - navigation.redirectStart),
      // 대기
      wait: Math.abs(navigation.domainLookupStart - navigation.redirectStart),
      // 서버
      server: Math.abs(navigation.responseEnd - navigation.connectEnd),
      // 네트워크
      network: Math.abs(navigation.connectEnd - navigation.domainLookupStart),
      // 돔
      dom: Math.abs(navigation.domContentLoadedEventEnd - navigation.responseEnd),
      // 로딩
      loading: Math.abs(navigation.domComplete - navigation.domContentLoadedEventEnd),
      // 콘텐츠 다운로드
      content: Math.abs(navigation.loadEventEnd - navigation.loadEventStart)
    };
  };
  // BODY - ENTRIES 데이터 넣는 함수
  SPAOnLoadManager.prototype.getNetworkEntries = function (entry, timeStamp) {
    // let url = new URL(entry.name);
    var _a = (0, Util_1.parseURL)(entry.name),
      protocol = _a.protocol,
      host = _a.host,
      pathname = _a.pathname,
      search = _a.search;
    return {
      protocol: protocol,
      host: host,
      pathname: (0, decode_1.decodeUrl)(pathname),
      parmas: (0, decode_1.decodeUrl)(search),
      resource_type: entry.initiatorType,
      start_time: Math.abs(entry.startTime - timeStamp),
      // xxxStart, xxxEnd 는 하나가 0이 나오면 다른 하나도 0인 경향이 있음. (response쪽 제외)
      // 반대로 하나가 정상 값이면, 다른 하나도 정상 값임.
      timing: {
        wating: Math.abs(entry.redirectStart - entry.startTime),
        redirect: Math.abs(entry.redirectEnd - entry.redirectStart),
        // timeline상 fetchStart 후에
        // 차례대로 domainLookup, connect, request, response 과정이 있다.
        // 하지만 responseEnd를 제외한 나머지 지표들은 값이 0이거나 똑같을 수 있다.
        // 위 지표들이 0일 때, 단순히 빼버리면 음수값이 나오므로
        // fetch 구간의 end 기준을 늘려주었다.
        fetch: Math.abs(this.getFetchEndTime(entry) - entry.fetchStart),
        domainlookup: Math.abs(entry.domainLookupEnd - entry.domainLookupStart),
        connect: Math.abs(entry.connectEnd - entry.connectStart),
        request_sent: Math.abs(entry.responseStart - entry.requestStart),
        // responseStart === 0일 경우,
        // 위에서 언급했듯이, fetch 길이가 respnoseEnd까지 늘어나기 때문에
        // 구간이 중복되지 않도록 0으로 설정함.
        response: Math.abs(entry.responseEnd - this.getResponseStartTime(entry))
      }
    };
  };
  SPAOnLoadManager.prototype.getLoadEndTime = function (navigation_entry) {
    var loadEventEnd = navigation_entry.loadEventEnd,
      domComplete = navigation_entry.domComplete,
      domContentLoadedEventEnd = navigation_entry.domContentLoadedEventEnd,
      domInteractive = navigation_entry.domInteractive,
      domContentLoadedEventStart = navigation_entry.domContentLoadedEventStart;
    if (loadEventEnd) return loadEventEnd;else if (domComplete) return domComplete;else if (domContentLoadedEventEnd) return domContentLoadedEventEnd;else if (domInteractive) return domInteractive;
    return domContentLoadedEventStart;
  };
  SPAOnLoadManager.prototype.getLoadStartTime = function (navigation_entry) {
    var redirectStart = navigation_entry.redirectStart,
      redirectEnd = navigation_entry.redirectEnd,
      fetchStart = navigation_entry.fetchStart,
      domainLookupStart = navigation_entry.domainLookupStart,
      requestStart = navigation_entry.requestStart;
    if (redirectStart) return redirectStart;else if (redirectEnd) return redirectEnd;else if (fetchStart) return fetchStart;else if (domainLookupStart) return domainLookupStart;
    return requestStart;
  };
  SPAOnLoadManager.prototype.getFetchEndTime = function (xhr_entry) {
    var fetchStart = xhr_entry.fetchStart,
      domainLookupStart = xhr_entry.domainLookupStart,
      connectStart = xhr_entry.connectStart,
      requestStart = xhr_entry.requestStart,
      responseStart = xhr_entry.responseStart;
    if (domainLookupStart) return domainLookupStart;else if (connectStart) return connectStart;else if (requestStart) return requestStart;else if (responseStart) return responseStart;
    // 모두 0일 때 fetchStart 값을 줘서 fetch 지표를 0으로 만든다.
    return fetchStart;
  };
  SPAOnLoadManager.prototype.getResponseStartTime = function (xhr_entry) {
    var fetchStart = xhr_entry.fetchStart,
      domainLookupStart = xhr_entry.domainLookupStart,
      connectStart = xhr_entry.connectStart,
      requestStart = xhr_entry.requestStart,
      responseStart = xhr_entry.responseStart;
    if (responseStart) return responseStart;else if (requestStart) return requestStart;else if (connectStart) return connectStart;else if (domainLookupStart) return domainLookupStart;
    return fetchStart;
  };
  SPAOnLoadManager.prototype.getEventData = function (entry) {
    return {
      name: entry.name,
      time: entry.startTime
    };
  };
  return SPAOnLoadManager;
}();
exports.SPAOnLoadManager = SPAOnLoadManager;

/***/ }),

/***/ 536:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.SPAOnRender = void 0;
var Header_1 = __webpack_require__(305);
var TransactionManager_1 = __webpack_require__(652);
var IMQAAgent_1 = __webpack_require__(61);
var SPAOnRenderManager_1 = __webpack_require__(169);
var SPAOnRenderBody_1 = __webpack_require__(112);
var SPAOnRender = /** @class */function () {
  function SPAOnRender() {
    this.header = new Header_1.Header();
    this.body = new SPAOnRenderBody_1.SPAOnRenderBody();
    this.startTime = 0;
    this.endTime = 0;
  }
  SPAOnRender.prototype.init = function (config) {
    var _this = this;
    this.startTime = new Date().valueOf();
    this.header.set(config);
    this.header.webviewTxId = TransactionManager_1.TransactionManager.GetTxID();
    this.SPAOnRenderManager = new SPAOnRenderManager_1.SPAOnRenderManager(this);
    this.SPAOnRenderManager.init();
    this.finishSetTime = setTimeout(function () {
      _this.finish();
    }, config.SPACollectTime);
  };
  SPAOnRender.prototype.create = function () {};
  SPAOnRender.prototype.finish = function () {
    clearTimeout(this.finishSetTime);
    this.SPAOnRenderManager.disconnect();
    this.endTime = new Date().valueOf();
    this.body = this.SPAOnRenderManager.getBody();
    var data = {
      header: this.header,
      body: this.body,
      startTime: this.startTime,
      endTime: this.endTime
    };
    IMQAAgent_1.IMQAAgent.GetInstance().send(data);
  };
  SPAOnRender.prototype.update = function (entry) {
    this.SPAOnRenderManager.pushEntry(entry);
  };
  return SPAOnRender;
}();
exports.SPAOnRender = SPAOnRender;

/***/ }),

/***/ 112:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.SPAOnRenderBody = void 0;
var SPAOnRenderBody = /** @class */function () {
  function SPAOnRenderBody() {
    this.type = "onRender";
    this.timings = [];
    this.scripts = [];
  }
  return SPAOnRenderBody;
}();
exports.SPAOnRenderBody = SPAOnRenderBody;

/***/ }),

/***/ 169:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.SPAOnRenderManager = void 0;
var IMQAAgent_1 = __webpack_require__(61);
var TransactionManager_1 = __webpack_require__(652);
var OnWebVitalsManager_1 = __webpack_require__(203);
var SPAOnRenderManager = /** @class */function () {
  function SPAOnRenderManager(SPAOnRender) {
    this.IMQAConfig = IMQAAgent_1.IMQAAgent.GetInstance().config;
    this.SPAOnRender = SPAOnRender;
    this.SPAOnRenderBody = this.SPAOnRender.body;
    this.measures = [];
    this.lcps = [];
    this.onWebVitalsManager = new OnWebVitalsManager_1.OnWebVitalsManager();
    this.isFid = false;
    this.eventFids = [];
  }
  SPAOnRenderManager.prototype.init = function () {
    this.setMeasurePerformance();
    this.onDOMContentLoaded();
    this.onPointerEvent();
    this.onKeyEvent();
    this.onTouchEvent();
  };
  SPAOnRenderManager.prototype.disconnect = function () {
    SPAOnRenderManager.performanceObserver.disconnect();
  };
  SPAOnRenderManager.prototype.setMeasurePerformance = function () {
    var _this = this;
    SPAOnRenderManager.performanceObserver = new PerformanceObserver(function (list) {
      for (var _i = 0, _a = list.getEntries(); _i < _a.length; _i++) {
        var entry = _a[_i];
        if (entry.entryType === "measure" && entry.duration < _this.IMQAConfig.onRenderDurationLimit) return;
        _this.SPAOnRender.update(entry);
      }
    });
    // performanceObserver entryType 등록
    SPAOnRenderManager.performanceObserver.observe({
      entryTypes: ["measure", "navigation", "paint", "resource", "first-input", "largest-contentful-paint"]
    });
  };
  SPAOnRenderManager.prototype.onDOMContentLoaded = function () {
    var _this = this;
    window.addEventListener("DOMContentLoaded", function (event) {
      _this.SPAOnRenderBody.timings.push({
        name: "DCL",
        fullName: "dom-content-loaded",
        timing: event.timeStamp || 0
      });
    });
  };
  SPAOnRenderManager.prototype.onPointerEvent = function () {
    var _this = this;
    var fid = {
      startTime: 0,
      name: "",
      processingStart: 0,
      processingEnd: 0,
      duration: 0,
      cancelable: false
    };
    document.addEventListener("pointerdown", function (event) {
      fid.startTime = performance.now();
      fid.name = event.type;
      fid.processingStart = performance.now();
      fid.cancelable = event.cancelable;
    });
    document.addEventListener("pointerup", function (event) {
      fid.processingEnd = performance.now();
      fid.duration = fid.processingEnd - fid.processingStart;
      _this.eventFids.push(fid);
    });
  };
  SPAOnRenderManager.prototype.onKeyEvent = function () {
    var _this = this;
    var fid = {
      startTime: 0,
      name: "",
      processingStart: 0,
      processingEnd: 0,
      duration: 0,
      cancelable: false
    };
    document.addEventListener("keydown", function (event) {
      fid.startTime = performance.now();
      fid.name = event.type;
      fid.processingStart = performance.now();
      fid.cancelable = event.cancelable;
    });
    document.addEventListener("keyup", function (event) {
      fid.processingEnd = performance.now();
      fid.duration = fid.processingEnd - fid.processingStart;
      _this.eventFids.push(fid);
    });
  };
  SPAOnRenderManager.prototype.onTouchEvent = function () {
    var _this = this;
    var fid = {
      startTime: 0,
      name: "",
      processingStart: 0,
      processingEnd: 0,
      duration: 0,
      cancelable: false
    };
    document.addEventListener("touchstart", function (event) {
      fid.startTime = performance.now();
      fid.name = event.type;
      fid.processingStart = performance.now();
      fid.cancelable = event.cancelable;
    });
    document.addEventListener("touchend", function (event) {
      fid.processingEnd = performance.now();
      fid.duration = fid.processingEnd - fid.processingStart;
      _this.eventFids.push(fid);
    });
  };
  SPAOnRenderManager.prototype.getEndTime = function () {
    return this.endTime;
  };
  SPAOnRenderManager.prototype.getBody = function () {
    //FID가 발생하지않고 event로 발생한 FID가 수집되었을 경우 tmings에 넣어줌
    if (!this.isFid && this.eventFids.length > 0) this.SPAOnRenderBody.timings.push(this.onWebVitalsManager.pushEventFID(this.eventFids));
    var filterTimings = this.SPAOnRender.body.timings.filter(function (timing) {
      return timing !== undefined && timing.timing > 0;
    });
    this.SPAOnRender.body.timings = filterTimings;
    return this.SPAOnRender.body;
  };
  SPAOnRenderManager.prototype.pushEntry = function (entry, timeStamp) {
    if (timeStamp === void 0) {
      timeStamp = 0;
    }
    switch (entry.entryType) {
      case "measure":
        this.SPAOnRenderBody.scripts = this.getMeasureData(entry);
        break;
      case "paint":
        this.SPAOnRenderBody.timings.push(this.getPaintData(entry));
        break;
      case "largest-contentful-paint":
        // 마지막 LCP만 보내기 위해서 따로 배열에 담음
        this.lcps.push(this.onWebVitalsManager.pushLCP(entry));
        break;
      case "layout-shift":
        this.SPAOnRenderBody.timings.push(this.onWebVitalsManager.pushCLS(entry));
        break;
      case "first-input":
        // FID 발생여부 확인 (사파리는 발생하지않음)
        this.isFid = true;
        this.SPAOnRenderBody.timings.push(this.onWebVitalsManager.pushFID(entry));
        break;
      default:
        break;
    }
  };
  SPAOnRenderManager.prototype.getPaintData = function (entry) {
    var shortName;
    switch (entry.name) {
      case "first-paint":
        shortName = "FP";
        break;
      case "first-contentful-paint":
        shortName = "FCP";
        break;
      default:
        shortName = "Other";
        break;
    }
    return {
      name: shortName,
      fullName: entry.name,
      timing: entry.startTime
    };
  };
  /**
   * measure 데이터 가져오기
   * @param entry
   */
  SPAOnRenderManager.prototype.getMeasureData = function (entry) {
    var _a, _b, _c;
    // dration 값이 0인 것들 수집 제외
    if (entry.duration < this.IMQAConfig.onRenderDurationLimit) {
      return this.measures;
    }
    this.measures.push({
      name: entry.name,
      start: entry.startTime,
      type: "function",
      parentId: ((_a = entry.detail) === null || _a === void 0 ? void 0 : _a.parentName) ? this.getParentId((_b = entry.detail) === null || _b === void 0 ? void 0 : _b.parentName) : "",
      scriptId: TransactionManager_1.TransactionManager.GenerateScriptID(),
      parentName: ((_c = entry.detail) === null || _c === void 0 ? void 0 : _c.parentName) || "",
      duration: entry.duration
    });
    return this.measures;
  };
  SPAOnRenderManager.prototype.getParentId = function (params_name) {
    var result = this.measures.filter(function (item) {
      return item.name === params_name;
    });
    return result[result.length - 1]["scriptId"];
  };
  return SPAOnRenderManager;
}();
exports.SPAOnRenderManager = SPAOnRenderManager;

/***/ }),

/***/ 410:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.makeValidURL = exports.parseURL = void 0;
var IMQAConfig_1 = __webpack_require__(86);
function parseURL(url) {
  var _a = new URL(url),
    host = _a.host,
    protocol = _a.protocol,
    pathname = _a.pathname,
    search = _a.search,
    searchParams = _a.searchParams;
  protocol = protocol.slice(0, protocol.length - 1);
  //간혹 길이가 긴 pathname이 올경우 999자리까지만 수집
  if (pathname.length > 1000) pathname = pathname.substring(0, 999);
  return {
    host: host,
    protocol: protocol,
    pathname: pathname,
    search: search,
    searchParams: searchParams
  };
}
exports.parseURL = parseURL;
function makeValidURL(urlString) {
  try {
    var url = new URL(urlString);
    return url.href;
  } catch (err) {
    // intercept 한 url이 pathname만 있을 때 (invalid)
    // URL 클래스에서 에러 발생
    var config = new IMQAConfig_1.IMQAConfig(window);
    var validURL = config.root_window.location.protocol + "//";
    validURL += config.root_window.location.host;
    validURL += urlString;
    return validURL;
  }
}
exports.makeValidURL = makeValidURL;

/***/ }),

/***/ 592:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.decodeUrl = void 0;
var decodeUrl = function decodeUrl(url) {
  return decodeURIComponent(url);
};
exports.decodeUrl = decodeUrl;

/***/ }),

/***/ 398:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.userPlatform = void 0;
var userPlatform = /** @class */function () {
  function userPlatform() {
    // Device & OS Regex
    this.windowsRegex = /Windows NT/;
    this.macRegex = /Macintosh/;
    this.linuxRegex = /Linux/;
    this.unixRegex = /Unix|X11/;
    this.ubuntuRegex = /Ubuntu/;
    this.mobileRegex = /Mobi/i;
    this.iphoneRegex = /(?:ipad|iphone|ipod).*applewebkit/i;
    this.androidRegex = /Android/;
    // Browser Regex
    this.chromeRegex = /(Chrome|Chromium|CriOS)\//;
    this.googleRegex = /GSA\//;
    this.firefoxRegex = /Firefox\//;
    this.safariRegex = /Safari\//;
    this.edgeRegex = /Edg\//;
    this.operaRegex = /OPR\/|Opera/;
    this.ieRegex = /Trident\/|MSIE /;
    this.samsungRegex = /SamsungBrowser\//;
    this.naverRegex = /NAVER/;
    this.kakaoRegex = /KAKAOTALK/;
    // Browser Version Regex
    this.chromeVersionRegex = /(Chrome|Chromium|CriOS)\/([\d.]+)/;
    this.googleVersionRegex = /GSA\/([\d.]+)/;
    this.firefoxVersionRegex = /Firefox\/([\d.]+)/;
    this.safariVersionRegex = /Version\/([\d.]+)/;
    this.edgeVersionRegex = /Edg\/([\d.]+)/;
    this.operaVersionRegex = /(OPR|Opera)\/([\d.]+)/;
    this.ieVersionRegex = /(Trident|MSIE)\/([\d.]+)/;
    this.samsungVersionRegex = /SamsungBrowser\/([\d.]+)/;
    this.naverVersionRegex = /NAVER\(inapp; search; (\d+); (\d+\.\d+\.\d+)/;
    this.kakaoVersionRegex = /KAKAOTALK (\d+)/i;
  }
  userPlatform.prototype.getDevice = function (userAgent) {
    if (this.mobileRegex.test(userAgent)) {
      return "Mobile";
    } else {
      return "Desktop";
    }
  };
  userPlatform.prototype.getOs = function (userAgent) {
    if (this.windowsRegex.test(userAgent)) {
      return "Windows";
    } else if (this.macRegex.test(userAgent)) {
      return "macOS";
    } else if (this.androidRegex.test(userAgent)) {
      return "Android";
    } else if (this.iphoneRegex.test(userAgent)) {
      return "iOS";
    } else if (this.linuxRegex.test(userAgent)) {
      return "Linux";
      if (this.ubuntuRegex.test(userAgent)) {
        return "Ubuntu";
      }
    } else if (this.unixRegex.test(userAgent)) {
      return "Unix";
    } else {
      return "Unknown";
    }
  };
  userPlatform.prototype.getBrowser = function (userAgent) {
    if (this.naverRegex.test(userAgent)) {
      return "Naver App";
    } else if (this.kakaoRegex.test(userAgent)) {
      return "Kakao App";
    } else if (this.chromeRegex.test(userAgent)) {
      if (this.samsungRegex.test(userAgent)) {
        return "Samsung Browser";
      }
      if (this.edgeRegex.test(userAgent)) {
        return "Microsoft Edge";
      }
      if (this.operaRegex.test(userAgent)) {
        return "Opera";
      }
      return "Chrome";
    } else if (this.googleRegex.test(userAgent)) {
      return "Google Search App";
    } else if (this.operaRegex.test(userAgent)) {
      return "Opera";
    } else if (this.firefoxRegex.test(userAgent)) {
      return "Firefox";
    } else if (this.safariRegex.test(userAgent)) {
      return "Safari";
    } else if (this.ieRegex.test(userAgent)) {
      return "Internet Explorer";
    } else {
      return "Unknown";
    }
  };
  userPlatform.prototype.getBrowserVersion = function (userAgent) {
    if (this.naverRegex.test(userAgent)) {
      return userAgent.match(this.naverVersionRegex)[this.getLastItem(userAgent, this.naverVersionRegex)].split(".")[0];
    } else if (this.kakaoRegex.test(userAgent)) {
      return userAgent.match(this.kakaoVersionRegex)[this.getLastItem(userAgent, this.kakaoVersionRegex)].split(".")[0];
    } else if (this.chromeRegex.test(userAgent)) {
      if (this.samsungRegex.test(userAgent)) {
        return userAgent.match(this.samsungVersionRegex)[this.getLastItem(userAgent, this.samsungVersionRegex)].split(".")[0];
      }
      if (this.edgeRegex.test(userAgent)) {
        return userAgent.match(this.edgeVersionRegex)[this.getLastItem(userAgent, this.edgeVersionRegex)].split(".")[0];
      }
      if (this.operaRegex.test(userAgent)) {
        return userAgent.match(this.operaVersionRegex)[this.getLastItem(userAgent, this.operaVersionRegex)].split(".")[0];
      }
      return userAgent.match(this.chromeVersionRegex)[this.getLastItem(userAgent, this.chromeVersionRegex)].split(".")[0];
    } else if (this.googleRegex.test(userAgent)) {
      return userAgent.match(this.googleVersionRegex)[this.getLastItem(userAgent, this.googleVersionRegex)].split(".")[0];
    } else if (this.operaRegex.test(userAgent)) {
      return userAgent.match(this.operaVersionRegex)[this.getLastItem(userAgent, this.operaVersionRegex)].split(".")[0];
    } else if (this.firefoxRegex.test(userAgent)) {
      return userAgent.match(this.firefoxVersionRegex)[this.getLastItem(userAgent, this.firefoxVersionRegex)].split(".")[0];
    } else if (this.safariRegex.test(userAgent)) {
      if (this.naverRegex.test(userAgent)) return userAgent.match(this.naverVersionRegex)[this.getLastItem(userAgent, this.naverVersionRegex)].split(".")[0];
      return userAgent.match(this.safariVersionRegex)[this.getLastItem(userAgent, this.safariVersionRegex)].split(".")[0];
    } else if (this.ieRegex.test(userAgent)) {
      return userAgent.match(this.ieVersionRegex)[this.getLastItem(userAgent, this.ieVersionRegex)].split(".")[0];
    } else {
      return "Unknown";
    }
  };
  userPlatform.prototype.getLastItem = function (userAgent, regex) {
    return userAgent.match(regex).length - 1;
  };
  return userPlatform;
}();
exports.userPlatform = userPlatform;

/***/ }),

/***/ 134:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.OnWeb = void 0;
var TransactionManager_1 = __webpack_require__(652);
var OnWebBody_1 = __webpack_require__(870);
var OnWebManager_1 = __webpack_require__(831);
var IMQAAgent_1 = __webpack_require__(61);
var WebBridge_1 = __webpack_require__(548);
var OnWeb = /** @class */function () {
  function OnWeb() {
    this.type = "gzip";
    this.ip = "127.0.0.1";
    this.body = new OnWebBody_1.OnWebBody();
  }
  /**
   * OnWeb 인스턴스 불러오기
   * @constructor
   */
  OnWeb.GetInstance = function () {
    if (!OnWeb.instance) {
      OnWeb.instance = new OnWeb();
    }
    return OnWeb.instance;
  };
  OnWeb.prototype.init = function (config) {
    this.onWebManager = OnWebManager_1.OnWebManager.GetInstance();
    this.body.dump_init_time = new Date().valueOf();
    this.body.launch_time = new Date().valueOf();
    this.body.process_id = TransactionManager_1.TransactionManager.GetBrowserTxID();
    this.body.package_name = IMQAAgent_1.IMQAAgent.GetInstance().config.package_name;
    this.body.process_name = IMQAAgent_1.IMQAAgent.GetInstance().config.process_name;
    this.body.platform = "aos";
    this.body.service = "mpm";
    var user_id = localStorage.getItem("IMQA-Browser-User-ID");
    var browser_use = localStorage.getItem("IMQA-Browser-Use");
    if (!user_id) localStorage.setItem("IMQA-Browser-User-ID", TransactionManager_1.TransactionManager.GetUserID());
    if (!browser_use || localStorage.getItem("IMQA-Browser-Use") === "false") localStorage.setItem("IMQA-Browser-Use", "true");
    this.body.user_id = localStorage.getItem("IMQA-Browser-User-ID");
    this.body.project_key = IMQAAgent_1.IMQAAgent.GetInstance().config.projectKey;
    this.project_key = IMQAAgent_1.IMQAAgent.GetInstance().config.projectKey;
    this.body.device_info = this.onWebManager.makeDeviceInfoData(config);
  };
  OnWeb.prototype.create = function () {
    var resData = this.onWebManager.makeRenderData();
    this.body.data.push(resData);
    // onWebManager 설정
    this.onWebManager.init();
  };
  OnWeb.prototype.finish = function () {
    var _this = this;
    var data = {
      type: this.type,
      ip: this.ip,
      body: this.body,
      project_key: this.project_key
    };
    new WebBridge_1.WebBridge().send(data)["catch"](function () {
      // error가 날 경우 인터벌 클리어
      _this.onWebManager.clearSendInterval();
      console.error("[Error]::IMQA Agent Send Error");
    });
  };
  OnWeb.prototype.clearData = function () {
    this.body.data = [];
  };
  OnWeb.prototype.update = function (data) {
    var webData = this.onWebManager.makeWebData(data);
    this.body.data.push(webData);
  };
  return OnWeb;
}();
exports.OnWeb = OnWeb;

/***/ }),

/***/ 870:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.OnWebBody = void 0;
var OnWebBody = /** @class */function () {
  function OnWebBody() {
    this.launch_time = 0;
    this.dump_init_time = 0;
    this.mpm_version = "2.20.0";
    this.crash_version = "0.0.0";
    this.core_version = "0.0.0";
    this.dump_interval = 1000;
    this.package_name = "";
    this.process_name = "";
    this.project_key = "";
    this.platform = "";
    this.service = "";
    this.custom_user_id = {
      id: "",
      name: "",
      email: ""
    };
    this.device_info = {
      os: "",
      app: "",
      device: "",
      brand: "",
      carrier: "-",
      uuid: "",
      ip: "-",
      location: {
        code: "",
        country_name: ""
      },
      city: {
        code: "",
        city_name: ""
      }
    };
    this.process_id = "";
    this.user_id = "";
    this.data = [];
  }
  return OnWebBody;
}();
exports.OnWebBody = OnWebBody;

/***/ }),

/***/ 831:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.OnWebManager = void 0;
var TransactionManager_1 = __webpack_require__(652);
var IMQAAgent_1 = __webpack_require__(61);
var OnWeb_1 = __webpack_require__(134);
var Util_1 = __webpack_require__(410);
var userPlatform_1 = __webpack_require__(398);
var decode_1 = __webpack_require__(592);
var OnWebManager = /** @class */function () {
  function OnWebManager() {
    this.intervalSetTime = null;
    this.intervalSetLocation = null;
    this.intervalBrowserUse = null;
  }
  /**
   * MutationObserverManger 인스턴스 불러오기
   * @constructor
   */
  OnWebManager.GetInstance = function () {
    // PerformanceObserverManager의 instance가 없으면 생성
    if (!OnWebManager.instance) {
      OnWebManager.instance = new OnWebManager();
    }
    return OnWebManager.instance;
  };
  OnWebManager.prototype.init = function () {
    if (this.intervalBrowserUse) clearTimeout(this.intervalBrowserUse);
    if (this.intervalSetLocation) clearTimeout(this.intervalSetLocation);
    var intervalTime = IMQAAgent_1.IMQAAgent.GetInstance().config.browserTxIdIntervalTime;
    this.intervalBrowserUse = setTimeout(function interval() {
      localStorage.setItem("IMQA-Browser-Use", "false");
    }, intervalTime);
    this.intervalSetLocation = setTimeout(function interval() {
      var browser_use = localStorage.getItem("IMQA-Browser-Use");
      if (browser_use !== "true") {
        var browser_tx_id = localStorage.getItem("IMQA-Browser-Tx-Id");
        localStorage.setItem("IMQA-Browser-Prev-Tx-Id", browser_tx_id);
        localStorage.removeItem("IMQA-Browser-Tx-Id");
      }
    }, intervalTime);
    // 인터벌 주기로 보내기
    this.SendInterval();
  };
  /**
   * 브라우저가 사라질때 보내기
   * @param data
   */
  OnWebManager.prototype.onBeforeunload = function () {
    var _this = this;
    window.addEventListener("beforeunload", function (e) {
      // e.preventDefault();
      _this.clearSendInterval();
      if (OnWeb_1.OnWeb.GetInstance().body.data.length <= 0) return;
      OnWeb_1.OnWeb.GetInstance().finish();
    });
  };
  /**
   * 브라우저 주기적으로 데이터 보내기
   * @param data
   * @param onWeb
   */
  OnWebManager.prototype.SendInterval = function () {
    var intervalTime = IMQAAgent_1.IMQAAgent.GetInstance().config.webIntervalTime;
    this.intervalSetTime = setInterval(function () {
      if (OnWeb_1.OnWeb.GetInstance().body.data.length > 0) {
        OnWeb_1.OnWeb.GetInstance().finish();
      }
    }, intervalTime);
  };
  /**
   * 브라우저 주기적으로 보내는 interval clear
   */
  OnWebManager.prototype.clearSendInterval = function () {
    clearInterval(this.intervalSetTime);
  };
  OnWebManager.prototype.makeDeviceInfoData = function (config) {
    var ua = new userPlatform_1.userPlatform();
    return {
      os: ua.getOs(config.root_window.navigator.userAgent),
      browser: ua.getBrowser(config.root_window.navigator.userAgent),
      browserVersion: ua.getBrowserVersion(config.root_window.navigator.userAgent),
      app: "1.0.0",
      device: ua.getDevice(config.root_window.navigator.userAgent),
      brand: config.root_window.navigator.vendor,
      carrier: "-",
      uuid: localStorage.getItem("IMQA-Browser-User-ID"),
      ip: "-",
      location: {
        code: "",
        country_name: ""
      },
      city: {
        code: "",
        city_name: ""
      },
      userAgent: config.root_window.navigator.userAgent
    };
  };
  OnWebManager.prototype.makeRenderData = function () {
    var _a = (0, Util_1.parseURL)(IMQAAgent_1.IMQAAgent.GetInstance().config.root_window.location.href),
      protocol = _a.protocol,
      host = _a.host,
      pathname = _a.pathname,
      search = _a.search;
    var locationList = IMQAAgent_1.IMQAAgent.GetInstance().config.root_window.location.pathname.split("/");
    var lastPath = locationList[locationList.length - 1];
    var locationOrigin = IMQAAgent_1.IMQAAgent.GetInstance().config.root_window.location.origin;
    var hash = IMQAAgent_1.IMQAAgent.GetInstance().config.root_window.location.hash;
    var change_pathname = IMQAAgent_1.IMQAAgent.GetInstance().config.customPathName ? IMQAAgent_1.IMQAAgent.GetInstance().config.customPathName : pathname;
    return {
      type: "render",
      activity_name: (0, decode_1.decodeUrl)(IMQAAgent_1.IMQAAgent.GetInstance().config.root_window.location.href),
      screen_name: (0, decode_1.decodeUrl)(IMQAAgent_1.IMQAAgent.GetInstance().config.root_window.location.href),
      lifecycle_name: "onResume",
      start_time: new Date().valueOf(),
      end_time: new Date().valueOf(),
      behaviorTxId: TransactionManager_1.TransactionManager.GetTxID(),
      // txId: TransactionManager.GetProcessID(),
      txId: TransactionManager_1.TransactionManager.GetBrowserTxID()
    };
  };
  OnWebManager.prototype.makeWebData = function (data) {
    var _a = (0, Util_1.parseURL)(IMQAAgent_1.IMQAAgent.GetInstance().config.root_window.location.href),
      protocol = _a.protocol,
      host = _a.host,
      pathname = _a.pathname,
      search = _a.search;
    var hash = IMQAAgent_1.IMQAAgent.GetInstance().config.root_window.location.hash;
    var locationList = IMQAAgent_1.IMQAAgent.GetInstance().config.root_window.location.pathname.split("/");
    var lastPath = locationList[locationList.length - 1];
    var locationOrigin = IMQAAgent_1.IMQAAgent.GetInstance().config.root_window.location.origin;
    return {
      type: "webview",
      body: JSON.stringify(data),
      screen_name: (0, decode_1.decodeUrl)(IMQAAgent_1.IMQAAgent.GetInstance().config.root_window.location.href),
      behaviorTxId: TransactionManager_1.TransactionManager.GetTxID(),
      // txId: TransactionManager.GetProcessID(),
      txId: TransactionManager_1.TransactionManager.GetBrowserTxID(),
      metaData: ""
    };
  };
  return OnWebManager;
}();
exports.OnWebManager = OnWebManager;

/***/ }),

/***/ 548:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.WebBridge = void 0;
var IMQAAgent_1 = __webpack_require__(61);
var OnWebManager_1 = __webpack_require__(831);
var OnWeb_1 = __webpack_require__(134);
var WebBridge = /** @class */function () {
  function WebBridge() {
    this.COLLECTOR_URL = IMQAAgent_1.IMQAAgent.GetInstance().config.collectorUrl;
    this.CRASH_URL = IMQAAgent_1.IMQAAgent.GetInstance().config.crashCollectorUrl;
    this.SESSION_URL = IMQAAgent_1.IMQAAgent.GetInstance().config.sessionUrl;
  }
  WebBridge.prototype.send = function (data) {
    return this.request(this.COLLECTOR_URL, data);
  };
  WebBridge.prototype.sendCrash = function (data) {
    return this.request(this.CRASH_URL, data);
  };
  WebBridge.prototype.sendSession = function (data) {
    return this.request(this.SESSION_URL, data);
  };
  WebBridge.prototype.request = function (url, data) {
    return new Promise(function (resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open("POST", url + "?project_key=" + encodeURIComponent(IMQAAgent_1.IMQAAgent.GetInstance().config.projectKey), true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.onload = function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
          resolve(xhr.responseText);
        } else {
          OnWebManager_1.OnWebManager.GetInstance().clearSendInterval();
          reject(new Error("[IMQA Web agent] Request failed. Status: " + xhr.status));
        }
      };
      xhr.timeout = 10000;
      xhr.ontimeout = function () {
        OnWebManager_1.OnWebManager.GetInstance().clearSendInterval();
        xhr.abort(); // 요청 취소
      };
      xhr.onerror = function () {
        reject(new Error("[IMQA Web agent] Request failed. Network error."));
      };
      console.log("[WEB-DUMP]:::", JSON.parse(JSON.stringify(data.body)));
      xhr.send(JSON.stringify(data.body));
      OnWeb_1.OnWeb.GetInstance().clearData();
    });
  };
  return WebBridge;
}();
exports.WebBridge = WebBridge;

/***/ }),

/***/ 203:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.OnWebVitalsManager = void 0;
var decode_1 = __webpack_require__(592);
var OnWebVitalsManager = /** @class */function () {
  function OnWebVitalsManager() {}
  OnWebVitalsManager.prototype.pushEventFID = function (event) {
    var entry = event[0];
    return {
      name: "FID",
      fullName: "first-input",
      timing: entry.startTime,
      data: {
        name: entry.name,
        processingStart: entry.processingStart,
        processingEnd: entry.processingEnd,
        duration: entry.processingEnd - entry.processingStart,
        cancelable: entry.cancelable
      }
    };
  };
  OnWebVitalsManager.prototype.pushFID = function (entry) {
    if (entry.entryType !== "first-input") return;
    return {
      name: "FID",
      fullName: "first-input",
      timing: entry.startTime,
      data: {
        name: entry.name,
        processingStart: entry.processingStart,
        processingEnd: entry.processingEnd,
        duration: entry.duration,
        cancelable: entry.cancelable
      }
    };
  };
  OnWebVitalsManager.prototype.pushLCP = function (entry) {
    if (entry.constructor.name !== "LargestContentfulPaint" || !entry.element) return;
    return {
      name: "LCP",
      fullName: "largest-contentful-paint",
      timing: entry.startTime,
      data: {
        element: {
          nodeName: entry.element.localName,
          id: entry.element.id,
          "class": entry.element.className
        },
        renderTime: entry.renderTime,
        loadTime: entry.loadTime,
        url: (0, decode_1.decodeUrl)(entry.url)
      }
    };
  };
  OnWebVitalsManager.prototype.pushCLS = function (entry) {
    if (entry.constructor.name !== "LayoutShift") return;
    var clsValue = 0;
    var clsEntries = [];
    var sessionValue = 0;
    var sessionEntries = [];
    if (!entry.hadRecentInput) {
      var firstSessionEntry = sessionEntries[0];
      var lastSessionEntry = sessionEntries[sessionEntries.length - 1];
      /*
        이전 입력 후 1초 이내에 입력이 발생한 경우 및
        세션에서 첫 번째 항목이 입력된 후 5초 이내에 다음 항목을 포함합니다
        현재 세션의 항목입니다. 그렇지 않으면 새 세션을 시작합니다.
      */
      if (sessionValue && entry.startTime - lastSessionEntry.startTime < 1000 && entry.startTime - firstSessionEntry.startTime < 5000) {
        sessionValue += entry.value;
        sessionEntries.push(entry);
      } else {
        sessionValue = entry.value;
        sessionEntries = [entry];
      }
      /*
        현재 세션 값이 현재 CLS 값보다 클 경우,
        CLS 및 이에 기여하는 항목을 업데이트합니다.
      */
      if (sessionValue > clsValue) {
        clsValue = sessionValue;
        clsEntries = sessionEntries;
      }
    }
    if (clsValue == 0) return;
    // 수집된 element를 배열안에 넣습니다.
    var entry_elements = [];
    for (var _i = 0, _a = entry.sources; _i < _a.length; _i++) {
      var el = _a[_i];
      if (!el.node) return;
      entry_elements.push({
        nodeName: el.node.localName,
        id: el.node.id,
        "class": el.node.className
      });
    }
    return {
      name: "LS",
      fullName: "layout-shift",
      timing: entry.startTime,
      data: {
        value: clsValue,
        hadRecentInput: entry.hadRecentInput,
        elements: entry_elements
      }
    };
  };
  return OnWebVitalsManager;
}();
exports.OnWebVitalsManager = OnWebVitalsManager;

/***/ }),

/***/ 617:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.XHR = void 0;
var Header_1 = __webpack_require__(305);
var XHRBody_1 = __webpack_require__(333);
var TransactionManager_1 = __webpack_require__(652);
var IMQAAgent_1 = __webpack_require__(61);
var XHR = /** @class */function () {
  function XHR() {
    this.header = new Header_1.Header();
    this.body = new XHRBody_1.XHRBody();
    this.startTime = 0;
    this.endTime = 0;
    var config = IMQAAgent_1.IMQAAgent.GetInstance().config;
    this.init(config);
  }
  XHR.prototype.init = function (config) {
    this.startTime = new Date().valueOf();
    this.header.set(config);
    this.header.webviewTxId = TransactionManager_1.TransactionManager.GetTxID();
  };
  XHR.prototype.create = function () {};
  XHR.prototype.finish = function () {};
  XHR.prototype.update = function () {};
  return XHR;
}();
exports.XHR = XHR;

/***/ }),

/***/ 333:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



var __assign = this && this.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.XHRBody = void 0;
var decode_1 = __webpack_require__(592);
var XHRBody = /** @class */function () {
  function XHRBody() {
    this.url = "";
    this.status = 0;
    this.method = "";
    this.type = "xhr";
    this.protocol = "";
    this.host = "";
    this.pathname = "";
    this.resource_type = "";
    this.duration = 0;
    this.startTime = 0;
    this.timing = {
      server: 0,
      wait: 0,
      network: 0
    };
  }
  XHRBody.prototype.setPerformanceData = function (data) {
    this.protocol = data.protocol;
    this.host = data.host;
    this.pathname = (0, decode_1.decodeUrl)(data.pathname);
    this.resource_type = data.resource_type;
    this.startTime = data.startTime;
    this.duration = data.duration;
    this.timing = __assign({}, data.timing);
  };
  XHRBody.prototype.setXHRData = function (httpObject) {
    this.status = httpObject.status;
    this.method = httpObject.method;
    this.url = (0, decode_1.decodeUrl)(httpObject.url);
  };
  return XHRBody;
}();
exports.XHRBody = XHRBody;

/***/ }),

/***/ 698:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.AjaxInterceptor = void 0;
var XHRManager_1 = __webpack_require__(753);
var AjaxInterceptor = /** @class */function () {
  function AjaxInterceptor() {}
  AjaxInterceptor.prototype.init = function () {
    var _this = this;
    if (typeof $ === "undefined") return;
    try {
      var jqueryMajorVersion = ($ === null || $ === void 0 ? void 0 : $.fn.jquery.split('.')[0]) || '3';
      if ($ && ($ === null || $ === void 0 ? void 0 : $.ajaxSetup) && jqueryMajorVersion === '1') {
        var XHR_1 = new XHRManager_1.XHRManager();
        $(document).ajaxComplete(function (event, xhr, settings) {
          XHR_1.pushHttp(_this.addHostToURL(settings.url), xhr.status, settings.type);
        });
      }
    } catch (e) {
      console.error('[IMQA error]:', e.message);
      return;
    }
  };
  AjaxInterceptor.prototype.addHostToURL = function (url) {
    if (!/^https?:\/\//i.test(url)) {
      var currentLocation = window.location;
      var path = this.removeLastPath(currentLocation.pathname);
      var host = currentLocation.protocol + "//" + currentLocation.host + path;
      if (url.indexOf("./") === 0) {
        // URL이 "./"로 시작하는 경우 "./"을 제거한 후 호스트 추가
        url = url.slice(2);
      } else if (url.charAt(0) === "/") {
        // URL이 "/"로 시작하는 경우 "/"을 제거한 후 호스트 추가
        url = url.slice(1);
      }
      url = host + "/" + url;
    }
    return url;
  };
  AjaxInterceptor.prototype.removeLastPath = function (pathname) {
    var lastIndex = pathname.lastIndexOf("/");
    if (lastIndex !== -1) {
      pathname = pathname.substring(0, lastIndex);
    }
    return pathname;
  };
  return AjaxInterceptor;
}();
exports.AjaxInterceptor = AjaxInterceptor;

/***/ }),

/***/ 306:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.XHRInterceptor = void 0;
var XHRManager_1 = __webpack_require__(753);
var Util_1 = __webpack_require__(410);
var IMQAAgent_1 = __webpack_require__(61);
function XHRInterceptor() {
  var open = window.XMLHttpRequest.prototype.open;
  var send = window.XMLHttpRequest.prototype.send;
  function openReplacement(method, url, async, user, password) {
    this._url = (0, Util_1.makeValidURL)(url);
    this._method = method;
    return open.apply(this, arguments);
  }
  function onReadyStateChangeReplacement(event) {
    var XHR = new XHRManager_1.XHRManager();
    if (event.target.readyState === 4 && !this._url.includes(IMQAAgent_1.IMQAAgent.GetInstance().config.collectorHost)) {
      XHR.pushHttp(this._url, this.status, this._method);
    }
    if (this._onreadystatechange) {
      return this._onreadystatechange.apply(this, arguments);
    }
  }
  function sendReplacement(data) {
    if (this.onreadystatechange && !this.onreadystatechange.byIMQA) {
      this._onreadystatechange = this.onreadystatechange;
    }
    // onReadyStateChangeReplacement가 재귀적으로 동작하는것을 방지하는 property 추가
    // onReadyStateChangeReplacement가 이미 replace 된 XHR 객체를 표시
    // @ts-ignore
    onReadyStateChangeReplacement.byIMQA = true;
    this.onreadystatechange = onReadyStateChangeReplacement;
    return send.apply(this, arguments);
  }
  window.XMLHttpRequest.prototype.open = openReplacement;
  window.XMLHttpRequest.prototype.send = sendReplacement;
}
exports.XHRInterceptor = XHRInterceptor;

/***/ }),

/***/ 753:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.XHRManager = void 0;
var XHR_1 = __webpack_require__(617);
var Util_1 = __webpack_require__(410);
var IMQAAgent_1 = __webpack_require__(61);
// interceptorXHR로 가로챈 XHR 요청들을
// PushXHR에 임시로 저장한다.
// Performance Entry의 정보를 저장한 요청과 합쳐서 SDK에 전송한다.
var XHRManager = /** @class */function () {
  function XHRManager() {
    XHRManager.HttpArray = [];
  }
  XHRManager.GetInstance = function () {
    if (!this.instance) {
      this.instance = new XHRManager();
    }
    return this.instance;
  };
  // 가로챈 XHR 요청을 배열(HTTPArray)에 push한다.
  XHRManager.prototype.pushHttp = function (url, status, method) {
    XHRManager.HttpArray.push({
      url: url,
      status: status,
      method: method
    });
    this.update();
  };
  // PerformanceObserver가 감지한 성능 정보와
  // HTTP 정보를 합치고 SDK에 보낸다.
  // 보낸 HTTP 정보는 삭제한다.
  XHRManager.prototype.update = function () {
    var xhr = new XHR_1.XHR();
    // @ts-ignore
    // performance에서 XHR만 가져오기
    var performanceXHRs = window.performance.getEntriesByType("resource").filter(function (entry) {
      return entry.initiatorType === "xmlhttprequest";
    });
    // 배열처리를 하지않기 위해서 배열에서 뽑아옴
    var httpArray = this.get().pop();
    // 배열에서 뽑아온 XHR를 performanceXHR과 매칭하여 있는경우 값을 가져옴
    var performanceEntry = this.getPerformancMatchXHR(performanceXHRs, httpArray.url);
    if (!performanceEntry) return;
    var _a = (0, Util_1.parseURL)(performanceEntry.name),
      protocol = _a.protocol,
      host = _a.host,
      pathname = _a.pathname;
    xhr.body.setPerformanceData({
      startTime: Math.floor(performanceEntry.startTime),
      duration: Math.floor(performanceEntry.duration),
      protocol: protocol,
      host: host,
      pathname: pathname,
      resource_type: performanceEntry.initiatorType,
      timing: getXHRTiming(performanceEntry)
    });
    xhr.body.setXHRData(httpArray);
    this.finish(xhr);
  };
  XHRManager.prototype.finish = function (xhr) {
    xhr.endTime = new Date().valueOf();
    IMQAAgent_1.IMQAAgent.GetInstance().send(xhr);
  };
  XHRManager.prototype.get = function () {
    return XHRManager.HttpArray;
  };
  XHRManager.prototype.getPerformancMatchXHR = function (performances, matchUrl) {
    var result = performances.find(function (entry) {
      return entry.name === matchUrl;
    });
    return result;
  };
  return XHRManager;
}();
exports.XHRManager = XHRManager;
function getXHRTiming(xhrPerfEntry) {
  var serverStart = xhrPerfEntry.requestStart ? xhrPerfEntry.requestStart : xhrPerfEntry.fetchStart;
  return {
    network: xhrPerfEntry.connectEnd - xhrPerfEntry.domainLookupStart,
    wait: xhrPerfEntry.requestStart - xhrPerfEntry.redirectStart,
    server: xhrPerfEntry.responseEnd - serverStart
  };
}

/***/ }),

/***/ 935:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  NIL: () => (/* reexport */ nil),
  parse: () => (/* reexport */ esm_browser_parse),
  stringify: () => (/* reexport */ esm_browser_stringify),
  v1: () => (/* reexport */ esm_browser_v1),
  v3: () => (/* reexport */ esm_browser_v3),
  v4: () => (/* reexport */ esm_browser_v4),
  v5: () => (/* reexport */ esm_browser_v5),
  validate: () => (/* reexport */ esm_browser_validate),
  version: () => (/* reexport */ esm_browser_version)
});

;// CONCATENATED MODULE: ./node_modules/uuid/dist/esm-browser/rng.js
// Unique ID creation requires a high quality random # generator. In the browser we therefore
// require the crypto API and do not support built-in fallback to lower quality random number
// generators (like Math.random()).
var getRandomValues;
var rnds8 = new Uint8Array(16);
function rng() {
  // lazy load so that environments that need to polyfill have a chance to do so
  if (!getRandomValues) {
    // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation. Also,
    // find the complete implementation of crypto (msCrypto) on IE11.
    getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto !== 'undefined' && typeof msCrypto.getRandomValues === 'function' && msCrypto.getRandomValues.bind(msCrypto);
    if (!getRandomValues) {
      throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
    }
  }
  return getRandomValues(rnds8);
}
;// CONCATENATED MODULE: ./node_modules/uuid/dist/esm-browser/regex.js
/* harmony default export */ const regex = (/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i);
;// CONCATENATED MODULE: ./node_modules/uuid/dist/esm-browser/validate.js

function validate(uuid) {
  return typeof uuid === 'string' && regex.test(uuid);
}
/* harmony default export */ const esm_browser_validate = (validate);
;// CONCATENATED MODULE: ./node_modules/uuid/dist/esm-browser/stringify.js

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */

var byteToHex = [];
for (var i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).substr(1));
}
function stringify(arr) {
  var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
  var uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase(); // Consistency check for valid UUID.  If this throws, it's likely due to one
  // of the following:
  // - One or more input array values don't map to a hex octet (leading to
  // "undefined" in the uuid)
  // - Invalid input values for the RFC `version` or `variant` fields

  if (!esm_browser_validate(uuid)) {
    throw TypeError('Stringified UUID is invalid');
  }
  return uuid;
}
/* harmony default export */ const esm_browser_stringify = (stringify);
;// CONCATENATED MODULE: ./node_modules/uuid/dist/esm-browser/v1.js

 // **`v1()` - Generate time-based UUID**
//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html

var _nodeId;
var _clockseq; // Previous uuid creation time

var _lastMSecs = 0;
var _lastNSecs = 0; // See https://github.com/uuidjs/uuid for API details

function v1(options, buf, offset) {
  var i = buf && offset || 0;
  var b = buf || new Array(16);
  options = options || {};
  var node = options.node || _nodeId;
  var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq; // node and clockseq need to be initialized to random values if they're not
  // specified.  We do this lazily to minimize issues related to insufficient
  // system entropy.  See #189

  if (node == null || clockseq == null) {
    var seedBytes = options.random || (options.rng || rng)();
    if (node == null) {
      // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
      node = _nodeId = [seedBytes[0] | 0x01, seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]];
    }
    if (clockseq == null) {
      // Per 4.2.2, randomize (14 bit) clockseq
      clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 0x3fff;
    }
  } // UUID timestamps are 100 nano-second units since the Gregorian epoch,
  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.

  var msecs = options.msecs !== undefined ? options.msecs : Date.now(); // Per 4.2.1.2, use count of uuid's generated during the current clock
  // cycle to simulate higher resolution clock

  var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1; // Time since last uuid creation (in msecs)

  var dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 10000; // Per 4.2.1.2, Bump clockseq on clock regression

  if (dt < 0 && options.clockseq === undefined) {
    clockseq = clockseq + 1 & 0x3fff;
  } // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
  // time interval

  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
    nsecs = 0;
  } // Per 4.2.1.2 Throw error if too many uuids are requested

  if (nsecs >= 10000) {
    throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
  }
  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq; // Per 4.1.4 - Convert from unix epoch to Gregorian epoch

  msecs += 12219292800000; // `time_low`

  var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
  b[i++] = tl >>> 24 & 0xff;
  b[i++] = tl >>> 16 & 0xff;
  b[i++] = tl >>> 8 & 0xff;
  b[i++] = tl & 0xff; // `time_mid`

  var tmh = msecs / 0x100000000 * 10000 & 0xfffffff;
  b[i++] = tmh >>> 8 & 0xff;
  b[i++] = tmh & 0xff; // `time_high_and_version`

  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version

  b[i++] = tmh >>> 16 & 0xff; // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)

  b[i++] = clockseq >>> 8 | 0x80; // `clock_seq_low`

  b[i++] = clockseq & 0xff; // `node`

  for (var n = 0; n < 6; ++n) {
    b[i + n] = node[n];
  }
  return buf || esm_browser_stringify(b);
}
/* harmony default export */ const esm_browser_v1 = (v1);
;// CONCATENATED MODULE: ./node_modules/uuid/dist/esm-browser/parse.js

function parse(uuid) {
  if (!esm_browser_validate(uuid)) {
    throw TypeError('Invalid UUID');
  }
  var v;
  var arr = new Uint8Array(16); // Parse ########-....-....-....-............

  arr[0] = (v = parseInt(uuid.slice(0, 8), 16)) >>> 24;
  arr[1] = v >>> 16 & 0xff;
  arr[2] = v >>> 8 & 0xff;
  arr[3] = v & 0xff; // Parse ........-####-....-....-............

  arr[4] = (v = parseInt(uuid.slice(9, 13), 16)) >>> 8;
  arr[5] = v & 0xff; // Parse ........-....-####-....-............

  arr[6] = (v = parseInt(uuid.slice(14, 18), 16)) >>> 8;
  arr[7] = v & 0xff; // Parse ........-....-....-####-............

  arr[8] = (v = parseInt(uuid.slice(19, 23), 16)) >>> 8;
  arr[9] = v & 0xff; // Parse ........-....-....-....-############
  // (Use "/" to avoid 32-bit truncation when bit-shifting high-order bytes)

  arr[10] = (v = parseInt(uuid.slice(24, 36), 16)) / 0x10000000000 & 0xff;
  arr[11] = v / 0x100000000 & 0xff;
  arr[12] = v >>> 24 & 0xff;
  arr[13] = v >>> 16 & 0xff;
  arr[14] = v >>> 8 & 0xff;
  arr[15] = v & 0xff;
  return arr;
}
/* harmony default export */ const esm_browser_parse = (parse);
;// CONCATENATED MODULE: ./node_modules/uuid/dist/esm-browser/v35.js


function stringToBytes(str) {
  str = unescape(encodeURIComponent(str)); // UTF8 escape

  var bytes = [];
  for (var i = 0; i < str.length; ++i) {
    bytes.push(str.charCodeAt(i));
  }
  return bytes;
}
var DNS = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';
var URL = '6ba7b811-9dad-11d1-80b4-00c04fd430c8';
/* harmony default export */ function v35(name, version, hashfunc) {
  function generateUUID(value, namespace, buf, offset) {
    if (typeof value === 'string') {
      value = stringToBytes(value);
    }
    if (typeof namespace === 'string') {
      namespace = esm_browser_parse(namespace);
    }
    if (namespace.length !== 16) {
      throw TypeError('Namespace must be array-like (16 iterable integer values, 0-255)');
    } // Compute hash of namespace and value, Per 4.3
    // Future: Use spread syntax when supported on all platforms, e.g. `bytes =
    // hashfunc([...namespace, ... value])`

    var bytes = new Uint8Array(16 + value.length);
    bytes.set(namespace);
    bytes.set(value, namespace.length);
    bytes = hashfunc(bytes);
    bytes[6] = bytes[6] & 0x0f | version;
    bytes[8] = bytes[8] & 0x3f | 0x80;
    if (buf) {
      offset = offset || 0;
      for (var i = 0; i < 16; ++i) {
        buf[offset + i] = bytes[i];
      }
      return buf;
    }
    return esm_browser_stringify(bytes);
  } // Function#name is not settable on some platforms (#270)

  try {
    generateUUID.name = name; // eslint-disable-next-line no-empty
  } catch (err) {} // For CommonJS default export support

  generateUUID.DNS = DNS;
  generateUUID.URL = URL;
  return generateUUID;
}
;// CONCATENATED MODULE: ./node_modules/uuid/dist/esm-browser/md5.js
/*
 * Browser-compatible JavaScript MD5
 *
 * Modification of JavaScript MD5
 * https://github.com/blueimp/JavaScript-MD5
 *
 * Copyright 2011, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * https://opensource.org/licenses/MIT
 *
 * Based on
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */
function md5(bytes) {
  if (typeof bytes === 'string') {
    var msg = unescape(encodeURIComponent(bytes)); // UTF8 escape

    bytes = new Uint8Array(msg.length);
    for (var i = 0; i < msg.length; ++i) {
      bytes[i] = msg.charCodeAt(i);
    }
  }
  return md5ToHexEncodedArray(wordsToMd5(bytesToWords(bytes), bytes.length * 8));
}
/*
 * Convert an array of little-endian words to an array of bytes
 */

function md5ToHexEncodedArray(input) {
  var output = [];
  var length32 = input.length * 32;
  var hexTab = '0123456789abcdef';
  for (var i = 0; i < length32; i += 8) {
    var x = input[i >> 5] >>> i % 32 & 0xff;
    var hex = parseInt(hexTab.charAt(x >>> 4 & 0x0f) + hexTab.charAt(x & 0x0f), 16);
    output.push(hex);
  }
  return output;
}
/**
 * Calculate output length with padding and bit length
 */

function getOutputLength(inputLength8) {
  return (inputLength8 + 64 >>> 9 << 4) + 14 + 1;
}
/*
 * Calculate the MD5 of an array of little-endian words, and a bit length.
 */

function wordsToMd5(x, len) {
  /* append padding */
  x[len >> 5] |= 0x80 << len % 32;
  x[getOutputLength(len) - 1] = len;
  var a = 1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d = 271733878;
  for (var i = 0; i < x.length; i += 16) {
    var olda = a;
    var oldb = b;
    var oldc = c;
    var oldd = d;
    a = md5ff(a, b, c, d, x[i], 7, -680876936);
    d = md5ff(d, a, b, c, x[i + 1], 12, -389564586);
    c = md5ff(c, d, a, b, x[i + 2], 17, 606105819);
    b = md5ff(b, c, d, a, x[i + 3], 22, -1044525330);
    a = md5ff(a, b, c, d, x[i + 4], 7, -176418897);
    d = md5ff(d, a, b, c, x[i + 5], 12, 1200080426);
    c = md5ff(c, d, a, b, x[i + 6], 17, -1473231341);
    b = md5ff(b, c, d, a, x[i + 7], 22, -45705983);
    a = md5ff(a, b, c, d, x[i + 8], 7, 1770035416);
    d = md5ff(d, a, b, c, x[i + 9], 12, -1958414417);
    c = md5ff(c, d, a, b, x[i + 10], 17, -42063);
    b = md5ff(b, c, d, a, x[i + 11], 22, -1990404162);
    a = md5ff(a, b, c, d, x[i + 12], 7, 1804603682);
    d = md5ff(d, a, b, c, x[i + 13], 12, -40341101);
    c = md5ff(c, d, a, b, x[i + 14], 17, -1502002290);
    b = md5ff(b, c, d, a, x[i + 15], 22, 1236535329);
    a = md5gg(a, b, c, d, x[i + 1], 5, -165796510);
    d = md5gg(d, a, b, c, x[i + 6], 9, -1069501632);
    c = md5gg(c, d, a, b, x[i + 11], 14, 643717713);
    b = md5gg(b, c, d, a, x[i], 20, -373897302);
    a = md5gg(a, b, c, d, x[i + 5], 5, -701558691);
    d = md5gg(d, a, b, c, x[i + 10], 9, 38016083);
    c = md5gg(c, d, a, b, x[i + 15], 14, -660478335);
    b = md5gg(b, c, d, a, x[i + 4], 20, -405537848);
    a = md5gg(a, b, c, d, x[i + 9], 5, 568446438);
    d = md5gg(d, a, b, c, x[i + 14], 9, -1019803690);
    c = md5gg(c, d, a, b, x[i + 3], 14, -187363961);
    b = md5gg(b, c, d, a, x[i + 8], 20, 1163531501);
    a = md5gg(a, b, c, d, x[i + 13], 5, -1444681467);
    d = md5gg(d, a, b, c, x[i + 2], 9, -51403784);
    c = md5gg(c, d, a, b, x[i + 7], 14, 1735328473);
    b = md5gg(b, c, d, a, x[i + 12], 20, -1926607734);
    a = md5hh(a, b, c, d, x[i + 5], 4, -378558);
    d = md5hh(d, a, b, c, x[i + 8], 11, -2022574463);
    c = md5hh(c, d, a, b, x[i + 11], 16, 1839030562);
    b = md5hh(b, c, d, a, x[i + 14], 23, -35309556);
    a = md5hh(a, b, c, d, x[i + 1], 4, -1530992060);
    d = md5hh(d, a, b, c, x[i + 4], 11, 1272893353);
    c = md5hh(c, d, a, b, x[i + 7], 16, -155497632);
    b = md5hh(b, c, d, a, x[i + 10], 23, -1094730640);
    a = md5hh(a, b, c, d, x[i + 13], 4, 681279174);
    d = md5hh(d, a, b, c, x[i], 11, -358537222);
    c = md5hh(c, d, a, b, x[i + 3], 16, -722521979);
    b = md5hh(b, c, d, a, x[i + 6], 23, 76029189);
    a = md5hh(a, b, c, d, x[i + 9], 4, -640364487);
    d = md5hh(d, a, b, c, x[i + 12], 11, -421815835);
    c = md5hh(c, d, a, b, x[i + 15], 16, 530742520);
    b = md5hh(b, c, d, a, x[i + 2], 23, -995338651);
    a = md5ii(a, b, c, d, x[i], 6, -198630844);
    d = md5ii(d, a, b, c, x[i + 7], 10, 1126891415);
    c = md5ii(c, d, a, b, x[i + 14], 15, -1416354905);
    b = md5ii(b, c, d, a, x[i + 5], 21, -57434055);
    a = md5ii(a, b, c, d, x[i + 12], 6, 1700485571);
    d = md5ii(d, a, b, c, x[i + 3], 10, -1894986606);
    c = md5ii(c, d, a, b, x[i + 10], 15, -1051523);
    b = md5ii(b, c, d, a, x[i + 1], 21, -2054922799);
    a = md5ii(a, b, c, d, x[i + 8], 6, 1873313359);
    d = md5ii(d, a, b, c, x[i + 15], 10, -30611744);
    c = md5ii(c, d, a, b, x[i + 6], 15, -1560198380);
    b = md5ii(b, c, d, a, x[i + 13], 21, 1309151649);
    a = md5ii(a, b, c, d, x[i + 4], 6, -145523070);
    d = md5ii(d, a, b, c, x[i + 11], 10, -1120210379);
    c = md5ii(c, d, a, b, x[i + 2], 15, 718787259);
    b = md5ii(b, c, d, a, x[i + 9], 21, -343485551);
    a = safeAdd(a, olda);
    b = safeAdd(b, oldb);
    c = safeAdd(c, oldc);
    d = safeAdd(d, oldd);
  }
  return [a, b, c, d];
}
/*
 * Convert an array bytes to an array of little-endian words
 * Characters >255 have their high-byte silently ignored.
 */

function bytesToWords(input) {
  if (input.length === 0) {
    return [];
  }
  var length8 = input.length * 8;
  var output = new Uint32Array(getOutputLength(length8));
  for (var i = 0; i < length8; i += 8) {
    output[i >> 5] |= (input[i / 8] & 0xff) << i % 32;
  }
  return output;
}
/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */

function safeAdd(x, y) {
  var lsw = (x & 0xffff) + (y & 0xffff);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return msw << 16 | lsw & 0xffff;
}
/*
 * Bitwise rotate a 32-bit number to the left.
 */

function bitRotateLeft(num, cnt) {
  return num << cnt | num >>> 32 - cnt;
}
/*
 * These functions implement the four basic operations the algorithm uses.
 */

function md5cmn(q, a, b, x, s, t) {
  return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b);
}
function md5ff(a, b, c, d, x, s, t) {
  return md5cmn(b & c | ~b & d, a, b, x, s, t);
}
function md5gg(a, b, c, d, x, s, t) {
  return md5cmn(b & d | c & ~d, a, b, x, s, t);
}
function md5hh(a, b, c, d, x, s, t) {
  return md5cmn(b ^ c ^ d, a, b, x, s, t);
}
function md5ii(a, b, c, d, x, s, t) {
  return md5cmn(c ^ (b | ~d), a, b, x, s, t);
}
/* harmony default export */ const esm_browser_md5 = (md5);
;// CONCATENATED MODULE: ./node_modules/uuid/dist/esm-browser/v3.js


var v3 = v35('v3', 0x30, esm_browser_md5);
/* harmony default export */ const esm_browser_v3 = (v3);
;// CONCATENATED MODULE: ./node_modules/uuid/dist/esm-browser/v4.js


function v4(options, buf, offset) {
  options = options || {};
  var rnds = options.random || (options.rng || rng)(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

  if (buf) {
    offset = offset || 0;
    for (var i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }
    return buf;
  }
  return esm_browser_stringify(rnds);
}
/* harmony default export */ const esm_browser_v4 = (v4);
;// CONCATENATED MODULE: ./node_modules/uuid/dist/esm-browser/sha1.js
// Adapted from Chris Veness' SHA1 code at
// http://www.movable-type.co.uk/scripts/sha1.html
function f(s, x, y, z) {
  switch (s) {
    case 0:
      return x & y ^ ~x & z;
    case 1:
      return x ^ y ^ z;
    case 2:
      return x & y ^ x & z ^ y & z;
    case 3:
      return x ^ y ^ z;
  }
}
function ROTL(x, n) {
  return x << n | x >>> 32 - n;
}
function sha1(bytes) {
  var K = [0x5a827999, 0x6ed9eba1, 0x8f1bbcdc, 0xca62c1d6];
  var H = [0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476, 0xc3d2e1f0];
  if (typeof bytes === 'string') {
    var msg = unescape(encodeURIComponent(bytes)); // UTF8 escape

    bytes = [];
    for (var i = 0; i < msg.length; ++i) {
      bytes.push(msg.charCodeAt(i));
    }
  } else if (!Array.isArray(bytes)) {
    // Convert Array-like to Array
    bytes = Array.prototype.slice.call(bytes);
  }
  bytes.push(0x80);
  var l = bytes.length / 4 + 2;
  var N = Math.ceil(l / 16);
  var M = new Array(N);
  for (var _i = 0; _i < N; ++_i) {
    var arr = new Uint32Array(16);
    for (var j = 0; j < 16; ++j) {
      arr[j] = bytes[_i * 64 + j * 4] << 24 | bytes[_i * 64 + j * 4 + 1] << 16 | bytes[_i * 64 + j * 4 + 2] << 8 | bytes[_i * 64 + j * 4 + 3];
    }
    M[_i] = arr;
  }
  M[N - 1][14] = (bytes.length - 1) * 8 / Math.pow(2, 32);
  M[N - 1][14] = Math.floor(M[N - 1][14]);
  M[N - 1][15] = (bytes.length - 1) * 8 & 0xffffffff;
  for (var _i2 = 0; _i2 < N; ++_i2) {
    var W = new Uint32Array(80);
    for (var t = 0; t < 16; ++t) {
      W[t] = M[_i2][t];
    }
    for (var _t = 16; _t < 80; ++_t) {
      W[_t] = ROTL(W[_t - 3] ^ W[_t - 8] ^ W[_t - 14] ^ W[_t - 16], 1);
    }
    var a = H[0];
    var b = H[1];
    var c = H[2];
    var d = H[3];
    var e = H[4];
    for (var _t2 = 0; _t2 < 80; ++_t2) {
      var s = Math.floor(_t2 / 20);
      var T = ROTL(a, 5) + f(s, b, c, d) + e + K[s] + W[_t2] >>> 0;
      e = d;
      d = c;
      c = ROTL(b, 30) >>> 0;
      b = a;
      a = T;
    }
    H[0] = H[0] + a >>> 0;
    H[1] = H[1] + b >>> 0;
    H[2] = H[2] + c >>> 0;
    H[3] = H[3] + d >>> 0;
    H[4] = H[4] + e >>> 0;
  }
  return [H[0] >> 24 & 0xff, H[0] >> 16 & 0xff, H[0] >> 8 & 0xff, H[0] & 0xff, H[1] >> 24 & 0xff, H[1] >> 16 & 0xff, H[1] >> 8 & 0xff, H[1] & 0xff, H[2] >> 24 & 0xff, H[2] >> 16 & 0xff, H[2] >> 8 & 0xff, H[2] & 0xff, H[3] >> 24 & 0xff, H[3] >> 16 & 0xff, H[3] >> 8 & 0xff, H[3] & 0xff, H[4] >> 24 & 0xff, H[4] >> 16 & 0xff, H[4] >> 8 & 0xff, H[4] & 0xff];
}
/* harmony default export */ const esm_browser_sha1 = (sha1);
;// CONCATENATED MODULE: ./node_modules/uuid/dist/esm-browser/v5.js


var v5 = v35('v5', 0x50, esm_browser_sha1);
/* harmony default export */ const esm_browser_v5 = (v5);
;// CONCATENATED MODULE: ./node_modules/uuid/dist/esm-browser/nil.js
/* harmony default export */ const nil = ('00000000-0000-0000-0000-000000000000');
;// CONCATENATED MODULE: ./node_modules/uuid/dist/esm-browser/version.js

function version(uuid) {
  if (!esm_browser_validate(uuid)) {
    throw TypeError('Invalid UUID');
  }
  return parseInt(uuid.substr(14, 1), 16);
}
/* harmony default export */ const esm_browser_version = (version);
;// CONCATENATED MODULE: ./node_modules/uuid/dist/esm-browser/index.js










/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(261);
/******/ 	
/******/ })()
;
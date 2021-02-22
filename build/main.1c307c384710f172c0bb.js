(()=>{"use strict";var __webpack_modules__={7052:()=>{eval('\n;// CONCATENATED MODULE: ./plugins/timeline/Timeline.js\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\nvar LAYOUT = "\\n    <div class=\\"loadingStatus\\">Loading...</div>\\n    <div class=\\"progressBar\\"></div>\\n    <canvas class=\\"view\\"></canvas>\\n    <div class=\\"controlsWrapper\\">\\n      <button class=\\"playButton\\">Play</button>\\n      <input class=\\"rangeControl\\" type=\\"range\\" value=\\"0\\" min=\\"0\\">\\n    </div>\\n";\n\nvar Timeline = /*#__PURE__*/function () {\n  function Timeline(_ref) {\n    var containerId = _ref.containerId,\n        namePattern = _ref.namePattern,\n        fileExtension = _ref.fileExtension,\n        framesCount = _ref.framesCount,\n        framesFolder = _ref.framesFolder,\n        fps = _ref.fps;\n\n    _classCallCheck(this, Timeline);\n\n    _defineProperty(this, "currentFrame", 0);\n\n    _defineProperty(this, "isPlaying", false);\n\n    _defineProperty(this, "data", []);\n\n    _defineProperty(this, "interval", void 0);\n\n    this.containerId = containerId;\n    this.namePattern = namePattern;\n    this.fileExtension = fileExtension;\n    this.framesCount = framesCount;\n    this.framesFolder = framesFolder;\n    this.fps = fps;\n  }\n\n  _createClass(Timeline, [{\n    key: "init",\n    value: function init() {\n      var _this = this;\n\n      var container = document.getElementById(this.containerId);\n      container.classList.add("timelineWrapper");\n      container.innerHTML = LAYOUT;\n      this.loadingStatus = container.getElementsByClassName("loadingStatus")[0];\n      this.progressBar = container.getElementsByClassName("progressBar")[0];\n      this.playButton = container.getElementsByClassName("playButton")[0];\n      this.rangeControl = container.getElementsByClassName("rangeControl")[0];\n      this.rangeControl.max = String(this.framesCount - 1);\n      this.view = container.getElementsByClassName("view")[0];\n      this.ctx = this.view.getContext(\'2d\');\n      this.generateFrameData();\n      this.cacheImages();\n      this.setFrame(1);\n      this.rangeControl.addEventListener("change", function () {\n        _this.setFrame(+_this.rangeControl.value);\n      });\n      this.rangeControl.addEventListener("input", function () {\n        _this.pause();\n\n        _this.setFrame(+_this.rangeControl.value);\n      });\n      this.playButton.addEventListener("click", function () {\n        if (_this.isPlaying) {\n          _this.pause();\n        } else {\n          _this.play();\n        }\n      });\n    }\n  }, {\n    key: "setLoadingProgress",\n    value: function setLoadingProgress(percentage) {\n      this.progressBar.style.width = percentage + "%";\n      this.loadingStatus.innerText = "Please wait, loading... ".concat(Math.ceil(100 - percentage), "%");\n\n      if (!percentage) {\n        this.progressBar.remove();\n        this.loadingStatus.remove();\n        this.play();\n      }\n    }\n  }, {\n    key: "generateFrameData",\n    value: function generateFrameData() {\n      for (var i = 0; i < this.framesCount; i++) {\n        this.data.push(".".concat(this.framesFolder, "/").concat(this.namePattern, "_").concat(("0000" + i).slice(-5), ".").concat(this.fileExtension));\n      }\n    }\n  }, {\n    key: "cacheImages",\n    value: function cacheImages() {\n      var _this2 = this;\n\n      var list = [];\n\n      var _loop = function _loop(i) {\n        fetch(_this2.data[i]).then(function () {\n          list.push(i);\n\n          _this2.setLoadingProgress(100 - list.length / _this2.data.length * 100);\n        });\n      };\n\n      for (var i = 0; i < this.data.length; i++) {\n        _loop(i);\n      }\n    }\n  }, {\n    key: "setFrame",\n    value: function setFrame(frame) {\n      var _this3 = this;\n\n      this.currentFrame = frame;\n      this.rangeControl.value = frame;\n      var image = new Image();\n      image.src = ".".concat(this.framesFolder, "/").concat(this.namePattern, "_").concat(("0000" + frame).slice(-5), ".").concat(this.fileExtension);\n\n      image.onload = function () {\n        _this3.view.height = image.naturalHeight;\n        _this3.view.width = image.naturalWidth;\n\n        _this3.ctx.drawImage(image, 0, 0);\n      };\n    }\n  }, {\n    key: "play",\n    value: function play() {\n      var _this4 = this;\n\n      this.isPlaying = true;\n      this.playButton.innerText = "Pause";\n      this.interval = setInterval(function () {\n        if (_this4.currentFrame < _this4.framesCount - 1) {\n          _this4.currentFrame += 1;\n\n          _this4.setFrame(_this4.currentFrame);\n        } else {\n          _this4.currentFrame = 0;\n\n          _this4.pause();\n        }\n      }, 1000 / this.fps);\n    }\n  }, {\n    key: "pause",\n    value: function pause() {\n      clearInterval(this.interval);\n      this.isPlaying = false;\n      this.playButton.innerText = "Play";\n    }\n  }, {\n    key: "destroy",\n    value: function destroy() {\n      document.getElementById(this.containerId).innerHTML = "";\n      clearInterval(this.interval);\n    }\n  }]);\n\n  return Timeline;\n}();\n\n\n;// CONCATENATED MODULE: ./plugins/timeline/index.js\n\n;// CONCATENATED MODULE: ./index.js\nfunction _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\n\n\nvar popup = document.getElementById("timeline-wrapper");\nvar points = document.getElementsByClassName("point");\nvar timeline;\nvar seqCount = {\n  "INT3D-123": 1043\n};\n\nvar showVideo = function showVideo(id) {\n  popup.classList.add("opened");\n  timeline = new Timeline({\n    containerId: "timeline",\n    namePattern: id,\n    fileExtension: "jpg",\n    framesCount: seqCount[id],\n    framesFolder: "/static/".concat(id),\n    fps: 15\n  });\n  timeline.init();\n};\n\nvar closePopUp = function closePopUp() {\n  if (popup.classList.contains("opened")) {\n    popup.classList.remove("opened");\n    timeline.destroy();\n  }\n};\n\nvar _iterator = _createForOfIteratorHelper(points),\n    _step;\n\ntry {\n  var _loop = function _loop() {\n    var point = _step.value;\n    point.addEventListener("click", function () {\n      showVideo(point.getAttribute("data-point"));\n    });\n  };\n\n  for (_iterator.s(); !(_step = _iterator.n()).done;) {\n    _loop();\n  }\n} catch (err) {\n  _iterator.e(err);\n} finally {\n  _iterator.f();\n}\n\ndocument.getElementById("closeButton").addEventListener("click", function () {\n  closePopUp();\n});\n\n//# sourceURL=webpack:///./index.js_+_2_modules?')}},__webpack_module_cache__={};function __webpack_require__(n){if(__webpack_module_cache__[n])return __webpack_module_cache__[n].exports;var e=__webpack_module_cache__[n]={exports:{}};return __webpack_modules__[n](e,e.exports,__webpack_require__),e.exports}__webpack_require__.m=__webpack_modules__,__webpack_require__.x=n=>{},__webpack_require__.o=(n,e)=>Object.prototype.hasOwnProperty.call(n,e),(()=>{var n={179:0},e=[[8168,188,976,696],[7052,188,976,696]],t=n=>{},r=(r,i)=>{for(var a,o,[s,l,c,_]=i,u=0,p=[];u<s.length;u++)o=s[u],__webpack_require__.o(n,o)&&n[o]&&p.push(n[o][0]),n[o]=0;for(a in l)__webpack_require__.o(l,a)&&(__webpack_require__.m[a]=l[a]);for(c&&c(__webpack_require__),r&&r(i);p.length;)p.shift()();return _&&e.push.apply(e,_),t()},i=self.webpackChunk=self.webpackChunk||[];function a(){for(var t,r=0;r<e.length;r++){for(var i=e[r],a=!0,o=1;o<i.length;o++){var s=i[o];0!==n[s]&&(a=!1)}a&&(e.splice(r--,1),t=__webpack_require__(__webpack_require__.s=i[0]))}return 0===e.length&&(__webpack_require__.x(),__webpack_require__.x=n=>{}),t}i.forEach(r.bind(null,0)),i.push=r.bind(null,i.push.bind(i));var o=__webpack_require__.x;__webpack_require__.x=()=>(__webpack_require__.x=o||(n=>{}),(t=a)())})(),__webpack_require__.x()})();
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/assets.js":
/*!*******************************!*\
  !*** ./src/modules/assets.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "assets": () => (/* binding */ assets)
/* harmony export */ });
/* harmony import */ var _assets_skills_canvas_svg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../assets/skills/canvas.svg */ "./src/assets/skills/canvas.svg");
/* harmony import */ var _assets_skills_css_svg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../assets/skills/css.svg */ "./src/assets/skills/css.svg");
/* harmony import */ var _assets_skills_git_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../assets/skills/git.svg */ "./src/assets/skills/git.svg");
/* harmony import */ var _assets_skills_github_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../assets/skills/github.svg */ "./src/assets/skills/github.svg");
/* harmony import */ var _assets_skills_html_svg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../assets/skills/html.svg */ "./src/assets/skills/html.svg");
/* harmony import */ var _assets_skills_js_svg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../assets/skills/js.svg */ "./src/assets/skills/js.svg");
/* harmony import */ var _assets_skills_react_svg__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../assets/skills/react.svg */ "./src/assets/skills/react.svg");
/* harmony import */ var _assets_skills_sass_svg__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../assets/skills/sass.svg */ "./src/assets/skills/sass.svg");
/* harmony import */ var _assets_skills_webpack_svg__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../assets/skills/webpack.svg */ "./src/assets/skills/webpack.svg");









var assets = function () {
  var selectors = {};
  var loadAssets = function loadAssets() {
    var assets = [_assets_skills_canvas_svg__WEBPACK_IMPORTED_MODULE_0__, _assets_skills_css_svg__WEBPACK_IMPORTED_MODULE_1__, _assets_skills_git_svg__WEBPACK_IMPORTED_MODULE_2__, _assets_skills_github_svg__WEBPACK_IMPORTED_MODULE_3__, _assets_skills_html_svg__WEBPACK_IMPORTED_MODULE_4__, _assets_skills_js_svg__WEBPACK_IMPORTED_MODULE_5__, _assets_skills_react_svg__WEBPACK_IMPORTED_MODULE_6__, _assets_skills_sass_svg__WEBPACK_IMPORTED_MODULE_7__, _assets_skills_webpack_svg__WEBPACK_IMPORTED_MODULE_8__];
    for (var _i = 0, _assets = assets; _i < _assets.length; _i++) {
      var i = _assets[_i];
      // It matches word characters before the .extension (e.g. "canvas" in "../assets/skills/canvas.svg")
      var regEx = /\w+(?=.(png|svg|jpe?g|gif|avif))/;

      // e.g. selectors[canvasImg] = document.querySelector(".canvas");
      selectors[i] = document.querySelector(".".concat(i.match(regEx)[0]));
      selectors[i].src = i;
    }
  };
  return {
    loadAssets: loadAssets
  };
}();

/***/ }),

/***/ "./src/modules/color.js":
/*!******************************!*\
  !*** ./src/modules/color.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "color": () => (/* binding */ color)
/* harmony export */ });
/* harmony import */ var _cursor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cursor */ "./src/modules/cursor.js");

var color = function () {
  var selectors = {
    canvas: document.querySelector(".color-picker canvas"),
    colorCheckbox: document.querySelector(".color__checkbox"),
    picker: document.querySelector(".color-picker"),
    pointer: document.querySelector(".pointer")
  };
  var picker = {
    active: true,
    context: selectors.canvas.getContext("2d", {
      willReadFrequently: true
    }),
    drag: false,
    pixel: undefined,
    x: 0
  };

  // The canvas context is filled linear gradient with the specified direction and colors
  var linearGradient = function linearGradient(context, x0, y0, x1, y1, colors) {
    if (colors && colors.length > 1) {
      var gradient = context.createLinearGradient(x0, y0, x1, y1);
      for (var i = 0; i < colors.length; i++) {
        // The color stops are set dinamically, based on the number of passed colors
        gradient.addColorStop(i * (1 / (colors.length - 1)), colors[i]);
      }
      context.fillStyle = gradient;
      context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    }
  };

  // It moves the pointer horizontally within the canvas, with range minWidth <= x <= maxWidth and assigns the position to picker.x
  var movePointerX = function movePointerX(x) {
    var canvasRect = selectors.canvas.getBoundingClientRect();
    var minWidth = selectors.pointer.offsetWidth / 2;
    var maxWidth = canvasRect.width - selectors.pointer.offsetWidth / 2;
    picker.x = x - canvasRect.left;
    {
      picker.x < minWidth && (picker.x = minWidth);
    }
    {
      picker.x > maxWidth && (picker.x = maxWidth);
    }
    selectors.pointer.style.left = "".concat(picker.x, "px");
  };

  // It assigns the rgba color of ImageData at position picker.x to picker.pixel and changes the value of --colorContent
  var setColor = function setColor() {
    var style = document.documentElement.style;
    picker.pixel = picker.context.getImageData(picker.x, 0, 1, 1).data;
    if (picker.active) {
      style.setProperty("--colorContent", "rgba(".concat(picker.pixel[0], ",").concat(picker.pixel[1], ",").concat(picker.pixel[2], ", 1)"));
    }
  };
  var eventHandler = function eventHandler() {
    //** Mouse events (click, drag functionality)
    // If color checkbox.checked, color picker width is set from 0 to 12.5rem (200px; same as canvas); otherwise it is reset
    selectors.colorCheckbox.addEventListener("click", function () {
      if (selectors.colorCheckbox.checked) {
        selectors.picker.style.animation = "colorPickerWidth 150ms forwards ease-in-out";
        picker.active = true;
      } else {
        selectors.picker.style.animation = "none";
        picker.active = false;
      }
    });

    // Color picker reset if clicking on elements other than the color picker itself
    window.addEventListener("mousedown", function (e) {
      if (e.target !== selectors.canvas && e.target !== selectors.pointer && e.target !== selectors.colorCheckbox) {
        selectors.colorCheckbox.checked = false;
        selectors.picker.style.animation = "none";
        picker.active = false;
      }
    });

    // The custom cursor is hidden while hovering on the color picker
    selectors.picker.addEventListener("mouseenter", function () {
      _cursor__WEBPACK_IMPORTED_MODULE_0__.cursor.selectors.cursor.style.visibility = "hidden";
    });
    selectors.picker.addEventListener("mouseleave", function () {
      _cursor__WEBPACK_IMPORTED_MODULE_0__.cursor.selectors.cursor.style.visibility = "visible";
    });
    selectors.picker.addEventListener("mousedown", function (e) {
      if (e.target === selectors.pointer) {
        picker.drag = true;
      }
      movePointerX(e.clientX);
    });
    selectors.canvas.addEventListener("mousemove", function (e) {
      if (picker.drag) {
        movePointerX(e.clientX);
      }
    });

    // The color is set whenever the mouse button is released (both when clicking on the canvas or dragging the pointer)
    window.addEventListener("mouseup", function (e) {
      if (e.target !== selectors.colorCheckbox) {
        setColor();
        picker.drag = false;
      }
    });

    //** Touch events (drag functionality)
    selectors.picker.addEventListener("touchstart", function (e) {
      if (e.target === selectors.pointer) {
        picker.drag = true;
      }
    }, {
      passive: true
    });
    selectors.picker.addEventListener("touchmove", function (e) {
      if (picker.drag) {
        movePointerX(e.touches[0].clientX);
      }
    }, {
      passive: true
    });
    selectors.picker.addEventListener("touchend", function () {
      setColor();
      picker.drag = false;
    });

    //** Keyboard events
    // ArrowLeft: the pointer moves 1px left; ArrowRight: the pointer moves 1px right. The color is set every time
    window.addEventListener("keydown", function (e) {
      var canvasRect = selectors.canvas.getBoundingClientRect();
      if (picker.active) {
        switch (e.key) {
          case "ArrowLeft":
            {
              picker.x -= 1;
              break;
            }
          case "ArrowRight":
            {
              picker.x += 1;
              break;
            }
          default:
            {
              return false;
            }
        }
      }
      movePointerX(picker.x + canvasRect.left);
      setColor();
    });
  };

  // The canvas context is filled linear gradient
  linearGradient(picker.context, selectors.canvas.offsetWidth, 0, 0, 0, ["rgb(255, 0, 0)", "rgb(255, 0, 255)", "rgb(0, 106, 255)", "rgb(0, 255, 255)", "rgb(0, 255, 0)", "rgb(255, 255, 0)", "rgb(255, 165, 0)", "rgb(255, 255, 255)", "rgb(255, 255, 255)"]);
  return {
    eventHandler: eventHandler
  };
}();

/***/ }),

/***/ "./src/modules/cursor.js":
/*!*******************************!*\
  !*** ./src/modules/cursor.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "cursor": () => (/* binding */ cursor)
/* harmony export */ });
var cursor = function () {
  var selectors = {
    cursor: document.querySelector(".cursor")
  };
  var moveCursor = function moveCursor(e) {
    selectors.cursor.style.left = "".concat(e.clientX, "px");
    selectors.cursor.style.top = "".concat(e.clientY, "px");

    // The cursor style changes while hovering on clickable elements
    if (e.target.classList.contains("clickable")) {
      selectors.cursor.classList.add("cursor--active");
    } else {
      selectors.cursor.classList.remove("cursor--active");
    }
  };
  var showCursorOnDesktop = function showCursorOnDesktop() {
    var isMobile = function isMobile() {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Kindle/i.test(navigator.userAgent);
    };
    {
      !isMobile() && (selectors.cursor.style.display = "block");
    }
  };
  var eventHandler = function eventHandler() {
    window.addEventListener("DOMContentLoaded", function () {
      showCursorOnDesktop();
    });
    window.addEventListener("mousemove", function (e) {
      moveCursor(e);
    });
  };
  return {
    selectors: selectors,
    eventHandler: eventHandler
  };
}();

/***/ }),

/***/ "./src/modules/language.js":
/*!*********************************!*\
  !*** ./src/modules/language.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "language": () => (/* binding */ language)
/* harmony export */ });
/* harmony import */ var _language_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../language.json */ "./src/language.json");

var language = function () {
  var selectors = {
    langCheckbox: document.querySelector(".lang__checkbox")
  };
  var loadContent = function loadContent(lang) {
    var _loop = function _loop(i) {
      // Properties in language.json are named like classes/ids
      selectors[i] = document.querySelector(i);

      // Fade effect on language change
      if (selectors[i].classList.contains("fade")) {
        selectors[i].style.transition = "opacity 500ms ease-in-out";
        selectors[i].style.opacity = "0";
      }
      setTimeout(function () {
        selectors[i].innerHTML = _language_json__WEBPACK_IMPORTED_MODULE_0__[lang][i];
        selectors[i].style.opacity = "1";
      }, 750);
    };
    for (var i in _language_json__WEBPACK_IMPORTED_MODULE_0__.en) {
      _loop(i);
    }
  };
  var eventHandler = function eventHandler() {
    window.addEventListener("DOMContentLoaded", function () {
      loadContent("en");
    });
    selectors.langCheckbox.addEventListener("click", function () {
      // Default lang "en"; "it" if lang checkbox.checked
      var lang = selectors.langCheckbox.checked ? "it" : "en";
      loadContent(lang);
    });
  };
  return {
    eventHandler: eventHandler
  };
}();

/***/ }),

/***/ "./src/modules/section.js":
/*!********************************!*\
  !*** ./src/modules/section.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "section": () => (/* binding */ section)
/* harmony export */ });
var section = function () {
  var activeSection = null;
  var sectionHandler = function sectionHandler(sectionName) {
    var section = document.querySelector("#".concat(sectionName));
    var content = document.querySelector("#".concat(sectionName, "__content"));

    // dataset used to remove unnecessary content while a specific section is active
    // e.g. while the active section is "about", then the menu, shapes title, pyramid and sphere are hidden
    section.parentElement.dataset["section"] = sectionName;

    // The called section is displayed and its content slides down
    if (section !== activeSection) {
      activeSection = section;
      section.style.animation = "fadeIn 250ms forwards";
      content.style.animation = "contentSlideDown 500ms forwards";
    } else {
      activeSection = null;
      section.style.animation = "fadeOut 250ms forwards";
      content.style.animation = "contentSlideUp 500ms forwards";
    }
  };
  return {
    sectionHandler: sectionHandler
  };
}();

/***/ }),

/***/ "./src/modules/shape.js":
/*!******************************!*\
  !*** ./src/modules/shape.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "shape": () => (/* binding */ shape)
/* harmony export */ });
var shape = function () {
  var activeSectionName = null;
  var selectors = {
    pyramid: document.querySelector(".pyramid"),
    sphere: document.querySelector(".sphere")
  };
  var shapeHandler = function shapeHandler(sectionName) {
    var bodyComputedStyle = window.getComputedStyle(document.body);
    var style = document.documentElement.style;

    /* Active section:
    - "about": the cube sides translate on the Z axis (default value is 0)
    - "skills": the pyramid rotates on the Y axis, while keeping its other transform values
    - "contact": the sphere scale increases */
    switch (sectionName) {
      case "about":
        {
          if (sectionName !== activeSectionName) {
            activeSectionName = sectionName;
            style.setProperty("--cubeSideTranslateZ", "1.75rem");
          } else {
            activeSectionName = null;
            style.setProperty("--cubeSideTranslateZ", "0rem");
          }
          break;
        }
      case "skills":
        {
          if (sectionName !== activeSectionName) {
            activeSectionName = sectionName;
            selectors.pyramid.style.transform = "".concat(bodyComputedStyle.getPropertyValue("--pyramidTransform"), " rotateY(-180deg)");
          } else {
            activeSectionName = null;
            selectors.pyramid.style.transform = "".concat(bodyComputedStyle.getPropertyValue("--pyramidTransform"));
          }
          break;
        }
      case "contact":
        {
          if (sectionName !== activeSectionName) {
            activeSectionName = sectionName;
            selectors.sphere.style.transform = "scale(4)";
          } else {
            activeSectionName = null;
            selectors.sphere.style.transform = "scale(1)";
          }
          break;
        }
      default:
        {
          return false;
        }
    }
  };
  return {
    shapeHandler: shapeHandler
  };
}();

/***/ }),

/***/ "./src/modules/viewport.js":
/*!*********************************!*\
  !*** ./src/modules/viewport.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "viewport": () => (/* binding */ viewport)
/* harmony export */ });
var viewport = function () {
  var setViewportHeight = function setViewportHeight() {
    var style = document.documentElement.style;
    style.setProperty("--vh", "".concat(window.innerHeight, "px"));
  };
  var eventHandler = function eventHandler() {
    window.addEventListener("DOMContentLoaded", function () {
      // document.body is initially hidden to prevent FOUC (Flash Of Unstyled Content)
      document.body.style.visibility = "visible";
      setViewportHeight();
    });
    window.addEventListener("resize", function () {
      setViewportHeight();
    });
  };
  return {
    eventHandler: eventHandler
  };
}();

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/scss/main.scss":
/*!*********************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/scss/main.scss ***!
  \*********************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
___CSS_LOADER_EXPORT___.push([module.id, "@import url(https://fonts.googleapis.com/css2?family=Comfortaa&display=swap);"]);
___CSS_LOADER_EXPORT___.push([module.id, "@import url(https://fonts.googleapis.com/css2?family=Gugi&display=swap);"]);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "@keyframes fadeIn {\n  0% {\n    opacity: 0;\n    visibility: hidden;\n  }\n  100% {\n    opacity: 1;\n    visibility: visible;\n  }\n}\n@keyframes fadeOut {\n  0% {\n    opacity: 1;\n    visibility: visible;\n  }\n  100% {\n    opacity: 0;\n    visibility: hidden;\n  }\n}\n@keyframes colorPickerWidth {\n  100% {\n    width: 12.5rem;\n  }\n}\n@keyframes contentSlideDown {\n  0% {\n    transform: translateY(-2rem);\n  }\n  100% {\n    transform: translateY(0);\n  }\n}\n@keyframes contentSlideUp {\n  0% {\n    transform: translateY(0);\n  }\n  100% {\n    transform: translateY(-2rem);\n  }\n}\n@keyframes loaderScale {\n  50% {\n    transform: scale(1%);\n  }\n  100% {\n    transform: scale(100000%);\n  }\n}\n@keyframes loaderStroke {\n  100% {\n    stroke-dashoffset: 0;\n  }\n}\n@media screen and (min-width: 320px) {\n  #about {\n    padding: 6rem 2.5rem !important;\n  }\n  .color {\n    display: block !important;\n  }\n  .color-picker {\n    animation: colorPickerWidth 150ms forwards ease-in-out;\n    display: block !important;\n  }\n  .cube__wrapper {\n    left: 10% !important;\n    transform: scale(1.1);\n  }\n  .skill {\n    align-items: center;\n    flex-direction: row !important;\n  }\n}\n@media screen and (min-width: 480px) {\n  #about {\n    padding: 5rem 4rem !important;\n  }\n  .cube__wrapper {\n    left: 15% !important;\n  }\n  .logo__text {\n    display: block !important;\n  }\n  .menu button {\n    font-size: 0.875rem !important;\n  }\n}\n@media screen and (min-width: 541px) {\n  #about {\n    grid-template-columns: 1fr 2fr !important;\n    padding: 3.25rem 4rem 4rem 2rem !important;\n  }\n  #about__content {\n    max-height: 100% !important;\n  }\n  .cube__wrapper {\n    bottom: 45% !important;\n    left: 5% !important;\n  }\n  .pyramid__wrapper {\n    bottom: 20% !important;\n    right: 5% !important;\n  }\n  #skills {\n    justify-content: center !important;\n    padding: 2rem 0 2.5rem 0 !important;\n  }\n  #skills__content {\n    width: 60% !important;\n  }\n  #skills__content .icon {\n    margin: 0 1rem !important;\n  }\n  .sphere {\n    right: 15% !important;\n    top: 5% !important;\n  }\n}\n@media screen and (min-width: 1024px) {\n  #about {\n    padding: 12.5% !important;\n  }\n  .cube__wrapper {\n    bottom: 30% !important;\n    left: 10% !important;\n  }\n  .email {\n    font-size: 4vw !important;\n  }\n  .pyramid__wrapper {\n    bottom: 15% !important;\n    right: 15% !important;\n    transform: scale(1.5);\n  }\n  #shapes .title {\n    font-size: 2.8125rem !important;\n  }\n  #skills__content {\n    width: 50% !important;\n  }\n  #skills__content .icon {\n    margin: 0 1.5rem !important;\n  }\n  .sphere {\n    height: calc(var(--shapeSize) * 1.15) !important;\n    right: 20% !important;\n    top: 15% !important;\n    width: calc(var(--shapeSize) * 1.15) !important;\n  }\n}\n@media screen and (min-width: 1441px) {\n  #skills {\n    padding: 0 !important;\n  }\n}\n@media screen and (max-height: 320px) {\n  .cube__wrapper {\n    bottom: 40% !important;\n    transform: scale(0.9);\n  }\n}\n@media screen and (min-height: 576px) {\n  .cube__wrapper {\n    bottom: 25% !important;\n  }\n  .pyramid__wrapper {\n    bottom: 10% !important;\n  }\n}\n@media screen and (min-height: 1024px) {\n  #about {\n    padding: 25% 10% !important;\n  }\n  .cube__wrapper {\n    bottom: 35% !important;\n    left: 15% !important;\n  }\n  .pyramid__wrapper {\n    bottom: 15% !important;\n    right: 20% !important;\n    transform: scale(1.5) !important;\n  }\n  #shapes .title {\n    font-size: 2.8125rem !important;\n  }\n  .sphere {\n    height: calc(var(--shapeSize) * 1.15) !important;\n    top: 22.5% !important;\n    width: calc(var(--shapeSize) * 1.15) !important;\n  }\n}\n:root {\n  --colorBgPrimary: rgba(37, 41, 50, 1);\n  --colorBgSecondary: rgba(117, 117, 162, 0.6);\n  --colorContent: rgba(255, 255, 255, 1);\n  --colorShadow: rgba(0, 0, 0, 0.2);\n  --cubeSideTranslateZ: 0rem;\n  --pyramidTransform: rotateY(-45deg) rotateZ(-30deg);\n  --shapeSize: 6rem;\n  --vh: 100%;\n}\n\nbody {\n  background: var(--colorBgPrimary);\n  color: var(--colorContent);\n  font-family: \"Comfortaa\", cursive;\n  font-size: 0.875rem;\n  min-height: 100vh;\n  min-height: var(--vh);\n  overflow: hidden;\n}\n\na {\n  color: var(--colorContent);\n}\n\nbutton {\n  background: none;\n  border: none;\n  color: var(--colorContent);\n  cursor: pointer;\n  font-family: \"Comfortaa\", cursive;\n}\n\nheader {\n  position: fixed;\n  width: 100%;\n  z-index: 1;\n}\n\nmain {\n  height: 100vh;\n  height: var(--vh);\n  overflow: hidden;\n  position: relative;\n}\n\np {\n  line-height: 1.4;\n}\n\nsection {\n  align-items: center;\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  justify-content: center;\n  opacity: 0;\n  position: absolute;\n  visibility: hidden;\n  width: 100%;\n}\nsection > div {\n  padding: 0 1rem;\n}\n\nul {\n  list-style: none;\n}\n\n::-webkit-scrollbar {\n  width: 0.2rem;\n}\n::-webkit-scrollbar-thumb {\n  background: var(--colorBgSecondary);\n  border-radius: 0.5rem;\n}\n\n* {\n  box-sizing: border-box;\n  margin: 0;\n  padding: 0;\n}\n\n#about {\n  align-items: initial;\n  display: grid;\n  grid-template-columns: 0 1fr;\n  padding: 4.5rem 1rem;\n  text-align: justify;\n}\n#about__content {\n  max-height: 60%;\n  overflow-y: auto;\n}\n\n.back__btn {\n  margin-top: 2rem;\n}\n\n.color-picker {\n  border-radius: 0.3rem;\n  display: none;\n  height: 2rem;\n  overflow: hidden;\n  position: relative;\n  transition: all 150ms ease-out;\n  width: 0;\n}\n.color-picker canvas {\n  height: 100%;\n  width: 100%;\n}\n.color-picker .pointer {\n  background: var(--colorBgSecondary);\n  height: 100%;\n  left: 0.5rem;\n  position: absolute;\n  top: 50%;\n  transform: translate(-50%, -50%);\n  width: 1rem;\n}\n\n#contact__content {\n  align-items: center;\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  justify-content: center;\n}\n#contact__content .email {\n  font-size: 5vw;\n}\n\n.cube__wrapper {\n  bottom: 15%;\n  left: 0;\n  perspective: 100rem;\n  perspective-origin: 50% -250%;\n  position: absolute;\n}\n[data-section] .cube__wrapper {\n  display: none;\n}\n[data-section=about] .cube__wrapper {\n  display: block;\n}\n\n.cube {\n  height: var(--shapeSize);\n  position: relative;\n  transform: rotateY(-30deg);\n  transform-style: preserve-3d;\n  width: var(--shapeSize);\n}\n.cube .cube__side {\n  border: 0.15rem solid var(--colorContent);\n  height: 100%;\n  position: absolute;\n  transition: transform 250ms ease-in-out;\n  width: 100%;\n}\n.cube .cube__side--back {\n  top: 50%;\n  transform: translateZ(calc(-1 * (var(--shapeSize) / 2 + var(--cubeSideTranslateZ))));\n}\n.cube .cube__side--bottom {\n  top: 100%;\n  transform: rotateX(90deg) translateZ(calc(-1 * var(--cubeSideTranslateZ)));\n}\n.cube .cube__side--front {\n  top: 50%;\n  transform: translateZ(calc(var(--shapeSize) / 2 + var(--cubeSideTranslateZ)));\n}\n.cube .cube__side--left {\n  right: 50%;\n  top: 50%;\n  transform: rotateY(90deg) translateZ(calc(-1 * var(--cubeSideTranslateZ)));\n}\n.cube .cube__side--right {\n  left: 50%;\n  top: 50%;\n  transform: rotateY(90deg) translateZ(var(--cubeSideTranslateZ));\n}\n.cube .cube__side--top {\n  transform: rotateX(90deg) translateZ(var(--cubeSideTranslateZ));\n}\n\n.cursor {\n  border: 0.15rem solid var(--colorContent);\n  border-radius: 50%;\n  display: none;\n  height: 2rem;\n  pointer-events: none;\n  position: fixed;\n  transform: translate(-50%, -50%);\n  transform-origin: 150% 150%;\n  transition: all 150ms ease-out;\n  width: 2rem;\n  z-index: 2;\n}\n.cursor::before {\n  background: var(--colorContent);\n  border-radius: 50%;\n  content: \"\";\n  height: 0.3rem;\n  left: 50%;\n  position: absolute;\n  top: 50%;\n  transform: translate(-50%, -50%);\n  width: 0.3rem;\n}\n.cursor--active {\n  background: var(--colorContent);\n  mix-blend-mode: soft-light;\n  transform: scale(1.5);\n}\n.cursor--active::before {\n  display: none;\n}\n\n.header__content {\n  justify-content: space-between;\n  padding: 1.75rem;\n}\n.header__content, .header__content > div {\n  align-items: center;\n  display: flex;\n}\n.header__content--left {\n  font-size: 1rem;\n  gap: 1rem;\n}\n.header__content--left a {\n  height: 2rem;\n}\n.header__content .color {\n  background: linear-gradient(-45deg, var(--colorBgSecondary), var(--colorContent));\n  border-radius: 50%;\n  display: none;\n  height: 1rem;\n  margin: 0 1.5rem 0 0.5rem;\n  position: relative;\n  width: 1rem;\n}\n.header__content .lang {\n  height: 1rem;\n  position: relative;\n  width: 1rem;\n}\n.header__content input {\n  cursor: pointer;\n  height: 100%;\n  opacity: 0;\n  position: absolute;\n  width: 100%;\n}\n.header__content .logo {\n  height: 100%;\n  width: 2rem;\n}\n.header__content .logo__text {\n  display: none;\n}\n.header__content .logo path {\n  fill: var(--colorContent);\n}\n\n#loader {\n  animation: fadeOut 500ms forwards 3.5s;\n  background: var(--colorContent);\n  opacity: 1;\n  visibility: visible;\n  z-index: 2;\n}\n#loader path:nth-child(1) {\n  animation: loaderStroke 3s forwards ease-in-out;\n  stroke-dasharray: 1000;\n  stroke-dashoffset: 1000;\n}\n#loader path:nth-child(2) {\n  animation: loaderStroke 2s forwards ease-in-out 0.3s;\n  stroke-dasharray: 581.5840454102;\n  stroke-dashoffset: 581.5840454102;\n}\n#loader path:nth-child(3) {\n  animation: loaderStroke 2s forwards ease-in-out 0.6s;\n  stroke-dasharray: 715.9073486328;\n  stroke-dashoffset: 715.9073486328;\n}\n#loader svg {\n  animation: loaderScale 1s forwards ease-in-out 3s;\n}\n\n.pyramid__wrapper {\n  bottom: 3%;\n  position: absolute;\n  right: 5%;\n}\n[data-section] .pyramid__wrapper {\n  display: none;\n}\n[data-section=skills] .pyramid__wrapper {\n  display: block;\n}\n\n.pyramid {\n  height: 5rem;\n  position: relative;\n  transform: var(--pyramidTransform);\n  transform-style: preserve-3d;\n  transition: transform 250ms ease-in-out;\n  width: 5rem;\n}\n.pyramid .pyramid__base {\n  background: var(--colorBgPrimary);\n  border: 0.15rem solid var(--colorContent);\n  height: 100%;\n  position: absolute;\n  transform: rotateX(90deg) translateZ(-1.8rem);\n  width: 100%;\n}\n.pyramid .pyramid__side {\n  border: 2.5rem solid transparent;\n  border-bottom: 5rem solid var(--colorContent);\n  border-top: 0;\n  position: absolute;\n}\n.pyramid .pyramid__side::before {\n  border: 2.4rem solid transparent;\n  border-bottom: 4.8rem solid var(--colorBgPrimary);\n  content: \"\";\n  left: -2.4rem;\n  position: absolute;\n  top: -2.25rem;\n}\n.pyramid .pyramid__side--back {\n  transform: rotateX(-30deg);\n  transform-origin: 2.5rem 0;\n}\n.pyramid .pyramid__side--front {\n  transform: rotateX(30deg);\n  transform-origin: 0 0;\n}\n.pyramid .pyramid__side--left {\n  transform: rotateZ(30deg) rotateY(90deg);\n  transform-origin: 2.5rem 0;\n}\n.pyramid .pyramid__side--right {\n  transform: rotateZ(-30deg) rotateY(90deg);\n  transform-origin: 2.5rem 0;\n}\n\n#shapes {\n  opacity: 1;\n  text-align: center;\n  visibility: visible;\n}\n#shapes .title {\n  font-size: 2.1875rem;\n  max-width: 75%;\n}\n[data-section] #shapes .title {\n  display: none;\n}\n#shapes .menu {\n  z-index: 1;\n}\n[data-section] #shapes .menu {\n  display: none;\n}\n#shapes .menu button {\n  cursor: help;\n  font-size: 0.75rem;\n}\n#shapes .menu ul {\n  display: flex;\n  gap: 2rem;\n}\n\n#skills {\n  justify-content: initial;\n  padding: 6rem 0;\n}\n#skills__content {\n  max-height: 81.5%;\n  overflow-y: auto;\n  width: 85%;\n}\n#skills .skill {\n  border-bottom: 0.15rem solid var(--colorContent);\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n  padding: 0.75rem 0;\n}\n#skills a {\n  display: block;\n}\n#skills img {\n  margin: 0.5rem 0;\n  max-height: 2.75rem;\n  max-width: 2.75rem;\n}\n#skills .icon {\n  display: inline-block;\n  margin: 0 0.5rem;\n  text-align: center;\n}\n#skills .project {\n  align-items: center;\n  display: flex;\n  gap: 1rem;\n  margin-top: 2rem;\n}\n\n.sphere {\n  background: linear-gradient(0.45turn, var(--colorContent), transparent);\n  border-radius: 50%;\n  box-shadow: inset -0.5rem -0.5rem 2rem var(--colorShadow);\n  height: calc(var(--shapeSize) * 0.85);\n  position: absolute;\n  right: 5%;\n  top: 15%;\n  transition: transform 250ms ease-in-out;\n  width: calc(var(--shapeSize) * 0.85);\n}\n[data-section] .sphere {\n  display: none;\n}\n[data-section=contact] .sphere {\n  display: block;\n}\n\n.title {\n  font-family: \"Gugi\", cursive;\n  margin: 0.75rem 0;\n}", "",{"version":3,"sources":["webpack://./src/scss/abstracts/_keyframes.scss","webpack://./src/scss/main.scss","webpack://./src/scss/abstracts/_media.scss","webpack://./src/scss/base/_base.scss","webpack://./src/scss/abstracts/_tokens.scss","webpack://./src/scss/base/_reset.scss","webpack://./src/scss/components/_about.scss","webpack://./src/scss/components/_back.scss","webpack://./src/scss/components/_colorPicker.scss","webpack://./src/scss/components/_contact.scss","webpack://./src/scss/components/_cube.scss","webpack://./src/scss/components/_cursor.scss","webpack://./src/scss/components/_header.scss","webpack://./src/scss/components/_loader.scss","webpack://./src/scss/components/_pyramid.scss","webpack://./src/scss/components/_shapes.scss","webpack://./src/scss/components/_skills.scss","webpack://./src/scss/components/_sphere.scss","webpack://./src/scss/components/_title.scss"],"names":[],"mappings":"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","sourcesContent":["@use \"./tokens\";\n\n//** Global keyframes\n@keyframes fadeIn {\n  0% {\n    opacity: 0;\n    visibility: hidden;\n  }\n\n  100% {\n    opacity: 1;\n    visibility: visible;\n  }\n}\n\n@keyframes fadeOut {\n  0% {\n    opacity: 1;\n    visibility: visible;\n  }\n  100% {\n    opacity: 0;\n    visibility: hidden;\n  }\n}\n\n//** Contestual keyframes\n@keyframes colorPickerWidth {\n  100% {\n    // Same as canvas (200px)\n    width: 12.5rem;\n  }\n}\n\n@keyframes contentSlideDown {\n  0% {\n    transform: translateY(tokens.$sectionContentAnimationSlideY);\n  }\n  100% {\n    transform: translateY(0);\n  }\n}\n\n@keyframes contentSlideUp {\n  0% {\n    transform: translateY(0);\n  }\n  100% {\n    transform: translateY(tokens.$sectionContentAnimationSlideY);\n  }\n}\n\n@keyframes loaderScale {\n  50% {\n    transform: scale(1%);\n  }\n  100% {\n    transform: scale(100000%);\n  }\n}\n\n@keyframes loaderStroke {\n  100% {\n    stroke-dashoffset: 0;\n  }\n}\n","@import url(\"https://fonts.googleapis.com/css2?family=Comfortaa&display=swap\");\n@import url(\"https://fonts.googleapis.com/css2?family=Gugi&display=swap\");\n@keyframes fadeIn {\n  0% {\n    opacity: 0;\n    visibility: hidden;\n  }\n  100% {\n    opacity: 1;\n    visibility: visible;\n  }\n}\n@keyframes fadeOut {\n  0% {\n    opacity: 1;\n    visibility: visible;\n  }\n  100% {\n    opacity: 0;\n    visibility: hidden;\n  }\n}\n@keyframes colorPickerWidth {\n  100% {\n    width: 12.5rem;\n  }\n}\n@keyframes contentSlideDown {\n  0% {\n    transform: translateY(-2rem);\n  }\n  100% {\n    transform: translateY(0);\n  }\n}\n@keyframes contentSlideUp {\n  0% {\n    transform: translateY(0);\n  }\n  100% {\n    transform: translateY(-2rem);\n  }\n}\n@keyframes loaderScale {\n  50% {\n    transform: scale(1%);\n  }\n  100% {\n    transform: scale(100000%);\n  }\n}\n@keyframes loaderStroke {\n  100% {\n    stroke-dashoffset: 0;\n  }\n}\n@media screen and (min-width: 320px) {\n  #about {\n    padding: 6rem 2.5rem !important;\n  }\n  .color {\n    display: block !important;\n  }\n  .color-picker {\n    animation: colorPickerWidth 150ms forwards ease-in-out;\n    display: block !important;\n  }\n  .cube__wrapper {\n    left: 10% !important;\n    transform: scale(1.1);\n  }\n  .skill {\n    align-items: center;\n    flex-direction: row !important;\n  }\n}\n@media screen and (min-width: 480px) {\n  #about {\n    padding: 5rem 4rem !important;\n  }\n  .cube__wrapper {\n    left: 15% !important;\n  }\n  .logo__text {\n    display: block !important;\n  }\n  .menu button {\n    font-size: 0.875rem !important;\n  }\n}\n@media screen and (min-width: 541px) {\n  #about {\n    grid-template-columns: 1fr 2fr !important;\n    padding: 3.25rem 4rem 4rem 2rem !important;\n  }\n  #about__content {\n    max-height: 100% !important;\n  }\n  .cube__wrapper {\n    bottom: 45% !important;\n    left: 5% !important;\n  }\n  .pyramid__wrapper {\n    bottom: 20% !important;\n    right: 5% !important;\n  }\n  #skills {\n    justify-content: center !important;\n    padding: 2rem 0 2.5rem 0 !important;\n  }\n  #skills__content {\n    width: 60% !important;\n  }\n  #skills__content .icon {\n    margin: 0 1rem !important;\n  }\n  .sphere {\n    right: 15% !important;\n    top: 5% !important;\n  }\n}\n@media screen and (min-width: 1024px) {\n  #about {\n    padding: 12.5% !important;\n  }\n  .cube__wrapper {\n    bottom: 30% !important;\n    left: 10% !important;\n  }\n  .email {\n    font-size: 4vw !important;\n  }\n  .pyramid__wrapper {\n    bottom: 15% !important;\n    right: 15% !important;\n    transform: scale(1.5);\n  }\n  #shapes .title {\n    font-size: 2.8125rem !important;\n  }\n  #skills__content {\n    width: 50% !important;\n  }\n  #skills__content .icon {\n    margin: 0 1.5rem !important;\n  }\n  .sphere {\n    height: calc(var(--shapeSize) * 1.15) !important;\n    right: 20% !important;\n    top: 15% !important;\n    width: calc(var(--shapeSize) * 1.15) !important;\n  }\n}\n@media screen and (min-width: 1441px) {\n  #skills {\n    padding: 0 !important;\n  }\n}\n@media screen and (max-height: 320px) {\n  .cube__wrapper {\n    bottom: 40% !important;\n    transform: scale(0.9);\n  }\n}\n@media screen and (min-height: 576px) {\n  .cube__wrapper {\n    bottom: 25% !important;\n  }\n  .pyramid__wrapper {\n    bottom: 10% !important;\n  }\n}\n@media screen and (min-height: 1024px) {\n  #about {\n    padding: 25% 10% !important;\n  }\n  .cube__wrapper {\n    bottom: 35% !important;\n    left: 15% !important;\n  }\n  .pyramid__wrapper {\n    bottom: 15% !important;\n    right: 20% !important;\n    transform: scale(1.5) !important;\n  }\n  #shapes .title {\n    font-size: 2.8125rem !important;\n  }\n  .sphere {\n    height: calc(var(--shapeSize) * 1.15) !important;\n    top: 22.5% !important;\n    width: calc(var(--shapeSize) * 1.15) !important;\n  }\n}\n:root {\n  --colorBgPrimary: rgba(37, 41, 50, 1);\n  --colorBgSecondary: rgba(117, 117, 162, 0.6);\n  --colorContent: rgba(255, 255, 255, 1);\n  --colorShadow: rgba(0, 0, 0, 0.2);\n  --cubeSideTranslateZ: 0rem;\n  --pyramidTransform: rotateY(-45deg) rotateZ(-30deg);\n  --shapeSize: 6rem;\n  --vh: 100%;\n}\n\nbody {\n  background: var(--colorBgPrimary);\n  color: var(--colorContent);\n  font-family: \"Comfortaa\", cursive;\n  font-size: 0.875rem;\n  min-height: 100vh;\n  min-height: var(--vh);\n  overflow: hidden;\n}\n\na {\n  color: var(--colorContent);\n}\n\nbutton {\n  background: none;\n  border: none;\n  color: var(--colorContent);\n  cursor: pointer;\n  font-family: \"Comfortaa\", cursive;\n}\n\nheader {\n  position: fixed;\n  width: 100%;\n  z-index: 1;\n}\n\nmain {\n  height: 100vh;\n  height: var(--vh);\n  overflow: hidden;\n  position: relative;\n}\n\np {\n  line-height: 1.4;\n}\n\nsection {\n  align-items: center;\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  justify-content: center;\n  opacity: 0;\n  position: absolute;\n  visibility: hidden;\n  width: 100%;\n}\nsection > div {\n  padding: 0 1rem;\n}\n\nul {\n  list-style: none;\n}\n\n::-webkit-scrollbar {\n  width: 0.2rem;\n}\n::-webkit-scrollbar-thumb {\n  background: var(--colorBgSecondary);\n  border-radius: 0.5rem;\n}\n\n* {\n  box-sizing: border-box;\n  margin: 0;\n  padding: 0;\n}\n\n#about {\n  align-items: initial;\n  display: grid;\n  grid-template-columns: 0 1fr;\n  padding: 4.5rem 1rem;\n  text-align: justify;\n}\n#about__content {\n  max-height: 60%;\n  overflow-y: auto;\n}\n\n.back__btn {\n  margin-top: 2rem;\n}\n\n.color-picker {\n  border-radius: 0.3rem;\n  display: none;\n  height: 2rem;\n  overflow: hidden;\n  position: relative;\n  transition: all 150ms ease-out;\n  width: 0;\n}\n.color-picker canvas {\n  height: 100%;\n  width: 100%;\n}\n.color-picker .pointer {\n  background: var(--colorBgSecondary);\n  height: 100%;\n  left: 0.5rem;\n  position: absolute;\n  top: 50%;\n  transform: translate(-50%, -50%);\n  width: 1rem;\n}\n\n#contact__content {\n  align-items: center;\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  justify-content: center;\n}\n#contact__content .email {\n  font-size: 5vw;\n}\n\n.cube__wrapper {\n  bottom: 15%;\n  left: 0;\n  perspective: 100rem;\n  perspective-origin: 50% -250%;\n  position: absolute;\n}\n[data-section] .cube__wrapper {\n  display: none;\n}\n[data-section=about] .cube__wrapper {\n  display: block;\n}\n\n.cube {\n  height: var(--shapeSize);\n  position: relative;\n  transform: rotateY(-30deg);\n  transform-style: preserve-3d;\n  width: var(--shapeSize);\n}\n.cube .cube__side {\n  border: 0.15rem solid var(--colorContent);\n  height: 100%;\n  position: absolute;\n  transition: transform 250ms ease-in-out;\n  width: 100%;\n}\n.cube .cube__side--back {\n  top: 50%;\n  transform: translateZ(calc(-1 * (var(--shapeSize) / 2 + var(--cubeSideTranslateZ))));\n}\n.cube .cube__side--bottom {\n  top: 100%;\n  transform: rotateX(90deg) translateZ(calc(-1 * var(--cubeSideTranslateZ)));\n}\n.cube .cube__side--front {\n  top: 50%;\n  transform: translateZ(calc(var(--shapeSize) / 2 + var(--cubeSideTranslateZ)));\n}\n.cube .cube__side--left {\n  right: 50%;\n  top: 50%;\n  transform: rotateY(90deg) translateZ(calc(-1 * var(--cubeSideTranslateZ)));\n}\n.cube .cube__side--right {\n  left: 50%;\n  top: 50%;\n  transform: rotateY(90deg) translateZ(var(--cubeSideTranslateZ));\n}\n.cube .cube__side--top {\n  transform: rotateX(90deg) translateZ(var(--cubeSideTranslateZ));\n}\n\n.cursor {\n  border: 0.15rem solid var(--colorContent);\n  border-radius: 50%;\n  display: none;\n  height: 2rem;\n  pointer-events: none;\n  position: fixed;\n  transform: translate(-50%, -50%);\n  transform-origin: 150% 150%;\n  transition: all 150ms ease-out;\n  width: 2rem;\n  z-index: 2;\n}\n.cursor::before {\n  background: var(--colorContent);\n  border-radius: 50%;\n  content: \"\";\n  height: 0.3rem;\n  left: 50%;\n  position: absolute;\n  top: 50%;\n  transform: translate(-50%, -50%);\n  width: 0.3rem;\n}\n.cursor--active {\n  background: var(--colorContent);\n  mix-blend-mode: soft-light;\n  transform: scale(1.5);\n}\n.cursor--active::before {\n  display: none;\n}\n\n.header__content {\n  justify-content: space-between;\n  padding: 1.75rem;\n}\n.header__content, .header__content > div {\n  align-items: center;\n  display: flex;\n}\n.header__content--left {\n  font-size: 1rem;\n  gap: 1rem;\n}\n.header__content--left a {\n  height: 2rem;\n}\n.header__content .color {\n  background: linear-gradient(-45deg, var(--colorBgSecondary), var(--colorContent));\n  border-radius: 50%;\n  display: none;\n  height: 1rem;\n  margin: 0 1.5rem 0 0.5rem;\n  position: relative;\n  width: 1rem;\n}\n.header__content .lang {\n  height: 1rem;\n  position: relative;\n  width: 1rem;\n}\n.header__content input {\n  cursor: pointer;\n  height: 100%;\n  opacity: 0;\n  position: absolute;\n  width: 100%;\n}\n.header__content .logo {\n  height: 100%;\n  width: 2rem;\n}\n.header__content .logo__text {\n  display: none;\n}\n.header__content .logo path {\n  fill: var(--colorContent);\n}\n\n#loader {\n  animation: fadeOut 500ms forwards 3.5s;\n  background: var(--colorContent);\n  opacity: 1;\n  visibility: visible;\n  z-index: 2;\n}\n#loader path:nth-child(1) {\n  animation: loaderStroke 3s forwards ease-in-out;\n  stroke-dasharray: 1000;\n  stroke-dashoffset: 1000;\n}\n#loader path:nth-child(2) {\n  animation: loaderStroke 2s forwards ease-in-out 0.3s;\n  stroke-dasharray: 581.5840454102;\n  stroke-dashoffset: 581.5840454102;\n}\n#loader path:nth-child(3) {\n  animation: loaderStroke 2s forwards ease-in-out 0.6s;\n  stroke-dasharray: 715.9073486328;\n  stroke-dashoffset: 715.9073486328;\n}\n#loader svg {\n  animation: loaderScale 1s forwards ease-in-out 3s;\n}\n\n.pyramid__wrapper {\n  bottom: 3%;\n  position: absolute;\n  right: 5%;\n}\n[data-section] .pyramid__wrapper {\n  display: none;\n}\n[data-section=skills] .pyramid__wrapper {\n  display: block;\n}\n\n.pyramid {\n  height: 5rem;\n  position: relative;\n  transform: var(--pyramidTransform);\n  transform-style: preserve-3d;\n  transition: transform 250ms ease-in-out;\n  width: 5rem;\n}\n.pyramid .pyramid__base {\n  background: var(--colorBgPrimary);\n  border: 0.15rem solid var(--colorContent);\n  height: 100%;\n  position: absolute;\n  transform: rotateX(90deg) translateZ(-1.8rem);\n  width: 100%;\n}\n.pyramid .pyramid__side {\n  border: 2.5rem solid transparent;\n  border-bottom: 5rem solid var(--colorContent);\n  border-top: 0;\n  position: absolute;\n}\n.pyramid .pyramid__side::before {\n  border: 2.4rem solid transparent;\n  border-bottom: 4.8rem solid var(--colorBgPrimary);\n  content: \"\";\n  left: -2.4rem;\n  position: absolute;\n  top: -2.25rem;\n}\n.pyramid .pyramid__side--back {\n  transform: rotateX(-30deg);\n  transform-origin: 2.5rem 0;\n}\n.pyramid .pyramid__side--front {\n  transform: rotateX(30deg);\n  transform-origin: 0 0;\n}\n.pyramid .pyramid__side--left {\n  transform: rotateZ(30deg) rotateY(90deg);\n  transform-origin: 2.5rem 0;\n}\n.pyramid .pyramid__side--right {\n  transform: rotateZ(-30deg) rotateY(90deg);\n  transform-origin: 2.5rem 0;\n}\n\n#shapes {\n  opacity: 1;\n  text-align: center;\n  visibility: visible;\n}\n#shapes .title {\n  font-size: 2.1875rem;\n  max-width: 75%;\n}\n[data-section] #shapes .title {\n  display: none;\n}\n#shapes .menu {\n  z-index: 1;\n}\n[data-section] #shapes .menu {\n  display: none;\n}\n#shapes .menu button {\n  cursor: help;\n  font-size: 0.75rem;\n}\n#shapes .menu ul {\n  display: flex;\n  gap: 2rem;\n}\n\n#skills {\n  justify-content: initial;\n  padding: 6rem 0;\n}\n#skills__content {\n  max-height: 81.5%;\n  overflow-y: auto;\n  width: 85%;\n}\n#skills .skill {\n  border-bottom: 0.15rem solid var(--colorContent);\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n  padding: 0.75rem 0;\n}\n#skills a {\n  display: block;\n}\n#skills img {\n  margin: 0.5rem 0;\n  max-height: 2.75rem;\n  max-width: 2.75rem;\n}\n#skills .icon {\n  display: inline-block;\n  margin: 0 0.5rem;\n  text-align: center;\n}\n#skills .project {\n  align-items: center;\n  display: flex;\n  gap: 1rem;\n  margin-top: 2rem;\n}\n\n.sphere {\n  background: linear-gradient(0.45turn, var(--colorContent), transparent);\n  border-radius: 50%;\n  box-shadow: inset -0.5rem -0.5rem 2rem var(--colorShadow);\n  height: calc(var(--shapeSize) * 0.85);\n  position: absolute;\n  right: 5%;\n  top: 15%;\n  transition: transform 250ms ease-in-out;\n  width: calc(var(--shapeSize) * 0.85);\n}\n[data-section] .sphere {\n  display: none;\n}\n[data-section=contact] .sphere {\n  display: block;\n}\n\n.title {\n  font-family: \"Gugi\", cursive;\n  margin: 0.75rem 0;\n}","@use \"./tokens\";\n\n//** Width\n@media screen and (min-width: 320px) {\n  #about {\n    padding: 6rem 2.5rem !important;\n  }\n\n  .color {\n    display: block !important;\n\n    &-picker {\n      animation: colorPickerWidth 150ms forwards ease-in-out;\n      display: block !important;\n    }\n  }\n\n  .cube__wrapper {\n    left: 10% !important;\n    transform: scale(1.1);\n  }\n\n  .skill {\n    align-items: center;\n    flex-direction: row !important;\n  }\n}\n\n@media screen and (min-width: 480px) {\n  #about {\n    padding: 5rem 4rem !important;\n  }\n\n  .cube__wrapper {\n    left: 15% !important;\n  }\n\n  .logo__text {\n    display: block !important;\n  }\n\n  .menu button {\n    font-size: tokens.$fontSizeT4 !important;\n  }\n}\n\n@media screen and (min-width: 541px) {\n  #about {\n    grid-template-columns: 1fr 2fr !important;\n    padding: 3.25rem 4rem 4rem 2rem !important;\n\n    &__content {\n      max-height: 100% !important;\n    }\n  }\n\n  .cube__wrapper {\n    bottom: 45% !important;\n    left: 5% !important;\n  }\n\n  .pyramid__wrapper {\n    bottom: 20% !important;\n    right: 5% !important;\n  }\n\n  #skills {\n    justify-content: center !important;\n    padding: 2rem 0 2.5rem 0 !important;\n\n    &__content {\n      width: 60% !important;\n\n      .icon {\n        margin: 0 1rem !important;\n      }\n    }\n  }\n\n  .sphere {\n    right: 15% !important;\n    top: 5% !important;\n  }\n}\n\n@media screen and (min-width: 1024px) {\n  #about {\n    padding: 12.5% !important;\n  }\n\n  .cube__wrapper {\n    bottom: 30% !important;\n    left: 10% !important;\n  }\n\n  .email {\n    font-size: 4vw !important;\n  }\n\n  .pyramid__wrapper {\n    bottom: 15% !important;\n    right: 15% !important;\n    transform: scale(1.5);\n  }\n\n  #shapes .title {\n    font-size: tokens.$fontSizeH3 !important;\n  }\n\n  #skills__content {\n    width: 50% !important;\n\n    .icon {\n      margin: 0 1.5rem !important;\n    }\n  }\n\n  .sphere {\n    height: calc(tokens.$shapeSize * 1.15) !important;\n    right: 20% !important;\n    top: 15% !important;\n    width: calc(tokens.$shapeSize * 1.15) !important;\n  }\n}\n\n@media screen and (min-width: 1441px) {\n  #skills {\n    padding: 0 !important;\n  }\n}\n\n//** Height\n@media screen and (max-height: 320px) {\n  .cube__wrapper {\n    bottom: 40% !important;\n    transform: scale(0.9);\n  }\n}\n\n@media screen and (min-height: 576px) {\n  .cube__wrapper {\n    bottom: 25% !important;\n  }\n\n  .pyramid__wrapper {\n    bottom: 10% !important;\n  }\n}\n\n@media screen and (min-height: 1024px) {\n  #about {\n    padding: 25% 10% !important;\n  }\n\n  .cube__wrapper {\n    bottom: 35% !important;\n    left: 15% !important;\n  }\n\n  .pyramid__wrapper {\n    bottom: 15% !important;\n    right: 20% !important;\n    transform: scale(1.5) !important;\n  }\n\n  #shapes .title {\n    font-size: tokens.$fontSizeH3 !important;\n  }\n\n  .sphere {\n    height: calc(tokens.$shapeSize * 1.15) !important;\n    top: 22.5% !important;\n    width: calc(tokens.$shapeSize * 1.15) !important;\n  }\n}\n","@use \"../abstracts/tokens\";\n\n:root {\n  --colorBgPrimary: rgba(37, 41, 50, 1);\n  --colorBgSecondary: rgba(117, 117, 162, 0.6);\n  --colorContent: rgba(255, 255, 255, 1);\n  --colorShadow: rgba(0, 0, 0, 0.2);\n  // Value set on about__btn click\n  --cubeSideTranslateZ: 0rem;\n  // Value set on skills__btn click\n  --pyramidTransform: rotateY(-45deg) rotateZ(-30deg);\n  // Value for cube and sphere\n  --shapeSize: 6rem;\n  // window.innerHeight (px) is passed onload\n  --vh: 100%;\n}\n\nbody {\n  background: tokens.$bodyBg;\n  color: tokens.$bodyColor;\n  font-family: tokens.$bodyFontFamily;\n  font-size: tokens.$bodyFontSize;\n  // Fallback\n  min-height: 100vh;\n  min-height: var(--vh);\n  overflow: hidden;\n}\n\na {\n  color: tokens.$bodyColor;\n}\n\nbutton {\n  background: none;\n  border: none;\n  color: tokens.$bodyColor;\n  cursor: pointer;\n  font-family: tokens.$bodyFontFamily;\n}\n\nheader {\n  position: fixed;\n  width: 100%;\n  z-index: tokens.$headerZIndex;\n}\n\nmain {\n  // Fallback\n  height: 100vh;\n  height: var(--vh);\n  overflow: hidden;\n  position: relative;\n}\n\np {\n  line-height: tokens.$bodyLineHeight;\n}\n\n// On page load only loader and shapes sections are visible\nsection {\n  align-items: center;\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  justify-content: center;\n  opacity: 0;\n  position: absolute;\n  visibility: hidden;\n  width: 100%;\n\n  & > div {\n    padding: tokens.$sectionContentPadding;\n  }\n}\n\nul {\n  list-style: none;\n}\n\n::-webkit-scrollbar {\n  width: tokens.$scrollbarWidth;\n\n  &-thumb {\n    background: tokens.$scrollbarBg;\n    border-radius: tokens.$scrollbarBorderRadius;\n  }\n}\n","@use \"./typography\";\n\n// Tokens store the value of properties declared in components partials, thus you can set most of the style directly from here\n// The only values missing are meant to be fixed or standard (e.g. a circle has border-radius: 50%, with no need for changes)\n\n//** Global Tokens\n$borderPrimary: 0.15rem solid var(--colorContent);\n\n$fontFamilyComfortaa: \"Comfortaa\", cursive;\n$fontFamilyGugi: \"Gugi\", cursive;\n\n$fontSizeH3: map-get(typography.$types, \"h3\");\n$fontSizeH4: map-get(typography.$types, \"h4\");\n$fontSizeT3: map-get(typography.$types, \"t3\");\n$fontSizeT4: map-get(typography.$types, \"t4\");\n$fontSizeT5: map-get(typography.$types, \"t5\");\n\n$shapeSize: var(--shapeSize);\n\n$transition150eo: all 150ms ease-out;\n$transitionTransform250eio: transform 250ms ease-in-out;\n\n$zIndex1: 1;\n$zIndex2: 2;\n\n//** Contestual Tokens\n$aboutGridTemplateColumns: 0 1fr;\n$aboutPadding: 4.5rem 1rem;\n$aboutContentMaxHeight: 60%;\n\n$backBtnMarginTop: 2rem;\n\n$bodyBg: var(--colorBgPrimary);\n$bodyColor: var(--colorContent);\n$bodyFontFamily: $fontFamilyComfortaa;\n$bodyFontSize: $fontSizeT4;\n$bodyLineHeight: 1.4;\n\n$colorPickerBorderRadius: 0.3rem;\n$colorPickerHeight: 2rem;\n$colorPickerTransition: $transition150eo;\n$colorPickerPointerBg: var(--colorBgSecondary);\n$colorPickerPointerWidth: 1rem;\n\n$contactEmailFontSize: 5vw;\n\n$cubeTransform: rotateY(-30deg);\n$cubeSideBorder: $borderPrimary;\n$cubeSideTransition: $transitionTransform250eio;\n$cubeSideTranslateZ: var(--cubeSideTranslateZ);\n$cubeWrapperBottom: 15%;\n$cubeWrapperLeft: 0;\n$cubeWrapperPerspective: 100rem;\n$cubeWrapperPerspectiveOrigin: 50% -250%;\n\n$cursorBorder: $borderPrimary;\n$cursorSize: 2rem;\n$cursorTransition: $transition150eo;\n$cursorZIndex: $zIndex2;\n$cursorActiveBg: var(--colorContent);\n$cursorActiveTransform: scale(1.5);\n$cursorBeforeBg: var(--colorContent);\n$cursorBeforeSize: 0.3rem;\n\n$headerZIndex: $zIndex1;\n$headerColorBg: linear-gradient(\n  -45deg,\n  var(--colorBgSecondary),\n  var(--colorContent)\n);\n$headerColorMargin: 0 1.5rem 0 0.5rem;\n$headerContentPadding: 1.75rem;\n$headerContentLeftFontSize: $fontSizeT3;\n$headerContentLeftGap: 1rem;\n$headerContentRightSize: 1rem;\n$headerLogoSize: 2rem;\n$headerLogoPathFill: var(--colorContent);\n\n$loaderBg: var(--colorContent);\n$loaderZIndex: $zIndex2;\n\n$pyramidTransform: var(--pyramidTransform);\n$pyramidTransition: $transitionTransform250eio;\n$pyramidWrapperBottom: 3%;\n$pyramidWrapperRight: 5%;\n\n$scrollbarBg: var(--colorBgSecondary);\n$scrollbarBorderRadius: 0.5rem;\n$scrollbarWidth: 0.2rem;\n\n$sectionContentAnimationSlideY: -2rem;\n$sectionContentPadding: 0 1rem;\n\n$shapesMenuGap: 2rem;\n$shapesMenuZIndex: $zIndex1;\n$shapesMenuButtonFontSize: $fontSizeT5;\n$shapesTitleFontSize: $fontSizeH4;\n$shapesTitleMaxWidth: 75%;\n\n$skillBorderBottom: $borderPrimary;\n$skillPadding: 0.75rem 0;\n$skillsMaxHeight: 81.5%;\n$skillsPadding: 6rem 0;\n$skillsWidth: 85%;\n$skillsIconMargin: 0 0.5rem;\n$skillsImgMargin: 0.5rem 0;\n$skillsImgSize: 2.75rem;\n$skillsProjectGap: 1rem;\n$skillsProjectMarginTop: 2rem;\n\n$sphereBg: linear-gradient(0.45turn, var(--colorContent), transparent);\n$sphereBoxShadow: inset -0.5rem -0.5rem 2rem var(--colorShadow);\n$sphereRight: 5%;\n$sphereTop: 15%;\n$sphereTransition: $transitionTransform250eio;\n\n$titleFontFamily: $fontFamilyGugi;\n$titleMargin: 0.75rem 0;\n","* {\n  box-sizing: border-box;\n  margin: 0;\n  padding: 0;\n}\n","@use \"../abstracts/tokens\";\n\n#about {\n  align-items: initial;\n  display: grid;\n  grid-template-columns: tokens.$aboutGridTemplateColumns;\n  padding: tokens.$aboutPadding;\n  text-align: justify;\n\n  &__content {\n    max-height: tokens.$aboutContentMaxHeight;\n    overflow-y: auto;\n  }\n}\n","@use \"../abstracts/tokens\";\n\n.back__btn {\n  margin-top: tokens.$backBtnMarginTop;\n}\n","@use \"../abstracts/tokens\";\n\n.color-picker {\n  border-radius: tokens.$colorPickerBorderRadius;\n  display: none;\n  height: tokens.$colorPickerHeight;\n  overflow: hidden;\n  position: relative;\n  transition: tokens.$colorPickerTransition;\n  width: 0;\n\n  canvas {\n    height: 100%;\n    width: 100%;\n  }\n\n  .pointer {\n    background: tokens.$colorPickerPointerBg;\n    height: 100%;\n    left: calc(tokens.$colorPickerPointerWidth / 2);\n    position: absolute;\n    top: 50%;\n    transform: translate(-50%, -50%);\n    width: tokens.$colorPickerPointerWidth;\n  }\n}\n","@use \"../abstracts/tokens\";\n\n#contact__content {\n  align-items: center;\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  justify-content: center;\n\n  .email {\n    font-size: tokens.$contactEmailFontSize;\n  }\n}\n","@use \"../abstracts/tokens\";\n\n.cube__wrapper {\n  bottom: tokens.$cubeWrapperBottom;\n  left: tokens.$cubeWrapperLeft;\n  perspective: tokens.$cubeWrapperPerspective;\n  perspective-origin: tokens.$cubeWrapperPerspectiveOrigin;\n  position: absolute;\n\n  // Cube hidden on skills or contact click\n  [data-section] & {\n    display: none;\n  }\n  [data-section=\"about\"] & {\n    display: block;\n  }\n}\n\n.cube {\n  height: tokens.$shapeSize;\n  position: relative;\n  transform: tokens.$cubeTransform;\n  transform-style: preserve-3d;\n  width: tokens.$shapeSize;\n\n  .cube__side {\n    border: tokens.$cubeSideBorder;\n    height: 100%;\n    position: absolute;\n    transition: tokens.$cubeSideTransition;\n    width: 100%;\n\n    &--back {\n      top: 50%;\n      transform: translateZ(\n        calc((-1 * (tokens.$shapeSize / 2 + tokens.$cubeSideTranslateZ)))\n      );\n    }\n\n    &--bottom {\n      top: 100%;\n      transform: rotateX(90deg)\n        translateZ(calc(-1 * tokens.$cubeSideTranslateZ));\n    }\n\n    &--front {\n      top: 50%;\n      transform: translateZ(\n        calc(tokens.$shapeSize / 2 + tokens.$cubeSideTranslateZ)\n      );\n    }\n\n    &--left {\n      right: 50%;\n      top: 50%;\n      transform: rotateY(90deg)\n        translateZ(calc(-1 * tokens.$cubeSideTranslateZ));\n    }\n\n    &--right {\n      left: 50%;\n      top: 50%;\n      transform: rotateY(90deg) translateZ(tokens.$cubeSideTranslateZ);\n    }\n\n    &--top {\n      transform: rotateX(90deg) translateZ(tokens.$cubeSideTranslateZ);\n    }\n  }\n}\n","@use \"../abstracts/tokens\";\n\n.cursor {\n  border: tokens.$cursorBorder;\n  border-radius: 50%;\n  // Not showing on mobile\n  display: none;\n  height: tokens.$cursorSize;\n  pointer-events: none;\n  position: fixed;\n  transform: translate(-50%, -50%);\n  // Related to $cursorActiveTransform\n  transform-origin: 150% 150%;\n  // Delay on mouse move\n  transition: tokens.$cursorTransition;\n  width: tokens.$cursorSize;\n  z-index: tokens.$cursorZIndex;\n\n  &::before {\n    background: tokens.$cursorBeforeBg;\n    border-radius: 50%;\n    content: \"\";\n    height: tokens.$cursorBeforeSize;\n    left: 50%;\n    position: absolute;\n    top: 50%;\n    transform: translate(-50%, -50%);\n    width: tokens.$cursorBeforeSize;\n  }\n\n  &--active {\n    background: tokens.$cursorActiveBg;\n    mix-blend-mode: soft-light;\n    transform: tokens.$cursorActiveTransform;\n\n    &::before {\n      display: none;\n    }\n  }\n}\n","@use \"../abstracts/tokens\";\n\n.header__content {\n  justify-content: space-between;\n  padding: tokens.$headerContentPadding;\n  \n  &,\n  & > div {\n    align-items: center;\n    display: flex;\n  }\n\n  &--left {\n    font-size: tokens.$headerContentLeftFontSize;\n    gap: tokens.$headerContentLeftGap;\n\n    a {\n      height: tokens.$headerLogoSize;\n    }\n  }\n\n  .color {\n    background: tokens.$headerColorBg;\n    border-radius: 50%;\n    display: none;\n    height: tokens.$headerContentRightSize;\n    margin: tokens.$headerColorMargin;\n    position: relative;\n    width: tokens.$headerContentRightSize;\n  }\n\n  .lang {\n    height: tokens.$headerContentRightSize;\n    position: relative;\n    width: tokens.$headerContentRightSize;\n  }\n\n  // color and lang checkbox\n  input {\n    cursor: pointer;\n    height: 100%;\n    opacity: 0;\n    position: absolute;\n    width: 100%;\n  }\n\n  .logo {\n    height: 100%;\n    width: tokens.$headerLogoSize;\n\n    // Logo text hidden on mobile\n    &__text {\n      display: none;\n    }\n\n    path {\n      fill: tokens.$headerLogoPathFill;\n    }\n  }\n}\n","@use \"../abstracts/tokens\";\n\n#loader {\n  animation: fadeOut 500ms forwards 3.5s;\n  background: tokens.$loaderBg;\n  opacity: 1;\n  visibility: visible;\n  z-index: tokens.$loaderZIndex;\n\n  path:nth-child(1) {\n    animation: loaderStroke 3s forwards ease-in-out;\n    stroke-dasharray: 1000;\n    stroke-dashoffset: 1000;\n  }\n\n  path:nth-child(2) {\n    animation: loaderStroke 2s forwards ease-in-out 0.3s;\n    stroke-dasharray: 581.5840454101562;\n    stroke-dashoffset: 581.5840454101562;\n  }\n\n  path:nth-child(3) {\n    animation: loaderStroke 2s forwards ease-in-out 0.6s;\n    stroke-dasharray: 715.9073486328125;\n    stroke-dashoffset: 715.9073486328125;\n  }\n\n  svg {\n    animation: loaderScale 1s forwards ease-in-out 3s;\n  }\n}\n","@use \"../abstracts/tokens\";\n\n// Base and side::before depend on these (fixed) values\n$pyramidSize: 5rem;\n$pyramidBeforeBorderWidth: 2.4rem;\n\n.pyramid__wrapper {\n  bottom: tokens.$pyramidWrapperBottom;\n  position: absolute;\n  right: tokens.$pyramidWrapperRight;\n\n  // Pyramid hidden on about or contact click\n  [data-section] & {\n    display: none;\n  }\n  [data-section=\"skills\"] & {\n    display: block;\n  }\n}\n\n.pyramid {\n  height: $pyramidSize;\n  position: relative;\n  transform: tokens.$pyramidTransform;\n  transform-style: preserve-3d;\n  transition: tokens.$pyramidTransition;\n  width: $pyramidSize;\n\n  .pyramid__base {\n    background: var(--colorBgPrimary);\n    border: 0.15rem solid var(--colorContent);\n    height: 100%;\n    position: absolute;\n    transform: rotateX(90deg) translateZ(-1.8rem);\n    width: 100%;\n  }\n\n  .pyramid__side {\n    border: calc($pyramidSize / 2) solid transparent;\n    border-bottom: $pyramidSize solid var(--colorContent);\n    border-top: 0;\n    position: absolute;\n\n    &::before {\n      border: $pyramidBeforeBorderWidth solid transparent;\n      border-bottom: calc($pyramidBeforeBorderWidth * 2) solid\n        var(--colorBgPrimary);\n      content: \"\";\n      left: calc(-1 * $pyramidBeforeBorderWidth);\n      position: absolute;\n      top: -2.25rem;\n    }\n\n    &--back {\n      transform: rotateX(-30deg);\n      transform-origin: calc($pyramidSize / 2) 0;\n    }\n\n    &--front {\n      transform: rotateX(30deg);\n      transform-origin: 0 0;\n    }\n\n    &--left {\n      transform: rotateZ(30deg) rotateY(90deg);\n      transform-origin: calc($pyramidSize / 2) 0;\n    }\n\n    &--right {\n      transform: rotateZ(-30deg) rotateY(90deg);\n      transform-origin: calc($pyramidSize / 2) 0;\n    }\n  }\n}\n","@use \"../abstracts/tokens\";\n\n#shapes {\n  opacity: 1;\n  text-align: center;\n  visibility: visible;\n\n  .title {\n    font-size: tokens.$shapesTitleFontSize;\n    max-width: tokens.$shapesTitleMaxWidth;\n\n    // Title hidden on about, skills or contact click\n    [data-section] & {\n      display: none;\n    }\n  }\n\n  .menu {\n    z-index: tokens.$shapesMenuZIndex;\n\n    // Menu hidden on about, skills or contact click\n    [data-section] & {\n      display: none;\n    }\n\n    button {\n      cursor: help;\n      font-size: tokens.$shapesMenuButtonFontSize;\n    }\n\n    ul {\n      display: flex;\n      gap: tokens.$shapesMenuGap;\n    }\n  }\n}\n","@use \"../abstracts/tokens\";\n\n#skills {\n  justify-content: initial;\n  padding: tokens.$skillsPadding;\n\n  &__content {\n    max-height: tokens.$skillsMaxHeight;\n    overflow-y: auto;\n    width: tokens.$skillsWidth;\n  }\n\n  .skill {\n    border-bottom: tokens.$skillBorderBottom;\n    display: flex;\n    flex-direction: column;\n    justify-content: space-between;\n    padding: tokens.$skillPadding;\n  }\n\n  a {\n    display: block;\n  }\n\n  img {\n    margin: tokens.$skillsImgMargin;\n    max-height: tokens.$skillsImgSize;\n    max-width: tokens.$skillsImgSize;\n  }\n\n  .icon {\n    display: inline-block;\n    margin: tokens.$skillsIconMargin;\n    text-align: center;\n  }\n\n  .project {\n    align-items: center;\n    display: flex;\n    gap: tokens.$skillsProjectGap;\n    margin-top: tokens.$skillsProjectMarginTop;\n  }\n}\n","@use \"../abstracts/tokens\";\n\n.sphere {\n  background: tokens.$sphereBg;\n  border-radius: 50%;\n  box-shadow: tokens.$sphereBoxShadow;\n  height: calc(tokens.$shapeSize * 0.85);\n  position: absolute;\n  right: tokens.$sphereRight;\n  top: tokens.$sphereTop;\n  transition: tokens.$sphereTransition;\n  width: calc(tokens.$shapeSize * 0.85);\n\n  // Sphere hidden on about or skills click\n  [data-section] & {\n    display: none;\n  }\n  [data-section=\"contact\"] & {\n    display: block;\n  }\n}\n","@use \"../abstracts/tokens\";\n\n.title {\n  font-family: tokens.$titleFontFamily;\n  margin: tokens.$titleMargin;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./src/scss/main.scss":
/*!****************************!*\
  !*** ./src/scss/main.scss ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./main.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/scss/main.scss");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ }),

/***/ "./src/assets/skills/canvas.svg":
/*!**************************************!*\
  !*** ./src/assets/skills/canvas.svg ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/canvas.svg";

/***/ }),

/***/ "./src/assets/skills/css.svg":
/*!***********************************!*\
  !*** ./src/assets/skills/css.svg ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/css.svg";

/***/ }),

/***/ "./src/assets/skills/git.svg":
/*!***********************************!*\
  !*** ./src/assets/skills/git.svg ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/git.svg";

/***/ }),

/***/ "./src/assets/skills/github.svg":
/*!**************************************!*\
  !*** ./src/assets/skills/github.svg ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/github.svg";

/***/ }),

/***/ "./src/assets/skills/html.svg":
/*!************************************!*\
  !*** ./src/assets/skills/html.svg ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/html.svg";

/***/ }),

/***/ "./src/assets/skills/js.svg":
/*!**********************************!*\
  !*** ./src/assets/skills/js.svg ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/js.svg";

/***/ }),

/***/ "./src/assets/skills/react.svg":
/*!*************************************!*\
  !*** ./src/assets/skills/react.svg ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/react.svg";

/***/ }),

/***/ "./src/assets/skills/sass.svg":
/*!************************************!*\
  !*** ./src/assets/skills/sass.svg ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/sass.svg";

/***/ }),

/***/ "./src/assets/skills/webpack.svg":
/*!***************************************!*\
  !*** ./src/assets/skills/webpack.svg ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/webpack.svg";

/***/ }),

/***/ "./src/language.json":
/*!***************************!*\
  !*** ./src/language.json ***!
  \***************************/
/***/ ((module) => {

module.exports = JSON.parse('{"en":{"#about .back__btn":"<i class=\'fa-solid fa-backward-step\'></i> BACK","#about p":"Hello! My name is Federico and I like building useful and creative interfaces for the Web.<br /><br />&lt;&lt;Curiosity&gt;&gt; is the word that suits me best: I try to learn as much as possible every day and this approach is allowing me to become a self-taught Front-End Developer, starting from scratch. Before this commitment, which I started in October 2022, I have worked in the commercial field for over 7 years.<br /><br />I\'m currently based in Rome, Italy.","#about .title":"About","#contact .back__btn":"<i class=\'fa-solid fa-backward-step\'></i> BACK","#contact .email":"hello@federicopicone.com","header .lang__text":"IT","header .logo__text":"Federico Picone","#shapes #about__btn":"ABOUT","#shapes #contact__btn":"CONTACT","#shapes #skills__btn":"SKILLS","#shapes .title":"LET\'S SHAPE UP!","#skills #api":"API","#skills .back__btn":"<i class=\'fa-solid fa-backward-step\'></i> BACK","#skills .canvas__link":"Canvas","#skills #core":"Core","#skills .css__link":"CSS","#skills .git__link":"Git","#skills .html__link":"HTML","#skills .js__link":"JS","#skills #learning":"Learning right now","#skills #preprocessors":"Preprocessors","#skills .project__link":"Project","#skills .react__link":"React","#skills .sass__link":"Sass","#skills .title":"Skills","#skills #tools":"Tools","#skills .webpack__link":"Webpack"},"it":{"#about .back__btn":"<i class=\'fa-solid fa-backward-step\'></i> INDIETRO","#about p":"Ciao! Mi chiamo Federico e mi piace realizzare interfacce utili e creative per il Web.<br /><br />&lt;&lt;Curiosità&gt;&gt; è la parola che mi descrive meglio: mi impegno per imparare il più possibile ogni giorno e questa attitudine mi sta aiutando, partendo da zero, a diventare uno sviluppatore Front-End autodidatta. Prima di intraprendere questo percorso nell\'ottobre del 2022, ho maturato un\'esperienza di più di 7 anni nel settore commerciale.<br /><br />Attualmente sono residente a Roma.","#about .title":"Info","#contact .back__btn":"<i class=\'fa-solid fa-backward-step\'></i> INDIETRO","#contact .email":"hello@federicopicone.com","header .lang__text":"EN","header .logo__text":"Federico Picone","#shapes #about__btn":"INFO","#shapes #contact__btn":"CONTATTI","#shapes #skills__btn":"COMPETENZE","#shapes .title":"LET\'S SHAPE UP!","#skills #api":"API","#skills .back__btn":"<i class=\'fa-solid fa-backward-step\'></i> INDIETRO","#skills .canvas__link":"Canvas","#skills #core":"Principali","#skills .css__link":"CSS","#skills .git__link":"Git","#skills .html__link":"HTML","#skills .js__link":"JS","#skills #learning":"In apprendimento","#skills #preprocessors":"Preprocessori","#skills .project__link":"Progetto","#skills .react__link":"React","#skills .sass__link":"Sass","#skills .title":"Competenze","#skills #tools":"Strumenti","#skills .webpack__link":"Webpack"}}');

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
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
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
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_assets__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/assets */ "./src/modules/assets.js");
/* harmony import */ var _modules_color__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/color */ "./src/modules/color.js");
/* harmony import */ var _modules_cursor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/cursor */ "./src/modules/cursor.js");
/* harmony import */ var _modules_language__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/language */ "./src/modules/language.js");
/* harmony import */ var _modules_section__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/section */ "./src/modules/section.js");
/* harmony import */ var _modules_shape__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/shape */ "./src/modules/shape.js");
/* harmony import */ var _modules_viewport__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/viewport */ "./src/modules/viewport.js");
/* harmony import */ var _scss_main_scss__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./scss/main.scss */ "./src/scss/main.scss");








var index = function () {
  var selectors = {
    backBtn: document.querySelectorAll(".back__btn"),
    menu: document.querySelector(".menu")
  };
  var init = function init() {
    _modules_assets__WEBPACK_IMPORTED_MODULE_0__.assets.loadAssets();
    loadEventListeners();

    // Console
    console.log("%cDesign & Code by Federico Picone. Enjoy!", "background: rgb(117, 117, 162); border-radius: 0.5rem; color: rgb(0, 255, 255); margin: 0.25rem 0; padding: 0.5rem;");
  };
  var loadEventListeners = function loadEventListeners() {
    //** Color picker
    _modules_color__WEBPACK_IMPORTED_MODULE_1__.color.eventHandler();

    //** Cursor
    _modules_cursor__WEBPACK_IMPORTED_MODULE_2__.cursor.eventHandler();

    //** Language
    _modules_language__WEBPACK_IMPORTED_MODULE_3__.language.eventHandler();

    //** Sections and shapes
    var sectionName = undefined;

    // Buttons about, skills and contact
    selectors.menu.addEventListener("click", function (e) {
      if (e.target.classList.contains("clickable")) {
        // e.g. sectionName = "about" when clicking on .about__btn
        sectionName = e.target.id.split("__btn")[0];
        _modules_section__WEBPACK_IMPORTED_MODULE_4__.section.sectionHandler(sectionName);
        _modules_shape__WEBPACK_IMPORTED_MODULE_5__.shape.shapeHandler(sectionName);
      }
    });

    // Back button in sections about, skills and contact
    selectors.backBtn.forEach(function (btn) {
      btn.addEventListener("click", function () {
        _modules_section__WEBPACK_IMPORTED_MODULE_4__.section.sectionHandler(sectionName);
        _modules_shape__WEBPACK_IMPORTED_MODULE_5__.shape.shapeHandler(sectionName);

        // dataset removed to show everything in section shapes
        document.querySelector("main").removeAttribute("data-section");
      });
    });

    //** Viewport
    _modules_viewport__WEBPACK_IMPORTED_MODULE_6__.viewport.eventHandler();
  };
  return {
    init: init
  };
}();
index.init();
})();

/******/ })()
;
//# sourceMappingURL=bundleaf17c7d2835f46b58ca3.js.map
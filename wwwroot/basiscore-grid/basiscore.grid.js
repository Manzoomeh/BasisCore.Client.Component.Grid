/******/ (() => { // webpackBootstrap
/******/ 	// runtime can't be in strict mode because a global variable is assign and maybe created.
/******/ 	var __webpack_modules__ = ({

/***/ 930:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(601);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(314);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.bc-guide {
  position: fixed; inset: 0; width: 100%; height: 100dvh; max-width: none; max-height: none;
  margin: 0; padding: 0; border: 0; background: transparent; overflow: hidden;
  color: #172b46; font: 14px/1.8 'Vazirmatn', Tahoma, sans-serif; letter-spacing: 0;
}
.bc-guide::backdrop { background: transparent; }
.bc-guide *, .bc-guide *::before, .bc-guide *::after { box-sizing: border-box; }
.bc-guide [hidden] { display: none !important; }
.bc-guide-ring {
  position: fixed; pointer-events: none; border: 2px solid #0666ff; border-radius: 24px;
  box-shadow: 0 0 0 9999px #11223f59; background: transparent;
}
.bc-guide-unavailable { background: #11223f59; }
.bc-guide-panel {
  position: fixed; overflow: auto; overscroll-behavior: contain; border-radius: 24px;
  padding: 18px 20px; background: #fff; box-shadow: 0 12px 40px #152b5033;
  border: 1px solid #a6c6fc;
}
.bc-guide-arrow { position: fixed; width: 12px; height: 12px; transform: rotate(45deg); background: #fff; pointer-events: none; }
.bc-guide-arrow[data-side=below] { border-top: 1px solid #a6c6fc; border-left: 1px solid #a6c6fc; }
.bc-guide-arrow[data-side=above] { border-bottom: 1px solid #a6c6fc; border-right: 1px solid #a6c6fc; }
.bc-guide-top { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
.bc-guide-counter { border-radius: 5px; padding: 2px 9px; background: #e8f1ff; color: #1455b6; font-size: 12px; font-weight: 600; }
.bc-guide-close { display: grid; place-items: center; width: 36px; height: 36px; border: 0; border-radius: 6px; background: transparent; color: #43536c; cursor: pointer; }
.bc-guide-close:hover { background: #edf2fa; }
.bc-guide-close svg { width: 18px; height: 18px; }
.bc-guide-title { margin: 12px 0 8px; font-size: 18px; font-weight: 700; line-height: 1.7; overflow-wrap: anywhere; }
.bc-guide-description { margin: 0; color: #43536c; font-size: 14px; line-height: 1.9; white-space: pre-line; overflow-wrap: anywhere; }
.bc-guide-notice { color: #67521d; background: #fff5d9; border-radius: 5px; padding: 8px 10px; font-size: 12px; }
.bc-guide-progress { display: flex; gap: 5px; margin-top: 18px; }
.bc-guide-dot { flex: 1; height: 3px; border-radius: 2px; background: #e0e6ef; }
.bc-guide-dot[data-state=done] { background: #9fc1fa; }
.bc-guide-dot[data-state=current] { background: #0666ff; }
.bc-guide-footer { display: flex; align-items: center; gap: 8px; margin-top: 16px; }
.bc-guide-button { min-height: 40px; padding: 7px 14px; border: 1px solid #cdd6e6; border-radius: 6px; background: #fff; color: #344764; font: inherit; font-size: 13px; font-weight: 500; cursor: pointer; }
.bc-guide-button:hover { background: #edf3fd; }
.bc-guide-button:disabled { opacity: .4; cursor: default; }
.bc-guide-skip { border-color: transparent; margin-inline-end: auto; }
.bc-guide-next { background: #0666ff; border-color: #0666ff; color: #fff; }
.bc-guide-next:hover { background: #0955ce; }
.bc-guide :focus-visible { outline: 2px solid #0666ff; outline-offset: 3px; }
.bc-guide-panel:focus { outline: none; }
.bc-guide-mobile .bc-guide-panel { display: flex; flex-direction: column; padding: 14px 16px; overflow: hidden; }
.bc-guide-mobile .bc-guide-content { min-height: 0; overflow-y: auto; overscroll-behavior: contain; }
.bc-guide-mobile .bc-guide-top, .bc-guide-mobile .bc-guide-progress, .bc-guide-mobile .bc-guide-footer { flex-shrink: 0; }
.bc-guide-mobile .bc-guide-title { margin-top: 10px; font-size: 17px; }
.bc-guide-mobile .bc-guide-description { font-size: 15px; line-height: 1.85; }
.bc-guide-mobile .bc-guide-close { width: 44px; height: 44px; }
.bc-guide-mobile .bc-guide-button { min-height: 44px; min-width: 44px; padding-inline: 12px; }
.bc-guide-mobile .bc-guide-progress { justify-content: center; margin-top: 14px; gap: 6px; }
.bc-guide-mobile .bc-guide-dot { flex: 0 0 6px; height: 6px; border-radius: 50%; }
:root[data-theme=dark] .bc-guide { color: #e3e8f2; }
:root[data-theme=dark] .bc-guide-panel { background: #202631; border-color: #4b6692; }
:root[data-theme=dark] .bc-guide-arrow { background: #202631; border-color: #4b6692; }
:root[data-theme=dark] .bc-guide-description, :root[data-theme=dark] .bc-guide-close { color: #c3cee0; }
:root[data-theme=dark] .bc-guide-button:not(.bc-guide-next) { background: #2b3544; color: #e3e8f2; border-color: #52617b; }
@media (prefers-reduced-motion: reduce) { .bc-guide * { scroll-behavior: auto !important; } }
`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 270:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(601);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(314);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(417);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(303), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_1___ = new URL(/* asset import */ __webpack_require__(475), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_2___ = new URL(/* asset import */ __webpack_require__(366), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_3___ = new URL(/* asset import */ __webpack_require__(743), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_4___ = new URL(/* asset import */ __webpack_require__(505), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
var ___CSS_LOADER_URL_REPLACEMENT_1___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_1___);
var ___CSS_LOADER_URL_REPLACEMENT_2___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_2___);
var ___CSS_LOADER_URL_REPLACEMENT_3___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_3___);
var ___CSS_LOADER_URL_REPLACEMENT_4___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_4___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `:root {
    --table-columnhead-background: #e6edf3;
    --stroke-divider: #c8cccf;
    --table-cell-background-sorted: #f1f2f3;
    --button-subtle-stroke-primary-pressed: #004b85;
    --button-subtle-background-primary-pressed: #ccdbe7;
  }
  /* search box & pagesize & export */
  [data-bc-grid="d1"] [data-bc-grid-header-container] {
    padding: 20px 30px;
    /* border: 1px solid #E9E9EA; */
    border-bottom: none;
    border-radius: 5px 5px 0 0;
    min-height: 67px;
  }
  
  [data-bc-grid="d1"] [data-bc-filter-container],
  [data-bc-grid="d1"] [data-bc-pagesize-container],
  [data-bc-grid="d1"] [data-bc-export-container] {
    display: inline-block;
    /* margin-left: 20px; */
    /* margin-bottom: 20px; */
  }
  
  [data-bc-grid="d1"] [data-bc-filter-container] input[type="text"],
  [data-bc-grid="d1"] [data-bc-filter-container] select {
    width: 190px;
    display: inline-block;
    padding: 5px;
    /* margin-right: 5px; */
    font-size: 12px;
    box-sizing: border-box;
    color: #555;
    background: transparent;
    border: 1px solid #e9e9ea;
    border-radius: 5px;
    transition: border 0.3s linear 0s;
  }
  
  [data-bc-grid="d1"][data-bc-grid-direction="rtl"]
    [data-bc-filter-container]
    input[type="text"],
  [data-bc-grid="d1"][data-bc-grid-direction="rtl"]
    [data-bc-filter-container]
    select {
    margin-right: 5px;
  }
  
  [data-bc-grid="d1"][data-bc-grid-direction="ltr"]
    [data-bc-filter-container]
    input[type="text"],
  [data-bc-grid="d1"][data-bc-grid-direction="ltr"]
    [data-bc-filter-container]
    select {
    margin-left: 5px;
  }
  
  [data-bc-grid="d1"] [data-bc-filter-container] select option {
    font-size: 12px;
  }
  
  [data-bc-grid="d1"][data-bc-grid-direction="rtl"] [data-bc-pagesize-container] {
    float: left;
    margin-right: 20px;
  }
  
  [data-bc-grid="d1"][data-bc-grid-direction="ltr"] [data-bc-pagesize-container] {
    float: right;
    margin-left: 20px;
  }
  
  [data-bc-grid="d1"] [data-bc-pagesize-container] * {
    color: #004b85;
    font-weight: bold;
    font-size: 13px;
  }
  
  [data-bc-grid="d1"] [data-bc-pagesize-container] input[type="text"],
  [data-bc-grid="d1"] [data-bc-pagesize-container] select {
    width: 40px;
    display: inline-block;
    padding: 5px;
    /* margin-right: 5px; */
    font-size: 13px;
    box-sizing: border-box;
    color: #004b85;
    background: inherit;
    border: none;
    /* border-radius: 3px; */
    transition: border 0.3s linear 0s;
    cursor: pointer;
  }
  
  [data-bc-grid="d1"][data-bc-grid-direction="rtl"]
    [data-bc-pagesize-container]
    input[type="text"],
  [data-bc-grid="d1"][data-bc-grid-direction="rtl"]
    [data-bc-pagesize-container]
    select {
    margin-right: 5px;
  }
  
  [data-bc-grid="d1"][data-bc-grid-direction="ltr"]
    [data-bc-pagesize-container]
    input[type="text"],
  [data-bc-grid="d1"][data-bc-grid-direction="ltr"]
    [data-bc-pagesize-container]
    select {
    margin-left: 5px;
  }
  
  [data-bc-grid="d1"] [data-bc-pagesize-container] select option {
    text-align: center;
    font-size: 12px !important;
    font-weight: normal !important;
  }
  
  [data-bc-grid="d1"][data-bc-grid-direction="rtl"] [data-bc-export-container] {
    float: left;
  }
  
  [data-bc-grid="d1"][data-bc-grid-direction="ltr"] [data-bc-export-container] {
    float: right;
  }
  
  [data-bc-grid="d1"] [data-bc-export-container] [data-bc-export-item] {
    width: 26px;
    height: 26px;
    cursor: pointer;
  }
  
  [data-bc-grid="d1"] [data-bc-export-container] [data-bc-export-item] svg {
    width: 26px;
    height: 26px;
  }
  
  /* filter in row */
  [data-bc-grid="d1"] [data-bc-filter] input[type="text"],
  [data-bc-grid="d1"] table[data-bc-table] thead [pop-up-search-form] input[type="text"],
  [data-bc-grid="d1"] [data-bc-filter] select {
    width: 190px;
    display: inline-block;
    padding: 5px;
    /* margin-right: 5px; */
    font-size: 12px;
    box-sizing: border-box;
    color: #555;
    background: rgba(255, 255, 255, 0.8) !important;
    border: 1px solid #fff !important;
    border-radius: 5px;
    transition: border 0.3s linear 0s;
    /* height: 35px; */
  }
  
  [data-bc-grid="d1"] [data-bc-filter] select option {
    font-size: 12px;
  }
  
  [data-bc-grid="d1"] [data-bc-filter] input[type="text"]:focus,
  [data-bc-grid="d1"] table[data-bc-table] thead [pop-up-search-form] input[type="text"]:focus,
  [data-bc-grid="d1"] [data-bc-filter] select:focus {
    background: #fff8ee;
    border-color: #66afe9;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.075) inset,
      0 0 8px rgba(102, 175, 233, 0.6);
    outline: 0 none;
  }
  
  /* main table */
  [data-bc-grid="d1"] table[data-bc-table] {
    width: 100%;
  }
  
  [data-bc-grid="d1"] [data-bc-no-selection] * {
    user-select: none;
    /* standard syntax */
    -webkit-user-select: none;
    /* webkit (safari, chrome) browsers */
    -moz-user-select: none;
    /* mozilla browsers */
    -khtml-user-select: none;
    /* webkit (konqueror) browsers */
    -ms-user-select: none;
    /* IE10+ */
  }
  
  [data-bc-grid="d1"] table[data-bc-table] thead tr {
    background-color: var(--table-columnhead-background);
  }
  
  [data-bc-grid="d1"] table[data-bc-table] thead input[type="text"] {
    width: 80% !important;
    margin: 0 !important;
    text-align: center;
  }
  
  [data-bc-grid="d1"] table[data-bc-table] thead select {
    width: 80% !important;
    margin: 0 !important;
  }
  
  [data-bc-grid="d1"] table[data-bc-table] thead [data-bc-select-value] {
    position: relative;
  }
  
  [data-bc-grid="d1"] table[data-bc-table] thead [data-bc-result] {
    width: 80%;
    /* border: 1px solid #c5c5c5; */
    background-color: #fff;
    position: absolute;
    top: 25px;
    /* right: 0px; */
    max-height: 200px;
    overflow-y: auto;
    scrollbar-width: thin;
    margin: 0;
    padding: 0;
    list-style: none;
  }
  
  [data-bc-grid="d1"][data-bc-grid-direction="rtl"]
    table[data-bc-table]
    thead
    [data-bc-result] {
    right: 0px;
  }
  
  [data-bc-grid="d1"][data-bc-grid-direction="ltr"]
    table[data-bc-table]
    thead
    [data-bc-result] {
    left: 0px;
  }
  
  [data-bc-grid="d1"] table[data-bc-table] thead [data-bc-result] li {
    /* border-bottom: 1px solid #CBD3DD; */
    border: 1px solid #cbd3dd;
    border-top: none;
    /* direction: rtl; */
    /* text-align: right; */
    padding: 5px 5px;
    cursor: pointer;
  }
  
  [data-bc-grid="d1"][data-bc-grid-direction="rtl"]
    table[data-bc-table]
    thead
    [data-bc-result]
    li {
    direction: rtl;
    text-align: right;
  }
  
  [data-bc-grid="d1"][data-bc-grid-direction="ltr"]
    table[data-bc-table]
    thead
    [data-bc-result]
    li {
    direction: ltr;
    text-align: left;
  }
  
  [data-bc-grid="d1"] table[data-bc-table] thead [data-bc-result] li:first-child {
    border-top: 1px solid #cbd3dd;
  }
  
  [data-bc-grid="d1"] table[data-bc-table] thead [data-bc-result] li:hover {
    background-color: #f4faff;
  }
  
  [data-bc-grid="d1"] table[data-bc-table] thead td {
    /* background-color: #DBE8F1; */
    /* text-align: right; */
    padding: 10px 10px;
    font-size: 13px;
    /* border-left: 1px solid #f8f9fa; */
    /* border-right: 1px solid #f8f9fa; */
    color: #004b85;
    font-weight: bold;
    /* padding-top: 0; */
  }
  
  [data-bc-grid="d1"][data-bc-grid-direction="rtl"]
    table[data-bc-table]
    thead
    td {
    text-align: right;
  }
  
  [data-bc-grid="d1"][data-bc-grid-direction="ltr"]
    table[data-bc-table]
    thead
    td {
    text-align: left;
  }
  
  [data-bc-filter] [data-sys-th] {
    padding-top: 0 !important;
  }
  
  [data-bc-grid="d1"] table[data-bc-table] thead td:first-child,
  [data-bc-grid="d1"] table[data-bc-table] thead td:last-child {
    border: none;
  }
  
  [data-bc-grid="d1"] table[data-bc-table] thead td * {
    color: #004b85;
  }
  
  [data-bc-grid="d1"] table[data-bc-table] thead td[data-bc-select-all] {
    text-align: center;
  }
  
  /* [data-bc-grid="d1"] table[data-bc-table] thead tr:first-child td:first-child {
      border-top-right-radius: 3px;
    } */
  
  /* [data-bc-grid="d1"] table[data-bc-table] thead tr:first-child td:last-child {
      border-top-left-radius: 3px;
    } */
  
  /* [data-bc-grid="d1"] table[data-bc-table] thead tr:last-child td {
      border-top: 1px solid #f8f9fa;
    } */
  
  [data-bc-grid="d1"] table[data-bc-table] thead [data-bc-sorting] {
    padding: 25px 25px;
    /* text-align: right; */
    /* cursor: pointer; */
    background-repeat: no-repeat;
    /* background-position: right 1% bottom 50%; */
    /* background-image: url("img/sort_both.png"); */
  }
  
  [data-bc-grid="d1"][data-bc-grid-direction="rtl"]
    table[data-bc-table]
    thead
    [data-bc-sorting] {
    text-align: right;
    background-position: right 1% bottom 50%;
  }
  
  [data-bc-grid="d1"][data-bc-grid-direction="ltr"]
    table[data-bc-table]
    thead
    [data-bc-sorting] {
    text-align: left;
    background-position: left 1% bottom 50%;
  }
  /* 
  [data-bc-grid="d1"] table[data-bc-table] thead [data-bc-sorting="asc"] {
    background-image: url("img/sort_asc.png");
  }
  
  [data-bc-grid="d1"] table[data-bc-table] thead [data-bc-sorting="desc"] {
    background-image: url("img/sort_desc.png");
  } */
  
  [data-bc-grid="d1"] table[data-bc-table] tbody tr:nth-child(2n) {
    background-color: var(--table-cell-background-sorted);
  }
  
  [data-bc-grid="d1"] table[data-bc-table] tbody tr:last-child {
    border-bottom: 0;
  }
  
  [data-bc-grid="d1"] table[data-bc-table] tbody tr:hover {
    /* background-color: rgba(0, 75, 133, 0.1); */
    background-color: #cfd6dc;
  }
  
  [data-bc-grid="d1"] table[data-bc-table] tbody td {
    text-align: center;
    padding: 5px 10px;
    word-break: break-word;
    height: 50px;
  }
  
  [data-bc-grid="d1"] table[data-bc-table] tbody td[data-bc-no-data] {
    text-align: center;
  }
  
  /* [data-bc-grid="d1"] table[data-bc-table] tbody tr:nth-child(2n) td {
      background-color: #F4F4F4;
    } */
  
  [data-bc-grid="d1"]
    table[data-bc-table]
    tbody
    td[data-bc-action]
    [data-bc-icons] {
    display: -webkit-box;
    /* OLD - iOS 6-, Safari 3.1-6 */
    display: -moz-box;
    /* OLD - Firefox 19- (buggy but mostly works) */
    display: -ms-flexbox;
    /* TWEENER - IE 10 */
    display: -moz-flex;
    display: -webkit-flex;
    /* NEW - Chrome */
    display: flex;
    /* NEW, Spec - Opera 12.1, Firefox 20+ */
    -webkit-flex-direction: row;
    flex-direction: row;
    -webkit-align-items: center;
    align-items: center;
    -webkit-justify-content: center;
    justify-content: center;
  }
  
  [data-bc-grid="d1"] table[data-bc-table] tbody td[data-bc-action] a {
    margin: 0 5px;
  }
  
  [data-bc-grid="d1"] table[data-bc-table] tbody td[data-bc-action] i {
    font-size: 17px;
    color: #555;
  }
  
  [data-bc-grid="d1"] table[data-bc-table] tbody td[data-bc-action] img {
    width: 17px;
    height: 17px;
  }
  
  /* footer container */
  [data-bc-grid="d1"] [data-bc-grid-footer-container] {
    background-color: var(--table-columnhead-background);
    border-radius: 0 0 5px 5px;
    padding: 10px 30px;
    min-height: 45px;
    display: flex;
    direction: ltr;
    justify-content: space-between;
    align-items: center;
  }
  
  /* paging */
  [data-bc-grid="d1"] [data-bc-paging-container] {
    /* padding-top: 10px; */
    /* margin-top: 20px; */
    border-radius: 3px;
    /* direction: ltr; */
    /* text-align: left; */
    /* float: left; */
    display: flex;
    align-items: center;
    justify-content: center;
  }
  [data-bc-grid="d1"] [data-bc-paging-container] a,
  [data-bc-grid="d1"] [data-bc-paging-container] span {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  [data-bc-grid="d1"][data-bc-grid-direction="rtl"] [data-bc-paging-container] {
    direction: ltr;
    text-align: left;
  }
  
  [data-bc-grid="d1"][data-bc-grid-direction="ltr"] [data-bc-paging-container] {
    direction: rtl;
    text-align: right;
  }
  
  [data-bc-grid="d1"][data-bc-grid-direction="rtl"] [data-bc-paging-container] * {
    direction: ltr;
  }
  
  [data-bc-grid="d1"][data-bc-grid-direction="ltr"] [data-bc-paging-container] * {
    direction: rtl;
  }
  
  [data-bc-grid="d1"] [data-bc-status] {
    /* border-top: 1px solid #4d576e; */
    /* border-right: 1px solid #4d576e; */
    /* border-bottom: 1px solid #4d576e; */
    padding: 0px 3px;
    cursor: pointer;
    display: inline-block;
    color: #555;
    font-weight: bold;
    margin: 0 3px;
    width: 28px;
    height: 28px;
    line-height: 30px;
    text-align: center;
    vertical-align: middle;
  }
  [data-bc-grid="d1"] [data-bc-page] {
    /* border-top: 1px solid #4d576e; */
    /* border-right: 1px solid #4d576e; */
    /* border-bottom: 1px solid #4d576e; */
    /* padding: 5px 10px; */
    cursor: pointer;
    display: inline-block;
    color: #555;
    font-weight: bold;
    margin: 0 6px;
    width: 28px;
    height: 28px;
    line-height: 30px;
    text-align: center;
    vertical-align: middle;
  }
  [data-bc-grid="d1"] [data-bc-page]:hover {
    color: var(--button-subtle-stroke-primary-pressed);
    background-color: var(--button-subtle-background-primary-pressed);
    border-radius: 5px;
  }
  
  [data-bc-grid="d1"][data-bc-grid-direction="rtl"] [data-bc-start]:first-child,
  [data-bc-grid="d1"][data-bc-grid-direction="rtl"]
    [data-bc-previous]:first-child {
    /* border-left: 1px solid #4d576e; */
    border-radius: 3px 0 0 3px;
  }
  
  [data-bc-grid="d1"][data-bc-grid-direction="ltr"] [data-bc-start]:first-child,
  [data-bc-grid="d1"][data-bc-grid-direction="ltr"]
    [data-bc-previous]:first-child {
    /* border-left: 1px solid #4d576e; */
    border-radius: 0 3px 3px 0;
  }
  
  [data-bc-grid="d1"][data-bc-grid-direction="rtl"] [data-bc-next]:last-child,
  [data-bc-grid="d1"][data-bc-grid-direction="rtl"] [data-bc-end]:last-child {
    border-radius: 0 3px 3px 0;
  }
  
  [data-bc-grid="d1"][data-bc-grid-direction="ltr"] [data-bc-next]:last-child,
  [data-bc-grid="d1"][data-bc-grid-direction="ltr"] [data-bc-end]:last-child {
    border-radius: 3px 0 0 3px;
  }
  
  [data-bc-grid="d1"] [data-bc-status="disabled"] {
    color: lightslategray;
    cursor: no-drop;
  }
  
  [data-bc-grid="d1"] [data-bc-status="disabled"] img {
    filter: grayscale(100%);
    opacity: 0.5;
  }
  
  [data-bc-grid="d1"] [data-bc-page][data-bc-current="true"] {
    border-right: 4px solid var(--button-subtle-stroke-primary-pressed);
    border-left: 4px solid var(--button-subtle-stroke-primary-pressed);
    background-color: var(--button-subtle-background-primary-pressed);
    color: var(--button-subtle-stroke-primary-pressed);
    border-radius: 5px;
  }
  
  [data-bc-grid="d1"] [data-bc-paging-container] input[type="text"] {
    width: 25px;
    height: 25px;
    display: inline-block;
    padding: 5px;
    /* margin-right: 5px; */
    font-size: 13px;
    box-sizing: border-box;
    color: #004b85;
    background: #fff;
    border: 1px solid #d0d0d0 !important;
    border-radius: 3px;
    transition: border 0.3s linear 0s;
    /* text-align: right; */
  }
  
  [data-bc-grid="d1"][data-bc-grid-direction="rtl"]
    [data-bc-paging-container]
    input[type="text"] {
    margin-right: 5px;
    text-align: right;
  }
  
  [data-bc-grid="d1"][data-bc-grid-direction="ltr"]
    [data-bc-paging-container]
    input[type="text"] {
    margin-left: 5px;
    text-align: left;
  }
  
  [data-bc-grid="d1"] [data-bc-paging-container] input[type="text"]:hover {
    border: 1px solid #004b85 !important;
  }
  
  /*  */
  
  [data-bc-grid="d1"] [data-bc-table-container][data-process] {
    cursor: pointer;
    background-repeat: no-repeat;
    background-position: right 50% bottom 50%;
    background-image: url(${___CSS_LOADER_URL_REPLACEMENT_0___});
  }
  
  /* information */
  [data-bc-grid="d1"] [data-bc-information-container] {
    /* padding-top: 10px; */
    /* margin-top: 20px; */
    border-radius: 3px;
    /* direction: ltr; */
    /* text-align: right; */
    line-height: 25px;
    /* float: left; */
    font-size: 12px;
    color: #004b85;
    font-weight: bold;
  }
  
  [data-bc-grid="d1"][data-bc-grid-direction="rtl"]
    [data-bc-information-container] {
    direction: ltr;
    text-align: right;
    float: left;
  }
  
  [data-bc-grid="d1"][data-bc-grid-direction="ltr"]
    [data-bc-information-container] {
    direction: rtl;
    text-align: left;
    float: right;
  }
  
  /*widthCard*/
  [data-bc-card-wrapper] {
    /* grid-template-columns: repeat(5, 1fr); */
    /* display: grid; */
    /* grid-column-gap: 20px; */
    /* grid-row-gap: 20px; */
    border: 1px solid #e9e9ea;
    border-bottom: none;
  }
  
  [data-bc-card] {
    border: 1px solid #d0d0d0;
    border-radius: 5px;
    display: inline-block;
    margin: 10px;
  }
  
  [data-bc-grid-modes] {
    /* float: right; */
    display: flex;
  }
  
  [data-bc-grid="d1"][data-bc-grid-direction="rtl"] [data-bc-grid-modes] {
    float: right;
  }
  
  [data-bc-grid="d1"][data-bc-grid-direction="ltr"] [data-bc-grid-modes] {
    float: left;
  }
  
  [data-bc-grid-modes] div {
    border: 1px solid #ccc;
    width: 25px;
    height: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  
  [data-bc-grid-modes] div svg {
    fill: #000;
  }
  
  /* [data-bc-widthcard-mode] {
      border: 1px solid #E9E9EA;
      border-radius: 5px;
      padding: 10px;
  } */
  
  /* [data-bc-widthcard-mode] [data-bc-grid-header-container] {
      border: none;
  } */
  
  [data-bc-mian-grid] {
    border-radius: 5px;
    /* overflow: hidden; */
    border: 1px solid var(--stroke-divider);
    margin-bottom: 30px;
  }
  [data-bc-next] {
    vertical-align: text-top;
  }
  /* [data-sys-input-text]{
      border: 1px solid #C8CCCF;
      border-radius: 4px;
      width: 34px;
      height: 34px;
      text-align: center;
  } */
  [data-bc-paging-number] label {
    margin-left: 12px;
  }
  [data-bc-previous] {
    margin-right: 33px !important;
  }
  [data-bc-next] {
    margin-left: 33px !important;
  }
  [data-bc-paging-number] {
    direction: rtl;
  }
  [data-bc-grid-direction="ltr"] [data-bc-grid-footer-container] {
    direction: rtl !important;
  }
  [data-bc-grid-direction="ltr"] [data-bc-paging-container] {
    direction: ltr !important;
  }
  [data-bc-page-number] {
    width: 34px;
    height: 34px;
    background-color: #fff !important;
    border-radius: 4px;
    text-align: center;
    border: 1px solid var(--stroke-divider);
  }
  [data-bc-grid="d1"] [data-bc-table-container] [data-sys-th][data-bc-sorting] {
    position: relative;
  }
  [data-bc-grid="d1"] [data-bc-table-container] [pop-up-search-form] {
    /* right: 0; */
    padding: 5px;
    background-color: #fff;
    z-index: 1000;
    background-color: var(--table-columnhead-background);
    position: absolute;
    /* top: 0px; */
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 5px;
    min-width: 170px;
  }
  
  [data-bc-grid="d1"] table[data-bc-table] thead [pop-up-search-form] input[type="text"] {
    width: 85% !important;
    padding: 5px;
    border: 1px solid var(--stroke-divider)!important;
  }
  
  [data-bc-grid="d1"] [data-bc-table-container] [pop-up-search-form] span {
    margin-left: 5px;
    cursor: pointer;
    color: #888;
    font-size: 14px;
  }
  
  [data-bc-grid="d1"] [data-bc-table-container] [pop-up-search-form] span:hover {
    color: #555;
  }
  
  [data-bc-grid="d1"] table[data-bc-table] thead [data-sys-th-sort-icon]{
    cursor: pointer;
    background-image: url(${___CSS_LOADER_URL_REPLACEMENT_1___});
  
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    width: 12px;
    height: 12px;
  
  }
  [data-bc-grid="d1"] table[data-bc-table] thead [open-pop-up-search-form]{
    cursor: pointer;
    background-image: url(${___CSS_LOADER_URL_REPLACEMENT_2___});
    background-repeat: no-repeat;
    background-size: contain;
    width: 15px;
    height: 15px;
    flex-shrink: 0;
  }
  [data-bc-grid="d1"] table[data-bc-table] thead [data-sys-th-container]{
    display: flex;
    align-items: center;
    column-gap: 8px;
    position: relative;
    justify-content: right;
  }
 
  [data-bc-grid="d1"] table[data-bc-table] thead [data-sys-th-container] [data-sys-th-sort-icon-container]{
  display: flex;
  column-gap: 8px;
  align-items: center;
  flex-direction: row-reverse;
  }
  [data-bc-grid="d1"] table[data-bc-table] thead [data-sys-th-sort-icon="asc"] {
    background-image: url(${___CSS_LOADER_URL_REPLACEMENT_3___});
  }
  
  [data-bc-grid="d1"] table[data-bc-table] thead [data-sys-th-sort-icon="desc"] {
    background-image: url(${___CSS_LOADER_URL_REPLACEMENT_4___});
  }`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 882:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(601);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(314);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(417);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(303), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/* search box & pagesize */
[data-bc-grid="d2"] [data-bc-grid-header-container] {
  /* padding: 10px 0; */
  /* border: 1px solid #E9E9EA; */
  /* border-bottom: none; */
  /* border-radius: 5px 5px 0 0; */
  /* min-height: 67px; */
  margin-bottom: 25px;
}

[data-bc-grid="d2"] [data-bc-filter-container],
[data-bc-grid="d2"] [data-bc-pagesize-container],
[data-bc-grid="d2"] [data-bc-export-container] {
  display: block;
  text-align: center;
  /* margin-left: 20px; */
  margin-bottom: 10px;
}

[data-bc-grid="d2"] [data-bc-filter-container] input[type="text"],
[data-bc-grid="d2"] [data-bc-filter-container] select {
  width: 190px;
  display: inline-block;
  padding: 5px;
  /* margin-right: 5px; */
  font-size: 12px;
  box-sizing: border-box;
  color: #555;
  background: transparent;
  border: 1px solid #e9e9ea;
  border-radius: 5px;
  transition: border 0.3s linear 0s;
}

[data-bc-grid="d2"][data-bc-grid-direction="rtl"] [data-bc-filter-container] input[type="text"],
[data-bc-grid="d2"][data-bc-grid-direction="rtl"] [data-bc-filter-container] select {
  margin-right: 5px;
}

[data-bc-grid="d2"][data-bc-grid-direction="ltr"] [data-bc-filter-container] input[type="text"],
[data-bc-grid="d2"][data-bc-grid-direction="ltr"] [data-bc-filter-container] select {
  margin-left: 5px;
}

[data-bc-grid="d2"] [data-bc-filter-container] select option {
  font-size: 12px;
}

/* [data-bc-grid="d2"] [data-bc-pagesize-container] {
    float: left;
} */

[data-bc-grid="d2"] [data-bc-pagesize-container] * {
  color: #004b85;
  font-weight: bold;
  font-size: 13px;
}

[data-bc-grid="d2"] [data-bc-pagesize-container] input[type="text"],
[data-bc-grid="d2"] [data-bc-pagesize-container] select {
  width: 40px;
  display: inline-block;
  padding: 5px;
  /* margin-right: 5px; */
  font-size: 13px;
  box-sizing: border-box;
  color: #004b85;
  background: inherit;
  border: none;
  /* border-radius: 3px; */
  transition: border 0.3s linear 0s;
  cursor: pointer;
}

[data-bc-grid="d2"][data-bc-grid-direction="rtl"] [data-bc-pagesize-container] input[type="text"],
[data-bc-grid="d2"][data-bc-grid-direction="rtl"] [data-bc-pagesize-container] select {
  margin-right: 5px;
}

[data-bc-grid="d2"][data-bc-grid-direction="ltr"] [data-bc-pagesize-container] input[type="text"],
[data-bc-grid="d2"][data-bc-grid-direction="ltr"] [data-bc-pagesize-container] select {
  margin-left: 5px;
}

[data-bc-grid="d2"] [data-bc-pagesize-container] select option {
  text-align: center;
  font-size: 12px !important;
  font-weight: normal !important;
}

[data-bc-grid="d2"] [data-bc-export-container] {
  display: -webkit-box;
  /* OLD - iOS 6-, Safari 3.1-6 */
  display: -moz-box;
  /* OLD - Firefox 19- (buggy but mostly works) */
  display: -ms-flexbox;
  /* TWEENER - IE 10 */
  display: -moz-flex;
  display: -webkit-flex;
  /* NEW - Chrome */
  display: flex;
  /* NEW, Spec - Opera 12.1, Firefox 20+ */
  /* -webkit-flex-direction: row; */
  /* flex-direction: row; */
  -webkit-align-items: center;
  align-items: center;
  -webkit-justify-content: center;
  justify-content: center;
}

[data-bc-grid="d2"][data-bc-grid-direction="rtl"] [data-bc-export-container] {
  -webkit-flex-direction: row;
  flex-direction: row;
}

[data-bc-grid="d2"][data-bc-grid-direction="ltr"] [data-bc-export-container] {
  -webkit-flex-direction: row-reverse;
  flex-direction: row-reverse;
}

[data-bc-grid="d2"] [data-bc-export-container] [data-bc-export-item] {
  width: 26px;
  height: 26px;
  cursor: pointer;
}

[data-bc-grid="d2"] [data-bc-export-container] [data-bc-export-item] svg {
  width: 26px;
  height: 26px;
} 

/* filter in row */
[data-bc-grid="d2"] [data-bc-filter] {
  width: 100%;
  margin-bottom: 20px;
}

[data-bc-grid="d2"] [data-bc-filter] [data-bc-filter-btn-wrapper] {
  width: 100%;
}

[data-bc-grid="d2"] [data-bc-filter] [data-bc-filter-btn] {
  position: relative;
  width: 18px;
  height: 12px;
  cursor: pointer;
}

[data-bc-grid="d2"] [data-bc-filter] [data-bc-filter-btn-line] {
  position: absolute;
  /* left: 50%; */
  /* transform: translateX(-50%); */
  display: inline-block;
  /* width: 100%; */
  height: 2px;
  border-radius: 5px;
  transition: all 0.3s;
  background: #767676;
}

[data-bc-grid="d2"][data-bc-grid-direction="rtl"] [data-bc-filter] [data-bc-filter-btn-line] {
  left: 50%;
  transform: translateX(-50%);
}

[data-bc-grid="d2"][data-bc-grid-direction="ltr"] [data-bc-filter] [data-bc-filter-btn-line] {
  right: 50%;
  transform: translateX(50%);
}

[data-bc-grid="d2"] [data-bc-filter] [data-bc-filter-btn-line="line1"] {
  width: 100%;
  top: 0;
}
[data-bc-grid="d2"] [data-bc-filter] [data-bc-filter-btn-line="line2"] {
  width: 70%;
  top: 0;
  bottom: 0;
  margin: auto;
}

[data-bc-grid="d2"] [data-bc-filter] [data-bc-filter-btn-line="line3"] {
  width: 30%;
  bottom: 0px;
}

[data-bc-grid="d2"] [data-bc-filter] [data-bc-filter-btn].active [data-bc-filter-btn-line="line1"] {
  transform: translateX(0) translateY(5px) rotate(45deg) !important;
  width: 100%;
  /* left: 0; */
}

[data-bc-grid="d2"][data-bc-grid-direction="rtl"] [data-bc-filter] [data-bc-filter-btn].active [data-bc-filter-btn-line="line1"] {
  left: 0;
}

[data-bc-grid="d2"][data-bc-grid-direction="ltr"] [data-bc-filter] [data-bc-filter-btn].active [data-bc-filter-btn-line="line1"] {
  right: 0;
}

[data-bc-grid="d2"] [data-bc-filter] [data-bc-filter-btn].active [data-bc-filter-btn-line="line2"] {
  opacity: 0;
}

[data-bc-grid="d2"] [data-bc-filter] [data-bc-filter-btn].active [data-bc-filter-btn-line="line3"] {
  transform: translateX(0px) translateY(-5px) rotate(-45deg) !important;
  width: 100%;
  /* left: 0; */
}

[data-bc-grid="d2"][data-bc-grid-direction="rtl"] [data-bc-filter] [data-bc-filter-btn].active [data-bc-filter-btn-line="line3"] {
  left: 0;
}

[data-bc-grid="d2"][data-bc-grid-direction="ltr"] [data-bc-filter] [data-bc-filter-btn].active [data-bc-filter-btn-line="line3"] {
  right: 0;
}

[data-bc-grid="d2"] [data-bc-filter] [data-bc-filter-items] {
  list-style-type: none;
  background: white;
  width: 100%;
  overflow: hidden;
  max-height: 0;
  transition: max-height 0.45s cubic-bezier(0.44, 0.99, 0.48, 1);
}

[data-bc-grid="d2"] [data-bc-filter] [data-bc-filter-item] {
  /* height: 50px; */
  /* line-height: 50px; */
  /* border-top: 1px solid #e9ecef; */
  padding: 0 0 5px;
}

[data-bc-grid="d2"] [data-bc-filter] [data-bc-filter-item]:first-child {
  margin-top: 20px;
}

[data-bc-grid="d2"] [data-bc-filter].active [data-bc-filter-items] {
  max-height: 500px;
  overflow: auto;
}

[data-bc-grid="d2"] [data-bc-filter] input[type="text"],
[data-bc-grid="d2"] [data-bc-filter] select {
  width: 100%;
  display: inline-block;
  padding: 5px;
  /* margin-right: 5px; */
  font-size: 12px;
  box-sizing: border-box;
  color: #555;
  background: #f5f8f9;
  border: 1px solid #c7d6db;
  border-radius: 3px;
  transition: border 0.3s linear 0s;
}

[data-bc-grid="d2"] [data-bc-filter] select option {
  font-size: 12px;
}

[data-bc-grid="d2"] [data-bc-filter] input[type="text"]:focus,
[data-bc-grid="d2"] [data-bc-filter] select:focus {
  background: #fff8ee;
  border-color: #66afe9;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.075) inset,
    0 0 8px rgba(102, 175, 233, 0.6);
  outline: 0 none;
}

[data-bc-grid="d2"] [data-bc-filter] [data-bc-select-value] {
  position: relative;
}

[data-bc-grid="d2"] [data-bc-filter] [data-bc-result] {
  width: 100%;
  /* border: 1px solid #c5c5c5; */
  background-color: #FFF;
  position: absolute;
  top: 25px;
  /* right: 0px; */
  max-height: 200px;
  overflow-y: auto;
  scrollbar-width: thin;
  margin: 0;
  padding: 0;
  list-style: none;
}

[data-bc-grid="d2"][data-bc-grid-direction="rtl"] [data-bc-filter] [data-bc-result] {
  right: 0px;
}

[data-bc-grid="d2"][data-bc-grid-direction="ltr"] [data-bc-filter] [data-bc-result] {
  left: 0px;
}

[data-bc-grid="d2"] [data-bc-filter] [data-bc-result] li {
  /* border-bottom: 1px solid #CBD3DD; */
  border: 1px solid #CBD3DD;
  border-top: none;
  /* direction: rtl; */
  /* text-align: right; */
  padding: 5px 5px;
  cursor: pointer;
}

[data-bc-grid="d2"][data-bc-grid-direction="rtl"] [data-bc-filter] [data-bc-result] li {
  direction: rtl;
  text-align: right;
}

[data-bc-grid="d2"][data-bc-grid-direction="ltr"] [data-bc-filter] [data-bc-result] li {
  direction: ltr;
  text-align: left;
}

[data-bc-grid="d2"] [data-bc-filter] [data-bc-result] li:first-child {
  border-top: 1px solid #CBD3DD;
}

[data-bc-grid="d2"] [data-bc-filter] [data-bc-result] li:hover {
  background-color: #f4faff;
}

/* main table */
/* main table --> template1 */
[data-bc-grid="d2"] div[data-bc-grid-temp1-items] {
  width: 100%;
  margin-bottom: 15px;
  padding-bottom: 10px;
  /* float: right; */
  text-align: center;
  height: 150px;
  /* border-radius: 5px; */
  border-bottom: 1px solid #e9e9ea;
}

[data-bc-grid="d2"][data-bc-grid-direction="rtl"] div[data-bc-grid-temp1-items] {
  float: right;
}

[data-bc-grid="d2"][data-bc-grid-direction="ltr"] div[data-bc-grid-temp1-items] {
  float: left;
}

[data-bc-grid="d2"] div[data-bc-grid-temp1-items] [data-bc-grid-temp1-section="#1"] {
  width: 50px;
  height: 100%;
  /* float: right; */
  /* background-color: lightblue; */
}

[data-bc-grid="d2"][data-bc-grid-direction="rtl"] div[data-bc-grid-temp1-items] [data-bc-grid-temp1-section="#1"] {
  float: right;
}

[data-bc-grid="d2"][data-bc-grid-direction="ltr"] div[data-bc-grid-temp1-items] [data-bc-grid-temp1-section="#1"] {
  float: left;
}

[data-bc-grid="d2"] div[data-bc-grid-temp1-items] [data-bc-grid-temp1-section="#2"] {
  width: calc(100% - 50px);
  /* padding-right: 20px; */
  height: 100%;
  /* float: right; */
  /* background-color: lightcoral; */
}

[data-bc-grid="d2"][data-bc-grid-direction="rtl"] div[data-bc-grid-temp1-items] [data-bc-grid-temp1-section="#2"] {
  padding-right: 20px;
  float: right;
}

[data-bc-grid="d2"][data-bc-grid-direction="ltr"] div[data-bc-grid-temp1-items] [data-bc-grid-temp1-section="#2"] {
  padding-left: 20px;
  float: left;
}

[data-bc-grid="d2"] div[data-bc-grid-temp1-items] [data-bc-grid-temp1-section="#3"] {
  width: 100%;
  height: 40px;
  /* background-color: lightcyan; */
}

[data-bc-grid="d2"] div[data-bc-grid-temp1-items] [data-bc-grid-temp1-section="#4"] {
  width: calc(100% - 80px);
  height: 100%;
  display: inline-block;
  /* float: right; */
  /* background-color: lightgoldenrodyellow; */
}

[data-bc-grid="d2"][data-bc-grid-direction="rtl"] div[data-bc-grid-temp1-items] [data-bc-grid-temp1-section="#4"] {
  float: right;
}

[data-bc-grid="d2"][data-bc-grid-direction="ltr"] div[data-bc-grid-temp1-items] [data-bc-grid-temp1-section="#4"] {
  float: left;
}

[data-bc-grid="d2"] div[data-bc-grid-temp1-items] [data-bc-grid-temp1-section="#5"] {
  width: 80px;
  height: 100%;
  display: inline-block;
  /* background-color: lightgray; */
}

[data-bc-grid="d2"] div[data-bc-grid-temp1-items] [data-bc-grid-temp1-section="#6"] {
  width: 100%;
  height: calc(100% - 40px);
  /* background-color: lightpink; */
}

[data-bc-grid="d2"] div[data-bc-grid-temp1-items] [data-bc-grid-temp1-section="#7"] {
  width: 100%;
  height: 35px;
  /* background-color: lightgreen; */
}

[data-bc-grid="d2"] div[data-bc-grid-temp1-items] [data-bc-grid-temp1-section="#8"] {
  width: 100%;
  height: calc(100% - 35px);
  padding: 5px 0;
  /* background-color: lightsalmon; */
}

[data-bc-grid="d2"] div[data-bc-grid-temp1-items] [data-bc-grid-temp1-section="#9"] {
  width: 100%;
  height: 50%;
  /* background-color: lightseagreen; */
}

[data-bc-grid="d2"] div[data-bc-grid-temp1-items] [data-bc-grid-temp1-section="#10"] {
  width: 100%;
  height: 50%;
  /* background-color: lightskyblue; */
}

/* main table --> template2 */
[data-bc-grid="d2"] div[data-bc-grid-temp2-items] {
  width: 100%;
  margin-bottom: 15px;
  padding: 0 5px 10px 5px;
  /* float: right; */
  text-align: center;
  height: 180px;
  /* border-radius: 5px; */
  border-bottom: 1px solid #e9e9ea;
}

[data-bc-grid="d2"][data-bc-grid-direction="rtl"] div[data-bc-grid-temp2-items] {
  float: right;
}

[data-bc-grid="d2"][data-bc-grid-direction="ltr"] div[data-bc-grid-temp2-items] {
  float: left;
}

[data-bc-grid="d2"] div[data-bc-grid-temp2-items] [data-bc-grid-temp2-section="#1"] {
  width: 100%;
  height: 105px;
  /* float: right; */
  /* background-color: lightblue; */
}

[data-bc-grid="d2"] div[data-bc-grid-temp2-items] [data-bc-grid-temp2-section="#2"] {
  width: 100%;
  height: calc(100% - 105px);
  padding: 5px 10px 0;
  /* float: right; */
  /* background-color: lightcoral; */
}

[data-bc-grid="d2"] div[data-bc-grid-temp2-items] [data-bc-grid-temp2-section="#3"] {
  width: 100%;
  height: 35px;
  /* background-color: lightcyan; */
}

[data-bc-grid="d2"] div[data-bc-grid-temp2-items] [data-bc-grid-temp2-section="#4"] {
  width: calc(100% - 80px);
  height: 100%;
  display: inline-block;
  float: right;
  /* background-color: lightgoldenrodyellow; */
}

[data-bc-grid="d2"][data-bc-grid-direction="rtl"] div[data-bc-grid-temp2-items] [data-bc-grid-temp2-section="#4"] {
  float: right;
}

[data-bc-grid="d2"][data-bc-grid-direction="ltr"] div[data-bc-grid-temp2-items] [data-bc-grid-temp2-section="#4"] {
  float: left;
}

[data-bc-grid="d2"] div[data-bc-grid-temp2-items] [data-bc-grid-temp2-section="#5"] {
  width: 80px;
  height: 100%;
  display: inline-block;
  /* background-color: lightgray; */
}

[data-bc-grid="d2"] div[data-bc-grid-temp2-items] [data-bc-grid-temp2-section="#6"] {
  width: 100%;
  height: calc(100% - 35px);
  /* background-color: lightpink; */
}

[data-bc-grid="d2"] div[data-bc-grid-temp2-items] [data-bc-grid-temp2-section="#7"] {
  width: 100%;
  height: 100%;
  /* background-color: lightgreen; */
}

[data-bc-grid="d2"]
  div[data-bc-grid-temp3-items]
  [data-bc-grid-temp3-section="#1"] {
  width: 50%;
  
  /* background-color: lightgreen; */
}

[data-bc-grid="d2"] div[data-bc-grid-temp3-items] {
  width: 100%;
  margin-bottom: 15px;
  padding: 0 5px 10px 5px;
  float: right;
  text-align: center;
  height: auto;
  border-radius: 5px; 
  border-bottom: 1px solid #e9e9ea; 
 } 

 [data-bc-grid="d2"] div[data-bc-grid-temp3-items] [data-bc-grid-temp3-section="#2"] {
  
  width: 50%;
}
[data-bc-grid="d2"] div[data-bc-grid-temp3-items] [data-bc-grid-temp3-section="#3"] {
  
  display: flex;
}



/* footer container */
[data-bc-grid="d2"] [data-bc-grid-footer-container] {
  /* background-color: #DBE8F1; */
  /* border-radius: 0 0 5px 5px; */
  /* padding: 10px 30px; */
  min-height: 45px;
}

/* paging */
[data-bc-grid="d2"] [data-bc-paging-container] {
  /* padding-top: 10px; */
  /* margin-top: 20px; */
  border-radius: 3px;
  /* direction: ltr; */
  text-align: right;
  /* float: left; */
  display: block;
  margin-bottom: 10px;
}

[data-bc-grid="d2"][data-bc-grid-direction="rtl"] [data-bc-paging-container] {
  direction: ltr;
}

[data-bc-grid="d2"][data-bc-grid-direction="ltr"] [data-bc-paging-container] {
  direction: rtl;
}

[data-bc-grid="d2"][data-bc-grid-direction="rtl"] [data-bc-paging-container] * {
  direction: ltr;
}

[data-bc-grid="d2"][data-bc-grid-direction="ltr"] [data-bc-paging-container] * {
  direction: rtl;
}

[data-bc-grid="d2"] [data-bc-status] {
  /* border-top: 1px solid #4d576e; */
  /* border-right: 1px solid #4d576e; */
  /* border-bottom: 1px solid #4d576e; */
  padding: 0px 10px;
  cursor: pointer;
  display: inline-block;
  color: #555;
  font-weight: bold;
  margin: 0 3px;
  /* width: 25px; */
  height: 25px;
  line-height: 25px;
  text-align: center;
  vertical-align: middle;
}

[data-bc-grid="d2"] [data-bc-page] {
  /* border-top: 1px solid #4d576e; */
  /* border-right: 1px solid #4d576e; */
  /* border-bottom: 1px solid #4d576e; */
  /* padding: 5px 10px; */
  cursor: pointer;
  display: inline-block;
  color: #555;
  font-weight: bold;
  margin: 0 3px;
  width: 25px;
  height: 25px;
  line-height: 25px;
  text-align: center;
  vertical-align: middle;
}

[data-bc-grid="d2"] [data-bc-page]:hover {
  color: #004b85;
  background-color: rgba(0, 75, 133, 0.1);
  border-radius: 5px;
}

[data-bc-grid="d2"][data-bc-grid-direction="rtl"] [data-bc-start]:first-child,
[data-bc-grid="d2"][data-bc-grid-direction="rtl"] [data-bc-previous]:first-child {
  /* border-left: 1px solid #4d576e; */
  border-radius: 3px 0 0 3px;
}

[data-bc-grid="d2"][data-bc-grid-direction="ltr"] [data-bc-start]:first-child,
[data-bc-grid="d2"][data-bc-grid-direction="ltr"] [data-bc-previous]:first-child {
  /* border-left: 1px solid #4d576e; */
  border-radius: 0 3px 3px 0;
}

[data-bc-grid="d2"][data-bc-grid-direction="rtl"] [data-bc-next]:last-child,
[data-bc-grid="d2"][data-bc-grid-direction="rtl"] [data-bc-end]:last-child {
  border-radius: 0 3px 3px 0;
}

[data-bc-grid="d2"][data-bc-grid-direction="ltr"] [data-bc-next]:last-child,
[data-bc-grid="d2"][data-bc-grid-direction="ltr"] [data-bc-end]:last-child {
  border-radius: 3px 0 0 3px;
}

[data-bc-grid="d2"] [data-bc-status="disabled"] {
  color: lightslategray;
  cursor: no-drop;
}

[data-bc-grid="d2"] [data-bc-status="disabled"] img {
  filter: grayscale(100%);
  opacity: 0.5;
}

[data-bc-grid="d2"] [data-bc-page][data-bc-current="true"] {
  background-color: #004b85;
  color: #fff;
  border-radius: 5px;
}

[data-bc-grid="d2"] [data-bc-paging-container] input[type="text"] {
  width: 25px;
  height: 25px;
  display: inline-block;
  padding: 5px;
  /* margin-right: 5px; */
  font-size: 13px;
  box-sizing: border-box;
  color: #004b85;
  background: #fff;
  border: 1px solid #d0d0d0 !important;
  border-radius: 3px;
  transition: border 0.3s linear 0s;
  /* text-align: right; */
}

[data-bc-grid="d2"][data-bc-grid-direction="rtl"] [data-bc-paging-container] input[type="text"] {
  margin-right: 5px;
  text-align: right;
}

[data-bc-grid="d2"][data-bc-grid-direction="ltr"] [data-bc-paging-container] input[type="text"] {
  margin-left: 5px;
  text-align: left;
}

[data-bc-grid="d2"] [data-bc-paging-container] input[type="text"]:hover {
  border: 1px solid #004b85 !important;
}

/*  */

[data-bc-grid="d2"] [data-bc-table-container][data-process] {
  cursor: pointer;
  background-repeat: no-repeat;
  background-position: right 50% bottom 50%;
  background-image: url(${___CSS_LOADER_URL_REPLACEMENT_0___});
}

/* information */
[data-bc-grid="d2"] [data-bc-information-container] {
  /* padding-top: 10px; */
  /* margin-top: 20px; */
  border-radius: 3px;
  /* direction: ltr; */
  text-align: center;
  line-height: 25px;
  /* float: left; */
  font-size: 12px;
  color: #004b85;
  font-weight: bold;
  display: block;
}

[data-bc-grid="d2"][data-bc-grid-direction="rtl"] [data-bc-information-container] {
  direction: ltr;
}

[data-bc-grid="d2"][data-bc-grid-direction="ltr"] [data-bc-information-container] {
  direction: rtl;
}

[data-bc-inputs-container] {
  display: flex;
  width: 100%;
  justify-content: start;
  align-items: center;
  flex-direction: column;
  padding: 10px;
}

[data-bc-input-row] {
  display: flex;
  width: 100%;
  justify-content: end;
  align-items: center;
  flex-direction: row;
  margin-block: 12px;
}

[data-bc-input-title] {
  margin-inline: 10px;
  width: 40px;
  text-align: end;
}

[data-bc-grid-selectable]{
  float: right;
}










`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 145:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(601);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(314);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.clr {
  clear: both;
}

/* all */
[data-bc-grid] * {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-size: 14px;
  color: #25213b;
  border-collapse: collapse;
}
[data-bc-grid-input] {
  border: 3px solid rgb(39, 103, 243);
  border-radius: 5px;
  text-align: end;
}

[data-bc-grid-input-error] {
  border: 3px solid rgb(238, 82, 82);
  border-radius: 5px;
}

/* tooltip export */
[data-bc-export-tooltip] {
  position: relative;
  z-index: 2;
  cursor: pointer;
}

[data-bc-export-tooltip]:before,
[data-bc-export-tooltip]:after {
  visibility: hidden;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
  filter: progid: DXImageTransform.Microsoft.Alpha(Opacity=0);
  opacity: 0;
  pointer-events: none;
  transition: all .5s;
  -webkit-transition: all .5s;
  -moz-transition: all .5s;
  -o-transition: all .5s;
}

[data-bc-export-tooltip]:before {
  position: absolute;
  /* left: 0; */
  /* margin-bottom: 5px; */
  /* margin-right: -15px; */
  /* transform: translateX(-50%); */
  padding: 10px 7px;
  width: max-content;
  border-radius: 10px;
  background-color: #fff;
  background-color: #767676 ;
  color: #fff;
  /* content: attr(data-widget-add-dashboard); */
  content: attr(data-bc-export-tooltip);
  text-align: center;
  font-size: 12px;
  line-height: 1.2;
  /* right: 8%; */
  top: -40px;
}

[data-bc-grid-direction="rtl"] [data-bc-export-tooltip]:before {
  right: 8%;
}

[data-bc-grid-direction="ltr"] [data-bc-export-tooltip]:before {
  left: 8%;
}

[data-bc-export-tooltip]:after {
  position: absolute;
  top: -7px;
  /* left: 50%; */
  /* margin-left: -5px; */
  width: 0;
  border-top: 5px solid #000;
  border-top: 5px solid #767676;
  border-right: 5px solid transparent;
  border-left: 5px solid transparent;
  content: " ";
  font-size: 0;
  line-height: 0;
}

[data-bc-grid-direction="rtl"] [data-bc-export-tooltip]:after {
  left: 50%;
  margin-left: -5px;
}

[data-bc-grid-direction="ltr"] [data-bc-export-tooltip]:after {
  right: 50%;
  margin-right: -5px;
}

[data-bc-export-tooltip]:hover:before,
[data-bc-export-tooltip]:hover:after {
  visibility: visible;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)";
  filter: progid: DXImageTransform.Microsoft.Alpha(Opacity=100);
  opacity: 1;
}`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 272:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(601);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(314);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/* Opt out of legacy resets without changing the legacy stylesheets. */
[data-bc-grid-template="template4"] { margin-bottom: 0; }
[data-bc-grid-template="template4"] * { padding: revert; margin: revert; font-size: inherit; color: inherit; }
:where([data-bc-grid-template="template4"]) {color:var(--text);font-family:'Vazirmatn',Tahoma,sans-serif} :where([data-bc-grid-template="template4"]) *,:where([data-bc-grid-template="template4"]) *::before,:where([data-bc-grid-template="template4"]) *::after{box-sizing:border-box} :where([data-bc-grid-template="template4"]) button,:where([data-bc-grid-template="template4"]) input,:where([data-bc-grid-template="template4"]) select{font:inherit} :where([data-bc-grid-template="template4"]) button{cursor:pointer} :where([data-bc-grid-template="template4"]) svg{display:block;vertical-align:middle} :where([data-bc-grid-template="template4"]){font-family:'Vazirmatn',Tahoma,sans-serif;color:#1a1b20;background:#f9f9ff;font-synthesis:none;--primary:#365f91;--on-primary:#fff;--primary-container:#d3e4ff;--on-primary-container:#001c39;--secondary-container:#d9e3f7;--surface:#f9f9ff;--surface-low:#f3f3fa;--surface-container:#ededf4;--surface-high:#e7e7ee;--surface-highest:#e1e2e9;--outline:#757780;--outline-variant:#c4c6d0;--text:#1a1b20;--muted:#45464f;--success:#28683e;--success-bg:#b5f1c7;--warning:#735b00;--warning-bg:#ffe08b;--error:#ba1a1a;--error-bg:#ffdad6;--info:#345e91;--info-bg:#d3e4ff}
:root[data-theme=dark] :where([data-bc-grid-template="template4"]){color-scheme:dark;--primary:#a5c8ff;--on-primary:#07305c;--primary-container:#1d4776;--on-primary-container:#d3e4ff;--secondary-container:#3e485b;--surface:#111318;--surface-low:#1b1b20;--surface-container:#202127;--surface-high:#2a2b31;--surface-highest:#35363c;--outline:#8f9099;--outline-variant:#45464f;--text:#e3e2e9;--muted:#c5c6d0;--success:#99dba9;--success-bg:#1f5132;--warning:#e9c349;--warning-bg:#594900;--error:#ffb4ab;--error-bg:#690005;--info:#a5c8ff;--info-bg:#1d4776}:where([data-bc-grid-template="template4"]) .search-field,:where([data-bc-grid-template="template4"]) .pagination,:where([data-bc-grid-template="template4"]) .page-controls,:where([data-bc-grid-template="template4"]) .page-size,:where([data-bc-grid-template="template4"]) .list-item,:where([data-bc-grid-template="template4"]) .card-heading{display:flex;align-items:center}:where([data-bc-grid-template="template4"]) .icon-button{width:40px;height:40px;display:inline-grid;place-items:center;padding:0;border:0;border-radius:50%;background:transparent;transition:.2s}:where([data-bc-grid-template="template4"]) .icon-button:hover{background:var(--surface-high)}:where([data-bc-grid-template="template4"]) .icon-button:active{transform:scale(.94)}:where([data-bc-grid-template="template4"]) .icon-button.is-danger:hover{color:var(--error);background:var(--error-bg)}:where([data-bc-grid-template="template4"]) .button{min-height:40px;padding:0 15px;border:0;border-radius:20px;display:inline-flex;align-items:center;justify-content:center;gap:7px;font-size:12px;font-weight:700;transition:.2s;white-space:nowrap}:where([data-bc-grid-template="template4"]) .button:active{transform:scale(.97)}
:where([data-bc-grid-template="template4"]).preview-content{overflow:hidden}:where([data-bc-grid-template="template4"]) .preview-toolbar{display:flex;align-items:center;gap:8px;padding:14px 18px}:where([data-bc-grid-template="template4"]) .search-field{width:260px;height:39px;gap:8px;padding:0 11px;border:1px solid var(--outline-variant);border-radius:9px;background:var(--surface-low);color:var(--muted)}:where([data-bc-grid-template="template4"]) .search-field input{width:100%;border:0;outline:0;color:var(--text);background:transparent;font-size:11px}:where([data-bc-grid-template="template4"]) .search-field kbd{white-space:nowrap;padding:2px 5px;border:1px solid var(--outline-variant);border-radius:4px;color:var(--muted);font:10px monospace}:where([data-bc-grid-template="template4"]) .toolbar-spacer{flex:1}:where([data-bc-grid-template="template4"]) .preview-toolbar .button{min-height:36px}:where([data-bc-grid-template="template4"]) .selection-count{color:var(--primary);font-size:11px}:where([data-bc-grid-template="template4"]) .table-wrap{overflow-x:auto}:where([data-bc-grid-template="template4"]) .data-table{width:100%;border-collapse:separate;border-spacing:0;min-width:850px;border:1px solid var(--outline-variant);border-radius:16px;overflow:hidden}:where([data-bc-grid-template="template4"]) .data-table thead{background:var(--surface-low)}:where([data-bc-grid-template="template4"]) .data-table th{padding:13px 16px 12px;color:var(--text);font-size:11px;text-align:right;font-weight:700;letter-spacing:-.01em;background:var(--surface-low);border-bottom:1px solid var(--outline-variant);vertical-align:top}:where([data-bc-grid-template="template4"]) .data-table th:not(:last-child){border-left:1px solid color-mix(in srgb,var(--outline-variant) 58%,transparent)}:where([data-bc-grid-template="template4"]) .th-content{min-height:22px;display:flex;align-items:center;justify-content:space-between;gap:10px}:where([data-bc-grid-template="template4"]) .th-content>span{white-space:nowrap}:where([data-bc-grid-template="template4"]) .sort-button{width:24px;height:24px;display:inline-grid;place-items:center;padding:2px;border:0;border-radius:7px;color:var(--muted);background:transparent;transition:.2s}:where([data-bc-grid-template="template4"]) .sort-button:hover{color:var(--primary);background:var(--primary-container)}:where([data-bc-grid-template="template4"]) .data-table th select{height:34px;width:100%;margin-top:9px;padding:0 10px;border:1px solid var(--outline-variant);border-radius:9px;color:var(--muted);background:var(--surface);font-size:10px;cursor:pointer;transition:.2s}:where([data-bc-grid-template="template4"]) .data-table th select:hover{border-color:var(--primary);background:var(--surface-container)}:where([data-bc-grid-template="template4"]) .data-table th select:focus{border-color:var(--primary);box-shadow:0 0 0 3px #365f9126;outline:0}:where([data-bc-grid-template="template4"]) .data-table td{padding:15px 16px;border-bottom:1px solid var(--outline-variant);font-size:12px;white-space:nowrap}:where([data-bc-grid-template="template4"]) .data-table.comfortable td{padding-top:19px;padding-bottom:19px}:where([data-bc-grid-template="template4"]) .data-table tbody tr{transition:.15s}:where([data-bc-grid-template="template4"]) .data-table tbody tr:hover{background:color-mix(in srgb,var(--primary-container) 22%,var(--surface))}:where([data-bc-grid-template="template4"]) .data-table tbody tr.selected-row{background:color-mix(in srgb,var(--primary-container) 42%,var(--surface));box-shadow:inset -3px 0 0 var(--primary)}:where([data-bc-grid-template="template4"]) .check-cell{width:52px;text-align:center!important}:where([data-bc-grid-template="template4"]) .action-cell{width:72px;text-align:center!important}:where([data-bc-grid-template="template4"]) .data-table input[type=checkbox],:where([data-bc-grid-template="template4"]) .structured-list input[type=checkbox]{accent-color:var(--primary);width:16px;height:16px}:where([data-bc-grid-template="template4"]) .status-pill{display:inline-flex;align-items:center;gap:6px;padding:4px 9px;border-radius:8px;font-size:10px;font-weight:700}:where([data-bc-grid-template="template4"]) .status-dot{width:6px;height:6px;border-radius:50%;background:currentColor}:where([data-bc-grid-template="template4"]) .status-success{color:var(--success);background:var(--success-bg)}:where([data-bc-grid-template="template4"]) .status-warning{color:var(--warning);background:var(--warning-bg)}:where([data-bc-grid-template="template4"]) .status-neutral{color:var(--muted);background:var(--surface-container)}:where([data-bc-grid-template="template4"]) .status-info{color:var(--info);background:var(--info-bg)}:where([data-bc-grid-template="template4"]) .boolean-yes{color:var(--success)}:where([data-bc-grid-template="template4"]) .boolean-no{color:var(--muted)}:where([data-bc-grid-template="template4"]) .pagination{min-height:58px;padding:10px 18px;justify-content:space-between;color:var(--muted);font-size:11px}:where([data-bc-grid-template="template4"]) .page-size{gap:6px}:where([data-bc-grid-template="template4"]) .page-size select{border:1px solid var(--outline-variant);border-radius:7px;color:var(--text);background:var(--surface);padding:4px 6px}:where([data-bc-grid-template="template4"]) .page-controls{gap:10px}:where([data-bc-grid-template="template4"]) .page-controls .icon-button{width:30px;height:30px}:where([data-bc-grid-template="template4"]) .empty-state{display:flex;align-items:center;flex-direction:column;gap:6px;padding:48px;color:var(--muted)}:where([data-bc-grid-template="template4"]) .empty-state strong{color:var(--text);font-size:14px}:where([data-bc-grid-template="template4"]) .empty-state span{font-size:11px}
:where([data-bc-grid-template="template4"]) .card-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;padding:2px 18px 18px}:where([data-bc-grid-template="template4"]) .data-card{border:1px solid var(--outline-variant);border-radius:16px;overflow:hidden;background:var(--surface-low);transition:.2s}:where([data-bc-grid-template="template4"]) .data-card:hover{border-color:var(--primary);transform:translateY(-2px)}:where([data-bc-grid-template="template4"]) .card-image{height:105px;display:grid;place-items:center;background:var(--primary-container)}:where([data-bc-grid-template="template4"]) .card-body{padding:14px}:where([data-bc-grid-template="template4"]) .card-heading{align-items:flex-start;gap:8px}:where([data-bc-grid-template="template4"]) .card-heading>div{min-width:0;flex:1}:where([data-bc-grid-template="template4"]) .card-heading h3{margin:0;font-size:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}:where([data-bc-grid-template="template4"]) .card-heading p{margin:3px 0 11px;color:var(--muted);font-size:10px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}:where([data-bc-grid-template="template4"]) .card-meta{display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin-top:14px;padding-top:12px;border-top:1px solid var(--outline-variant)}:where([data-bc-grid-template="template4"]) .card-meta span,:where([data-bc-grid-template="template4"]) .card-meta strong{display:block}:where([data-bc-grid-template="template4"]) .card-meta span{color:var(--muted);font-size:9px}:where([data-bc-grid-template="template4"]) .card-meta strong{font-size:11px;margin-top:3px}:where([data-bc-grid-template="template4"]) .avatar-fallback{display:inline-grid;place-items:center;width:34px;height:34px;border-radius:50%;color:var(--on-primary-container);background:var(--primary-container);font-weight:700}:where([data-bc-grid-template="template4"]) .thumbnail{width:34px;height:34px;object-fit:cover;border-radius:9px}:where([data-bc-grid-template="template4"]) .structured-list{padding:0 18px 18px}:where([data-bc-grid-template="template4"]) .list-item{min-height:68px;gap:13px;padding:10px 8px;border-bottom:1px solid var(--outline-variant)}:where([data-bc-grid-template="template4"]) .structured-list.comfortable .list-item{min-height:82px}:where([data-bc-grid-template="template4"]) .list-index{width:34px;height:34px;display:grid;place-items:center;border-radius:11px;color:var(--primary);background:var(--primary-container);font-size:11px}:where([data-bc-grid-template="template4"]) .list-copy{min-width:0;flex:1}:where([data-bc-grid-template="template4"]) .list-copy strong,:where([data-bc-grid-template="template4"]) .list-copy span{display:block}:where([data-bc-grid-template="template4"]) .list-copy strong{font-size:13px}:where([data-bc-grid-template="template4"]) .list-copy span{color:var(--muted);font-size:11px;direction:ltr;text-align:right;margin-top:3px}:where([data-bc-grid-template="template4"]) .list-trailing{display:flex;align-items:center;gap:10px}:where([data-bc-grid-template="template4"]) .comparison-grid .preview-content{overflow:auto}:where([data-bc-grid-template="template4"]) .comparison-grid .data-table{min-width:580px}:where([data-bc-grid-template="template4"]) .comparison-grid .pagination{min-width:580px}
@media(max-width:1100px){:where([data-bc-grid-template="template4"]) .card-grid{grid-template-columns:repeat(3,1fr)}}@media(max-width:760px){:where([data-bc-grid-template="template4"]) .dataset-actions-end .button{flex:1}:where([data-bc-grid-template="template4"]) .preview-toolbar{flex-wrap:wrap}:where([data-bc-grid-template="template4"]) .search-field{width:100%}:where([data-bc-grid-template="template4"]) .toolbar-spacer{display:none}:where([data-bc-grid-template="template4"]) .preview-toolbar .button{margin-right:auto}:where([data-bc-grid-template="template4"]) .card-grid{grid-template-columns:repeat(2,1fr);padding-left:10px;padding-right:10px}:where([data-bc-grid-template="template4"]) .structured-list{padding-left:10px;padding-right:10px}}@media(max-width:460px){:where([data-bc-grid-template="template4"]) .card-grid{grid-template-columns:1fr}:where([data-bc-grid-template="template4"]) .comparison-grid .search-field{width:100%}}
:where([data-bc-grid-template="template4"]) .filter-panel{display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin:0;padding:14px 22px;border:0;border-top:1px solid var(--outline-variant);border-bottom:1px solid var(--outline-variant);background:var(--surface)}:where([data-bc-grid-template="template4"]) .filter-panel label{min-width:0;display:flex;align-items:center;gap:8px;height:42px;padding:0 12px;border:1px solid var(--outline-variant);border-radius:22px;background:var(--surface);transition:.2s}:where([data-bc-grid-template="template4"]) .filter-panel label:hover{border-color:var(--primary);background:var(--surface-low)}:where([data-bc-grid-template="template4"]) .filter-panel label span{font-size:11px;color:var(--text);font-weight:700;white-space:nowrap}:where([data-bc-grid-template="template4"]) .filter-panel label span:after{content:'⌄';margin-right:8px;color:var(--muted);font-size:14px}:where([data-bc-grid-template="template4"]) .filter-panel select{height:30px;min-width:62px;padding:0 5px;border:0;color:var(--primary);background:transparent;font-size:11px;font-weight:700;outline:0;cursor:pointer}:where([data-bc-grid-template="template4"]) .filter-panel select:focus{box-shadow:none}:where([data-bc-grid-template="template4"]) .clear-filters{height:42px;margin-right:auto;padding:0 15px;border:0;border-radius:13px;color:var(--muted);background:var(--surface-container);font-size:11px;font-weight:700;transition:.2s}:where([data-bc-grid-template="template4"]) .clear-filters:hover{color:var(--error);background:var(--error-bg)}:where([data-bc-grid-template="template4"]) .search-field{height:44px;width:min(390px,42vw);border-radius:13px;background:var(--surface-low);border-color:transparent}:where([data-bc-grid-template="template4"]) .search-field:focus-within{border-color:var(--primary);background:var(--surface)}:where([data-bc-grid-template="template4"]) .preview-toolbar{padding:14px 24px;min-height:68px;background:var(--surface)}:where([data-bc-grid-template="template4"]) .preview-toolbar .button{height:42px;border-radius:13px}:where([data-bc-grid-template="template4"]) .preview-toolbar>.icon-button{border:1px solid var(--outline-variant);border-radius:13px}:where([data-bc-grid-template="template4"]) .data-table{border:1px solid var(--outline-variant);border-radius:16px;background:var(--surface)}:where([data-bc-grid-template="template4"]) .data-table thead{background:#f1f5fb}:where([data-bc-grid-template="template4"]) .data-table th{height:54px;padding:0 16px;color:#26364f;background:#f1f5fb;border-bottom:1px solid var(--outline-variant);vertical-align:middle}:where([data-bc-grid-template="template4"]) .data-table th:not(:last-child){border-left:0}:where([data-bc-grid-template="template4"]) .data-table th:first-child{border-top-right-radius:15px}:where([data-bc-grid-template="template4"]) .data-table th:last-child{border-top-left-radius:15px}:where([data-bc-grid-template="template4"]) .th-content{min-height:0}:where([data-bc-grid-template="template4"]) .sort-button{width:22px;height:22px;color:#91a0b7}:where([data-bc-grid-template="template4"]) .data-table td{height:58px;padding:0 16px;background:var(--surface);border-bottom:1px solid #e6eaf1;color:#35445b}:where([data-bc-grid-template="template4"]) .data-table tr:last-child td{border-bottom:0}:where([data-bc-grid-template="template4"]) .data-table tbody tr:hover{background:#eef6ff}:where([data-bc-grid-template="template4"]) .data-table tbody tr:hover td{background:#eef6ff}:where([data-bc-grid-template="template4"]) .data-table tbody tr.selected-row td{background:#e2f0ff}:where([data-bc-grid-template="template4"]) .data-table tbody tr.selected-row{box-shadow:inset -3px 0 0 #1769df}:where([data-bc-grid-template="template4"]) .data-table .status-pill{padding:6px 12px;border-radius:16px}:where([data-bc-grid-template="template4"]) .data-table .action-cell .icon-button{width:34px;height:34px;background:#f1f5fb}:where([data-bc-grid-template="template4"]) .data-table .action-cell .icon-button:hover{background:var(--primary-container)}
@media(max-width:760px){:where([data-bc-grid-template="template4"]) .filter-panel{padding:12px 16px}:where([data-bc-grid-template="template4"]) .filter-panel label{flex:1}:where([data-bc-grid-template="template4"]) .clear-filters{margin-right:0}:where([data-bc-grid-template="template4"]) .preview-toolbar{padding-left:16px;padding-right:16px}:where([data-bc-grid-template="template4"]) .search-field{width:100%}}

/* Shared reading states for the BasisCore template. */
:where([data-bc-grid-template="template4"]){--row-stripe:#f0f1f3;--row-hover:#eaf1fa;--row-selected:#e2edfa}
:root[data-theme=dark] :where([data-bc-grid-template="template4"]){--row-stripe:#191c21;--row-hover:#222e3c;--row-selected:#243c57}
:root[data-theme=dark] :where([data-bc-grid-template="template4"]){color:var(--text);background:var(--surface)}
:where([data-bc-grid-template="template4"]) .data-table tbody tr:nth-child(even) td,:where([data-bc-grid-template="template4"]) .structured-list .list-item:nth-child(even){background:var(--row-stripe)}
:where([data-bc-grid-template="template4"]) .data-table tbody tr:hover td,:where([data-bc-grid-template="template4"]) .structured-list .list-item:hover{background:var(--row-hover)}
:where([data-bc-grid-template="template4"]) .data-table tbody tr.selected-row td,:where([data-bc-grid-template="template4"]) .structured-list .list-item.selected-row{background:var(--row-selected)}
:where([data-bc-grid-template="template4"]) .data-table th{letter-spacing:0}
:where([data-bc-grid-template="template4"]) .data-table td{font-variant-numeric:tabular-nums}
:where([data-bc-grid-template="template4"]) .data-table th[aria-sort=ascending] .sort-button,:where([data-bc-grid-template="template4"]) .data-table th[aria-sort=descending] .sort-button{color:var(--primary);background:var(--primary-container)}
:where([data-bc-grid-template="template4"]) .active-filters{display:flex;align-items:center;gap:8px;flex-wrap:wrap;padding:0 24px 12px}
:where([data-bc-grid-template="template4"]) .filter-chip{display:inline-flex;align-items:center;gap:7px;min-height:30px;padding:4px 10px;border:1px solid transparent;border-radius:8px;background:var(--secondary-container);color:var(--on-primary-container);font-size:11px}
:where([data-bc-grid-template="template4"]) .sort-chip{border-color:var(--outline-variant);background:var(--surface-low);color:var(--muted)}
:where([data-bc-grid-template="template4"]) .filter-chip:hover{border-color:var(--primary)}
:where([data-bc-grid-template="template4"]) .icon-button:disabled{opacity:.38;cursor:default;pointer-events:none}
:where([data-bc-grid-template="template4"]) .selection-count{font-variant-numeric:tabular-nums}
:root[data-theme=dark] :where([data-bc-grid-template="template4"]) .data-table th{background:var(--surface-container);color:var(--text)}
:root[data-theme=dark] :where([data-bc-grid-template="template4"]) .data-table td{color:var(--text);border-bottom-color:var(--outline-variant)}
:root[data-theme=dark] :where([data-bc-grid-template="template4"]) .data-table .action-cell .icon-button{background:var(--surface-container)}
:where([data-bc-grid-template="template4"]) .classic-tools .icon-button{border:1px solid #c4cfd8;border-radius:5px;background:#f6f7f8;color:#17375e}
@media(max-width:760px){:where([data-bc-grid-template="template4"]) .active-filters{padding-inline:16px}:where([data-bc-grid-template="template4"]) .comparison-grid .pagination{min-width:0}:where([data-bc-grid-template="template4"]) .comparison-grid .preview-toolbar{min-width:0}:where([data-bc-grid-template="template4"]) .dataset-actions-end .button{min-width:0;padding-inline:10px}}
:where([data-bc-grid-template="template4"]) .th-content .header-filter{width:100%;min-width:0;min-height:34px;padding:6px 8px;border:1px solid var(--outline-variant);border-radius:6px;background:var(--surface);color:var(--text);font:inherit;font-weight:500}
:where([data-bc-grid-template="template4"]) .th-content .header-filter::placeholder{color:var(--muted);opacity:1}
:where([data-bc-grid-template="template4"]) .th-content .header-filter:focus-visible{outline:2px solid var(--primary);outline-offset:2px}
:where([data-bc-grid-template="template4"]).preview-content .pagination{display:grid;grid-template-columns:minmax(0,1fr) auto minmax(0,1fr);gap:16px;min-height:88px;padding:16px 26px;font-size:14px}
:where([data-bc-grid-template="template4"]) .pagination>span{justify-self:start;font-weight:700;color:var(--text)}
:where([data-bc-grid-template="template4"]) .pagination .page-size{justify-self:center;gap:14px}
:where([data-bc-grid-template="template4"]) .pagination .page-size select{width:80px;min-height:46px;padding:8px 12px;border:1px solid #d6e2ff;border-radius:8px;background:var(--surface);color:var(--muted);font:inherit}
:where([data-bc-grid-template="template4"]) .pagination .page-navigation{display:flex;align-items:center;justify-self:end;gap:24px;white-space:nowrap}
:where([data-bc-grid-template="template4"]) .pagination .page-controls,:where([data-bc-grid-template="template4"]) .pagination .page-numbers{display:flex;align-items:center;gap:10px}
:where([data-bc-grid-template="template4"]) .pagination .page-controls>.icon-button,:where([data-bc-grid-template="template4"]) .pagination .page-number{display:inline-grid;place-items:center;flex-shrink:0;width:46px;height:46px;padding:0;border:1px solid #d6e2ff;border-radius:8px;background:var(--surface);color:#5372a6;font:inherit}
:where([data-bc-grid-template="template4"]) .pagination .page-number[aria-current=page]{border-color:#0666ff;background:#0666ff;color:#fff;box-shadow:0 3px 6px #0666ff1a}
:where([data-bc-grid-template="template4"]) .pagination .page-controls>button:hover:not(:disabled):not([aria-current]){border-color:#8db3ff;background:var(--surface-low)}
:where([data-bc-grid-template="template4"]) .pagination .page-controls>button:disabled{opacity:.45;cursor:not-allowed}
:where([data-bc-grid-template="template4"]) .pagination button:focus-visible,:where([data-bc-grid-template="template4"]) .pagination select:focus-visible{outline:2px solid #0666ff;outline-offset:3px}
:where([data-bc-grid-template="template4"]).preview-content :is(.data-table,.structured-list,.card-grid) input[type=checkbox]{appearance:none;position:relative;display:inline-grid;place-content:center;flex-shrink:0;width:21px;height:21px;margin:0;border:1px solid #8097c2;border-radius:4px;background:var(--surface);vertical-align:middle;cursor:pointer}
:where([data-bc-grid-template="template4"]).preview-content :is(.data-table,.structured-list,.card-grid) input[type=checkbox]:checked,:where([data-bc-grid-template="template4"]).preview-content :is(.data-table,.structured-list,.card-grid) input[type=checkbox]:indeterminate{border-color:#0666ff;background:#0666ff}
:where([data-bc-grid-template="template4"]).preview-content :is(.data-table,.structured-list,.card-grid) input[type=checkbox]:checked::after{content:"";width:6px;height:11px;margin-top:-3px;border:solid #fff;border-width:0 2px 2px 0;transform:rotate(45deg)}
:where([data-bc-grid-template="template4"]).preview-content :is(.data-table,.structured-list,.card-grid) input[type=checkbox]:indeterminate::after{content:"";width:10px;height:2px;background:#fff}
:where([data-bc-grid-template="template4"]).preview-content :is(.data-table,.structured-list,.card-grid) input[type=checkbox]:focus-visible{outline:2px solid #0666ff;outline-offset:3px}
:where([data-bc-grid-template="template4"]).preview-content :is(.data-table,.structured-list,.card-grid) input[type=checkbox]:disabled{opacity:.45;cursor:not-allowed}
:where([data-bc-grid-template="template4"]).preview-content input[type=radio]{appearance:none;display:inline-grid;place-content:center;flex-shrink:0;width:21px;height:21px;margin:0;border:1px solid #8097c2;border-radius:50%;background:var(--surface);vertical-align:middle;cursor:pointer}
:where([data-bc-grid-template="template4"]).preview-content input[type=radio]:checked{border:2px solid var(--selection-accent,#0666ff)}
:where([data-bc-grid-template="template4"]).preview-content input[type=radio]:checked::after{content:"";width:9px;height:9px;border-radius:50%;background:var(--selection-accent,#0666ff)}
:where([data-bc-grid-template="template4"]).preview-content input[type=radio]:focus-visible{outline:2px solid var(--selection-accent,#0666ff);outline-offset:3px}
:where([data-bc-grid-template="template4"]).preview-content input[type=radio]:disabled{opacity:.45;cursor:not-allowed}
:where([data-bc-grid-template="template4"]).preview-content[data-view=mobile] input[type=radio]{width:18px;height:18px}
@media(max-width:700px){:where([data-bc-grid-template="template4"]).preview-content .pagination{grid-template-columns:1fr 1fr;gap:16px;padding:16px}:where([data-bc-grid-template="template4"]) .pagination .page-size{justify-self:end}:where([data-bc-grid-template="template4"]) .pagination .page-navigation{grid-column:1/-1;justify-self:center;gap:16px;flex-wrap:wrap;justify-content:center}:where([data-bc-grid-template="template4"]) .pagination .page-controls,:where([data-bc-grid-template="template4"]) .pagination .page-numbers{gap:6px}:where([data-bc-grid-template="template4"]) .pagination .page-controls>.icon-button,:where([data-bc-grid-template="template4"]) .pagination .page-number{width:38px;height:38px}}
:where([data-bc-grid-template="template4"]) .pagination .page-controls{flex-direction:row-reverse}
:where([data-bc-grid-template="template4"]).preview-content .mobile-tools[hidden]{display:none}
:where([data-bc-grid-template="template4"]).preview-content[data-view=mobile] .preview-toolbar{flex-wrap:wrap;gap:8px;padding:16px}
:where([data-bc-grid-template="template4"]).preview-content[data-view=mobile] .search-field{width:100%;flex-basis:100%;min-width:0}
:where([data-bc-grid-template="template4"]).preview-content[data-view=mobile] .preview-toolbar [data-guide-start]{width:44px;height:44px}
:where([data-bc-grid-template="template4"]).preview-content[data-view=mobile] .search-field kbd,:where([data-bc-grid-template="template4"]).preview-content[data-view=mobile] .toolbar-spacer{display:none}
:where([data-bc-grid-template="template4"]).preview-content[data-view=mobile] .preview-toolbar .button{margin-inline-start:auto;min-height:44px}
:where([data-bc-grid-template="template4"]).preview-content[data-view=mobile] .mobile-tools{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;padding:12px 16px;border-block:1px solid var(--outline-variant);background:var(--surface-low)}
:where([data-bc-grid-template="template4"]).preview-content[data-view=mobile] .mobile-select-all{display:flex;align-items:center;gap:8px;font-size:12px;min-height:44px}
:where([data-bc-grid-template="template4"]).preview-content[data-view=mobile] .mobile-tools select{max-width:100%;min-width:0;min-height:44px;padding:8px;border:1px solid var(--outline-variant);border-radius:6px;background:var(--surface);color:var(--text);font:inherit;font-size:12px}
:where([data-bc-grid-template="template4"]).preview-content[data-view=mobile] .mobile-rows{display:block}
:where([data-bc-grid-template="template4"]).preview-content[data-view=mobile] .mobile-row{padding:16px;border-bottom:1px solid var(--outline-variant);background:var(--surface)}
:where([data-bc-grid-template="template4"]).preview-content[data-view=mobile] .mobile-row:nth-child(even){background:var(--row-stripe)}
:where([data-bc-grid-template="template4"]).preview-content[data-view=mobile] .mobile-row.selected-row{background:var(--row-selected)}
:where([data-bc-grid-template="template4"]).preview-content[data-view=mobile] .mobile-row-heading{display:flex;align-items:center;gap:12px;margin-bottom:10px}
:where([data-bc-grid-template="template4"]).preview-content[data-view=mobile] .mobile-row-copy{flex:1;min-width:0}
:where([data-bc-grid-template="template4"]).preview-content[data-view=mobile] .mobile-row h3{margin:0;font-size:14px;line-height:1.7;overflow-wrap:anywhere}
:where([data-bc-grid-template="template4"]).preview-content[data-view=mobile] .mobile-field-label{color:var(--muted);font-size:11px;overflow-wrap:anywhere}
:where([data-bc-grid-template="template4"]).preview-content[data-view=mobile] .mobile-row .icon-button{flex-shrink:0;width:44px;height:44px}
:where([data-bc-grid-template="template4"]).preview-content[data-view=mobile] .mobile-row-fields{display:grid;gap:12px;margin:4px 0 0;padding-top:12px;border-top:1px solid var(--outline-variant)}
:where([data-bc-grid-template="template4"]).preview-content[data-view=mobile] .mobile-row-fields>div{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.5fr);align-items:center;gap:12px;font-size:12px}
:where([data-bc-grid-template="template4"]).preview-content[data-view=mobile] .mobile-row-fields dt{color:var(--muted);overflow-wrap:anywhere}
:where([data-bc-grid-template="template4"]).preview-content[data-view=mobile] .mobile-row-fields dd{margin:0;overflow-wrap:anywhere;min-width:0}
:where([data-bc-grid-template="template4"]).preview-content[data-view=mobile] .mobile-row-operations{display:flex;align-items:center;justify-content:space-between;border-top:1px solid var(--outline-variant);margin-top:14px;padding-top:8px}
:where([data-bc-grid-template="template4"]).preview-content[data-view=mobile] .filter-panel{padding:12px 16px;align-items:stretch}
:where([data-bc-grid-template="template4"]).preview-content[data-view=mobile] .filter-panel label{width:100%;justify-content:space-between}
:where([data-bc-grid-template="template4"]).preview-content[data-view=mobile] .filter-panel select{min-width:0;max-width:65%}
:where([data-bc-grid-template="template4"]).preview-content[data-view=mobile] .active-filters{padding-inline:16px}
:where([data-bc-grid-template="template4"]).preview-content[data-view=mobile] .pagination{grid-template-columns:1fr 1fr;padding:16px;gap:16px;font-size:12px;min-width:0}
:where([data-bc-grid-template="template4"]).preview-content[data-view=mobile] .page-size{justify-self:end;gap:8px}
:where([data-bc-grid-template="template4"]).preview-content[data-view=mobile] .page-navigation{grid-column:1/-1;justify-self:center;flex-wrap:wrap;justify-content:center;gap:12px;max-width:100%}
:where([data-bc-grid-template="template4"]).preview-content[data-view=mobile] .page-controls,:where([data-bc-grid-template="template4"]).preview-content[data-view=mobile] .page-numbers{gap:4px}
:where([data-bc-grid-template="template4"]).preview-content[data-view=mobile] .page-controls>.icon-button,:where([data-bc-grid-template="template4"]).preview-content[data-view=mobile] .page-number{width:36px;height:44px}
:where([data-bc-grid-template="template4"]).preview-content[data-view=mobile] input[type=checkbox]{appearance:none;display:inline-grid;place-content:center;flex-shrink:0;width:22px;height:22px;margin:0;border:1px solid #8097c2;border-radius:4px;background:var(--surface);cursor:pointer}
:where([data-bc-grid-template="template4"]).preview-content[data-view=mobile] input[type=checkbox]:checked,:where([data-bc-grid-template="template4"]).preview-content[data-view=mobile] input[type=checkbox]:indeterminate{background:#0666ff;border-color:#0666ff}
:where([data-bc-grid-template="template4"]).preview-content[data-view=mobile] input[type=checkbox]:checked::after{content:"";width:6px;height:11px;margin-top:-3px;border:solid #fff;border-width:0 2px 2px 0;transform:rotate(45deg)}
:where([data-bc-grid-template="template4"]).preview-content[data-view=mobile] input[type=checkbox]:indeterminate::after{content:"";width:10px;height:2px;background:#fff}
:where([data-bc-grid-template="template4"]).preview-content[data-view=mobile] :focus-visible{outline:2px solid var(--primary);outline-offset:3px}
:where([data-bc-grid-template="template4"]).preview-content[data-view=mobile] .mobile-tools [hidden]{display:none}

/* Reference list: tonal filters, compact rows and a single paging baseline. */
:where([data-bc-grid-template="template4"]).preview-content{--list-header:#eef1fc;--list-outline:#dbe1f1;--list-stripe:#f1f3f8;--list-ink:#23283e;--primary:#2164e8;--primary-container:#e0eaff;--on-primary-container:#153f91;--success-bg:#d8f6e1;--success:#176c37;--surface:#fff;--row-hover:#dce7f5;--row-selected:#edf5ff;--selection-accent:#2f75eb;--selection-ink:#295ea8;color:var(--list-ink);border:1px solid var(--list-outline);border-radius:16px;background:var(--surface);isolation:isolate}
:where([data-bc-grid-template="template4"]).preview-content:not(.has-pagination){padding-bottom:6px}
:where([data-bc-grid-template="template4"]).preview-content .list-filter-bar{display:flex;align-items:center;justify-content:space-between;gap:16px;margin:18px 16px 16px;padding:14px 16px;min-height:76px;border:1px solid var(--list-outline);border-radius:16px;background:var(--surface)}
:where([data-bc-grid-template="template4"]).preview-content .list-filter-bar[hidden]{display:none}
:where([data-bc-grid-template="template4"]).preview-content .grid-section-header{display:flex;align-items:center;flex-wrap:wrap;gap:16px;padding:20px 24px;border-bottom:0;background:var(--surface)}
:where([data-bc-grid-template="template4"]).preview-content .grid-header-content{flex:1;min-width:min(100%,160px);overflow-wrap:anywhere;text-align:start}
:where([data-bc-grid-template="template4"]).preview-content .grid-header-content :is(h1,h2,h3){margin:0;color:var(--list-ink);font-size:18px;font-weight:700;line-height:1.6}
:where([data-bc-grid-template="template4"]).preview-content .grid-header-content p{margin:4px 0 0;color:var(--muted);font-size:12px;line-height:1.8}
:where([data-bc-grid-template="template4"]).preview-content .grid-section-header>.button{flex-shrink:0;min-height:42px;margin-inline-start:auto;padding:8px 14px;border:1px solid var(--list-outline);border-radius:10px;background:var(--primary-container);color:var(--on-primary-container);font:inherit;font-size:12px;font-weight:600}
:where([data-bc-grid-template="template4"]).preview-content[data-view=mobile] .grid-section-header{gap:12px;padding:16px 12px}
:where([data-bc-grid-template="template4"]).preview-content[data-view=mobile] .grid-section-header>.button{min-height:44px}
:where([data-bc-grid-template="template4"]).preview-content .quick-filters{display:flex;align-items:center;gap:12px;flex-wrap:wrap}
:where([data-bc-grid-template="template4"]).preview-content .quick-filter{display:inline-flex;align-items:center;justify-content:center;gap:14px;min-width:112px;min-height:44px;padding:8px 16px;border:1px solid transparent;border-radius:12px;background:var(--surface-low);font:inherit;font-size:13px;color:var(--list-ink);transition:background-color .15s,border-color .15s}
:where([data-bc-grid-template="template4"]).preview-content .quick-filter:has(.status-success){background:color-mix(in srgb,var(--success-bg) 40%,var(--surface))}
:where([data-bc-grid-template="template4"]).preview-content .quick-filter .status-pill{padding:0;background:transparent;font-size:13px;font-weight:600}
:where([data-bc-grid-template="template4"]).preview-content .quick-filter[aria-pressed=true]{border-color:#a7c3ff;background:var(--primary-container);color:var(--on-primary-container)}
:where([data-bc-grid-template="template4"]).preview-content .quick-filter:hover{border-color:var(--primary)}
:where([data-bc-grid-template="template4"]).preview-content .quick-filter-count{display:inline-grid;place-items:center;min-width:25px;height:25px;padding:0 6px;border:1px solid var(--list-outline);border-radius:7px;background:var(--surface);font-variant-numeric:tabular-nums}
:where([data-bc-grid-template="template4"]).preview-content .quick-filter[aria-pressed=true] .quick-filter-count{border-color:var(--primary);background:var(--primary);color:var(--on-primary)}
:where([data-bc-grid-template="template4"]).preview-content .list-filter-bar>.button{min-height:42px;border:1px solid var(--list-outline);border-radius:10px;background:var(--primary-container);color:var(--on-primary-container);font-size:12px}
:where([data-bc-grid-template="template4"]).preview-content .preview-toolbar{min-height:0;padding:12px 16px;gap:8px;flex-wrap:wrap}
:where([data-bc-grid-template="template4"]).preview-content .preview-toolbar>.icon-button{width:38px;height:38px;border-color:var(--list-outline);border-radius:10px;color:var(--list-ink);background:var(--surface)}
:where([data-bc-grid-template="template4"]).preview-content .preview-toolbar>:is(.advanced-filter-button,.guide-start-button){display:inline-flex;align-items:center;justify-content:center;gap:8px;min-height:42px;margin-inline:0;padding:8px 14px;border:1px solid var(--list-outline);border-radius:10px;background:var(--primary-container);color:var(--on-primary-container);font-size:12px}
:where([data-bc-grid-template="template4"]).preview-content .search-field{height:38px;min-width:0;max-width:100%;border:1px solid var(--list-outline);border-radius:10px;background:var(--surface);color:var(--muted)}
:where([data-bc-grid-template="template4"]).preview-content .search-field:focus-within{border-color:var(--primary)}
:where([data-bc-grid-template="template4"]).preview-content .table-wrap{padding:0 6px;scrollbar-width:thin;scrollbar-color:#b7c7e5 transparent}
:where([data-bc-grid-template="template4"]).preview-content .data-table{border:0;border-radius:12px;min-width:1000px;table-layout:fixed;background:var(--surface)}
:where([data-bc-grid-template="template4"]).preview-content .data-table th{height:50px;padding:12px 10px;border:0;background:var(--list-header);color:var(--list-ink);font-size:12px;font-weight:600;letter-spacing:0;vertical-align:middle}
:where([data-bc-grid-template="template4"]).preview-content .data-table th:first-child{border-start-start-radius:12px}
:where([data-bc-grid-template="template4"]).preview-content .data-table th:last-child{border-start-end-radius:12px}
:where([data-bc-grid-template="template4"]).preview-content .data-table .check-cell{width:44px;padding-inline:8px}
:where([data-bc-grid-template="template4"]).preview-content .data-table .action-cell{width:48px;min-width:48px;max-width:48px;padding-inline:4px;text-align:center}
:where([data-bc-grid-template="template4"]).preview-content .data-table .th-content{min-height:25px;gap:4px;line-height:1.6;justify-content:center}
:where([data-bc-grid-template="template4"]).preview-content .data-table .th-content>span{white-space:normal}
:where([data-bc-grid-template="template4"]).preview-content .data-table .sort-button{flex:0 0 24px;min-height:26px;color:#697aaf}
:where([data-bc-grid-template="template4"]).preview-content .data-table th[aria-sort=ascending] .sort-button,:where([data-bc-grid-template="template4"]).preview-content .data-table th[aria-sort=descending] .sort-button{color:var(--primary);background:transparent}
:where([data-bc-grid-template="template4"]).preview-content[data-bc-filter-mode=columns] .data-table th{height:88px;padding-block:10px}
:where([data-bc-grid-template="template4"]).preview-content[data-bc-filter-mode=columns] .data-table th>.header-filter{display:block;width:100%;min-width:0;height:36px;margin:8px 0 0;padding:6px 8px;border:1px solid #cdd7ee;border-radius:8px;background:var(--surface);color:var(--list-ink);font:inherit;font-size:11px;font-weight:400}
:where([data-bc-grid-template="template4"]).preview-content .header-filter::placeholder{color:#647195;opacity:1}
:where([data-bc-grid-template="template4"]).preview-content .header-filter:focus-visible{outline:2px solid var(--primary);outline-offset:1px}
:where([data-bc-grid-template="template4"]).preview-content .data-table td,:where([data-bc-grid-template="template4"]).preview-content .data-table.comfortable td{height:46px;padding:8px 10px;border:0;color:var(--list-ink);font-size:14px;line-height:1.65;overflow:hidden;text-overflow:ellipsis;background:var(--surface)}
:where([data-bc-grid-template="template4"]).preview-content .data-table>:is(thead,tbody)>tr>:is(th,td){text-align:center}
:where([data-bc-grid-template="template4"]).preview-content .data-table td[data-bc-data]{white-space:normal;overflow-wrap:anywhere;text-overflow:clip}
:where([data-bc-grid-template="template4"]).preview-content .data-table.compact td{height:38px;padding-block:5px;font-size:12px}
:where([data-bc-grid-template="template4"]).preview-content .data-table tbody tr:nth-child(even) td{background:var(--list-stripe)}
:where([data-bc-grid-template="template4"]).preview-content .data-table tbody tr:hover td{background:var(--row-hover)}
:where([data-bc-grid-template="template4"]).preview-content .data-table tbody tr.selected-row td{background:var(--row-selected);border-radius:0}
:where([data-bc-grid-template="template4"]).preview-content .data-table tbody tr.selected-row td:first-child{box-shadow:inset -3px 0 0 var(--selection-accent)}
:where([data-bc-grid-template="template4"]).preview-content[data-bc-grid-direction=ltr] .data-table tbody tr.selected-row td:first-child{box-shadow:inset 3px 0 0 var(--selection-accent)}
:where([data-bc-grid-template="template4"]).preview-content .data-table input[type=checkbox]:is(:checked,:indeterminate){border-color:var(--selection-accent);background:var(--selection-accent)}
:where([data-bc-grid-template="template4"]).preview-content .data-table tbody tr.selected-row{box-shadow:none}
:where([data-bc-grid-template="template4"]).preview-content .data-table tbody tr td:first-child{border-start-start-radius:10px;border-end-start-radius:10px}
:where([data-bc-grid-template="template4"]).preview-content .data-table tbody tr td:last-child{border-start-end-radius:10px;border-end-end-radius:10px}
:where([data-bc-grid-template="template4"]).preview-content .data-table .status-pill{padding:4px 10px;border-radius:16px;font-size:11px;font-weight:600;line-height:1.6}
:where([data-bc-grid-template="template4"]).preview-content .data-table .status-neutral{background:var(--surface-container)}
:where([data-bc-grid-template="template4"]).preview-content .data-table .action-cell .icon-button{width:34px;height:30px;border:1px solid var(--list-outline);border-radius:10px;background:var(--surface-low);color:var(--list-ink)}
:where([data-bc-grid-template="template4"]).preview-content .data-table .action-cell .icon-button:hover{background:var(--primary-container);color:var(--primary)}
:where([data-bc-grid-template="template4"]).preview-content .cell-with-icon{display:inline-flex;align-items:center;gap:9px;max-width:100%;vertical-align:middle;white-space:nowrap}
:where([data-bc-grid-template="template4"]).preview-content .cell-with-icon img{width:27px;height:27px;flex-shrink:0;object-fit:contain}
:where([data-bc-grid-template="template4"]).preview-content .cell-with-icon>span{min-width:0;overflow:hidden;text-overflow:ellipsis}
:where([data-bc-grid-template="template4"]).preview-content .data-table td[data-bc-data] .cell-with-icon{white-space:normal}
:where([data-bc-grid-template="template4"]).preview-content .data-table td[data-bc-data] .cell-with-icon>span{overflow:visible;text-overflow:clip}
:where([data-bc-grid-template="template4"]).preview-content .pagination{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;min-height:0;padding:12px 26px;gap:16px;border-top:1px solid var(--list-outline);background:var(--surface);font-size:12px}
:where([data-bc-grid-template="template4"]).preview-content .pagination .result-count{display:flex;align-items:center;gap:9px;color:var(--list-ink);font-size:12px}
:where([data-bc-grid-template="template4"]).preview-content .pagination .page-size{flex:0 1 auto;min-width:0;max-width:100%;gap:12px;color:var(--list-ink)}
:where([data-bc-grid-template="template4"]).preview-content .pagination .page-size>span{white-space:normal}
:where([data-bc-grid-template="template4"]).preview-content .pagination .page-size select{width:76px;min-height:38px;flex-shrink:0;border-color:var(--list-outline);border-radius:8px;color:var(--list-ink)}
:where([data-bc-grid-template="template4"]).preview-content .pagination .page-navigation{flex-wrap:wrap;justify-content:center;max-width:100%;gap:12px;color:#555f80}
:where([data-bc-grid-template="template4"]).preview-content .pagination .page-navigation>span{flex-shrink:0;white-space:nowrap}
:where([data-bc-grid-template="template4"]).preview-content .pagination .page-controls,:where([data-bc-grid-template="template4"]).preview-content .pagination .page-numbers{flex-wrap:wrap;min-width:0;max-width:100%;gap:6px}
:where([data-bc-grid-template="template4"]).preview-content .pagination .page-controls{direction:ltr;flex-direction:row}
:where([data-bc-grid-template="template4"]).preview-content .pagination .page-controls>.icon-button,:where([data-bc-grid-template="template4"]).preview-content .pagination .page-number{width:38px;height:38px;border-color:var(--list-outline);border-radius:8px;background:var(--surface);color:#536797}
:where([data-bc-grid-template="template4"]).preview-content .pagination .page-number[aria-current=page]{border-color:var(--primary);background:var(--primary);color:var(--on-primary);box-shadow:0 3px 8px #2164e821}
:where([data-bc-grid-template="template4"]).preview-content[data-bc-grid-direction=ltr] .page-controls{flex-direction:row}
:root[data-theme=dark] :where([data-bc-grid-template="template4"]) .preview-content{--list-header:#252d43;--list-outline:#3c4861;--list-stripe:#1d2432;--list-ink:#e0e6f4;--primary:#a5c8ff;--primary-container:#1d4776;--on-primary-container:#d3e4ff;--success:#99dba9;--success-bg:#1f5132;--surface:#111318;--row-hover:#293b50;--row-selected:#243c57;--selection-accent:#a5c8ff;--selection-ink:#a5c8ff}
:root[data-theme=dark] :where([data-bc-grid-template="template4"]) .preview-content .data-table th{background:var(--list-header);color:var(--list-ink)}
:root[data-theme=dark] :where([data-bc-grid-template="template4"]) .preview-content .data-table td{color:var(--list-ink)}
:root[data-theme=dark] :where([data-bc-grid-template="template4"]) .preview-content .header-filter{border-color:var(--list-outline)}
:root[data-theme=dark] :where([data-bc-grid-template="template4"]) .preview-content .header-filter::placeholder{color:#b8c5e1}
:root[data-theme=dark] :where([data-bc-grid-template="template4"]) .preview-content .pagination .page-navigation{color:#bdc9e2}
:root[data-theme=dark] :where([data-bc-grid-template="template4"]) .preview-content .cell-with-icon img{padding:2px;border-radius:4px;background:#fff}
@media(max-width:700px){
  :where([data-bc-grid-template="template4"]).preview-content .list-filter-bar{margin:14px 10px 12px;padding:12px;gap:12px;flex-wrap:wrap}
  :where([data-bc-grid-template="template4"]).preview-content .quick-filters{width:100%;gap:6px}
  :where([data-bc-grid-template="template4"]).preview-content .quick-filter{flex:1;min-width:0;min-height:44px;gap:8px;padding-inline:8px;font-size:12px}
  :where([data-bc-grid-template="template4"]).preview-content .quick-filter .status-pill{font-size:12px}
  :where([data-bc-grid-template="template4"]).preview-content .list-filter-bar>.button{margin-inline-start:auto}
  :where([data-bc-grid-template="template4"]).preview-content .pagination{grid-template-columns:1fr 1fr;padding:16px;gap:16px}
  :where([data-bc-grid-template="template4"]).preview-content .pagination .page-navigation{grid-column:1/-1;justify-self:center;gap:16px;flex-wrap:wrap;justify-content:center}
  :where([data-bc-grid-template="template4"]).preview-content .pagination .page-size{justify-self:end;gap:8px}
  :where([data-bc-grid-template="template4"]).preview-content .pagination .page-controls>.icon-button,:where([data-bc-grid-template="template4"]).preview-content .pagination .page-number{width:36px;height:44px}
}
@media(pointer:coarse){
  :where([data-bc-grid-template="template4"]).preview-content .data-table td{min-height:48px}
  :where([data-bc-grid-template="template4"]).preview-content .data-table .action-cell .icon-button,:where([data-bc-grid-template="template4"]).preview-content .pagination .page-controls>.icon-button,:where([data-bc-grid-template="template4"]).preview-content .pagination .page-number{min-width:44px;min-height:44px}
  :where([data-bc-grid-template="template4"]).preview-content .sort-button{min-width:32px;min-height:32px}
}

/* Mobile uses the same fields and process manager, with a compact reading order. */
:where([data-bc-grid-template="template4"]).preview-content[data-view=mobile]{container:mobile-list / inline-size;--mobile-muted:#657695;--mobile-divider:color-mix(in srgb,var(--list-outline) 65%,var(--surface))}
:where([data-bc-grid-template="template4"]).preview-content[data-view=mobile] .grid-section-header{gap:10px;padding:14px 12px 10px}
:where([data-bc-grid-template="template4"]).preview-content[data-view=mobile] .grid-header-content h3{font-size:16px;line-height:1.6}
:where([data-bc-grid-template="template4"]).preview-content[data-view=mobile] .grid-header-content p{margin-top:3px;font-size:11px;line-height:1.6;color:var(--mobile-muted)}
:where([data-bc-grid-template="template4"]).preview-content[data-view=mobile] .guide-start-button[data-guide-start]{display:grid;place-items:center;flex:0 0 44px;width:44px;min-width:44px;height:44px;min-height:44px;margin:0;padding:0;border:1px solid var(--list-outline);border-radius:10px;background:var(--primary-container);color:var(--primary)}
:where([data-bc-grid-template="template4"]).preview-content[data-view=mobile] .guide-start-copy{display:none}
:where([data-bc-grid-template="template4"]).preview-content[data-view=mobile] .list-filter-bar{min-height:0;margin:0 12px 8px;padding:4px;border:0;border-radius:12px;background:var(--surface-low)}
:where([data-bc-grid-template="template4"]).preview-content[data-view=mobile] .list-filter-bar[hidden],:where([data-bc-grid-template="template4"]).preview-content[data-view=mobile] .list-filter-bar:has(.quick-filters:empty){display:none}
:where([data-bc-grid-template="template4"]).preview-content[data-view=mobile] .quick-filters{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:6px;width:100%}
:where([data-bc-grid-template="template4"]).preview-content[data-view=mobile] .quick-filter{display:flex;min-width:0;min-height:44px;gap:6px;padding:6px;border-radius:8px;background:transparent;font-size:11px}
:where([data-bc-grid-template="template4"]).preview-content[data-view=mobile] .quick-filter-label{min-width:0;overflow-wrap:anywhere}
:where([data-bc-grid-template="template4"]).preview-content[data-view=mobile] .quick-filter .status-pill{gap:4px;font-size:11px;font-weight:500;white-space:normal;line-height:1.5}
:where([data-bc-grid-template="template4"]).preview-content[data-view=mobile] .quick-filter:has(.status-success){background:transparent}
:where([data-bc-grid-template="template4"]).preview-content[data-view=mobile] .quick-filter[aria-pressed=true]{border-color:#b7ceff;background:var(--primary-container)}
:where([data-bc-grid-template="template4"]).preview-content[data-view=mobile] .quick-filter-count{min-width:20px;height:20px;padding:0 4px;border:0;font-size:11px;flex-shrink:0}
:where([data-bc-grid-template="template4"]).preview-content[data-view=mobile] .preview-toolbar{display:flex;flex-wrap:wrap;padding:0 12px 12px;gap:8px;min-height:0}
:where([data-bc-grid-template="template4"]).preview-content[data-view=mobile] .search-field{order:0;flex:1 1 0;height:44px;width:auto;min-width:0;border-radius:9px}
:where([data-bc-grid-template="template4"]).preview-content[data-view=mobile] .search-field input{min-width:0;font-size:16px}
:where([data-bc-grid-template="template4"]).preview-content[data-view=mobile] .search-field input::placeholder{font-size:12px;color:var(--mobile-muted)}
:where([data-bc-grid-template="template4"]).preview-content[data-view=mobile] .search-field kbd{display:none}
:where([data-bc-grid-template="template4"]).preview-content[data-view=mobile] .preview-toolbar>.button{order:2;min-height:44px;margin-inline:0;padding-inline:12px;border-color:var(--list-outline);border-radius:9px;background:var(--primary-container);color:var(--on-primary-container)}
:where([data-bc-grid-template="template4"]).preview-content[data-view=mobile] .preview-toolbar>.advanced-filter-button{order:1;flex:0 0 auto;margin-inline-start:auto;font-size:12px;background:color-mix(in srgb,var(--primary-container) 45%,var(--surface));color:var(--primary)}
:where([data-bc-grid-template="template4"]).preview-content[data-view=mobile] .preview-toolbar>.grid-exports{order:2;flex-basis:100%}
:where([data-bc-grid-template="template4"]).preview-content[data-view=mobile] .preview-toolbar>.icon-button{order:2;flex:0 0 44px;width:44px;height:44px;border-radius:9px}
:where([data-bc-grid-template="template4"]).preview-content[data-view=mobile]>.selection-summary{display:flex;gap:8px;width:100%;max-width:100%;min-height:52px;margin:0;padding:4px 10px;border:0;border-block:1px solid var(--list-outline);border-radius:0;background:var(--primary-container);color:var(--primary)}
:where([data-bc-grid-template="template4"]).preview-content[data-view=mobile] .selection-summary .selection-count{flex:1;min-width:0;font-size:12px;font-weight:600}
:where([data-bc-grid-template="template4"]).preview-content[data-view=mobile] .selection-summary .selection-count:before{display:none}
:where([data-bc-grid-template="template4"]).preview-content[data-view=mobile] .selection-summary .clear-selection{width:44px;height:44px}
:where([data-bc-grid-template="template4"]).preview-content[data-view=mobile] .mobile-bulk-actions{display:flex;align-items:center;flex-wrap:wrap;gap:4px;min-width:0;max-width:65%}
:where([data-bc-grid-template="template4"]).preview-content[data-view=mobile] .mobile-bulk-actions[hidden]{display:none}
:where([data-bc-grid-template="template4"]).preview-content[data-view=mobile] .mobile-bulk-actions :is(button,a,[role=button]),:where([data-bc-grid-template="template4"]).preview-content[data-view=mobile] .mobile-bulk-actions .iconsOperations>.icon{display:inline-flex;align-items:center;justify-content:center;min-width:44px;min-height:44px}
:where([data-bc-grid-template="template4"]).preview-content[data-view=mobile] .mobile-tools{display:flex;align-items:center;justify-content:space-between;flex-wrap:nowrap;gap:8px;min-height:46px;padding:0 10px;border-color:var(--list-outline);background:color-mix(in srgb,var(--list-header) 70%,var(--surface))}
:where([data-bc-grid-template="template4"]).preview-content[data-view=mobile] .mobile-tools[hidden]{display:none}
:where([data-bc-grid-template="template4"]).preview-content[data-view=mobile] .mobile-select-all{flex:0 0 auto;gap:6px;min-height:44px;font-size:11px;white-space:nowrap}
:where([data-bc-grid-template="template4"]).preview-content[data-view=mobile] .mobile-sort-label{display:flex;align-items:center;gap:4px;flex:0 1 65%;min-width:0;color:var(--mobile-muted);font-size:11px}
:where([data-bc-grid-template="template4"]).preview-content[data-view=mobile] .mobile-sort-label>span{flex-shrink:0}
:where([data-bc-grid-template="template4"]).preview-content[data-view=mobile] .mobile-sort-label select{flex:1;width:auto;min-width:0;max-width:100%;min-height:44px;padding:6px 4px;border:0;border-radius:0;background:transparent;color:var(--list-ink);font-size:12px}
:where([data-bc-grid-template="template4"]).preview-content[data-view=mobile] input[type=checkbox]{width:18px;height:18px}
:where([data-bc-grid-template="template4"]).preview-content[data-view=mobile] .mobile-rows{display:grid;gap:10px;padding:10px;background:color-mix(in srgb,var(--primary-container) 10%,var(--surface))}
:where([data-bc-grid-template="template4"]).preview-content[data-view=mobile] .mobile-row{padding:0;border:1px solid var(--list-outline);border-radius:12px;background:var(--surface);color:var(--list-ink);min-width:0}
:where([data-bc-grid-template="template4"]).preview-content[data-view=mobile] .mobile-row:nth-child(even){background:var(--surface)}
:where([data-bc-grid-template="template4"]).preview-content[data-view=mobile] .mobile-row.selected-row{border-color:var(--primary);background:color-mix(in srgb,var(--row-selected) 30%,var(--surface))}
:where([data-bc-grid-template="template4"]).preview-content[data-view=mobile] .mobile-row-heading{gap:4px;min-height:64px;margin:0;padding:6px 8px;border-bottom:1px solid var(--mobile-divider)}
:where([data-bc-grid-template="template4"]).preview-content[data-view=mobile] .mobile-row-select{display:grid;place-items:center;flex:0 0 44px;width:44px;height:44px;cursor:pointer}
:where([data-bc-grid-template="template4"]).preview-content[data-view=mobile] .mobile-row h3{font-size:16px;line-height:1.6}
:where([data-bc-grid-template="template4"]).preview-content[data-view=mobile] .mobile-field-label{font-size:11px;color:var(--mobile-muted)}
:where([data-bc-grid-template="template4"]).preview-content[data-view=mobile] .mobile-row-trailing{display:flex;align-items:center;justify-content:flex-end;flex:0 1 auto;flex-wrap:wrap;gap:4px;min-width:0;max-width:50%}
:where([data-bc-grid-template="template4"]).preview-content[data-view=mobile] .mobile-row-badge{min-width:0}
:where([data-bc-grid-template="template4"]).preview-content[data-view=mobile] .mobile-row-actions{display:flex;align-items:center;min-width:0;max-width:100%}
:where([data-bc-grid-template="template4"]).preview-content[data-view=mobile] .mobile-row-actions>[data-bc-data]{min-width:0;max-width:100%;overflow-wrap:anywhere}
:where([data-bc-grid-template="template4"]).preview-content[data-view=mobile] .mobile-row-actions .icon-button,:where([data-bc-grid-template="template4"]).preview-content[data-view=mobile] .mobile-row-actions .iconsOperations>.icon{display:inline-flex;align-items:center;justify-content:center;flex-shrink:0;min-width:44px;min-height:44px;padding:0;border:1px solid var(--list-outline);border-radius:8px;background:var(--surface);color:var(--mobile-muted);cursor:pointer}
:where([data-bc-grid-template="template4"]).preview-content[data-view=mobile] .mobile-row-fields{grid-template-columns:minmax(0,1fr);gap:0;margin:0;padding:0 14px;border:0}
:where([data-bc-grid-template="template4"]).preview-content[data-view=mobile] .mobile-row-fields>div{display:block;min-width:0;padding:9px 0;border-bottom:1px solid var(--mobile-divider);font-size:14px;line-height:1.6}
:where([data-bc-grid-template="template4"]).preview-content[data-view=mobile] .mobile-row-fields>div:last-child{border-bottom:0}
:where([data-bc-grid-template="template4"]).preview-content[data-view=mobile] .mobile-row-fields dt{margin-bottom:3px;color:var(--mobile-muted);font-size:11px}
:where([data-bc-grid-template="template4"]).preview-content[data-view=mobile] .mobile-row-fields dd{font-size:14px;font-weight:500;line-height:1.6}
:where([data-bc-grid-template="template4"]).preview-content[data-view=mobile] .cell-with-icon{display:flex;align-items:center;justify-content:flex-end;gap:6px;white-space:normal}
:where([data-bc-grid-template="template4"]).preview-content[data-view=mobile] .cell-with-icon img{width:24px;height:24px}
:where([data-bc-grid-template="template4"]).preview-content[data-view=mobile] .cell-with-icon>span{overflow:visible;text-overflow:clip;overflow-wrap:anywhere}
:where([data-bc-grid-template="template4"]).preview-content[data-view=mobile] .mobile-row .status-pill{gap:4px;padding:4px 8px;border-radius:8px;font-size:11px;font-weight:600;line-height:1.5}
:where([data-bc-grid-template="template4"]).preview-content[data-view=mobile] .mobile-rows.compact .mobile-row-fields>div{padding-block:6px}
:where([data-bc-grid-template="template4"]).preview-content[data-view=mobile] .mobile-rows.compact .mobile-row-heading{min-height:58px}
:root[data-theme=dark] :where([data-bc-grid-template="template4"]) .preview-content[data-view=mobile]{--mobile-muted:#b8c5e1}
:where([data-bc-grid-template="template4"]).preview-content:is([data-bc-filter-mode=columns],[data-bc-filter-mode=advanced]) .filter-panel label{height:auto;padding:0;border:0;border-radius:0;background:transparent}
:where([data-bc-grid-template="template4"]).preview-content:is([data-bc-filter-mode=columns],[data-bc-filter-mode=advanced]) .filter-panel label>span:after{content:none}
:where([data-bc-grid-template="template4"]).preview-content:is([data-bc-filter-mode=columns],[data-bc-filter-mode=advanced]) .filter-panel .header-filter{min-width:0;width:150px;min-height:36px;padding:6px 8px;border:1px solid var(--list-outline);border-radius:8px;background:var(--surface);color:var(--list-ink);font:inherit}
:where([data-bc-grid-template="template4"]).preview-content[data-view=mobile] .filter-panel{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;padding:12px;border-color:var(--list-outline)}
:where([data-bc-grid-template="template4"]).preview-content[data-view=mobile] .filter-panel label{display:flex;flex-direction:column;align-items:stretch;gap:6px;min-width:0;height:auto;margin:0;padding:0;border:0;border-radius:0;background:transparent}
:where([data-bc-grid-template="template4"]).preview-content[data-view=mobile] .filter-panel label>span{font-size:12px;line-height:1.6;white-space:normal}
:where([data-bc-grid-template="template4"]).preview-content[data-view=mobile] .filter-panel label>span:after{content:none}
:where([data-bc-grid-template="template4"]).preview-content[data-view=mobile] .filter-panel .header-filter,:where([data-bc-grid-template="template4"]).preview-content[data-view=mobile] .filter-panel select{width:100%;max-width:100%;min-width:0;min-height:44px;border:1px solid var(--list-outline);border-radius:8px;padding:8px;background:var(--surface);color:var(--list-ink);font:inherit;font-size:16px}
:where([data-bc-grid-template="template4"]).preview-content[data-view=mobile] .filter-panel .clear-filters{grid-column:1/-1;justify-self:end;min-height:44px;margin:0;border-radius:8px}
:where([data-bc-grid-template="template4"]).preview-content[data-view=mobile] .filter-panel-tools{grid-column:1/-1;display:flex;align-items:center;justify-content:space-between;gap:8px}
:where([data-bc-grid-template="template4"]).preview-content[data-view=mobile] .filter-panel-tools .icon-button{width:44px;height:44px}
:where([data-bc-grid-template="template4"]).preview-content[data-view=mobile] .active-filters{padding:0 12px 12px;gap:6px}
:where([data-bc-grid-template="template4"]).preview-content[data-view=mobile] .filter-chip{min-height:44px;max-width:100%;white-space:normal;text-align:start}
:where([data-bc-grid-template="template4"]).preview-content[data-view=mobile] .pagination{display:grid;grid-template-columns:minmax(0,1fr) auto;padding:16px 12px;gap:14px 8px;border-top:1px solid var(--list-outline)}
:where([data-bc-grid-template="template4"]).preview-content[data-view=mobile] .pagination .result-count{gap:6px;white-space:nowrap}
:where([data-bc-grid-template="template4"]).preview-content[data-view=mobile] .pagination .page-size{justify-self:end;gap:8px;font-size:11px}
:where([data-bc-grid-template="template4"]).preview-content[data-view=mobile] .pagination .page-size select{width:64px;min-height:44px}
:where([data-bc-grid-template="template4"]).preview-content[data-view=mobile] .pagination .page-navigation{display:flex;grid-column:1/-1;flex-direction:column;align-items:center;justify-self:stretch;gap:10px;width:100%;max-width:100%;font-size:12px}
:where([data-bc-grid-template="template4"]).preview-content[data-view=mobile] .pagination .page-controls,:where([data-bc-grid-template="template4"]).preview-content[data-view=mobile] .pagination .page-numbers{gap:4px}
:where([data-bc-grid-template="template4"]).preview-content[data-view=mobile] .pagination .page-controls>.icon-button,:where([data-bc-grid-template="template4"]).preview-content[data-view=mobile] .pagination .page-number{flex:0 0 44px;width:44px;height:44px;min-width:44px;min-height:44px}
:where([data-bc-grid-template="template4"]).preview-content[data-view=mobile] .pagination .page-number:not([aria-current=page]){display:none}
@container mobile-list (min-width:380px){
  :where([data-bc-grid-template="template4"]).preview-content[data-view=mobile] .pagination .page-number:has(+ .page-number[aria-current=page]),:where([data-bc-grid-template="template4"]).preview-content[data-view=mobile] .pagination .page-number[aria-current=page]+.page-number{display:inline-grid}
}

/* Panel refinements stay inside the native template, including legacy cellMaker menus. */
:where([data-bc-grid-template="template4"]).preview-content .selection-summary{display:inline-flex;align-items:center;gap:4px;max-width:100%;min-height:40px;padding-inline:10px 4px;border:1px solid var(--list-outline);border-radius:8px;background:var(--row-selected);color:var(--selection-ink)}
:where([data-bc-grid-template="template4"]).preview-content .selection-summary .selection-count{display:inline-flex;align-items:center;gap:7px;color:inherit;font-size:12px;font-weight:600;white-space:normal}
:where([data-bc-grid-template="template4"]).preview-content .selection-summary .selection-count:before{content:"";width:7px;height:7px;border-radius:50%;background:var(--selection-accent);flex-shrink:0}
:where([data-bc-grid-template="template4"]).preview-content .selection-summary .clear-selection{flex-shrink:0;width:32px;height:32px;border:0;border-radius:6px;background:transparent;color:inherit}
:where([data-bc-grid-template="template4"]).preview-content .selection-summary .clear-selection:hover{background:var(--primary-container)}
:where([data-bc-grid-template="template4"]).preview-content .selection-summary .clear-selection:focus-visible{outline:2px solid var(--selection-accent);outline-offset:2px}
:where([data-bc-grid-template="template4"]).preview-content .preview-toolbar :is(.refresh-button,.export-button){display:inline-flex;align-items:center;justify-content:center;gap:8px;min-height:42px;padding:8px 12px;border:1px solid var(--list-outline);border-radius:10px;background:var(--surface);color:var(--text);font-size:12px;font-weight:600}
:where([data-bc-grid-template="template4"]).preview-content .preview-toolbar .export-button{background:var(--row-selected);color:var(--selection-ink)}
:where([data-bc-grid-template="template4"]).preview-content .preview-toolbar button:disabled{opacity:.5;cursor:not-allowed}
:where([data-bc-grid-template="template4"]).preview-content .grid-exports,:where([data-bc-grid-template="template4"]).preview-content .grid-export{display:flex;align-items:center;flex-wrap:wrap;gap:8px;min-width:0;max-width:100%}
:where([data-bc-grid-template="template4"]).preview-content .export-status{color:var(--error);font-size:12px;overflow-wrap:anywhere}
:where([data-bc-grid-template="template4"]).preview-content .data-table.independent-header>thead>tr>th{height:48px;padding:6px 10px;vertical-align:middle}
:where([data-bc-grid-template="template4"]).preview-content .data-table thead:not(:has(.header-filter)) th{height:50px;padding-block:12px}
:where([data-bc-grid-template="template4"]).preview-content:is([data-bc-filter-mode=columns],[data-bc-filter-mode=advanced]) .filter-panel{border-bottom:0}
:where([data-bc-grid-template="template4"]).preview-content .independent-header>thead>tr>th>.th-content{line-height:18px}
:where([data-bc-grid-template="template4"]).preview-content .independent-header>thead>.header-filters-row[hidden]{display:none}
:where([data-bc-grid-template="template4"]).preview-content .independent-header>thead>.header-filters-row>td{height:48px;padding:6px 8px;background:var(--surface-low);border-bottom:1px solid var(--list-outline)}
:where([data-bc-grid-template="template4"]).preview-content .data-table>:is(thead,tbody)>tr>:is(th,td).action-cell{padding-inline:4px}
:where([data-bc-grid-template="template4"]).preview-content .header-filter-field{display:flex;align-items:center;min-width:0;width:100%;height:34px;border:1px solid var(--list-outline);border-radius:8px;background:var(--surface);overflow:hidden}
:where([data-bc-grid-template="template4"]).preview-content .header-filter-field:focus-within{outline:2px solid var(--primary);outline-offset:1px}
:where([data-bc-grid-template="template4"]).preview-content .header-filter-field>.header-filter{flex:1;min-width:0;width:100%;height:32px;margin:0;padding:6px 8px;border:0;border-radius:0;outline:0;background:transparent;color:var(--text);font:inherit;font-size:11px}
:where([data-bc-grid-template="template4"]).preview-content .header-filter-field>.header-filter::-webkit-search-cancel-button{-webkit-appearance:none}
:where([data-bc-grid-template="template4"]).preview-content .header-filter-field>.clear-header-filter{flex:0 0 28px;width:28px;height:32px;padding:4px;border-radius:0;color:var(--muted);background:transparent}
:where([data-bc-grid-template="template4"]).preview-content .header-filter-field>.clear-header-filter:focus-visible{outline:2px solid var(--primary);outline-offset:-2px}
:where([data-bc-grid-template="template4"]).preview-content.has-pagination .data-table,:where([data-bc-grid-template="template4"]).preview-content.has-pagination .data-table tbody tr:last-child td{border-end-start-radius:0;border-end-end-radius:0}
:where([data-bc-grid-template="template4"]).preview-content .th-content:has(.iconsOperations){justify-content:center}
:where([data-bc-grid-template="template4"]).preview-content .th-content>span:has(.iconsOperations){flex:1;min-width:0}
:where([data-bc-grid-template="template4"]).preview-content .data-table td:has(.iconsOperations){overflow:visible}
:where([data-bc-grid-template="template4"]).preview-content .data-table tr:has(.iconsOperations.show){position:relative;z-index:2}
:where([data-bc-grid-template="template4"]).preview-content .iconsOperations .iconsDetail:popover-open{display:block;position:fixed;inset:auto;margin:0;transform:none;max-width:calc(100dvw - 16px);max-height:calc(100dvh - 16px);overflow:auto;transition:none;background:var(--surface);color:var(--text)}
@media(pointer:coarse){
  :where([data-bc-grid-template="template4"]).preview-content .header-filter-field,:where([data-bc-grid-template="template4"]).preview-content .header-filter-field>.header-filter{height:44px}
  :where([data-bc-grid-template="template4"]).preview-content .header-filter-field>.clear-header-filter{flex-basis:44px;width:44px;height:44px}
  :where([data-bc-grid-template="template4"]).preview-content .preview-toolbar :is(.refresh-button,.export-button){min-width:44px;min-height:44px}
}
`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 314:
/***/ ((module) => {

"use strict";


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

/***/ 417:
/***/ ((module) => {

"use strict";


module.exports = function (url, options) {
  if (!options) {
    options = {};
  }
  if (!url) {
    return url;
  }
  url = String(url.__esModule ? url.default : url);

  // If url is already wrapped in quotes, remove them
  if (/^['"].*['"]$/.test(url)) {
    url = url.slice(1, -1);
  }
  if (options.hash) {
    url += options.hash;
  }

  // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls
  if (/["'() \t\n]|(%20)/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }
  return url;
};

/***/ }),

/***/ 601:
/***/ ((module) => {

"use strict";


module.exports = function (i) {
  return i[1];
};

/***/ }),

/***/ 665:
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(72);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(825);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(659);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(56);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(540);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(113);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_desktop_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(270);

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_desktop_css__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, options);




       /* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_desktop_css__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A && _node_modules_css_loader_dist_cjs_js_style_desktop_css__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A.locals ? _node_modules_css_loader_dist_cjs_js_style_desktop_css__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A.locals : undefined);


/***/ }),

/***/ 159:
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(72);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(825);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(659);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(56);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(540);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(113);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_mobile_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(882);

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_mobile_css__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, options);




       /* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_mobile_css__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A && _node_modules_css_loader_dist_cjs_js_style_mobile_css__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A.locals ? _node_modules_css_loader_dist_cjs_js_style_mobile_css__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A.locals : undefined);


/***/ }),

/***/ 310:
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(72);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(825);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(659);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(56);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(540);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(113);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(145);

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, options);




       /* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A.locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A.locals : undefined);


/***/ }),

/***/ 72:
/***/ ((module) => {

"use strict";


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

/***/ 659:
/***/ ((module) => {

"use strict";


var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
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

/***/ 540:
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ 56:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ 825:
/***/ ((module) => {

"use strict";


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
  }

  // For old IE
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
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
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

/***/ 113:
/***/ ((module) => {

"use strict";


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

/***/ 132:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   grid: () => (/* binding */ grid)
/* harmony export */ });
/* harmony import */ var _component_BasisCoreGridComponent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(82);

var grid = _component_BasisCoreGridComponent__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A;



/***/ }),

/***/ 82:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _grid_Grid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(797);
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};

var BasisCoreGridComponent = /** @class */ (function () {
    function BasisCoreGridComponent(owner) {
        this.grid = null;
        this.sourceId = null;
        this.resetSourceId = null;
        this.owner = owner;
    }
    Object.defineProperty(BasisCoreGridComponent.prototype, "gridInstance", {
        get: function () { return this.grid; },
        enumerable: false,
        configurable: true
    });
    BasisCoreGridComponent.prototype.disposeAsync = function () {
        var _a, _b;
        (_b = (_a = this.grid) === null || _a === void 0 ? void 0 : _a.materialTemplate) === null || _b === void 0 ? void 0 : _b.dispose();
    };
    BasisCoreGridComponent.prototype.initializeAsync = function () {
        return __awaiter(this, void 0, void 0, function () {
            var sourceId, resetSourceId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.container = document.createElement("div");
                        this.owner.setContent(this.container);
                        return [4 /*yield*/, this.owner.getAttributeValueAsync("DataMemberName")];
                    case 1:
                        sourceId = _a.sent();
                        if (sourceId) {
                            this.sourceId = sourceId.toLowerCase();
                            this.owner.addTrigger([this.sourceId]);
                        }
                        return [4 /*yield*/, this.owner.getAttributeValueAsync("ResetSourceId")];
                    case 2:
                        resetSourceId = _a.sent();
                        if (resetSourceId) {
                            this.resetSourceId = resetSourceId.toLowerCase();
                            this.owner.addTrigger([this.resetSourceId]);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    BasisCoreGridComponent.prototype.initGridAsync = function () {
        return __awaiter(this, void 0, void 0, function () {
            var optionName, optionUrl, option, refreshCallback, selectionChangeCallback;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.owner.getAttributeValueAsync("options")];
                    case 1:
                        optionName = _a.sent();
                        return [4 /*yield*/, this.owner.getAttributeValueAsync("optionsUrl")];
                    case 2:
                        optionUrl = _a.sent();
                        option = null;
                        if (!optionUrl) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.owner.getLibAsync(optionName, optionUrl)];
                    case 3:
                        option = _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        option = optionName ? eval(optionName) : null;
                        _a.label = 5;
                    case 5:
                        refreshCallback = function (data) {
                            if (option.refreshSourceId) {
                                _this.owner.setSource(option.refreshSourceId, data);
                            }
                            else {
                                throw new Error("For refresh grid,'refreshSourceId' property must be set in grid 'options' object!");
                            }
                        };
                        selectionChangeCallback = function (data) {
                            if (option.selectedSourceId) {
                                _this.owner.setSource(option.selectedSourceId, data);
                            }
                            else {
                                throw new Error("For receive selected row from grid,'selectedSourceId' property must be set in grid 'options' object!");
                            }
                        };
                        this.container.innerHTML = "";
                        this.grid = new _grid_Grid__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A(this.container, option, refreshCallback, selectionChangeCallback);
                        return [2 /*return*/];
                }
            });
        });
    };
    BasisCoreGridComponent.prototype.displayDataIfExistsAsync = function () {
        return __awaiter(this, void 0, void 0, function () {
            var source;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.sourceId) return [3 /*break*/, 2];
                        source = this.owner.tryToGetSource(this.sourceId);
                        if (!source) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.runAsync(source)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    BasisCoreGridComponent.prototype.runAsync = function (source) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!((source === null || source === void 0 ? void 0 : source.id) == this.resetSourceId)) return [3 /*break*/, 2];
                        this.disposeAsync();
                        this.grid = null;
                        return [4 /*yield*/, this.displayDataIfExistsAsync()];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 7];
                    case 2:
                        if (!(this.grid == null)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.initGridAsync()];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        if (!((source === null || source === void 0 ? void 0 : source.id) === this.sourceId)) return [3 /*break*/, 5];
                        this.grid.setSource(source.rows, source.extra);
                        return [3 /*break*/, 7];
                    case 5:
                        if (!(source == null ||
                            (this.owner.triggers && this.owner.triggers.indexOf(source.id) >= 0))) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.displayDataIfExistsAsync()];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7: return [2 /*return*/, true];
                }
            });
        });
    };
    return BasisCoreGridComponent;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BasisCoreGridComponent);


/***/ }),

/***/ 19:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _enum__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(503);
/* harmony import */ var _Item__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(954);
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var Card = /** @class */ (function (_super) {
    __extends(Card, _super);
    function Card(owner, data, order) {
        return _super.call(this, owner, data, order) || this;
    }
    Object.defineProperty(Card.prototype, "uiElement", {
        get: function () {
            var _this = this;
            if (!this._uiElement) {
                this._uiElement = document.createElement("div");
                this._uiElement.setAttribute("data-bc-card", "");
                this._uiElement.setAttribute("data-sys-tile", "");
                var cardCount = this._owner.options.cardCount;
                var space = cardCount * 20;
                this._uiElement.setAttribute("style", "width: calc((100% - ".concat((space + 20), "px) / ").concat(cardCount, ")"));
                var div_1 = document.createElement("div");
                div_1.setAttribute("data-bc-card-data", "");
                // const cardDiv = document.createElement("div");
                var titleDescDiv_1 = document.createElement("div");
                titleDescDiv_1.setAttribute("data-bc-card-title", "");
                this._owner.cards.forEach(function (column) {
                    var _a, _b, _c, _d;
                    if (column.name == "title") {
                        var tmpValue = Reflect.get(_this._dataProxy, column.title);
                        var cardSpan = document.createElement("span");
                        cardSpan.setAttribute("data-bc-card-titleText", "");
                        cardSpan.setAttribute("data-sys-text", "");
                        cardSpan.textContent = tmpValue === null || tmpValue === void 0 ? void 0 : tmpValue.toString();
                        titleDescDiv_1.appendChild(cardSpan);
                        div_1.appendChild(titleDescDiv_1);
                    }
                    else if (column.name == "image") {
                        var cardDiv = document.createElement("div");
                        var tmpValue = Reflect.get(_this._dataProxy, column.title);
                        if (column.cellMaker) {
                            cardDiv.innerHTML = (_a = column.cellMaker(_this.data, tmpValue, cardDiv)) !== null && _a !== void 0 ? _a : tmpValue;
                        }
                        else {
                            var cardImage = document.createElement("img");
                            cardImage.setAttribute("src", tmpValue === null || tmpValue === void 0 ? void 0 : tmpValue.toString());
                            cardDiv.appendChild(cardImage);
                        }
                        div_1.appendChild(cardDiv);
                    }
                    else if (column.name == "info") {
                        var cardDiv = document.createElement("div");
                        var tmpValue = Reflect.get(_this._dataProxy, column.title);
                        if (column.cellMaker) {
                            cardDiv.innerHTML = (_b = column.cellMaker(_this.data, tmpValue, cardDiv)) !== null && _b !== void 0 ? _b : tmpValue;
                        }
                        else {
                            var cardSpan = document.createElement("span");
                            cardSpan.setAttribute("data-bc-card-info", "");
                            cardSpan.setAttribute("data-sys-text", "");
                            cardSpan.textContent = tmpValue === null || tmpValue === void 0 ? void 0 : tmpValue.toString();
                            cardDiv.appendChild(cardSpan);
                        }
                        titleDescDiv_1.appendChild(cardDiv);
                    }
                    else if (column.name == "action") {
                        var tmpValue = Reflect.get(_this._dataProxy, column.title);
                        var cardAction = document.createElement("div");
                        cardAction.innerHTML = (_c = column.cellMaker(_this.data, tmpValue, div_1)) !== null && _c !== void 0 ? _c : tmpValue;
                        // div.appendChild(cardDiv)
                        // div.appendChild(titleDescDiv)
                        div_1.appendChild(cardAction);
                    }
                    else {
                        var tmpValue = Reflect.get(_this._dataProxy, column.title);
                        if (column.cellMaker) {
                            var cardDiv = document.createElement("div");
                            cardDiv.innerHTML = (_d = column.cellMaker(_this.data, tmpValue, cardDiv)) !== null && _d !== void 0 ? _d : tmpValue;
                            div_1.appendChild(cardDiv);
                        }
                        else {
                            var cardSpan = document.createElement("span");
                            cardSpan.setAttribute("data-bc-card-text", "");
                            cardSpan.setAttribute("data-sys-text", "");
                            cardSpan.textContent = tmpValue === null || tmpValue === void 0 ? void 0 : tmpValue.toString();
                            div_1.appendChild(cardSpan);
                        }
                    }
                });
                this._uiElement.appendChild(div_1);
                if (this._owner.options.rowMaker) {
                    this._owner.options.rowMaker(this.data, this._uiElement);
                }
            }
            else if (this._orderChanged) {
                var cel = this._uiElement.querySelector("[data-bc-order]");
                if (cel) {
                    cel.textContent = this.order.toString();
                }
                this._orderChanged = false;
            }
            return this._uiElement;
        },
        enumerable: false,
        configurable: true
    });
    Card.prototype.setOrder = function (order) {
        this.order = order + 1;
        this._orderChanged = true;
    };
    Card.prototype.acceptableByRowFilter = function (filter, type) {
        var _a;
        var retVal = true;
        for (var _i = 0, _b = Reflect.ownKeys(filter); _i < _b.length; _i++) {
            var key = _b[_i];
            var element = Reflect.get(filter, key);
            var value = (_a = Reflect.get(this._dataProxy, key)) === null || _a === void 0 ? void 0 : _a.toString().toLowerCase();
            if (type && (type == "select" || type == "autocomplete")) {
                retVal = retVal && value == element;
            }
            else {
                retVal = retVal && value.indexOf(element) >= 0;
            }
            if (!retVal) {
                break;
            }
        }
        return retVal;
    };
    Card.prototype.acceptableBySimpleFilter = function (filter) {
        var _this = this;
        var colInfo = this._owner.cards
            .filter(function (col) { return col.type === _enum__WEBPACK_IMPORTED_MODULE_0__/* .ColumnType */ .$.data; })
            .find(function (col) {
            var _a;
            var retVal = false;
            if (col.filter) {
                var value = (_a = Reflect.get(_this._dataProxy, col.title)) === null || _a === void 0 ? void 0 : _a.toString().toLowerCase();
                retVal = value && value.indexOf(filter) >= 0;
            }
            return retVal;
        });
        return colInfo ? true : false;
    };
    Card.compare = function (first, second, sortInfo) {
        var valFirst = Reflect.get(sortInfo.column.title ? first._dataProxy : first, sortInfo.column.name);
        var valSecond = Reflect.get(sortInfo.column.title ? second._dataProxy : second, sortInfo.column.name);
        if (typeof valFirst === "string") {
            valFirst = valFirst.toLowerCase();
        }
        if (typeof valSecond === "string") {
            valSecond = valSecond.toLowerCase();
        }
        return valFirst > valSecond
            ? sortInfo.sort === "asc"
                ? 1
                : -1
            : valFirst < valSecond
                ? sortInfo.sort === "asc"
                    ? -1
                    : 1
                : 0;
    };
    Object.defineProperty(Card.prototype, "selected", {
        get: function () {
            var _a, _b;
            return (_b = (_a = this._checkBox) === null || _a === void 0 ? void 0 : _a.checked) !== null && _b !== void 0 ? _b : false;
        },
        enumerable: false,
        configurable: true
    });
    return Card;
}(_Item__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Card);


/***/ }),

/***/ 797:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _asset_layout_showFilter_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(869);
/* harmony import */ var _asset_style_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(310);
/* harmony import */ var _asset_style_desktop_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(665);
/* harmony import */ var _asset_style_mobile_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(159);
/* harmony import */ var _GridRow__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(60);
/* harmony import */ var _paginate_ClientPaginate__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(188);
/* harmony import */ var _enum__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(503);
/* harmony import */ var _paginate_ServerProcess__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(636);
/* harmony import */ var _paginate_NoPaginateProcessManager__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(92);
/* harmony import */ var _paginate_MixedProcess__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(414);
/* harmony import */ var _Card__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(19);
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (undefined && undefined.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};











var Grid = /** @class */ (function () {
    function Grid(container, options, signalSourceCallback, selectionChangeCallback) {
        var _a, _b, _c, _d, _e, _f;
        this.columnsInitialized = false;
        this.columns = new Array();
        this.cards = new Array();
        if (!container) {
            throw "table element is null or undefined";
        }
        this.options = __assign(__assign({}, Grid.getDefaults()), (options !== null && options !== void 0 ? options : {}));
        this.options.culture.labels = __assign(__assign({}, Grid.getDefaults().culture.labels), ((_b = (_a = options === null || options === void 0 ? void 0 : options.culture) === null || _a === void 0 ? void 0 : _a.labels) !== null && _b !== void 0 ? _b : {}));
        // initialize deviceId
        var optionDeviceId = (_c = this.options.culture) === null || _c === void 0 ? void 0 : _c.deviceId;
        if (optionDeviceId) {
            if (typeof optionDeviceId == "string") {
                var devicesList = __webpack_require__(524);
                var deviceId = devicesList.find(function (ex) {
                    return ex.title.toLowerCase() === optionDeviceId.toString().toLowerCase();
                });
                this.deviceId =
                    (_d = deviceId === null || deviceId === void 0 ? void 0 : deviceId.deviceId) !== null && _d !== void 0 ? _d : Grid.getDefaults().culture.deviceId;
            }
            else if (typeof optionDeviceId == "number") {
                var devicesList = __webpack_require__(524);
                var deviceId = devicesList.find(function (ex) { return ex.deviceId === optionDeviceId; });
                this.deviceId =
                    (_e = deviceId === null || deviceId === void 0 ? void 0 : deviceId.deviceId) !== null && _e !== void 0 ? _e : Grid.getDefaults().culture.deviceId;
            }
        }
        else {
            this.deviceId = Grid.getDefaults().culture.deviceId;
        }
        this._container = container;
        this._container.setAttribute("data-bc-grid", "d".concat(this.deviceId));
        this._container.setAttribute("data-bc-mian-grid", "");
        if (this.options.direction) {
            this._container.style["direction"] = this.options.direction;
            this._container.setAttribute("data-bc-grid-direction", this.options.direction);
        }
        this._informationFormatter = Function("from", "to", "total", "return `".concat(this.options.culture.labels.information, "`"));
        this._onSignalSourceCallback = signalSourceCallback;
        this._selectionChangeCallback = selectionChangeCallback;
        this.id = Math.random().toString(36).substring(2);
        if (((_f = this.options.culture) === null || _f === void 0 ? void 0 : _f.template) === "template4") {
            // Legacy instances must not initialize Template 4's styles or helpers.
            var Template = (__webpack_require__(315)/* ["default"] */ .A);
            this._container.setAttribute("data-bc-grid", "studio");
            this._container.setAttribute("data-bc-grid-template", "template4");
            this.materialTemplate = new Template(this, this._container, Grid.getDefaults().culture.labels);
            this.columns = this.materialTemplate.columns;
            this.processManager = this.materialTemplate.process;
            this.columnsInitialized = true;
            return;
        }
        if (this.options.mode == "grid") {
            if (this.deviceId == 1) {
                this.createUI();
            }
            else if (this.deviceId == 2) {
                this.createTemplateUI();
            }
        }
        else if (this.options.mode == "widthCard") {
            this.createUIWidthCard();
            this._container.setAttribute("data-bc-widthcard-mode", "");
        }
    }
    Grid.getDefaults = function () {
        if (!Grid._defaults) {
            Grid._defaults = {
                filter: "simple",
                process: "client",
                ProcessActionType: {
                    search: "server",
                    paging: "client",
                    sort: "server",
                },
                paging: [10, 30, 50],
                defaultPagingIndex: 0,
                pageCount: 10,
                sorting: true,
                pageNumber: 1,
                direction: "rtl",
                noData: true,
                firstAndLastBtn: true,
                information: true,
                rowNumber: "#",
                loader: true,
                refresh: false,
                selectable: false,
                selectAll: false,
                mode: "grid",
                modeButtons: false,
                cardCount: 5,
                culture: {
                    deviceId: 1,
                    template: "template1",
                    labels: {
                        search: "Search :",
                        searchPlaceholder: "",
                        goto: "برو به :",
                        pageSize: "Page Size :",
                        next: "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"24px\" viewBox=\"0 -960 960 960\" width=\"24px\" fill=\"#004B85\"><path d=\"M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z\"/></svg>",
                        previous: "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"24px\" viewBox=\"0 -960 960 960\" width=\"24px\" fill=\"#004B85\"><path d=\"M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z\"/></svg>",
                        first: "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"24px\" viewBox=\"0 -960 960 960\" width=\"24px\" fill=\"#004B85\"><path d=\"M440-240 200-480l240-240 56 56-183 184 183 184-56 56Zm264 0L464-480l240-240 56 56-183 184 183 184-56 56Z\"/></svg>",
                        last: "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"24px\" viewBox=\"0 -960 960 960\" width=\"24px\" fill=\"#004B85\"><path d=\"M383-480 200-664l56-56 240 240-240 240-56-56 183-184Zm264 0L464-664l56-56 240 240-240 240-56-56 183-184Z\"/></svg>",
                        noData: "No Data Find",
                        information: "Showing ${from} to ${to} from Total ${total}",
                        refresh: "Refresh",
                    },
                },
            };
        }
        return Grid._defaults;
    };
    Grid.formatString = function (pattern, params) {
        var paraNameList = __spreadArray([], Object.getOwnPropertyNames(params), true);
        var formatter = new (Function.bind.apply(Function, __spreadArray(__spreadArray([void 0], paraNameList, false), ["return `".concat(pattern, "`")], false)))();
        return formatter.apply(void 0, paraNameList.map(function (x) { return Reflect.get(params, x); }));
    };
    Grid.prototype.handleInput = function (input, event) {
        var _this = this;
        clearTimeout(this.timerId);
        if (this.options.process === "server" &&
            !(event.key === "Enter" || event.keyCode === 13)) {
            this.timerId = setTimeout(function () {
                _this.performAction(input);
            }, 1000);
        }
        else {
            this.performAction(input);
        }
    };
    Grid.prototype.handleRowInput = function (el, type, columnInfo, event) {
        var _this = this;
        clearTimeout(this.timerId);
        if ((this.options.process === "server" || (this.options.process === "mix" && this.options.ProcessActionType.search == "server")) && !((event === null || event === void 0 ? void 0 : event.key) === "Enter" || (event === null || event === void 0 ? void 0 : event.keyCode) === 13)) {
            this.timerId = setTimeout(function () {
                var newFilter = el.value.toLowerCase();
                var mustUpdate = false;
                if (newFilter.length > 0) {
                    if (!_this.processManager.filter) {
                        _this.processManager.filter = {};
                    }
                    if (newFilter != _this.processManager.filter[columnInfo.name]) {
                        if (type == "select") {
                            _this.processManager.filter[columnInfo.name] = {
                                id: parseInt(newFilter),
                                value: el.selectedOptions[0].text
                            };
                        }
                        else if (type == "autocomplete") {
                            _this.processManager.filter[columnInfo.name] = {
                                id: parseInt(el.getAttribute("data-bc-value")),
                                value: newFilter
                            };
                        }
                        else {
                            _this.processManager.filter[columnInfo.name] = newFilter;
                        }
                        mustUpdate = true;
                    }
                }
                else {
                    if (typeof _this.processManager.filter[columnInfo.name] !== "undefined") {
                        delete _this.processManager.filter[columnInfo.name];
                        mustUpdate = true;
                    }
                }
                if (mustUpdate) {
                    _this.processManager.pageNumber = 0;
                    _this.processManager.applyUserAction();
                }
            }, 1000);
        }
        else {
            this.timerId = setTimeout(function () {
                var newFilter = el.value.toLowerCase();
                var mustUpdate = false;
                if (newFilter.length > 0) {
                    if (!_this.processManager.filter) {
                        _this.processManager.filter = {};
                    }
                    if (newFilter != _this.processManager.filter[columnInfo.name]) {
                        _this.processManager.filter[columnInfo.name] = newFilter;
                        mustUpdate = true;
                    }
                }
                else {
                    if (typeof _this.processManager.filter[columnInfo.name] !== "undefined") {
                        delete _this.processManager.filter[columnInfo.name];
                        mustUpdate = true;
                    }
                }
                if (mustUpdate) {
                    _this.processManager.pageNumber = 0;
                    _this.processManager.applyUserAction(type);
                }
            }, 5);
        }
    };
    Grid.prototype.performAction = function (input) {
        var newFilter = input.value.toLowerCase();
        if (this.processManager.filter != newFilter) {
            this.processManager.filter = newFilter;
            this.processManager.pageNumber = 0;
            this.processManager.applyUserAction();
        }
    };
    Grid.prototype.createTemplateUI = function () {
        var _this = this;
        var _a;
        this.columns = [];
        this._table = document.createElement("div");
        this._table.setAttribute("data-bc-table", "");
        // this._head = document.createElement("div");
        // this._table.appendChild(this._head);
        this._body = document.createElement("div");
        this._table.appendChild(this._body);
        this._body.setAttribute("data-bc-table-body", "");
        this._body.setAttribute("data-sys-grid-border-color", "");
        this._tableContainer = document.createElement("div");
        this._tableContainer.setAttribute("data-bc-table-container", "");
        if (typeof this.options.loader === "function") {
            this._loaderContainer = document.createElement("div");
            this._loaderContainer.setAttribute("data-bc-loader-container", "");
            this._tableContainer.appendChild(this._loaderContainer);
        }
        this._tableContainer.appendChild(this._table);
        if (this.options.information) {
            this._informationContainer = document.createElement("div");
            this._informationContainer.setAttribute("data-bc-information-container", "");
            this._informationContainer.setAttribute("data-sys-text-colorful", "");
        }
        var gridHeaderContainer = document.createElement("div");
        gridHeaderContainer.setAttribute("data-bc-grid-header-container", "");
        gridHeaderContainer.setAttribute("data-sys-grid-border-color", "");
        if (this.options.filter == "simple") {
            var filter = document.createElement("div");
            filter.setAttribute("data-bc-filter-container", "");
            gridHeaderContainer.appendChild(filter);
            var label = document.createElement("label");
            label.setAttribute("data-sys-text-colorful", "");
            label.appendChild(document.createTextNode(this.options.culture.labels.search));
            var input_1 = document.createElement("input");
            input_1.setAttribute("type", "text");
            input_1.setAttribute("data-sys-input-text", "");
            if (this.options.culture.labels.searchPlaceholder != "") {
                input_1.setAttribute("placeholder", this.options.culture.labels.searchPlaceholder);
            }
            label.appendChild(input_1);
            input_1.addEventListener("keyup", function (event) {
                return _this.handleInput(input_1, event);
            });
            filter.appendChild(label);
        }
        else if (this.options.filter == "row") {
            var copyShowFilterLayout = _asset_layout_showFilter_html__WEBPACK_IMPORTED_MODULE_0__;
            var showFilter_1 = $bc.util.toHTMLElement(copyShowFilterLayout);
            gridHeaderContainer.appendChild(showFilter_1);
            var showFilterBtn_1 = showFilter_1.querySelector("[data-bc-filter-btn]");
            showFilterBtn_1.addEventListener("click", function (_) {
                showFilterBtn_1.classList.toggle("active");
                showFilter_1.classList.toggle("active");
            });
        }
        this._container.appendChild(gridHeaderContainer);
        if (this.options.refresh) {
            var div = document.createElement("div");
            div.setAttribute("data-bc-refresh-container", "");
            this._container.appendChild(div);
            var btn = document.createElement("span");
            btn.innerHTML = this.options.culture.labels.refresh;
            btn.addEventListener("click", function (e) {
                e.preventDefault();
                _this.tryLoadData();
            });
            div.appendChild(btn);
        }
        this._container.appendChild(this._tableContainer);
        if (this.options.paging) {
            var gridHeaderContainer_1 = this._container.querySelector("[data-bc-grid-header-container]");
            if (!gridHeaderContainer_1) {
                gridHeaderContainer_1 = document.createElement("div");
                gridHeaderContainer_1.setAttribute("data-bc-grid-header-container", "");
                gridHeaderContainer_1.setAttribute("data-sys-grid-border-color", "");
                this._container.insertBefore(gridHeaderContainer_1, this._tableContainer);
            }
            var pageSizeContainer = document.createElement("div");
            pageSizeContainer.setAttribute("data-bc-pagesize-container", "");
            gridHeaderContainer_1.appendChild(pageSizeContainer);
            if (((_a = this.options.export) === null || _a === void 0 ? void 0 : _a.length) > 0) {
                var exportContainer_1 = document.createElement("div");
                exportContainer_1.setAttribute("data-bc-export-container", "");
                gridHeaderContainer_1.appendChild(exportContainer_1);
                this.options.export.forEach(function (exp) {
                    var exportItemContainer = document.createElement("div");
                    exportItemContainer.setAttribute("data-bc-export-item", "");
                    if (exp.type == "excel") {
                        exportItemContainer.setAttribute("data-bc-export-item-excel", "");
                        if (exp.tooltip) {
                            exportItemContainer.setAttribute("data-sys-tooltip", "");
                            exportItemContainer.setAttribute("data-bc-export-tooltip", exp.tooltip);
                        }
                        exportItemContainer.innerHTML = "<svg width=\"35\" height=\"35\" viewBox=\"0 0 35 35\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"0.5\" y=\"0.5\" width=\"34\" height=\"34\" rx=\"4.5\" stroke=\"#0D783C\"/><g style=\"mix-blend-mode:multiply\" opacity=\"0.2\"><g style=\"mix-blend-mode:multiply\" opacity=\"0.2\"><path d=\"M27.2026 7.99805H13.1519C12.6678 7.99805 12.2754 8.39049 12.2754 8.87459V25.8536C12.2754 26.3377 12.6678 26.7301 13.1519 26.7301H27.2026C27.6867 26.7301 28.0792 26.3377 28.0792 25.8536V8.87459C28.0792 8.39049 27.6867 7.99805 27.2026 7.99805Z\" fill=\"white\"/></g></g><g style=\"mix-blend-mode:multiply\" opacity=\"0.12\"><g style=\"mix-blend-mode:multiply\" opacity=\"0.12\"><path d=\"M27.2007 7.99707H13.15C12.6659 7.99707 12.2734 8.38951 12.2734 8.87361V25.8526C12.2734 26.3367 12.6659 26.7291 13.15 26.7291H27.2007C27.6848 26.7291 28.0772 26.3367 28.0772 25.8526V8.87361C28.0772 8.38951 27.6848 7.99707 27.2007 7.99707Z\" fill=\"white\"/></g></g><path d=\"M20.4649 7.99805H13.1474C13.0326 7.99805 12.9189 8.02076 12.813 8.06489C12.707 8.10902 12.6108 8.17369 12.5299 8.25517C12.449 8.33665 12.3851 8.43333 12.3417 8.53964C12.2984 8.64596 12.2765 8.75979 12.2774 8.87459V12.6794H20.4649V7.99805Z\" fill=\"#21A366\"/><path d=\"M27.2129 7.99805H20.4668V12.6794H28.07V8.87459C28.0717 8.64495 27.9826 8.42394 27.8221 8.25974C27.6615 8.09554 27.4426 8.00147 27.2129 7.99805Z\" fill=\"#33C481\"/><path d=\"M28.0765 17.3604H20.4668V22.0417H28.0765V17.3604Z\" fill=\"#107C41\"/><path d=\"M20.4649 22.0417V17.3604H12.2774V25.8466C12.2765 25.962 12.2986 26.0763 12.3423 26.1831C12.3861 26.2898 12.4506 26.3868 12.5322 26.4683C12.6137 26.5499 12.7107 26.6144 12.8174 26.6582C12.9242 26.7019 13.0386 26.724 13.1539 26.7231H27.2111C27.3264 26.724 27.4408 26.7019 27.5476 26.6582C27.6543 26.6144 27.7513 26.5499 27.8328 26.4683C27.9144 26.3868 27.9789 26.2898 28.0227 26.1831C28.0664 26.0763 28.0885 25.962 28.0876 25.8466V22.0417H20.4649Z\" fill=\"#185C37\"/><path d=\"M20.4656 12.6787H12.2715V17.3602H20.4656V12.6787Z\" fill=\"#107C41\"/><path d=\"M28.0765 12.6787H20.4668V17.3602H28.0765V12.6787Z\" fill=\"#21A366\"/><g style=\"mix-blend-mode:multiply\" opacity=\"0.48\"><g style=\"mix-blend-mode:multiply\" opacity=\"0.48\"><path d=\"M17.2455 12.0938H8.46053C7.97643 12.0938 7.58398 12.4862 7.58398 12.9703V21.7553C7.58398 22.2394 7.97643 22.6318 8.46053 22.6318H17.2455C17.7296 22.6318 18.122 22.2394 18.122 21.7553V12.9703C18.122 12.4862 17.7296 12.0938 17.2455 12.0938Z\" fill=\"white\"/></g></g><g style=\"mix-blend-mode:multiply\" opacity=\"0.24\"><g style=\"mix-blend-mode:multiply\" opacity=\"0.24\"><path d=\"M17.2474 12.0938H8.46248C7.97838 12.0938 7.58594 12.4862 7.58594 12.9703V21.7553C7.58594 22.2394 7.97838 22.6318 8.46248 22.6318H17.2474C17.7315 22.6318 18.124 22.2394 18.124 21.7553V12.9703C18.124 12.4862 17.7315 12.0938 17.2474 12.0938Z\" fill=\"white\"/></g></g><path d=\"M17.2455 12.0947H8.46053C7.97643 12.0947 7.58398 12.4872 7.58398 12.9713V21.7562C7.58398 22.2403 7.97643 22.6327 8.46053 22.6327H17.2455C17.7296 22.6327 18.122 22.2403 18.122 21.7562V12.9713C18.122 12.4872 17.7296 12.0947 17.2455 12.0947Z\" fill=\"#107C41\"/><path d=\"M10.3301 20.2106L12.1546 17.3602L10.4599 14.5098H11.8234L12.7454 16.3278C12.8298 16.4966 12.8883 16.6265 12.9207 16.7109C12.9792 16.5745 13.0441 16.4382 13.109 16.3083L14.096 14.5098H15.3491L13.622 17.3602L15.401 20.2365H14.1025L13.0311 18.2432C12.9824 18.1582 12.9412 18.0691 12.9078 17.977C12.8767 18.068 12.8353 18.1551 12.7844 18.2367L11.6287 20.2106H10.3301Z\" fill=\"white\"/><g style=\"mix-blend-mode:soft-light\" opacity=\"0.5\"><path style=\"mix-blend-mode:soft-light\" opacity=\"0.5\" d=\"M17.2474 12.0947H8.46248C7.97838 12.0947 7.58594 12.4872 7.58594 12.9713V21.7562C7.58594 22.2403 7.97838 22.6327 8.46248 22.6327H17.2474C17.7315 22.6327 18.124 22.2403 18.124 21.7562V12.9713C18.124 12.4872 17.7315 12.0947 17.2474 12.0947Z\" fill=\"url(#paint0_linear_10847_113542)\"/></g><defs><linearGradient id=\"paint0_linear_10847_113542\" x1=\"9.41694\" y1=\"11.4065\" x2=\"16.2929\" y2=\"23.3145\" gradientUnits=\"userSpaceOnUse\"><stop stop-color=\"white\" stop-opacity=\"0.5\"/><stop offset=\"1\" stop-opacity=\"0.7\"/></linearGradient></defs></svg>";
                        exportItemContainer.addEventListener("click", function (e) {
                            _this.downloadFile(exp);
                        });
                        exportContainer_1.appendChild(exportItemContainer);
                    }
                    else {
                        throw Error("Export type '".concat(exp.type, "' not support in grid"));
                    }
                });
            }
            var gridFooterContainer = document.createElement("div");
            var pagingContainer = document.createElement("div");
            pagingContainer.setAttribute("data-bc-paging-container", "");
            pagingContainer.setAttribute("data-bc-no-selection", "");
            var pageingNumber = document.createElement("div");
            pageingNumber.setAttribute("data-bc-paging-number", "");
            gridFooterContainer.setAttribute("data-bc-grid-footer-container", "");
            gridFooterContainer.setAttribute("data-sys-paging-container", "");
            this._container.appendChild(gridFooterContainer);
            gridFooterContainer.appendChild(pageingNumber);
            gridFooterContainer.appendChild(pagingContainer);
            switch (this.options.process) {
                case "server": {
                    this.processManager = new _paginate_ServerProcess__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A(this, pageSizeContainer, pagingContainer, pageingNumber);
                    break;
                }
                case "client": {
                    this.processManager = new _paginate_ClientPaginate__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A(this, pageSizeContainer, pagingContainer, pageingNumber);
                    break;
                }
                case "mix": {
                    this.processManager = new _paginate_MixedProcess__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .A(this, pageSizeContainer, pagingContainer, pageingNumber);
                    break;
                }
                default: {
                    throw Error("Type '".concat(this.options.process, "' not support in grid"));
                }
            }
            if (typeof this.options.paging == "number") {
                // pageSizeContainer.style.display = "none";
                pageSizeContainer.remove();
                if (gridHeaderContainer_1.innerHTML == "") {
                    gridHeaderContainer_1.remove();
                }
            }
        }
        else {
            this.processManager = new _paginate_NoPaginateProcessManager__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A(this);
            if (gridHeaderContainer.innerHTML == "") {
                gridHeaderContainer.remove();
            }
        }
        if (this._informationContainer) {
            var gridFooterContainer = this._container.querySelector("[data-bc-grid-footer-container]");
            if (!gridFooterContainer) {
                gridFooterContainer = document.createElement("div");
                gridFooterContainer.setAttribute("data-bc-grid-footer-container", "");
                gridFooterContainer.setAttribute("data-sys-paging-container", "");
                this._container.appendChild(gridFooterContainer);
            }
            gridFooterContainer.appendChild(this._informationContainer);
        }
        this.createTemplate();
    };
    Grid.prototype.createTemplate = function () {
        var _this = this;
        if (this.options.columns) {
            Object.getOwnPropertyNames(this.options.columns).forEach(function (property) {
                var value = _this.options.columns[property];
                var columnInfo;
                if (typeof value === "string") {
                    columnInfo = {
                        title: value,
                        source: property,
                        name: property,
                        sort: _this.options.sorting,
                        type: _enum__WEBPACK_IMPORTED_MODULE_6__/* .ColumnType */ .$.data,
                        filter: true,
                    };
                }
                else {
                    columnInfo = __assign({
                        title: property,
                        source: property,
                        name: property,
                        sort: _this.options.sorting,
                        type: _enum__WEBPACK_IMPORTED_MODULE_6__/* .ColumnType */ .$.data,
                        filter: true,
                    }, value);
                }
                _this.columns.push(columnInfo);
                // const item = this.createTemplate1Item(columnInfo);
                // this._body.appendChild(item);
            });
            var clr = document.createElement("div");
            clr.setAttribute("class", "clr");
            this._body.appendChild(clr);
            this.columnsInitialized = true;
            this.addTemplateRowFilterPart();
        }
    };
    Grid.prototype.addTemplateRowFilterPart = function () {
        var _this = this;
        if (this.options.filter === "row") {
            var filterItemsWrapper_1 = this._container
                .querySelector("[data-bc-grid-header-container]")
                .querySelector("[data-bc-filter-items]");
            filterItemsWrapper_1.innerHTML = "";
            this.columns.forEach(function (columnInfo) {
                if (columnInfo.filter) {
                    var li = document.createElement("li");
                    li.setAttribute("data-bc-no-selection", "");
                    li.setAttribute("data-bc-filter-item", "");
                    li.setAttribute("data-sys-tr", "");
                    li.innerHTML = "";
                    _this.fillTemplateRowFilterElement(li, columnInfo);
                    // this._head.appendChild(tr);
                    filterItemsWrapper_1.appendChild(li);
                }
            });
            if (filterItemsWrapper_1.innerHTML == "") {
                filterItemsWrapper_1.remove();
            }
            var gridHeaderContainer = this._container.querySelector("[data-bc-grid-header-container]");
            if (gridHeaderContainer.innerHTML == "") {
                gridHeaderContainer.remove();
            }
        }
    };
    Grid.prototype.fillTemplateRowFilterElement = function (li, columnInfo) {
        return __awaiter(this, void 0, void 0, function () {
            var el;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.createRowFilterElement(columnInfo)];
                    case 1:
                        el = _a.sent();
                        li.appendChild(el);
                        return [2 /*return*/];
                }
            });
        });
    };
    Grid.prototype.createUI = function () {
        var _this = this;
        var _a;
        this.columns = [];
        this._table = document.createElement("table");
        this._table.setAttribute("data-bc-table", "");
        this._head = document.createElement("thead");
        this._head.setAttribute("data-sys-thead", "");
        this._table.appendChild(this._head);
        this._body = document.createElement("tbody");
        this._table.appendChild(this._body);
        this._tableContainer = document.createElement("div");
        this._tableContainer.setAttribute("data-bc-table-container", "");
        if (typeof this.options.loader === "function") {
            this._loaderContainer = document.createElement("div");
            this._loaderContainer.setAttribute("data-bc-loader-container", "");
            this._tableContainer.appendChild(this._loaderContainer);
        }
        this._tableContainer.appendChild(this._table);
        if (this.options.information) {
            this._informationContainer = document.createElement("div");
            this._informationContainer.setAttribute("data-bc-information-container", "");
            this._informationContainer.setAttribute("data-sys-text-colorful", "");
        }
        var modes = document.createElement("div");
        var gridMode = document.createElement("div");
        var widthCardMode = document.createElement("div");
        gridMode.setAttribute("data-bc-grid-active-mode", "");
        gridMode.innerHTML = "<svg width=\"22\" height=\"18\" viewBox=\"0 0 22 18\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n    <path d=\"M0.714844 12.8571H21.2863V10.2857H0.714844V12.8571ZM0.714844 18H21.2863V15.4286H0.714844V18ZM0.714844 7.71429H21.2863V5.14286H0.714844V7.71429ZM0.714844 0V2.57143H21.2863V0H0.714844Z\" />\n    </svg>\n    ";
        widthCardMode.innerHTML = "<svg width=\"18\" height=\"18\" viewBox=\"0 0 18 18\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n    <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M0 0V8H8V0H0ZM6 6H2V2H6V6ZM0 10V18H8V10H0ZM6 16H2V12H6V16ZM10 0V8H18V0H10ZM16 6H12V2H16V6ZM10 10V18H18V10H10ZM16 16H12V12H16V16Z\" />\n    </svg>\n    ";
        modes.appendChild(gridMode);
        modes.appendChild(widthCardMode);
        widthCardMode.addEventListener("click", function (e) {
            _this.options.mode = "widthCard";
            _this._container.innerHTML = "";
            _this._head.innerHTML = "";
            _this._body.innerHTML = "";
            _this._container.setAttribute("data-bc-widthcard-mode", "");
            _this.createUIWidthCard();
            _this.setSource(_this._rows);
        });
        modes.setAttribute("data-bc-grid-modes", "");
        var gridHeaderContainer = document.createElement("div");
        gridHeaderContainer.setAttribute("data-bc-grid-header-container", "");
        gridHeaderContainer.setAttribute("data-sys-grid-border-color", "");
        if (this.options.modeButtons == true) {
            gridHeaderContainer.appendChild(modes);
        }
        if (this.options.filter == "simple") {
            var filter = document.createElement("div");
            filter.setAttribute("data-bc-filter-container", "");
            gridHeaderContainer.appendChild(filter);
            var label = document.createElement("label");
            label.setAttribute("data-sys-text-colorful", "");
            label.appendChild(document.createTextNode(this.options.culture.labels.search));
            var input_2 = document.createElement("input");
            input_2.setAttribute("type", "text");
            input_2.setAttribute("data-sys-input-text", "");
            if (this.options.culture.labels.searchPlaceholder != "") {
                input_2.setAttribute("placeholder", this.options.culture.labels.searchPlaceholder);
            }
            label.appendChild(input_2);
            input_2.addEventListener("keyup", function (event) {
                return _this.handleInput(input_2, event);
            });
            filter.appendChild(label);
        }
        this._container.appendChild(gridHeaderContainer);
        if (this.options.refresh) {
            var div = document.createElement("div");
            div.setAttribute("data-bc-refresh-container", "");
            this._container.appendChild(div);
            var btn = document.createElement("span");
            btn.innerHTML = this.options.culture.labels.refresh;
            btn.addEventListener("click", function (e) {
                e.preventDefault();
                _this.tryLoadData();
            });
            div.appendChild(btn);
        }
        this._container.appendChild(this._tableContainer);
        if (this.options.paging) {
            var gridHeaderContainer_2 = this._container.querySelector("[data-bc-grid-header-container]");
            if (!gridHeaderContainer_2) {
                gridHeaderContainer_2 = document.createElement("div");
                gridHeaderContainer_2.setAttribute("data-bc-grid-header-container", "");
                gridHeaderContainer_2.setAttribute("data-sys-grid-border-color", "");
                this._container.insertBefore(gridHeaderContainer_2, this._tableContainer);
            }
            var pageSizeContainer = document.createElement("div");
            pageSizeContainer.setAttribute("data-bc-pagesize-container", "");
            gridHeaderContainer_2.appendChild(pageSizeContainer);
            if (((_a = this.options.export) === null || _a === void 0 ? void 0 : _a.length) > 0) {
                var exportContainer_2 = document.createElement("div");
                exportContainer_2.setAttribute("data-bc-export-container", "");
                gridHeaderContainer_2.appendChild(exportContainer_2);
                this.options.export.forEach(function (exp) {
                    var exportItemContainer = document.createElement("div");
                    exportItemContainer.setAttribute("data-bc-export-item", "");
                    if (exp.type == "excel") {
                        exportItemContainer.setAttribute("data-bc-export-item-excel", "");
                        if (exp.tooltip) {
                            exportItemContainer.setAttribute("data-sys-tooltip", "");
                            exportItemContainer.setAttribute("data-bc-export-tooltip", exp.tooltip);
                        }
                        exportItemContainer.innerHTML = "<svg width=\"35\" height=\"35\" viewBox=\"0 0 35 35\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"0.5\" y=\"0.5\" width=\"34\" height=\"34\" rx=\"4.5\" stroke=\"#0D783C\"/><g style=\"mix-blend-mode:multiply\" opacity=\"0.2\"><g style=\"mix-blend-mode:multiply\" opacity=\"0.2\"><path d=\"M27.2026 7.99805H13.1519C12.6678 7.99805 12.2754 8.39049 12.2754 8.87459V25.8536C12.2754 26.3377 12.6678 26.7301 13.1519 26.7301H27.2026C27.6867 26.7301 28.0792 26.3377 28.0792 25.8536V8.87459C28.0792 8.39049 27.6867 7.99805 27.2026 7.99805Z\" fill=\"white\"/></g></g><g style=\"mix-blend-mode:multiply\" opacity=\"0.12\"><g style=\"mix-blend-mode:multiply\" opacity=\"0.12\"><path d=\"M27.2007 7.99707H13.15C12.6659 7.99707 12.2734 8.38951 12.2734 8.87361V25.8526C12.2734 26.3367 12.6659 26.7291 13.15 26.7291H27.2007C27.6848 26.7291 28.0772 26.3367 28.0772 25.8526V8.87361C28.0772 8.38951 27.6848 7.99707 27.2007 7.99707Z\" fill=\"white\"/></g></g><path d=\"M20.4649 7.99805H13.1474C13.0326 7.99805 12.9189 8.02076 12.813 8.06489C12.707 8.10902 12.6108 8.17369 12.5299 8.25517C12.449 8.33665 12.3851 8.43333 12.3417 8.53964C12.2984 8.64596 12.2765 8.75979 12.2774 8.87459V12.6794H20.4649V7.99805Z\" fill=\"#21A366\"/><path d=\"M27.2129 7.99805H20.4668V12.6794H28.07V8.87459C28.0717 8.64495 27.9826 8.42394 27.8221 8.25974C27.6615 8.09554 27.4426 8.00147 27.2129 7.99805Z\" fill=\"#33C481\"/><path d=\"M28.0765 17.3604H20.4668V22.0417H28.0765V17.3604Z\" fill=\"#107C41\"/><path d=\"M20.4649 22.0417V17.3604H12.2774V25.8466C12.2765 25.962 12.2986 26.0763 12.3423 26.1831C12.3861 26.2898 12.4506 26.3868 12.5322 26.4683C12.6137 26.5499 12.7107 26.6144 12.8174 26.6582C12.9242 26.7019 13.0386 26.724 13.1539 26.7231H27.2111C27.3264 26.724 27.4408 26.7019 27.5476 26.6582C27.6543 26.6144 27.7513 26.5499 27.8328 26.4683C27.9144 26.3868 27.9789 26.2898 28.0227 26.1831C28.0664 26.0763 28.0885 25.962 28.0876 25.8466V22.0417H20.4649Z\" fill=\"#185C37\"/><path d=\"M20.4656 12.6787H12.2715V17.3602H20.4656V12.6787Z\" fill=\"#107C41\"/><path d=\"M28.0765 12.6787H20.4668V17.3602H28.0765V12.6787Z\" fill=\"#21A366\"/><g style=\"mix-blend-mode:multiply\" opacity=\"0.48\"><g style=\"mix-blend-mode:multiply\" opacity=\"0.48\"><path d=\"M17.2455 12.0938H8.46053C7.97643 12.0938 7.58398 12.4862 7.58398 12.9703V21.7553C7.58398 22.2394 7.97643 22.6318 8.46053 22.6318H17.2455C17.7296 22.6318 18.122 22.2394 18.122 21.7553V12.9703C18.122 12.4862 17.7296 12.0938 17.2455 12.0938Z\" fill=\"white\"/></g></g><g style=\"mix-blend-mode:multiply\" opacity=\"0.24\"><g style=\"mix-blend-mode:multiply\" opacity=\"0.24\"><path d=\"M17.2474 12.0938H8.46248C7.97838 12.0938 7.58594 12.4862 7.58594 12.9703V21.7553C7.58594 22.2394 7.97838 22.6318 8.46248 22.6318H17.2474C17.7315 22.6318 18.124 22.2394 18.124 21.7553V12.9703C18.124 12.4862 17.7315 12.0938 17.2474 12.0938Z\" fill=\"white\"/></g></g><path d=\"M17.2455 12.0947H8.46053C7.97643 12.0947 7.58398 12.4872 7.58398 12.9713V21.7562C7.58398 22.2403 7.97643 22.6327 8.46053 22.6327H17.2455C17.7296 22.6327 18.122 22.2403 18.122 21.7562V12.9713C18.122 12.4872 17.7296 12.0947 17.2455 12.0947Z\" fill=\"#107C41\"/><path d=\"M10.3301 20.2106L12.1546 17.3602L10.4599 14.5098H11.8234L12.7454 16.3278C12.8298 16.4966 12.8883 16.6265 12.9207 16.7109C12.9792 16.5745 13.0441 16.4382 13.109 16.3083L14.096 14.5098H15.3491L13.622 17.3602L15.401 20.2365H14.1025L13.0311 18.2432C12.9824 18.1582 12.9412 18.0691 12.9078 17.977C12.8767 18.068 12.8353 18.1551 12.7844 18.2367L11.6287 20.2106H10.3301Z\" fill=\"white\"/><g style=\"mix-blend-mode:soft-light\" opacity=\"0.5\"><path style=\"mix-blend-mode:soft-light\" opacity=\"0.5\" d=\"M17.2474 12.0947H8.46248C7.97838 12.0947 7.58594 12.4872 7.58594 12.9713V21.7562C7.58594 22.2403 7.97838 22.6327 8.46248 22.6327H17.2474C17.7315 22.6327 18.124 22.2403 18.124 21.7562V12.9713C18.124 12.4872 17.7315 12.0947 17.2474 12.0947Z\" fill=\"url(#paint0_linear_10847_113542)\"/></g><defs><linearGradient id=\"paint0_linear_10847_113542\" x1=\"9.41694\" y1=\"11.4065\" x2=\"16.2929\" y2=\"23.3145\" gradientUnits=\"userSpaceOnUse\"><stop stop-color=\"white\" stop-opacity=\"0.5\"/><stop offset=\"1\" stop-opacity=\"0.7\"/></linearGradient></defs></svg>";
                        exportItemContainer.addEventListener("click", function (e) {
                            _this.downloadFile(exp);
                        });
                        exportContainer_2.appendChild(exportItemContainer);
                    }
                    else {
                        throw Error("Export type '".concat(exp.type, "' not support in grid"));
                    }
                });
            }
            var gridFooterContainer = document.createElement("div");
            var pagingContainer = document.createElement("div");
            pagingContainer.setAttribute("data-bc-paging-container", "");
            pagingContainer.setAttribute("data-bc-no-selection", "");
            var pageingNumber = document.createElement("div");
            pageingNumber.setAttribute("data-bc-paging-number", "");
            gridFooterContainer.setAttribute("data-bc-grid-footer-container", "");
            gridFooterContainer.setAttribute("data-sys-paging-container", "");
            this._container.appendChild(gridFooterContainer);
            gridFooterContainer.appendChild(pageingNumber);
            gridFooterContainer.appendChild(pagingContainer);
            switch (this.options.process) {
                case "server": {
                    this.processManager = new _paginate_ServerProcess__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A(this, pageSizeContainer, pagingContainer, pageingNumber);
                    break;
                }
                case "client": {
                    this.processManager = new _paginate_ClientPaginate__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A(this, pageSizeContainer, pagingContainer, pageingNumber);
                    break;
                }
                case "mix": {
                    this.processManager = new _paginate_MixedProcess__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .A(this, pageSizeContainer, pagingContainer, pageingNumber);
                    break;
                }
                default: {
                    throw Error("Type '".concat(this.options.process, "' not support in grid"));
                }
            }
            if (typeof this.options.paging == "number") {
                // pageSizeContainer.style.display = "none";
                pageSizeContainer.remove();
                if (gridHeaderContainer_2.innerHTML == "") {
                    gridHeaderContainer_2.remove();
                }
            }
        }
        else {
            this.processManager = new _paginate_NoPaginateProcessManager__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A(this);
            if (gridHeaderContainer.innerHTML == "") {
                gridHeaderContainer.remove();
            }
        }
        if (this._informationContainer) {
            var gridFooterContainer = this._container.querySelector("[data-bc-grid-footer-container]");
            if (!gridFooterContainer) {
                gridFooterContainer = document.createElement("div");
                gridFooterContainer.setAttribute("data-bc-grid-footer-container", "");
                gridFooterContainer.setAttribute("data-sys-paging-container", "");
                this._container.appendChild(gridFooterContainer);
            }
            gridFooterContainer.appendChild(this._informationContainer);
        }
        this.createTable();
    };
    Grid.prototype.addTableRowFilterPart = function () {
        var _this = this;
        if (this.options.filter === "row") {
            var dataSysThContainer_1 = document.querySelectorAll("[data-sys-th-sort-icon-container]");
            var dataSyspopContainer_1 = document.querySelectorAll("[data-sys-th-container]");
            this.columns.forEach(function (columnInfo, i) {
                if (columnInfo.filter) {
                    var tdContainer = dataSysThContainer_1[i];
                    var tdPopContainer = dataSyspopContainer_1[i];
                    var searchIcon = document.createElement("i");
                    searchIcon.setAttribute("open-pop-up-search-form", "");
                    if (tdContainer) {
                        tdContainer.insertAdjacentElement("afterbegin", searchIcon);
                    }
                    var popup_1 = document.createElement("div");
                    popup_1.setAttribute("pop-up-search-form", "");
                    var closeButton = document.createElement("span");
                    closeButton.textContent = "✖";
                    popup_1.appendChild(closeButton);
                    if (tdContainer) {
                        tdPopContainer.appendChild(popup_1);
                    }
                    popup_1.style.display = "none";
                    popup_1.addEventListener("click", function (e) {
                        e.stopPropagation();
                    });
                    searchIcon.addEventListener("click", function (event) {
                        event.stopPropagation();
                        popup_1.style.display = "flex";
                    });
                    closeButton.addEventListener("click", function () {
                        var _a;
                        _this.options.pageNumber = 1;
                        var filterType = ((_a = columnInfo.filterData) === null || _a === void 0 ? void 0 : _a.type) ? columnInfo.filterData.type : "text";
                        var inputs = popup_1.querySelectorAll("input");
                        var selects = popup_1.querySelectorAll("select");
                        selects.forEach(function (select) {
                            select.selectedIndex = 0; // بازنشانی به گزینه پیش‌فرض
                        });
                        inputs.forEach(function (input) {
                            input.value = ""; // پاک کردن مقدار input
                        });
                        popup_1.style.display = "none";
                        if (_this.processManager.filter[columnInfo.name]) {
                            _this.processManager.filter[columnInfo.name] = "";
                        }
                        _this.processManager.applyUserAction();
                    });
                    _this.fillTableRowFilterElement(popup_1, columnInfo);
                }
                else {
                }
            });
        }
    };
    Grid.prototype.fillTableRowFilterElement = function (td, columnInfo) {
        return __awaiter(this, void 0, void 0, function () {
            var el;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.createRowFilterElement(columnInfo)];
                    case 1:
                        el = _a.sent();
                        td.appendChild(el);
                        return [2 /*return*/];
                }
            });
        });
    };
    Grid.prototype.createRowFilterElement = function (columnInfo) {
        var _a, _b, _c, _d, _e;
        return __awaiter(this, void 0, void 0, function () {
            var filterType, el, select_1, fixValues, option, firstItem, div, input_3, ul_1, clickListener_1, input_4;
            var _this = this;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        filterType = ((_a = columnInfo.filterData) === null || _a === void 0 ? void 0 : _a.type) ? columnInfo.filterData.type : "text";
                        if (!(filterType == "select")) return [3 /*break*/, 4];
                        select_1 = document.createElement("select");
                        select_1.setAttribute("data-sys-select-option", "");
                        fixValues = void 0;
                        if (!((_b = columnInfo.filterData) === null || _b === void 0 ? void 0 : _b.fixValues)) return [3 /*break*/, 1];
                        fixValues = (_c = columnInfo.filterData) === null || _c === void 0 ? void 0 : _c.fixValues;
                        return [3 /*break*/, 3];
                    case 1:
                        if (!((_d = columnInfo.filterData) === null || _d === void 0 ? void 0 : _d.link)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.requestJsonAsync("".concat((_e = columnInfo.filterData) === null || _e === void 0 ? void 0 : _e.link))];
                    case 2:
                        fixValues = _f.sent();
                        _f.label = 3;
                    case 3:
                        option = document.createElement("option");
                        option.setAttribute("value", "");
                        firstItem = this.findValueById(fixValues, 0);
                        if (firstItem) {
                            option.textContent = firstItem;
                        }
                        else {
                            option.textContent = this.options.culture.labels.chooseItem;
                        }
                        select_1.appendChild(option);
                        fixValues.forEach(function (fix) {
                            if (fix.id != 0) {
                                var option_1 = document.createElement("option");
                                option_1.setAttribute("value", "".concat(fix.id));
                                option_1.textContent = fix.value;
                                select_1.appendChild(option_1);
                            }
                        });
                        select_1.addEventListener("change", function () {
                            _this.handleRowInput(select_1, filterType, columnInfo);
                        });
                        el = select_1;
                        return [3 /*break*/, 5];
                    case 4:
                        if (filterType == "autocomplete") {
                            div = document.createElement("div");
                            div.setAttribute("data-bc-select-value", "");
                            input_3 = document.createElement("input");
                            input_3.setAttribute("type", "text");
                            input_3.setAttribute("data-sys-input-text", "");
                            input_3.setAttribute("placeholder", columnInfo.title);
                            ul_1 = document.createElement("ul");
                            ul_1.setAttribute("data-bc-result", "");
                            ul_1.setAttribute("data-sys-search-result", "");
                            input_3.addEventListener("keyup", function (e) {
                                var _a;
                                _this.onKeyUpAsync(e, ul_1, (_a = columnInfo.filterData) === null || _a === void 0 ? void 0 : _a.link, columnInfo);
                            });
                            input_3.addEventListener("focus", function (e) {
                                ul_1.style.display = "block";
                                window.addEventListener("click", clickListener_1);
                            });
                            clickListener_1 = function (e) {
                                if (!(ul_1.contains(e.target) || ul_1 == e.target || e.target == input_3)) {
                                    ul_1.style.display = "none";
                                    window.removeEventListener("click", clickListener_1);
                                }
                            };
                            div.appendChild(input_3);
                            div.appendChild(ul_1);
                            el = div;
                        }
                        else {
                            input_4 = document.createElement("input");
                            input_4.setAttribute("type", "text");
                            input_4.setAttribute("data-sys-input-text", "");
                            input_4.setAttribute("placeholder", columnInfo.title);
                            input_4.addEventListener("paste", function () {
                                _this.handleRowInput(input_4, filterType, columnInfo);
                            });
                            input_4.addEventListener("keyup", function (event) {
                                _this.handleRowInput(input_4, filterType, columnInfo, event);
                            });
                            el = input_4;
                        }
                        _f.label = 5;
                    case 5: return [2 /*return*/, el];
                }
            });
        });
    };
    Grid.prototype.findValueById = function (list, id) {
        var _a;
        return (_a = list.find(function (obj) { return obj.id === id; })) === null || _a === void 0 ? void 0 : _a.value;
    };
    Grid.prototype.onKeyUpAsync = function (e, ul, link, columnInfo) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var input, term, url, result;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        e.preventDefault();
                        input = ul.closest("[data-bc-select-value]").querySelector('input[type="text"]');
                        term = e.target.value;
                        url = Grid.formatString(link, { term: term });
                        ul.innerHTML = "";
                        if (!(term.length > 0)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.requestJsonAsync(url)];
                    case 1:
                        result = _b.sent();
                        if (result.length > 0) {
                            ul.innerHTML = "";
                            result.forEach(function (item) {
                                var li = document.createElement("li");
                                li.setAttribute("data-bc-value", item.id);
                                li.setAttribute("data-sys-hover", "");
                                li.setAttribute("data-sys-text", "");
                                li.innerHTML = item.value;
                                li.addEventListener("click", function (e) {
                                    var _a;
                                    e.preventDefault();
                                    input.value = li.textContent;
                                    input.setAttribute("data-bc-value", li.getAttribute("data-bc-value"));
                                    ul.style.display = "none";
                                    _this.handleRowInput(input, (_a = columnInfo.filterData) === null || _a === void 0 ? void 0 : _a.type, columnInfo);
                                });
                                ul.appendChild(li);
                            });
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        input.setAttribute("data-bc-value", "");
                        this.handleRowInput(input, (_a = columnInfo.filterData) === null || _a === void 0 ? void 0 : _a.type, columnInfo);
                        _b.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Grid.prototype.createTable = function () {
        var _this = this;
        var colgroup = document.createElement("colgroup");
        this._table.prepend(colgroup);
        var tr = document.createElement("tr");
        tr.setAttribute("data-bc-no-selection", "");
        tr.setAttribute("data-bc-column-title", "");
        tr.setAttribute("data-sys-tr", "");
        tr.innerHTML = "";
        this._head.appendChild(tr);
        if (this.options.selectable) {
            var col = document.createElement("col");
            col.setAttribute("width", "5%");
            colgroup.appendChild(col);
            var title = "";
            if (this.options.selectable == "multi" && this.options.selectAll) {
                var checkBox = document.createElement("input");
                checkBox.type = "checkbox";
                title = checkBox.outerHTML;
            }
            var columnInfo = {
                title: title,
                selectable: this.options.selectAll === true ? true : false,
                source: null,
                name: null,
                type: _enum__WEBPACK_IMPORTED_MODULE_6__/* .ColumnType */ .$.select,
            };
            tr.appendChild(this.createColumn(columnInfo));
        }
        if (this.options.rowNumber) {
            var col = document.createElement("col");
            col.setAttribute("width", "5%");
            colgroup.appendChild(col);
            var columnInfo = {
                title: this.options.rowNumber,
                source: null,
                name: null,
                type: _enum__WEBPACK_IMPORTED_MODULE_6__/* .ColumnType */ .$.sort,
            };
            tr.appendChild(this.createColumn(columnInfo));
        }
        if (this.options.columns) {
            Object.getOwnPropertyNames(this.options.columns).forEach(function (property, i) {
                var value = _this.options.columns[property];
                var col = document.createElement("col");
                var columnInfo;
                if (typeof value === "string") {
                    columnInfo = {
                        title: value,
                        source: property,
                        name: property,
                        sort: _this.options.sorting,
                        type: _enum__WEBPACK_IMPORTED_MODULE_6__/* .ColumnType */ .$.data,
                        filter: true,
                    };
                }
                else {
                    columnInfo = __assign({
                        title: property,
                        source: property,
                        name: property,
                        sort: _this.options.sorting,
                        type: _enum__WEBPACK_IMPORTED_MODULE_6__/* .ColumnType */ .$.data,
                        filter: true,
                    }, value);
                    if (value.width) {
                        col.setAttribute("width", value.width);
                    }
                }
                colgroup.appendChild(col);
                tr.appendChild(_this.createColumn(columnInfo));
            });
            this.columnsInitialized = true;
            this.addTableRowFilterPart();
        }
    };
    Grid.prototype.createUIWidthCard = function () {
        var _this = this;
        var _a;
        this.cards = [];
        this._table = document.createElement("div");
        this._table.setAttribute("data-bc-table", "");
        // this._head = document.createElement("div");
        // this._table.appendChild(this._head);
        this._body = document.createElement("div");
        this._table.appendChild(this._body);
        this._body.setAttribute("data-bc-card-wrapper", "");
        this._body.setAttribute("data-sys-grid-border-color", "");
        this._tableContainer = document.createElement("div");
        this._tableContainer.setAttribute("data-bc-table-container", "");
        if (typeof this.options.loader === "function") {
            this._loaderContainer = document.createElement("div");
            this._loaderContainer.setAttribute("data-bc-loader-container", "");
            this._tableContainer.appendChild(this._loaderContainer);
        }
        this._tableContainer.appendChild(this._table);
        if (this.options.information) {
            this._informationContainer = document.createElement("div");
            this._informationContainer.setAttribute("data-bc-information-container", "");
            this._informationContainer.setAttribute("data-sys-text-colorful", "");
        }
        var modes = document.createElement("div");
        modes.setAttribute("data-bc-grid-modes", "");
        var gridMode = document.createElement("div");
        var widthCardMode = document.createElement("div");
        gridMode.innerHTML = "<svg width=\"22\" height=\"18\" viewBox=\"0 0 22 18\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n    <path d=\"M0.714844 12.8571H21.2863V10.2857H0.714844V12.8571ZM0.714844 18H21.2863V15.4286H0.714844V18ZM0.714844 7.71429H21.2863V5.14286H0.714844V7.71429ZM0.714844 0V2.57143H21.2863V0H0.714844Z\" />\n    </svg>\n    ";
        widthCardMode.innerHTML = "<svg width=\"18\" height=\"18\" viewBox=\"0 0 18 18\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n    <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M0 0V8H8V0H0ZM6 6H2V2H6V6ZM0 10V18H8V10H0ZM6 16H2V12H6V16ZM10 0V8H18V0H10ZM16 6H12V2H16V6ZM10 10V18H18V10H10ZM16 16H12V12H16V16Z\" />\n    </svg>\n    ";
        var gridHeaderContainer = document.createElement("div");
        gridHeaderContainer.setAttribute("data-bc-grid-header-container", "");
        gridHeaderContainer.setAttribute("data-sys-grid-border-color", "");
        widthCardMode.setAttribute("data-bc-grid-active-mode", "");
        modes.appendChild(gridMode);
        modes.appendChild(widthCardMode);
        if (this.options.modeButtons == true) {
            gridHeaderContainer.appendChild(modes);
        }
        gridMode.addEventListener("click", function (e) {
            _this.options.mode = "grid";
            _this._container.innerHTML = "";
            // this._head.innerHTML = "";
            _this._body.innerHTML = "";
            // this._container.removeAttribute("data-bc-widthcard-mode")
            _this.createUI();
            _this.setSource(_this._rows);
        });
        if (this.options.filter == "simple") {
            var filter = document.createElement("div");
            filter.setAttribute("data-bc-filter-container", "");
            gridHeaderContainer.appendChild(filter);
            var label = document.createElement("label");
            label.setAttribute("data-sys-text-colorful", "");
            label.appendChild(document.createTextNode(this.options.culture.labels.search));
            var input_5 = document.createElement("input");
            input_5.setAttribute("type", "text");
            input_5.setAttribute("data-sys-input-text", "");
            if (this.options.culture.labels.searchPlaceholder != "") {
                input_5.setAttribute("placeholder", this.options.culture.labels.searchPlaceholder);
            }
            label.appendChild(input_5);
            input_5.addEventListener("keyup", function (event) {
                return _this.handleInput(input_5, event);
            });
            filter.appendChild(label);
        }
        this._container.appendChild(gridHeaderContainer);
        if (this.options.refresh) {
            var div = document.createElement("div");
            div.setAttribute("data-bc-refresh-container", "");
            this._container.appendChild(div);
            var btn = document.createElement("span");
            btn.innerHTML = this.options.culture.labels.refresh;
            btn.addEventListener("click", function (e) {
                e.preventDefault();
                _this.tryLoadData();
            });
            div.appendChild(btn);
        }
        this._container.appendChild(this._tableContainer);
        if (this.options.paging) {
            var gridHeaderContainer_3 = this._container.querySelector("[data-bc-grid-header-container]");
            if (!gridHeaderContainer_3) {
                gridHeaderContainer_3 = document.createElement("div");
                gridHeaderContainer_3.setAttribute("data-bc-grid-header-container", "");
                gridHeaderContainer_3.setAttribute("data-sys-grid-border-color", "");
                this._container.insertBefore(gridHeaderContainer_3, this._tableContainer);
            }
            var pageSizeContainer = document.createElement("div");
            pageSizeContainer.setAttribute("data-bc-pagesize-container", "");
            gridHeaderContainer_3.appendChild(pageSizeContainer);
            if (((_a = this.options.export) === null || _a === void 0 ? void 0 : _a.length) > 0) {
                var exportContainer_3 = document.createElement("div");
                exportContainer_3.setAttribute("data-bc-export-container", "");
                gridHeaderContainer_3.appendChild(exportContainer_3);
                this.options.export.forEach(function (exp) {
                    var exportItemContainer = document.createElement("div");
                    exportItemContainer.setAttribute("data-bc-export-item", "");
                    if (exp.type == "excel") {
                        exportItemContainer.setAttribute("data-bc-export-item-excel", "");
                        if (exp.tooltip) {
                            exportItemContainer.setAttribute("data-sys-tooltip", "");
                            exportItemContainer.setAttribute("data-bc-export-tooltip", exp.tooltip);
                        }
                        exportItemContainer.innerHTML = "<svg width=\"35\" height=\"35\" viewBox=\"0 0 35 35\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"0.5\" y=\"0.5\" width=\"34\" height=\"34\" rx=\"4.5\" stroke=\"#0D783C\"/><g style=\"mix-blend-mode:multiply\" opacity=\"0.2\"><g style=\"mix-blend-mode:multiply\" opacity=\"0.2\"><path d=\"M27.2026 7.99805H13.1519C12.6678 7.99805 12.2754 8.39049 12.2754 8.87459V25.8536C12.2754 26.3377 12.6678 26.7301 13.1519 26.7301H27.2026C27.6867 26.7301 28.0792 26.3377 28.0792 25.8536V8.87459C28.0792 8.39049 27.6867 7.99805 27.2026 7.99805Z\" fill=\"white\"/></g></g><g style=\"mix-blend-mode:multiply\" opacity=\"0.12\"><g style=\"mix-blend-mode:multiply\" opacity=\"0.12\"><path d=\"M27.2007 7.99707H13.15C12.6659 7.99707 12.2734 8.38951 12.2734 8.87361V25.8526C12.2734 26.3367 12.6659 26.7291 13.15 26.7291H27.2007C27.6848 26.7291 28.0772 26.3367 28.0772 25.8526V8.87361C28.0772 8.38951 27.6848 7.99707 27.2007 7.99707Z\" fill=\"white\"/></g></g><path d=\"M20.4649 7.99805H13.1474C13.0326 7.99805 12.9189 8.02076 12.813 8.06489C12.707 8.10902 12.6108 8.17369 12.5299 8.25517C12.449 8.33665 12.3851 8.43333 12.3417 8.53964C12.2984 8.64596 12.2765 8.75979 12.2774 8.87459V12.6794H20.4649V7.99805Z\" fill=\"#21A366\"/><path d=\"M27.2129 7.99805H20.4668V12.6794H28.07V8.87459C28.0717 8.64495 27.9826 8.42394 27.8221 8.25974C27.6615 8.09554 27.4426 8.00147 27.2129 7.99805Z\" fill=\"#33C481\"/><path d=\"M28.0765 17.3604H20.4668V22.0417H28.0765V17.3604Z\" fill=\"#107C41\"/><path d=\"M20.4649 22.0417V17.3604H12.2774V25.8466C12.2765 25.962 12.2986 26.0763 12.3423 26.1831C12.3861 26.2898 12.4506 26.3868 12.5322 26.4683C12.6137 26.5499 12.7107 26.6144 12.8174 26.6582C12.9242 26.7019 13.0386 26.724 13.1539 26.7231H27.2111C27.3264 26.724 27.4408 26.7019 27.5476 26.6582C27.6543 26.6144 27.7513 26.5499 27.8328 26.4683C27.9144 26.3868 27.9789 26.2898 28.0227 26.1831C28.0664 26.0763 28.0885 25.962 28.0876 25.8466V22.0417H20.4649Z\" fill=\"#185C37\"/><path d=\"M20.4656 12.6787H12.2715V17.3602H20.4656V12.6787Z\" fill=\"#107C41\"/><path d=\"M28.0765 12.6787H20.4668V17.3602H28.0765V12.6787Z\" fill=\"#21A366\"/><g style=\"mix-blend-mode:multiply\" opacity=\"0.48\"><g style=\"mix-blend-mode:multiply\" opacity=\"0.48\"><path d=\"M17.2455 12.0938H8.46053C7.97643 12.0938 7.58398 12.4862 7.58398 12.9703V21.7553C7.58398 22.2394 7.97643 22.6318 8.46053 22.6318H17.2455C17.7296 22.6318 18.122 22.2394 18.122 21.7553V12.9703C18.122 12.4862 17.7296 12.0938 17.2455 12.0938Z\" fill=\"white\"/></g></g><g style=\"mix-blend-mode:multiply\" opacity=\"0.24\"><g style=\"mix-blend-mode:multiply\" opacity=\"0.24\"><path d=\"M17.2474 12.0938H8.46248C7.97838 12.0938 7.58594 12.4862 7.58594 12.9703V21.7553C7.58594 22.2394 7.97838 22.6318 8.46248 22.6318H17.2474C17.7315 22.6318 18.124 22.2394 18.124 21.7553V12.9703C18.124 12.4862 17.7315 12.0938 17.2474 12.0938Z\" fill=\"white\"/></g></g><path d=\"M17.2455 12.0947H8.46053C7.97643 12.0947 7.58398 12.4872 7.58398 12.9713V21.7562C7.58398 22.2403 7.97643 22.6327 8.46053 22.6327H17.2455C17.7296 22.6327 18.122 22.2403 18.122 21.7562V12.9713C18.122 12.4872 17.7296 12.0947 17.2455 12.0947Z\" fill=\"#107C41\"/><path d=\"M10.3301 20.2106L12.1546 17.3602L10.4599 14.5098H11.8234L12.7454 16.3278C12.8298 16.4966 12.8883 16.6265 12.9207 16.7109C12.9792 16.5745 13.0441 16.4382 13.109 16.3083L14.096 14.5098H15.3491L13.622 17.3602L15.401 20.2365H14.1025L13.0311 18.2432C12.9824 18.1582 12.9412 18.0691 12.9078 17.977C12.8767 18.068 12.8353 18.1551 12.7844 18.2367L11.6287 20.2106H10.3301Z\" fill=\"white\"/><g style=\"mix-blend-mode:soft-light\" opacity=\"0.5\"><path style=\"mix-blend-mode:soft-light\" opacity=\"0.5\" d=\"M17.2474 12.0947H8.46248C7.97838 12.0947 7.58594 12.4872 7.58594 12.9713V21.7562C7.58594 22.2403 7.97838 22.6327 8.46248 22.6327H17.2474C17.7315 22.6327 18.124 22.2403 18.124 21.7562V12.9713C18.124 12.4872 17.7315 12.0947 17.2474 12.0947Z\" fill=\"url(#paint0_linear_10847_113542)\"/></g><defs><linearGradient id=\"paint0_linear_10847_113542\" x1=\"9.41694\" y1=\"11.4065\" x2=\"16.2929\" y2=\"23.3145\" gradientUnits=\"userSpaceOnUse\"><stop stop-color=\"white\" stop-opacity=\"0.5\"/><stop offset=\"1\" stop-opacity=\"0.7\"/></linearGradient></defs></svg>";
                        exportItemContainer.addEventListener("click", function (e) {
                            _this.downloadFile(exp);
                        });
                        exportContainer_3.appendChild(exportItemContainer);
                    }
                    else {
                        throw Error("Export type '".concat(exp.type, "' not support in grid"));
                    }
                });
            }
            var gridFooterContainer = document.createElement("div");
            var pagingContainer = document.createElement("div");
            pagingContainer.setAttribute("data-bc-paging-container", "");
            pagingContainer.setAttribute("data-bc-no-selection", "");
            var pageingNumber = document.createElement("div");
            pageingNumber.setAttribute("data-bc-paging-number", "");
            gridFooterContainer.setAttribute("data-bc-grid-footer-container", "");
            gridFooterContainer.setAttribute("data-sys-paging-container", "");
            this._container.appendChild(gridFooterContainer);
            gridFooterContainer.appendChild(pageingNumber);
            gridFooterContainer.appendChild(pagingContainer);
            // gridFooterContainer.appendChild(pagingContainer);
            switch (this.options.process) {
                case "server": {
                    this.processManager = new _paginate_ServerProcess__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A(this, pageSizeContainer, pagingContainer, pageingNumber);
                    break;
                }
                case "client": {
                    this.processManager = new _paginate_ClientPaginate__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A(this, pageSizeContainer, pagingContainer, pageingNumber);
                    break;
                }
                case "mix": {
                    this.processManager = new _paginate_MixedProcess__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .A(this, pageSizeContainer, pagingContainer, pageingNumber);
                    break;
                }
                default: {
                    throw Error("Type '".concat(this.options.process, "' not support in grid"));
                }
            }
            if (typeof this.options.paging == "number") {
                // pageSizeContainer.style.display = "none";
                pageSizeContainer.remove();
                if (gridHeaderContainer_3.innerHTML == "") {
                    gridHeaderContainer_3.remove();
                }
            }
        }
        else {
            this.processManager = new _paginate_NoPaginateProcessManager__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A(this);
            if (gridHeaderContainer.innerHTML == "") {
                gridHeaderContainer.remove();
            }
        }
        if (this._informationContainer) {
            var gridFooterContainer = this._container.querySelector("[data-bc-grid-footer-container]");
            if (!gridFooterContainer) {
                gridFooterContainer = document.createElement("div");
                gridFooterContainer.setAttribute("data-bc-grid-footer-container", "");
                gridFooterContainer.setAttribute("data-sys-paging-container", "");
                this._container.appendChild(gridFooterContainer);
            }
            gridFooterContainer.appendChild(this._informationContainer);
        }
        this.createWrapper();
    };
    Grid.prototype.createWrapper = function () {
        var _this = this;
        // this._head.innerHTML = "";
        // const colgroup = document.createElement("div");
        // this._table.prepend(colgroup);
        // const tr = document.createElement("div");
        // tr.setAttribute("data-bc-no-selection", "");
        // tr.setAttribute("data-bc-column-title", "");
        // this._head.appendChild(tr);
        if (this.options.columns) {
            Object.getOwnPropertyNames(this.options.widthCard).forEach(function (property) {
                var value = _this.options.widthCard[property];
                // const col = document.createElement("col");
                var columnInfo;
                if (typeof value === "string") {
                    columnInfo = {
                        title: value,
                        source: property,
                        name: property,
                        sort: _this.options.sorting,
                        type: _enum__WEBPACK_IMPORTED_MODULE_6__/* .ColumnType */ .$.data,
                        filter: true,
                    };
                }
                else {
                    columnInfo = __assign({
                        title: property,
                        source: property,
                        name: property,
                        sort: _this.options.sorting,
                        type: _enum__WEBPACK_IMPORTED_MODULE_6__/* .ColumnType */ .$.data,
                        filter: true,
                    }, value);
                    // if (value.width) {
                    //   col.setAttribute("width", value.width);
                    // }
                }
                // colgroup.appendChild(col);
                // tr.appendChild(this.createItems(columnInfo));
                _this.createItems(columnInfo);
            });
            this.columnsInitialized = true;
            // this.addWidthCArdFilterPart();
        }
    };
    Grid.prototype.addWidthCArdFilterPart = function () {
        var _this = this;
        if (this.options.filter === "row") {
            var tr_1 = document.createElement("div");
            tr_1.setAttribute("data-bc-no-selection", "");
            tr_1.setAttribute("data-bc-filter", "");
            this._head.appendChild(tr_1);
            this.columns.forEach(function (columnInfo) {
                if (columnInfo.filter) {
                    var td = document.createElement("div");
                    var input_6 = document.createElement("input");
                    input_6.setAttribute("type", "text");
                    input_6.setAttribute("data-sys-input-text", "");
                    input_6.setAttribute("placeholder", columnInfo.title);
                    input_6.addEventListener("paste", function () {
                        var _a;
                        _this.handleRowInput(input_6, (_a = columnInfo.filterData) === null || _a === void 0 ? void 0 : _a.type, columnInfo);
                    });
                    input_6.addEventListener("keyup", function (event) {
                        var _a;
                        _this.handleRowInput(input_6, (_a = columnInfo.filterData) === null || _a === void 0 ? void 0 : _a.type, columnInfo, event);
                    });
                    td.appendChild(input_6);
                    tr_1.appendChild(td);
                }
                else {
                    tr_1.appendChild(document.createElement("td"));
                }
            });
        }
    };
    Grid.prototype.createColumn = function (columnInfo) {
        var _this = this;
        var _a;
        var td = document.createElement("td");
        td.setAttribute("data-sys-th", "");
        td.setAttribute("data-bc-sorting", "");
        // اضافه کردن کلاس CSS از ویژگی headerCssClass
        if (columnInfo.headerCssClass) {
            if (Array.isArray(columnInfo.headerCssClass)) {
                columnInfo.headerCssClass.forEach(function (cssClass) { return td.classList.add(cssClass); });
            }
            else {
                td.classList.add(columnInfo.headerCssClass);
            }
        }
        var tdContainer = document.createElement("div");
        tdContainer.setAttribute("data-sys-th-container", "");
        var colTitle = document.createElement("span");
        colTitle.setAttribute("data-sys-th-col-title", "");
        colTitle.innerHTML = columnInfo.title;
        tdContainer.appendChild(colTitle);
        td.appendChild(tdContainer);
        if (this.options.selectable == "multi" && columnInfo.selectable) {
            td.setAttribute("data-bc-select-all", "");
            var checkbox_1 = td.querySelector('input[type="checkbox"]');
            checkbox_1.addEventListener("change", function (e) {
                e.preventDefault();
                var tdSelects = _this._container
                    .querySelector("[data-bc-table-container] tbody")
                    .querySelectorAll("[data-bc-select]");
                if (checkbox_1.checked) {
                    tdSelects.forEach(function (td) {
                        td.querySelector('input[type="checkbox"]').setAttribute("checked", "");
                        td.querySelector('input[type="checkbox"]').checked = true;
                    });
                }
                else {
                    tdSelects.forEach(function (td) {
                        td.querySelector('input[type="checkbox"]').removeAttribute("checked");
                        td.querySelector('input[type="checkbox"]').checked = false;
                    });
                }
                _this.onSelectionChange();
            });
        }
        if (columnInfo.type === _enum__WEBPACK_IMPORTED_MODULE_6__/* .ColumnType */ .$.data && ((_a = columnInfo.sort) !== null && _a !== void 0 ? _a : true)) {
            var iconsContainer = document.createElement("div");
            iconsContainer.setAttribute("data-sys-th-sort-icon-container", "");
            tdContainer.insertAdjacentElement("afterbegin", iconsContainer);
            var sortIcon_1 = document.createElement("i");
            sortIcon_1.setAttribute("data-sys-th-sort-icon", "");
            iconsContainer.insertAdjacentElement("afterbegin", sortIcon_1);
            sortIcon_1.addEventListener("click", function (_) {
                var _a;
                if (((_a = _this.processManager.sortInfo) === null || _a === void 0 ? void 0 : _a.column) !== columnInfo) {
                    _this._head
                        .querySelectorAll("[data-sys-th-sort-icon]")
                        .forEach(function (element) { return element.setAttribute("data-sys-th-sort-icon", ""); });
                }
                var sortType = sortIcon_1.getAttribute("data-sys-th-sort-icon");
                sortType = sortType === "asc" ? "desc" : "asc";
                _this.processManager.sortInfo = {
                    column: columnInfo,
                    sort: sortType,
                };
                sortIcon_1.setAttribute("data-sys-th-sort-icon", sortType);
                _this.processManager.applyUserAction();
            });
        }
        this.columns.push(columnInfo);
        return td;
    };
    Grid.prototype.createItems = function (columnInfo) {
        var _this = this;
        var _a;
        var td = document.createElement("div");
        if (columnInfo.type === _enum__WEBPACK_IMPORTED_MODULE_6__/* .ColumnType */ .$.data && ((_a = columnInfo.sort) !== null && _a !== void 0 ? _a : true)) {
            td.setAttribute("data-bc-sorting", "");
            td.addEventListener("click", function (_) {
                var _a;
                if (((_a = _this.processManager.sortInfo) === null || _a === void 0 ? void 0 : _a.column) !== columnInfo) {
                    _this._head
                        .querySelectorAll("[data-bc-sorting]")
                        .forEach(function (element) { return element.setAttribute("data-bc-sorting", ""); });
                }
                var sortType = td.getAttribute("data-bc-sorting");
                if (sortType) {
                    sortType = sortType === "asc" ? "desc" : "asc";
                }
                else {
                    sortType = "asc";
                }
                _this.processManager.sortInfo = {
                    column: columnInfo,
                    sort: sortType,
                };
                td.setAttribute("data-bc-sorting", sortType);
            });
            if (this.options.defaultSort) {
                var sortType = null;
                var find = false;
                if (typeof this.options.defaultSort === "string") {
                    if (this.options.defaultSort === columnInfo.source) {
                        find = true;
                    }
                }
                else if (this.options.defaultSort.name === columnInfo.source) {
                    find = true;
                    sortType = this.options.defaultSort.sort;
                }
                if (find) {
                    this.processManager.sortInfo = {
                        column: columnInfo,
                        sort: sortType !== null && sortType !== void 0 ? sortType : "asc",
                    };
                    td.setAttribute("data-bc-sorting", this.processManager.sortInfo.sort);
                }
            }
        }
        this.cards.push(columnInfo);
        return td;
    };
    Grid.prototype.setSource = function (source, offsetOptions) {
        var _this = this;
        var _a;
        if (this.materialTemplate) {
            this.source = null;
            this.materialTemplate.setSource(source);
        }
        if (!this.columnsInitialized) {
            var tr_2 = this._head.querySelector("tr");
            if (source && source.length > 0 && source[0]) {
                Object.getOwnPropertyNames(source[0]).forEach(function (property) {
                    var columnInfo = {
                        title: property,
                        source: property,
                        name: property,
                        sort: _this.options.sorting,
                        type: _enum__WEBPACK_IMPORTED_MODULE_6__/* .ColumnType */ .$.data,
                        filter: true,
                    };
                    tr_2.appendChild(_this.createColumn(columnInfo));
                });
            }
            this.columnsInitialized = true;
            this.addTableRowFilterPart();
        }
        this.hideUIProgress();
        if (this.source) {
            source = [];
            source = this.source;
            this.source = [];
        }
        if (this.options.mode == "grid") {
            this._rows = source.map(function (row, index) { return new _GridRow__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A(_this, row, index); });
        }
        else if (this.options.mode == "widthCard") {
            this._rows = source.map(function (row, index) { return new _Card__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .A(_this, row, index); });
        }
        this.processManager.setSource(this._rows, offsetOptions);
        this.source = source;
        (_a = this.materialTemplate) === null || _a === void 0 ? void 0 : _a.syncSelection(this.getSelectedRows().length);
    };
    Grid.prototype.displayRows = function (rows, from, to, total) {
        var _this = this;
        if (this.materialTemplate) {
            this.materialTemplate.displayRows(rows, from, to, total);
            return;
        }
        this._body.innerHTML = "";
        if ((rows === null || rows === void 0 ? void 0 : rows.length) > 0) {
            rows === null || rows === void 0 ? void 0 : rows.forEach(function (row) { return _this._body.appendChild(row.uiElement); });
            if (this.options.editMode) {
                if (this.deviceId == 1) {
                    var newRowElement_1 = document.createElement("tr");
                    var addedColumns_1 = 0;
                    this.columns.map(function (col) {
                        var td = document.createElement("td");
                        var found = _this.options.editMode.columns.find(function (i) { return i.key === col.source; });
                        if (found) {
                            var input_7 = document.createElement("input");
                            input_7.setAttribute("required", found.type === "1" ? "true" : "false");
                            input_7.setAttribute("key", found.key);
                            input_7.setAttribute("data-bc-grid-input", "");
                            input_7.addEventListener("input", function (e) {
                                if (e.target.value) {
                                    input_7.removeAttribute("data-bc-grid-input-error");
                                }
                            });
                            addedColumns_1++;
                            if (addedColumns_1 == _this.options.editMode.columns.length) {
                                input_7.addEventListener("keydown", function (e) {
                                    var isValid = true;
                                    if (e.keyCode == 9) {
                                        e.preventDefault();
                                        var elements = document.querySelectorAll("[data-bc-grid-input]");
                                        var d_1 = {};
                                        elements === null || elements === void 0 ? void 0 : elements.forEach(function (el) {
                                            var attrs = el.attributes;
                                            var required = attrs.getNamedItem("required").value;
                                            var key = attrs.getNamedItem("key").value;
                                            if (required == "true" && !el.value) {
                                                isValid = false;
                                                el.setAttribute("data-bc-grid-input-error", "");
                                            }
                                            d_1[key] = el.value;
                                        });
                                        if (isValid) {
                                            _this.columns.map(function (c) {
                                                if (!Object.keys(d_1).includes(c.title)) {
                                                    d_1[c.title] = "";
                                                }
                                            });
                                            //@ts-ignore
                                            $bc.setSource(_this.options.editMode.newRowsSourceId, {
                                                run: true,
                                                body: JSON.stringify(d_1),
                                            });
                                            _this.source.splice(rows[rows.length - 1].order - 1, 0, d_1);
                                            var temp = _this.source;
                                            _this.setSource(temp, { from: from, total: total + 1 });
                                        }
                                    }
                                });
                            }
                            td.appendChild(input_7);
                        }
                        newRowElement_1.appendChild(td);
                    });
                    this._body.appendChild(newRowElement_1);
                }
                if (this.deviceId == 2) {
                    var container_1 = document.createElement("div");
                    container_1.setAttribute("data-bc-inputs-container", "");
                    var addedColumns_2 = 0;
                    this.options.editMode.columns.map(function (i) {
                        addedColumns_2++;
                        var inputRow = document.createElement("div");
                        inputRow.setAttribute("data-bc-input-row", "");
                        var title = document.createElement("div");
                        title.setAttribute("data-bc-input-title", "");
                        title.innerText = i.key;
                        var input = document.createElement("input");
                        input.setAttribute("required", i.type === "1" ? "true" : "false");
                        input.setAttribute("key", i.key);
                        input.setAttribute("data-bc-grid-input", "");
                        input.addEventListener("input", function (e) {
                            if (e.target.value) {
                                input.removeAttribute("data-bc-grid-input-error");
                            }
                        });
                        if (_this.options.editMode.columns.length === addedColumns_2) {
                            input.addEventListener("keydown", function (e) {
                                var isValid = true;
                                if (e.keyCode == 9) {
                                    e.preventDefault();
                                    var elements = document.querySelectorAll("[data-bc-grid-input]");
                                    var d_2 = {};
                                    elements === null || elements === void 0 ? void 0 : elements.forEach(function (el) {
                                        var attrs = el.attributes;
                                        var required = attrs.getNamedItem("required").value;
                                        var key = attrs.getNamedItem("key").value;
                                        if (required == "true" && !el.value) {
                                            isValid = false;
                                            el.setAttribute("data-bc-grid-input-error", "");
                                        }
                                        d_2[key] = el.value;
                                    });
                                    if (isValid) {
                                        _this.columns.map(function (c) {
                                            if (!Object.keys(d_2).includes(c.name)) {
                                                d_2[c.name] = "";
                                            }
                                        });
                                        //@ts-ignore
                                        $bc.setSource(_this.options.editMode.newRowsSourceId, {
                                            run: true,
                                            body: JSON.stringify(d_2),
                                        });
                                        _this.source.splice(rows[rows.length - 1].order - 1, 0, d_2);
                                        var temp = _this.source;
                                        _this.setSource(temp, { from: from, total: total + 1 });
                                    }
                                }
                            });
                        }
                        inputRow.appendChild(input);
                        inputRow.appendChild(title);
                        container_1.appendChild(inputRow);
                    });
                    this._body.appendChild(container_1);
                }
            }
            if (this.deviceId == 2) {
                var clr = document.createElement("div");
                clr.setAttribute("class", "clr");
                this._body.appendChild(clr);
            }
        }
        else if (typeof this.options.noData !== "undefined" &&
            this.options.noData) {
            var tr = void 0;
            var td = void 0;
            if (this.options.mode == "grid") {
                tr = document.createElement("tr");
                tr.setAttribute("data-sys-tr", "");
                tr.setAttribute("data-sys-tr-no-data", "");
                td = document.createElement("td");
                td.setAttribute("data-sys-td", "");
                tr.appendChild(td);
                td.colSpan = this.columns.length;
            }
            else if (this.options.mode == "widthCard") {
                tr = document.createElement("div");
                td = document.createElement("div");
                tr.appendChild(td);
            }
            td.setAttribute("data-bc-no-data", "");
            switch (typeof this.options.noData) {
                case "boolean": {
                    td.appendChild(document.createTextNode(this.options.culture.labels.noData));
                    break;
                }
                case "string": {
                    td.appendChild(document.createTextNode(this.options.noData));
                    break;
                }
                case "function": {
                    this.options.noData(td);
                    break;
                }
            }
            this._body.appendChild(tr);
        }
        if (this.options.information) {
            this._informationContainer.innerText = this._informationFormatter(from, to, total);
        }
    };
    Grid.prototype.showUIProgress = function () {
        if (this.materialTemplate)
            return;
        if (this.options.loader) {
            switch (typeof this.options.loader) {
                case "function": {
                    this._loaderContainer.innerHTML = this.options.loader();
                    break;
                }
                case "string": {
                    this._tableContainer.style["background-image"] = "url(\"".concat(this.options.loader, "\")");
                }
                case "boolean": {
                    this._tableContainer.setAttribute("data-process", "");
                    break;
                }
            }
            this._table.style["opacity"] = ".4";
        }
    };
    Grid.prototype.hideUIProgress = function () {
        if (this.materialTemplate)
            return;
        if (this.options.loader) {
            switch (typeof this.options.loader) {
                case "function": {
                    this._loaderContainer.innerHTML = "";
                    break;
                }
                case "string": {
                    this._tableContainer.style["background-image"] = "";
                }
                case "boolean": {
                    this._tableContainer.removeAttribute("data-process");
                    break;
                }
            }
            this._table.style["opacity"] = "1";
        }
    };
    Grid.prototype.tryLoadData = function () {
        var _a, _b;
        var data = {
            pageNumber: this.processManager.pageNumber + 1,
            filter: this.processManager.filter,
            pageSize: this.processManager.pageSize,
            sortInfo: {
                col: (_a = this.processManager.sortInfo) === null || _a === void 0 ? void 0 : _a.column.name,
                type: (_b = this.processManager.sortInfo) === null || _b === void 0 ? void 0 : _b.sort,
            },
        };
        if (typeof this.processManager.filter != "string" &&
            Object.keys(this.processManager.filter).length == 0) {
            delete data.filter;
        }
        this.showUIProgress();
        this._onSignalSourceCallback(__assign(__assign({}, data), { urlencoded: encodeURIComponent(JSON.stringify(data)) }));
    };
    Grid.prototype.onSelectionChange = function () {
        var _a;
        var selectedRows = this._rows
            .filter(function (x) { return x.selected; })
            .map(function (x) { return x.data; });
        this._selectionChangeCallback(selectedRows);
        (_a = this.materialTemplate) === null || _a === void 0 ? void 0 : _a.syncSelection(selectedRows.length);
    };
    Grid.prototype.getSelectedRows = function () {
        return (this._rows || [])
            .filter(function (x) { return x.selected; })
            .map(function (x) { return x.data; });
    };
    Grid.prototype.setSelectedRows = function (selected) {
        if (!this.materialTemplate)
            throw new Error("setSelectedRows is supported only by template4");
        if (this.options.selectable === "single")
            selected = selected.slice(0, 1);
        this._rows.forEach(function (row) {
            if (!row._checkBox)
                row._checkBox = document.createElement("input");
            row._checkBox.checked = selected.includes(row.data);
        });
        this.onSelectionChange();
    };
    Grid.prototype.resetSelectAll = function () {
        var _a;
        if (this.materialTemplate) {
            this.materialTemplate.syncSelection();
            return;
        }
        var selectAllInput = (_a = this._container
            .querySelector("[data-bc-table-container] thead")) === null || _a === void 0 ? void 0 : _a.querySelector('[data-bc-select-all] input[type="checkbox"]');
        if (selectAllInput) {
            selectAllInput.removeAttribute("checked");
            selectAllInput.checked = false;
        }
    };
    Grid.prototype.downloadFile = function (exp) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var init, contentType, request;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        init = {
                            method: (_a = exp.method) !== null && _a !== void 0 ? _a : "GET",
                            // body: exp.data ?? "",
                        };
                        if (exp.method.toUpperCase() == "POST") {
                            init.body = (_b = exp.data) !== null && _b !== void 0 ? _b : "";
                        }
                        contentType = (_c = exp.contentType) !== null && _c !== void 0 ? _c : "application/json; charset=utf-8";
                        if (contentType && contentType.length > 0) {
                            init.headers = new Headers();
                            init.headers.append("Content-Type", contentType);
                            // init.headers.append("Content-disposition", "attachment; filename=tessst.xml");
                        }
                        request = new Request(exp.url, init);
                        return [4 /*yield*/, fetch(request)
                                .then(function (response) { return response.blob(); })
                                .then(function (response) {
                                var _a;
                                var blob = new Blob([response], { type: response.type });
                                var downloadUrl = URL.createObjectURL(blob);
                                var a = document.createElement("a");
                                a.href = downloadUrl;
                                a.download = (_a = exp.fileName) !== null && _a !== void 0 ? _a : "file.xlsx";
                                document.body.appendChild(a);
                                a.click();
                                setTimeout(function () {
                                    a.remove();
                                }, 2000);
                            })];
                    case 1:
                        _d.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Grid.prototype.requestJsonAsync = function (url, method, params) {
        if (method === void 0) { method = "GET"; }
        return __awaiter(this, void 0, void 0, function () {
            var init, form, key, response, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        init = {
                            method: method,
                        };
                        if (params) {
                            form = new FormData();
                            for (key in params) {
                                form.append(key, Reflect.get(params, key));
                            }
                            init.body = form;
                        }
                        return [4 /*yield*/, fetch(url, init)];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    return Grid;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Grid);


/***/ }),

/***/ 60:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  A: () => (/* binding */ grid_GridRow)
});

// EXTERNAL MODULE: ./src/enum.ts
var src_enum = __webpack_require__(503);
// EXTERNAL MODULE: ./src/component/grid/Item.ts
var Item = __webpack_require__(954);
;// ./src/asset/layout-template1.html
const layout_template1_namespaceObject = "<div data-bc-grid-temp1-items=\"items\">\n    <div data-bc-grid-temp1-section=\"#1\" data-position=\"#1\">\n        \n    </div>\n    <div data-bc-grid-temp1-section=\"#2\" data-position=\"#2\">\n        <div data-bc-grid-temp1-section=\"#3\" data-position=\"#3\">\n            <div data-bc-grid-temp1-section=\"#4\" data-position=\"#4\">\n            \n            </div>\n            <div data-bc-grid-temp1-section=\"#5\" data-position=\"#5\">\n            \n            </div>\n        </div>\n        <div data-bc-grid-temp1-section=\"#6\" data-position=\"#6\">\n            <div data-bc-grid-temp1-section=\"#7\" data-position=\"#7\">\n            \n            </div>\n            <div data-bc-grid-temp1-section=\"#8\" data-position=\"#8\">\n                <div data-bc-grid-temp1-section=\"#9\" data-position=\"#9\">\n            \n                </div>\n                <div data-bc-grid-temp1-section=\"#10\" data-position=\"#10\">\n                \n                </div>\n            </div>\n        </div>\n    </div>\n</div>";
;// ./src/asset/layout-template2.html
const layout_template2_namespaceObject = "<div data-bc-grid-temp2-items=\"items\">\n    <div data-bc-grid-temp2-section=\"#1\" data-position=\"#1\">\n        \n    </div>\n    <div data-bc-grid-temp2-section=\"#2\" data-position=\"#2\">\n        <div data-bc-grid-temp2-section=\"#3\" data-position=\"#3\">\n            <div data-bc-grid-temp2-section=\"#4\" data-position=\"#4\">\n            \n            </div>\n            <div data-bc-grid-temp2-section=\"#5\" data-position=\"#5\">\n            \n            </div>\n        </div>\n        <div data-bc-grid-temp2-section=\"#6\" data-position=\"#6\">\n            <div data-bc-grid-temp2-section=\"#7\" data-position=\"#7\">\n            \n            </div>\n        </div>\n    </div>\n</div>";
;// ./src/asset/layout-template3.html
const layout_template3_namespaceObject = "<div data-bc-grid-temp3-items=\"items\">\n    <div data-bc-grid-temp3-section=\"#3\" data-position=\"#3\">\n        <div data-bc-grid-temp3-section=\"#1\" data-position=\"#1\">\n            \n        </div>\n        <div data-bc-grid-temp3-section=\"#2\" data-position=\"#2\">\n            \n        </div>\n    </div>\n</div>";
;// ./src/component/grid/GridRow.ts
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();





var GridRow = /** @class */ (function (_super) {
    __extends(GridRow, _super);
    function GridRow(owner, data, order) {
        return _super.call(this, owner, data, order) || this;
    }
    Object.defineProperty(GridRow.prototype, "uiElement", {
        get: function () {
            var _this = this;
            var _a, _b, _c, _d, _e;
            if (!this._uiElement) {
                if (this._owner.materialTemplate) {
                    this._uiElement = this._owner.materialTemplate.createRow(this);
                    (_b = (_a = this._owner.options).rowMaker) === null || _b === void 0 ? void 0 : _b.call(_a, this.data, this._uiElement);
                    return this._uiElement;
                }
                if (this._owner.deviceId == 1) {
                    this._uiElement = document.createElement("tr");
                    this._uiElement.setAttribute("data-sys-tr", "");
                    this._owner.columns.forEach(function (column) {
                        var _a;
                        var _b;
                        var td = document.createElement("td");
                        td.setAttribute("data-sys-td", "");
                        if (column.cssClass) {
                            Array.isArray(column.cssClass)
                                ? (_a = td.classList).add.apply(_a, column.cssClass) : td.classList.add(column.cssClass);
                        }
                        switch (column.type) {
                            case src_enum/* ColumnType */.$.data: {
                                td.setAttribute("data-bc-data", "");
                                var tmpValue = Reflect.get(_this._dataProxy, column.name);
                                if (column.cellMaker) {
                                    td.innerHTML = (_b = column.cellMaker(_this.data, tmpValue, td)) !== null && _b !== void 0 ? _b : tmpValue;
                                }
                                else {
                                    td.appendChild(document.createTextNode(tmpValue === null || tmpValue === void 0 ? void 0 : tmpValue.toString()));
                                }
                                break;
                            }
                            case src_enum/* ColumnType */.$.sort: {
                                td.setAttribute("data-bc-order", "");
                                td.appendChild(document.createTextNode(_this.order.toString()));
                                _this._orderChanged = false;
                                break;
                            }
                            case src_enum/* ColumnType */.$.select: {
                                td.setAttribute("data-bc-select", "");
                                _this._checkBox = document.createElement("input");
                                _this._checkBox.type =
                                    _this._owner.options.selectable === "single" ? "radio" : "checkbox";
                                _this._checkBox.name = _this._owner.id;
                                _this._checkBox.addEventListener("change", function (e) {
                                    e.preventDefault();
                                    if (_this._checkBox.checked) {
                                        _this._checkBox.setAttribute("checked", "");
                                        _this._checkBox.checked = true;
                                    }
                                    else {
                                        _this._checkBox.removeAttribute("checked");
                                        _this._checkBox.checked = false;
                                    }
                                    _this._owner.onSelectionChange();
                                });
                                td.appendChild(_this._checkBox);
                                _this._orderChanged = false;
                                break;
                            }
                            default:
                                break;
                        }
                        _this._uiElement.appendChild(td);
                    });
                    if (this._owner.options.rowMaker) {
                        this._owner.options.rowMaker(this.data, this._uiElement);
                    }
                }
                else if (this._owner.deviceId == 2) {
                    var copyTemplateLayout = void 0;
                    switch ((_c = this._owner.options.culture) === null || _c === void 0 ? void 0 : _c.template) {
                        case "template1": {
                            copyTemplateLayout = layout_template1_namespaceObject;
                            break;
                        }
                        case "template2": {
                            copyTemplateLayout = layout_template2_namespaceObject;
                            break;
                        }
                        case "template3": {
                            copyTemplateLayout = layout_template3_namespaceObject;
                            break;
                        }
                        default:
                            break;
                    }
                    var itemContainer_1 = $bc.util.toHTMLElement(copyTemplateLayout);
                    var main_itemContainer_1 = document.createElement('div');
                    main_itemContainer_1.setAttribute("data-bc-grid-temp3-items", "items");
                    if (((_d = this._owner.options.culture) === null || _d === void 0 ? void 0 : _d.template) === "template3" && this._owner.options.selectable) {
                        var checkBoxWrapper = document.createElement("div");
                        this._checkBox = document.createElement("input");
                        checkBoxWrapper.appendChild(this._checkBox);
                        checkBoxWrapper.setAttribute("data-bc-grid-selectable", "");
                        this._checkBox.type = this._owner.options.selectable === "single" ? "radio" : "checkbox";
                        this._checkBox.name = this._owner.id;
                        this._checkBox.addEventListener("change", function (e) {
                            e.preventDefault();
                            _this._owner.onSelectionChange();
                        });
                        main_itemContainer_1.appendChild(checkBoxWrapper);
                    }
                    this._owner.columns.forEach(function (column) {
                        var _a, _b;
                        var _c, _d, _e, _f, _g, _h;
                        var position = (((_e = (_d = (_c = _this._owner) === null || _c === void 0 ? void 0 : _c.options) === null || _d === void 0 ? void 0 : _d.culture) === null || _e === void 0 ? void 0 : _e.template) === "template3") ? "#2" : column.position;
                        if (position) {
                            if (((_f = _this._owner.options.culture) === null || _f === void 0 ? void 0 : _f.template) === "template3") {
                                var section3 = itemContainer_1.querySelector('[data-position="#3"]').cloneNode(true);
                                var section1 = section3.querySelector('[data-position="#1"]');
                                var section2 = section3.querySelector('[data-position="#2"]');
                                if (section1) {
                                    if (column.cssClass) {
                                        Array.isArray(column.cssClass)
                                            ? (_a = main_itemContainer_1.classList).add.apply(_a, column.cssClass) : main_itemContainer_1.classList.add(column.cssClass);
                                    }
                                    switch (column.type) {
                                        case src_enum/* ColumnType */.$.data: {
                                            if (section1 && section2) {
                                                section1.innerHTML = column.title;
                                                var tmpValue = Reflect.get(_this._dataProxy, column.name);
                                                if (column.cellMaker) {
                                                    section2.innerHTML = (_g = column.cellMaker(_this.data, tmpValue, section2)) !== null && _g !== void 0 ? _g : tmpValue;
                                                }
                                                else {
                                                    section2.appendChild(document.createTextNode(tmpValue === null || tmpValue === void 0 ? void 0 : tmpValue.toString()));
                                                }
                                            }
                                            break;
                                        }
                                        case src_enum/* ColumnType */.$.sort: {
                                            main_itemContainer_1.setAttribute("data-bc-order", "");
                                            main_itemContainer_1.appendChild(document.createTextNode(_this.order.toString()));
                                            _this._orderChanged = false;
                                            break;
                                        }
                                        case src_enum/* ColumnType */.$.select: {
                                            main_itemContainer_1.setAttribute("data-bc-select", "");
                                            _this._checkBox = document.createElement("input");
                                            _this._checkBox.type = _this._owner.options.selectable === "single" ? "radio" : "checkbox";
                                            _this._checkBox.name = _this._owner.id;
                                            _this._checkBox.addEventListener("change", function (e) {
                                                e.preventDefault();
                                                _this._owner.onSelectionChange();
                                            });
                                            main_itemContainer_1.appendChild(_this._checkBox);
                                            _this._orderChanged = false;
                                            break;
                                        }
                                        default:
                                            break;
                                    }
                                    main_itemContainer_1.appendChild(section3);
                                    // main_itemContainer.appendChild(section2)
                                }
                            }
                            else {
                                var container = itemContainer_1.querySelector("[data-position=\"".concat(column.position, "\"]"));
                                if (container) {
                                    container.innerHTML = "";
                                    if (column.cssClass) {
                                        Array.isArray(column.cssClass)
                                            ? (_b = container.classList).add.apply(_b, column.cssClass) : container.classList.add(column.cssClass);
                                    }
                                    switch (column.type) {
                                        case src_enum/* ColumnType */.$.data: {
                                            container.setAttribute("data-bc-data", "");
                                            var tmpValue = Reflect.get(_this._dataProxy, column.name);
                                            if (column.cellMaker) {
                                                container.innerHTML = (_h = column.cellMaker(_this.data, tmpValue, container)) !== null && _h !== void 0 ? _h : tmpValue;
                                            }
                                            else {
                                                container.appendChild(document.createTextNode(tmpValue === null || tmpValue === void 0 ? void 0 : tmpValue.toString()));
                                            }
                                            break;
                                        }
                                        case src_enum/* ColumnType */.$.sort: {
                                            container.setAttribute("data-bc-order", "");
                                            container.appendChild(document.createTextNode(_this.order.toString()));
                                            _this._orderChanged = false;
                                            break;
                                        }
                                        case src_enum/* ColumnType */.$.select: {
                                            container.setAttribute("data-bc-select", "");
                                            _this._checkBox = document.createElement("input");
                                            _this._checkBox.type =
                                                _this._owner.options.selectable === "single" ? "radio" : "checkbox";
                                            _this._checkBox.name = _this._owner.id;
                                            _this._checkBox.addEventListener("change", function (e) {
                                                e.preventDefault();
                                                _this._owner.onSelectionChange();
                                            });
                                            container.appendChild(_this._checkBox);
                                            _this._orderChanged = false;
                                            break;
                                        }
                                        default:
                                            break;
                                    }
                                }
                            }
                        }
                        // }
                    });
                    if (((_e = this._owner.options.culture) === null || _e === void 0 ? void 0 : _e.template) === "template3") {
                        var divElementclr = document.createElement('div');
                        divElementclr.className = 'clr';
                        main_itemContainer_1.appendChild(divElementclr);
                        this._uiElement = main_itemContainer_1;
                    }
                    else {
                        this._uiElement = itemContainer_1;
                    }
                    if (this._owner.options.rowMaker) {
                        this._owner.options.rowMaker(this.data, this._uiElement);
                    }
                }
            }
            else if (this._orderChanged) {
                var cel = this._uiElement.querySelector("[data-bc-order]");
                if (cel) {
                    cel.textContent = this.order.toString();
                }
                this._orderChanged = false;
            }
            return this._uiElement;
        },
        enumerable: false,
        configurable: true
    });
    GridRow.prototype.setOrder = function (order) {
        this.order = order + 1;
        this._orderChanged = true;
    };
    GridRow.prototype.acceptableByRowFilter = function (filter, type) {
        var _a, _b, _c, _d, _e, _f;
        var retVal = true;
        var _loop_1 = function (key) {
            var element = Reflect.get(filter, key);
            var value = this_1._owner.materialTemplate
                ? String((_a = Reflect.get(this_1._dataProxy, key)) !== null && _a !== void 0 ? _a : "").toLowerCase()
                : (_b = Reflect.get(this_1._dataProxy, key)) === null || _b === void 0 ? void 0 : _b.toString().toLowerCase();
            var filterType = this_1._owner.materialTemplate && (this_1._owner.options.filter === "advanced" || ((_c = this_1._owner.options.presentation) === null || _c === void 0 ? void 0 : _c.view) === "mobile" || ((_d = this_1._owner.options.presentation) === null || _d === void 0 ? void 0 : _d.filterMode) !== "header")
                ? ((_f = (_e = this_1._owner.columns.find(function (column) { return column.name === key; })) === null || _e === void 0 ? void 0 : _e.filterData) === null || _f === void 0 ? void 0 : _f.type) || "text" : type;
            if (filterType == "select" || filterType == "autocomplete") {
                retVal = retVal && value == element;
            }
            else {
                retVal = retVal && value.indexOf(element) >= 0;
            }
            if (!retVal) {
                return "break";
            }
        };
        var this_1 = this;
        for (var _i = 0, _g = Reflect.ownKeys(filter); _i < _g.length; _i++) {
            var key = _g[_i];
            var state_1 = _loop_1(key);
            if (state_1 === "break")
                break;
        }
        return retVal;
    };
    GridRow.prototype.acceptableBySimpleFilter = function (filter) {
        var _this = this;
        var colInfo = this._owner.columns
            .filter(function (col) { return col.type === src_enum/* ColumnType */.$.data; })
            .find(function (col) {
            var _a;
            var retVal = false;
            if (col.filter || _this._owner.materialTemplate) {
                var value = (_a = Reflect.get(_this._dataProxy, col.name)) === null || _a === void 0 ? void 0 : _a.toString().toLowerCase();
                retVal = value && value.indexOf(filter) >= 0;
            }
            return retVal;
        });
        return colInfo ? true : false;
    };
    GridRow.compare = function (first, second, sortInfo) {
        if (first._owner.materialTemplate && sortInfo.column.compare) {
            return sortInfo.column.compare(first._dataProxy[sortInfo.column.name], second._dataProxy[sortInfo.column.name]) * (sortInfo.sort === "asc" ? 1 : -1);
        }
        var valFirst = Reflect.get(sortInfo.column.title ? first._dataProxy : first, sortInfo.column.name);
        var valSecond = Reflect.get(sortInfo.column.title ? second._dataProxy : second, sortInfo.column.name);
        if (typeof valFirst === "string") {
            valFirst = valFirst.toLowerCase();
        }
        if (typeof valSecond === "string") {
            valSecond = valSecond.toLowerCase();
        }
        return valFirst > valSecond
            ? sortInfo.sort === "asc"
                ? 1
                : -1
            : valFirst < valSecond
                ? sortInfo.sort === "asc"
                    ? -1
                    : 1
                : 0;
    };
    Object.defineProperty(GridRow.prototype, "selected", {
        get: function () {
            var _a, _b;
            return (_b = (_a = this._checkBox) === null || _a === void 0 ? void 0 : _a.checked) !== null && _b !== void 0 ? _b : false;
        },
        enumerable: false,
        configurable: true
    });
    return GridRow;
}(Item/* default */.A));
/* harmony default export */ const grid_GridRow = (GridRow);


/***/ }),

/***/ 954:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _enum__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(503);

var GridRow = /** @class */ (function () {
    function GridRow(owner, data, order) {
        var _this = this;
        this._uiElement = null;
        this._orderChanged = true;
        this.data = data;
        this._dataProxy = {};
        this._owner = owner;
        this.order = order + 1;
        this._owner.columns
            .filter(function (x) { return x.type == _enum__WEBPACK_IMPORTED_MODULE_0__/* .ColumnType */ .$.data; })
            .forEach(function (column) {
            return Reflect.set(_this._dataProxy, column.name, typeof column.source === "string"
                ? Reflect.get(_this.data, column.source)
                : column.source(_this.data));
        });
        this._owner.cards
            .filter(function (x) { return x.type == _enum__WEBPACK_IMPORTED_MODULE_0__/* .ColumnType */ .$.data; })
            .forEach(function (column) {
            return Reflect.set(_this._dataProxy, column.title, typeof column.source === "string"
                ? Reflect.get(_this.data, column.title)
                : column.source(_this.data));
        });
    }
    GridRow.prototype.setOrder = function (order) {
        this.order = order + 1;
        this._orderChanged = true;
    };
    GridRow.prototype.acceptableByRowFilter = function (filter, type) {
        var _a;
        var retVal = true;
        for (var _i = 0, _b = Reflect.ownKeys(filter); _i < _b.length; _i++) {
            var key = _b[_i];
            var element = Reflect.get(filter, key);
            var value = (_a = Reflect.get(this._dataProxy, key)) === null || _a === void 0 ? void 0 : _a.toString().toLowerCase();
            if (type && (type == "select" || type == "autocomplete")) {
                retVal = retVal && value == element;
            }
            else {
                retVal = retVal && value.indexOf(element) >= 0;
            }
            if (!retVal) {
                break;
            }
        }
        return retVal;
    };
    GridRow.prototype.acceptableBySimpleFilter = function (filter) {
        var _this = this;
        var colInfo = this._owner.columns
            .filter(function (col) { return col.type === _enum__WEBPACK_IMPORTED_MODULE_0__/* .ColumnType */ .$.data; })
            .find(function (col) {
            var _a;
            var retVal = false;
            if (col.filter) {
                var value = (_a = Reflect.get(_this._dataProxy, col.name)) === null || _a === void 0 ? void 0 : _a.toString().toLowerCase();
                retVal = value && value.indexOf(filter) >= 0;
            }
            return retVal;
        });
        return colInfo ? true : false;
    };
    GridRow.compare = function (first, second, sortInfo) {
        var valFirst = Reflect.get(sortInfo.column.title ? first._dataProxy : first, sortInfo.column.name);
        var valSecond = Reflect.get(sortInfo.column.title ? second._dataProxy : second, sortInfo.column.name);
        if (typeof valFirst === "string") {
            valFirst = valFirst.toLowerCase();
        }
        if (typeof valSecond === "string") {
            valSecond = valSecond.toLowerCase();
        }
        return valFirst > valSecond
            ? sortInfo.sort === "asc"
                ? 1
                : -1
            : valFirst < valSecond
                ? sortInfo.sort === "asc"
                    ? -1
                    : 1
                : 0;
    };
    Object.defineProperty(GridRow.prototype, "selected", {
        get: function () {
            var _a, _b;
            return (_b = (_a = this._checkBox) === null || _a === void 0 ? void 0 : _a.checked) !== null && _b !== void 0 ? _b : false;
        },
        enumerable: false,
        configurable: true
    });
    return GridRow;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GridRow);


/***/ }),

/***/ 315:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  A: () => (/* binding */ grid_MaterialTemplate)
});

// EXTERNAL MODULE: ./src/enum.ts
var src_enum = __webpack_require__(503);
// EXTERNAL MODULE: ./src/component/paginate/ClientPaginate.ts
var ClientPaginate = __webpack_require__(188);
// EXTERNAL MODULE: ./src/component/paginate/ServerProcess.ts
var ServerProcess = __webpack_require__(636);
// EXTERNAL MODULE: ./src/component/paginate/MixedProcess.ts
var MixedProcess = __webpack_require__(414);
// EXTERNAL MODULE: ./src/component/paginate/NoPaginateProcessManager.ts
var NoPaginateProcessManager = __webpack_require__(92);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js
var injectStylesIntoStyleTag = __webpack_require__(72);
var injectStylesIntoStyleTag_default = /*#__PURE__*/__webpack_require__.n(injectStylesIntoStyleTag);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/styleDomAPI.js
var styleDomAPI = __webpack_require__(825);
var styleDomAPI_default = /*#__PURE__*/__webpack_require__.n(styleDomAPI);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/insertBySelector.js
var insertBySelector = __webpack_require__(659);
var insertBySelector_default = /*#__PURE__*/__webpack_require__.n(insertBySelector);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js
var setAttributesWithoutAttributes = __webpack_require__(56);
var setAttributesWithoutAttributes_default = /*#__PURE__*/__webpack_require__.n(setAttributesWithoutAttributes);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/insertStyleElement.js
var insertStyleElement = __webpack_require__(540);
var insertStyleElement_default = /*#__PURE__*/__webpack_require__.n(insertStyleElement);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/styleTagTransform.js
var styleTagTransform = __webpack_require__(113);
var styleTagTransform_default = /*#__PURE__*/__webpack_require__.n(styleTagTransform);
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./src/asset/template4.css
var template4 = __webpack_require__(272);
;// ./src/asset/template4.css

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (styleTagTransform_default());
options.setAttributes = (setAttributesWithoutAttributes_default());

      options.insert = insertBySelector_default().bind(null, "head");
    
options.domAPI = (styleDomAPI_default());
options.insertStyleElement = (insertStyleElement_default());

var update = injectStylesIntoStyleTag_default()(template4/* default */.A, options);




       /* harmony default export */ const asset_template4 = (template4/* default */.A && template4/* default */.A.locals ? template4/* default */.A.locals : undefined);

;// ./src/component/grid/GuideConfig.ts
function isGuideConfig(value) {
    if (!value || typeof value !== "object")
        return false;
    var config = value;
    var text = function (input, max) { return typeof input === "string" && input.trim().length > 0 && input.length <= max; };
    var key = function (input) { return text(input, 120) && /^[a-zA-Z0-9_.-]+$/.test(input); };
    if (config.schemaVersion !== 2 || !Number.isSafeInteger(config.id) || config.id < 1 ||
        !Number.isSafeInteger(config.lid) || config.lid < 1 || !Number.isSafeInteger(config.revision) || config.revision < 1 ||
        !text(config.title, 200) || !Array.isArray(config.steps) || !config.steps.length || config.steps.length > 50)
        return false;
    var ids = new Set();
    return config.steps.every(function (step) {
        if (!step || !key(step.id) || ids.has(step.id) || !key(step.target) || !text(step.title, 200) ||
            !text(step.description, 2000) || (step.optional !== undefined && typeof step.optional !== "boolean"))
            return false;
        ids.add(step.id);
        return true;
    });
}

// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./src/asset/guide.css
var guide = __webpack_require__(930);
;// ./src/asset/guide.css

      
      
      
      
      
      
      
      
      

var guide_options = {};

guide_options.styleTagTransform = (styleTagTransform_default());
guide_options.setAttributes = (setAttributesWithoutAttributes_default());

      guide_options.insert = insertBySelector_default().bind(null, "head");
    
guide_options.domAPI = (styleDomAPI_default());
guide_options.insertStyleElement = (insertStyleElement_default());

var guide_update = injectStylesIntoStyleTag_default()(guide/* default */.A, guide_options);




       /* harmony default export */ const asset_guide = (guide/* default */.A && guide/* default */.A.locals ? guide/* default */.A.locals : undefined);

;// ./src/component/grid/GridGuide.ts


var icons = __webpack_require__(214);
function GridGuide_element(tag, className, text) {
    var node = document.createElement(tag);
    node.className = className;
    if (text !== undefined)
        node.textContent = text;
    return node;
}
var GridGuide = /** @class */ (function () {
    function GridGuide(container, config, targets) {
        var _this = this;
        this.container = container;
        this.config = config;
        this.targets = targets;
        this.dialog = null;
        this.index = 0;
        this.steps = [];
        this.target = null;
        this.returnFocus = null;
        this.frame = 0;
        this.mutation = null;
        this.resize = null;
        this.schedule = function () {
            if (!_this.dialog || _this.frame)
                return;
            _this.frame = requestAnimationFrame(function () { _this.frame = 0; _this.position(); });
        };
        this.close = function () {
            var _a, _b, _c, _d, _e;
            if (!_this.dialog)
                return;
            cancelAnimationFrame(_this.frame);
            _this.frame = 0;
            (_a = _this.mutation) === null || _a === void 0 ? void 0 : _a.disconnect();
            (_b = _this.resize) === null || _b === void 0 ? void 0 : _b.disconnect();
            window.removeEventListener("scroll", _this.schedule, true);
            window.removeEventListener("resize", _this.schedule);
            (_c = window.visualViewport) === null || _c === void 0 ? void 0 : _c.removeEventListener("resize", _this.schedule);
            (_d = window.visualViewport) === null || _d === void 0 ? void 0 : _d.removeEventListener("scroll", _this.schedule);
            document.removeEventListener("basiscore:guide-start", _this.close);
            _this.dialog.close();
            _this.dialog.remove();
            _this.dialog = null;
            _this.target = null;
            if ((_e = _this.returnFocus) === null || _e === void 0 ? void 0 : _e.isConnected)
                _this.returnFocus.focus({ preventScroll: true });
        };
    }
    GridGuide.visible = function (target) {
        return target instanceof HTMLElement && target.isConnected && !target.closest('[hidden], [inert]') &&
            getComputedStyle(target).visibility !== "hidden" && target.getBoundingClientRect().width > 0 && target.getBoundingClientRect().height > 0;
    };
    GridGuide.prototype.resolve = function (name) {
        if (!Object.prototype.hasOwnProperty.call(this.targets, name))
            return null;
        try {
            var target = this.targets[name]();
            return GridGuide.visible(target) ? target : null;
        }
        catch (_a) {
            return null;
        }
    };
    GridGuide.prototype.start = function (trigger) {
        var _this = this;
        var _a, _b;
        if (!isGuideConfig(this.config) || this.dialog)
            return;
        this.steps = this.config.steps.filter(function (step) { return !step.optional || _this.resolve(step.target); });
        if (!this.steps.length)
            return;
        // Only one active guide owns focus, even when multiple grids share a page.
        document.dispatchEvent(new Event("basiscore:guide-start"));
        document.addEventListener("basiscore:guide-start", this.close);
        this.returnFocus = trigger || document.activeElement;
        this.index = 0;
        this.dialog = GridGuide_element("dialog", "bc-guide");
        this.dialog.dir = this.container.getAttribute("data-bc-grid-direction") || "rtl";
        this.dialog.setAttribute("aria-label", this.config.title);
        this.ring = GridGuide_element("div", "bc-guide-ring");
        this.ring.setAttribute("aria-hidden", "true");
        this.arrow = GridGuide_element("div", "bc-guide-arrow");
        this.arrow.setAttribute("aria-hidden", "true");
        this.arrow.hidden = true;
        this.panel = GridGuide_element("section", "bc-guide-panel");
        this.panel.tabIndex = -1;
        var top = GridGuide_element("div", "bc-guide-top");
        this.counter = GridGuide_element("span", "bc-guide-counter");
        this.counter.setAttribute("role", "status");
        this.counter.setAttribute("aria-live", "polite");
        var close = this.button("بستن راهنما", "bc-guide-close", this.close, "closeIcon");
        top.append(this.counter, close);
        this.title = GridGuide_element("h2", "bc-guide-title");
        this.description = GridGuide_element("p", "bc-guide-description");
        this.notice = GridGuide_element("p", "bc-guide-notice");
        this.progress = GridGuide_element("div", "bc-guide-progress");
        this.progress.setAttribute("aria-hidden", "true");
        var footer = GridGuide_element("div", "bc-guide-footer");
        this.previous = this.button("قبلی", "bc-guide-button", function () { return _this.move(-1); });
        var skip = this.button("رد کردن", "bc-guide-button bc-guide-skip", this.close);
        this.next = this.button("بعدی", "bc-guide-button bc-guide-next", function () { return _this.move(1); });
        footer.append(this.previous, skip, this.next);
        var content = GridGuide_element("div", "bc-guide-content");
        content.setAttribute("aria-live", "polite");
        content.setAttribute("aria-atomic", "true");
        content.append(this.title, this.description, this.notice);
        this.panel.append(top, content, this.progress, footer);
        this.dialog.append(this.ring, this.arrow, this.panel);
        this.dialog.addEventListener("cancel", function (event) { event.preventDefault(); _this.close(); });
        this.dialog.addEventListener("keydown", function (event) {
            if (event.key !== "Tab")
                return;
            var controls = Array.from(_this.panel.querySelectorAll("button:not(:disabled)"));
            var first = controls[0], last = controls[controls.length - 1];
            if (event.shiftKey && (document.activeElement === first || document.activeElement === _this.panel)) {
                event.preventDefault();
                last.focus();
            }
            else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        });
        document.body.append(this.dialog);
        this.dialog.showModal();
        this.resize = new ResizeObserver(this.schedule);
        this.resize.observe(this.panel);
        this.mutation = new MutationObserver(this.schedule);
        this.mutation.observe(this.container, { childList: true, subtree: true, attributes: true });
        window.addEventListener("scroll", this.schedule, { capture: true, passive: true });
        window.addEventListener("resize", this.schedule, { passive: true });
        (_a = window.visualViewport) === null || _a === void 0 ? void 0 : _a.addEventListener("resize", this.schedule);
        (_b = window.visualViewport) === null || _b === void 0 ? void 0 : _b.addEventListener("scroll", this.schedule);
        this.show();
        this.panel.focus({ preventScroll: true });
    };
    GridGuide.prototype.button = function (label, className, action, icon) {
        var button = GridGuide_element("button", className);
        button.type = "button";
        if (icon) {
            button.innerHTML = icons[icon] || "";
            button.setAttribute("aria-label", label);
            button.title = label;
        }
        else
            button.textContent = label;
        button.addEventListener("click", action);
        return button;
    };
    GridGuide.prototype.move = function (direction) {
        var next = this.index + direction;
        while (next >= 0 && next < this.steps.length && this.steps[next].optional && !this.resolve(this.steps[next].target))
            next += direction;
        if (next >= this.steps.length) {
            this.close();
            return;
        }
        if (next < 0)
            return;
        this.index = next;
        this.show();
    };
    GridGuide.prototype.show = function () {
        var _a;
        var _this = this;
        var step = this.steps[this.index];
        this.counter.textContent = "\u0645\u0631\u062D\u0644\u0647 ".concat(this.number(this.index + 1), " \u0627\u0632 ").concat(this.number(this.steps.length));
        this.title.textContent = step.title;
        this.description.textContent = step.description;
        this.panel.setAttribute("aria-label", step.title);
        var previousFocused = document.activeElement === this.previous;
        this.previous.disabled = this.index === 0;
        if (previousFocused && this.previous.disabled)
            this.next.focus({ preventScroll: true });
        this.next.textContent = this.index === this.steps.length - 1 ? "پایان راهنما" : "بعدی";
        (_a = this.progress).replaceChildren.apply(_a, this.steps.map(function (_, index) {
            var dot = GridGuide_element("span", "bc-guide-dot");
            dot.dataset.state = index === _this.index ? "current" : index < _this.index ? "done" : "upcoming";
            return dot;
        }));
        var target = this.resolve(step.target);
        target === null || target === void 0 ? void 0 : target.scrollIntoView({ block: this.mobile() ? "start" : "center", inline: "nearest", behavior: "instant" });
        if (target && this.mobile())
            window.scrollBy({ top: -12, behavior: "instant" });
        this.schedule();
    };
    GridGuide.prototype.number = function (value) { return value.toLocaleString("fa-IR"); };
    GridGuide.prototype.mobile = function () {
        var _a;
        return (((_a = window.visualViewport) === null || _a === void 0 ? void 0 : _a.width) || window.innerWidth) <= 480 ||
            (this.container.dataset.view === "mobile" && this.container.getBoundingClientRect().width <= 480);
    };
    GridGuide.prototype.position = function () {
        var _a, _b, _c, _d;
        if (!this.container.isConnected) {
            this.close();
            return;
        }
        var target = this.resolve(this.steps[this.index].target);
        if (target !== this.target) {
            if (this.target)
                (_a = this.resize) === null || _a === void 0 ? void 0 : _a.unobserve(this.target);
            this.target = target;
            if (target)
                (_b = this.resize) === null || _b === void 0 ? void 0 : _b.observe(target);
        }
        this.notice.hidden = !!target;
        this.notice.textContent = target ? "" : "این بخش در نمای فعلی در دسترس نیست؛ می‌توانید به مرحله بعد بروید.";
        this.ring.hidden = !target;
        var viewport = window.visualViewport;
        var width = (viewport === null || viewport === void 0 ? void 0 : viewport.width) || window.innerWidth;
        var height = (viewport === null || viewport === void 0 ? void 0 : viewport.height) || window.innerHeight;
        var left = (viewport === null || viewport === void 0 ? void 0 : viewport.offsetLeft) || 0;
        var top = (viewport === null || viewport === void 0 ? void 0 : viewport.offsetTop) || 0;
        var gap = 12;
        var mobile = this.mobile();
        (_c = this.dialog) === null || _c === void 0 ? void 0 : _c.classList.toggle("bc-guide-mobile", mobile);
        var grid = this.container.getBoundingClientRect();
        var inPreview = mobile && width > 480 && target && this.container.contains(target);
        var laneLeft = inPreview ? Math.max(left, grid.left) : left;
        var laneRight = inPreview ? Math.min(left + width, grid.right) : left + width;
        this.panel.style.width = "".concat(Math.min(368, Math.max(0, laneRight - laneLeft - gap * 2)), "px");
        this.panel.style.maxHeight = "".concat(height - gap * 2, "px");
        var rect = target === null || target === void 0 ? void 0 : target.getBoundingClientRect();
        var panel = this.panel.getBoundingClientRect();
        var x = laneLeft + (laneRight - laneLeft - panel.width) / 2;
        var y = top + (height - panel.height) / 2;
        if (rect) {
            if (!mobile || (!inPreview && width > 480))
                x = rect.right - panel.width;
            if (rect.bottom + gap + panel.height <= top + height - gap)
                y = rect.bottom + gap;
            else if (rect.top - gap - panel.height >= top + gap)
                y = rect.top - gap - panel.height;
            else if (!mobile && rect.left - gap - panel.width >= left + gap) {
                x = rect.left - gap - panel.width;
                y = rect.top;
            }
            else {
                if (mobile) {
                    // Leave part of a tall target visible; only the guide copy scrolls on short screens.
                    this.panel.style.maxHeight = "".concat(Math.min(height - gap * 2, height * .6), "px");
                    panel = this.panel.getBoundingClientRect();
                }
                y = top + height - panel.height - gap;
            }
        }
        x = Math.max(laneLeft + gap, Math.min(x, laneRight - panel.width - gap));
        y = Math.max(top + gap, Math.min(y, top + height - panel.height - gap));
        Object.assign(this.panel.style, {
            left: "".concat(x, "px"), top: "".concat(y, "px"),
        });
        this.arrow.hidden = true;
        if (rect) {
            var ringLeft = Math.max(left + 5, rect.left - 5);
            var ringTop = Math.max(top + 5, rect.top - 5);
            var ringBottom = Math.min(top + height - 5, rect.bottom + 5);
            if (mobile && y < ringBottom && y + panel.height > ringTop) {
                if (y > ringTop)
                    ringBottom = Math.min(ringBottom, y - gap);
                else
                    ringTop = Math.max(ringTop, y + panel.height + gap);
            }
            Object.assign(this.ring.style, { left: "".concat(ringLeft, "px"), top: "".concat(ringTop, "px"),
                width: "".concat(Math.max(0, Math.min(left + width - 5, rect.right + 5) - ringLeft), "px"),
                height: "".concat(Math.max(0, ringBottom - ringTop), "px") });
            var below = y >= rect.bottom + gap;
            var above = y + panel.height <= rect.top - gap;
            var arrowX = Math.max(x + 28, Math.min(rect.left + rect.width / 2, x + panel.width - 28));
            if (mobile && (below || above) && arrowX >= rect.left - 5 && arrowX <= rect.right + 5) {
                this.arrow.hidden = false;
                this.arrow.dataset.side = below ? "below" : "above";
                Object.assign(this.arrow.style, { left: "".concat(arrowX - 6, "px"), top: "".concat(below ? y - 6 : y + panel.height - 6, "px") });
            }
        }
        (_d = this.dialog) === null || _d === void 0 ? void 0 : _d.classList.toggle("bc-guide-unavailable", !target);
    };
    return GridGuide;
}());
/* harmony default export */ const grid_GridGuide = (GridGuide);

;// ./src/component/grid/MaterialTemplate.ts
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};








var MaterialTemplate_icons = __webpack_require__(214);
function MaterialTemplate_element(tag, className, text) {
    if (className === void 0) { className = ""; }
    var node = document.createElement(tag);
    node.className = className;
    if (text !== undefined)
        node.textContent = text;
    return node;
}
// Owns the template DOM; all filtering, sorting and paging stays in the existing process managers.
var MaterialTemplate = /** @class */ (function () {
    function MaterialTemplate(owner, container, defaultLabels) {
        var _this = this;
        var _a, _b;
        this.owner = owner;
        this.container = container;
        this.defaultLabels = defaultLabels;
        this.rows = [];
        this.source = [];
        this.body = MaterialTemplate_element("div");
        this.sectionHeader = MaterialTemplate_element("div", "grid-section-header");
        this.headerContent = MaterialTemplate_element("div", "grid-header-content");
        this.toolbar = MaterialTemplate_element("div", "preview-toolbar");
        this.filterBar = MaterialTemplate_element("div", "list-filter-bar");
        this.quickFilters = MaterialTemplate_element("div", "quick-filters");
        this.filters = MaterialTemplate_element("div", "filter-panel");
        this.search = MaterialTemplate_element("div", "search-field");
        this.selectedCount = MaterialTemplate_element("span", "selection-count");
        this.selectionSummary = MaterialTemplate_element("div", "selection-summary");
        this.mobileBulkActions = MaterialTemplate_element("div", "mobile-bulk-actions");
        this.footer = MaterialTemplate_element("div", "pagination");
        this.resultCount = MaterialTemplate_element("span");
        this.pageLabel = MaterialTemplate_element("span");
        this.pageNumbers = MaterialTemplate_element("span", "page-numbers");
        this.pageSize = MaterialTemplate_element("select");
        this.pagingControls = MaterialTemplate_element("div");
        this.pagingSizes = MaterialTemplate_element("div");
        this.currentPage = 1;
        this.total = 0;
        this.from = 0;
        this.to = 0;
        this.showFilters = false;
        this.queryInput = MaterialTemplate_element("input");
        this.mobileTools = MaterialTemplate_element("div", "mobile-tools");
        this.mobileSelectAll = MaterialTemplate_element("input");
        this.mobileSort = MaterialTemplate_element("select");
        this.columnLabels = new Map();
        this.closeMenus = function (event) {
            if ((event === null || event === void 0 ? void 0 : event.target) instanceof HTMLElement && event.target.closest(".iconsDetail[popover]"))
                return;
            _this.container.querySelectorAll(".iconsOperations.show .iconsDetail").forEach(function (menu) {
                var _a;
                if (typeof menu.hidePopover === "function" && menu.matches(":popover-open"))
                    menu.hidePopover();
                (_a = menu.closest(".iconsOperations")) === null || _a === void 0 ? void 0 : _a.classList.remove("show");
            });
        };
        var options = owner.options;
        this.columns = Object.entries(options.columns || {}).map(function (_a) {
            var name = _a[0], definition = _a[1];
            return (__assign({ name: name, title: name, source: name, sort: options.sorting, filter: true, type: src_enum/* ColumnType */.$.data }, (typeof definition === "string" ? { title: definition } : definition)));
        });
        if (options.rowNumber)
            this.columns.unshift({ type: src_enum/* ColumnType */.$.sort, title: options.rowNumber, source: null, width: "52px" });
        if (options.selectable && options.selectable !== "none")
            this.columns.unshift({ type: src_enum/* ColumnType */.$.select, title: "", source: null });
        this.columns.forEach(function (column) {
            var label = MaterialTemplate_element("template");
            label.innerHTML = column.title || "";
            _this.columnLabels.set(column, label.content.textContent || column.name || "");
        });
        var managers = { client: ClientPaginate/* default */.A, server: ServerProcess/* default */.A, mix: MixedProcess/* default */.A };
        this.process = options.paging
            ? new managers[options.process](owner, this.pagingSizes, this.pagingControls, MaterialTemplate_element("div"))
            : new NoPaginateProcessManager/* default */.A(owner);
        this.process.query = "";
        if (options.defaultSort) {
            var name_1 = typeof options.defaultSort === "string" ? options.defaultSort : options.defaultSort.name;
            var column = this.columns.find(function (column) { return column.name === name_1 || column.source === name_1; });
            if (column === null || column === void 0 ? void 0 : column.sort)
                this.process.sortInfo = { column: column, sort: typeof options.defaultSort === "string" ? "asc" : options.defaultSort.sort || "asc" };
        }
        container.classList.add("preview-content");
        if (typeof options.headerMaker === "function") {
            var html = options.headerMaker(this.headerContent);
            if (typeof html === "string")
                this.headerContent.innerHTML = html;
            if (this.headerContent.hasChildNodes()) {
                this.sectionHeader.append(this.headerContent);
                container.append(this.sectionHeader);
            }
        }
        var toolbar = this.toolbar;
        this.quickFilters.setAttribute("role", "group");
        this.quickFilters.setAttribute("aria-label", this.label("quickFilters", "فیلتر سریع؛ تعدادها از کل داده‌های لیست"));
        this.filterBar.append(this.quickFilters);
        var input = this.queryInput;
        input.placeholder = this.label("searchPlaceholder", "") || "جستجو در داده‌ها";
        input.setAttribute("aria-label", input.placeholder);
        input.addEventListener("input", function () {
            _this.process.query = input.value.toLowerCase();
            if (_this.remoteSearch && options.filter === "simple")
                _this.process.filter = _this.process.query;
            _this.process.pageNumber = 0;
            _this.process.applyUserAction(_this.headerFilters ? "text" : "select");
        });
        this.search.append(this.icon("searchIcon"), input, MaterialTemplate_element("kbd", "", "⌘ K"));
        this.filterButton = MaterialTemplate_element("button", "button button-outlined advanced-filter-button");
        this.filterButton.type = "button";
        this.filterButton.addEventListener("click", function () {
            _this.showFilters = !_this.showFilters;
            _this.filters.style.display = _this.showFilters ? "" : "none";
            _this.filterButton.setAttribute("aria-expanded", String(_this.showFilters));
        });
        this.updateFilterButton();
        this.filters.style.display = "none";
        this.selectedCount.style.display = "none";
        this.selectedCount.setAttribute("role", "status");
        this.clearSelection = this.iconButton("closeIcon", "لغو انتخاب", function () { return _this.owner.setSelectedRows([]); });
        this.clearSelection.classList.add("clear-selection");
        this.clearSelection.style.display = "none";
        this.selectionSummary.style.display = "none";
        var operation = this.dataColumns.find(function (column) { return column.name === "operation"; });
        if (operation) {
            this.mobileBulkActions.innerHTML = operation.title || "";
            if (!this.mobileBulkActions.querySelector("button, a[href], input, select, [onclick], [role=button]"))
                this.mobileBulkActions.replaceChildren();
        }
        this.mobileBulkActions.setAttribute("role", "group");
        this.mobileBulkActions.setAttribute("aria-label", this.label("actions", "عملیات"));
        this.mobileBulkActions.hidden = true;
        this.selectionSummary.append(this.selectedCount, this.mobileBulkActions, this.clearSelection);
        this.settingsButton = this.iconButton("settingsIcon", this.label("tableSettings", "تنظیمات جدول"), function () { var _a, _b; return (_b = (_a = _this.presentation).onSettings) === null || _b === void 0 ? void 0 : _b.call(_a); });
        toolbar.append(this.search, MaterialTemplate_element("div", "toolbar-spacer"), this.selectionSummary, this.settingsButton);
        if (options.refresh) {
            var refresh = MaterialTemplate_element("button", "button button-outlined refresh-button", this.label("refresh", "") || "تازه‌سازی");
            refresh.type = "button";
            refresh.prepend(this.icon("refreshIcon"));
            refresh.addEventListener("click", function () { return owner.tryLoadData(); });
            toolbar.append(refresh);
        }
        toolbar.append(this.filterButton);
        var exports = MaterialTemplate_element("div", "grid-exports");
        exports.setAttribute("data-bc-export-container", "");
        if ((_a = options.export) === null || _a === void 0 ? void 0 : _a.length)
            toolbar.append(exports);
        (_b = options.export) === null || _b === void 0 ? void 0 : _b.forEach(function (info) {
            var item = MaterialTemplate_element("div", "grid-export");
            item.setAttribute("data-bc-export-item", "");
            var button = MaterialTemplate_element("button", "button button-outlined export-button", info.tooltip || "Excel");
            button.type = "button";
            if (info.type === "excel") {
                item.setAttribute("data-bc-export-item-excel", "");
                button.prepend(_this.icon("downloadIcon"));
            }
            button.disabled = !info.url;
            var status = MaterialTemplate_element("span", "export-status");
            status.setAttribute("role", "status");
            status.hidden = true;
            button.addEventListener("click", function () { return __awaiter(_this, void 0, void 0, function () {
                var _1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            button.disabled = true;
                            button.setAttribute("aria-busy", "true");
                            status.hidden = true;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, 4, 5]);
                            return [4 /*yield*/, this.downloadFile(info)];
                        case 2:
                            _a.sent();
                            return [3 /*break*/, 5];
                        case 3:
                            _1 = _a.sent();
                            status.textContent = this.label("exportFailed", "دریافت فایل انجام نشد. دوباره تلاش کنید.");
                            status.hidden = false;
                            return [3 /*break*/, 5];
                        case 4:
                            button.disabled = false;
                            button.removeAttribute("aria-busy");
                            return [7 /*endfinally*/];
                        case 5: return [2 /*return*/];
                    }
                });
            }); });
            item.append(button, status);
            exports.append(item);
        });
        if (isGuideConfig(options.guide)) {
            var firstVisible_1 = function (selector) { return Array.from(container.querySelectorAll(selector)).find(function (node) { return grid_GridGuide.visible(node); }) || null; };
            this.guide = new grid_GridGuide(container, options.guide, __assign({ "list.header": function () { return _this.headerContent.parentElement ? _this.headerContent : toolbar; }, "list.search": function () { return _this.queryInput; }, "list.filters": function () { return _this.headerFilters ? firstVisible_1(".header-filter") : _this.filterButton; }, "list.row": function () { return firstVisible_1("tbody tr[data-sys-tr], .mobile-row, .list-item, .data-card"); }, "list.row.checkbox": function () { return firstVisible_1('tbody input[type="checkbox"], .mobile-row input[type="checkbox"], .list-item input[type="checkbox"], .data-card input[type="checkbox"]'); }, "list.bulk.actions": function () { return _this.clearSelection; }, "list.bulk.menu": function () { return firstVisible_1("thead .iconsOperations > .icon, .mobile-bulk-actions .iconsOperations > .icon, .mobile-bulk-actions button"); }, "list.row.actions": function () { return firstVisible_1("tbody .iconsOperations > .icon, .action-cell button, .mobile-row-actions .iconsOperations > .icon, .mobile-row-actions button, .mobile-row-actions a[href], .list-item .iconsOperations > .icon, .list-trailing button, .data-card .iconsOperations > .icon, .card-heading button"); }, "list.pagination": function () { return options.paging ? _this.footer : null; } }, options.guideTargets));
            var help_1 = MaterialTemplate_element("button", "button button-outlined guide-start-button");
            help_1.type = "button";
            help_1.title = this.label("guide", "راهنمای لیست");
            help_1.setAttribute("aria-label", help_1.title);
            help_1.append(this.icon("helpIcon"), MaterialTemplate_element("span", "guide-start-copy", " ".concat(help_1.title)));
            help_1.addEventListener("click", function () { return _this.guide.start(help_1); });
            help_1.dataset.guideStart = "";
            this.guideButton = help_1;
            toolbar.append(help_1);
        }
        this.createFooter();
        this.mobileSelectAll.type = "checkbox";
        var selectLabel = MaterialTemplate_element("label", "mobile-select-all");
        selectLabel.append(this.mobileSelectAll, MaterialTemplate_element("span", "", this.label("selectAll", "انتخاب همه")));
        this.mobileSelectAll.addEventListener("change", function () {
            _this.rows.forEach(function (row) { if (row._checkBox)
                row._checkBox.checked = _this.mobileSelectAll.checked; });
            _this.owner.onSelectionChange();
        });
        this.mobileSort.setAttribute("aria-label", this.label("sort", "مرتب‌سازی"));
        this.mobileSort.add(new Option(this.label("sourceOrder", "ترتیب اولیه"), ""));
        this.dataColumns.filter(function (column) { return column.sort && column.name !== "operation"; }).forEach(function (column) {
            _this.mobileSort.add(new Option("".concat(_this.columnTitle(column), " \u2191"), "".concat(column.name, ":asc")));
            _this.mobileSort.add(new Option("".concat(_this.columnTitle(column), " \u2193"), "".concat(column.name, ":desc")));
        });
        this.mobileSort.addEventListener("change", function () {
            var column = _this.dataColumns.find(function (column) { return _this.mobileSort.value === "".concat(column.name, ":asc") || _this.mobileSort.value === "".concat(column.name, ":desc"); });
            _this.process.sortInfo = column ? { column: column, sort: _this.mobileSort.value.endsWith(":desc") ? "desc" : "asc" } : null;
            _this.process.pageNumber = 0;
            _this.process.applyUserAction();
        });
        var sortLabel = MaterialTemplate_element("label", "mobile-sort-label");
        sortLabel.append(MaterialTemplate_element("span", "", "".concat(this.label("sort", "مرتب‌سازی"), ":")), this.mobileSort);
        this.mobileTools.append(selectLabel, sortLabel);
        container.append(this.filterBar, toolbar, this.filters, this.mobileTools, this.body);
        if (typeof HTMLElement.prototype.showPopover === "function") {
            this.menuObserver = new MutationObserver(function (changes) {
                var _loop_1 = function (target) {
                    if (!(target instanceof HTMLElement) || !target.matches(".iconsOperations") || !target.isConnected)
                        return "continue";
                    var menu = target.querySelector(".iconsDetail");
                    if (!menu)
                        return "continue";
                    if (!target.classList.contains("show")) {
                        if (menu.matches(":popover-open"))
                            menu.hidePopover();
                        return "continue";
                    }
                    if (!menu.hasAttribute("popover")) {
                        menu.setAttribute("popover", "auto");
                        menu.addEventListener("toggle", function () {
                            if (!menu.matches(":popover-open"))
                                target.classList.remove("show");
                        });
                    }
                    if (!menu.matches(":popover-open"))
                        menu.showPopover();
                    var anchor = (target.querySelector(".icon") || target).getBoundingClientRect();
                    var bounds = menu.getBoundingClientRect();
                    menu.style.left = "".concat(Math.max(8, Math.min(anchor.left + (anchor.width - bounds.width) / 2, innerWidth - bounds.width - 8)), "px");
                    menu.style.top = "".concat(Math.max(8, Math.min(anchor.bottom + 4, innerHeight - bounds.height - 8)), "px");
                };
                for (var _i = 0, changes_1 = changes; _i < changes_1.length; _i++) {
                    var target = changes_1[_i].target;
                    _loop_1(target);
                }
            });
            this.menuObserver.observe(container, { subtree: true, attributes: true, attributeFilter: ["class"] });
            container.addEventListener("scroll", this.closeMenus, true);
        }
        if (options.paging)
            container.append(this.footer);
        container.classList.toggle("has-pagination", Boolean(options.paging));
        this.updatePresentation(options.presentation || {});
    }
    Object.defineProperty(MaterialTemplate.prototype, "presentation", {
        get: function () { return this.owner.options.presentation || {}; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MaterialTemplate.prototype, "remoteSearch", {
        // shortcut: remote row filters use plain values; add legacy id/value mapping before migrating remote select/autocomplete widgets.
        get: function () { var _a; return this.owner.options.process === "server" || this.owner.options.process === "mix" && ((_a = this.owner.options.ProcessActionType) === null || _a === void 0 ? void 0 : _a.search) === "server"; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MaterialTemplate.prototype, "filterMode", {
        get: function () { return this.presentation.view === "mobile" ? "columns" : this.owner.options.filter === "advanced" ? "advanced" : this.presentation.filterMode === "header" ? "header" : "columns"; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MaterialTemplate.prototype, "headerFilters", {
        get: function () { return this.owner.options.filter === "row" && (this.presentation.view || "table") === "table"; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MaterialTemplate.prototype, "independentHeaderFilters", {
        get: function () { return this.headerFilters && (this.presentation.showHeaderFilters !== undefined || this.filterMode !== "header"); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MaterialTemplate.prototype, "columnFilters", {
        get: function () { return this.owner.options.filter === "row" || this.owner.options.filter === "advanced"; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MaterialTemplate.prototype, "dataColumns", {
        get: function () { return this.columns.filter(function (column) { return column.type === src_enum/* ColumnType */.$.data; }); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MaterialTemplate.prototype, "filterColumns", {
        get: function () {
            var _this = this;
            return this.columnFilters ? this.dataColumns.filter(function (column) { return column.filter &&
                (_this.presentation.view !== "mobile" || column.name !== "operation"); }) : [];
        },
        enumerable: false,
        configurable: true
    });
    MaterialTemplate.prototype.columnTitle = function (column) { var _a, _b; return (_b = (_a = this.columnLabels.get(column)) !== null && _a !== void 0 ? _a : column.name) !== null && _b !== void 0 ? _b : ""; };
    MaterialTemplate.prototype.dispose = function () {
        var _a, _b;
        (_a = this.guide) === null || _a === void 0 ? void 0 : _a.close();
        this.closeMenus();
        (_b = this.menuObserver) === null || _b === void 0 ? void 0 : _b.disconnect();
        this.container.removeEventListener("scroll", this.closeMenus, true);
        this.container.classList.remove("preview-content", "has-pagination");
        this.container.removeAttribute("data-bc-grid-template");
        this.container.removeAttribute("data-bc-filter-mode");
        this.container.removeAttribute("data-view");
    };
    MaterialTemplate.prototype.downloadFile = function (info) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function () {
            var method, headers, contentType, response, url, _e, _f, link;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        method = (_a = info.method) !== null && _a !== void 0 ? _a : "GET";
                        headers = new Headers();
                        contentType = (_b = info.contentType) !== null && _b !== void 0 ? _b : "application/json; charset=utf-8";
                        if (contentType)
                            headers.append("Content-Type", contentType);
                        return [4 /*yield*/, fetch(new Request(info.url, __assign({ method: method, headers: headers }, (method.toUpperCase() === "POST" ? { body: (_c = info.data) !== null && _c !== void 0 ? _c : "" } : {}))))];
                    case 1:
                        response = _g.sent();
                        if (!response.ok)
                            throw new Error("Grid export failed: HTTP ".concat(response.status));
                        _f = (_e = URL).createObjectURL;
                        return [4 /*yield*/, response.blob()];
                    case 2:
                        url = _f.apply(_e, [_g.sent()]);
                        link = MaterialTemplate_element("a");
                        link.href = url;
                        link.download = (_d = info.fileName) !== null && _d !== void 0 ? _d : "file.xlsx";
                        document.body.appendChild(link);
                        try {
                            link.click();
                        }
                        finally {
                            setTimeout(function () { link.remove(); URL.revokeObjectURL(url); }, 2000);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    MaterialTemplate.prototype.label = function (key, fallback) { var _a; return (_a = this.owner.options.culture.labels[key]) !== null && _a !== void 0 ? _a : fallback; };
    MaterialTemplate.prototype.icon = function (key) {
        var node = MaterialTemplate_element("span");
        var label = this.owner.options.culture.labels[key];
        node.innerHTML = label && label !== this.defaultLabels[key] ? label : MaterialTemplate_icons[key] || label || "";
        node.setAttribute("aria-hidden", "true");
        // Display contents preserves the original direct SVG layout.
        node.style.display = "contents";
        return node;
    };
    MaterialTemplate.prototype.iconButton = function (icon, label, action) {
        var button = MaterialTemplate_element("button", "icon-button");
        button.type = "button";
        button.title = label;
        button.setAttribute("aria-label", label);
        button.append(this.icon(icon));
        if (action)
            button.addEventListener("click", action);
        return button;
    };
    MaterialTemplate.prototype.setSource = function (source) {
        this.source = source;
        this.createFilters();
        this.createQuickFilters();
    };
    MaterialTemplate.prototype.createQuickFilters = function () {
        var _this = this;
        this.quickFilters.replaceChildren();
        var column = this.filterColumns.find(function (column) { return column.name === _this.presentation.quickFilter; });
        if (!this.columnFilters || !column || this.owner.options.process !== "client")
            return;
        var groups = new Map();
        this.source.forEach(function (row) {
            var _a;
            var value = String((_a = (typeof column.source === "function" ? column.source(row) : row[column.source])) !== null && _a !== void 0 ? _a : "");
            if (!value)
                return;
            var group = groups.get(value) || { count: 0, row: row };
            group.count++;
            groups.set(value, group);
        });
        var add = function (value, count, row) {
            var _a, _b, _c, _d;
            var button = MaterialTemplate_element("button", "quick-filter");
            button.type = "button";
            button.dataset.quickFilter = value.toLowerCase();
            var label = MaterialTemplate_element("span", "quick-filter-label");
            if (row && column.cellMaker) {
                var markup = column.cellMaker(row, value, label);
                if (markup != null)
                    label.innerHTML = markup;
                else
                    label.textContent = value;
            }
            else
                label.textContent = row ? String((_d = (_c = (_b = (_a = column.filterData) === null || _a === void 0 ? void 0 : _a.fixValues) === null || _b === void 0 ? void 0 : _b.find(function (item) { return String(item.id) === value; })) === null || _c === void 0 ? void 0 : _c.value) !== null && _d !== void 0 ? _d : value) : _this.label("all", "همه");
            button.append(label, MaterialTemplate_element("span", "quick-filter-count", count.toLocaleString(_this.owner.options.direction === "rtl" ? "fa-IR" : "en-US")));
            button.title = "".concat(label.textContent, ": ").concat(count, " ").concat(_this.label("allData", "در کل داده‌های لیست"));
            button.addEventListener("click", function () {
                if (typeof _this.process.filter !== "object")
                    _this.process.filter = {};
                if (value)
                    _this.process.filter[column.name] = value.toLowerCase();
                else
                    delete _this.process.filter[column.name];
                _this.process.pageNumber = 0;
                _this.createFilters();
                _this.updateFilterButton();
                _this.process.applyUserAction(_this.headerFilters ? "text" : "select");
            });
            _this.quickFilters.append(button);
        };
        add("", this.source.length);
        groups.forEach(function (group, value) { return add(value, group.count, group.row); });
    };
    MaterialTemplate.prototype.captureState = function () {
        return { query: this.process.query, filters: typeof this.process.filter === "object" ? __assign({}, this.process.filter) : {}, page: this.process.pageNumber,
            sort: this.process.sortInfo && { name: this.process.sortInfo.column.name, direction: this.process.sortInfo.sort },
            selected: this.owner.getSelectedRows(), showFilters: this.showFilters };
    };
    MaterialTemplate.prototype.restoreState = function (state) {
        var _this = this;
        this.queryInput.value = this.process.query = state.query;
        this.process.filter = this.remoteSearch && this.owner.options.filter === "simple" ? state.query
            : this.columnFilters ? Object.fromEntries(Object.entries(state.filters).filter(function (_a) {
                var key = _a[0];
                return _this.columns.some(function (column) { return column.name === key; });
            })) : {};
        this.process.pageNumber = state.page;
        var column = this.columns.find(function (column) { var _a; return column.name === ((_a = state.sort) === null || _a === void 0 ? void 0 : _a.name); });
        if (column && state.sort)
            this.process.sortInfo = { column: column, sort: state.sort.direction };
        this.showFilters = state.showFilters;
        this.filters.style.display = this.showFilters ? "" : "none";
        this.createFilters();
        this.updateFilterButton();
        this.owner.setSelectedRows(state.selected);
        this.process.applyUserAction(this.headerFilters ? "text" : "select");
    };
    MaterialTemplate.prototype.setPageSize = function (size) {
        if (!this.owner.options.paging || this.process.pageSize === size)
            return;
        if (!Array.from(this.pageSize.options).some(function (option) { return option.value === String(size); }))
            this.pageSize.add(new Option(String(size), String(size)));
        this.pageSize.value = String(size);
        this.process.pageSize = size;
        this.process.pageNumber = 0;
        this.process.applyUserAction(this.headerFilters ? "text" : "select");
    };
    MaterialTemplate.prototype.updatePresentation = function (presentation) {
        this.owner.options.presentation = __assign(__assign({}, this.presentation), presentation);
        this.search.style.display = this.presentation.search === false ? "none" : "";
        this.settingsButton.style.display = this.presentation.onSettings ? "" : "none";
        this.createFilters();
        this.updateFilterButton();
        this.createQuickFilters();
        if (this.rows.length || this.total === 0)
            this.displayRows(this.rows, this.from, this.to, this.total);
    };
    MaterialTemplate.prototype.updateToolbarVisibility = function () {
        var hasTools = Array.from(this.toolbar.children).some(function (child) { return child instanceof HTMLElement &&
            !child.classList.contains("toolbar-spacer") && !child.hidden && child.style.display !== "none"; });
        this.toolbar.style.display = hasTools ? "" : "none";
    };
    MaterialTemplate.prototype.filterValues = function (column) {
        var _a;
        return ((_a = column.filterData) === null || _a === void 0 ? void 0 : _a.fixValues) || Array.from(new Set(this.source.map(function (row) { var _a; return String((_a = (typeof column.source === "function" ? column.source(row) : row[column.source])) !== null && _a !== void 0 ? _a : ""); }))).filter(Boolean).map(function (value) { return ({ id: value, value: value }); });
    };
    MaterialTemplate.prototype.restoreFilterValue = function (control, name) {
        var _a, _b, _c;
        var value = String((_b = (_a = this.process.filter) === null || _a === void 0 ? void 0 : _a[name]) !== null && _b !== void 0 ? _b : "");
        control.value = control instanceof HTMLSelectElement
            ? ((_c = Array.from(control.options).find(function (option) { return option.value.toLowerCase() === value.toLowerCase(); })) === null || _c === void 0 ? void 0 : _c.value) || ""
            : value;
    };
    MaterialTemplate.prototype.createFilters = function () {
        var _this = this;
        this.filters.replaceChildren();
        this.filterColumns.forEach(function (column) {
            var label = MaterialTemplate_element("label");
            if (_this.filterMode !== "header") {
                label.append(MaterialTemplate_element("span", "", _this.columnTitle(column)), _this.createColumnFilter(column, true));
                _this.filters.append(label);
                return;
            }
            var select = MaterialTemplate_element("select");
            select.setAttribute("aria-label", _this.columnTitle(column));
            select.append(new Option(_this.label("allItems", "همه موارد"), ""));
            var values = _this.filterValues(column);
            values.forEach(function (value) { return select.append(new Option(String(value.value), String(value.id))); });
            _this.restoreFilterValue(select, column.name);
            select.addEventListener("change", function () {
                if (typeof _this.process.filter !== "object")
                    _this.process.filter = {};
                if (select.value)
                    _this.process.filter[column.name] = select.value.toLowerCase();
                else
                    delete _this.process.filter[column.name];
                _this.process.pageNumber = 0;
                _this.updateFilterButton();
                _this.process.applyUserAction(_this.headerFilters ? "text" : "select");
            });
            label.append(MaterialTemplate_element("span", "", _this.columnTitle(column)), select);
            _this.filters.append(label);
        });
        var clear = MaterialTemplate_element("button", "clear-filters", this.label("clearFilters", "پاک کردن فیلترها"));
        clear.type = "button";
        clear.addEventListener("click", function () {
            _this.process.filter = {};
            _this.process.pageNumber = 0;
            _this.createFilters();
            _this.updateFilterButton();
            _this.process.applyUserAction();
        });
        if (this.presentation.view === "mobile") {
            var tools = MaterialTemplate_element("div", "filter-panel-tools");
            tools.append(clear);
            this.filters.append(tools);
        }
        else
            this.filters.append(clear);
    };
    MaterialTemplate.prototype.updateFilterButton = function () {
        this.filterButton.setAttribute("aria-expanded", String(this.showFilters));
        var label = this.presentation.view === "mobile" ? this.label("mobileFilters", "فیلتر")
            : this.owner.options.filter === "advanced" ? this.label("advancedFilters", "فیلتر پیشرفته") : this.label("filters", "فیلترها");
        this.filterButton.replaceChildren(this.icon("filterIcon"), document.createTextNode(" ".concat(label)));
        var count = typeof this.process.filter === "object" ? Object.keys(this.process.filter).length : 0;
        if (count)
            this.filterButton.append(MaterialTemplate_element("b", "", String(count)));
    };
    MaterialTemplate.prototype.createFooter = function () {
        var _this = this;
        var sizes = MaterialTemplate_element("div", "page-size");
        var available = Array.isArray(this.owner.options.paging) ? this.owner.options.paging : [this.owner.options.paging];
        available.forEach(function (size) { return _this.pageSize.append(new Option(new Intl.NumberFormat("fa-IR").format(size), String(size))); });
        this.pageSize.value = String(this.process.pageSize);
        this.pageSize.setAttribute("aria-label", this.label("pageSize", "نمایش"));
        this.pageSize.addEventListener("change", function () {
            var _a, _b;
            var original = _this.pagingSizes.querySelector("select");
            _this.process.pageNumber = 0;
            if (original) {
                original.value = _this.pageSize.value;
                original.dispatchEvent(new Event("change"));
            }
            else {
                _this.process.pageSize = Number(_this.pageSize.value);
                _this.process.applyUserAction(_this.headerFilters ? "text" : "select");
            }
            (_b = (_a = _this.presentation).onPageSizeChange) === null || _b === void 0 ? void 0 : _b.call(_a, Number(_this.pageSize.value));
        });
        sizes.append(MaterialTemplate_element("span", "", this.label("pageSize", "نمایش")), this.pageSize);
        var controls = MaterialTemplate_element("div", "page-controls");
        var changePage = function (selector) { var _a; return (_a = _this.pagingControls.querySelector(selector)) === null || _a === void 0 ? void 0 : _a.click(); };
        var pageButton = function (action, icon, label, selector) {
            var button = _this.iconButton(icon, label, function () { return changePage(selector); });
            button.dataset.pageAction = action;
            return button;
        };
        if (this.owner.options.firstAndLastBtn)
            controls.append(pageButton("first", "firstPageIcon", this.label("firstPage", "صفحه اول"), "[data-bc-start]"));
        controls.append(pageButton("previous", "pagePreviousIcon", this.label("previousPage", "صفحه قبل"), "[data-bc-previous]"), this.pageNumbers, pageButton("next", "pageNextIcon", this.label("nextPage", "صفحه بعد"), "[data-bc-next]"));
        if (this.owner.options.firstAndLastBtn)
            controls.append(pageButton("last", "lastPageIcon", this.label("lastPage", "صفحه آخر"), "[data-bc-end]"));
        var navigation = MaterialTemplate_element("nav", "page-navigation");
        navigation.setAttribute("aria-label", this.label("pagination", "صفحه‌بندی"));
        this.pageLabel.setAttribute("aria-live", "polite");
        navigation.append(this.pageLabel, controls);
        this.footer.append(this.resultCount, sizes, navigation);
    };
    MaterialTemplate.prototype.displayRows = function (rows, from, to, total) {
        var _this = this;
        var _a, _b, _c;
        var focused = this.body.contains(document.activeElement) && (document.activeElement instanceof HTMLInputElement || document.activeElement instanceof HTMLSelectElement)
            ? document.activeElement : null;
        var focusKey = focused === null || focused === void 0 ? void 0 : focused.dataset.columnFilter;
        var selection = focused instanceof HTMLInputElement && ["text", "search"].includes(focused.type) ? [focused.selectionStart, focused.selectionEnd] : null;
        var scrollLeft = ((_a = this.body.querySelector(".table-wrap")) === null || _a === void 0 ? void 0 : _a.scrollLeft) || 0;
        this.closeMenus();
        this.rows = rows;
        this.from = from;
        this.to = to;
        this.total = total;
        this.currentPage = Math.max(1, (this.process.pageNumber || 0) + 1);
        var pages = Math.max(1, this.process.totalPage || 1);
        var number = function (value) { return new Intl.NumberFormat(_this.owner.options.direction === "rtl" ? "fa-IR" : "en-US").format(value); };
        this.resultCount.className = "result-count";
        this.resultCount.replaceChildren(this.icon("resultsIcon"), MaterialTemplate_element("b", "", "".concat(number(total), " ").concat(this.label("results", "نتیجه"))));
        this.pageLabel.textContent = "".concat(this.label("page", "صفحه"), " ").concat(number(this.currentPage), " ").concat(this.label("of", "از"), " ").concat(number(pages));
        this.pageNumbers.replaceChildren();
        this.pagingControls.querySelectorAll("[data-bc-page]").forEach(function (page) {
            var index = Number(page.dataset.bcPage);
            var button = MaterialTemplate_element("button", "page-number", number(index + 1));
            button.type = "button";
            button.setAttribute("aria-label", "".concat(_this.label("page", "صفحه"), " ").concat(number(index + 1)));
            if (index + 1 === _this.currentPage)
                button.setAttribute("aria-current", "page");
            button.addEventListener("click", function () { return page.click(); });
            _this.pageNumbers.append(button);
        });
        this.footer.querySelectorAll("[data-page-action]").forEach(function (button) {
            button.disabled = ["first", "previous"].includes(button.dataset.pageAction) ? _this.currentPage <= 1 : _this.currentPage >= pages;
        });
        var filtering = this.filterColumns.length > 0;
        var view = this.presentation.view || "table";
        this.container.dataset.bcFilterMode = this.filterMode;
        var hasHeader = this.headerContent.parentElement === this.sectionHeader;
        var showBand = this.filterMode !== "header" && filtering && this.quickFilters.childElementCount > 0;
        this.filterBar.hidden = !showBand;
        var filterTools = hasHeader && this.owner.options.filter === "advanced" && view !== "mobile" ? this.sectionHeader : this.toolbar;
        if (this.filterButton.parentElement !== filterTools)
            filterTools.append(this.filterButton);
        var panelFilters = filtering && !this.headerFilters;
        this.filterButton.style.display = panelFilters ? "" : "none";
        this.filterButton.setAttribute("aria-expanded", String(panelFilters && this.showFilters));
        this.filters.style.display = panelFilters && this.showFilters ? "" : "none";
        if (view === "mobile") {
            if (this.selectionSummary.parentElement !== this.container)
                this.container.insertBefore(this.selectionSummary, this.body);
            var settingsParent = panelFilters ? this.filters.querySelector(".filter-panel-tools") : this.toolbar;
            if (settingsParent && this.settingsButton.parentElement !== settingsParent)
                settingsParent.append(this.settingsButton);
        }
        else {
            if (this.selectionSummary.parentElement !== this.toolbar)
                (_b = this.toolbar.querySelector(".toolbar-spacer")) === null || _b === void 0 ? void 0 : _b.after(this.selectionSummary);
            if (this.settingsButton.parentElement !== this.toolbar)
                this.selectionSummary.after(this.settingsButton);
        }
        var guideParent = view === "mobile" && hasHeader ? this.sectionHeader : this.toolbar;
        if (this.guideButton && this.guideButton.parentElement !== guideParent)
            guideParent.append(this.guideButton);
        this.quickFilters.querySelectorAll("[data-quick-filter]").forEach(function (button) {
            var _a;
            button.setAttribute("aria-pressed", String(button.dataset.quickFilter === (((_a = _this.process.filter) === null || _a === void 0 ? void 0 : _a[_this.presentation.quickFilter]) || "")));
        });
        this.container.dataset.view = view;
        this.mobileTools.hidden = view !== "mobile";
        this.mobileSelectAll.parentElement.hidden = !this.owner.options.selectAll || !this.owner.options.selectable || this.owner.options.selectable === "none" || this.owner.options.selectable === "single";
        (_c = this.mobileSort.parentElement) === null || _c === void 0 ? void 0 : _c.toggleAttribute("hidden", !this.dataColumns.some(function (column) { return column.sort && column.name !== "operation"; }));
        this.mobileSort.value = this.process.sortInfo ? "".concat(this.process.sortInfo.column.name, ":").concat(this.process.sortInfo.sort) : "";
        var density = this.presentation.density || "comfortable";
        var wrapper = MaterialTemplate_element("div", view === "table" ? "table-wrap" : "".concat(view === "mobile" ? "mobile-rows" : view === "grid" ? "card-grid" : "structured-list", " ").concat(density));
        var body = wrapper;
        if (view === "table") {
            wrapper.setAttribute("data-bc-table-container", "");
            var table = MaterialTemplate_element("table", "data-table ".concat(density));
            table.setAttribute("data-bc-table", "");
            var independent_1 = this.independentHeaderFilters;
            if (independent_1)
                table.classList.add("independent-header");
            var head = MaterialTemplate_element("thead");
            var headings_1 = MaterialTemplate_element("tr");
            this.columns.forEach(function (column) {
                var _a;
                var _b;
                var th = MaterialTemplate_element("th", column.type === src_enum/* ColumnType */.$.select ? "check-cell" : "");
                th.scope = "col";
                if (column.width)
                    th.style.width = column.width;
                if (column.headerCssClass)
                    (_a = th.classList).add.apply(_a, (Array.isArray(column.headerCssClass) ? column.headerCssClass : [column.headerCssClass]));
                if (column.type === src_enum/* ColumnType */.$.select) {
                    if (_this.owner.options.selectAll && _this.owner.options.selectable !== "single") {
                        var checkbox_1 = MaterialTemplate_element("input");
                        checkbox_1.type = "checkbox";
                        checkbox_1.setAttribute("aria-label", _this.label("selectAll", "انتخاب همه"));
                        checkbox_1.addEventListener("change", function () {
                            _this.rows.forEach(function (row) { if (row._checkBox)
                                row._checkBox.checked = checkbox_1.checked; });
                            _this.owner.onSelectionChange();
                        });
                        th.append(checkbox_1);
                    }
                }
                else {
                    var content = MaterialTemplate_element("div", "th-content");
                    var title = MaterialTemplate_element("span");
                    title.innerHTML = column.title;
                    var hasFilter = _this.headerFilters && filtering && column.type === src_enum/* ColumnType */.$.data && column.filter;
                    var control = hasFilter && !independent_1 ? _this.createColumnFilter(column) : null;
                    if (control)
                        content.append(control);
                    else
                        content.append(title);
                    if (column.type === src_enum/* ColumnType */.$.data && column.sort) {
                        var current_1 = ((_b = _this.process.sortInfo) === null || _b === void 0 ? void 0 : _b.column) === column ? _this.process.sortInfo.sort : null;
                        var ascending_1 = current_1 === "asc";
                        th.setAttribute("aria-sort", current_1 === "asc" ? "ascending" : current_1 === "desc" ? "descending" : "none");
                        var sort = _this.iconButton(!current_1 ? "sortIcon" : ascending_1 ? "arrowUpIcon" : "arrowDownIcon", "".concat(_this.label("sort", "مرتب‌سازی"), " ").concat(_this.columnTitle(column)), function () {
                            _this.process.sortInfo = current_1 === "desc" ? null : { column: column, sort: ascending_1 ? "desc" : "asc" };
                            _this.process.applyUserAction(_this.headerFilters ? "text" : "select");
                        });
                        sort.className = "sort-button";
                        content.append(sort);
                    }
                    th.append(content);
                }
                headings_1.append(th);
            });
            if (this.presentation.rowActions)
                headings_1.append(MaterialTemplate_element("th", "action-cell", this.label("actions", "عملیات")));
            head.append(headings_1);
            if (independent_1 && filtering) {
                var filters_1 = MaterialTemplate_element("tr", "header-filters-row");
                filters_1.hidden = this.presentation.showHeaderFilters === false;
                this.columns.forEach(function (column) {
                    var cell = MaterialTemplate_element("td");
                    if (column.name)
                        cell.dataset.filterColumn = column.name;
                    if (column.type === src_enum/* ColumnType */.$.data && column.filter)
                        cell.append(_this.createHeaderFilterField(column));
                    filters_1.append(cell);
                });
                if (this.presentation.rowActions)
                    filters_1.append(MaterialTemplate_element("td"));
                head.append(filters_1);
            }
            body = MaterialTemplate_element("tbody");
            table.append(head, body);
            wrapper.append(table);
        }
        rows.forEach(function (row) {
            row._uiElement = null;
            body.append(row.uiElement);
        });
        this.body.replaceChildren(wrapper);
        if (view === "table")
            wrapper.scrollLeft = scrollLeft;
        if (focusKey) {
            var input = Array.from(this.body.querySelectorAll(".header-filter"))
                .find(function (input) { return input.dataset.columnFilter === focusKey; });
            input === null || input === void 0 ? void 0 : input.focus({ preventScroll: true });
            if (input instanceof HTMLInputElement && selection)
                input.setSelectionRange(selection[0], selection[1]);
        }
        if (!rows.length && this.owner.options.noData) {
            var empty = MaterialTemplate_element("div", "empty-state");
            empty.append(this.icon("emptyIcon"), MaterialTemplate_element("strong", "", this.label("emptyTitle", "نتیجه‌ای پیدا نشد")), MaterialTemplate_element("span", "", this.label("emptyMessage", "جستجو یا فیلترهای خود را تغییر دهید.")));
            if (typeof this.owner.options.noData === "string")
                empty.textContent = this.owner.options.noData;
            if (typeof this.owner.options.noData === "function") {
                var cell = MaterialTemplate_element("td");
                this.owner.options.noData(cell);
                empty.replaceChildren.apply(empty, Array.from(cell.childNodes));
            }
            wrapper.append(empty);
        }
        this.syncSelection();
    };
    MaterialTemplate.prototype.createHeaderFilterField = function (column) {
        var _this = this;
        var field = MaterialTemplate_element("div", "header-filter-field");
        var control = this.createColumnFilter(column);
        var clear = this.iconButton("closeIcon", "".concat(this.label("clearFilter", "پاک کردن فیلتر"), " ").concat(this.columnTitle(column)), function () {
            var _a;
            control.value = "";
            control.dispatchEvent(new Event(control instanceof HTMLSelectElement ? "change" : "input", { bubbles: true }));
            (_a = Array.from(_this.body.querySelectorAll("[data-column-filter]"))
                .find(function (input) { return input.dataset.columnFilter === column.name; })) === null || _a === void 0 ? void 0 : _a.focus({ preventScroll: true });
        });
        clear.classList.add("clear-header-filter");
        var sync = function () { clear.style.display = control.value ? "" : "none"; };
        control.addEventListener("input", sync);
        control.addEventListener("change", sync);
        sync();
        field.append(control, clear);
        return field;
    };
    MaterialTemplate.prototype.createColumnFilter = function (column, inPanel) {
        var _this = this;
        var _a, _b, _c;
        if (inPanel === void 0) { inPanel = false; }
        var typed = this.filterMode !== "header";
        var select = typed && ((_a = column.filterData) === null || _a === void 0 ? void 0 : _a.type) === "select";
        var control = select ? MaterialTemplate_element("select", "header-filter") : MaterialTemplate_element("input", "header-filter");
        if (control instanceof HTMLSelectElement) {
            control.append(new Option(this.label("all", "همه"), ""));
            this.filterValues(column).forEach(function (value) { return control.append(new Option(String(value.value), String(value.id))); });
        }
        else {
            control.type = typed && ((_b = column.filterData) === null || _b === void 0 ? void 0 : _b.inputType) === "date" ? "date" : typed ? "search" : "text";
            if (typed && ((_c = column.filterData) === null || _c === void 0 ? void 0 : _c.inputType) === "number")
                control.inputMode = "decimal";
            control.placeholder = typed ? this.label("columnSearch", "جستجو...") : this.columnTitle(column);
        }
        control.setAttribute("aria-label", this.columnTitle(column));
        if (inPanel)
            control.dataset.panelFilter = column.name;
        else
            control.dataset.columnFilter = column.name;
        this.restoreFilterValue(control, column.name);
        var apply = function () {
            if (typeof _this.process.filter !== "object")
                _this.process.filter = {};
            if (control.value)
                _this.process.filter[column.name] = control.value.toLowerCase();
            else
                delete _this.process.filter[column.name];
            _this.process.pageNumber = 0;
            _this.updateFilterButton();
            _this.process.applyUserAction("text");
        };
        if (select)
            control.addEventListener("change", apply);
        else {
            control.addEventListener("input", function (event) { if (!event.isComposing)
                apply(); });
            control.addEventListener("compositionend", apply);
        }
        return control;
    };
    MaterialTemplate.prototype.cell = function (row, column, tag) {
        var _a;
        var _b;
        if (tag === void 0) { tag = "div"; }
        var cell = MaterialTemplate_element(tag);
        var value = row._dataProxy[column.name];
        cell.setAttribute("data-bc-data", "");
        if (column.cellMaker)
            cell.innerHTML = (_b = column.cellMaker(row.data, value, cell)) !== null && _b !== void 0 ? _b : String(value !== null && value !== void 0 ? value : "");
        else
            cell.textContent = String(value !== null && value !== void 0 ? value : "—");
        if (column.cssClass)
            (_a = cell.classList).add.apply(_a, (Array.isArray(column.cssClass) ? column.cssClass : [column.cssClass]));
        return cell;
    };
    MaterialTemplate.prototype.checkbox = function (row) {
        var _this = this;
        var _a;
        var checked = row.selected;
        row._checkBox = MaterialTemplate_element("input");
        row._checkBox.type = this.owner.options.selectable === "single" ? "radio" : "checkbox";
        row._checkBox.name = this.owner.id;
        row._checkBox.checked = checked;
        row._checkBox.setAttribute("aria-label", "".concat(this.label("select", "انتخاب"), " ").concat((_a = row.data.id) !== null && _a !== void 0 ? _a : row.order));
        row._checkBox.addEventListener("change", function () {
            if (_this.owner.options.selectable === "single")
                _this.owner.setSelectedRows([row.data]);
            else
                _this.owner.onSelectionChange();
        });
        return row._checkBox;
    };
    MaterialTemplate.prototype.createRow = function (row) {
        var _this = this;
        var _a, _b, _c, _d, _e, _f;
        var view = this.presentation.view || "table";
        var action = function () { return _this.iconButton("moreIcon", _this.label(view === "table" ? "editRow" : view === "grid" ? "cardOptions" : "rowOptions", view === "table" ? "ویرایش ردیف" : view === "grid" ? "گزینه‌های کارت" : "گزینه‌های ردیف"), function () { var _a, _b; return (_b = (_a = _this.presentation).onRowAction) === null || _b === void 0 ? void 0 : _b.call(_a, row.data); }); };
        if (view === "table") {
            var tr_1 = MaterialTemplate_element("tr", row.selected ? "selected-row" : "");
            tr_1.setAttribute("data-sys-tr", "");
            this.columns.forEach(function (column) {
                if (column.type === src_enum/* ColumnType */.$.select) {
                    var td = MaterialTemplate_element("td", "check-cell");
                    td.setAttribute("data-bc-select", "");
                    td.append(_this.checkbox(row));
                    tr_1.append(td);
                }
                else if (column.type === src_enum/* ColumnType */.$.sort) {
                    var order = MaterialTemplate_element("td", "", String(row.order));
                    order.setAttribute("data-bc-order", "");
                    tr_1.append(order);
                }
                else
                    tr_1.append(_this.cell(row, column, "td"));
            });
            if (this.presentation.rowActions) {
                var cell = MaterialTemplate_element("td", "action-cell");
                cell.append(action());
                tr_1.append(cell);
            }
            return tr_1;
        }
        var columns = this.dataColumns;
        var titleKey = this.presentation.titleKey || ((_a = columns[0]) === null || _a === void 0 ? void 0 : _a.name);
        var subtitleKey = this.presentation.subtitleKey || ((_b = columns[1]) === null || _b === void 0 ? void 0 : _b.name);
        var image = columns.find(function (column) { return column.name === _this.presentation.imageKey; });
        var badge = columns.find(function (column) { return column.name === _this.presentation.badgeKey; });
        var title = String((_d = (_c = row._dataProxy[titleKey]) !== null && _c !== void 0 ? _c : row.data[titleKey]) !== null && _d !== void 0 ? _d : this.label("untitled", "بدون عنوان"));
        var subtitle = String((_f = (_e = row._dataProxy[subtitleKey]) !== null && _e !== void 0 ? _e : row.data[subtitleKey]) !== null && _f !== void 0 ? _f : "");
        if (view === "mobile") {
            var item = MaterialTemplate_element("article", "mobile-row");
            var heading_1 = MaterialTemplate_element("div", "mobile-row-heading");
            if (this.owner.options.selectable && this.owner.options.selectable !== "none") {
                var select = MaterialTemplate_element("label", "mobile-row-select");
                select.append(this.checkbox(row));
                heading_1.append(select);
            }
            var copy_1 = MaterialTemplate_element("div", "mobile-row-copy");
            var operation_1 = columns.find(function (column) { return column.name === "operation"; });
            var fields = columns.filter(function (column) { return column !== operation_1; });
            var firstColumn_1 = fields.find(function (column) { return column.name === _this.presentation.titleKey; }) || fields[0];
            var badgeColumn_1 = fields.find(function (column) { return column.name === _this.presentation.badgeKey && column !== firstColumn_1; });
            if (firstColumn_1) {
                var title_1 = MaterialTemplate_element("h3");
                title_1.append.apply(title_1, Array.from(this.cell(row, firstColumn_1).childNodes));
                copy_1.dataset.mobilePrimary = firstColumn_1.name;
                copy_1.append(MaterialTemplate_element("span", "mobile-field-label", this.columnTitle(firstColumn_1)), title_1);
            }
            heading_1.append(copy_1);
            var trailing = MaterialTemplate_element("div", "mobile-row-trailing");
            if (badgeColumn_1) {
                var status_1 = this.cell(row, badgeColumn_1);
                status_1.classList.add("mobile-row-badge");
                status_1.dataset.mobileBadge = badgeColumn_1.name;
                status_1.setAttribute("role", "group");
                status_1.setAttribute("aria-label", this.columnTitle(badgeColumn_1));
                trailing.append(status_1);
            }
            if (operation_1 || this.presentation.rowActions) {
                var actions = MaterialTemplate_element("div", "mobile-row-actions");
                if (operation_1) {
                    actions.dataset.mobileOperation = operation_1.name;
                    actions.append(this.cell(row, operation_1));
                }
                else
                    actions.append(action());
                trailing.append(actions);
            }
            if (trailing.hasChildNodes())
                heading_1.append(trailing);
            item.append(heading_1);
            var data_1 = MaterialTemplate_element("dl", "mobile-row-fields");
            fields.filter(function (column) { return ![firstColumn_1, badgeColumn_1].includes(column); }).forEach(function (column) {
                var field = MaterialTemplate_element("div");
                field.dataset.mobileField = column.name;
                var value = MaterialTemplate_element("dd");
                value.append(_this.cell(row, column));
                field.append(MaterialTemplate_element("dt", "", _this.columnTitle(column)), value);
                data_1.append(field);
            });
            item.append(data_1);
            return item;
        }
        if (view === "list") {
            var item = MaterialTemplate_element("div", "list-item");
            if (this.owner.options.selectable && this.owner.options.selectable !== "none")
                item.append(this.checkbox(row));
            if (image)
                item.append.apply(item, Array.from(this.cell(row, image).childNodes));
            else
                item.append(MaterialTemplate_element("span", "list-index", String(row.order).padStart(2, "۰")));
            var copy_2 = MaterialTemplate_element("div", "list-copy");
            copy_2.append(MaterialTemplate_element("strong", "", title), MaterialTemplate_element("span", "", subtitle));
            var trailing = MaterialTemplate_element("div", "list-trailing");
            if (badge)
                trailing.append.apply(trailing, Array.from(this.cell(row, badge).childNodes));
            if (this.presentation.rowActions)
                trailing.append(action());
            item.append(copy_2, trailing);
            return item;
        }
        var card = MaterialTemplate_element("article", "data-card");
        if (image) {
            var picture = MaterialTemplate_element("div", "card-image");
            picture.append.apply(picture, Array.from(this.cell(row, image).childNodes));
            card.append(picture);
        }
        var body = MaterialTemplate_element("div", "card-body");
        var heading = MaterialTemplate_element("div", "card-heading");
        var copy = MaterialTemplate_element("div");
        copy.append(MaterialTemplate_element("h3", "", title), MaterialTemplate_element("p", "", subtitle));
        heading.append(copy);
        if (this.presentation.rowActions)
            heading.append(action());
        body.append(heading);
        if (badge)
            body.append.apply(body, Array.from(this.cell(row, badge).childNodes));
        var meta = MaterialTemplate_element("div", "card-meta");
        columns.filter(function (column) { return ![titleKey, subtitleKey, image === null || image === void 0 ? void 0 : image.name].includes(column.name); }).slice(0, 3).forEach(function (column) {
            var field = MaterialTemplate_element("div");
            var value = MaterialTemplate_element("strong");
            value.append.apply(value, Array.from(_this.cell(row, column).childNodes));
            field.append(MaterialTemplate_element("span", "", _this.columnTitle(column)), value);
            meta.append(field);
        });
        body.append(meta);
        card.append(body);
        return card;
    };
    MaterialTemplate.prototype.syncSelection = function (count) {
        count = count !== null && count !== void 0 ? count : this.owner.getSelectedRows().length;
        var mobile = this.presentation.view === "mobile";
        var number = mobile ? count.toLocaleString(this.owner.options.direction === "rtl" ? "fa-IR" : "en-US") : String(count);
        this.selectedCount.textContent = "".concat(number, " ").concat(this.label("selectedItems", "مورد انتخاب شده"));
        this.selectedCount.style.display = count && this.owner.options.selectable && this.owner.options.selectable !== "none" ? "" : "none";
        this.clearSelection.style.display = this.selectedCount.style.display;
        this.selectionSummary.style.display = this.selectedCount.style.display;
        this.mobileBulkActions.hidden = !mobile || !count || !this.mobileBulkActions.hasChildNodes();
        this.mobileTools.hidden = !mobile || this.selectionSummary.style.display !== "none";
        this.rows.forEach(function (row) { var _a; return (_a = row._uiElement) === null || _a === void 0 ? void 0 : _a.classList.toggle("selected-row", row.selected); });
        this.mobileSelectAll.checked = this.rows.length > 0 && this.rows.every(function (row) { return row.selected; });
        this.mobileSelectAll.indeterminate = this.rows.some(function (row) { return row.selected; }) && !this.mobileSelectAll.checked;
        this.mobileSelectAll.disabled = !this.rows.length;
        var checkbox = this.body.querySelector('thead input[type="checkbox"]');
        if (checkbox)
            checkbox.checked = this.rows.length > 0 && this.rows.every(function (row) { return row.selected; });
        if (checkbox)
            checkbox.indeterminate = this.rows.some(function (row) { return row.selected; }) && !checkbox.checked;
        this.updateToolbarVisibility();
    };
    return MaterialTemplate;
}());
/* harmony default export */ const grid_MaterialTemplate = (MaterialTemplate);


/***/ }),

/***/ 188:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _PaginateProcessManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(783);
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var ClientProcess = /** @class */ (function (_super) {
    __extends(ClientProcess, _super);
    function ClientProcess(owner, pageSizeContainer, pagingContainer, pagingInpit) {
        return _super.call(this, owner, pageSizeContainer, pagingContainer, pagingInpit) || this;
    }
    return ClientProcess;
}(_PaginateProcessManager__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ClientProcess);


/***/ }),

/***/ 414:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _PaginateProcessManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(783);
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var MixedProcess = /** @class */ (function (_super) {
    __extends(MixedProcess, _super);
    function MixedProcess(owner, pageSizeContainer, pagingContainer, pageingInput) {
        return _super.call(this, owner, pageSizeContainer, pagingContainer, pageingInput) || this;
    }
    MixedProcess.prototype.setSource = function (rows, options) {
        var _this = this;
        this.originalData = rows;
        this.options = options;
        if (this.owner.options.ProcessActionType.paging == "client") {
            rows.forEach(function (row, i) { return row.setOrder(i); });
            _super.prototype.displayRows.call(this, this.originalData);
        }
        else {
            rows.forEach(function (row, i) { var _a, _b; return row.setOrder(i + ((_b = (_a = _this.options) === null || _a === void 0 ? void 0 : _a.from) !== null && _b !== void 0 ? _b : 0)); });
            this.displayRows(rows);
        }
    };
    MixedProcess.prototype.displayRows = function (rows) {
        this.filteredData = rows;
        this.totalRows = this.options.total;
        this.pageNumber = Math.floor(this.options.from / this.pageSize);
        this.updatePaging();
        this.updateState();
        var from = this.options.from + 1;
        var to = this.options.from + rows.length;
        this.owner.displayRows(rows, from, to, this.totalRows);
    };
    MixedProcess.prototype.displayCurrentPage = function () {
        if (this.owner.options.ProcessActionType.paging == "server") {
            this.owner.tryLoadData();
        }
        else {
            _super.prototype.displayCurrentPage.call(this);
        }
    };
    MixedProcess.prototype.applyUserAction = function (type) {
        if (this.owner.options.ProcessActionType.sort == "client" && this.owner.options.ProcessActionType.search == "client") {
            _super.prototype.applyUserAction.call(this, type);
        }
        else {
            this.owner.tryLoadData();
        }
    };
    return MixedProcess;
}(_PaginateProcessManager__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MixedProcess);


/***/ }),

/***/ 92:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ProcessManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(166);
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var NoPaginateProcessManager = /** @class */ (function (_super) {
    __extends(NoPaginateProcessManager, _super);
    function NoPaginateProcessManager(owner) {
        return _super.call(this, owner) || this;
    }
    return NoPaginateProcessManager;
}(_ProcessManager__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (NoPaginateProcessManager);


/***/ }),

/***/ 783:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ProcessManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(166);
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var PaginateProcessManager = /** @class */ (function (_super) {
    __extends(PaginateProcessManager, _super);
    function PaginateProcessManager(owner, pageSizeContainer, pagingContainer, pagingInput) {
        var _this = _super.call(this, owner) || this;
        _this.pageSizeContainer = pageSizeContainer;
        _this.pagingContainer = pagingContainer;
        _this.pagingInput = pagingInput;
        _this.initializeUI();
        return _this;
    }
    PaginateProcessManager.prototype.displayRows = function (rows) {
        this.filteredData = rows;
        this.totalRows = rows.length;
        this.pageNumber =
            this.pageNumber == -1
                ? this.owner.options.pageNumber - 1
                : this.pageNumber
                    ? this.pageNumber
                    : 0;
        this.updatePaging();
        this.displayCurrentPage();
    };
    PaginateProcessManager.prototype.displayCurrentPage = function () {
        var fromId = this.pageNumber * this.pageSize;
        var toId = fromId + this.pageSize;
        this.updateState();
        var rows = this.filteredData.filter(function (row) { return row.order > fromId && row.order <= toId; });
        var from = fromId + 1;
        var to = fromId + rows.length;
        var total = this.filteredData.length;
        _super.prototype.displayRows.call(this, rows, from, to, total);
        this.owner.resetSelectAll();
    };
    PaginateProcessManager.prototype.updatePaging = function () {
        var _this = this;
        var _a;
        this.totalPage =
            Math.floor(this.totalRows / this.pageSize) +
                (Math.ceil(this.totalRows % this.pageSize) > 0 ? 1 : 0);
        if (((_a = this.owner.options.culture) === null || _a === void 0 ? void 0 : _a.template) === "template4") {
            this.totalPage = Math.max(1, this.totalPage);
        }
        this.pageNumber = Math.min(this.pageNumber, this.totalPage - 1);
        this.pageButtonsContainer.innerHTML = "";
        var pageSideCount = Math.floor(this.owner.options.pageCount / 2);
        var startPage = Math.max(0, this.pageNumber - pageSideCount);
        var endPage = Math.min(this.totalPage, startPage + this.owner.options.pageCount);
        this.remainFromStart = startPage != 0;
        this.remainFromEnd = endPage != this.totalPage;
        var _loop_1 = function (i) {
            var page = document.createElement("a");
            if (i === startPage) {
                page.setAttribute("data-bc-first", "");
            }
            if (i === endPage - 1) {
                page.setAttribute("data-bc-last", "");
            }
            page.appendChild(document.createTextNode((i + 1).toString()));
            page.setAttribute("data-bc-page", i.toString());
            page.addEventListener("click", function (e) {
                _this.pageNo.value = "";
                _this.pageNumber = i;
                _this.displayCurrentPage();
                if (_this.owner.options.pagingAction) {
                    _this.owner.options.pagingAction(page, i + 1);
                }
            });
            this_1.pageButtonsContainer.append(page);
        };
        var this_1 = this;
        for (var i = startPage; i < endPage; i++) {
            _loop_1(i);
        }
    };
    PaginateProcessManager.prototype.initializeUI = function () {
        var _this = this;
        var _a;
        if (Array.isArray(this.owner.options.paging)) {
            var label = document.createElement("label");
            label.setAttribute("data-sys-text-colorful", "");
            label.appendChild(document.createTextNode(this.owner.options.culture.labels.pageSize));
            var select_1 = document.createElement("select");
            select_1.setAttribute("data-sys-text-colorful", "");
            (_a = this.owner.options.paging) === null || _a === void 0 ? void 0 : _a.forEach(function (pageSize, index) {
                var option = document.createElement("option");
                var value = pageSize.toString();
                option.selected = index == _this.owner.options.defaultPagingIndex;
                option.appendChild(document.createTextNode(value));
                option.setAttribute("value", value);
                select_1.appendChild(option);
            });
            select_1.addEventListener("change", function (x) {
                _this.pageNo.value = "";
                var newSize = parseInt(x.target.value);
                if (_this.pageSize != newSize) {
                    _this.pageSize = newSize;
                    _this.pageSizeChange();
                }
            });
            label.appendChild(select_1);
            this.pageSizeContainer.appendChild(label);
            this.pageSize =
                this.owner.options.paging[this.owner.options.defaultPagingIndex];
        }
        else {
            this.pageSize = this.owner.options.paging;
        }
        this.pageNo = document.createElement("input");
        this.pageNo.setAttribute("type", "text");
        // this.pageNo.setAttribute("data-sys-input-text", "");
        this.pageNo.setAttribute("data-bc-page-number", "");
        this.pageNo.setAttribute("placeHolder", "14");
        this.pageNo.addEventListener("keyup", function (e) {
            e.preventDefault();
            if (_this.pageNo.value.length > 0) {
                _this.pageNumber = parseInt(_this.pageNo.value) - 1;
                _this.displayCurrentPage();
            }
        });
        this.previousButton = document.createElement("a");
        this.previousButton.innerHTML = this.owner.options.culture.labels.previous;
        this.previousButton.addEventListener("click", function (e) {
            e.preventDefault();
            _this.pageNo.value = "";
            if (_this.pageNumber > 0) {
                _this.pageNumber -= 1;
                _this.displayCurrentPage();
            }
        });
        if (this.owner.options.firstAndLastBtn) {
            this.firstButton = document.createElement("a");
            this.firstButton.innerHTML = this.owner.options.culture.labels.first;
            this.firstButton.addEventListener("click", function (e) {
                e.preventDefault();
                _this.pageNo.value = "";
                _this.pageNumber = 0;
                _this.displayCurrentPage();
            });
            this.lastButton = document.createElement("a");
            this.lastButton.innerHTML = this.owner.options.culture.labels.last;
            this.lastButton.addEventListener("click", function (e) {
                e.preventDefault();
                _this.pageNo.value = "";
                _this.pageNumber = _this.totalPage - 1;
                _this.displayCurrentPage();
            });
        }
        this.pageButtonsContainer = document.createElement("span");
        this.nextButton = document.createElement("a");
        this.nextButton.innerHTML = this.owner.options.culture.labels.next;
        this.nextButton.addEventListener("click", function (e) {
            e.preventDefault();
            _this.pageNo.value = "";
            if (_this.pageNumber + 1 < _this.totalPage) {
                _this.pageNumber += 1;
                _this.displayCurrentPage();
            }
        });
        if (this.firstButton) {
            this.pagingContainer.appendChild(this.firstButton);
        }
        this.pagingContainer.appendChild(this.previousButton);
        this.pagingContainer.appendChild(this.pageButtonsContainer);
        this.pagingContainer.appendChild(this.nextButton);
        if (this.lastButton) {
            this.pagingContainer.appendChild(this.lastButton);
        }
        this.pagingContainer.appendChild(this.pageNo);
        var lblText = document.createElement("label");
        lblText.textContent = this.owner.options.culture.labels.goto;
        this.pagingInput.appendChild(lblText);
        this.pagingInput.appendChild(this.pageNo);
        this.updateState();
        this.pageNumber = -1;
    };
    PaginateProcessManager.prototype.updateState = function () {
        var _this = this;
        var _a, _b, _c, _d, _e, _f;
        this.nextButton.setAttribute("data-bc-next", "");
        this.nextButton.setAttribute("data-sys-previous-next", "");
        this.nextButton.setAttribute("data-bc-status", this.pageNumber + 1 >= this.totalPage ? "disabled" : "");
        (_a = this.lastButton) === null || _a === void 0 ? void 0 : _a.setAttribute("data-bc-end", "");
        (_b = this.lastButton) === null || _b === void 0 ? void 0 : _b.setAttribute("data-sys-start-end", "");
        (_c = this.lastButton) === null || _c === void 0 ? void 0 : _c.setAttribute("data-bc-status", this.pageNumber + 1 >= this.totalPage ? "disabled" : "");
        this.previousButton.setAttribute("data-bc-previous", "");
        this.previousButton.setAttribute("data-sys-previous-next", "");
        this.previousButton.setAttribute("data-bc-status", this.pageNumber <= 0 ? "disabled" : "");
        (_d = this.firstButton) === null || _d === void 0 ? void 0 : _d.setAttribute("data-bc-start", "");
        (_e = this.firstButton) === null || _e === void 0 ? void 0 : _e.setAttribute("data-sys-start-end", "");
        (_f = this.firstButton) === null || _f === void 0 ? void 0 : _f.setAttribute("data-bc-status", this.pageNumber <= 0 ? "disabled" : "");
        var pageBtn = this.pageButtonsContainer.querySelector("[data-bc-page='".concat(this.pageNumber, "']"));
        if (!pageBtn ||
            (pageBtn.hasAttribute("data-bc-last") && this.remainFromEnd) ||
            (pageBtn.hasAttribute("data-bc-first") && this.remainFromStart)) {
            this.updatePaging();
        }
        this.pageButtonsContainer
            .querySelectorAll("[data-bc-page]")
            .forEach(function (x) {
            var pageId = parseInt(x.getAttribute("data-bc-page"));
            if (_this.pageNumber === pageId) {
                x.setAttribute("data-bc-current", "true");
                x.setAttribute("data-sys-paging-pageNo", "true");
                x.setAttribute("data-sys-paging-active", "");
            }
            else {
                x.setAttribute("data-bc-current", "false");
                x.setAttribute("data-sys-paging-pageNo", "false");
                x.removeAttribute("data-sys-paging-active");
            }
        });
    };
    PaginateProcessManager.prototype.pageSizeChange = function () {
        this.updatePaging();
        this.displayCurrentPage();
    };
    return PaginateProcessManager;
}(_ProcessManager__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PaginateProcessManager);


/***/ }),

/***/ 166:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _grid_GridRow__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(60);

var ProcessManager = /** @class */ (function () {
    function ProcessManager(owner) {
        this.filter = "";
        this.owner = owner;
    }
    ProcessManager.prototype.setSource = function (data, options) {
        this.originalData = data;
        this.options = options;
        this.applyUserAction();
    };
    ProcessManager.prototype.applyFilterAndSort = function (type) {
        var _this = this;
        var _a, _b, _c, _d;
        var rows = this.originalData;
        if (this.owner.options.filter === "simple" && ((_a = this.filter) === null || _a === void 0 ? void 0 : _a.length) > 0) {
            rows = rows.filter(function (x) { return x.acceptableBySimpleFilter(_this.filter); });
        }
        else if ((this.owner.options.filter === "row" || ((_b = this.owner.options.culture) === null || _b === void 0 ? void 0 : _b.template) === "template4" && this.owner.options.filter === "advanced") &&
            this.filter &&
            Reflect.ownKeys(this.filter).length > 0) {
            rows = rows.filter(function (x) { return x.acceptableByRowFilter(_this.filter, type); });
        }
        if (this.sortInfo) {
            if (((_c = this.owner.options.culture) === null || _c === void 0 ? void 0 : _c.template) === "template4")
                rows = rows.slice();
            rows = rows.sort(function (a, b) { return _grid_GridRow__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.compare(a, b, _this.sortInfo); });
        }
        if (((_d = this.owner.options.culture) === null || _d === void 0 ? void 0 : _d.template) === "template4" && this.query) {
            rows = rows.filter(function (row) { return row.acceptableBySimpleFilter(_this.query); });
        }
        rows.forEach(function (row, i) { return row.setOrder(i); });
        return rows;
    };
    ProcessManager.prototype.applyUserAction = function (type) {
        var _a;
        var rows = this.applyFilterAndSort(type);
        var total = (_a = rows === null || rows === void 0 ? void 0 : rows.length) !== null && _a !== void 0 ? _a : 0;
        var from = this.options && this.options.from
            ? this.options.from
            : (rows === null || rows === void 0 ? void 0 : rows.length) > 0
                ? rows[0].order
                : 0;
        var to = from + total;
        this.displayRows(rows, from, to, total);
    };
    ProcessManager.prototype.displayRows = function (rows, from, to, total) {
        this.owner.displayRows(rows, Math.max(from, 0), Math.max(to, 0), total);
    };
    return ProcessManager;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ProcessManager);


/***/ }),

/***/ 636:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _PaginateProcessManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(783);
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var ServerProcess = /** @class */ (function (_super) {
    __extends(ServerProcess, _super);
    function ServerProcess(owner, pageSizeContainer, pagingContainer, pagingInput) {
        return _super.call(this, owner, pageSizeContainer, pagingContainer, pagingInput) || this;
    }
    ServerProcess.prototype.setSource = function (rows, options) {
        var _this = this;
        this.originalData = rows;
        this.options = options;
        rows.forEach(function (row, i) { var _a, _b; return row.setOrder(i + ((_b = (_a = _this.options) === null || _a === void 0 ? void 0 : _a.from) !== null && _b !== void 0 ? _b : 0)); });
        this.displayRows(rows);
    };
    ServerProcess.prototype.displayRows = function (rows) {
        this.filteredData = rows;
        this.totalRows = this.options.total;
        this.pageNumber = Math.floor(this.options.from / this.pageSize);
        this.updatePaging();
        this.updateState();
        var from = this.options.from + 1;
        var to = this.options.from + rows.length;
        this.owner.displayRows(rows, from, to, this.totalRows);
    };
    ServerProcess.prototype.displayCurrentPage = function () {
        this.owner.tryLoadData();
    };
    ServerProcess.prototype.applyUserAction = function () {
        this.owner.tryLoadData();
    };
    return ServerProcess;
}(_PaginateProcessManager__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ServerProcess);


/***/ }),

/***/ 503:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $: () => (/* binding */ ColumnType)
/* harmony export */ });
var ColumnType;
(function (ColumnType) {
    ColumnType[ColumnType["data"] = 0] = "data";
    ColumnType[ColumnType["sort"] = 1] = "sort";
    ColumnType[ColumnType["select"] = 2] = "select";
})(ColumnType || (ColumnType = {}));


/***/ }),

/***/ 303:
/***/ ((module) => {

"use strict";
module.exports = "data:image/gif;base64,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";

/***/ }),

/***/ 743:
/***/ ((module) => {

"use strict";
module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAMBAMAAABcu7ojAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAABJQTFRFAAAAAEqHAEuFAEyDAEqFAEuEram7sgAAAAZ0Uk5TAH//gGCgmT+lsQAAAB5JREFUeJxjYBBkYGBgVBJgYBAyUWRgMGZwZSAWAAA17QEkzz0KIgAAAABJRU5ErkJggg==";

/***/ }),

/***/ 475:
/***/ ((module) => {

"use strict";
module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAMCAYAAACulacQAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAACCSURBVHgBxY9BDkRAEEV/mbnK3MNmNriDk4gWwdYNcAdbC+ewcRC6dFdHExfwkko6/V8q9YGTqMllbnx8QFqBOMTvDyzT7EIf6AJMgxHaU/gi2MhIBcZMuS0VQHuI13j2i+sUcdXZp7uWAyuYK3kFuJdaBhI7KZUI8qOvWh4r2LlxAEi1Ly+jrCyzAAAAAElFTkSuQmCC";

/***/ }),

/***/ 505:
/***/ ((module) => {

"use strict";
module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAMBAMAAABcu7ojAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAABVQTFRFAAAAAEyDAEqHAEuGAEuFAEyDAEuFvebr3QAAAAd0Uk5TAAt/X5+A/zeB+noAAAAhSURBVHicY2BABQIMOIASgwkDQ5hyKgMDa1oAkB/KwAAAGrkCVUVutJsAAAAASUVORK5CYII=";

/***/ }),

/***/ 366:
/***/ ((module) => {

"use strict";
module.exports = "data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" viewBox=\"0,0,256,256\" width=\"50px\" height=\"50px\" fill-rule=\"nonzero\"><g fill=\"%23004b85\" fill-rule=\"nonzero\" stroke=\"none\" stroke-width=\"1\" stroke-linecap=\"butt\" stroke-linejoin=\"miter\" stroke-miterlimit=\"10\" stroke-dasharray=\"\" stroke-dashoffset=\"0\" font-family=\"none\" font-weight=\"none\" font-size=\"none\" text-anchor=\"none\" style=\"mix-blend-mode: normal\"><g transform=\"scale%285.12,5.12%29\"><path d=\"M21,3c-9.39844,0 -17,7.60156 -17,17c0,9.39844 7.60156,17 17,17c3.35547,0 6.46094,-0.98437 9.09375,-2.65625l12.28125,12.28125l4.25,-4.25l-12.125,-12.09375c2.17969,-2.85937 3.5,-6.40234 3.5,-10.28125c0,-9.39844 -7.60156,-17 -17,-17zM21,7c7.19922,0 13,5.80078 13,13c0,7.19922 -5.80078,13 -13,13c-7.19922,0 -13,-5.80078 -13,-13c0,-7.19922 5.80078,-13 13,-13z\"></path></g></g></svg>";

/***/ }),

/***/ 869:
/***/ ((module) => {

"use strict";
module.exports = "<section data-bc-filter=\"\">\n  <div data-bc-filter-btn-wrapper=\"\">\n    <div data-bc-filter-btn=\"\">\n      <span data-bc-filter-btn-line=\"line1\"></span>\n      <span data-bc-filter-btn-line=\"line2\"></span>\n      <span data-bc-filter-btn-line=\"line3\"></span>\n    </div>\n  </div>\n  <ul data-bc-filter-items=\"\">\n\n  </ul>\n</section>";

/***/ }),

/***/ 214:
/***/ ((module) => {

"use strict";
module.exports = /*#__PURE__*/JSON.parse('{"searchIcon":"<svg xmlns=\\"http://www.w3.org/2000/svg\\" width=\\"18\\" height=\\"18\\" viewBox=\\"0 0 24 24\\" fill=\\"none\\" stroke=\\"currentColor\\" stroke-width=\\"2\\" stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\"><circle cx=\\"11\\" cy=\\"11\\" r=\\"8\\"></circle><path d=\\"m21 21-4.3-4.3\\"></path></svg>","filterIcon":"<svg xmlns=\\"http://www.w3.org/2000/svg\\" width=\\"16\\" height=\\"16\\" viewBox=\\"0 0 24 24\\" fill=\\"none\\" stroke=\\"currentColor\\" stroke-width=\\"2\\" stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\"><polygon points=\\"22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3\\"></polygon></svg>","settingsIcon":"<svg xmlns=\\"http://www.w3.org/2000/svg\\" width=\\"18\\" height=\\"18\\" viewBox=\\"0 0 24 24\\" fill=\\"none\\" stroke=\\"currentColor\\" stroke-width=\\"2\\" stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\"><line x1=\\"21\\" x2=\\"14\\" y1=\\"4\\" y2=\\"4\\"></line><line x1=\\"10\\" x2=\\"3\\" y1=\\"4\\" y2=\\"4\\"></line><line x1=\\"21\\" x2=\\"12\\" y1=\\"12\\" y2=\\"12\\"></line><line x1=\\"8\\" x2=\\"3\\" y1=\\"12\\" y2=\\"12\\"></line><line x1=\\"21\\" x2=\\"16\\" y1=\\"20\\" y2=\\"20\\"></line><line x1=\\"12\\" x2=\\"3\\" y1=\\"20\\" y2=\\"20\\"></line><line x1=\\"14\\" x2=\\"14\\" y1=\\"2\\" y2=\\"6\\"></line><line x1=\\"8\\" x2=\\"8\\" y1=\\"10\\" y2=\\"14\\"></line><line x1=\\"16\\" x2=\\"16\\" y1=\\"18\\" y2=\\"22\\"></line></svg>","moreIcon":"<svg xmlns=\\"http://www.w3.org/2000/svg\\" width=\\"18\\" height=\\"18\\" viewBox=\\"0 0 24 24\\" fill=\\"none\\" stroke=\\"currentColor\\" stroke-width=\\"2\\" stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\"><circle cx=\\"12\\" cy=\\"12\\" r=\\"1\\"></circle><circle cx=\\"12\\" cy=\\"5\\" r=\\"1\\"></circle><circle cx=\\"12\\" cy=\\"19\\" r=\\"1\\"></circle></svg>","arrowUpIcon":"<svg xmlns=\\"http://www.w3.org/2000/svg\\" width=\\"14\\" height=\\"14\\" viewBox=\\"0 0 24 24\\" fill=\\"none\\" stroke=\\"currentColor\\" stroke-width=\\"2\\" stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\"><path d=\\"m5 12 7-7 7 7\\"></path><path d=\\"M12 19V5\\"></path></svg>","arrowDownIcon":"<svg xmlns=\\"http://www.w3.org/2000/svg\\" width=\\"14\\" height=\\"14\\" viewBox=\\"0 0 24 24\\" fill=\\"none\\" stroke=\\"currentColor\\" stroke-width=\\"2\\" stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\"><path d=\\"M12 5v14\\"></path><path d=\\"m19 12-7 7-7-7\\"></path></svg>","sortIcon":"<svg xmlns=\\"http://www.w3.org/2000/svg\\" width=\\"14\\" height=\\"14\\" viewBox=\\"0 0 24 24\\" fill=\\"none\\" stroke=\\"currentColor\\" stroke-width=\\"2\\" stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\"><path d=\\"m3 16 4 4 4-4\\"></path><path d=\\"M7 20V4\\"></path><path d=\\"m21 8-4-4-4 4\\"></path><path d=\\"M17 4v16\\"></path></svg>","previous":"<svg xmlns=\\"http://www.w3.org/2000/svg\\" width=\\"18\\" height=\\"18\\" viewBox=\\"0 0 24 24\\" fill=\\"none\\" stroke=\\"currentColor\\" stroke-width=\\"2\\" stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\"><path d=\\"m9 18 6-6-6-6\\"></path></svg>","next":"<svg xmlns=\\"http://www.w3.org/2000/svg\\" width=\\"18\\" height=\\"18\\" viewBox=\\"0 0 24 24\\" fill=\\"none\\" stroke=\\"currentColor\\" stroke-width=\\"2\\" stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\"><path d=\\"m15 18-6-6 6-6\\"></path></svg>","pagePreviousIcon":"<svg xmlns=\\"http://www.w3.org/2000/svg\\" width=\\"16\\" height=\\"16\\" viewBox=\\"0 0 24 24\\" fill=\\"none\\" stroke=\\"currentColor\\" stroke-width=\\"2\\" stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\"><path d=\\"m15 18-6-6 6-6\\"></path></svg>","pageNextIcon":"<svg xmlns=\\"http://www.w3.org/2000/svg\\" width=\\"16\\" height=\\"16\\" viewBox=\\"0 0 24 24\\" fill=\\"none\\" stroke=\\"currentColor\\" stroke-width=\\"2\\" stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\"><path d=\\"m9 18 6-6-6-6\\"></path></svg>","firstPageIcon":"<svg xmlns=\\"http://www.w3.org/2000/svg\\" width=\\"16\\" height=\\"16\\" viewBox=\\"0 0 24 24\\" fill=\\"none\\" stroke=\\"currentColor\\" stroke-width=\\"2\\" stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\"><path d=\\"m11 17-5-5 5-5\\"></path><path d=\\"m18 17-5-5 5-5\\"></path></svg>","lastPageIcon":"<svg xmlns=\\"http://www.w3.org/2000/svg\\" width=\\"16\\" height=\\"16\\" viewBox=\\"0 0 24 24\\" fill=\\"none\\" stroke=\\"currentColor\\" stroke-width=\\"2\\" stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\"><path d=\\"m6 17 5-5-5-5\\"></path><path d=\\"m13 17 5-5-5-5\\"></path></svg>","resultsIcon":"<svg xmlns=\\"http://www.w3.org/2000/svg\\" width=\\"20\\" height=\\"20\\" viewBox=\\"0 0 24 24\\" fill=\\"none\\" stroke=\\"currentColor\\" stroke-width=\\"2\\" stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\"><line x1=\\"10\\" x2=\\"21\\" y1=\\"6\\" y2=\\"6\\"></line><line x1=\\"10\\" x2=\\"21\\" y1=\\"12\\" y2=\\"12\\"></line><line x1=\\"10\\" x2=\\"21\\" y1=\\"18\\" y2=\\"18\\"></line><path d=\\"M4 6h1v4\\"></path><path d=\\"M4 10h2\\"></path><path d=\\"M6 18H4c0-1 2-2 2-3s-1-1.5-2-1\\"></path></svg>","emptyIcon":"<svg xmlns=\\"http://www.w3.org/2000/svg\\" width=\\"26\\" height=\\"26\\" viewBox=\\"0 0 24 24\\" fill=\\"none\\" stroke=\\"currentColor\\" stroke-width=\\"2\\" stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\"><circle cx=\\"11\\" cy=\\"11\\" r=\\"8\\"></circle><path d=\\"m21 21-4.3-4.3\\"></path></svg>","closeIcon":"<svg xmlns=\\"http://www.w3.org/2000/svg\\" width=\\"14\\" height=\\"14\\" viewBox=\\"0 0 24 24\\" fill=\\"none\\" stroke=\\"currentColor\\" stroke-width=\\"2\\" stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\"><path d=\\"M18 6 6 18\\"></path><path d=\\"m6 6 12 12\\"></path></svg>","helpIcon":"<svg xmlns=\\"http://www.w3.org/2000/svg\\" width=\\"18\\" height=\\"18\\" viewBox=\\"0 0 24 24\\" fill=\\"none\\" stroke=\\"currentColor\\" stroke-width=\\"2\\" stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\"><circle cx=\\"12\\" cy=\\"12\\" r=\\"10\\"></circle><path d=\\"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3\\"></path><path d=\\"M12 17h.01\\"></path></svg>","refreshIcon":"<svg xmlns=\\"http://www.w3.org/2000/svg\\" width=\\"16\\" height=\\"16\\" viewBox=\\"0 0 24 24\\" fill=\\"none\\" stroke=\\"currentColor\\" stroke-width=\\"2\\" stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\"><path d=\\"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8\\"></path><path d=\\"M21 3v5h-5\\"></path><path d=\\"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16\\"></path><path d=\\"M8 16H3v5\\"></path></svg>","downloadIcon":"<svg xmlns=\\"http://www.w3.org/2000/svg\\" width=\\"16\\" height=\\"16\\" viewBox=\\"0 0 24 24\\" fill=\\"none\\" stroke=\\"currentColor\\" stroke-width=\\"2\\" stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\"><path d=\\"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4\\"></path><polyline points=\\"7 10 12 15 17 10\\"></polyline><line x1=\\"12\\" x2=\\"12\\" y1=\\"15\\" y2=\\"3\\"></line></svg>"}');

/***/ }),

/***/ 524:
/***/ ((module) => {

"use strict";
module.exports = /*#__PURE__*/JSON.parse('[{"deviceId":1,"title":"Desktop"},{"deviceId":2,"title":"MobilePhone"},{"deviceId":4,"title":"Tablet"},{"deviceId":5,"title":"TV"},{"deviceId":6,"title":"Console"},{"deviceId":7,"title":"CarEntertainmentSystem"},{"deviceId":8,"title":"DigitalCamera"},{"deviceId":9,"title":"EbookReader"}]');

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
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
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
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			342: 0,
/******/ 			812: 0,
/******/ 			841: 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Grid: () => (/* reexport safe */ _component_grid_Grid__WEBPACK_IMPORTED_MODULE_0__.A),
/* harmony export */   grid: () => (/* reexport safe */ _ComponentLoader__WEBPACK_IMPORTED_MODULE_1__.grid)
/* harmony export */ });
/* harmony import */ var _component_grid_Grid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(797);
/* harmony import */ var _ComponentLoader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(132);




})();

grid = __webpack_exports__;
/******/ })()
;
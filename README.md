<!-- [![@coreui coreui](https://img.shields.io/badge/@coreui%20-coreui-lightgrey.svg?style=flat-square)](https://github.com/coreui/coreui)
[![npm package][npm-coreui-badge]][npm-coreui]
[![NPM downloads][npm-coreui-download]][npm-coreui]  
[![@coreui react](https://img.shields.io/badge/@coreui%20-react-lightgrey.svg?style=flat-square)](https://github.com/coreui/react)
[![npm package][npm-coreui-react-badge]][npm-coreui-react]
[![NPM downloads][npm-coreui-react-download]][npm-coreui-react]  
[![npm next][npm-next]][npm]

[npm-coreui]: https://www.npmjs.com/package/@coreui/coreui
[npm-coreui-badge]: https://img.shields.io/npm/v/@coreui/coreui.png?style=flat-square
[npm-coreui-download]: https://img.shields.io/npm/dm/@coreui/coreui.svg?style=flat-square
[npm-coreui-react]: https://www.npmjs.com/package/@coreui/react
[npm-coreui-react-badge]: https://img.shields.io/npm/v/@coreui/react.png?style=flat-square
[npm-coreui-react-download]: https://img.shields.io/npm/dm/@coreui/react.svg?style=flat-square
[npm-next]: https://img.shields.io/npm/v/@coreui/react/next.png?style=flat-square
[npm]: https://www.npmjs.com/package/@coreui/react

# CoreUI Free React Admin Template v3

CoreUI is meant to be the UX game changer. Pure & transparent code is devoid of redundant components, so the app is light enough to offer ultimate user experience. This means mobile devices also, where the navigation is just as easy and intuitive as on a desktop or laptop. The CoreUI Layout API lets you customize your project for almost any device – be it Mobile, Web or WebApp – CoreUI covers them all!

## Table of Contents

* [Versions](#versions)
* [CoreUI Pro](#coreui-pro)
* [Installation](#installation)
* [Basic usage](#create-react-app)
* [What's included](#whats-included)
* [Documentation](#documentation)
* [Versioning](#versioning)
* [Creators](#creators)
* [Community](#community)
* [Copyright and License](#copyright-and-license)

## Versions

* [CoreUI Free Bootstrap Admin Template](https://github.com/coreui/coreui-free-bootstrap-admin-template)
* [CoreUI Free Angular 9+ Admin Template](https://github.com/coreui/coreui-free-angular-admin-template)
* [CoreUI Free React.js Admin Template](https://github.com/coreui/coreui-free-react-admin-template)
* [CoreUI Free Vue.js Admin Template](https://github.com/coreui/coreui-free-vue-admin-template)
* [CoreUI Free Laravel Admin Template](https://github.com/coreui/coreui-free-laravel-admin-template)
* [CoreUI Free Vue.js + Laravel Admin Template](https://github.com/coreui/coreui-free-vue-laravel-admin-template)

## CoreUI Pro

**Only customers with [Enterpise Membership Plan](https://coreui.io/pro/#buy) have access to private github CoreUI Pro repository.**

* 💪  [CoreUI Pro Bootstrap Admin Template](https://coreui.io/pro/)
* 💪  [CoreUI Pro Angular 9+ Admin Template](https://coreui.io/pro/angular)
* 💪  [CoreUI Pro React Admin Template](https://coreui.io/pro/react)
* 💪  [CoreUI Pro Vue Admin Template](https://coreui.io/pro/vue)
* 💪  [CoreUI Pro Laravel Admin Template](https://coreui.io/pro/laravel/)
* 💪  [CoreUI Pro Vue.js + Laravel Admin Template](https://coreui.io/pro/vue-laravel/) -->

## Installation

### Clone repo

``` bash
# clone the repo
$ git clone https://github.com/coreui/coreui-free-react-admin-template.git my-project

# go into app's directory
$ cd my-project

# install app's dependencies
$ npm install
```

### Copy and Paste

Copy all your files to your project folder and then,

``` bash
# go into app's directory
$ cd my-project

# install app's dependencies
$ npm install
```

## Create React App
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app)

see also:
[CRA docs](https://create-react-app.dev/docs/getting-started)

### Basic usage

``` bash
# dev server with hot reload at http://localhost:3000
$ npm start
```

Navigate to [http://localhost:3000](http://localhost:3000). The app will automatically reload if you change any of the source files.

### Build

Run `build` to build the project. The build artifacts will be stored in the `build/` directory.

```bash
# build for production with minification
$ npm run build
```

## What's included

Within the download you'll find the following directories and files, logically grouping common assets and providing both compiled and minified variations. You'll see something like this:

```
CoreUI-React#v3.0.0
├── public/          #static files
│   └── index.html   #html template
│
├── src/             #project root
│   ├── assets/      #assets - js icons object
│   ├── containers/  #container source - template layout
|   │   ├── _nav.js  #sidebar config
|   │   └── ...      
│   ├── scss/        #user scss/css source
│   ├── views/       #views source
│   ├── App.js
│   ├── App.test.js
│   ├── polyfill.js
│   ├── index.js
│   ├── routes.js    #routes config
│   └── store.js     #template state example 
│
└── package.json
```

## Components' url:
<div style='font-size:28px;'><img src="https://github.com/vwvwMM/EndOfWeb/blob/v4/screenshot/src__nav_anchor.png" width='200' height='375' style='float:left;'>&emsp;src__nav_anchor</div>
  <hr>
<div style='font-size:28px;'><img src="https://github.com/vwvwMM/EndOfWeb/blob/v4/screenshot/src_views_components_widgets_WidgetDropDown.png" width='260' height='180' style='float:left;'>&emsp;src_views_components_widgets_WidgetDropDown</div>
  <hr>
<div style='font-size:28px;'><img src="https://github.com/vwvwMM/EndOfWeb/blob/v4/screenshot/src_components_AppBreadcrumb_CBreadcrumbItem.png" width='300' height='100' style='float:left;'>&emsp;src_components_AppBreadcrumb_CBreadcrumbItem</div>
  <hr>
<div style='font-size:28px;'><img src="https://github.com/vwvwMM/EndOfWeb/blob/v4/screenshot/src_components_AppFooter_CFooter.png" width='400' height='50' style='float:left;'>&emsp;src_components_AppFooter_CFooter</div>
  <hr>
<div style='font-size:28px;'><img src="https://github.com/vwvwMM/EndOfWeb/blob/v4/screenshot/src_components_AppHeader_CIcon.png" width='260' height='100' style='float:left;'>&emsp;src_components_AppHeader_CIcon</div>
  <hr>
<div style='font-size:28px;'><img src="https://github.com/vwvwMM/EndOfWeb/blob/v4/screenshot/src_components_AppHeader_CNavLink.png" width='260' height='80' style='float:left;'>&emsp;src_components_AppHeader_CNavLink</div>
  <hr>
<div style='font-size:28px;'><img src="https://github.com/vwvwMM/EndOfWeb/blob/v4/screenshot/src_components_AppSideBar_CSidebarNav.png" width='60' height='360' style='float:left;'>&emsp;src_components_AppSideBar_CSidebarNav</div>
  <hr>
<div style='font-size:28px;'><img src="https://github.com/vwvwMM/EndOfWeb/blob/v4/screenshot/src_components_AppSideBar_CSidebarToggler.png" width='260' height='100' style='float:left;'>&emsp;src_components_AppSideBar_CSidebarToggler</div>
  <hr>
<div style='font-size:28px;'><img src="https://github.com/vwvwMM/EndOfWeb/blob/v4/screenshot/src_components_AppSidebar_CIcon.png" width='290' height='100' style='float:left;'>&emsp;src_components_AppSidebar_CIcon</div>
  <hr>
<div style='font-size:28px;'><img src="https://github.com/vwvwMM/EndOfWeb/blob/v4/screenshot/src_components_headerAppHeaderDropDown_CAvator.png" width='200' height='400' style='float:left;'>&emsp;src_components_headerAppHeaderDropDown_CAvator</div>
  <hr>
<div style='font-size:28px;'><img src="https://github.com/vwvwMM/EndOfWeb/blob/v4/screenshot/src_views_components_widgets_WidgetsBrand_headerChildren.png" width='400' height='200' style='float:left;'>&emsp;src_views_components_widgets_WidgetsBrand_headerChildren</div>
  <hr>
<div style='font-size:28px;'><img src="https://github.com/vwvwMM/EndOfWeb/blob/v4/screenshot/src_views_components_widgets_WidgetsBrand_value.png" width='400' height='200' style='float:left;'>&emsp;src_views_components_widgets_WidgetsBrand_value</div>
  <hr>
<div style='font-size:28px;'><img src="https://github.com/vwvwMM/EndOfWeb/blob/v4/screenshot/src_views_dashboard_Dashboard.png" width='520' height='347' style='float:left;'>&emsp;src_views_dashboard_Dashboard</div>
  <hr>
<div style='font-size:28px;'><img src="https://github.com/vwvwMM/EndOfWeb/blob/v4/screenshot/src_views_dashboard_Dashboard_CTable.png" width='520' height='347' style='float:left;'>&emsp;src_views_dashboard_Dashboard_CTable</div>
  <hr>
<div style='font-size:28px;'><img src="https://github.com/vwvwMM/EndOfWeb/blob/v4/screenshot/src_views_dashboard_Dashboard_Traffic&Sales.png" width='520' height='347' style='float:left;'>&emsp;src_views_dashboard_Dashboard_Traffic&Sales</div>
  <hr>
<div style='font-size:28px;'><img src="https://github.com/vwvwMM/EndOfWeb/blob/v4/screenshot/src_views_pagees_page404_Page404_CContainer.png" width='260' height='153' style='float:left;'>&emsp;src_views_pagees_page404_Page404_CContainer</div>
  <hr>
<div style='font-size:28px;'><img src="https://github.com/vwvwMM/EndOfWeb/blob/v4/screenshot/src_views_pages_login_Login_CForm.png" width='260' height='260' style='float:left;'>&emsp;src_views_pages_login_Login_CForm</div>
  <hr>
<div style='font-size:28px;'><img src="https://github.com/vwvwMM/EndOfWeb/blob/v4/screenshot/src_views_pages_login_Login_SignUp.png" width='260' height='260' style='float:left;'>&emsp;src_views_pages_login_Login_SignUp</div>
  <hr>
<div style='font-size:28px;'><img src="https://github.com/vwvwMM/EndOfWeb/blob/v4/screenshot/src_views_pages_page500_Page500_CContainer.png" width='260' height='153' style='float:left;'>&emsp;src_views_pages_page500_Page500_CContainer</div>
  <hr>
<div style='font-size:28px;'><img src="https://github.com/vwvwMM/EndOfWeb/blob/v4/screenshot/src_views_pages_register_Register_CForm.png" width='260' height='260' style='float:left;'>&emsp;src_views_pages_register_Register_CForm</div>
  <hr>



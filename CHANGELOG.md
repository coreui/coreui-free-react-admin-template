## [CoreUI](https://coreui.io/) for [react](./REACT.md) changelog

##### `v2.6.0`
- move to `reactstrap v8`. Breaking changes and deprecations, see: https://github.com/reactstrap/reactstrap/blob/master/CHANGELOG.md#800-2019-04-03
- refactor(DefaultHeader): use router `NavLink`
- fix(Calendar): localizer issue, height issue
- refactor: add ie11 polyfills
- test(DataTable): add MemoryRouter

###### dependencies update

- update: `@coreui/coreui` to `^2.1.12`
- update: `@coreui/coreui-plugin-chartjs-custom-tooltips` to `^1.3.1`
- update: `@coreui/react` to `^2.5.1`
- update: `core-js` to `^3.1.4`
- update: `enzyme` to `^3.10.0`
- update: `enzyme-adapter-react-16` to `^1.14.0`
- update: `react-router-config` to `^5.0.1`
- update: `react-router-dom` to `^5.0.1`
- update: `reactstrap` to `^8.0.0`
- update: `chart.js` to `^2.8.0`
- update: `codemirror` to `^5.47.0`
- update: `react-big-calendar` to `^0.21.0`
- update: `react-chartjs-2` to `^2.7.6`
- update: `react-codemirror2` to `^6.0.0`
- update: `react-dates` to `^20.2.3`
- update: `react-toastify` to `^5.2.1`
- update: `yup` to `^0.27.0`

##### `v2.5.0`
- release for use with:
  - react-router-dom `~5.0.0`
  - @coreui/react `~2.5.0`

###### dependencies update
- update: `@coreui/react` to `~2.5.0`
- update: `react-router-config` to `^5.0.0`
- update: `react-router-dom` to `^5.0.0`

It turns out this is not such a breaking change, as it seemed at a glance.
Just update dependencies and you're good.

#### _migration guide v2.1 -> v2.5_ :boom:
- update `dependencies` in `package.json`  
   - [ ] `@coreui/react` to `~2.5.0`
   - [ ] `react-router-dom` to `^5.0.0`   
   - [ ] `react-router-config` to `^5.0.0`

##### `v2.1.7`
- maintenance release for use with:
  - react-router `v4.3.x`
  - reactstrap `v7.x`
  - @coreui/react `~2.1.7`
- chore: add `package-lock.json` with updated `tar` dependency  
- chore: fix `test:cov` script
- fix(Popovers): add `trigger="legacy" delay={0}` (breaking change in reactstrap)
###### dependencies update
- update: `@coreui/react` to `~2.1.7`
- update: `@coreui/coreui-plugin-chartjs-custom-tooltips` to `^1.3.0`
- update: `enzyme-adapter-react-16` to `^1.13.0`
- update: `node-sass` to `^4.12.0`
- update: `react` to `^16.8.6`
- update: `react-app-polyfill` to `^1.0.1`
- update: `react-chartjs-2` to `^2.7.6`
- update: `react-dom` to `^16.8.6`
- update: `react-test-renderer` to `^16.8.6`
- update: `react-scripts` to `^3.0.1`

##### `v2.1.6`
- fix(App): remove redundant react-loadable - thanks @sergeyt
- fix(routes) remove circular dependency - thanks @sergeyt
- refactor(App): change to render in Route
- fix(routes): add Home to routes - breadcrumb issue
- refactor(DefaultHeader): move to ReactRouter `NavLink`
- refactor(Forms): move to `InputGroupButtonDropdown` where applicable

###### dependencies update
- update: `@coreui/coreui` to `^2.1.9`
- update: `@coreui/react` to `~2.1.5`
- update: `chart.js` to `^2.8.0`
- update: `enzyme-adapter-react-16` to `^1.11.2`
- update: `react` to `^16.8.5`
- update: `react-app-polyfill` to `^0.2.2`
- update: `react-dom` to `^16.8.5`
- update: `react-router-config` to `^4.4.0-beta.8`
- update: `react-router-dom` to `~4.3.1`
- update: `react-test-renderer` to `^16.8.5`
- update: `react-scripts` to `^2.1.8`

##### `v2.1.5`
###### maintenance release:
- fix: iOS 9 Safari sidebar toggle force issue `@coreui/react@2.1.5`
- fix: temp fix for CodeMirror issue
- chore(GoogleMaps): Google API key cleanup
- fix(scss): temp fix for `cssnano` mangles `background-position` with calc  (re: BS4 misplaced validation feedback icons)
###### dependencies update
- update: `@coreui/react` to `^2.1.5`
- update: `enzyme-adapter-react-16` to `^1.10.0`
- update: `flag-icon-css` to `^3.3.0`
- update: `react` to `^16.8.4`
- update: `react-dom` to `^16.8.4`
- update: `react-app-polyfill` to `^0.2.2`
- update: `react-scripts` to `2.1.8`
- update: `react-test-renderer` to `^16.8.4`
- update: `codemirror"` to `^5.44.0`
- update: `formik"` to `^1.5.1`
- update: `react-dates"` to `^18.5.0`
- update: `yup"` to `^0.26.10`

##### `v2.1.4`
###### maintenance release:
- fix: Class 'btn' style white-space: nowrap; has been removed [#151](https://github.com/coreui/coreui-free-react-admin-template/issues/151)   
- fix: How to set left sidebar is minimized as default [#145](https://github.com/coreui/coreui-free-react-admin-template/issues/145)   
###### dependencies update
- update: `@coreui/coreui-pro` to `^2.1.7`
- update: `@coreui/react` to `^2.1.4`
- update: `bootstrap` to `^4.3.1`
- update: `core-js` to `^2.6.5`
- update: `enzyme` to `^3.9.0`
- update: `enzyme-adapter-react-16` to `^1.9.1`
- update: `prop-types` to `^15.7.2`
- update: `react` to `^16.8.2`
- update: `react-app-polyfill` to `^0.2.1`
- update: `react-dom` to `^16.8.2`
- update: `react-test-renderer` to `^16.8.2`
- update: `reactstrap` to `^7.1.0`
- update: `react-scripts` to `2.1.5`

##### `v2.1.3`
- feat(Spinners): add Bootstrap 4.2 spinners
- test(Spinners): add minimal testing
- refactor(GoogleMaps): add const apiKey
- test(Users): cleanup
- test(CodeEditors): add createRange()
- fix(Collapse): add `mb-0` to accordion cards
- fix(ButtonGroups): misplaced dropdownOpen
- chore: update `@coreui/coreui-pro` to `^2.1.6`
- chore: update `@coreui/react` to `^2.1.3`
- chore: update `bootstrap` to `^4.2.1`
- chore: update `core-js` to `^2.6.2`
- chore: update `enzyme` to `^3.8.0`
- chore: update `enzyme-adapter-react-16` to `^1.7.1`
- chore: update `formik` to `.4.2`
- chore: update `node-sass` to `^4.11.0`
- chore: update `react` to `^16.7.0`
- chore: update `react-app-polyfill` to `^0.2.0`
- chore: update `react-chartjs-2` to `^2.7.4`
- chore: update `react-dates` to `^18.4.0`
- chore: update `react-dom` to `^16.7.0`
- chore: update `react-quill` to `1.3.3`
- chore: update `react-test-renderer` to `^16.7.0`
- chore: update `react-text-mask-hoc` to `^0.11.0`
- chore: update `react-tastify` to `^4.5.2`
- chore: update `reactstrap` to `^7.1.0`
- chore: update `yup` to `0.26.7`
- chore: update `mutationobserver-shim` to `0.3.3`
- chore: update `react-scripts` to `2.1.3`

##### `v2.1.2`
- feat:(lazy): add spinner to `loading()`   
- refactor(Spinners): tweaks & color for dark template
- refactor(Draggable): `Reset Layout` moved to card header
- refactor(DefaultHeader): add router link to `Users`
- refactor(Invoice): add margin to Save, Print buttons
- test(DefaultHeader): add MemoryRouter
- test(CodeEditors): add window.focus = jest.fn();
- test: fixing for Login, Users, TextEditors
- test: add missing devDependencies: mutationobserver-shim@0.3.2
- test: add coverage script
- chore: update `codemirror` to `^5.42.0`
- chore: update `formik` to `^1.3.2`
- chore: update `react-toastify` to `^4.4.3`
- fix(scss): floating footer ie11 issue
- chore: update `@coreui/react` to `^2.1.1`

##### `v2.1.1`
- refactor(App.js): code splitting with `react-loadable` (waiting for release of `react-router-dom`)
- refactor(routes.js): code splitting with `React.lazy`, remove `react-loadable`
- refactor(DefaultLayout): code splitting with `React.lazy` Aside, Footer, Header, routes
- refactor(Dashboard): tweak lazy and Suspense for Widget03
- refactor(Login): add router link to `Register` button
- refactor(Register): add margins to social-media buttons  
- chore: disable eslint warning for href="#" attribute
- chore: update `@coreui/coreui-pro` to `^2.1.1`
- chore: update `enzyme-adapter-react-16` to `1.7.0`
- chore: update `react` to `16.6.3`
- chore: update `react-dom` to `16.6.3`
- chore: update `react-test-renderer` to `16.6.3`

##### `v2.1.0`
- feat(SidebarNav): navLink `attributes` - optional JS object with valid JS API naming:
  - valid attributes: `rel`, `target`, `hidden`, `disabled`, etc...  
  - starting with `@coreui/coreui-pro`, `@coreui/react` version `2.1.0` and up
  - closes #106
  - item example(`./src/_nav.js`):
      ```
      {
        name: 'Disabled',
        url: '/disabled',
        icon: 'icon-ban',
        attributes: { disabled: true },
      },
      {
        name: 'Try CoreUI PRO',
        url: 'https://coreui.io/pro/react/',
        icon: 'cui-layers icons',
        variant: 'danger',
        attributes: { target: '_blank', rel: "noopener" },
      },
      ```
- refactor(Draggables): breakpoints and layouts consistency with bootstrap 4
- fix(Cards): `card-header-actions` added to `CardHeader` for `rtl` support
- feat(Dashboard): new `Suspense` example with Widget03
fixing some issues with `rtl`, `ie11`, `sidebar-minimized` behaviour and `aside` responsiveness
- fix(DefaultAside): `ListGroup` with `tag="div"` works better with `rtl`
- fix(DefaultLayout): `AppAside` remove deprecated `hidden` prop
---
- chore: update `@coreui/coreui-pro` to `2.1.0`
- chore: update `@coreui/react` to `2.1.0`
- chore: update `react-text-mask-hoc` to `0.11.0`
- chore: update `react-dates` to `18.2.2`
- chore: update `react-quill` to `1.3.2`
- chore: update `codemirror` to `5.41.0`
- chore: update `formik` to `1.3.1`
- chore: update `reactstrap` to `6.5.0`
- chore: update `yup` to `0.26.6`
- chore: update `react-toastify` to `4.4.1`
- chore: update `chart.js` to `2.7.3`
- chore: update `flag-icon-css` to `3.2.1`
- chore: remove unused `src/scss/vendors/charts.js/` directory
---
##### Migration to [Create React App 2.0](https://reactjs.org/blog/2018/10/01/create-react-app-v2.html) :  
- chore: update `react-scripts` to `^2.1.1`
- chore: add `node-sass v4.10.0`
- chore: update `react` to `16.6.1`
- chore: update `react-dom` to `16.6.1`
- chore: update `react-test-renderer` to `16.6.1`
- chore: add `react-app-polyfill v0.1.3`
- chore: update `react-router-config` to `4.4.0-beta.6`
- chore: update `reactsrtrap` to `^6.5.0`
- chore: `enzyme` to `3.7.0`
- chore: `enzyme-adapter-react-16` to `1.7.0`
- chore: add `eslintConfig` in `package.json`
- chore: add `browserslist` in `package.json`
- chore: update `manifest.json`
- refactor(index.js): add `react-app-polyfill` for `ie11` support
- refactor(index.js): migration to `serviceWorker.js`
- cleanup `package.json` scripts
- remove `babel-jest` dependency
- remove `node-sass-chokidar` dependency
- remove `npm-run-all` dependency
- move `App.js` import styles to `App.scss`
- replace imports from `node_modules/` with `~` prefix
---  
##### Migrating from CRA 1.x to 2.x:
affected files:
- `package.json` -> dependencies update  
- `src/index.js` -> move to `serviceWorker`, add `react-app-polyfill` for `ie11` support when needed

In most cases bumping the `react-scripts` version in `package.json` and running `npm install` in this folder should be enough, but it’s good to consult the [changelog](https://github.com/facebook/create-react-app/blob/master/CHANGELOG.md#migrating-from-1x-to-203) for potential breaking changes.  

---
##### `v2.0.9`
- chore: update `@coreui/icons` to `0.3.0`
- refactor(CoreUIIcons): move to `@coreui/icons v0.3.0`
- chore: update `enzyme` to `3.5.0`
- chore: update `enzyme-adapter-react-16` to `1.3.1`
- chore: update `react-loadable` to `5.5.0`
- chore: update `reactstrap` to `6.4.0`
- chore: update `react-scripts` to `1.1.5`
- fix(User): add missing unique key prop
- fix(Login): add missing form and autoComplete
- fix(Register): add missing form and autoComplete
- chore: update `codemirror` to `5.40.0`
- chore: update `formik` to `1.1.1`
- chore: update `react-dates` to `17.2.0`
- chore: update `react-toastify` to `4.2.3`
- chore: update `yup` to `0.26.3`

##### `v2.0.8`
- feat(Forms): Form Validation _**pro**_  
- chore: add dependency `formik v1.0.2`
- chore: add dependency `yup v0.26.0`
- chore: update `@coreui/coreui-pro` to `^2.0.6`,
- chore: update `@coreui/react` to `^2.0.5`  
- chore: update `bootstrap` to `^4.1.3`  
- chore: update `codemirror` to `5.39.2`
- chore: update `react` to `^16.4.2`  
- chore: update `react-dom` to `^16.4.2`,
- chore: update `react-test-renderer` to `^16.4.2`,
- chore: update `react-chartjs-2` to `^2.7.4`  
- chore: update `react-dates` to `17.1.1`  
- chore: update `react-quill` to `1.3.1`  
- chore: update `react-select` to `^1.3.0`  
- chore: update `reactstrap` to `^6.3.1`  
- chore: update `babel-jest` to `^23.4.2`  
- chore: update `node-sass-chokidar` to `^1.3.3`  

##### `v2.0.7`
- feat(Plugins): Draggable Cards _**pro**_
- chore: add dependency `react-grid-layout v0.16.6`
- chore: update `coreui/coreui-pro` to `^2.0.5`,
- chore: update `react-big-calendar` to `0.19.2`,

##### `v2.0.6`
- feat(router): Users/User Breadcrumb example with `/users/:id`
- chore: update `@coreui/react` to `2.0.4`,
- chore: update `prop-types` to `15.6.2`
- chore: update `react` to `16.4.1`
- chore: update `react-dom` to `16.4.1`
- chore: update `react-test-renderer` to `16.4.1`
- chore: update `npm-run-all` to `4.1.3`
- chore: add `.env` file
- chore: update `codemirror` to `5.39.0`
- chore: update `react-dates` to `17.0.0`
- chore: update `react-quill` to `1.3.0`
- refactor(Compose): add `autoComplete` prop to `Input type="email"`

##### `v2.0.5`
chore: update `@coreui/coreui-pro` to `^2.0.4`  
chore: update `@coreui/react` to `^2.0.3`  
chore: update `prop-types` to `^15.6.2`  
chore: update `react` to `^16.4.1`  
chore: update `react-dom` to `^16.4.1`  
chore: update `react-test-renderer` to `^16.4.1`  

##### `v2.0.4`
- feat(scss): dark theme layout `coreui-dark` _**pro**_
- chore: update `@coreui/coreui-pro` to `2.0.3`,
- feat(Forms): FormFeedback valid, toggleFade
- refactor(Cards): toggleFade
- chore: update `@coreui/react` to `2.0.1`,
- chore: update `classnames` to `2.2.6`,
- chore: update `core-js` to `2.5.7`,
- chore: update `react` to `16.4.0`,
- chore: update `react-dom` to `16.4.0`,
- chore: update `react-codemirror2` to `5.0.4`,
- chore: update `react-router-dom` to `4.3.1`,
- chore: update `react-test-renderer` to `16.4.0`,
- chore: update `react-toastify` to `4.1.0`,
- chore: update `reactstrap` to `6.1.0`,
- chore: update `babel-jest` to `23.0.1`,

##### `v2.0.3`
- refactor: disable `ServiceWorker` by default
- fix(routes): mismatched `SimpleLineIcons` dynamic import
- refactor: CoreUI Icons `v0.2.0`
- chore: update `babel-jest` to `v22.4.4`
- chore: update `@coreui/react` to `v2.0.0`,
- chore: update `codemirror` to `v5.38.0`
- chore: update `react-dates` to `v16.7.0`

##### `v2.0.2`
fix: node-sass-chokidar mistyped version
fix: update BrandButtons component name in package.json

##### `v2.0.1`
- refactor: code splitting via dynamic import
- refactor: switches view rearrange
- fix: update component names in package.json
- chore: update `node-sass-chokidar` to `v1.3.0`
- chore(release): dependencies update

##### `v2.0.0-rc.1`
- feat: new CoreUI Icons set

##### `v2.0.0-beta.2`
- feat: CoreUI custom tooltips plugin for chart.js

##### `v2.0.0-beta.1`
- refactor(Switches): move to AppSwitch component
- fix: typo

##### `v2.0.0-beta`
- update to `@coreui/react: ^2.0.0-beta`

##### `v2.0.0-alpha.3`
- refactor(Colors): view layout, minor temp tweaks
- refactor(FullAside): - ListGroup (deprecate callout)
- refactor(Full*): containers minor fixes
- refactor(Dropdowns): minor fixes
- refactor(Forms): `card-header-actions`
- feat(Forms): `<Input type="date">`
- feat(Forms): `FormFeedback`
- feat(Collapses): Accordion, Custom Accordion
- feat(ListGroup): with TabPanes
- refactor(PaginationItem): `tag="button"`
- refactor(BrandButtons): spacing
- refactor:(Buttons): view layout

##### `v2.0.0-alpha.2`
- refactor: FullHeader `<AppHeaderDropdown direction="down">` (required prop `direction`)
- refactor: ButtonDropdowns `<Dropdown direction="up">` (deprecate 'dropup')
- refactor: Dashboard legend badge pill
- refactor: SocialButtons to BrandButtons `btn-brand`
- refactor: Buttons spacing `mr-1`
- update: reactstrap to `5.0.0`
- update: react, react-dom to `16.3.1`
- update: node-sass-chokidar to `1.1.0`
- update: prop-types to `15.5.8`
- update: react-scripts to `1.1.4`

##### `v2.0.0-alpha.1`
- refactor: separation of concerns - (CoreUI template vs CoreUI components) prepare to use CoreUI as dependency
- refactor: project structure change
- refactor: moved to [Create-React-App](CRA.md)
- chore: moved to [Semantic Versioning](https://semver.org/)

##### `v1.0.10`
- refactor: `<InputGroupAddon addonType="prepend">`
- refactor: `<InputGroupAddon addonType="append">`
- refactor: `<InputGroupText>`
- refactor: remove `<InputGroupButton>`
- update: reactstrap to `5.0.0-beta`
- update: dependencies

###### `v1.0.9`
- refactor: Sidebar structure change

###### `v1.0.8`
- refactor: Dashboard radio buttons, new `onRadioBtnClick()` method
- update: react to `16.2.0`
- update: Bootstrap `4.0.0-beta.3`
- update: dependencies
- feature: some Bootstrap4 components added
- fix: rollback to webpack-dev-server `2.9.7`
- temp tweaks(b4 beta3): `InputGroupAddon` and `InputGroupButton`
- refactor(checkboxes, radios): temp tweaks
- feat: mobile sidebar link click closes the sidebar
- fix: .nav-tabs .nav-link `cursor: pointer`

###### `v1.0.6`

- update: react to `^16.1.1`
- update: reactstrap to `^5.0.0-alpha.4`
- refactor: deprecated reactstrap `NavDropdown` change to `Dropdown` with `nav` prop
- refactor: use prop `bsSize` instead of the `size` to bootstrap's input sizing
- update: dependencies

###### `v1.0.5`
- feature: Sidebar add divider.class
- refactor: Sidebar
- moved to react: `^16.1.0`
- chore: dependencies update

###### `v1.0.4`
- refactor: scss

###### `v1.0.3`
- update: bootstrap to `4.0.0-beta.2`

###### `v1.0.2`
- `HeaderDropdown` component example extracted out of `Header`

###### `v1.0.1`
- moved to react: `^16.0.0`
- moved to reactstrap: `^5.0.0-alpha.3`
- moved to react-text-mask-hoc: `^0.10.4`
- moved from deprecated CardBlock to `CardBody` reactstrap component
- moved to `NavDropdown` in `Header` component
- fix for app-header navbar-nav dropdown-menu-right
- fix typo in Tables component PaginationItem

###### `v1.0.0`
- Sidebar component:
	- item with optional class (_nav.js)
	- nav link with optional variant (_nav.js)
	- external urls allowed (_nav.js)
	- optional SidebarFooter, SidebarHeader, SidebarForm components
- SidebarMinimizer component
- .brand-minimized
- .sidebar-minimized,
- Header component - sidebarMinimize
- react-transition-group downgrade to v1 : (modals and alerts reactstrap:v4.8 issue)

###### `2017.08.24`
- webpack.config env.prod
- Dashboard .dropdown-menu-right temp.scss hotfix (full)
- callout.scss .chart-wrapper hotfix (full)

###### `2017.08.11`
- Bootstrap 4 beta
- Dashboard component (full):
	- line chart for social box
	- sparkline chart for callout

###### `2017.08.01`
- Sidebar component:
	- title item with optional wrapper and class (_nav.js)
	- nav link item with optional badge
	- code refactoring

###### `2017.07.31`
- moved to [reactstrap](https://reactstrap.github.io/)
- moved to [webpack](https://webpack.js.org/) (dropping gulp)
- data driven Sidebar component (_nav.js)

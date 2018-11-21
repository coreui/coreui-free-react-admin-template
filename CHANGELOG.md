## [CoreUI](https://coreui.io/) for [react](./REACT.md) changelog

##### `v2.1.2`
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
- chore: update `@coreui/coreui` to `^2.1.1`
- chore: update `enzyme-adapter-react-16` to `1.7.0`
- chore: update `react` to `16.6.3`
- chore: update `react-dom` to `16.6.3`
- chore: update `react-test-renderer` to `16.6.3`

##### `v2.1.0` 
- feat(SidebarNav): navLink `attributes` - optional JS object with valid JS API naming:
  - valid attributes: `rel`, `target`, `hidden`, `disabled`, etc...  
  - starting with `@coreui/coreui`, `@coreui/react` version `2.1.0` and up
  - closes #106 
  - item example(`./src/_nav.js`):
      ```js
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
- fix(Cards): `card-header-actions` added to `CardHeader` for `rtl` support
- feat(Dashboard): new `Suspense` example with Widget03
- chore: update `@coreui/coreui` to `2.1.0`
- chore: update `@coreui/react` to `2.1.0`
- chore: update `node-sass` to `4.10.0`
- chore: update `react` to `16.6.1`
- chore: update `react-dom` to `16.6.1`
- chore: update `react-test-renderer` to `16.6.1`

##### `v2.0.14` 
- chore: update `@coreui/coreui` to `2.0.25`
- chore: update `chart.js` to `2.7.3`
- chore: update `flag-icon-css` to `3.2.1`
- chore: update `node-sass` to `4.9.4`
- chore: update `react` to `16.6.0`
- chore: update `react-dom` to `16.6.0`
- chore: update `react-router-config` to `4.4.0-beta.6`
- chore: update `react-test-renderer` to `16.6.0`
- chore: update `react-scripts` to `2.1.1`

##### `v2.0.13` 
- refactor: migration to [Create React App 2.0](https://reactjs.org/blog/2018/10/01/create-react-app-v2.html) cleanup 
  - cleanup `package.json` scripts
  - remove `babel-jest` dependency
  - remove `node-sass-chokidar` dependency
  - remove `npm-run-all` dependency
  - move `App.js` import styles to `App.scss` 
  - replace imports from `node_modules/` with `~` prefix
- chore: remove unused `src/scss/vendors/charts.js/` directory
- chore: update `@coreui/coreui` to `^2.0.15`
- chore: update `@coreui/react` to `^2.0.9`

##### `v2.0.12` 
fixes some issues with `rtl`, `ie11`, `sidebar-minimized` behaviour and `aside` responsiveness
- fix(DefaultAside): `ListGroup` with `tag="div"` works better with `rtl` 
- fix(DefaultLayout): `AppAside` remove deprecated `hidden` prop 
- chore: update `@coreui/react` to `^2.0.8`
- chore: update `reactsrtrap` to `^6.5.0`
- chore: update `react-scripts` to `^2.0.4`
- chore: `enzyme` to `3.7.0`
- chore: `enzyme-adapter-react-16` to `1.6.0`
  
##### `v2.0.11`
- chore: update `@coreui/react` to `^2.0.7`
- chore: migration to [Create React App 2.0](https://reactjs.org/blog/2018/10/01/create-react-app-v2.html)
  - chore: update `react-scripts` to `^2.0.3`
  - chore: update `node-sass-chokidar` to `^1.3.3`
  - chore: add `node-sass v4.9.3`
  - chore: add `react-app-polyfill v0.1.3` 
  - chore: add `eslintConfig` in `package.json` 
  - chore: add `browserslist` in `package.json` 
  - chore: update `manifest.json`
  - refactor(index.js): add `react-app-polyfill` for `ie9-11` support
  - refactor(index.js): migration to `serviceWorker.js`

###### Migrating from CRA 1.x to 2.x:
affected files: 
- `package.json` -> dependencies update  
- `src/index.js` -> move to `serviceWorker`, add `react-app-polyfill` for `ie9-11` support when needed

In most cases bumping the `react-scripts` version in `package.json` and running `npm install` in this folder should be enough, but it’s good to consult the [changelog](https://github.com/facebook/create-react-app/blob/master/CHANGELOG.md#migrating-from-1x-to-203) for potential breaking changes.  

---

##### `v2.0.10`
- chore: update `@coreui/coreui` to `^2.0.14`
- chore: update `@coreui/react` to `^2.0.6`
- chore: update `enzyme` to `^3.6.0`
- chore: update `enzyme-adapter-react-16` to `^1.5.0`
- chore: update `flag-icon-css` to `^3.2.0`
- chore: update `react` to `^16.5.2`
- chore: update `react-dom` to `^16.5.2`
- chore: update `react-router-config` to `^4.4.0-beta.1`
- chore: update `react-test-renderer` to `^16.5.2`
- chore: update `babel-jest` to `^23.6.0`

##### `v2.0.9`
- chore: update `@coreui/icons` to `0.3.0`
- refactor(CoreUIIcons): move to `@coreui/icons v0.3.0`
- chore: update `enzyme` to `3.5.0`
- chore: update `enzyme-adapter-react-16` to `1.3.1`
- chore: update `react-loadable` to `5.5.0`
- chore: update `reactstrap` to `6.4.0`
- chore: update `react-scripts` to `1.1.5`

##### `v2.0.8`
- fix(User): add missing unique key prop
- fix(Login): add missing form and autoComplete
- fix(Register): add missing form and autoComplete
- chore: update `@coreui/react` to `2.0.5`
- chore: update `bootstrap` to `4.1.3`
- chore: update `reactstrap` to `6.3.1`
- chore: update `babel-jest` to `23.4.2`

##### `v2.0.5`
- feat(router): Users/User Breadcrumb example with `/users/:id`
- chore: update `@coreui/react` to `2.0.4`,
- chore: update `prop-types` to `15.6.2`
- chore: update `react` to `16.4.1`
- chore: update `react-dom` to `16.4.1`
- chore: update `react-test-renderer` to `16.4.1`
- chore: update `npm-run-all` to `4.1.3`
- chore: add `.env` file

##### `v2.0.4`
- feat(Forms): FormFeedback valid, toggleFade
- refactor(Cards): toggleFade
- chore: update `@coreui/coreui` to `2.0.2`,
- chore: update `@coreui/react` to `2.0.1`,
- chore: update `classnames` to `2.2.6`,
- chore: update `core-js` to `2.5.7`,
- chore: update `react` to `16.4.0`,
- chore: update `react-dom` to `16.4.0`,
- chore: update `react-router-dom` to `4.3.1`,
- chore: update `react-test-renderer` to `16.4.0`,
- chore: update `reactstrap` to `6.1.0`,
- chore: update `babel-jest` to `23.0.1`,

##### `v2.0.3`
- refactor: disable `ServiceWorker` by default
- fix(routes): mismatched `SimpleLineIcons` dynamic import
- refactor: CoreUI Icons `v0.2.0`
- chore: update`babel-jest` to `v22.4.4`

##### `v2.0.2`
- chore: update `@coreui/react` to `v2.0.0`,

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

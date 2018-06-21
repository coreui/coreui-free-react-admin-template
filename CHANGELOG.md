## [CoreUI](https://coreui.io/) for [react](./REACT.md) changelog

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

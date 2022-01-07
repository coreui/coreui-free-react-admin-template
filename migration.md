# Migration from version 4.1 to 4.2

In version 4.2 we updated "react-scripts" to 5.0.0 and "react-router-dom" to 6.2.1

Please check also React Router 6 migration guide https://reactrouter.com/docs/en/v6/upgrading/v5

## Updated files

- .browserlistrc
- eslintrc.js
- package.json
- src/App.js
- src/App.test.js
- src/index.js
- src/setupTests.js
- src/components/AppBreadcrumb.js
- src/components/AppHeader.js\
removed `activeClassName: 'active',` from NavLink, because React Router Dom 6 doesn't support it
- src/components/AppSidebarNav.js\
removed `activeClassName: 'active',` from NavLink, because React Router Dom 6 doesn't support it
- src/components/index.js
- src/layout/DefaultLayout.js

## Removed files

- src/serviceWorker.js is removed use src/reportWebVitals.js
- src/components/AppContent.js\
  Routes map has been moved to src/App.js

## Dependencies and devDependencies

### Removed

- @wojtekmaj/enzyme-adapter-react-17,
- enzyme

### Added

- @testing-library/jest-dom
- @testing-library/react
- @testing-library/user-event
- web-vitals


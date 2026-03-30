# CoreUI Free React Admin Template - AI Assistant Rules

You are working with the CoreUI Free React Admin Template, a professional admin dashboard built with React 19, CoreUI React components, and modern build tools. This project uses Vite for development and building, React Router for navigation, Redux for state management, and Sass for styling.

## Critical Rules

**Component Library**: ALWAYS use CoreUI React components from https://coreui.io/react/docs/. NEVER use Tailwind CSS, Material-UI, or other component libraries. This project is built on Bootstrap 5 and CoreUI React components exclusively.

**Technology Stack**: This project uses:
- React 19 with functional components and Hooks
- JSX for component markup
- CoreUI React 5.x and @coreui/coreui 5.x
- React Router 7.x for client-side routing
- Redux 5.x with React-Redux for state management
- Vite 8.x for development server and building
- Sass/SCSS for styling with Bootstrap 5 variables
- Chart.js 4.x with @coreui/react-chartjs for data visualization

## Code Conventions

**JavaScript/React Standards**:
- Use functional components with Hooks (useState, useEffect, useSelector, etc.)
- Follow React Hooks rules (only call at top level, only in React functions)
- Use Prettier formatting: no semicolons, single quotes, 2-space indentation
- Enforce ESLint rules with React and Prettier plugins
- Use PropTypes for component prop validation
- Prefer const arrow functions: `const Component = () => { }`
- Use destructuring for props: `const { prop1, prop2 } = props`

**File Organization**:
- `src/` - All source code
  - `components/` - Reusable UI components (AppHeader, AppSidebar, etc.)
  - `views/` - Page components organized by feature (dashboard, forms, charts, etc.)
  - `layout/` - Layout wrapper components (DefaultLayout)
  - `assets/` - Static assets (images, brand logos)
  - `scss/` - Global styles and theme customization
  - `routes.js` - Route definitions
  - `_nav.js` - Navigation/sidebar menu configuration
  - `store.js` - Redux store configuration
  - `App.js` - Main application component with routing
  - `index.js` - Application entry point

**React/JSX Practices**:
- Use React.lazy() for code splitting and lazy loading
- Wrap lazy components in <Suspense> with fallback UI
- Use semantic component names (e.g., DefaultLayout, AppHeader)
- Keep components focused and single-responsibility
- Extract reusable logic into custom hooks when appropriate
- Use React.memo() for performance optimization when needed

**CSS/Sass Practices**:
- Import global styles in App.js: `import './scss/style.scss'`
- Use Bootstrap utilities first before custom CSS
- Leverage CoreUI CSS custom properties for theming
- Support dark mode through CoreUI's color mode system
- File: `src/scss/style.scss` - main stylesheet importing CoreUI and Bootstrap
- File: `src/scss/_custom.scss` - custom style overrides
- Use SCSS variables from Bootstrap and CoreUI when possible

**Routing Conventions**:
- Use HashRouter for client-side routing (GitHub Pages compatible)
- Define routes in routes.js as array of objects
- Lazy load route components for better performance
- Use exact path matching where needed
- Public routes (login, register, 404, 500) defined in App.js
- Protected routes handled in DefaultLayout with AppContent

**State Management**:
- Use Redux for global state (theme, sidebar visibility)
- Use Redux Toolkit pattern with actions and reducers
- Connect components with useSelector and useDispatch hooks
- Keep component-level state in useState when state is local
- File: `src/store.js` - Redux store configuration

**Naming Conventions**:
- PascalCase for component files and component names (AppHeader.js, DefaultLayout.js)
- camelCase for variables, functions, and hooks (useState, useEffect)
- UPPER_SNAKE_CASE for constants (API_URL, MAX_ITEMS)
- kebab-case for CSS classes (following Bootstrap/CoreUI conventions)
- Descriptive names that indicate purpose (AppHeaderDropdown vs Dropdown)

## Project Structure

```
coreui-free-react-admin-template/
├── public/              # Static assets served directly
├── src/
│   ├── assets/         # Images, logos, icons
│   │   ├── brand/     # Logo components
│   │   └── images/    # Image files
│   ├── components/     # Reusable UI components
│   │   ├── AppHeader.js
│   │   ├── AppSidebar.js
│   │   ├── AppFooter.js
│   │   ├── AppContent.js
│   │   ├── AppBreadcrumb.js
│   │   └── header/    # Header sub-components
│   ├── layout/         # Layout components
│   │   └── DefaultLayout.js
│   ├── views/          # Page components
│   │   ├── dashboard/ # Dashboard page
│   │   ├── base/      # Base UI components examples
│   │   ├── buttons/   # Button examples
│   │   ├── forms/     # Form examples
│   │   ├── charts/    # Chart examples
│   │   ├── icons/     # Icon examples
│   │   ├── notifications/ # Notification examples
│   │   ├── widgets/   # Widget examples
│   │   └── pages/     # Auth & error pages
│   ├── scss/           # Stylesheets
│   │   ├── style.scss # Main stylesheet
│   │   └── _custom.scss # Custom overrides
│   ├── App.js          # Main app component
│   ├── index.js        # Entry point
│   ├── routes.js       # Route definitions
│   ├── _nav.js         # Navigation config
│   └── store.js        # Redux store
├── build/              # Build utilities
├── index.html          # HTML template
├── vite.config.mjs     # Vite configuration
├── eslint.config.mjs   # ESLint configuration
├── package.json        # Dependencies
└── README.md           # Documentation
```

## Development Workflow

**Starting Development**:
```bash
npm install          # Install dependencies
npm start            # Start dev server (http://localhost:3000)
npm run build        # Build for production
npm run serve        # Preview production build
npm run lint         # Run ESLint
```

**Adding a New Page**:
1. Create component in `src/views/[feature]/ComponentName.js`
2. Add route to `src/routes.js`
3. Add navigation item to `src/_nav.js` (if needed)
4. Import and use CoreUI components from '@coreui/react'

**Creating Components**:
```javascript
import React from 'react'
import PropTypes from 'prop-types'
import { CCard, CCardBody, CCardHeader } from '@coreui/react'

const MyComponent = ({ title, children }) => {
  return (
    <CCard>
      <CCardHeader>{title}</CCardHeader>
      <CCardBody>{children}</CCardBody>
    </CCard>
  )
}

MyComponent.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
}

export default MyComponent
```

**Using Hooks**:
```javascript
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const MyComponent = () => {
  const [data, setData] = useState([])
  const theme = useSelector((state) => state.theme)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    // Fetch data or side effects
  }, [])

  return <div>Content</div>
}
```

## Code Quality

**Linting**:
- ESLint configuration in `eslint.config.mjs`
- Prettier integration for code formatting
- React-specific rules with eslint-plugin-react
- React Hooks rules with eslint-plugin-react-hooks
- Run `npm run lint` before committing

**Best Practices**:
- Always validate props with PropTypes
- Use meaningful component and variable names
- Keep components small and focused
- Extract complex logic into custom hooks
- Use React DevTools for debugging
- Test in both light and dark themes
- Ensure responsive design works on all screen sizes

**Git Commits**:
Follow conventional commit format:
- feat: New feature
- fix: Bug fix
- docs: Documentation changes
- style: Code style changes (formatting)
- refactor: Code refactoring
- test: Adding tests
- chore: Maintenance tasks

## Common Patterns

**Lazy Loading Routes**:
```javascript
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
```

**Theme Management**:
```javascript
import { useColorModes } from '@coreui/react'

const { colorMode, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')
```

**Navigation Configuration** (`_nav.js`):
```javascript
export default [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
]
```

## AI Assistant Guidelines

**What AI Should Do**:
- Generate code using CoreUI React components
- Follow existing code style and conventions
- Use functional components with Hooks
- Implement responsive designs
- Add PropTypes for new components
- Follow the project's file organization
- Use existing utility functions and helpers
- Suggest performance optimizations when appropriate

**What AI Should NOT Do**:
- Use class components (use functional components instead)
- Import components from libraries other than CoreUI/React
- Suggest Tailwind CSS or other CSS frameworks
- Ignore ESLint/Prettier rules
- Create files outside the src/ directory structure
- Modify build configuration without clear reason
- Use deprecated React patterns (componentWillMount, etc.)

## External Dependencies

**Core Libraries**:
- @coreui/coreui: ^5.6.1 - CoreUI CSS framework
- @coreui/react: ^5.10.0 - CoreUI React components
- @coreui/icons-react: ^2.3.0 - CoreUI icons for React
- react: ^19.2.4 - React library
- react-dom: ^19.2.4 - React DOM rendering
- react-router-dom: ^7.13.2 - Routing library
- redux: 5.0.1 - State management
- react-redux: ^9.2.0 - React bindings for Redux

**Additional Libraries**:
- chart.js: ^4.5.1 - Charting library
- @coreui/react-chartjs: ^3.0.0 - CoreUI Chart.js wrapper
- simplebar-react: ^3.3.2 - Custom scrollbars
- classnames: ^2.5.1 - Conditional class names utility
- prop-types: ^15.8.1 - Runtime type checking

## Browser Support

Modern browsers with ES6+ support:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Resources

- CoreUI React Documentation: https://coreui.io/react/docs/
- CoreUI Components: https://coreui.io/react/docs/components/
- React Documentation: https://react.dev/
- React Router: https://reactrouter.com/
- Redux: https://redux.js.org/
- Vite: https://vitejs.dev/

---

Remember: This is a React application using CoreUI React components. Always check CoreUI React documentation for component APIs and usage examples. Keep the code clean, maintainable, and following React best practices.

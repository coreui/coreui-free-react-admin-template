# CoreUI Free React Admin Template - Development Guide

A comprehensive guide for developers working with the CoreUI Free React Admin Template. This guide covers setup, development workflows, common patterns, and best practices.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Development Workflow](#development-workflow)
- [Creating Components](#creating-components)
- [Adding New Pages](#adding-new-pages)
- [Working with Routes](#working-with-routes)
- [State Management](#state-management)
- [Styling Components](#styling-components)
- [Working with Forms](#working-with-forms)
- [Data Visualization](#data-visualization)
- [Code Quality](#code-quality)
- [Testing](#testing)
- [Build and Deployment](#build-and-deployment)
- [Troubleshooting](#troubleshooting)
- [Best Practices](#best-practices)

## Prerequisites

### Required Software

- **Node.js**: Version 16 or higher (18+ recommended)
- **npm**: Version 7+ or **yarn**: Version 1.22+
- **Git**: For version control

### Recommended Tools

- **Visual Studio Code** with extensions:
  - ESLint
  - Prettier
  - ES7+ React/Redux/React-Native snippets
  - Auto Import
  - GitLens
- **React Developer Tools** browser extension
- **Redux DevTools** browser extension

### Knowledge Requirements

- JavaScript ES6+ features (arrow functions, destructuring, modules)
- React fundamentals (components, hooks, props, state)
- HTML5 and CSS3
- Sass/SCSS basics
- Git version control

## Getting Started

### Installation

1. **Clone the repository** (or download the source):
```bash
git clone https://github.com/coreui/coreui-free-react-admin-template.git
cd coreui-free-react-admin-template
```

2. **Install dependencies**:
```bash
npm install
# or
yarn install
```

3. **Start the development server**:
```bash
npm start
# or
yarn start
```

4. **Open your browser** to [http://localhost:3000](http://localhost:3000)

The development server includes:
- Hot Module Replacement (HMR) for instant updates
- Automatic browser refresh on file changes
- Error overlay for compile-time and runtime errors

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start development server on port 3000 |
| `npm run build` | Build optimized production bundle |
| `npm run serve` | Preview production build locally |
| `npm run lint` | Run ESLint to check code quality |

## Project Structure

### Source Code Organization

**IMPORTANT**: Always edit source files in `src/`, never modify compiled files in `build/`.

```
src/
├── assets/          # Static assets (images, logos)
├── components/      # Reusable UI components
├── layout/          # Layout wrapper components
├── views/           # Page/route components
├── scss/            # Global styles and themes
├── App.js           # Root component with routing
├── index.js         # Application entry point
├── routes.js        # Route definitions
├── _nav.js          # Navigation menu configuration
└── store.js         # Redux store setup
```

### Key Files

- **`App.js`**: Main application component, routing setup, theme initialization
- **`index.js`**: ReactDOM render, Provider setup, store connection
- **`routes.js`**: Array of route configurations for protected routes
- **`_nav.js`**: Navigation menu structure for sidebar
- **`store.js`**: Redux store with global state (theme, sidebar)

## Development Workflow

### Daily Development Process

1. **Start development server**: `npm start`
2. **Make changes** to source files in `src/`
3. **View changes** instantly in browser (HMR)
4. **Check console** for errors or warnings
5. **Run linter** before committing: `npm run lint`
6. **Test in both themes** (light and dark)
7. **Commit changes** with conventional commit messages

### Hot Module Replacement (HMR)

Vite provides instant feedback:
- **JavaScript/JSX changes**: Component updates without page reload
- **CSS/SCSS changes**: Style updates without reload
- **Configuration changes**: Require server restart

### Development Server Features

**Port**: 3000 (configurable in `vite.config.mjs`)

**Features**:
- Fast cold start (~500ms)
- Instant HMR (<50ms)
- Error overlay with stack traces
- Network access for mobile testing

**Access from mobile**:
```bash
# Find your local IP
# Windows: ipconfig
# Mac/Linux: ifconfig

# Access from mobile device:
http://192.168.1.X:3000
```

## Creating Components

### Component Structure

**Functional components with Hooks**:

```javascript
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { CCard, CCardBody, CCardHeader } from '@coreui/react'

/**
 * UserCard component displays user information in a card format
 * @param {Object} props - Component props
 * @param {string} props.name - User's full name
 * @param {string} props.email - User's email address
 * @param {string} [props.avatar] - Optional avatar URL
 */
const UserCard = ({ name, email, avatar }) => {
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Component lifecycle logic
    console.log('UserCard mounted')

    return () => {
      // Cleanup logic
      console.log('UserCard unmounted')
    }
  }, [])

  return (
    <CCard>
      <CCardHeader>{name}</CCardHeader>
      <CCardBody>
        {avatar && <img src={avatar} alt={name} />}
        <p>{email}</p>
      </CCardBody>
    </CCard>
  )
}

UserCard.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  avatar: PropTypes.string,
}

UserCard.defaultProps = {
  avatar: null,
}

export default UserCard
```

### Component Best Practices

1. **Keep components focused**: One responsibility per component
2. **Use PropTypes**: Validate all props for runtime type checking
3. **Provide default props**: Define sensible defaults
4. **Add JSDoc comments**: Document component purpose and props
5. **Extract logic**: Use custom hooks for reusable logic
6. **Name meaningfully**: Clear, descriptive component names

### Custom Hooks

Extract reusable logic into custom hooks:

```javascript
import { useState, useEffect } from 'react'

/**
 * Custom hook for fetching data from an API
 * @param {string} url - API endpoint URL
 * @returns {Object} { data, loading, error }
 */
const useFetch = (url) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await fetch(url)
        const json = await response.json()
        setData(json)
        setError(null)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [url])

  return { data, loading, error }
}

export default useFetch
```

**Usage**:
```javascript
const MyComponent = () => {
  const { data, loading, error } = useFetch('/api/users')

  if (loading) return <CSpinner />
  if (error) return <div>Error: {error}</div>

  return <div>{JSON.stringify(data)}</div>
}
```

## Adding New Pages

### Step-by-Step Process

**1. Create the page component** in `src/views/[feature]/`:

```javascript
// src/views/products/Products.js
import React from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
} from '@coreui/react'

const Products = () => {
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Products</strong>
          </CCardHeader>
          <CCardBody>
            {/* Your content here */}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Products
```

**2. Add route to `src/routes.js`**:

```javascript
import React from 'react'

const Products = React.lazy(() => import('./views/products/Products'))

const routes = [
  // ... existing routes
  { path: '/products', name: 'Products', element: Products },
]

export default routes
```

**3. Add navigation item to `src/_nav.js`** (optional):

```javascript
import { cilBasket } from '@coreui/icons'

export default [
  // ... existing items
  {
    component: CNavItem,
    name: 'Products',
    to: '/products',
    icon: <CIcon icon={cilBasket} customClassName="nav-icon" />,
  },
]
```

**4. Test the page**:
- Navigate to `http://localhost:3000/#/products`
- Check that navigation highlights correctly
- Verify breadcrumb displays properly

### Page Templates

**List Page**:
```javascript
const ListPage = () => {
  const [items, setItems] = useState([])

  useEffect(() => {
    // Fetch items
  }, [])

  return (
    <CCard>
      <CCardHeader>Items</CCardHeader>
      <CCardBody>
        <CTable>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>Name</CTableHeaderCell>
              <CTableHeaderCell>Status</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {items.map(item => (
              <CTableRow key={item.id}>
                <CTableDataCell>{item.name}</CTableDataCell>
                <CTableDataCell>{item.status}</CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CCardBody>
    </CCard>
  )
}
```

**Detail Page**:
```javascript
const DetailPage = () => {
  const { id } = useParams()
  const [item, setItem] = useState(null)

  useEffect(() => {
    // Fetch item by id
  }, [id])

  if (!item) return <CSpinner />

  return (
    <CCard>
      <CCardHeader>{item.name}</CCardHeader>
      <CCardBody>
        <p>{item.description}</p>
      </CCardBody>
    </CCard>
  )
}
```

## Working with Routes

### Route Configuration

Routes are defined in `src/routes.js`:

```javascript
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/users', name: 'Users', element: Users, exact: true },
  { path: '/users/:id', name: 'User Details', element: UserDetail },
]
```

### Dynamic Routes

**With URL parameters**:

```javascript
// Route definition
{ path: '/products/:id', name: 'Product Detail', element: ProductDetail }

// Component usage
import { useParams } from 'react-router-dom'

const ProductDetail = () => {
  const { id } = useParams()

  return <div>Product ID: {id}</div>
}
```

### Programmatic Navigation

**Using useNavigate hook**:

```javascript
import { useNavigate } from 'react-router-dom'

const MyComponent = () => {
  const navigate = useNavigate()

  const goToProducts = () => {
    navigate('/products')
  }

  const goBack = () => {
    navigate(-1) // Go back one page
  }

  return (
    <>
      <CButton onClick={goToProducts}>View Products</CButton>
      <CButton onClick={goBack}>Go Back</CButton>
    </>
  )
}
```

### Protected Routes

Add authentication logic in `DefaultLayout.js`:

```javascript
const DefaultLayout = () => {
  const isAuthenticated = useSelector((state) => state.isAuthenticated)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
    }
  }, [isAuthenticated, navigate])

  return (
    <div>
      {/* Layout content */}
    </div>
  )
}
```

## State Management

### Using Redux

**Reading state** with useSelector:

```javascript
import { useSelector } from 'react-redux'

const MyComponent = () => {
  const theme = useSelector((state) => state.theme)
  const sidebarShow = useSelector((state) => state.sidebarShow)

  return <div>Theme: {theme}</div>
}
```

**Updating state** with useDispatch:

```javascript
import { useDispatch } from 'react-redux'

const MyComponent = () => {
  const dispatch = useDispatch()

  const handleClick = () => {
    dispatch({ type: 'set', theme: 'dark' })
  }

  return <CButton onClick={handleClick}>Dark Mode</CButton>
}
```

### Local Component State

**useState for simple state**:

```javascript
const [count, setCount] = useState(0)
const [isOpen, setIsOpen] = useState(false)
const [formData, setFormData] = useState({ name: '', email: '' })
```

**useReducer for complex state**:

```javascript
const initialState = { count: 0, step: 1 }

const reducer = (state, action) => {
  switch (action.type) {
    case 'increment':
      return { ...state, count: state.count + state.step }
    case 'decrement':
      return { ...state, count: state.count - state.step }
    case 'setStep':
      return { ...state, step: action.payload }
    default:
      return state
  }
}

const Counter = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <>
      <p>Count: {state.count}</p>
      <CButton onClick={() => dispatch({ type: 'increment' })}>+</CButton>
      <CButton onClick={() => dispatch({ type: 'decrement' })}>-</CButton>
    </>
  )
}
```

## Styling Components

### Using CoreUI Components

**ALWAYS use CoreUI React components** from `@coreui/react`:

```javascript
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
} from '@coreui/react'

const MyComponent = () => (
  <CRow>
    <CCol md={6}>
      <CCard>
        <CCardHeader>Card Title</CCardHeader>
        <CCardBody>
          <CButton color="primary">Click Me</CButton>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
)
```

### Bootstrap Utilities

Use Bootstrap utility classes for quick styling:

```javascript
<CCard className="mb-4 shadow-sm">
  <CCardBody className="p-4 d-flex justify-content-between align-items-center">
    <span className="text-muted">Left</span>
    <span className="fw-bold">Right</span>
  </CCardBody>
</CCard>
```

**Common utilities**:
- Spacing: `m-3`, `mt-2`, `mb-4`, `p-3`, `px-4`, `py-2`
- Display: `d-flex`, `d-none`, `d-block`, `d-inline`
- Flexbox: `justify-content-between`, `align-items-center`
- Text: `text-center`, `text-muted`, `fw-bold`, `fs-5`

### Custom Styles

**Component-level SCSS**:

```javascript
// MyComponent.js
import './MyComponent.scss'

const MyComponent = () => (
  <div className="my-component">
    <h1 className="my-component__title">Title</h1>
  </div>
)
```

```scss
// MyComponent.scss
.my-component {
  padding: 1rem;
  background-color: var(--cui-light);

  &__title {
    color: var(--cui-primary);
    font-size: 1.5rem;
  }
}
```

### CSS Custom Properties

Use CoreUI CSS variables for theming:

```javascript
<div style={{
  backgroundColor: 'var(--cui-primary)',
  color: 'var(--cui-white)',
  padding: 'var(--cui-spacer-3)',
}}>
  Styled with CSS variables
</div>
```

**Common variables**:
- Colors: `--cui-primary`, `--cui-secondary`, `--cui-success`, `--cui-danger`
- Background: `--cui-body-bg`, `--cui-light`, `--cui-dark`
- Text: `--cui-body-color`, `--cui-text-muted`
- Spacing: `--cui-spacer-1` through `--cui-spacer-5`

### Conditional Styling

Use the `classnames` utility:

```javascript
import classNames from 'classnames'

const MyComponent = ({ isActive, isPrimary }) => {
  const buttonClass = classNames('btn', {
    'btn-primary': isPrimary,
    'btn-secondary': !isPrimary,
    'active': isActive,
  })

  return <button className={buttonClass}>Button</button>
}
```

## Working with Forms

### Form Component Example

```javascript
import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormTextarea,
  CRow,
} from '@coreui/react'

const MyForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [validated, setValidated] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const form = event.currentTarget

    if (form.checkValidity() === false) {
      event.stopPropagation()
      setValidated(true)
      return
    }

    // Submit form data
    console.log('Form data:', formData)
  }

  return (
    <CCard>
      <CCardHeader>Contact Form</CCardHeader>
      <CCardBody>
        <CForm
          className="row g-3"
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
        >
          <CCol md={6}>
            <CFormLabel htmlFor="name">Name</CFormLabel>
            <CFormInput
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </CCol>
          <CCol md={6}>
            <CFormLabel htmlFor="email">Email</CFormLabel>
            <CFormInput
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </CCol>
          <CCol xs={12}>
            <CFormLabel htmlFor="message">Message</CFormLabel>
            <CFormTextarea
              id="message"
              name="message"
              rows="3"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </CCol>
          <CCol xs={12}>
            <CButton color="primary" type="submit">
              Submit
            </CButton>
          </CCol>
        </CForm>
      </CCardBody>
    </CCard>
  )
}

export default MyForm
```

### Form Validation

**HTML5 validation**:
```javascript
<CFormInput
  type="email"
  required
  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
/>
```

**Custom validation**:
```javascript
const [errors, setErrors] = useState({})

const validate = () => {
  const newErrors = {}

  if (!formData.name) {
    newErrors.name = 'Name is required'
  }

  if (!formData.email.includes('@')) {
    newErrors.email = 'Invalid email address'
  }

  setErrors(newErrors)
  return Object.keys(newErrors).length === 0
}

const handleSubmit = (e) => {
  e.preventDefault()

  if (validate()) {
    // Submit form
  }
}
```

## Data Visualization

### Using Chart.js with CoreUI

```javascript
import React from 'react'
import { CCard, CCardBody, CCardHeader } from '@coreui/react'
import { CChartLine } from '@coreui/react-chartjs'

const Dashboard = () => {
  return (
    <CCard>
      <CCardHeader>Sales Overview</CCardHeader>
      <CCardBody>
        <CChartLine
          data={{
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
              {
                label: 'Sales 2024',
                backgroundColor: 'rgba(220, 53, 69, 0.1)',
                borderColor: 'rgba(220, 53, 69, 1)',
                data: [40, 20, 12, 39, 10, 40, 39],
              },
            ],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: true,
              },
            },
          }}
          style={{ height: '300px' }}
        />
      </CCardBody>
    </CCard>
  )
}
```

### Chart Types

CoreUI provides React wrappers for Chart.js:

- `CChartLine` - Line charts
- `CChartBar` - Bar charts
- `CChartDoughnut` - Doughnut charts
- `CChartPie` - Pie charts
- `CChartPolarArea` - Polar area charts
- `CChartRadar` - Radar charts

## Code Quality

### ESLint Configuration

The project uses ESLint with React and Prettier plugins:

```bash
# Check for issues
npm run lint

# Auto-fix issues (when possible)
npm run lint -- --fix
```

### Code Style Guidelines

**JavaScript**:
- No semicolons (enforced by Prettier)
- Single quotes for strings
- 2-space indentation
- Arrow functions preferred
- Destructuring when possible

**React**:
- Functional components only
- Hooks at top level
- PropTypes for all components
- Meaningful component names

**File naming**:
- PascalCase for components: `UserCard.js`
- camelCase for utilities: `dateHelper.js`
- kebab-case for styles: `user-card.scss`

### Pre-commit Checks

**Recommended**: Set up pre-commit hooks with Husky:

```bash
npm install --save-dev husky lint-staged

# Add to package.json
{
  "lint-staged": {
    "src/**/*.{js,jsx}": ["eslint --fix", "prettier --write"]
  }
}
```

## Testing

### Manual Testing Checklist

Before committing changes:

- [ ] Test in both light and dark themes
- [ ] Test responsive design (mobile, tablet, desktop)
- [ ] Check browser console for errors
- [ ] Verify all links and navigation work
- [ ] Test form validation and submission
- [ ] Check accessibility (keyboard navigation, screen readers)

### Browser Testing

Test in modern browsers:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

### Responsive Testing

Test at common breakpoints:
- Mobile: 375px, 414px
- Tablet: 768px, 1024px
- Desktop: 1366px, 1920px

**Tip**: Use Chrome DevTools device toolbar (Cmd/Ctrl + Shift + M)

## Build and Deployment

### Production Build

Create optimized production build:

```bash
npm run build
```

Output in `build/` directory:
- Minified JavaScript bundles
- Extracted and minified CSS
- Optimized assets
- Source maps

### Build Analysis

Check bundle size:

```bash
npm run build

# Output shows:
# - Total bundle size
# - Individual chunk sizes
# - Asset sizes
```

### Preview Production Build

Test production build locally:

```bash
npm run serve
```

Opens preview server at `http://localhost:4173`

### Deployment Platforms

**Static hosting** (builds to static files):

1. **Netlify**:
   - Connect GitHub repository
   - Build command: `npm run build`
   - Publish directory: `build`

2. **Vercel**:
   - Import Git repository
   - Framework preset: Vite
   - Build command: `npm run build`

3. **GitHub Pages**:
   - Build locally: `npm run build`
   - Push `build/` folder to `gh-pages` branch

4. **AWS S3 + CloudFront**:
   - Upload `build/` contents to S3 bucket
   - Configure CloudFront distribution

### Environment Variables

Create `.env` file (not committed to Git):

```bash
VITE_API_URL=https://api.example.com
VITE_APP_NAME=My App
```

**Usage in code**:
```javascript
const apiUrl = import.meta.env.VITE_API_URL
```

**IMPORTANT**: Only variables prefixed with `VITE_` are exposed to the app.

## Troubleshooting

### Common Issues

**Problem**: Port 3000 already in use

**Solution**:
```bash
# Kill process on port 3000
# Mac/Linux:
lsof -ti:3000 | xargs kill

# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or change port in vite.config.mjs
```

---

**Problem**: Module not found errors

**Solution**:
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

---

**Problem**: Styles not updating

**Solution**:
- Clear browser cache
- Hard refresh (Cmd/Ctrl + Shift + R)
- Restart dev server

---

**Problem**: HMR not working

**Solution**:
- Check file is saved
- Restart dev server
- Check for syntax errors in console

---

**Problem**: Build fails with memory error

**Solution**:
```bash
# Increase Node memory limit
NODE_OPTIONS="--max-old-space-size=4096" npm run build
```

### Debugging Tips

**React DevTools**:
- Inspect component hierarchy
- View props and state
- Profile component renders

**Redux DevTools**:
- Inspect Redux state
- Time-travel debugging
- Action history

**Console logging**:
```javascript
console.log('Variable:', variable)
console.table(arrayOfObjects)
console.error('Error:', error)
```

**React error boundaries**:
```javascript
class ErrorBoundary extends React.Component {
  state = { hasError: false }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>
    }

    return this.props.children
  }
}
```

## Best Practices

### Performance

1. **Lazy load routes**: Use React.lazy() for code splitting
2. **Memoize expensive calculations**: Use useMemo()
3. **Optimize re-renders**: Use React.memo() for pure components
4. **Virtualize long lists**: Use libraries like react-window
5. **Optimize images**: Use WebP format, lazy loading

### Accessibility

1. **Semantic HTML**: Use proper heading hierarchy (h1-h6)
2. **ARIA labels**: Add aria-label for icon buttons
3. **Keyboard navigation**: Ensure all interactive elements are keyboard-accessible
4. **Color contrast**: Meet WCAG AA standards (4.5:1 for text)
5. **Form labels**: Associate all form inputs with labels

### Security

1. **Validate input**: Sanitize user input before rendering
2. **Use HTTPS**: Always serve over HTTPS in production
3. **Content Security Policy**: Configure CSP headers
4. **Dependency audits**: Run `npm audit` regularly
5. **Environment variables**: Never commit secrets to Git

### Code Organization

1. **Single Responsibility**: One component does one thing well
2. **DRY Principle**: Don't Repeat Yourself - extract reusable code
3. **Consistent naming**: Follow naming conventions throughout
4. **File organization**: Group related files together
5. **Documentation**: Comment complex logic and add JSDoc

### Git Workflow

**Commit messages** (Conventional Commits):
```
feat: add user profile page
fix: resolve navigation bug on mobile
docs: update README with deployment instructions
style: format code with Prettier
refactor: extract form validation logic
test: add tests for UserCard component
chore: update dependencies
```

**Branch naming**:
```
feature/user-profile
fix/navigation-bug
refactor/form-validation
docs/deployment-guide
```

---

This guide covers the essential workflows and patterns for developing with the CoreUI Free React Admin Template. For additional questions, consult the [CoreUI React Documentation](https://coreui.io/react/docs/) or the [React Documentation](https://react.dev/).

Happy coding! 🚀

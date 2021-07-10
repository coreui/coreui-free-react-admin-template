# Migration from version 3

## CSS

- `ml-*` to `ms-*`
- `mfs-*` to `ms-*`
- `mr-*` to `me-*`
- `mfe-*` to `me-*`
- `pl-*` to `ps-*`
- `pr-*` to `pe-*`
- `float-left` to `float-start`
- `float-right` to `float-end`

## Components

- Deprecated component `CEmbed`
- Deprecated component `CJumbotron`

### Badges

- variant="pill" => shape="rounded-pill"
- variant="square" => shape="rounded-0"

### Forms

- `CInput` => `CFormControl`
- `CInputCheckbox` => `CFormCheck`
- `CLabel` => `CFormLabel`
- `CSelect` => `CFormSelect`
- `CValidFeedback` => `CFormFeedback valid`
- `CInvalidFeedback` => `CFormFeedback invalid`

- Deprecated component `CFormGroup`
- Deprecated component `CInputGroupAppend`
- Deprecated component `CInputGroupPrepend`
- Depreacted component `CSwitch`, use `CFormCheck switch` instead of.
- Deprecated `.help-block`

### Header

- Deprecated pro `withSubheader`
- Deprecated component `CHeaderNavItem`, use `CNavItem` instead of.
- Deprecated component `CHeaderNavLink`, use `CNavLink` instead of.

### List Group

- Depracated prop `action` Use `component="a"` or `component="b"` instead of `action`.

### Modal

- Depracated prop `show` Use `visible` instead of.

### Popover

- Depracated prop `header` Use `title` instead of.

### Progress Bar

- Depracated prop `precision`
- Depracated prop `showLabel`
- Depracated prop `showPercentage`
- Depracated prop `showValue`

### Tabs

- Deprecated component `<CTabs>` use `<CNav variant="tabs">` without wrapper component `<CTabs>`


# Migration from version 2

Migration from version 2 must be performed manually because the components library `@coreui/coreui-react` has been completely rewritten.

The docs of the new components are available [here](https://coreui.io/react/docs/)

The good news is that most probably it will be sufficient to migrate layout components (Sidebar, Header, Footer, Aside) and `Switch` component

The best way to do a migration is:
1. Install `@coreui/coreui-react` v3
2. Make a copy of the current `containers` folder
2. Paste [containers](https://github.com/coreui/coreui-free-react-admin-template/tree/master/src/containers) folder from v3 template to project
3. Correct routing paths
4. Add previous content to new template layout components
5. Replace `Switch` components with `CSwitch`

Layout components/ corresponding components in version 3
- Aside -> CSidebar (with prop aside={true})
- AsideToggler -> CToggler
- Breadcrumb -> CBreadcrumbRouter
- Footer -> CFooter
- Header -> CHeader
- HeaderDropdown -> CDropdown
- NavbarBrand -> CSidebarBrand
- Sidebar -> CSidebar
- SidebarFooter -> CSidebarFooter
- SidebarForm -> CSidebarForm
- SidebarHeader -> CSidebarHeader
- SidebarMinimizer -> CSidebarMinimizer
- SidebarNav -> CSidebarNav + CSidebarNavDropdown + CSidebarNavItem
- SidebarToggler -> CSidebarToggler
- Switch -> CSwitch

After the migration is done, you can start using new components of `@coreui/coreui-react` v3 library.

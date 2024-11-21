<p align="center">
  <a href="https://coreui.io/">
    <img src="https://coreui.io/images/brand/coreui-icons.svg" alt="CoreUI Icons logo" height="50">
  </a>
</p>

<p align="center">
  Official React.js component for CoreUI Icons and CoreUI Icons PRO.
  <br>
  <a href="https://coreui.io/react/docs/components/icon/"><strong>Explore CoreUI Icons for React docs »</strong></a>
  <br>
  <br>
  <a href="https://github.com/coreui/coreui-icons/issues/new?template=bug_report.md">Report bug</a>
  ·
  <a href="https://github.com/coreui/coreui-icons/issues/new?template=feature_request.md">Request feature</a>
  ·
  <a href="https://blog.coreui.io/">Blog</a>
</p>


## Status
[![npm package][npm-badge]][npm]
[![NPM downloads][npm-download]][npm]
![react](https://img.shields.io/badge/react-^17.0.2-lightgrey.svg?style=flat-square&logo=react)


[npm-badge]: https://img.shields.io/npm/v/@coreui/icons-react/latest?style=flat-square
[npm]: https://www.npmjs.com/package/@coreui/icons-react
[npm-download]: https://img.shields.io/npm/dm/@coreui/icons-react.svg?style=flat-square

## Installation

```bash
npm install @coreui/icons
npm install @coreui/icons-react
```

or

```bash
yarn add @coreui/icons
yarn add @coreui/icons-react
```

## Use

### Single icon

```jsx
import { CIcon } from '@coreui/icons-react';
import { cifAU } from '@coreui/icons';

...
render() {
  return (
    <CIcon icon={cilList} size="xxl"/>
  )
}
...
```

### All icons

```jsx
import { CIcon } from '@coreui/icons-react';
import * as icon from '@coreui/icons';

...
render() {
  return (
    <CIcon icon={icon.cilList} size="xxl"/>
  )
}
...
```


## API

| property | type | description |
| --- | --- | --- |
| className | `string` | A string of all className you want applied to the component. |
| customClassName | `string` \| `object` \| `string[]` | Use for replacing default CIcon component classes. Prop is overriding the 'size' prop. |
| icon | `string` \| `string[]` | Name of the icon placed in React object or SVG content. |
| height | `number` | The height attribute defines the vertical length of an icon. |
| size | `sm` \| `md` \|`lg` \| `xl` \| `xxl` \| `3xl` \| `4xl` \| `5xl` \| `6xl` \| `7xl` \| `8xl` \| `9xl` | Size of the icon. |
| use | `string` | If defined component will be rendered using `use` tag. |
| title | `string` | Title tag content. |
| width | `number` | The width attribute defines the horizontal length of an icon. |

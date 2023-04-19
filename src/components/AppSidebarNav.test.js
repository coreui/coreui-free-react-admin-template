import React from 'react'
import { CNavGroup, CNavItem } from '@coreui/react'
import { AppSidebarNav } from './AppSidebarNav'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { render } from '@testing-library/react'

test('renders nav group without items attribute', () => {
  const navigation = [
    {
      component: CNavGroup,
      name: 'Base',
      to: '/base',
      items: [
        {
          component: CNavItem,
          name: 'Item',
          to: '/base/item',
        },
      ],
    },
  ]

  const { container } = render(
    <HashRouter>
      <Routes>
        <Route path="/" element={<AppSidebarNav items={navigation} />} />
      </Routes>
    </HashRouter>,
  )

  /* eslint-disable testing-library/no-container */
  /* eslint-disable testing-library/no-node-access */
  const groupElement = container.querySelector('.nav-group')
  expect(groupElement).toBeInTheDocument()
  expect(groupElement.hasAttribute('items')).toBeFalsy()
})

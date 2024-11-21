import * as React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { CHeader } from '../../../index'

test('loads and displays CHeader component', async () => {
  const { container } = render(<CHeader>Test</CHeader>)
  expect(container).toMatchSnapshot()
})

test('CHeader customize', async () => {
  const { container } = render(
    <CHeader className="bazinga" container="lg" position="sticky">
      Test
    </CHeader>,
  )
  expect(container).toMatchSnapshot()
  expect(container.firstChild).toHaveClass('bazinga')
  expect(container.firstChild).toHaveClass('header')
  expect(container.firstChild).toHaveClass('header-sticky')
})

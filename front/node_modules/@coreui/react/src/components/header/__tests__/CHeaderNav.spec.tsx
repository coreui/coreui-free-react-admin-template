import * as React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { CHeaderNav } from '../../../index'

test('loads and displays CHeaderNav component', async () => {
  const { container } = render(<CHeaderNav>Test</CHeaderNav>)
  expect(container).toMatchSnapshot()
})

test('CHeaderNav customize', async () => {
  const { container } = render(
    <CHeaderNav className="bazinga" as="h3">
      Test
    </CHeaderNav>,
  )
  expect(container).toMatchSnapshot()
  expect(container.firstChild).toHaveClass('bazinga')
  expect(container.firstChild).toHaveClass('header-nav')
})

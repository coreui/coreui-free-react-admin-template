import * as React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { CHeaderDivider } from '../../../index'

test('loads and displays CHeaderDivider component', async () => {
  const { container } = render(<CHeaderDivider>Test</CHeaderDivider>)
  expect(container).toMatchSnapshot()
})

test('CHeaderDivider customize', async () => {
  const { container } = render(<CHeaderDivider className="bazinga">Test</CHeaderDivider>)
  expect(container).toMatchSnapshot()
  expect(container.firstChild).toHaveClass('bazinga')
  expect(container.firstChild).toHaveClass('header-divider')
})

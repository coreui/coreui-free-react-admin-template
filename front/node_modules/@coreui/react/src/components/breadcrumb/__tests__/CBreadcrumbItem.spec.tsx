import * as React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { CBreadcrumbItem } from '../../../index'

test('loads and displays CBreadcrumbItem component', async () => {
  const { container } = render(<CBreadcrumbItem>Test</CBreadcrumbItem>)
  expect(container).toMatchSnapshot()
})

test('CBreadcrumbItem customize', async () => {
  const { container } = render(
    <CBreadcrumbItem active={true} className="bazinga">
      Test
    </CBreadcrumbItem>,
  )
  expect(container).toMatchSnapshot()
  expect(container.firstChild).toHaveClass('bazinga')
  expect(container.firstChild).toHaveClass('breadcrumb-item')
  expect(container.firstChild).toHaveClass('active')
})

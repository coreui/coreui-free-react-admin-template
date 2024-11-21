import * as React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { CTabContent } from '../../../index'

test('loads and displays CTabContent component', async () => {
  const { container } = render(<CTabContent>Test</CTabContent>)
  expect(container).toMatchSnapshot()
})

test('CTabContent customize', async () => {
  const { container } = render(<CTabContent className="bazinga">Test</CTabContent>)
  expect(container).toMatchSnapshot()
  expect(container.firstChild).toHaveClass('bazinga')
  expect(container.firstChild).toHaveClass('tab-content')
})

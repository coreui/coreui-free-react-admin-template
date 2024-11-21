import * as React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { CCallout } from '../../../index'

test('loads and displays CCallout component', async () => {
  const { container } = render(<CCallout>Test</CCallout>)
  expect(container).toMatchSnapshot()
})

test('CCallout customize', async () => {
  const { container } = render(
    <CCallout className="bazinga" color="primary">
      Test
    </CCallout>,
  )
  expect(container).toMatchSnapshot()
  expect(container.firstChild).toHaveClass('bazinga')
  expect(container.firstChild).toHaveClass('callout')
  expect(container.firstChild).toHaveClass('callout-primary')
})

import * as React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { CCardFooter } from '../../../index'

test('loads and displays CCardFooter component', async () => {
  const { container } = render(<CCardFooter>Test</CCardFooter>)
  expect(container).toMatchSnapshot()
})

test('CCardFooter customize', async () => {
  const { container } = render(<CCardFooter className="bazinga">Test</CCardFooter>)
  expect(container).toMatchSnapshot()
  expect(container.firstChild).toHaveClass('bazinga')
  expect(container.firstChild).toHaveClass('card-footer')
})

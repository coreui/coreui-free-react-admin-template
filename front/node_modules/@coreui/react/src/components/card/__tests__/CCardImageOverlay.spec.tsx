import * as React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { CCardImageOverlay } from '../../../index'

test('loads and displays CCardImageOverlay component', async () => {
  const { container } = render(<CCardImageOverlay />)
  expect(container).toMatchSnapshot()
})

test('CCardImageOverlay customize', async () => {
  const { container } = render(<CCardImageOverlay className="bazinga">Test</CCardImageOverlay>)
  expect(container).toMatchSnapshot()
  expect(container.firstChild).toHaveClass('card-img-overlay')
  expect(container.firstChild).toHaveClass('bazinga')
  expect(container.firstChild).toHaveTextContent('Test')
})

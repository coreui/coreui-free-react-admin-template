import * as React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { CFormFloating } from '../../../index'

test('loads and displays CFormFloating component', async () => {
  const { container } = render(<CFormFloating />)
  expect(container).toMatchSnapshot()
})

test('CFormFloating customize', async () => {
  const { container } = render(<CFormFloating className="bazinga">Test</CFormFloating>)
  expect(container).toMatchSnapshot()
  expect(container.firstChild).toHaveClass('form-floating')
  expect(container.firstChild).toHaveClass('bazinga')
  expect(container.firstChild).toHaveTextContent('Test')
})

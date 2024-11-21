import * as React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { CModalContent } from '../../../index'

test('loads and displays CModalContent component', async () => {
  const { container } = render(<CModalContent>Test</CModalContent>)
  expect(container).toMatchSnapshot()
})

test('CModalContent customize', async () => {
  const { container } = render(<CModalContent className="bazinga">Test</CModalContent>)
  expect(container).toMatchSnapshot()
  expect(container.firstChild).toHaveClass('bazinga')
  expect(container.firstChild).toHaveClass('modal-content')
})

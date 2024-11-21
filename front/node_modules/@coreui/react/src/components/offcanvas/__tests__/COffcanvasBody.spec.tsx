import * as React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { COffcanvasBody } from '../../../index'

test('loads and displays COffcanvasBody component', async () => {
  const { container } = render(<COffcanvasBody />)
  expect(container).toMatchSnapshot()
})

test('COffcanvasBody customize', async () => {
  const { container } = render(<COffcanvasBody className="bazinga">Test</COffcanvasBody>)
  expect(container).toMatchSnapshot()
  expect(container.firstChild).toHaveClass('offcanvas-body')
  expect(container.firstChild).toHaveClass('bazinga')
  expect(container.firstChild).toHaveTextContent('Test')
})

import * as React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { CModalTitle } from '../../../index'

test('loads and displays CModalTitle component', async () => {
  const { container } = render(<CModalTitle>Test</CModalTitle>)
  expect(container).toMatchSnapshot()
})

test('CModalTitle customize', async () => {
  const { container } = render(
    <CModalTitle className="bazinga" as="h3">
      Test
    </CModalTitle>,
  )
  expect(container).toMatchSnapshot()
  expect(container.firstChild).toHaveClass('bazinga')
  expect(container.firstChild).toHaveClass('modal-title')
})

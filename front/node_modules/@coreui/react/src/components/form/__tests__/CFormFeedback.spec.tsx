import * as React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { CFormFeedback } from '../../../index'

test('loads and displays CFormFeedback component', async () => {
  const { container } = render(<CFormFeedback />)
  expect(container).toMatchSnapshot()
})

test('CFormFeedback customize one', async () => {
  const { container } = render(
    <CFormFeedback className="bazinga" invalid={true} valid={true} tooltip={true} />,
  )
  expect(container).toMatchSnapshot()
  expect(container.firstChild).toHaveClass('invalid-tooltip')
  expect(container.firstChild).toHaveClass('valid-tooltip')
  expect(container.firstChild).toHaveClass('bazinga')
})

test('CFormFeedback customize two', async () => {
  const { container } = render(
    <CFormFeedback className="bazinga" invalid={true} valid={true} tooltip={false} />,
  )
  expect(container).toMatchSnapshot()
  expect(container.firstChild).toHaveClass('invalid-feedback')
  expect(container.firstChild).toHaveClass('valid-feedback')
  expect(container.firstChild).toHaveClass('bazinga')
})

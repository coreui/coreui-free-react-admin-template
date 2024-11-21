import * as React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { CFormInput } from '../../../index'

test('loads and displays CFormInput component', async () => {
  const { container } = render(<CFormInput />)
  expect(container).toMatchSnapshot()
})

test('CFormInput customize one', async () => {
  const { container } = render(<CFormInput />)
  expect(container).toMatchSnapshot()
  expect(container.firstChild).toHaveClass('form-control')
})

test('CFormInput customize two', async () => {
  const { container } = render(
    <CFormInput
      className="bazinga"
      disabled={true}
      invalid={true}
      plainText={true}
      readOnly={true}
      size="lg"
      type="color"
      valid={true}
      value="#888888"
    />,
  )
  expect(container).toMatchSnapshot()
  expect(container.firstChild).toHaveClass('form-control-lg')
  expect(container.firstChild).toHaveClass('form-control-color')
  expect(container.firstChild).toHaveClass('is-invalid')
  expect(container.firstChild).toHaveClass('is-valid')
  expect(container.firstChild).toHaveClass('form-control-plaintext')
  expect(container.firstChild).toHaveClass('bazinga')
  expect(container.firstChild).toHaveAttribute('value', '#888888')
  expect(container.firstChild).toHaveAttribute('type', 'color')
  expect(container.firstChild).toHaveAttribute('disabled', '')
  expect(container.firstChild).toHaveAttribute('readonly', '')
})

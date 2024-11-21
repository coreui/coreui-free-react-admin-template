import * as React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { CFormInput } from '../../../index'

test('loads and displays CFormInput component', async () => {
  const { container } = render(<CFormInput />)
  expect(container).toMatchSnapshot()
})

test('CFormInput customize', async () => {
  const { container } = render(
    <CFormInput
      className="bazinga"
      disabled={true}
      plainText={true}
      readOnly={true}
      size="lg"
      type="color"
      value="value"
    />,
  )
  expect(container).toMatchSnapshot()
  expect(container.firstChild).toHaveClass('bazinga')
  expect(container.firstChild).toHaveClass('form-control-plaintext')
  expect(container.firstChild).toHaveClass('form-control-color')
  expect(container.firstChild).toHaveClass('form-control-lg')
})

test('CFormInput change input', async () => {
  jest.useFakeTimers()
  const onChange = jest.fn()
  render(<CFormInput onChange={onChange} />)
  expect(onChange).toHaveBeenCalledTimes(0)
  const input = document.querySelector('input')
  if (input !== null) {
    fireEvent.change(input, { target: { value: 'bazinga' } })
  }
  expect(onChange).toHaveBeenCalledTimes(1)
  if (input !== null) {
    fireEvent.change(input, { target: { value: '2' } })
  }
  expect(onChange).toHaveBeenCalledTimes(2)
})

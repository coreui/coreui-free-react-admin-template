import * as React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { CFormSwitch } from '../../../index'

test('loads and displays CFormSwitch component', async () => {
  const { container } = render(<CFormSwitch />)
  expect(container).toMatchSnapshot()
})

test('CFormSwitch customize', async () => {
  const { container } = render(
    <CFormSwitch
      className="bazinga"
      id="2"
      invalid={true}
      label="Some label"
      size="xl"
      type="radio"
      valid={true}
    />,
  )
  expect(container).toMatchSnapshot()
  expect(container.firstChild).toHaveClass('form-check')
  expect(container.firstChild).toHaveClass('form-switch')
  expect(container.firstChild).toHaveClass('form-switch-xl')
  expect(container.firstChild).toHaveClass('is-invalid')
  expect(container.firstChild).toHaveClass('is-valid')
  expect(container.firstChild).toHaveClass('bazinga')
  if (container.firstChild === null) {
    expect(true).toBe(false)
  } else {
    expect(container.firstChild.firstChild).toHaveClass('form-check-input')
    expect(container.firstChild.firstChild).toHaveClass('is-invalid')
    expect(container.firstChild.firstChild).toHaveClass('is-valid')
    expect(container.firstChild.firstChild).toHaveAttribute('id', '2')
    expect(container.firstChild.firstChild).toHaveAttribute('type', 'radio')
    expect(container.firstChild.lastChild).toHaveClass('form-check-label')
    expect(container.firstChild.lastChild).toHaveTextContent('Some label')
    expect(container.firstChild.lastChild).toHaveAttribute('for', '2')
  }
})

import * as React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { CFormCheck } from '../../../index'

test('loads and displays CFormCheck component', async () => {
  const { container } = render(<CFormCheck />)
  expect(container).toMatchSnapshot()
})

test('CFormCheck customize button=false', async () => {
  const { container } = render(
    <CFormCheck className="bazinga" id="id" inline={true} label="label" type="radio" />,
  )
  expect(container).toMatchSnapshot()
  expect(container.firstChild).toHaveClass('bazinga')
  expect(container.firstChild).toHaveClass('form-check')
  expect(container.firstChild).toHaveClass('form-check-inline')
})

test('CFormCheck customize button=true', async () => {
  const { container } = render(
    <CFormCheck
      button={{ color: 'primary', size: 'lg', shape: 'rounded', variant: 'ghost' }}
      className="bazinga"
      id="id"
      inline={true}
      label="label"
      type="radio"
    />,
  )
  expect(container).toMatchSnapshot()
})

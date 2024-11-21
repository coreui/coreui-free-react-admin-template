import * as React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { CFormTextarea } from '../../../index'

test('loads and displays CFormTextarea component', async () => {
  const { container } = render(<CFormTextarea defaultValue="Some value" />)
  expect(container).toMatchSnapshot()
  expect(container.firstChild).toHaveClass('form-control')
})

test('CFormTextarea customize', async () => {
  const { container } = render(
    <CFormTextarea
      className="bazinga"
      disabled={true}
      invalid={true}
      plainText={true}
      readOnly={true}
      valid={true}
      defaultValue="Some value"
      rows={2}
    />,
  )
  expect(container).toMatchSnapshot()
  expect(container.firstChild).toHaveClass('form-control-plaintext')
  expect(container.firstChild).toHaveClass('is-invalid')
  expect(container.firstChild).toHaveClass('is-valid')
  expect(container.firstChild).toHaveClass('bazinga')
  expect(container.firstChild).toHaveTextContent('Some value')
  expect(container.firstChild).toHaveAttribute('disabled', '')
  expect(container.firstChild).toHaveAttribute('readonly', '')
})

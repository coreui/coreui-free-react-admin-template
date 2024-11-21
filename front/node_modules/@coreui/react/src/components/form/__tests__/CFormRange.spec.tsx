import * as React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { CFormRange } from '../../../index'

test('loads and displays CFormRange component', async () => {
  const { container } = render(<CFormRange step={3} />)
  expect(container).toMatchSnapshot()
})

test('CFormRange customize', async () => {
  const { container } = render(
    <CFormRange
      className="bazinga"
      step={2}
      disabled={true}
      max={150}
      min={20}
      readOnly={true}
      value={80}
    />,
  )
  expect(container).toMatchSnapshot()
  expect(container.firstChild).toHaveClass('form-range')
  expect(container.firstChild).toHaveClass('bazinga')
  expect(container.firstChild).toHaveAttribute('disabled', '')
  expect(container.firstChild).toHaveAttribute('max', '150')
  expect(container.firstChild).toHaveAttribute('min', '20')
  expect(container.firstChild).toHaveAttribute('readonly', '')
  expect(container.firstChild).toHaveAttribute('step', '2')
  expect(container.firstChild).toHaveAttribute('type', 'range')
  expect(container.firstChild).toHaveAttribute('value', '80')
})

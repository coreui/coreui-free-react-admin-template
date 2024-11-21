import * as React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { CButton } from '../../../index'

test('loads and displays CButton component', async () => {
  const { container } = render(<CButton color="primary">Test</CButton>)
  expect(container).toMatchSnapshot()
})

test('CButton customize witch href', async () => {
  const { container } = render(
    <CButton color="primary" as="span" href="/bazinga">
      Test
    </CButton>,
  )
  expect(container).toMatchSnapshot()
})

test('CButton customize', async () => {
  const { container } = render(
    <CButton
      active={true}
      className="bazinga"
      color="warning"
      as="span"
      disabled={true}
      role="bazinga"
      shape="rounded"
      size="lg"
      type="submit"
      variant="ghost"
    >
      Test
    </CButton>,
  )
  expect(container).toMatchSnapshot()

  expect(container.firstChild).toHaveClass('bazinga')
  expect(container.firstChild).toHaveClass('btn')
  expect(container.firstChild).toHaveClass('btn-ghost-warning')
  expect(container.firstChild).toHaveClass('btn-lg')
  expect(container.firstChild).toHaveClass('rounded')
})

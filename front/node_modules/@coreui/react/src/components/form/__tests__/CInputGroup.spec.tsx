import * as React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { CInputGroup } from '../../../index'

test('loads and displays CInputGroup component', async () => {
  const { container } = render(<CInputGroup>Test</CInputGroup>)
  expect(container).toMatchSnapshot()
})

test('CInputGroup customize', async () => {
  const { container } = render(
    <CInputGroup className="bazinga" size="lg">
      Test
    </CInputGroup>,
  )
  expect(container).toMatchSnapshot()
  expect(container.firstChild).toHaveClass('bazinga')
  expect(container.firstChild).toHaveClass('input-group')
  expect(container.firstChild).toHaveClass('input-group-lg')
})

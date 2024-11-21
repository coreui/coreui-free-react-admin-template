import * as React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { CCardHeader } from '../../../index'

test('loads and displays CCardHeader component', async () => {
  const { container } = render(<CCardHeader>Test</CCardHeader>)
  expect(container).toMatchSnapshot()
})

test('CCardHeader customize', async () => {
  const { container } = render(
    <CCardHeader className="bazinga" as="h3">
      Test
    </CCardHeader>,
  )
  expect(container).toMatchSnapshot()
  expect(container.firstChild).toHaveClass('bazinga')
  expect(container.firstChild).toHaveClass('card-header')
})

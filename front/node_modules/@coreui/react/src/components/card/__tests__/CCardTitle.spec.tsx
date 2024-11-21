import * as React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { CCardTitle } from '../../../index'

test('loads and displays CCardTitle component', async () => {
  const { container } = render(<CCardTitle>Test</CCardTitle>)
  expect(container).toMatchSnapshot()
})

test('CCardTitle customize', async () => {
  const { container } = render(
    <CCardTitle className="bazinga" as="h3">
      Test
    </CCardTitle>,
  )
  expect(container).toMatchSnapshot()
  expect(container.firstChild).toHaveClass('bazinga')
  expect(container.firstChild).toHaveClass('card-title')
})

import * as React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { CSpinner } from '../../../index'

test('loads and displays CSpinner component', async () => {
  const { container } = render(<CSpinner>Test</CSpinner>)
  expect(container).toMatchSnapshot()
})

test('CSpinner customize', async () => {
  const { container } = render(
    <CSpinner className="bazinga" color="warning" as="h3" size="sm" variant="grow">
      Test
    </CSpinner>,
  )
  expect(container).toMatchSnapshot()
  expect(container.firstChild).toHaveClass('bazinga')
  expect(container.firstChild).toHaveClass('spinner-grow')
  expect(container.firstChild).toHaveClass('text-warning')
  expect(container.firstChild).toHaveClass('spinner-grow-sm')
})

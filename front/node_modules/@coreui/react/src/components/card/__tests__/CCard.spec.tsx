import * as React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { CCard } from '../../../index'

test('loads and displays CCard component', async () => {
  const { container } = render(<CCard>Test</CCard>)
  expect(container).toMatchSnapshot()
})

test('CCard customize', async () => {
  const { container } = render(
    <CCard className="bazinga" color="primary" textColor="warning">
      Test
    </CCard>,
  )
  expect(container).toMatchSnapshot()
  expect(container.firstChild).toHaveClass('bazinga')
  expect(container.firstChild).toHaveClass('card')
  expect(container.firstChild).toHaveClass('bg-primary')
  expect(container.firstChild).toHaveClass('text-warning')
})

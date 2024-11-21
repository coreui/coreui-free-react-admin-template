import * as React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { CAlertLink } from '../../../index'

test('loads and displays CAlertLink component', async () => {
  const { container } = render(<CAlertLink>Test</CAlertLink>)
  expect(container).toMatchSnapshot()
})

test('CAlertLink customize', async () => {
  const { container } = render(
    <CAlertLink className="bazinga" href="/bazinga">
      Test
    </CAlertLink>,
  )
  expect(container).toMatchSnapshot()
  expect(container.firstChild).toHaveClass('bazinga')
  expect(container.firstChild).toHaveClass('alert-link')
})

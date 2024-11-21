import * as React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { CAlertHeading } from '../../../index'

test('loads and displays CAlertHeading component', async () => {
  const { container } = render(<CAlertHeading>Test</CAlertHeading>)
  expect(container).toMatchSnapshot()
})

test('CAlertHeading customize', async () => {
  const { container } = render(
    <CAlertHeading as="h3" className="bazinga">
      Test
    </CAlertHeading>,
  )
  expect(container).toMatchSnapshot()
  expect(container.firstChild).toHaveClass('bazinga')
  expect(container.firstChild).toHaveClass('alert-heading')
})

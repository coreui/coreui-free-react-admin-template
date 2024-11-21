import * as React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { CFooter } from '../../../index'

test('loads and displays CFooter component', async () => {
  const { container } = render(<CFooter>Test</CFooter>)
  expect(container).toMatchSnapshot()
})

test('CFooter customize', async () => {
  const { container } = render(
    <CFooter className="bazinga" position="fixed">
      Test
    </CFooter>,
  )
  expect(container).toMatchSnapshot()
  expect(container.firstChild).toHaveClass('bazinga')
  expect(container.firstChild).toHaveClass('footer')
  expect(container.firstChild).toHaveClass('footer-fixed')
})

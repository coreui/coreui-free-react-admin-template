import * as React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { CCloseButton } from '../../../index'

test('loads and displays CCloseButton component', async () => {
  const { container } = render(<CCloseButton>Test</CCloseButton>)
  expect(container).toMatchSnapshot()
})

test('CCloseButton customize', async () => {
  const { container } = render(
    <CCloseButton white={true} disabled={true} className="bazinga">
      Test
    </CCloseButton>,
  )
  expect(container).toMatchSnapshot()
  expect(container.firstChild).toHaveClass('bazinga')
  expect(container.firstChild).toHaveClass('btn')
  expect(container.firstChild).toHaveClass('btn-close')
  expect(container.firstChild).toHaveClass('btn-close-white')
  expect(container.firstChild).toHaveAttribute('disabled')
})

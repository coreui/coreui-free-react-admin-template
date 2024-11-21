import * as React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { CCloseButton } from '../../../index'

test('loads and displays CCloseButton component', async () => {
  const { container } = render(<CCloseButton />)
  const button = document.querySelector('button')
  expect(button).toHaveClass('btn')
  expect(button).toHaveClass('btn-close')
  expect(button).toHaveAttribute('aria-label', 'Close')
  expect(container).toMatchSnapshot()
})

test('CCloseButton customize', async () => {
  const { container } = render(<CCloseButton white={true} disabled={true} className="bazinga" />)
  const button = document.querySelector('button')
  expect(button).toHaveClass('btn')
  expect(button).toHaveClass('btn-close')
  expect(button).toHaveClass('btn-close-white')
  expect(button).toHaveClass('bazinga')
  expect(button).toHaveAttribute('aria-label', 'Close')
  expect(container).toMatchSnapshot()
})

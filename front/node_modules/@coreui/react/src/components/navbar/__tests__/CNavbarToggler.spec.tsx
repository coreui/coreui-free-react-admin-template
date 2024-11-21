import * as React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { CNavbarToggler } from '../../../index'

test('CNavbarToggler witch children', async () => {
  const { container } = render(<CNavbarToggler>Test</CNavbarToggler>)
  expect(container).toMatchSnapshot()
})

test('CNavbarToggler witch no children', async () => {
  const { container } = render(<CNavbarToggler />)
  expect(container).toMatchSnapshot()
  const arrLength = container.getElementsByClassName('navbar-toggler-icon').length
  expect(arrLength).toBe(1)
})

test('CNavbarToggler customize', async () => {
  const { container } = render(<CNavbarToggler className="bazinga" />)
  expect(container).toMatchSnapshot()
  expect(container.firstChild).toHaveClass('bazinga')
  expect(container.firstChild).toHaveClass('navbar-toggler')
})

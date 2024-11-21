import * as React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { CModalHeader } from '../../../index'

test('loads and displays CModalHeader component', async () => {
  const { container } = render(<CModalHeader>Test</CModalHeader>)
  expect(container).toMatchSnapshot()
})

test('CModalHeader customize', async () => {
  const { container } = render(<CModalHeader className="bazinga">Test</CModalHeader>)
  expect(container).toMatchSnapshot()
  expect(container.firstChild).toHaveClass('bazinga')
  expect(container.firstChild).toHaveClass('modal-header')
})

test('CModalHeader has a close button', async () => {
  const onDismiss = jest.fn()
  render(<CModalHeader className="bazinga">Test</CModalHeader>)
  expect(onDismiss).toHaveBeenCalledTimes(0)
  const btn = document.querySelector('.btn-close')
  expect(btn).toBeTruthy()
})

import * as React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { CToast, CToastBody, CToastHeader } from '../../../index'

test('loads and displays CToast component', async () => {
  const { container } = render(<CToast>Test</CToast>)
  expect(container).toMatchSnapshot()
})

test('CToast customize', async () => {
  const { container } = render(
    <CToast
      className="bazinga"
      autohide={false}
      color="warning"
      delay={100}
      visible={true}
      //onClose
    >
      Test
    </CToast>,
  )
  await waitFor(() => {
    expect(container).toMatchSnapshot()
    expect(container.firstChild).toHaveClass('bazinga')
    expect(container.firstChild).toHaveClass('toast')
    expect(container.firstChild).toHaveClass('fade')
    expect(container.firstChild).toHaveClass('bg-warning')
    expect(container.firstChild).toHaveClass('show')
  })
})

test('CToast click on dismiss button', async () => {
  // jest.useFakeTimers()
  const onClose = jest.fn()
  const { container } = render(
    <CToast
      className="bazinga"
      autohide={false}
      color="warning"
      delay={100}
      visible={true}
      onClose={onClose}
    >
      <CToastHeader closeButton>
        <svg
          className="rounded me-2"
          width="20"
          height="20"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
          focusable="false"
          role="img"
        >
          <rect width="100%" height="100%" fill="#007aff"></rect>
        </svg>
        <strong className="me-auto">CoreUI for React.js</strong>
        <small>7 min ago</small>
      </CToastHeader>
      <CToastBody>Hello, world! This is a toast message.</CToastBody>
    </CToast>,
  )
  await waitFor(() => {
    expect(container.firstChild).toHaveClass('show')
  })

  expect(onClose).toHaveBeenCalledTimes(0)
  const btn = document.querySelector('.btn-close')
  if (btn !== null) {
    fireEvent.click(btn)
  }
  jest.runAllTimers()
  await new Promise((r) => setTimeout(r, 1000))
  expect(onClose).toHaveBeenCalledTimes(1)
  expect(container.firstChild).toBeNull()
  jest.useRealTimers()
})

test('CToast test autohide', async () => {
  const { container } = render(
    <CToast autohide={true} delay={1000} visible={true}>
      Test
    </CToast>,
  )

  await waitFor(() => {
    expect(container.firstChild).toHaveClass('show')
  })

  await waitFor(
    () => {
      expect(container.firstChild).toBeNull()
    },
    {
      timeout: 5000,
    },
  )
})

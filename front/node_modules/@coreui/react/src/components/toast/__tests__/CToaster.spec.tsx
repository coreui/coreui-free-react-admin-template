import React from 'react' //  useState,
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { CToast, CToaster, CToastBody, CToastHeader, CButton } from '../../../index'

test('loads and displays CToaster component', async () => {
  const { container } = render(<CToaster>Test</CToaster>)
  expect(container).toMatchSnapshot()
})

test('CToaster customize', async () => {
  jest.useFakeTimers()
  let toast = <></>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const addToast = function (t: any) {
    toast = t
  }
  const { container } = render(
    <>
      <CToaster push={toast} className="bazinga" />
      <CButton
        onClick={() =>
          addToast(
            <>
              <CToast autohide={false}>
                <CToastHeader closeButton>Lorem ipsum</CToastHeader>
                <CToastBody>Hello, world! This is a toast message.</CToastBody>
              </CToast>
            </>,
          )
        }
      >
        Send a toast
      </CButton>
    </>,
  )
  expect(container).toMatchSnapshot()
  const btn = document.querySelector('.btn')
  if (btn !== null) {
    fireEvent.click(btn)
  }
  jest.runAllTimers()
  expect(container.firstChild).toHaveClass('bazinga')
  expect(container.firstChild).toHaveClass('toaster')
  expect(container.firstChild).toHaveClass('toast-container')
  jest.useRealTimers()
})

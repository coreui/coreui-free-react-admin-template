import * as React from 'react'
import { act, render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { CPopover, CButton } from '../../../index'

test('loads and displays CPopover component', async () => {
  const { container } = render(
    <CPopover content="A">
      <CButton color="primary">Test</CButton>
    </CPopover>,
  )
  expect(container).toMatchSnapshot()
})

test('CPopover customize', async () => {
  jest.useFakeTimers()
  let arr, element
  const { container } = render(
    <CPopover content="content" title="title" trigger="click" placement="right">
      <CButton color="primary">Test</CButton>
    </CPopover>,
    { container: document.body },
  )
  const btn = document.querySelector('.btn')
  act(() => {
    if (btn !== null) {
      fireEvent.click(btn)
    }
  })
  jest.runAllTimers()
  expect(container).toMatchSnapshot()
  let arrLength = container.getElementsByClassName('popover').length
  expect(arrLength).toBe(1)
  arrLength = container.getElementsByClassName('bs-popover-end').length
  expect(arrLength).toBe(1)
  arrLength = container.getElementsByClassName('popover-arrow').length
  expect(arrLength).toBe(1)
  arrLength = container.getElementsByClassName('popover-header').length
  expect(arrLength).toBe(1)
  arrLength = container.getElementsByClassName('popover-body').length
  expect(arrLength).toBe(1)
  arr = container.getElementsByClassName('popover-header')
  if (arr.length > 0) {
    element = arr[0]
    expect(element.innerHTML).toBe('title')
  } else {
    expect(true).toBe(false)
  }
  arr = container.getElementsByClassName('popover-body')
  if (arr.length > 0) {
    element = arr[0]
    expect(element.innerHTML).toBe('content')
  } else {
    expect(true).toBe(false)
  }
  jest.useRealTimers()
})

// test('CPopover onToggle', async () => {
//   let btn
//   jest.useFakeTimers()
//   const onToggle = jest.fn()
//   render(
//     <CPopover onToggle={onToggle} content="content" trigger="click">
//       <CButton>Test</CButton>
//     </CPopover>,
//   )
//   expect(onToggle).toHaveBeenCalledTimes(0)
//   btn = document.querySelector('.btn')
//   if (btn !== null) {
//     fireEvent.click(btn)
//   }
//   jest.runAllTimers()
//   expect(onToggle).toHaveBeenCalledTimes(1)
//   btn = document.querySelector('.btn')
//   if (btn !== null) {
//     fireEvent.click(btn)
//   }
//   jest.runAllTimers()
//   expect(onToggle).toHaveBeenCalledTimes(2)
//   jest.useRealTimers()
// })

//TODO: test visible on focus, click and mouseEnter

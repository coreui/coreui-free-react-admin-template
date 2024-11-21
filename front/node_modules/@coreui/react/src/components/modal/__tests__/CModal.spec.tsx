import * as React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { CModal } from '../../../index'

test('loads and displays CModal component', async () => {
  const { container } = render(<CModal portal={false}>Test</CModal>)
  expect(container).toMatchSnapshot()
})

test('CModal customize', async () => {
  const { container } = render(
    <CModal
      alignment="center"
      className="bazinga"
      duration={100}
      fullscreen="xl"
      scrollable={true}
      size="xl"
      visible={true}
    >
      Test
    </CModal>,
  )
  expect(container).toMatchSnapshot()
})

test('CModal dialog close on press ESC', async () => {
  const onClose = jest.fn()
  render(
    <CModal onClose={onClose} portal={false} visible>
      Test
    </CModal>,
  )
  expect(onClose).toHaveBeenCalledTimes(0)
  const modal = document.querySelector('.modal')
  if (modal !== null) {
    fireEvent.keyDown(modal, {
      key: 'Escape',
      code: 'Escape',
      keyCode: 27,
      charCode: 27,
    })
  }
  await new Promise((r) => setTimeout(r, 1000))
  console.log(modal)
  expect(onClose).toHaveBeenCalledTimes(1)
})

test('CModal dialog close on backdrop', async () => {
  jest.useFakeTimers()
  const onClose = jest.fn()
  render(
    <CModal onClose={onClose} portal={false} visible={true}>
      Test
    </CModal>,
  )
  expect(onClose).toHaveBeenCalledTimes(0)
  const backdrop = document.querySelector('.modal-backdrop')
  if (backdrop !== null) {
    fireEvent.click(backdrop)
  }
  jest.runAllTimers()
  expect(onClose).toHaveBeenCalledTimes(1)
  jest.useRealTimers()
})

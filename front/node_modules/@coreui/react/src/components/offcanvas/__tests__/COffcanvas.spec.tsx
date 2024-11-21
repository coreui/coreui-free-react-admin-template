import * as React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { COffcanvas } from '../../../index'

test('loads and displays COffcanvas component', async () => {
  const { container } = render(<COffcanvas placement="top" />)
  expect(container).toMatchSnapshot()
})

test('COffcanvas customize one', async () => {
  const { container } = render(
    <COffcanvas
      className="bazinga"
      backdrop={false}
      keyboard={false}
      placement="start"
      portal={false}
      visible={false}
    >
      Test
    </COffcanvas>,
  )
  expect(container).toMatchSnapshot()
  expect(container.firstChild).toHaveClass('offcanvas')
  expect(container.firstChild).toHaveClass('offcanvas-start')
  expect(container.firstChild).toHaveClass('bazinga')
  expect(container.firstChild).toHaveTextContent('Test')
})

test('COffcanvas customize and event on click backdrop', async () => {
  // jest.useFakeTimers()
  const onHide = jest.fn()
  const { container } = render(
    <COffcanvas
      className="bazinga"
      backdrop={true}
      keyboard={true}
      placement="end"
      portal={false}
      visible={true}
      onHide={onHide}
    >
      Test
    </COffcanvas>,
  )
  expect(container).toMatchSnapshot()
  expect(container.firstChild).toHaveClass('offcanvas')
  expect(container.firstChild).toHaveClass('offcanvas-end')
  expect(container.firstChild).toHaveClass('bazinga')
  expect(container.firstChild).toHaveClass('show')
  expect(container.firstChild).toHaveTextContent('Test')
  expect(onHide).toHaveBeenCalledTimes(0)
  const backdrop = document.querySelector('.offcanvas-backdrop')
  if (backdrop !== null) {
    fireEvent.click(backdrop)
  }
  expect(onHide).toHaveBeenCalledTimes(1)
  expect(container.firstChild).toHaveClass('show')
  expect(container.firstChild).toHaveClass('hiding')
  await new Promise((r) => setTimeout(r, 1000))
  expect(container.firstChild).not.toHaveClass('show')
})

test('COffcanvas customize and event on keypress', async () => {
  const onHide = jest.fn()
  const { container } = render(
    <COffcanvas
      className="bazinga"
      backdrop={true}
      keyboard={true}
      placement="end"
      portal={false}
      visible={true}
      onHide={onHide}
    >
      Test
    </COffcanvas>,
  )
  expect(container).toMatchSnapshot()
  expect(container.firstChild).toHaveClass('offcanvas')
  expect(container.firstChild).toHaveClass('offcanvas-end')
  expect(container.firstChild).toHaveClass('bazinga')
  expect(container.firstChild).toHaveClass('show')
  expect(onHide).toHaveBeenCalledTimes(0)
  const canvas = document.querySelector('.offcanvas')
  if (canvas === null) {
    expect(true).toBe(false)
  } else {
    fireEvent.keyDown(canvas, {
      key: 'Escape',
      code: 'Escape',
      keyCode: 27,
      charCode: 27,
    })
  }
  expect(onHide).toHaveBeenCalledTimes(1)
  expect(container.firstChild).toHaveClass('show')
  expect(container.firstChild).toHaveClass('hiding')
  await new Promise((r) => setTimeout(r, 1000))
  expect(container.firstChild).not.toHaveClass('show')
})

import * as React from 'react'
import { act } from 'react-dom/test-utils'
import { fireEvent, render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { CTooltip, CLink } from '../../../index'

let container: HTMLDivElement | null

beforeEach(() => {
  container = document.createElement('div')
  document.body.appendChild(container)
})

afterEach(() => {
  container && container.remove()
  container = null
})

test('loads and displays CTooltip component', async () => {
  const { container } = render(
    <CTooltip content="content">
      <CLink>Test</CLink>
    </CTooltip>,
  )
  expect(container).toMatchSnapshot()
})

test('CTooltip customize', async () => {
  const { container } = render(
    <CTooltip trigger="hover" placement="right" content="content">
      <CLink className="link">Test</CLink>
    </CTooltip>,
  )
  const link = document.querySelector('.link')
  act(() => {
    if (link !== null) {
      fireEvent.mouseOver(link)
    }
  })
  expect(container).toMatchSnapshot()
})

// test('CTooltip on toggle', async () => {
//   jest.useFakeTimers()
//   const onToggle = jest.fn()
//   render(
//     <CTooltip
//       trigger="click"
//       placement="right-end"
//       content="content"
//       visible={true}
//       onToggle={onToggle}
//     >
//       <CButton>Test</CButton>
//     </CTooltip>,
//   )
//   expect(onToggle).toHaveBeenCalledTimes(0)
//   const btn = document.querySelector('.btn')
//   if (btn !== null) {
//     fireEvent.click(btn)
//   }
//   expect(onToggle).toHaveBeenCalledTimes(1)
// })

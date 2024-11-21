import * as React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import {
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CDropdownItemPlain,
  CDropdownHeader,
  CDropdownDivider,
} from '../../../index'

test('loads and displays CDropdown component', async () => {
  const { container } = render(<CDropdown>Test</CDropdown>)
  expect(container).toMatchSnapshot()
})

test('CDropdown customize', async () => {
  const { container } = render(
    <CDropdown
      alignment={{ lg: 'start' }}
      className="bazinga"
      as="h3"
      dark={true}
      direction="dropstart"
      placement="right-end"
      popper={true}
      variant="nav-item"
      visible={true}
    >
      Test
    </CDropdown>,
  )
  expect(container).toMatchSnapshot()
  expect(container.firstChild).toHaveClass('bazinga')
  expect(container.firstChild).toHaveClass('nav-item')
  expect(container.firstChild).toHaveClass('dropdown')
  expect(container.firstChild).toHaveClass('dropstart')
})

// test('CDropdown change visible prop', async () => {
//   jest.useFakeTimers()
//   const { rerender } = render(<CDropdown visible={false}>Test</CDropdown>)
//   expect(screen.getByText('Test')).not.toHaveClass('show')
//   rerender(<CDropdown visible={true}>Test</CDropdown>)
//   jest.runAllTimers()
//   expect(screen.getByText('Test')).toHaveClass('show')
//   rerender(<CDropdown visible={false}>Test</CDropdown>)
//   expect(screen.getByText('Test')).not.toHaveClass('show')
//   jest.runAllTimers()
//   jest.useRealTimers()
// })

test('CDropdown click', async () => {
  render(
    <CDropdown>
      <CDropdownToggle>Test</CDropdownToggle>
      <CDropdownMenu>
        <CDropdownItem>A</CDropdownItem>
        <CDropdownItem>B</CDropdownItem>
      </CDropdownMenu>
    </CDropdown>,
  )
  expect(screen.getByText('Test')).not.toHaveClass('show')
  const el = screen.getByText('Test')
  if (el !== null) {
    fireEvent.click(el) //click on element
  }
  jest.runAllTimers()
  expect(screen.getByText('Test').closest('div')).toHaveClass('show')
  fireEvent.mouseUp(document.body) //click outside
  await new Promise((r) => setTimeout(r, 1000))
  expect(screen.getByText('Test').closest('div')).not.toHaveClass('show')
})

test('CDropdown example', async () => {
  jest.useFakeTimers()
  const { container } = render(
    <CDropdown>
      <CDropdownToggle>Test</CDropdownToggle>
      <CDropdownMenu>
        <CDropdownHeader>A</CDropdownHeader>
        <CDropdownItem>B</CDropdownItem>
        <CDropdownItemPlain>C</CDropdownItemPlain>
        <CDropdownDivider />
        <CDropdownItem>D</CDropdownItem>
      </CDropdownMenu>
    </CDropdown>,
  )
  expect(container).toMatchSnapshot()
})

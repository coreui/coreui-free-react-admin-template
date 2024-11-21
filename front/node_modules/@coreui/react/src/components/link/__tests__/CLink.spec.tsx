import * as React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { CLink } from '../../../index'

test('loads and displays CLink component', async () => {
  const { container } = render(<CLink>Test</CLink>)
  expect(container).toMatchSnapshot()
})

test('CLink customize', async () => {
  const { container } = render(
    <CLink className="bazinga" active={true} as="button" disabled type="submit">
      Test
    </CLink>,
  )
  expect(container).toMatchSnapshot()
  expect(container.firstChild).toHaveClass('bazinga')
  expect(container.firstChild).toHaveClass('active')
  expect(container.firstChild).toHaveAttribute('disabled')
})

test('CLink click on button', async () => {
  const onClick = jest.fn()
  render(
    <CLink onClick={onClick} className="bazinga">
      Test
    </CLink>,
  )
  expect(onClick).toHaveBeenCalledTimes(0)
  const link = document.querySelector('.bazinga')
  if (link !== null) {
    fireEvent.click(link)
  }
  expect(onClick).toHaveBeenCalledTimes(1)
})

test('CLink click on disabled button', async () => {
  const click = jest.fn()
  render(
    <CLink onClick={click} className="bazinga" as="button" disabled>
      Test
    </CLink>,
  )
  expect(click).toHaveBeenCalledTimes(0)
  const link = document.querySelector('.bazinga')
  if (link !== null) {
    fireEvent.click(link)
  }
  expect(click).toHaveBeenCalledTimes(0)
})

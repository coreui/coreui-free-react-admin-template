import * as React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { CNavGroup } from '../../../index'

test('loads and displays CNavGroup component', async () => {
  const { container } = render(<CNavGroup toggler="anchorText" />)
  expect(container).toMatchSnapshot()
})

test('CNavGroup customize', async () => {
  const { container } = render(
    <CNavGroup className="bazinga" toggler="anchorText" visible={true} idx="1" />,
  )
  expect(container).toMatchSnapshot()
  expect(container.firstChild).toHaveClass('nav-group')
  expect(container.firstChild).toHaveClass('bazinga')
  const arr = container.getElementsByClassName('nav-link')
  if (arr.length > 0) {
    //expect(arr[0].innerText).toHaveTextContent('anchorText')
    expect(arr[0].innerHTML).toBe('anchorText')
  } else {
    expect(true).toBe(false)
  }
})

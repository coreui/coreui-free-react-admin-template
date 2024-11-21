import * as React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { CPaginationItem } from '../../../index'

test('loads and displays CPaginationItem component', async () => {
  const { container } = render(<CPaginationItem>Test</CPaginationItem>)
  expect(container).toMatchSnapshot()
})

test('CPaginationItem customize', async () => {
  const { container } = render(
    <CPaginationItem className="bazinga" active={true} as="h3" disabled={true}>
      Test
    </CPaginationItem>,
  )
  expect(container).toMatchSnapshot()
  expect(container.firstChild).toHaveClass('bazinga')
  expect(container.firstChild).toHaveClass('page-item')
  expect(container.firstChild).toHaveClass('active')
  expect(container.firstChild).toHaveClass('disabled')
  let element = container.firstChild
  if (element === null) {
    expect(true).toBe(false)
  } else {
    element = element.firstChild
    expect(element).toHaveClass('page-link')
  }
})

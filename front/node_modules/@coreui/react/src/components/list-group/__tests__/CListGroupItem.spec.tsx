import * as React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { CListGroupItem } from '../../../index'

test('loads and displays CListGroupItem component', async () => {
  const { container } = render(<CListGroupItem>Test</CListGroupItem>)
  expect(container).toMatchSnapshot()
})

test('CListGroupItem customize', async () => {
  const { container } = render(
    <CListGroupItem className="bazinga" active={true} color="warning" disabled={true} as="button">
      Test
    </CListGroupItem>,
  )
  expect(container).toMatchSnapshot()
  expect(container.firstChild).toHaveClass('bazinga')
  expect(container.firstChild).toHaveClass('list-group-item')
  expect(container.firstChild).toHaveClass('list-group-item-action')
  expect(container.firstChild).toHaveClass('active')
  expect(container.firstChild).toHaveClass('disabled')
})

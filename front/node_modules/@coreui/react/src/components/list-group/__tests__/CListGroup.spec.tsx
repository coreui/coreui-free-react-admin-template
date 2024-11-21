import * as React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { CListGroup, CListGroupItem } from '../../../index'

test('loads and displays CListGroup component', async () => {
  const { container } = render(<CListGroup>Test</CListGroup>)
  expect(container).toMatchSnapshot()
})

test('CListGroup customize', async () => {
  const { container } = render(
    <CListGroup className="bazinga" as="h3" flush={true} layout="horizontal-xl">
      Test
    </CListGroup>,
  )
  expect(container).toMatchSnapshot()
  expect(container.firstChild).toHaveClass('bazinga')
  expect(container.firstChild).toHaveClass('list-group')
  expect(container.firstChild).toHaveClass('list-group-flush')
  expect(container.firstChild).toHaveClass('list-group-horizontal-xl')
})

test('CListGroup example', async () => {
  const { container } = render(
    <CListGroup>
      <CListGroupItem>A</CListGroupItem>
      <CListGroupItem>B</CListGroupItem>
      <CListGroupItem>C</CListGroupItem>
    </CListGroup>,
  )
  expect(container).toMatchSnapshot()
})

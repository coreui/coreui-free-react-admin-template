import * as React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { CButtonGroup, CButton } from '../../../index'

test('loads and displays CButtonGroup component', async () => {
  const { container } = render(<CButtonGroup></CButtonGroup>)
  expect(container).toMatchSnapshot()
})

test('CButtonGroup customize', async () => {
  const { container } = render(
    <CButtonGroup className="bazinga" size="lg" vertical={false}>
      <CButton color="primary">Test A</CButton>
      <CButton color="primary">Test B</CButton>
      <CButton color="primary">Test C</CButton>
    </CButtonGroup>,
  )
  expect(container).toMatchSnapshot()
  expect(container.firstChild).toHaveClass('bazinga')
  expect(container.firstChild).toHaveClass('btn-group')
  expect(container.firstChild).toHaveClass('btn-group-lg')
})

test('CButtonGroup customize vertical', async () => {
  const { container } = render(
    <CButtonGroup className="bazinga" size="lg" vertical={true}>
      <CButton color="primary">Test A</CButton>
      <CButton color="primary">Test B</CButton>
      <CButton color="primary">Test C</CButton>
    </CButtonGroup>,
  )
  expect(container).toMatchSnapshot()
  expect(container.firstChild).toHaveClass('bazinga')
  expect(container.firstChild).toHaveClass('btn-group-vertical')
  expect(container.firstChild).toHaveClass('btn-group-lg')
})

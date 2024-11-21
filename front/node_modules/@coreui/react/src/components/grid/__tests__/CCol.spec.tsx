import * as React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { CCol } from '../../../index'

test('CCol no-breakpoints', async () => {
  const { container } = render(<CCol>Test</CCol>)
  expect(container).toMatchSnapshot()
  expect(container.firstChild).toHaveClass('col')
})

test('CCol customize breakpoints are numbers', async () => {
  const { container } = render(
    <CCol className="bazinga" xs={1} sm={2} md={3} lg={4} xl={5} xxl={6}>
      Test
    </CCol>,
  )
  expect(container).toMatchSnapshot()
  expect(container.firstChild).toHaveClass('bazinga')
  expect(container.firstChild).toHaveClass('col-1')
  expect(container.firstChild).toHaveClass('col-sm-2')
  expect(container.firstChild).toHaveClass('col-md-3')
  expect(container.firstChild).toHaveClass('col-lg-4')
  expect(container.firstChild).toHaveClass('col-xl-5')
  expect(container.firstChild).toHaveClass('col-xxl-6')
})

test('CCol customize breakpoints are boolean', async () => {
  const { container } = render(
    <CCol className="bazinga" xs={true} sm={true} md={true} lg={true} xl={true} xxl={true}>
      Test
    </CCol>,
  )
  expect(container).toMatchSnapshot()
  expect(container.firstChild).toHaveClass('bazinga')
  expect(container.firstChild).toHaveClass('col')
  expect(container.firstChild).toHaveClass('col-sm')
  expect(container.firstChild).toHaveClass('col-md')
  expect(container.firstChild).toHaveClass('col-lg')
  expect(container.firstChild).toHaveClass('col-xl')
  expect(container.firstChild).toHaveClass('col-xxl')
})

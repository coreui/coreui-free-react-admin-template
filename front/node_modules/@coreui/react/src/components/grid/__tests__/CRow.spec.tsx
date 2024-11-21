import * as React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { CRow } from '../../../index'

test('CRow not-customize', async () => {
  const { container } = render(<CRow>Test</CRow>)
  expect(container).toMatchSnapshot()
})

test('CRow customize cols', async () => {
  const { container } = render(
    <CRow
      className="bazinga"
      xs={{ cols: 1 }}
      sm={{ cols: 2 }}
      md={{ cols: 3 }}
      lg={{ cols: 4 }}
      xl={{ cols: 5 }}
      xxl={{ cols: 6 }}
    >
      Test
    </CRow>,
  )
  expect(container).toMatchSnapshot()
  expect(container.firstChild).toHaveClass('bazinga')
  expect(container.firstChild).toHaveClass('row-cols-1')
  expect(container.firstChild).toHaveClass('row-cols-sm-2')
  expect(container.firstChild).toHaveClass('row-cols-md-3')
  expect(container.firstChild).toHaveClass('row-cols-lg-4')
  expect(container.firstChild).toHaveClass('row-cols-xl-5')
  expect(container.firstChild).toHaveClass('row-cols-xxl-6')
})

test('CRow customize gutter single gutter', async () => {
  const { container } = render(
    <CRow className="bazinga" xs={{ gutter: 7 }}>
      Test
    </CRow>,
  )
  expect(container).toMatchSnapshot()
  expect(container.firstChild).toHaveClass('bazinga')
  expect(container.firstChild).toHaveClass('g-7')
})

test('CRow customize gutter', async () => {
  const { container } = render(
    <CRow
      className="bazinga"
      xs={{ gutter: 1 }}
      sm={{ gutter: 2 }}
      md={{ gutter: 3 }}
      lg={{ gutter: 4 }}
      xl={{ gutter: 5 }}
      xxl={{ gutter: 6 }}
    >
      Test
    </CRow>,
  )
  expect(container).toMatchSnapshot()
  expect(container.firstChild).toHaveClass('bazinga')
  expect(container.firstChild).toHaveClass('g-1')
  expect(container.firstChild).toHaveClass('g-sm-2')
  expect(container.firstChild).toHaveClass('g-md-3')
  expect(container.firstChild).toHaveClass('g-lg-4')
  expect(container.firstChild).toHaveClass('g-xl-5')
  expect(container.firstChild).toHaveClass('g-xxl-6')
})

test('CRow customize gutterX', async () => {
  const { container } = render(
    <CRow
      className="bazinga"
      xs={{ gutterX: 1 }}
      sm={{ gutterX: 2 }}
      md={{ gutterX: 3 }}
      lg={{ gutterX: 4 }}
      xl={{ gutterX: 5 }}
      xxl={{ gutterX: 6 }}
    >
      Test
    </CRow>,
  )
  expect(container).toMatchSnapshot()
  expect(container.firstChild).toHaveClass('bazinga')
  expect(container.firstChild).toHaveClass('gx-1')
  expect(container.firstChild).toHaveClass('gx-sm-2')
  expect(container.firstChild).toHaveClass('gx-md-3')
  expect(container.firstChild).toHaveClass('gx-lg-4')
  expect(container.firstChild).toHaveClass('gx-xl-5')
  expect(container.firstChild).toHaveClass('gx-xxl-6')
})

test('CRow customize gutterY', async () => {
  const { container } = render(
    <CRow
      className="bazinga"
      xs={{ gutterY: 1 }}
      sm={{ gutterY: 2 }}
      md={{ gutterY: 3 }}
      lg={{ gutterY: 4 }}
      xl={{ gutterY: 5 }}
      xxl={{ gutterY: 6 }}
    >
      Test
    </CRow>,
  )
  expect(container).toMatchSnapshot()
  expect(container.firstChild).toHaveClass('bazinga')
  expect(container.firstChild).toHaveClass('gy-1')
  expect(container.firstChild).toHaveClass('gy-sm-2')
  expect(container.firstChild).toHaveClass('gy-md-3')
  expect(container.firstChild).toHaveClass('gy-lg-4')
  expect(container.firstChild).toHaveClass('gy-xl-5')
  expect(container.firstChild).toHaveClass('gy-xxl-6')
})

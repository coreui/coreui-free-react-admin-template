import * as React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import {
  CTable,
  CTableCaption,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CTableFoot,
} from '../../../index'

test('loads and displays CTable component', async () => {
  const { container } = render(<CTable />)
  expect(container).toMatchSnapshot()
})

test('loads and displays CTable component - new way', async () => {
  const columns = [
    {
      key: 'id',
      label: '#',
      _props: { scope: 'col' },
    },
    'class',
    {
      key: 'heading_1',
      label: 'Heading',
      _props: { scope: 'col' },
    },
    {
      key: 'heading_2',
      label: 'Heading',
      _props: { scope: 'col' },
    },
  ]
  const items = [
    {
      id: 1,
      class: 'Mark',
      heading_1: 'Otto',
      heading_2: '@mdo',
      _cellProps: { id: { scope: 'row' } },
    },
    {
      id: 2,
      class: 'Jacob',
      heading_1: 'Thornton',
      heading_2: '@fat',
      _cellProps: { id: { scope: 'row' } },
    },
    {
      id: 3,
      class: 'Larry the Bird',
      heading_2: '@twitter',
      _cellProps: { id: { scope: 'row' }, class: { colSpan: 2 } },
    },
  ]
  const { container } = render(<CTable columns={columns} items={items} />)
  expect(container).toMatchSnapshot()
})

test('CTable customize', async () => {
  const { container } = render(
    <CTable
      className="bazinga"
      align="middle"
      borderColor="primary"
      bordered={true}
      borderless={true}
      caption="top"
      color="info"
      hover={true}
      responsive="xl"
      small={true}
      striped={true}
    >
      <CTableBody>
        <CTableRow>
          <CTableDataCell>Test</CTableDataCell>
        </CTableRow>
      </CTableBody>
    </CTable>,
  )
  expect(container).toMatchSnapshot()
  expect(container.firstChild).toHaveClass('table-responsive-xl')
  if (container.firstChild === null) {
    expect(true).toBe(false)
  } else {
    expect(container.firstChild.firstChild).toHaveClass('table')
    expect(container.firstChild.firstChild).toHaveClass('align-middle')
    expect(container.firstChild.firstChild).toHaveClass('caption-top')
    expect(container.firstChild.firstChild).toHaveClass('border-primary')
    expect(container.firstChild.firstChild).toHaveClass('table-bordered')
    expect(container.firstChild.firstChild).toHaveClass('table-borderless')
    expect(container.firstChild.firstChild).toHaveClass('table-info')
    expect(container.firstChild.firstChild).toHaveClass('table-hover')
    expect(container.firstChild.firstChild).toHaveClass('table-sm')
    expect(container.firstChild.firstChild).toHaveClass('table-striped')
    expect(container.firstChild.firstChild).toHaveClass('bazinga')
    expect(container.firstChild.firstChild).toHaveTextContent('Test')
  }
})

test('CTable full example test', async () => {
  const { container } = render(
    <CTable caption="top">
      <CTableCaption>List of users</CTableCaption>
      <CTableHead>
        <CTableRow>
          <CTableHeaderCell>#</CTableHeaderCell>
          <CTableHeaderCell>Class</CTableHeaderCell>
          <CTableHeaderCell>Heading</CTableHeaderCell>
          <CTableHeaderCell>Heading</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        <CTableRow>
          <CTableHeaderCell>1</CTableHeaderCell>
          <CTableDataCell>Mark</CTableDataCell>
          <CTableDataCell>Otto</CTableDataCell>
          <CTableDataCell>@mdo</CTableDataCell>
        </CTableRow>
        <CTableRow>
          <CTableHeaderCell>2</CTableHeaderCell>
          <CTableDataCell>Jacob</CTableDataCell>
          <CTableDataCell>Thornton</CTableDataCell>
          <CTableDataCell>@fat</CTableDataCell>
        </CTableRow>
        <CTableRow>
          <CTableHeaderCell>3</CTableHeaderCell>
          <CTableDataCell>Larry</CTableDataCell>
          <CTableDataCell>the Bird</CTableDataCell>
          <CTableDataCell>@twitter</CTableDataCell>
        </CTableRow>
      </CTableBody>
      <CTableFoot>
        <CTableRow>
          <CTableHeaderCell>#</CTableHeaderCell>
          <CTableHeaderCell>Class</CTableHeaderCell>
          <CTableHeaderCell>Heading</CTableHeaderCell>
          <CTableHeaderCell>Heading</CTableHeaderCell>
        </CTableRow>
      </CTableFoot>
    </CTable>,
  )
  expect(container).toMatchSnapshot()
})

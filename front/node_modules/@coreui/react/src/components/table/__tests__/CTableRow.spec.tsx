import * as React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { CTableBody, CTableHeaderCell, CTableRow } from '../../../index'

test('loads and displays CTableRow component', async () => {
  const table = document.createElement('table')
  const { container } = render(
    <CTableBody>
      <CTableRow />
    </CTableBody>,
    {
      container: document.body.appendChild(table),
    },
  )
  expect(container).toMatchSnapshot()
})

test('CTableRow customize', async () => {
  const table = document.createElement('table')
  const { container } = render(
    <CTableBody>
      <CTableRow className="bazinga" active={true} align="middle" color="info">
        <CTableHeaderCell>Test</CTableHeaderCell>
      </CTableRow>
    </CTableBody>,
    {
      container: document.body.appendChild(table),
    },
  )
  expect(container).toMatchSnapshot()
  expect(container.firstChild?.firstChild).toHaveClass('align-middle')
  expect(container.firstChild?.firstChild).toHaveClass('table-active')
  expect(container.firstChild?.firstChild).toHaveClass('table-info')
  expect(container.firstChild?.firstChild).toHaveClass('bazinga')
  expect(container.firstChild?.firstChild?.firstChild).toHaveTextContent('Test')
})

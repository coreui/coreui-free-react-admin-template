import * as React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { CTableDataCell } from '../../../index'
import { CTableBody } from '../CTableBody'
import { CTableRow } from '../CTableRow'

test('loads and displays CTableDataCell component', async () => {
  const table = document.createElement('table')
  const { container } = render(
    <CTableBody>
      <CTableRow>
        <CTableDataCell />
      </CTableRow>
    </CTableBody>,
    {
      container: document.body.appendChild(table),
    },
  )
  expect(container).toMatchSnapshot()
})

test('CTableDataCell customize', async () => {
  const table = document.createElement('table')
  const { container } = render(
    <CTableBody>
      <CTableRow>
        <CTableDataCell className="bazinga" active={true} align="middle" color="info">
          Test
        </CTableDataCell>
      </CTableRow>
    </CTableBody>,
    {
      container: document.body.appendChild(table),
    },
  )
  expect(container).toMatchSnapshot()
  expect(container.firstChild?.firstChild?.firstChild).toHaveClass('align-middle')
  expect(container.firstChild?.firstChild?.firstChild).toHaveClass('table-active')
  expect(container.firstChild?.firstChild?.firstChild).toHaveClass('table-info')
  expect(container.firstChild?.firstChild?.firstChild).toHaveClass('bazinga')
  expect(container.firstChild?.firstChild?.firstChild).toHaveTextContent('Test')
})

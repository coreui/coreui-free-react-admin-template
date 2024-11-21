import * as React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { CTableHead, CTableHeaderCell, CTableRow } from '../../../index'

test('loads and displays CTableHeaderCell component', async () => {
  const table = document.createElement('table')
  const { container } = render(
    <CTableHead>
      <CTableRow>
        <CTableHeaderCell />
      </CTableRow>
    </CTableHead>,
    {
      container: document.body.appendChild(table),
    },
  )
  expect(container).toMatchSnapshot()
})

test('CTableHeaderCell customize', async () => {
  const table = document.createElement('table')
  const { container } = render(
    <CTableHead>
      <CTableRow>
        <CTableHeaderCell className="bazinga" color="info">
          Test
        </CTableHeaderCell>
      </CTableRow>
    </CTableHead>,
    {
      container: document.body.appendChild(table),
    },
  )
  expect(container).toMatchSnapshot()
  expect(container.firstChild?.firstChild?.firstChild).toHaveClass('table-info')
  expect(container.firstChild?.firstChild?.firstChild).toHaveClass('bazinga')
  expect(container.firstChild?.firstChild?.firstChild).toHaveTextContent('Test')
})

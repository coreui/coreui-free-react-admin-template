import * as React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { CTableBody, CTableDataCell, CTableRow } from '../../../index'

test('loads and displays CTableBody component', async () => {
  const table = document.createElement('table')
  const { container } = render(<CTableBody />, {
    container: document.body.appendChild(table),
  })
  expect(container).toMatchSnapshot()
})

test('CTableBody customize', async () => {
  const table = document.createElement('table')
  const { container } = render(
    <CTableBody className="bazinga" color="info">
      <CTableRow>
        <CTableDataCell> Test</CTableDataCell>
      </CTableRow>
    </CTableBody>,
    {
      container: document.body.appendChild(table),
    },
  )
  expect(container).toMatchSnapshot()
  expect(container.firstChild).toHaveClass('table-info')
  expect(container.firstChild).toHaveClass('bazinga')
  expect(container.firstChild).toHaveTextContent('Test')
})

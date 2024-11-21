import * as React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { CTableHead, CTableHeaderCell, CTableRow } from '../../../index'

test('loads and displays CTableHead component', async () => {
  const table = document.createElement('table')
  const { container } = render(<CTableHead />, {
    container: document.body.appendChild(table),
  })
  expect(container).toMatchSnapshot()
})

test('CTableHead customize', async () => {
  const table = document.createElement('table')
  const { container } = render(
    <CTableHead className="bazinga" color="info">
      <CTableRow>
        <CTableHeaderCell>Test</CTableHeaderCell>
      </CTableRow>
    </CTableHead>,
    {
      container: document.body.appendChild(table),
    },
  )
  expect(container).toMatchSnapshot()
  expect(container.firstChild).toHaveClass('table-info')
  expect(container.firstChild).toHaveClass('bazinga')
  expect(container.firstChild?.firstChild?.firstChild).toHaveTextContent('Test')
})

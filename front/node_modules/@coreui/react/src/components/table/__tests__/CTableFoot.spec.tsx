import * as React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { CTableFoot, CTableHeaderCell, CTableRow } from '../../../index'

test('loads and displays CTableFoot component', async () => {
  const table = document.createElement('table')
  const { container } = render(<CTableFoot />, {
    container: document.body.appendChild(table),
  })
  expect(container).toMatchSnapshot()
})

test('CTableFoot customize', async () => {
  const table = document.createElement('table')
  const { container } = render(
    <CTableFoot className="bazinga" color="info">
      <CTableRow>
        <CTableHeaderCell>Test</CTableHeaderCell>
      </CTableRow>
    </CTableFoot>,
    {
      container: document.body.appendChild(table),
    },
  )
  expect(container).toMatchSnapshot()
  expect(container.firstChild).toHaveClass('table-info')
  expect(container.firstChild).toHaveClass('bazinga')
  expect(container.firstChild?.firstChild?.firstChild).toHaveTextContent('Test')
})

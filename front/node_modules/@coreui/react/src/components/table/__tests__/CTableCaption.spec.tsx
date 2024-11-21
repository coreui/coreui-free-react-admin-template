import * as React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { CTableCaption } from '../../../index'

test('loads and displays CTableCaption component', async () => {
  const table = document.createElement('table')
  const { container } = render(<CTableCaption />, {
    container: document.body.appendChild(table),
  })
  expect(container).toMatchSnapshot()
})

test('CTableCaption customize', async () => {
  const table = document.createElement('table')
  const { container } = render(<CTableCaption>Test</CTableCaption>, {
    container: document.body.appendChild(table),
  })
  expect(container).toMatchSnapshot()
  expect(container.firstChild).toHaveTextContent('Test')
})

import * as React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { CTabPane, CTabContent } from '../../../index'

test('loads and displays CTabPane component', async () => {
  const { container } = render(<CTabPane>Test</CTabPane>)
  expect(container).toMatchSnapshot()
})

test('CTabPane customize', async () => {
  const { container } = render(
    <CTabPane className="bazinga" visible={true}>
      Test
    </CTabPane>,
  )
  expect(container).toMatchSnapshot()
})

test('CTabContent use case test', async () => {
  const { rerender } = render(
    <CTabContent>
      <CTabPane visible={false}>Test</CTabPane>
    </CTabContent>,
  )
  expect(screen.getByText('Test')).not.toHaveClass('show')
  expect(screen.getByText('Test')).not.toHaveClass('active')
  rerender(
    <CTabContent>
      <CTabPane visible={true}>Test</CTabPane>
    </CTabContent>,
  )
  expect(screen.getByText('Test')).not.toHaveClass('show')
  expect(screen.getByText('Test')).toHaveClass('active')
  await new Promise((r) => setTimeout(r, 1000))
  expect(screen.getByText('Test')).toHaveClass('show')
  expect(screen.getByText('Test')).toHaveClass('active')
  rerender(
    <CTabContent>
      <CTabPane visible={false}>Test</CTabPane>
    </CTabContent>,
  )
  expect(screen.getByText('Test')).not.toHaveClass('show')
  expect(screen.getByText('Test')).not.toHaveClass('active')
  await new Promise((r) => setTimeout(r, 1000))
  expect(screen.getByText('Test')).not.toHaveClass('show')
  expect(screen.getByText('Test')).not.toHaveClass('active')
})

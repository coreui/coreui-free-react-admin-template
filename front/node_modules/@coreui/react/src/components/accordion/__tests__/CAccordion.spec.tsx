import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { CAccordion } from '../../../index'

test('loads and displays CAccordion component', async () => {
  const { container } = render(<CAccordion>Test</CAccordion>)
  expect(container).toMatchSnapshot()
})

test('CAccordion customize', async () => {
  const { container } = render(<CAccordion className="bazinga">Test</CAccordion>)
  expect(container.firstChild).toHaveClass('bazinga')
  expect(container).toMatchSnapshot()
})

test('CAccordion use case test', async () => {
  jest.useFakeTimers()
  const { rerender } = render(<CAccordion flush={false}>Test</CAccordion>)
  expect(screen.getByText('Test')).toHaveClass('accordion')
  expect(screen.getByText('Test')).not.toHaveClass('accordion-flush')
  rerender(<CAccordion flush={true}>Test</CAccordion>)
  expect(screen.getByText('Test')).toHaveClass('accordion')
  expect(screen.getByText('Test')).toHaveClass('accordion-flush')
  jest.runAllTimers()
  expect(screen.getByText('Test')).toHaveClass('accordion')
  expect(screen.getByText('Test')).toHaveClass('accordion-flush')
  rerender(<CAccordion flush={false}>Test</CAccordion>)
  expect(screen.getByText('Test')).toHaveClass('accordion')
  expect(screen.getByText('Test')).not.toHaveClass('accordion-flush')
  jest.runAllTimers()
  expect(screen.getByText('Test')).toHaveClass('accordion')
  expect(screen.getByText('Test')).not.toHaveClass('accordion-flush')
  jest.runAllTimers()
  jest.useRealTimers()
})

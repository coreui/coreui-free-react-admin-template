import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { CAccordionHeader } from '../../../index'

test('loads and displays CAccordionHeader component', async () => {
  const { container } = render(<CAccordionHeader>Test</CAccordionHeader>)
  expect(container).toMatchSnapshot()
})

test('CAccordionHeader customize', async () => {
  const { container } = render(<CAccordionHeader className="bazinga">Test</CAccordionHeader>)
  expect(container.firstChild).toHaveClass('bazinga')
  expect(container.firstChild).toHaveClass('accordion-header')
  expect(container).toMatchSnapshot()
})

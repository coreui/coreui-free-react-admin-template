import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { CAccordionItem } from '../../../index'

test('loads and displays CAccordionItem component', async () => {
  const { container } = render(<CAccordionItem>Test</CAccordionItem>)
  expect(container).toMatchSnapshot()
})

test('CAccordionItem customize', async () => {
  const { container } = render(<CAccordionItem className="bazinga">Test</CAccordionItem>)
  expect(container.firstChild).toHaveClass('bazinga')
  expect(container.firstChild).toHaveClass('accordion-item')
  expect(container).toMatchSnapshot()
})

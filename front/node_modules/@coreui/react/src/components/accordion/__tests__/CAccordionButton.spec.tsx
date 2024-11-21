import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { CAccordionButton } from '../../../index'

test('loads and displays CAccordionButton component', async () => {
  const { container } = render(<CAccordionButton>Test</CAccordionButton>)
  expect(container).toMatchSnapshot()
})

test('CAccordionButton customize', async () => {
  const { container } = render(<CAccordionButton className="bazinga">Test</CAccordionButton>)
  expect(container.firstChild).toHaveClass('bazinga')
  expect(container.firstChild).toHaveClass('accordion-button')
  expect(container).toMatchSnapshot()
})

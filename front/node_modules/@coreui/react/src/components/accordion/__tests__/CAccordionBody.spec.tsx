import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { CAccordionBody } from '../../../index'

test('loads and displays CAccordionBody component', async () => {
  const { container } = render(<CAccordionBody>Test</CAccordionBody>)
  expect(container).toMatchSnapshot()
})

test('CAccordionBody customize', async () => {
  const { container } = render(<CAccordionBody>Test</CAccordionBody>)
  expect(container.firstChild?.firstChild).toHaveClass('accordion-body')
  expect(container).toMatchSnapshot()
})

import * as React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { CHeaderText } from '../../../index'

test('loads and displays CHeaderText component', async () => {
  const { container } = render(<CHeaderText>Test</CHeaderText>)
  expect(container).toMatchSnapshot()
})

test('CHeaderText customize', async () => {
  const { container } = render(<CHeaderText className="bazinga">Test</CHeaderText>)
  expect(container).toMatchSnapshot()
  expect(container.firstChild).toHaveClass('bazinga')
  expect(container.firstChild).toHaveClass('header-text')
})

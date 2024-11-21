import * as React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { CCardImage } from '../../../index'

test('loads and displays CCardImage component', async () => {
  const { container } = render(<CCardImage />)
  expect(container).toMatchSnapshot()
})

test('CCardImage customize', async () => {
  const { container } = render(<CCardImage className="bazinga" as="div" orientation="bottom" />)
  expect(container).toMatchSnapshot()
  expect(container.firstChild).toHaveClass('bazinga')
  expect(container.firstChild).toHaveClass('card-img-bottom')
})

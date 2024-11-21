import * as React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { CImage } from '../../../index'

test('loads and displays CImage component', async () => {
  const { container } = render(<CImage />)
  expect(container).toMatchSnapshot()
})

test('CImage customize one', async () => {
  const { container } = render(<CImage align="end" />)
  expect(container).toMatchSnapshot()
  expect(container.firstChild).toHaveClass('float-end')
})

test('CImage customize two', async () => {
  const { container } = render(
    <CImage className="bazinga" align="center" fluid={true} rounded={true} thumbnail={true} />,
  )
  expect(container).toMatchSnapshot()
  expect(container.firstChild).toHaveClass('d-block')
  expect(container.firstChild).toHaveClass('mx-auto')
  expect(container.firstChild).toHaveClass('img-fluid')
  expect(container.firstChild).toHaveClass('rounded')
  expect(container.firstChild).toHaveClass('img-thumbnail')
  expect(container.firstChild).toHaveClass('bazinga')
})

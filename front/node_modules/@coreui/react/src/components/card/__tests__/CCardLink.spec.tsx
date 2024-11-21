import * as React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { CCardLink } from '../../../index'

test('loads and displays CCardLink component', async () => {
  const { container } = render(<CCardLink>Test</CCardLink>)
  expect(container).toMatchSnapshot()
})

test('CCardLink customize', async () => {
  const { container } = render(
    <CCardLink className="bazinga" href="/bazinga">
      Test
    </CCardLink>,
  )
  expect(container).toMatchSnapshot()
  expect(container.firstChild).toHaveClass('bazinga')
  expect(container.firstChild).toHaveClass('card-link')
})

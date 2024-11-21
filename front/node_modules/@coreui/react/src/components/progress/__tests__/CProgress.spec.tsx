import * as React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { CProgress } from '../../../index'

test('loads and displays CProgress component', async () => {
  const { container } = render(<CProgress color="warning">Test</CProgress>)
  expect(container).toMatchSnapshot()
})

test('CProgress customize', async () => {
  const { container } = render(
    <CProgress className="bazinga" height={100} color="warning" value={50}>
      Test
    </CProgress>,
  )
  expect(container).toMatchSnapshot()
  expect(container.firstChild).toHaveClass('bazinga')
  expect(container.firstChild).toHaveClass('progress')
  expect(container.firstChild).toHaveStyle(`height: 100px`)
})

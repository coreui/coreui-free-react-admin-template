import * as React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { COffcanvasTitle } from '../../../index'

test('loads and displays COffcanvasTitle component', async () => {
  const { container } = render(<COffcanvasTitle />)
  expect(container).toMatchSnapshot()
})

test('COffcanvasTitle customize', async () => {
  const { container } = render(
    <COffcanvasTitle className="bazinga" as="div">
      Test
    </COffcanvasTitle>,
  )
  expect(container).toMatchSnapshot()
  expect(container.firstChild).toHaveClass('offcanvas-title')
  expect(container.firstChild).toHaveClass('bazinga')
  expect(container.firstChild).toHaveTextContent('Test')
})

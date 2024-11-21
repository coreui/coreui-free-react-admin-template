import * as React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { CPlaceholder } from '../../../index'

test('loads and displays CPlaceholder component', async () => {
  const { container } = render(<CPlaceholder color="primary" />)
  expect(container).toMatchSnapshot()
})

test('CPlaceholder customize', async () => {
  const { container } = render(
    <CPlaceholder animation="glow" className="bazinga" color="secondary" size="lg" sm={7} />,
  )
  expect(container).toMatchSnapshot()
  expect(container.firstChild).toHaveClass('bazinga')
  expect(container.firstChild).toHaveClass('bg-secondary')
  expect(container.firstChild).toHaveClass('col-sm-7')
  expect(container.firstChild).toHaveClass('placeholder-lg')
  expect(container.firstChild).toHaveClass('placeholder-glow')
})

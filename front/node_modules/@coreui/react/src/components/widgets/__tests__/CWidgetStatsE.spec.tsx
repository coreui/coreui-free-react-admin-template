import * as React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { CWidgetStatsE } from '../../../index'

test('loads and displays CWidgetStatsE component', async () => {
  const { container } = render(<CWidgetStatsE />)
  expect(container).toMatchSnapshot()
})

test('CWidgetStatsE customize', async () => {
  const { container } = render(
    <CWidgetStatsE className="bazinga" title="title" value="value">
      Test
    </CWidgetStatsE>,
  )
  expect(container).toMatchSnapshot()
  expect(container.firstChild).toHaveClass('bazinga')
  expect(container.firstChild).toHaveClass('card')
  if (container.firstChild === null || container.firstChild.firstChild === null) {
    expect(true).toBe(false)
  } else {
    expect(container.firstChild.firstChild).toHaveClass('card-body')
    expect(container.firstChild.firstChild.firstChild).toHaveClass('text-body-secondary')
    expect(container.firstChild.firstChild.firstChild).toHaveClass('small')
    expect(container.firstChild.firstChild.firstChild).toHaveClass('text-uppercase')
    expect(container.firstChild.firstChild.firstChild).toHaveClass('fw-semibold')
    expect(container.firstChild.firstChild.firstChild).toHaveTextContent('title')
  }
})

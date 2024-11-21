import * as React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { CWidgetStatsB } from '../../../index'

test('loads and displays CWidgetStatsB component', async () => {
  const { container } = render(<CWidgetStatsB />)
  expect(container).toMatchSnapshot()
})

test('CWidgetStatsB customize', async () => {
  const { container } = render(
    <CWidgetStatsB
      className="bazinga"
      color="info"
      inverse
      progress={{ color: 'warning', value: 75, white: true }}
      text="text"
      title="title"
      value="value"
    >
      Test
    </CWidgetStatsB>,
  )
  expect(container).toMatchSnapshot()
  expect(container.firstChild).toHaveClass('bazinga')
  expect(container.firstChild).toHaveClass('card')
  if (container.firstChild === null || container.firstChild.firstChild === null) {
    expect(true).toBe(false)
  } else {
    expect(container.firstChild.firstChild).toHaveClass('card-body')
    expect(container.firstChild.firstChild.firstChild).toHaveClass('fs-4')
    expect(container.firstChild.firstChild.firstChild).toHaveClass('fw-semibold')
    expect(container.firstChild.firstChild.firstChild).toHaveTextContent('value')
    expect(container.firstChild.firstChild.lastChild).toHaveClass('text-white')
    expect(container.firstChild.firstChild.lastChild).toHaveTextContent('text')
  }
})

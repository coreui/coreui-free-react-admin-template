import * as React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { CWidgetStatsC } from '../../../index'

test('loads and displays CWidgetStatsC component', async () => {
  const { container } = render(<CWidgetStatsC />)
  expect(container).toMatchSnapshot()
})

test('CWidgetStatsC customize', async () => {
  const { container } = render(
    <CWidgetStatsC
      className="bazinga"
      color="info"
      icon="icon"
      inverse
      progress={{ color: 'warning', value: 75, white: true }}
      title="title"
      value="value"
    >
      Test
    </CWidgetStatsC>,
  )
  expect(container).toMatchSnapshot()
  expect(container.firstChild).toHaveClass('bazinga')
  expect(container.firstChild).toHaveClass('card')
  expect(container.firstChild).toHaveClass('text-white')
  if (container.firstChild === null || container.firstChild.firstChild === null) {
    expect(true).toBe(false)
  } else {
    expect(container.firstChild.firstChild).toHaveClass('card-body')
    expect(container.firstChild.firstChild.firstChild).toHaveClass('text-end')
    expect(container.firstChild.firstChild.firstChild).toHaveClass('mb-4')
    expect(container.firstChild.firstChild.firstChild).toHaveTextContent('icon')
    expect(container.firstChild.firstChild.lastChild).toHaveClass('mt-3')
    expect(container.firstChild.firstChild.lastChild).toHaveClass('mb-0')
  }
})

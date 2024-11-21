import * as React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { CWidgetStatsA } from '../../../index'

test('loads and displays CWidgetStatsA component', async () => {
  const { container } = render(<CWidgetStatsA />)
  expect(container).toMatchSnapshot()
})

test('CWidgetStatsA customize', async () => {
  const { container } = render(
    <CWidgetStatsA
      className="bazinga"
      action="action"
      chart="chart"
      color="info"
      title="title"
      value="value"
    >
      Test
    </CWidgetStatsA>,
  )
  expect(container).toMatchSnapshot()
  expect(container.firstChild).toHaveClass('bg-info')
  expect(container.firstChild).toHaveClass('text-white')
  expect(container.firstChild).toHaveClass('bazinga')
  if (container.firstChild === null) {
    expect(true).toBe(false)
  } else {
    expect(container.firstChild.firstChild).toHaveClass('pb-0')
    expect(container.firstChild.firstChild).toHaveClass('d-flex')
    expect(container.firstChild.firstChild).toHaveClass('justify-content-between')
    expect(container.firstChild.firstChild).toHaveClass('align-items-start')
    if (
      container.firstChild.firstChild === null ||
      container.firstChild.firstChild.firstChild === null
    ) {
      expect(true).toBe(false)
    } else {
      expect(container.firstChild.firstChild.firstChild.firstChild).toHaveClass('fs-4')
      expect(container.firstChild.firstChild.firstChild.firstChild).toHaveClass('fw-semibold')
    }
  }

  //expect(container.firstChild).toHaveTextContent('Test')
})

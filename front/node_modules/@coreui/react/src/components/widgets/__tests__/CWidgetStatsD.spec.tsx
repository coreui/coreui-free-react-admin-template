import * as React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { CWidgetStatsD } from '../../../index'

test('loads and displays CWidgetStatsD component', async () => {
  const { container } = render(<CWidgetStatsD />)
  expect(container).toMatchSnapshot()
})

test('CWidgetStatsD customize', async () => {
  const { container } = render(
    <CWidgetStatsD
      className="bazinga"
      color="info"
      values={[
        { title: 'friends', value: '89K' },
        { title: 'feeds', value: '459' },
      ]}
    />,
  )
  expect(container).toMatchSnapshot()
  expect(container.firstChild).toHaveClass('bazinga')
  if (container.firstChild === null) {
    expect(true).toBe(false)
  } else {
    expect(container.firstChild.firstChild).toHaveClass('position-relative')
    expect(container.firstChild.firstChild).toHaveClass('d-flex')
    expect(container.firstChild.firstChild).toHaveClass('justify-content-center')
    expect(container.firstChild.firstChild).toHaveClass('align-items-center')
    expect(container.firstChild.firstChild).toHaveClass('bg-info')
    expect(container.firstChild.lastChild).toHaveClass('row')
    expect(container.firstChild.lastChild).toHaveClass('text-center')
    if (
      container.firstChild.lastChild === null ||
      container.firstChild.lastChild.firstChild === null
    ) {
      expect(true).toBe(false)
    } else {
      expect(container.firstChild.lastChild.firstChild.firstChild).toHaveClass('fs-5')
      expect(container.firstChild.lastChild.firstChild.firstChild).toHaveClass('fw-semibold')
      expect(container.firstChild.lastChild.firstChild.firstChild).toHaveTextContent('89K')
      expect(container.firstChild.lastChild.firstChild.lastChild).toHaveClass('text-uppercase')
      expect(container.firstChild.lastChild.firstChild.lastChild).toHaveClass('text-body-secondary')
      expect(container.firstChild.lastChild.firstChild.lastChild).toHaveClass('small')
      expect(container.firstChild.lastChild.firstChild.lastChild).toHaveTextContent('friends')
    }
  }
})

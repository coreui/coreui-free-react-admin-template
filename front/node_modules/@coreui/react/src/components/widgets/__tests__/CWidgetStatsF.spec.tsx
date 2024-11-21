import * as React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { CWidgetStatsF } from '../../../index'

test('loads and displays CWidgetStatsF component', async () => {
  const { container } = render(<CWidgetStatsF />)
  expect(container).toMatchSnapshot()
})

test('CWidgetStatsF customize', async () => {
  const { container } = render(
    <CWidgetStatsF
      className="bazinga"
      color="info"
      footer="footer"
      icon="icon"
      padding={true}
      title="title"
      value="value"
    >
      Test
    </CWidgetStatsF>,
  )
  expect(container).toMatchSnapshot()
  expect(container.firstChild).toHaveClass('bazinga')
  expect(container.firstChild).toHaveClass('card')
  if (container.firstChild === null) {
    expect(true).toBe(false)
  } else {
    expect(container.firstChild.firstChild).toHaveClass('card-body')
    expect(container.firstChild.firstChild).toHaveClass('d-flex')
    expect(container.firstChild.firstChild).toHaveClass('align-items-center')
    if (container.firstChild.firstChild === null) {
      expect(true).toBe(false)
    } else {
      expect(container.firstChild.firstChild.firstChild).toHaveClass('me-3')
      expect(container.firstChild.firstChild.firstChild).toHaveClass('text-white')
      expect(container.firstChild.firstChild.firstChild).toHaveClass('bg-info')
      expect(container.firstChild.firstChild.firstChild).toHaveClass('p-3')
      expect(container.firstChild.firstChild.firstChild).toHaveTextContent('icon')
      if (container.firstChild.firstChild.lastChild === null) {
        expect(true).toBe(false)
      } else {
        expect(container.firstChild.firstChild.lastChild.firstChild).toHaveClass('fs-6')
        expect(container.firstChild.firstChild.lastChild.firstChild).toHaveClass('fw-semibold')
        expect(container.firstChild.firstChild.lastChild.firstChild).toHaveClass('text-info')
        expect(container.firstChild.firstChild.lastChild.firstChild).toHaveTextContent('value')
        expect(container.firstChild.firstChild.lastChild.lastChild).toHaveClass(
          'text-body-secondary',
        )
        expect(container.firstChild.firstChild.lastChild.lastChild).toHaveClass('text-uppercase')
        expect(container.firstChild.firstChild.lastChild.lastChild).toHaveClass('fw-semibold ')
        expect(container.firstChild.firstChild.lastChild.lastChild).toHaveClass('small')
        expect(container.firstChild.firstChild.lastChild.lastChild).toHaveTextContent('title')
      }
    }
  }
})

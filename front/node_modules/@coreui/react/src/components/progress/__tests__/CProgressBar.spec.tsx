import * as React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { CProgressBar } from '../../../index'

test('loads and displays CProgressBar component', async () => {
  const { container } = render(<CProgressBar color="warning">Test</CProgressBar>)
  expect(container).toMatchSnapshot()
})

test('CProgressBar customize', async () => {
  const { container } = render(
    <CProgressBar color="warning" className="bazinga" animated={true} value={50} variant="striped">
      Test
    </CProgressBar>,
  )
  expect(container).toMatchSnapshot()
  expect(container.firstChild).toHaveClass('bazinga')
  expect(container.firstChild).toHaveClass('progress-bar')

  expect(container.firstChild).toHaveClass('bg-warning')
  expect(container.firstChild).toHaveClass('progress-bar-striped')
  expect(container.firstChild).toHaveClass('progress-bar-animated')
  expect(container.firstChild).toHaveStyle(`width: 50%`)
})

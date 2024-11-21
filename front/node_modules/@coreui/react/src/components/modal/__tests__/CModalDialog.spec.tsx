import * as React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { CModalDialog } from '../../../index'

test('loads and displays CModalDialog component', async () => {
  const { container } = render(<CModalDialog>Test</CModalDialog>)
  expect(container).toMatchSnapshot()
})

test('CModalDialog customize', async () => {
  const { container } = render(
    <CModalDialog
      className="bazinga"
      alignment="center"
      fullscreen="lg"
      scrollable={true}
      size="xl"
    >
      Test
    </CModalDialog>,
  )
  expect(container).toMatchSnapshot()
  expect(container.firstChild).toHaveClass('bazinga')
  expect(container.firstChild).toHaveClass('modal-dialog')
  expect(container.firstChild).toHaveClass('modal-dialog-centered')
  expect(container.firstChild).toHaveClass('modal-fullscreen-lg-down')
  expect(container.firstChild).toHaveClass('modal-dialog-scrollable')
  expect(container.firstChild).toHaveClass('modal-xl')
})

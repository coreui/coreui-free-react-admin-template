import * as React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { CNavbar } from '../../../index'

test('loads and displays CNavbar component', async () => {
  const { container } = render(<CNavbar>Test</CNavbar>)
  expect(container).toMatchSnapshot()
})

test('CNavbar customize', async () => {
  const { container } = render(
    <CNavbar
      className="bazinga"
      color="warning"
      colorScheme="dark"
      as="h3"
      container="xl"
      expand="lg"
      placement="fixed-bottom"
    >
      Test
    </CNavbar>,
  )
  expect(container).toMatchSnapshot()
  expect(container.firstChild).toHaveClass('bazinga')
  expect(container.firstChild).toHaveClass('navbar')
  expect(container.firstChild).toHaveClass('bg-warning')
  expect(container.firstChild).toHaveClass('navbar-expand-lg')
  expect(container.firstChild).toHaveClass('fixed-bottom')
  expect(container.firstChild).toHaveAttribute('data-coreui-theme', 'dark')
  const arrLength = container.getElementsByClassName('container-xl').length
  expect(arrLength).toBe(1)
})

test('CNavbar customize - container and expand are boolean', async () => {
  const { container } = render(
    <CNavbar container={true} expand={true}>
      Test
    </CNavbar>,
  )
  expect(container).toMatchSnapshot()
  expect(container.firstChild).toHaveClass('navbar-expand')
  const arrLength = container.getElementsByClassName('container').length
  expect(arrLength).toBe(1)
})

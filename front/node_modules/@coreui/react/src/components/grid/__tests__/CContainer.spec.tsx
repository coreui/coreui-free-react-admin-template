import * as React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { CContainer } from '../../../index'

test('loads and displays CContainer component', async () => {
  const { container } = render(<CContainer>Test</CContainer>)
  expect(container).toMatchSnapshot()
})

test('CContainer customize fluid', async () => {
  const { container } = render(
    <CContainer className="bazinga" fluid>
      Test
    </CContainer>,
  )
  expect(container).toMatchSnapshot()
  expect(container.firstChild).toHaveClass('bazinga')
  expect(container.firstChild).toHaveClass('container-fluid')
})

test('CContainer customize', async () => {
  const { container } = render(
    <CContainer md className="bazinga">
      Test
    </CContainer>,
  )
  expect(container).toMatchSnapshot()
  expect(container.firstChild).toHaveClass('bazinga')
  expect(container.firstChild).toHaveClass('container-md')
})

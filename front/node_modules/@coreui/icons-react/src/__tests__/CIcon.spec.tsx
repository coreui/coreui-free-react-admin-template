import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import CIcon from './../'

describe('CIcon', () => {
  it('renders svg with class="icon"', () => {
    const { container } = render(<CIcon />)
    expect(container.firstChild).toHaveClass('icon')
  })

  it('renders svg with size', () => {
    const { container } = render(<CIcon size="xl" />)
    expect(container.firstChild).toHaveClass('icon-xl')
  })

  it('renders svg with custom size', () => {
    const { container } = render(<CIcon height={20} />)
    expect(container.firstChild).toHaveClass('icon-custom-size')
  })

  it('renders svg with className', () => {
    const { container } = render(<CIcon className="icon-test" />)
    expect(container.firstChild).toHaveClass('icon-test')
  })

  it('renders svg with custom className', () => {
    const { container } = render(<CIcon customClassName="icon-custom-test" />)
    expect(container.firstChild).toHaveClass('icon-custom-test')
  })
})

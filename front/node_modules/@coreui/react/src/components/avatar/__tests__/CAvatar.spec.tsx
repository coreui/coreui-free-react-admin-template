import * as React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { CAvatar } from '../../../index'

test('loads and displays CAvatar component', async () => {
  const { container } = render(<CAvatar color="primary">Test</CAvatar>)
  expect(container).toMatchSnapshot()
})

test('CAvatar customize', async () => {
  let element
  const { container } = render(
    <CAvatar
      className="bazinga"
      color="secondary"
      shape="rounded"
      size="xl"
      status="warning"
      textColor="white"
    >
      Test
    </CAvatar>,
  )
  expect(container).toMatchSnapshot()
  expect(container.firstChild).toHaveClass('bazinga')
  expect(container.firstChild).toHaveClass('avatar')
  expect(container.firstChild).toHaveClass('bg-secondary')
  expect(container.firstChild).toHaveClass('avatar-xl')
  expect(container.firstChild).toHaveClass('text-white')
  element = container.getElementsByClassName('avatar-status')
  element = element[0]
  expect(element).toHaveClass('bg-warning')
})

test('CAvatar customize image', async () => {
  const { container } = render(
    <CAvatar
      className="bazinga"
      color="secondary"
      shape="rounded"
      size="xl"
      status="warning"
      textColor="white"
      src="/bazinga"
    >
      Test
    </CAvatar>,
  )
  expect(container).toMatchSnapshot()

  const element = container.getElementsByClassName('avatar-img')
  expect(element.length).toBe(1)
})

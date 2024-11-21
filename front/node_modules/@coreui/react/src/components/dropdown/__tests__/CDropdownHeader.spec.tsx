import * as React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { CDropdownHeader } from '../../../index'

test('loads and displays CDropdownHeader component', async () => {
  const { container } = render(<CDropdownHeader>Test</CDropdownHeader>)
  expect(container).toMatchSnapshot()
})

test('CDropdownHeader customize', async () => {
  const { container } = render(
    <CDropdownHeader className="bazinga" as="h3">
      Test
    </CDropdownHeader>,
  )
  expect(container).toMatchSnapshot()
  expect(container.firstChild).toHaveClass('bazinga')
  expect(container.firstChild).toHaveClass('dropdown-header')
})

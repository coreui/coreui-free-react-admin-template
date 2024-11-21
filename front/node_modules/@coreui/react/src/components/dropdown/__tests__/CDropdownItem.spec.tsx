import * as React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { CDropdownItem } from '../../../index'

test('loads and displays CDropdownItem component', async () => {
  const { container } = render(<CDropdownItem>Test</CDropdownItem>)
  expect(container).toMatchSnapshot()
})

test('CDropdownItem customize', async () => {
  const { container } = render(
    <CDropdownItem className="bazinga" as="div">
      Test
    </CDropdownItem>,
  )
  expect(container).toMatchSnapshot()
  expect(container.firstChild).toHaveClass('bazinga')
  expect(container.firstChild).toHaveClass('dropdown-item')
})

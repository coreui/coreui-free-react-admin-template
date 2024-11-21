import * as React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { CDropdown, CDropdownMenu } from '../../../index'

test('loads and displays CDropdownMenu component', async () => {
  const { container } = render(<CDropdownMenu>Test</CDropdownMenu>)
  expect(container).toMatchSnapshot()
})

test('CDropdownMenu customize', async () => {
  const { container } = render(
    <CDropdown visible={true}>
      <CDropdownMenu className="bazinga" as="div">
        Test
      </CDropdownMenu>
    </CDropdown>,
  )
  expect(container).toMatchSnapshot()
  expect(container.firstChild?.firstChild).toHaveClass('bazinga')
  expect(container.firstChild?.firstChild).toHaveClass('dropdown-menu')
  expect(container.firstChild?.firstChild).toHaveClass('show')
})

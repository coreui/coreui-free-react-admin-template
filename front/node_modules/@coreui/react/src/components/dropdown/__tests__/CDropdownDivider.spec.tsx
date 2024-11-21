import * as React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { CDropdownDivider } from '../../../index'

test('loads and displays CDropdownDivider component', async () => {
  const { container } = render(<CDropdownDivider />)
  expect(container).toMatchSnapshot()
})

test('CDropdownDivider customize', async () => {
  const { container } = render(<CDropdownDivider className="bazinga" />)
  expect(container).toMatchSnapshot()
  expect(container.firstChild).toHaveClass('bazinga')
  expect(container.firstChild).toHaveClass('dropdown-divider')
})

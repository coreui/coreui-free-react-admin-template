import * as React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { CDropdownItemPlain } from '../../../index'

test('loads and displays CDropdownItemPlain component', async () => {
  const { container } = render(<CDropdownItemPlain>Test</CDropdownItemPlain>)
  expect(container).toMatchSnapshot()
})

test('CDropdownItemPlain customize', async () => {
  const { container } = render(
    <CDropdownItemPlain className="bazinga" as="div">
      Test
    </CDropdownItemPlain>,
  )
  expect(container).toMatchSnapshot()
  expect(container.firstChild).toHaveClass('bazinga')
  expect(container.firstChild).toHaveClass('dropdown-item-text')
})

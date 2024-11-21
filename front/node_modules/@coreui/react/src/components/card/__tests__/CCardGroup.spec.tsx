import * as React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import {
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCardImage,
  CCardLink,
  CCardSubtitle,
  CCardTitle,
  CCardText,
  CCardGroup,
} from '../../../index'

test('loads and displays CCardGroup component', async () => {
  const { container } = render(<CCardGroup>Test</CCardGroup>)
  expect(container).toMatchSnapshot()
})

test('CCardGroup customize', async () => {
  const { container } = render(<CCardGroup className="bazinga">Test</CCardGroup>)
  expect(container).toMatchSnapshot()
  expect(container.firstChild).toHaveClass('bazinga')
  expect(container.firstChild).toHaveClass('card-group')
})

test('CCardGroup full example', async () => {
  const { container } = render(
    <CCardGroup className="bazinga">
      <CCard>
        <CCardImage as="svg">Image</CCardImage>
        <CCardHeader>Header</CCardHeader>
        <CCardBody>
          <CCardTitle>Title</CCardTitle>
          <CCardSubtitle>Subtitle</CCardSubtitle>
          <CCardText>Text</CCardText>
          <CCardLink>Link</CCardLink>
        </CCardBody>
        <CCardFooter>Footer</CCardFooter>
      </CCard>
      <CCard>
        <CCardBody>
          <CCardTitle>Card Title</CCardTitle>
        </CCardBody>
      </CCard>
    </CCardGroup>,
  )
  expect(container).toMatchSnapshot()
})

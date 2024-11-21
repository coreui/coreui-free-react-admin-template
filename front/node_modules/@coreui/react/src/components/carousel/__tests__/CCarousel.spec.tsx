import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { getByText } from '@testing-library/dom'
import '@testing-library/jest-dom'
import { CCarousel, CCarouselCaption, CCarouselItem } from '../../../index'

test('loads and displays CCarousel component', async () => {
  const { container } = render(
    <CCarousel controls indicators>
      <CCarouselItem>
        Item-1
        <CCarouselCaption>Caption-1</CCarouselCaption>
      </CCarouselItem>
      <CCarouselItem>
        Item-2
        <CCarouselCaption>Caption-2</CCarouselCaption>
      </CCarouselItem>
      <CCarouselItem>
        Item-3
        <CCarouselCaption>Caption-3</CCarouselCaption>
      </CCarouselItem>
    </CCarousel>,
  )

  const carousel = document.querySelector('.carousel')
  expect(carousel).toHaveClass('slide')
  if (carousel === null) {
    expect(true).toBe(false)
  } else {
    expect(carousel.children[0]).toHaveClass('carousel-indicators')
    expect(carousel.children[1]).toHaveClass('carousel-inner')
  }

  let caption = getByText(container, 'Caption-1')
  expect(caption).toHaveClass('carousel-caption')
  caption = getByText(container, 'Caption-2')
  expect(caption).toHaveClass('carousel-caption')
  caption = getByText(container, 'Caption-3')
  expect(caption).toHaveClass('carousel-caption')
  let item = getByText(container, 'Item-1')
  expect(item).toHaveClass('carousel-item')
  item = getByText(container, 'Item-2')
  expect(item).toHaveClass('carousel-item')
  item = getByText(container, 'Item-3')
  expect(item).toHaveClass('carousel-item')

  let button = document.querySelector('.carousel-control-next')
  if (button === null) {
    expect(true).toBe(false)
  } else {
    expect(button.firstChild).toHaveClass('carousel-control-next-icon')
  }
  button = document.querySelector('.carousel-control-prev')
  if (button === null) {
    expect(true).toBe(false)
  } else {
    expect(button.firstChild).toHaveClass('carousel-control-prev-icon')
  }

  expect(container).toMatchSnapshot()
})

test('CCarousel click on indicator', async () => {
  const { container } = render(
    <CCarousel controls indicators>
      <CCarouselItem>
        Item-1
        <CCarouselCaption>Caption-1</CCarouselCaption>
      </CCarouselItem>
      <CCarouselItem>
        Item-2
        <CCarouselCaption>Caption-2</CCarouselCaption>
      </CCarouselItem>
      <CCarouselItem>
        Item-3
        <CCarouselCaption>Caption-3</CCarouselCaption>
      </CCarouselItem>
    </CCarousel>,
  )
  const item1 = getByText(container, 'Item-1')
  const item2 = getByText(container, 'Item-2')

  expect(item1).toHaveClass('active')
  expect(item1).toHaveClass('carousel-item')
  expect(item2).not.toHaveClass('active')
  expect(item2).toHaveClass('carousel-item')

  // click
  const ci = document.querySelector('.carousel-indicators')
  ci && fireEvent.click(ci.children[1])
  fireEvent.transitionEnd(item1)
  fireEvent.transitionEnd(item2)

  expect(item1).not.toHaveClass('active')
  expect(item2).toHaveClass('active')

  // goback-click
  ci && fireEvent.click(ci.children[0])
  fireEvent.transitionEnd(item1)
  fireEvent.transitionEnd(item2)

  expect(item1).toHaveClass('active')
  expect(item2).not.toHaveClass('active')
})

test('CCarousel click on button', async () => {
  jest.useFakeTimers()
  const { container } = render(
    <CCarousel controls indicators>
      <CCarouselItem>
        Item-1
        <CCarouselCaption>Caption-1</CCarouselCaption>
      </CCarouselItem>
      <CCarouselItem>
        Item-2
        <CCarouselCaption>Caption-2</CCarouselCaption>
      </CCarouselItem>
      <CCarouselItem>
        Item-3
        <CCarouselCaption>Caption-3</CCarouselCaption>
      </CCarouselItem>
    </CCarousel>,
  )
  const item1 = getByText(container, 'Item-1')
  const item2 = getByText(container, 'Item-2')

  expect(item1).toHaveClass('active')
  expect(item1).toHaveClass('carousel-item')
  expect(item2).not.toHaveClass('active')
  expect(item2).toHaveClass('carousel-item')

  // click
  const buttonNext = document.querySelector('.carousel-control-next')
  buttonNext && fireEvent.click(buttonNext)
  fireEvent.transitionEnd(item1)
  fireEvent.transitionEnd(item2)

  expect(item1).not.toHaveClass('active')
  expect(item2).toHaveClass('active')

  // goback-click
  const buttonPrev = document.querySelector('.carousel-control-prev')
  buttonPrev && fireEvent.click(buttonPrev)
  fireEvent.transitionEnd(item1)
  fireEvent.transitionEnd(item2)

  expect(item1).toHaveClass('active')
  expect(item2).not.toHaveClass('active')
})

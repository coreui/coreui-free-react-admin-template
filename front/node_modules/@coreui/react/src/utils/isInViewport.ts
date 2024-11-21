const isInViewport = (element: HTMLElement) => {
  const rect = element.getBoundingClientRect()
  return (
    Math.floor(rect.top) >= 0 &&
    Math.floor(rect.left) >= 0 &&
    Math.floor(rect.bottom) <= (window.innerHeight || document.documentElement.clientHeight) &&
    Math.floor(rect.right) <= (window.innerWidth || document.documentElement.clientWidth)
  )
}

export default isInViewport

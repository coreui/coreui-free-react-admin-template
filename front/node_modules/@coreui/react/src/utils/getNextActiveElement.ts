const getNextActiveElement = (
  list: HTMLElement[],
  activeElement: HTMLElement,
  shouldGetNext: boolean,
  isCycleAllowed: boolean,
) => {
  const listLength = list.length
  let index = list.indexOf(activeElement)

  if (index === -1) {
    return !shouldGetNext && isCycleAllowed ? list[listLength - 1] : list[0]
  }

  index += shouldGetNext ? 1 : -1

  if (isCycleAllowed) {
    index = (index + listLength) % listLength
  }

  return list[Math.max(0, Math.min(index, listLength - 1))]
}

export default getNextActiveElement

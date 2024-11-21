/**
 * --------------------------------------------------------------------------
 * Custom Tooltips for Chart.js (v4.0.0): custom-tooltips.js
 * Licensed under MIT (https://github.com/coreui/coreui-chartjs/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

const ClassName = {
  TOOLTIP: 'chartjs-tooltip',
  TOOLTIP_BODY: 'chartjs-tooltip-body',
  TOOLTIP_BODY_ITEM: 'chartjs-tooltip-body-item',
  TOOLTIP_HEADER: 'chartjs-tooltip-header',
  TOOLTIP_HEADER_ITEM: 'chartjs-tooltip-header-item'
}

const getOrCreateTooltip = chart => {
  let tooltipEl = chart.canvas.parentNode.querySelector('div')

  if (!tooltipEl) {
    tooltipEl = document.createElement('div')
    tooltipEl.classList.add(ClassName.TOOLTIP)

    const table = document.createElement('table')
    table.style.margin = '0px'

    tooltipEl.append(table)
    chart.canvas.parentNode.append(tooltipEl)
  }

  return tooltipEl
}

const customTooltips = context => {
  // Tooltip Element
  const { chart, tooltip } = context
  const tooltipEl = getOrCreateTooltip(chart)

  // Hide if no tooltip
  if (tooltip.opacity === 0) {
    tooltipEl.style.opacity = 0
    return
  }

  // Set Text
  if (tooltip.body) {
    const titleLines = tooltip.title || []
    const bodyLines = tooltip.body.map(b => b.lines)

    const tableHead = document.createElement('thead')
    tableHead.classList.add(ClassName.TOOLTIP_HEADER)

    for (const title of titleLines) {
      const tr = document.createElement('tr')
      tr.style.borderWidth = 0
      tr.classList.add(ClassName.TOOLTIP_HEADER_ITEM)

      const th = document.createElement('th')
      th.style.borderWidth = 0
      const text = document.createTextNode(title)

      th.append(text)
      tr.append(th)
      tableHead.append(tr)
    }

    const tableBody = document.createElement('tbody')
    tableBody.classList.add(ClassName.TOOLTIP_BODY)

    for (const [i, body] of bodyLines.entries()) {
      const colors = tooltip.labelColors[i]

      const span = document.createElement('span')
      span.style.background = colors.backgroundColor
      span.style.borderColor = colors.borderColor
      span.style.borderWidth = '2px'
      span.style.marginRight = '10px'
      span.style.height = '10px'
      span.style.width = '10px'
      span.style.display = 'inline-block'

      const tr = document.createElement('tr')
      tr.classList.add(ClassName.TOOLTIP_BODY_ITEM)

      const td = document.createElement('td')
      td.style.borderWidth = 0

      const text = document.createTextNode(body)

      td.append(span)
      td.append(text)
      tr.append(td)
      tableBody.append(tr)
    }

    const tableRoot = tooltipEl.querySelector('table')

    // Remove old children
    while (tableRoot.firstChild) {
      tableRoot.firstChild.remove()
    }

    // Add new children
    tableRoot.append(tableHead)
    tableRoot.append(tableBody)
  }

  const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas

  // Display, position, and set styles for font
  tooltipEl.style.opacity = 1
  tooltipEl.style.left = `${positionX + tooltip.caretX}px`
  tooltipEl.style.top = `${positionY + tooltip.caretY}px`
  tooltipEl.style.font = tooltip.options.bodyFont.string
  tooltipEl.style.padding = `${tooltip.padding}px ${tooltip.padding}px`
}

export default customTooltips

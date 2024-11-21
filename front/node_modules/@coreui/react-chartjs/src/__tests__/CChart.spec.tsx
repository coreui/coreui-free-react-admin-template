import React from 'react'
import { render, cleanup, fireEvent } from '@testing-library/react'
import Chart from 'chart.js/auto'
import { CChart } from './../index'

class ResizeObserver {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  observe() {}
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  unobserve() {}
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  disconnect() {}
}

window.ResizeObserver = ResizeObserver

describe('<CChart />', () => {
  const data = {
    labels: ['red', 'blue'],
    datasets: [{ label: 'colors', data: [1, 2] }],
  }

  const options = {
    responsive: false,
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let chart: any, update: any, destroy: any
  const ref = (el: Chart | null): void => {
    chart = el

    if (chart) {
      update = jest.spyOn(chart, 'update')
      destroy = jest.spyOn(chart, 'destroy')
    }
  }

  beforeEach(() => {
    chart = null
  })

  afterEach(() => {
    if (chart) chart.destroy()

    cleanup()

    if (update) update.mockClear()
    if (destroy) destroy.mockClear()
  })

  it('should not pollute props', () => {
    render(<CChart data={data} options={options} type="bar" ref={ref} wrapper={false} />)

    expect(data).toStrictEqual({
      labels: ['red', 'blue'],
      datasets: [{ label: 'colors', data: [1, 2] }],
    })
  })

  it('should set ref to chart instance', () => {
    render(<CChart data={data} options={options} type="bar" ref={ref} wrapper={false} />)

    expect(chart).toBeTruthy()
    expect(chart instanceof Chart).toBe(true)
  })

  it('should pass props onto chart', () => {
    render(<CChart data={data} options={options} type="bar" ref={ref} wrapper={false} />)

    expect(chart.config.data).toMatchObject(data)
    expect(chart.config.options).toMatchObject(options)
    expect(chart.config.type).toEqual('bar')
  })

  it('should pass new data on data change', () => {
    const newData = {
      labels: ['red', 'blue'],
      datasets: [{ label: 'colors', data: [2, 1] }],
    }

    const { rerender } = render(
      <CChart data={data} options={options} type="bar" ref={ref} wrapper={false} />,
    )

    // const meta = chart.config.data.datasets[0]._meta;
    const id = chart.id

    rerender(<CChart data={newData} options={options} type="bar" ref={ref} wrapper={false} />)

    expect(chart.config.data).toMatchObject(newData)
    // make sure that other properties were maintained
    // expect(chart.config.data.datasets[0]._meta).toEqual(meta);
    expect(update).toHaveBeenCalled()
    expect(chart.id).toEqual(id)
  })

  it('should properly update with entirely new data', () => {
    const newData = {
      labels: ['purple', 'pink'],
      datasets: [{ label: 'new-colors', data: [1, 10] }],
    }

    const { rerender } = render(
      <CChart data={data} options={options} type="bar" ref={ref} wrapper={false} />,
    )

    const meta = chart.config.data.datasets[0]._meta
    const id = chart.id

    rerender(<CChart data={newData} options={options} type="bar" ref={ref} wrapper={false} />)

    expect(chart.config.data).toMatchObject(newData)
    expect(meta).not.toEqual(chart.config.data.datasets[0])
    expect(update).toHaveBeenCalled()
    expect(chart.id).toEqual(id)
  })

  it('should properly update when incoming data does not exist', () => {
    const oldData = {
      labels: ['red', 'blue'],
      datasets: [
        { label: 'new-colors', data: [1, 2] },
        { label: 'colors', data: [3, 2] },
      ],
    }

    const newData = {
      labels: ['red', 'blue'],
      datasets: [
        { label: 'colors', data: [4, 5] },
        { label: 'new-colors', data: [8, 2] },
      ],
    }

    const { rerender } = render(
      <CChart data={oldData} options={options} type="bar" ref={ref} wrapper={false} />,
    )

    const id = chart.id

    rerender(<CChart data={newData} options={options} type="bar" ref={ref} wrapper={false} />)

    expect(chart.config.data).toMatchObject(newData)
    expect(update).toHaveBeenCalled()
    expect(chart.id).toEqual(id)
  })

  it('should pass new options on options change', () => {
    const newOptions = {
      responsive: true,
    }

    const { rerender } = render(
      <CChart data={data} options={options} type="bar" ref={ref} wrapper={false} />,
    )

    const id = chart.id

    rerender(<CChart data={data} options={newOptions} type="bar" ref={ref} wrapper={false} />)

    expect(chart.options).toMatchObject(newOptions)
    expect(update).toHaveBeenCalled()
    expect(chart.id).toEqual(id)
  })

  it('should destroy and rerender when set to redraw', () => {
    const newData = {
      labels: ['red', 'blue'],
      datasets: [{ label: 'colors', data: [2, 1] }],
    }

    const { rerender } = render(
      <CChart data={data} options={options} type="bar" ref={ref} redraw />,
    )

    // const id = chart.id;
    const originalChartDestroy = Object.assign({}, destroy)

    rerender(<CChart data={newData} options={options} type="bar" ref={ref} redraw />)

    expect(originalChartDestroy).toHaveBeenCalled()
  })

  it('should destroy when unmounted', () => {
    const { unmount } = render(
      <CChart data={data} options={options} type="bar" ref={ref} wrapper={false} />,
    )

    expect(chart).toBeTruthy()

    unmount()

    expect(chart).toBe(null)
  })

  it('should add className ', () => {
    render(
      <CChart
        data={data}
        options={options}
        className="chart-example"
        type="bar"
        ref={ref}
        wrapper={false}
      />,
    )

    expect(chart).toBeTruthy()
    expect(chart.canvas).toHaveProperty('className')
    expect(chart.canvas.className).toEqual('chart-example')
  })

  it('should call getDatasetAtEvent', () => {
    const getDatasetAtEvent = jest.fn()

    const { getByTestId } = render(
      <CChart
        data={data}
        options={options}
        type="bar"
        ref={ref}
        getDatasetAtEvent={getDatasetAtEvent}
      />,
    )

    fireEvent.click(getByTestId('canvas'))

    expect(getDatasetAtEvent).toHaveBeenCalled()
  })

  it('should call getElementAtEvent', () => {
    const getElementAtEvent = jest.fn()

    const { getByTestId } = render(
      <CChart
        data={data}
        options={options}
        type="bar"
        ref={ref}
        getElementAtEvent={getElementAtEvent}
      />,
    )

    fireEvent.click(getByTestId('canvas'))

    expect(getElementAtEvent).toHaveBeenCalled()
  })

  it('should call getElementsAtEvent', () => {
    const getElementsAtEvent = jest.fn()

    const { getByTestId } = render(
      <CChart
        data={data}
        options={options}
        type="bar"
        ref={ref}
        getElementsAtEvent={getElementsAtEvent}
      />,
    )

    fireEvent.click(getByTestId('canvas'))

    expect(getElementsAtEvent).toHaveBeenCalled()
  })

  it('should pass through aria labels to the canvas element', () => {
    const ariaLabel = 'ARIA LABEL'
    render(<CChart data={data} options={options} type="bar" ref={ref} aria-label={ariaLabel} />)

    expect(chart.canvas.getAttribute('aria-label')).toBe(ariaLabel)
  })
})

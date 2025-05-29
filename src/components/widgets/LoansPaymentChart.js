import React, { Component } from 'react'
import { CChartBar } from '@coreui/react-chartjs'

class LoanPaymentChart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [
        { label: 'Category A', data: [12, 19, 8], barLabels: ['Label 1', 'Label 2', 'Label 3'] },
        { label: 'Category B', data: [5, 20, 13], barLabels: ['Label 4', 'Label 5', 'Label 6'] },
        { label: 'Category C', data: [18, 15, 22], barLabels: ['Label 7', 'Label 8', 'Label 9'] },
      ],
      processData: [], // Initialize processData as an empty array
    }
  }

  processData(data) {
    const output = []
    for (const key in data.details) {
      if (data.details.hasOwnProperty(key)) {
        const numbers = []
        const names = []
        for (let k = 0; k < data.details[key].length; k++) {
          console.log(data.details[key][k])
          numbers.push(data.details[key][k].amount)
          names.push(data.details[key][k].name)
        }
        output.push({ label: key, data: numbers }) // Push each item as an object to the output array
      }
    }
    console.log(output)
    return output // Return the output array
  }

  componentDidMount() {
    // Process the initial data after the page has loaded
    const processedData = this.processData(this.props.data)
    this.setState({ processData: processedData })
  }

  render() {
    const { processData } = this.state

    const options = {
      // Your options configuration here...
    }

    return (
      <>
        {/* Render your processed data here */}
        <div>{/* Render processData */}</div>

        {/* Render your chart */}
        <CChartBar
          type="bar"
          data={{
            labels: processData.map((d) => d.label),
            datasets: processData.map((d) => ({
              label: d.label,
              data: d.data,
              backgroundColor: 'rgba(137, 185, 249, 0.7)',
              borderColor: 'rgba(137, 185, 249, 1)',
              borderWidth: 1,
            })),
          }}
          options={options}
        />
      </>
    )
  }
}

export default LoanPaymentChart

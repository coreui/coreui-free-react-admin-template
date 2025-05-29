import React, { Component } from 'react'
import { HalfPieChart } from 'half-pie-chart'
import { CCard, CCardBody } from '@coreui/react'

class LoanMeter extends Component {
  constructor(props) {
    super(props)
    console.log(props)
    const { data } = props
    const paidValue = data && data.paid ? data.paid : 0
    const totalValue = data && data.unpaid ? data.unpaid : 0

    this.state = {
      right: [
        {
          value: paidValue,
          displayValue: paidValue,
          text: 'Paid',
          color: '#2596be',
        },
      ],
      left: [
        {
          value: totalValue,
          displayValue: totalValue,
          text: 'Total',
          color: '#fff',
        },
      ],
    }
  }

  componentDidMount() {
    // Fetch and process data here
    this.processData(this.props.data)
  }

  componentDidUpdate(prevProps) {
    // Check if props have changed, and update state accordingly
    if (this.props.data !== prevProps.data) {
      this.processData(this.props.data)
    }
  }

  processData(data) {
    if (data) {
      const paidValue = data.paid || 0
      const totalValue = data.total || 0

      this.setState({
        right: [
          {
            value: paidValue,
            displayValue: paidValue,
            text: 'Paid',
            color: '#2596be',
          },
        ],
        left: [
          {
            value: totalValue,
            displayValue: totalValue,
            text: 'Total',
            color: '#fff',
          },
        ],
      })
    } else {
      console.error("LoanMeter component: Missing required 'data' prop.")
    }
  }

  render() {
    return (
      <CCard color="warning" textColor="black">
        <CCardBody>
          <HalfPieChart name="rentStatus" right={this.state.right} left={this.state.left} />
        </CCardBody>
      </CCard>
    )
  }
}

export default LoanMeter

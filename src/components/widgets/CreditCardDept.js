import React, { useState } from 'react'
import { CRow, CCol, CWidgetStatsB, CProgressBar } from '@coreui/react'
import axios from 'axios'

const CreditCardDept = (props) => {
  const url = process.env.REACT_APP_API_URL
  const [limit, setLimit] = useState(null)
  const [balance, setBalace] = useState(null)
  const [spent, setSpent] = useState(null)
  axios.get(url + 'credit_card_payments/balance').then((response) => {
    setLimit(response.data['limit'])
    setBalace(response.data['balance'])
    setSpent(response.data['spent'])
  })

  const getPercentage = () => {
    let p = spent / limit
    return Math.round(p * 100)
  }

  const getColor = () => {
    const percentage = getPercentage()
    if (percentage > 75) return 'danger'
    else if (percentage > 50) return 'warning'
    else return 'success'
  }

  const percentage = getPercentage()
  const color = getColor()

  return (
    <CWidgetStatsB
      className="mb-3"
      color={color}
      inverse
      progress={{ value: percentage }}
      text={`${balance} JOD available to spend`}
      title={`Spent ${spent} from your Cards`}
      value={percentage + ` %`}
      textColor={'red'}
    />
  )
}

export default CreditCardDept

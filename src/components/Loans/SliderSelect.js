import React from 'react'
// import { Container, Typography } from "@mui/material";
import SliderComponent from './SliderComponent'

const SliderSelect = ({ data, setData }) => {
  const bank_limit = 150000
  return (
    <div>
      <SliderComponent
        onChange={(e, value) => {
          setData({
            ...data,
            homeValue: value.toFixed(0),
            downPayment: (0.2 * value).toFixed(0),
            loanAmount: (0.8 * value).toFixed(0),
          })
        }}
        defaultValue={data.homeValue}
        min={100}
        max={bank_limit}
        steps={100}
        unit="JOD"
        amount={data.homeValue}
        label="Loan Value"
        value={data.homeValue}
      />

      <SliderComponent
        onChange={(e, value) =>
          setData({
            ...data,
            downPayment: value.toFixed(0),
            loanAmount: (data.homeValue - value).toFixed(0),
          })
        }
        defaultValue={data.downPayment}
        min={0}
        max={data.homeValue}
        steps={100}
        unit="JOD"
        amount={data.downPayment}
        label="Down Payment"
        value={data.downPayment}
      />

      <SliderComponent
        onChange={(e, value) =>
          setData({
            ...data,
            loanAmount: value.toFixed(0),
            downPayment: (data.homeValue - value).toFixed(0),
          })
        }
        defaultValue={data.loanAmount}
        min={0}
        max={data.homeValue}
        steps={100}
        unit="JOD"
        amount={data.loanAmount}
        label="Loan Amount"
        value={data.loanAmount}
      />

      <SliderComponent
        onChange={(e, value) =>
          setData({
            ...data,
            interestRate: value,
          })
        }
        defaultValue={data.interestRate}
        min={0}
        max={25}
        steps={0.25}
        unit="%"
        amount={data.interestRate}
        label="Interest Rate"
        value={data.interestRate}
      />
    </div>
  )
}

export default SliderSelect

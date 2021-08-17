import React from 'react'
import Additems from '../newconsignment/additems/Additems'
import { useForm, useStep } from 'react-hooks-helper'
import Consignor from '../newconsignment/consignor/Createconsignor'
import Consignee from '../newconsignment/consignee/Consignee'
import Consignmentssummary from '../newconsignment/consignmentsummary/Consignmentsummary'
import Addcharge from '../newconsignment/addcharge/addcharge'
import Recipt from '../recipt/Recipt'

const defaultData = {
  Quantity: '',
  packageType: '',
  productDetails: '',
  actualWeight: '',
  grossWeight: '',
}
const steps = [
  { id: 'additems' },
  { id: 'consignor' },
  { id: 'consignee' },
  { id: 'consignmentssummary' },
  { id: 'addcharge' },
  { id: 'recipt' },
]
function Consignment() {
  const [formData, setForm] = useForm(defaultData)
  const { step, navigation } = useStep({
    steps,
    initialStep: 0,
  })
  switch (step.id) {
    case 'additems':
      return <Additems />
    case 'consignor':
      return <Consignor />
    case 'consignee':
      return <Consignee />
    case 'consignmentssummary':
      return <Consignmentssummary />
    case 'addcharge':
      return <Addcharge />
    case 'recipt':
      return <Recipt />
    default:
      break
  }

  return (
    <div>
      <Additems />
    </div>
  )
}

export default Consignment

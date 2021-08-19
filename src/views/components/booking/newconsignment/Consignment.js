import React from 'react'
import Additems from '../newconsignment/additems/Additems'
import { useForm, useStep } from 'react-hooks-helper'
import Consignor from '../newconsignment/consignor/Createconsignor'
import Consignee from '../newconsignment/consignee/Consignee'
import Consignmentssummary from '../newconsignment/consignmentsummary/Consignmentsummary'
import Addcharge from '../newconsignment/addcharge/addcharge'
import Recipt from '../recipt/Recipt'

const defaultData = {
  // quantity: '',
  // packageType: '',
  // productDetails: '',
  // actualWeight: '',
  // grossWeight: '',
  // weighttype: '',
  // gst: '',
  // rateperreturn: '',
  // rate: '',
  consignmentbookingdate: '',
  biltytype: '',
  bookingrefference: '',
  brokerdetails: '',
  billdate: '',
  billno: '',
  taxpaidby: '',
  from: '',
  valueofgoods: '',
  to: '',
  packingsize: '',
  partymark: '',
  brokernote: '',
  shippingrisk: '',
  ewaybillno: '',
  ewaybilldate: '',
  distancelevel: '',
  consignorname1: '',
  address11: '',
  address21: '',
  state1: '',
  city1: '',
  pincode1: '',
  consignormobile1: '',
  consignoramobile1: '',
  email1: '',
  consignorgstno1: '',
  consigneename: '',
  consigneeaddress1: '',
  consigneeaddress2: '',
  state: '',
  pincode: '',
  city: '',
  consigneemobile1: '',
  consigneeamobile: '',
  email: '',
  consigneegstno: '',
  rc: '',
  hamaili: '',
  servicecharge: '',
  statisticalcharge: '',
  covercharge: '',
  insurancecharge: '',
  ddcharge: '',
  packingcharge: '',
  othercharge: '',
  feecharge: '',
  doordeliverycharges: '',
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
  const props = { formData, setForm, navigation }

  switch (step.id) {
    case 'additems':
      return <Additems {...props} />
    case 'consignor':
      return <Consignor {...props} />
    case 'consignee':
      return <Consignee {...props} />
    case 'consignmentssummary':
      return <Consignmentssummary {...props} />
    case 'addcharge':
      return <Addcharge {...props} />
    case 'recipt':
      return <Recipt {...props} />
    default:
      break
  }

  return <div></div>
}

export default Consignment

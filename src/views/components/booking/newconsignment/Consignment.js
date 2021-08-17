import React, { useState } from 'react'
import Additems from '../additems/Additems'

function Consignment() {
  const [state, setState] = useState('start')

  return <div>{state === 'start' && <Additems />}</div>
}

export default Consignment
 
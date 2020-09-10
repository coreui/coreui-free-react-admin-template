import React, { lazy } from 'react'
import './DriverDispatch.css'
const WhseCount = lazy(() => import('../../../src/utils/WhseCount'))
const CreateDriver = lazy(() => import('./drivers/createdriver.js'))


const DriverDispatch = () => {
  return (
    <React.Fragment>
    <div className="main-container">

      <div className="store-div">
        <WhseCount/>
        </div>
        <div className="driver-div">
        <CreateDriver/>
        </div>
      </div>
    </React.Fragment>
  )
}

export default DriverDispatch

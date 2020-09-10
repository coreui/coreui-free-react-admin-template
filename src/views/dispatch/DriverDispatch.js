import React, { lazy } from 'react'
import './DriverDispatch.css'
const WhseCount = lazy(() => import('../../utils/stores/WhseCount.js'))
const CreateDriver = lazy(() => import('./drivers/createdriver.js'))
const CreateDryModal = lazy(() => import('./modal/CreateDryModal'))


const DriverDispatch = () => {
  return (
    <React.Fragment>
    <div className="main-container">

      <div className="store-div">
        <WhseCount>
        <CreateDryModal/>
        </WhseCount>
        </div>
        <div className="driver-div">
        <CreateDriver/>
        </div>
      </div>
    </React.Fragment>
  )
}

export default DriverDispatch

import React, { lazy } from 'react'
import './Loadboard.css'
const CreateStore = lazy(() => import('../../views/dispatch/createstore.js'))
const CreateDriver = lazy(() => import('../../views/dispatch/createdriver.js'))
const WidgetsDropdown = lazy(() => import('../../views/widgets/WidgetsDropdown.js'))


const Loadboard = () => {
  return (
    <React.Fragment>
    <div class="main-container">
    <WidgetsDropdown />
    
      <div class="store-driver-div">
        <CreateStore/>
        <CreateDriver/>
      </div>
    </div>
    </React.Fragment>
  )
}

export default Loadboard

import React, { lazy } from 'react'
import './Loadboard.css'
const CreateStore = lazy(() => import('../../views/dispatch/stores/createstore.js'))
const CreateBadge = lazy( () => import('../../views/dispatch/badge/createBadge.js'))
const CreateDriver = lazy(() => import('../../views/dispatch/drivers/createdriver.js'))
const WidgetsDropdown = lazy(() => import('../../views/widgets/WidgetsDropdown.js'))


const Loadboard = () => {
  return (
    <React.Fragment>
    <div className="main-container">
    <WidgetsDropdown />
    
      <div className="store-driver-div">
        <CreateStore/>
        <CreateBadge />
        <CreateDriver/>
      </div>
    </div>
    </React.Fragment>
  )
}

export default Loadboard

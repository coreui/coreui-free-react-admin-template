import React, { lazy } from 'react'
const CreateDryLoads = lazy(() => import('../as400/CreateDryLoads.js'))
const WidgetsDropdown = lazy(() => import('../../widgets/WidgetsDropdown.js'))


const DryLoads = () => {
  return (
    <React.Fragment>
    <div className="main-container">
    <WidgetsDropdown />

      <div className="store-driver-div">
        <CreateDryLoads/>
       

      </div>
    </div>
    </React.Fragment>
  )
}

export default DryLoads
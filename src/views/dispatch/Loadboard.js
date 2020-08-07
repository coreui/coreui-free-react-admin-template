import React, { lazy } from 'react'

const CreateStore = lazy(() => import('../../views/dispatch/createstore.js'))
const CreateDriver = lazy(() => import('../../views/dispatch/createdriver.js'))
const WidgetsDropdown = lazy(() => import('../../views/widgets/WidgetsDropdown.js'))


const Loadboard = () => {
  return (
    <>
      <WidgetsDropdown />
        <CreateStore/>
    </>
  )
}

export default Loadboard

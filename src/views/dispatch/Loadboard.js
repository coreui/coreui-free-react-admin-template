import React, { lazy } from 'react'

const CreateStore = lazy(() => import('../../views/dispatch/createstore.js'))
const WidgetsDropdown = lazy(() => import('../../views/widgets/WidgetsDropdown.js'))


const Store = () => {
  return (
    <>
      <WidgetsDropdown />
        <CreateStore/>
    </>
  )
}

export default Store

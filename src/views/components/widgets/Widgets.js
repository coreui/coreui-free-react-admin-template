import React from 'react'
import { CCardGroup, CWidgetProgressIcon } from '@coreui/react'
import CIcon from '@coreui/icons-react'

const Widgets = () => {
  return (
    <>
      <CCardGroup className="mb-4">
        <CWidgetProgressIcon
          icon={<CIcon name="cil-people" height="36" />}
          value="87"
          title="Total Shipments Count"
          progressColor="info"
          progressValue={75}
        />
        <CWidgetProgressIcon
          icon={<CIcon name="cil-userFollow" height="36" />}
          value="385"
          title="Pending Shipments Count"
          progressColor="success"
          progressValue={75}
        />
        <CWidgetProgressIcon
          icon={<CIcon name="cil-basket" height="36" />}
          value="1238"
          title="Delivered Shipments Count"
          progressColor="warning"
          progressValue={75}
        />
        <CWidgetProgressIcon
          icon={<CIcon name="cil-chartPie" height="36" />}
          value="28%"
          title="Total Missions Counts"
          progressValue={75}
        />
      </CCardGroup>
    </>
  )
}

export default Widgets

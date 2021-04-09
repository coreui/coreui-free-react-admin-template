import React from 'react'
import {
  CCardGroup,
  CCol,
  CLink,
  CRow,
  CWidgetIcon,
  CWidgetProgress,
  CWidgetProgressIcon,
  CWidgetSimple,
} from '@coreui/react-ts'

import WidgetsBrand from './WidgetsBrand'
import WidgetsDropdown from './WidgetsDropdown'

import ChartLineSimple from '../charts/ChartLineSimple'
import ChartBarSimple from '../charts/ChartBarSimple'

import CIcon from '@coreui/icons-react'

const Widgets = () => {
  return (
    <>
      <WidgetsDropdown />
      <CRow>
        <CCol xs="12" sm="6" lg="3">
          <CWidgetProgress
            className="mb-4"
            value="89.9%"
            title="Widget title"
            progressColor="success"
            progressValue={89.9}
            text="Lorem ipsum dolor sit amet enim."
          />
        </CCol>
        <CCol xs="12" sm="6" lg="3">
          <CWidgetProgress
            className="mb-4"
            value="12.124"
            title="Widget title"
            progressColor="info"
            progressValue={89.9}
            text="Lorem ipsum dolor sit amet enim."
          />
        </CCol>
        <CCol xs="12" sm="6" lg="3">
          <CWidgetProgress
            className="mb-4"
            value="$98.111,00"
            title="Widget title"
            progressColor="warning"
            progressValue={89.9}
            text="Lorem ipsum dolor sit amet enim."
          />
        </CCol>
        <CCol xs="12" sm="6" lg="3">
          <CWidgetProgress
            className="mb-4"
            value="2 TB"
            title="Widget title"
            progressValue={89.9}
            text="Lorem ipsum dolor sit amet enim."
          />
        </CCol>

        <CCol xs="12" sm="6" lg="3">
          <CWidgetProgress
            className="mb-4"
            color="success"
            textColor="white"
            value="89.9%"
            title="Widget title"
            progressWhite
            progressValue={89.9}
            text="Lorem ipsum dolor sit amet enim."
          />
        </CCol>
        <CCol xs="12" sm="6" lg="3">
          <CWidgetProgress
            className="mb-4"
            color="info"
            textColor="white"
            value="12.124"
            title="Widget title"
            progressWhite
            progressValue={89.9}
            text="Lorem ipsum dolor sit amet enim."
          />
        </CCol>
        <CCol xs="12" sm="6" lg="3">
          <CWidgetProgress
            className="mb-4"
            color="warning"
            textColor="white"
            value="$98.111,00"
            title="Widget title"
            progressWhite
            progressValue={89.9}
            text="Lorem ipsum dolor sit amet enim."
          />
        </CCol>
        <CCol xs="12" sm="6" lg="3">
          <CWidgetProgress
            className="mb-4"
            color="primary"
            textColor="white"
            value="2 TB"
            title="Widget title"
            progressWhite
            progressValue={89.9}
            text="Lorem ipsum dolor sit amet enim."
          />
        </CCol>
      </CRow>

      <CRow>
        <CCol xs="12" sm="6" lg="3">
          <CWidgetIcon
            className="mb-3"
            icon={<CIcon width={24} name="cil-settings" className="icon icon-xl" />}
            iconPadding={3}
            title="income"
            value="$1.999,50"
            color="primary"
          />
        </CCol>
        <CCol xs="12" sm="6" lg="3">
          <CWidgetIcon
            className="mb-3"
            icon={<CIcon width={24} name="cil-user" className="icon icon-xl" />}
            iconPadding={3}
            title="income"
            value="$1.999,50"
            color="info"
          />
        </CCol>
        <CCol xs="12" sm="6" lg="3">
          <CWidgetIcon
            className="mb-3"
            icon={<CIcon width={24} name="cil-moon" className="icon icon-xl" />}
            iconPadding={3}
            title="income"
            value="$1.999,50"
            color="warning"
          />
        </CCol>
        <CCol xs="12" sm="6" lg="3">
          <CWidgetIcon
            className="mb-3"
            icon={<CIcon width={24} name="cil-bell" className="icon icon-xl" />}
            iconPadding={3}
            title="income"
            value="$1.999,50"
            color="danger"
          />
        </CCol>
        <CCol xs="12" sm="6" lg="3">
          <CWidgetIcon
            className="mb-3"
            icon={<CIcon width={24} name="cil-settings" className="icon icon-xl" />}
            iconPadding={3}
            title="income"
            value="$1.999,50"
            color="primary"
            footer={
              <CLink
                className="font-weight-bold font-xs btn-block text-muted"
                href="https://coreui.io/"
                rel="noopener norefferer"
                target="_blank"
              >
                View more
                <CIcon name="cil-arrow-right" className="float-end" width="16" />
              </CLink>
            }
          />
        </CCol>
        <CCol xs="12" sm="6" lg="3">
          <CWidgetIcon
            className="mb-3"
            icon={<CIcon width={24} name="cil-laptop" className="icon icon-xl" />}
            iconPadding={3}
            title="income"
            value="$1.999,50"
            color="info"
            footer={
              <CLink
                className="font-weight-bold font-xs btn-block text-muted"
                href="https://coreui.io/"
                rel="noopener norefferer"
                target="_blank"
              >
                View more
                <CIcon name="cil-arrow-right" className="float-end" width="16" />
              </CLink>
            }
          />
        </CCol>
        <CCol xs="12" sm="6" lg="3">
          <CWidgetIcon
            className="mb-3"
            icon={<CIcon width={24} name="cil-moon" className="icon icon-xl" />}
            iconPadding={3}
            title="income"
            value="$1.999,50"
            color="warning"
            footer={
              <CLink
                className="font-weight-bold font-xs btn-block text-muted"
                href="https://coreui.io/"
                rel="noopener norefferer"
                target="_blank"
              >
                View more
                <CIcon name="cil-arrow-right" className="float-end" width="16" />
              </CLink>
            }
          />
        </CCol>
        <CCol xs="12" sm="6" lg="3">
          <CWidgetIcon
            className="mb-3"
            icon={<CIcon width={24} name="cil-bell" className="icon icon-xl" />}
            iconPadding={3}
            title="income"
            value="$1.999,50"
            color="danger"
            footer={
              <CLink
                className="font-weight-bold font-xs btn-block text-muted"
                href="https://coreui.io/"
                rel="noopener norefferer"
                target="_blank"
              >
                View more
                <CIcon name="cil-arrow-right" className="float-end" width="16" />
              </CLink>
            }
          />
        </CCol>
        <CCol xs="12" sm="6" lg="3">
          <CWidgetIcon
            className="mb-3"
            padding={0}
            icon={<CIcon width={24} name="cil-settings" className="icon icon-xl" />}
            iconPadding={4}
            title="income"
            value="$1.999,50"
            color="primary"
          />
        </CCol>
        <CCol xs="12" sm="6" lg="3">
          <CWidgetIcon
            className="mb-3"
            padding={0}
            icon={<CIcon width={24} name="cil-user" className="icon icon-xl" />}
            iconPadding={4}
            title="income"
            value="$1.999,50"
            color="info"
          />
        </CCol>
        <CCol xs="12" sm="6" lg="3">
          <CWidgetIcon
            className="mb-3"
            padding={0}
            icon={<CIcon width={24} name="cil-moon" className="icon icon-xl" />}
            iconPadding={4}
            title="income"
            value="$1.999,50"
            color="warning"
          />
        </CCol>
        <CCol xs="12" sm="6" lg="3">
          <CWidgetIcon
            className="mb-3"
            padding={0}
            icon={<CIcon width={24} name="cil-bell" className="icon icon-xl" />}
            iconPadding={4}
            title="income"
            value="$1.999,50"
            color="danger"
          />
        </CCol>
      </CRow>
      <WidgetsBrand />
      <WidgetsBrand withCharts />
      <CCardGroup className="mb-4">
        <CWidgetProgressIcon
          icon={<CIcon name="cil-people" className="icon icon-2xl" />}
          value="87.500"
          title="Visitors"
          progressColor="info"
          progressValue={75}
        />
        <CWidgetProgressIcon
          icon={<CIcon name="cil-userFollow" className="icon icon-2xl" />}
          value="385"
          title="New Clients"
          progressColor="success"
          progressValue={75}
        />
        <CWidgetProgressIcon
          icon={<CIcon name="cil-basket" className="icon icon-2xl" />}
          value="1238"
          title="Products sold"
          progressColor="warning"
          progressValue={75}
        />
        <CWidgetProgressIcon
          icon={<CIcon name="cil-chartPie" className="icon icon-2xl" />}
          value="28%"
          title="Returning Visitors"
          progressValue={75}
        />
        <CWidgetProgressIcon
          icon={<CIcon name="cil-speedometer" className="icon icon-2xl" />}
          value="5:34:11"
          title="Avg. Time"
          progressColor="danger"
          progressValue={75}
        />
      </CCardGroup>
      <CRow>
        <CCol sm="6" md="2">
          <CWidgetProgressIcon
            icon={<CIcon name="cil-people" height="36" />}
            value="87.500"
            title="Visitors"
            progressColor="info"
            progressValue={75}
          />
        </CCol>
        <CCol sm="6" md="2">
          <CWidgetProgressIcon
            icon={<CIcon name="cil-userFollow" height="36" />}
            value="385"
            title="New Clients"
            progressColor="success"
            progressValue={75}
          />
        </CCol>
        <CCol sm="6" md="2">
          <CWidgetProgressIcon
            icon={<CIcon name="cil-basket" height="36" />}
            value="1238"
            title="Products sold"
            progressColor="warning"
            progressValue={75}
          />
        </CCol>
        <CCol sm="6" md="2">
          <CWidgetProgressIcon
            icon={<CIcon name="cil-chartPie" height="36" />}
            value="28%"
            title="Returning Visitors"
            progressColor="primary"
            progressValue={75}
          />
        </CCol>
        <CCol sm="6" md="2">
          <CWidgetProgressIcon
            icon={<CIcon name="cil-speedometer" height="36" />}
            value="5:34:11"
            title="Avg. Time"
            progressColor="danger"
            progressValue={75}
          />
        </CCol>
        <CCol sm="6" md="2">
          <CWidgetProgressIcon
            icon={<CIcon name="cil-speech" height="36" />}
            value="972"
            title="comments"
            progressColor="info"
            progressValue={75}
          />
        </CCol>
      </CRow>
      <CRow>
        <CCol sm="6" md="2">
          <CWidgetProgressIcon
            color="info"
            icon={<CIcon name="cil-people" height="36" />}
            value="87.500"
            title="Visitors"
            progressValue={75}
            progressWhite
          />
        </CCol>
        <CCol sm="6" md="2">
          <CWidgetProgressIcon
            color="success"
            icon={<CIcon name="cil-userFollow" height="36" />}
            value="385"
            title="New Clients"
            progressValue={75}
            progressWhite
          />
        </CCol>
        <CCol sm="6" md="2">
          <CWidgetProgressIcon
            color="warning"
            icon={<CIcon name="cil-basket" height="36" />}
            value="1238"
            title="Products sold"
            progressValue={75}
            progressWhite
          />
        </CCol>
        <CCol sm="6" md="2">
          <CWidgetProgressIcon
            color="primary"
            icon={<CIcon name="cil-chartPie" height="36" />}
            value="28%"
            title="Returning Visitors"
            progressValue={75}
            progressWhite
          />
        </CCol>
        <CCol sm="6" md="2">
          <CWidgetProgressIcon
            color="danger"
            icon={<CIcon name="cil-speedometer" height="36" />}
            value="5:34:11"
            title="Avg. Time"
            progressValue={75}
            progressWhite
          />
        </CCol>
        <CCol sm="6" md="2">
          <CWidgetProgressIcon
            color="info"
            icon={<CIcon name="cil-speech" height="36" />}
            value="972"
            title="comments"
            progressValue={75}
            progressWhite
          />
        </CCol>
      </CRow>
      <CRow>
        <CCol sm="4" lg="2">
          <CWidgetSimple title="title" value="1,123">
            <ChartLineSimple style={{ height: '40px' }} borderColor="danger" />
          </CWidgetSimple>
        </CCol>
        <CCol sm="4" lg="2">
          <CWidgetSimple title="title" value="1,123">
            <ChartLineSimple style={{ height: '40px' }} borderColor="primary" />
          </CWidgetSimple>
        </CCol>
        <CCol sm="4" lg="2">
          <CWidgetSimple title="title" value="1,123">
            <ChartLineSimple style={{ height: '40px' }} borderColor="success" />
          </CWidgetSimple>
        </CCol>
        <CCol sm="4" lg="2">
          <CWidgetSimple title="title" value="1,123">
            <ChartBarSimple style={{ height: '40px' }} backgroundColor="danger" />
          </CWidgetSimple>
        </CCol>
        <CCol sm="4" lg="2">
          <CWidgetSimple title="title" value="1,123">
            <ChartBarSimple style={{ height: '40px' }} backgroundColor="primary" />
          </CWidgetSimple>
        </CCol>
        <CCol sm="4" lg="2">
          <CWidgetSimple title="title" value="1,123">
            <ChartBarSimple style={{ height: '40px' }} backgroundColor="success" />
          </CWidgetSimple>
        </CCol>
      </CRow>
    </>
  )
}

export default Widgets

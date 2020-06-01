import React from 'react'
import {
  CCardGroup,
  CCardFooter,
  CCol,
  CLink,
  CRow,
  CWidgetProgress,
  CWidgetIcon,
  CWidgetProgressIcon,
  CWidgetSimple,
  CProgress,
} from '@coreui/react'
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
          <CWidgetProgress color="success" header="89.9%" text="Lorem ipsum..." footer="Lorem ipsum dolor sit amet enim."/>
        </CCol>
        <CCol xs="12" sm="6" lg="3">
          <CWidgetProgress color="info" header="12.124" text="Lorem ipsum..." footer="Lorem ipsum dolor sit amet enim."/>
        </CCol>
        <CCol xs="12" sm="6" lg="3">
          <CWidgetProgress color="warning" header="$98.111,00" text="Lorem ipsum..." footer="Lorem ipsum dolor sit amet enim."/>
        </CCol>
        <CCol xs="12" sm="6" lg="3">
          <CWidgetProgress header="2 TB" text="Lorem ipsum..." footer="Lorem ipsum dolor sit amet enim.">
            <CProgress color="danger" animated size="xs" className="my-3" value={75}/>
          </CWidgetProgress>
        </CCol>

        <CCol xs="12" sm="6" lg="3">
          <CWidgetProgress inverse color="success" variant="inverse" header="89.9%" text="Lorem ipsum..." footer="Lorem ipsum dolor sit amet enim."/>
        </CCol>
        <CCol xs="12" sm="6" lg="3">
          <CWidgetProgress inverse color="info" variant="inverse" header="12.124" text="Lorem ipsum..." footer="Lorem ipsum dolor sit amet enim."/>
        </CCol>
        <CCol xs="12" sm="6" lg="3">
          <CWidgetProgress inverse color="warning" variant="inverse" header="$98.111,00" text="Lorem ipsum..." footer="Lorem ipsum dolor sit amet enim."/>
        </CCol>
        <CCol xs="12" sm="6" lg="3">
          <CWidgetProgress inverse color="danger" variant="inverse" value={95} header="2 TB" text="Lorem ipsum..." footer="Lorem ipsum dolor sit amet enim."/>
        </CCol>

      </CRow>

      <CRow>
        <CCol xs="12" sm="6" lg="3">
          <CWidgetIcon text="income" header="$1.999,50" color="primary">
            <CIcon width={24} name="cil-settings"/>
          </CWidgetIcon>
        </CCol>
        <CCol xs="12" sm="6" lg="3">
          <CWidgetIcon text="income" header="$1.999,50" color="info">
            <CIcon width={24} name="cil-user"/>
          </CWidgetIcon>
        </CCol>
        <CCol xs="12" sm="6" lg="3">
          <CWidgetIcon text="income" header="$1.999,50" color="warning">
            <CIcon width={24} name="cil-moon"/>
          </CWidgetIcon>
        </CCol>
        <CCol xs="12" sm="6" lg="3">
          <CWidgetIcon text="income" header="$1.999,50" color="danger">
            <CIcon width={24} name="cil-bell"/>
          </CWidgetIcon>
        </CCol>
        <CCol xs="12" sm="6" lg="3">
          <CWidgetIcon text="income" header="$1.999,50" color="primary" iconPadding={false}>
            <CIcon width={24} name="cil-settings"/>
          </CWidgetIcon>
        </CCol>
        <CCol xs="12" sm="6" lg="3">
          <CWidgetIcon text="income" header="$1.999,50" color="info" iconPadding={false}>
            <CIcon width={24} name="cil-laptop"/>
          </CWidgetIcon>
        </CCol>
        <CCol xs="12" sm="6" lg="3">
          <CWidgetIcon text="income" header="$1.999,50" color="warning" iconPadding={false}>
            <CIcon width={24} name="cil-moon"/>
          </CWidgetIcon>
        </CCol>
        <CCol xs="12" sm="6" lg="3">
          <CWidgetIcon text="income" header="$1.999,50" color="danger" iconPadding={false}>
            <CIcon width={24} name="cil-bell"/>
          </CWidgetIcon>
            
        </CCol>
        <CCol xs="12" sm="6" lg="4">
          <CWidgetIcon text="income" header="$1.999,50" color="primary" iconPadding={false}>
            <CIcon width={24} name="cil-settings" className="mx-5"/>
          </CWidgetIcon>
        </CCol>
        <CCol xs="12" sm="6" lg="4">
          <CWidgetIcon text="income" header="$1.999,50" color="info" iconPadding={false}>
            <CIcon width={24} name="cil-laptop" className="mx-5"/>
          </CWidgetIcon>
        </CCol>
        <CCol xs="12" sm="6" lg="4">
          <CWidgetIcon 
            text="income" 
            header="$1.999,50" 
            color="warning" 
            iconPadding={false}
            footerSlot={
              <CCardFooter className="card-footer px-3 py-2">
                <CLink
                  className="font-weight-bold font-xs btn-block text-muted"
                  href="https://coreui.io/"
                  rel="noopener norefferer" 
                  target="_blank"
                >
                  View more
                  <CIcon name="cil-arrow-right" className="float-right" width="16"/>
                </CLink>
              </CCardFooter>
            }
          >
            <CIcon width={24} name="cil-moon" className="mx-5"/>
          </CWidgetIcon>
        </CCol>
      </CRow>
      <WidgetsBrand/>
      <WidgetsBrand withCharts/>
      <CCardGroup className="mb-4">
        <CWidgetProgressIcon
          header="87.500"
          text="Visitors"
          color="gradient-info"
        >
          <CIcon name="cil-people" height="36"/>
        </CWidgetProgressIcon>
        <CWidgetProgressIcon
          header="385"
          text="New Clients"
          color="gradient-success"
        >
          <CIcon name="cil-userFollow" height="36"/>
        </CWidgetProgressIcon>
        <CWidgetProgressIcon
          header="1238"
          text="Products sold"
          color="gradient-warning"
        >
          <CIcon name="cil-basket" height="36"/>
        </CWidgetProgressIcon>
        <CWidgetProgressIcon
          header="28%"
          text="Returning Visitors"
        >
          <CIcon name="cil-chartPie" height="36"/>
        </CWidgetProgressIcon>
        <CWidgetProgressIcon
          header="5:34:11"
          text="Avg. Time"
          color="gradient-danger"
          progressSlot={
            <CProgress color="danger" size="xs" value={75} animated className="my-3"
          />}
        >
          <CIcon name="cil-speedometer" height="36"/>
        </CWidgetProgressIcon>
      </CCardGroup>
      <CCardGroup className="mb-4">
        <CWidgetProgressIcon
          header="87.500"
          text="Visitors"
          color="gradient-info"
          inverse
        >
          <CIcon name="cil-people" height="36"/>
        </CWidgetProgressIcon>
        <CWidgetProgressIcon
          header="385"
          text="New Clients"
          color="gradient-success"
          inverse
        >
          <CIcon name="cil-userFollow" height="36"/>
        </CWidgetProgressIcon>
        <CWidgetProgressIcon
          header="1238"
          text="Products sold"
          color="gradient-warning"
          inverse
        >
          <CIcon name="cil-basket" height="36"/>
        </CWidgetProgressIcon>
        <CWidgetProgressIcon
          header="28%"
          text="Returning Visitors"
          color="gradient-primary"
          inverse
        >
          <CIcon name="cil-chartPie" height="36"/>
        </CWidgetProgressIcon>
        <CWidgetProgressIcon
          header="5:34:11"
          text="Avg. Time"
          color="gradient-danger"
          inverse
        >
          <CIcon name="cil-speedometer" height="36"/>
        </CWidgetProgressIcon>
      </CCardGroup>
      <CRow>
        <CCol sm="6" md="2">
          <CWidgetProgressIcon
            header="87.500"
            text="Visitors"
            color="gradient-info"
          >
            <CIcon name="cil-people" height="36"/>
          </CWidgetProgressIcon>
        </CCol>
        <CCol sm="6" md="2">
          <CWidgetProgressIcon
            header="385"
            text="New Clients"
            color="gradient-success"
          >
            <CIcon name="cil-userFollow" height="36"/>
          </CWidgetProgressIcon>
        </CCol>
        <CCol sm="6" md="2">
          <CWidgetProgressIcon
            header="1238"
            text="Products sold"
            color="gradient-warning"
          >
            <CIcon name="cil-basket" height="36"/>
          </CWidgetProgressIcon>
        </CCol>
        <CCol sm="6" md="2">
          <CWidgetProgressIcon
            header="28%"
            text="Returning Visitors"
            color="gradient-primary"
          >
            <CIcon name="cil-chartPie" height="36"/>
          </CWidgetProgressIcon>
        </CCol>
        <CCol sm="6" md="2">
          <CWidgetProgressIcon
            header="5:34:11"
            text="Avg. Time"
            color="gradient-danger"
          >
            <CIcon name="cil-speedometer" height="36"/>
          </CWidgetProgressIcon>
        </CCol>
        <CCol sm="6" md="2">
          <CWidgetProgressIcon
            header="972"
            text="comments"
            color="gradient-info"
          >
            <CIcon name="cil-speech" height="36"/>
          </CWidgetProgressIcon>
        </CCol>
      </CRow>
      <CRow>
        <CCol sm="6" md="2">
          <CWidgetProgressIcon
            header="87.500"
            text="Visitors"
            color="gradient-info"
            inverse
          >
            <CIcon name="cil-people" height="36"/>
          </CWidgetProgressIcon>
        </CCol>
        <CCol sm="6" md="2">
          <CWidgetProgressIcon
            header="385"
            text="New Clients"
            color="gradient-success"
            inverse
          >
            <CIcon name="cil-userFollow" height="36"/>
          </CWidgetProgressIcon>
        </CCol>
        <CCol sm="6" md="2">
          <CWidgetProgressIcon
            header="1238"
            text="Products sold"
            color="gradient-warning"
            inverse
          >
            <CIcon name="cil-basket" height="36"/>
          </CWidgetProgressIcon>
        </CCol>
        <CCol sm="6" md="2">
          <CWidgetProgressIcon
            header="28%"
            text="Returning Visitors"
            color="gradient-primary"
            inverse
          >
            <CIcon name="cil-chartPie" height="36"/>
          </CWidgetProgressIcon>
        </CCol>
        <CCol sm="6" md="2">
          <CWidgetProgressIcon
            header="5:34:11"
            text="Avg. Time"
            color="gradient-danger"
            inverse
          >
            <CIcon name="cil-speedometer" height="36"/>
          </CWidgetProgressIcon>
        </CCol>
        <CCol sm="6" md="2">
          <CWidgetProgressIcon
            header="972"
            text="comments"
            color="gradient-info"
            inverse
          >
            <CIcon name="cil-speech" height="36"/>
          </CWidgetProgressIcon>
        </CCol>
      </CRow>
      <CRow>
        <CCol sm="4" lg="2">
          <CWidgetSimple header="title" text="1,123">
            <ChartLineSimple style={{ height: '40px' }} borderColor="danger"/>
          </CWidgetSimple>
        </CCol>
        <CCol sm="4" lg="2">
          <CWidgetSimple header="title" text="1,123">
            <ChartLineSimple style={{ height: '40px' }} borderColor="primary"/>
          </CWidgetSimple>
        </CCol>
        <CCol sm="4" lg="2">
          <CWidgetSimple header="title" text="1,123">
            <ChartLineSimple style={{ height: '40px' }} borderColor="success"/>
          </CWidgetSimple>
        </CCol>
        <CCol sm="4" lg="2">
          <CWidgetSimple header="title" text="1,123">
            <ChartBarSimple style={{ height: '40px' }} backgroundColor="danger"/>
          </CWidgetSimple>
        </CCol>
        <CCol sm="4" lg="2">
          <CWidgetSimple header="title" text="1,123">
            <ChartBarSimple style={{ height: '40px' }} backgroundColor="primary"/>
          </CWidgetSimple>
        </CCol>
        <CCol sm="4" lg="2">
          <CWidgetSimple header="title" text="1,123">
            <ChartBarSimple style={{ height: '40px' }} backgroundColor="success"/>
          </CWidgetSimple>
        </CCol>
      </CRow>
    </>
  )
}

export default Widgets

import React from 'react';
import PropTypes from 'prop-types';
import { CWidgetBrand, CRow, CCol } from '@coreui/react-ts';
import CIcon from '@coreui/icons-react';
import ChartLineSimple from '../charts/ChartLineSimple';

const WidgetsBrand = ({withCharts})=>{

  // render

  return withCharts ?
  <CRow>
    <CCol sm="6" lg="3">
      <CWidgetBrand
        className="mb-4"
        headerChildren={
          <>
            <CIcon
             name="cib-facebook"
             height="52"
             className="my-4 text-white"
            />
            <ChartLineSimple
              className="position-absolute w-100 h-100"
              backgroundColor="rgba(255,255,255,.1)"
              dataPoints={[65, 59, 84, 84, 51, 55, 40]}
              label="Friends"
              labels="months"
            />
          </>
        }
        values={[['89k', 'friends'], ['459', 'feeds']]}
        style={{
          "--cui-card-cap-bg": "#3b5998"
        }}
      />
    </CCol>

    <CCol sm="6" lg="3">
      <CWidgetBrand
        className="mb-4"
        headerChildren={
          <>
            <CIcon
              name="cib-twitter"
              height="52"
              className="my-4 text-white"
            />
            <ChartLineSimple
              className="position-absolute w-100 h-100"
              backgroundColor="rgba(255,255,255,.1)"
              dataPoints={[1, 13, 9, 17, 34, 41, 38]}
              label="Followers"
              labels="months"
            />
          </>
        }
        values={[['973k', 'followers'], ['1.792', 'tweets']]}
        style={{
          "--cui-card-cap-bg": "#00aced"
        }}
      />
    </CCol>

    <CCol sm="6" lg="3">
      <CWidgetBrand
        className="mb-4"
        headerChildren={
          <>
            <CIcon
              name="cib-linkedin"
              height="52"
              className="my-4 text-white"
            />
            <ChartLineSimple
              className="position-absolute w-100 h-100"
              backgroundColor="rgba(255,255,255,.1)"
              dataPoints={[78, 81, 80, 45, 34, 12, 40]}
              label="Contacts"
              labels="months"
            />
          </>
        }
        values={[['500+', 'contacts'], ['292', 'feeds']]}
        style={{
          "--cui-card-cap-bg": "#4875b4"
        }}
      />
    </CCol>

    <CCol sm="6" lg="3">
      <CWidgetBrand
        className="mb-4"
        color="warning"
        headerChildren={
          <>
            <CIcon
              name="cil-calendar"
              height="52"
              className="my-4 text-white"
            />
            <ChartLineSimple
              className="position-absolute w-100 h-100"
              backgroundColor="rgba(255,255,255,.1)"
              dataPoints={[35, 23, 56, 22, 97, 23, 64]}
              label="Followers"
              labels="months"
            />
          </>
        }
        values={[['12+', 'events'], ['4', 'meetings']]}
      />
    </CCol>
  </CRow> : <CRow>
    <CCol sm="6" lg="3">
      <CWidgetBrand
        className="mb-4"
        headerChildren={
          <CIcon
            name="cib-twitter"
            height="52"
            className="my-4 text-white"
          />
        }
        values={[['89k', 'friends'], ['459', 'feeds']]}
        style={{
          "--cui-card-cap-bg": "#3b5998"
        }}
      />
    </CCol>

    <CCol sm="6" lg="3">
      <CWidgetBrand
        className="mb-4"
        headerChildren={
          <CIcon
            name="cib-twitter"
            height="52"
            className="my-4 text-white"
          />
        }
        values={[['973k', 'followers'], ['1.792', 'tweets']]}
        style={{
          "--cui-card-cap-bg": "#00aced"
        }}
      />
    </CCol>

    <CCol sm="6" lg="3">
      <CWidgetBrand
        className="mb-4"
        headerChildren={
          <CIcon
            name="cib-linkedin"
            height="52"
            className="my-4 text-white"
          />
        }
        values={[['500+', 'contacts'], ['292', 'feeds']]}
        style={{
          "--cui-card-cap-bg": "#4875b4"
        }}
      />
    </CCol>

    <CCol sm="6" lg="3">
      <CWidgetBrand
        className="mb-4"
        color="warning"
        headerChildren={
          <CIcon
            name="cil-calendar"
            height="52"
            className="my-4 text-white"
          />
        }
        values={[['12+', 'events'], ['4', 'meetings']]}
      />
    </CCol>
  </CRow>
}

WidgetsBrand.propTypes = {
  withCharts: PropTypes.bool
}

export default WidgetsBrand

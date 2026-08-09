import React from 'react'
import PropTypes from 'prop-types'
import { CWidgetStatsD, CRow, CCol } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cibFacebook, cibLinkedin, cibYoutube } from '@coreui/icons'

const DashboardBrand = (props) => {
  return (
    <CRow className={props.className} xs={{ gutter: 4 }}>
      <CCol sm={6} lg={4}>
        <CWidgetStatsD
          icon={<CIcon icon={cibFacebook} height={52} className="my-4 text-white" />}
          values={[
            { title: 'friends', value: '89k' },
            { title: 'feeds', value: '459' },
          ]}
          style={{
            '--cui-card-cap-bg': '#3b5998',
          }}
        />
      </CCol>
      <CCol sm={6} lg={4}>
        <CWidgetStatsD
          icon={<CIcon icon={cibYoutube} height={52} className="my-4 text-white" />}
          values={[
            { title: 'subscribers', value: '973k' },
            { title: 'new comments', value: '1.792' },
          ]}
          style={{
            '--cui-card-cap-bg': '#ff0132',
          }}
        />
      </CCol>
      <CCol sm={6} lg={4}>
        <CWidgetStatsD
          icon={<CIcon icon={cibLinkedin} height={52} className="my-4 text-white" />}
          values={[
            { title: 'contacts', value: '500+' },
            { title: 'feeds', value: '292' },
          ]}
          style={{
            '--cui-card-cap-bg': '#4875b4',
          }}
        />
      </CCol>
    </CRow>
  )
}

DashboardBrand.propTypes = {
  className: PropTypes.string,
}

export default DashboardBrand

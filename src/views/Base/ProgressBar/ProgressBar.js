import React from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CProgress,
  CProgressBar
} from '@coreui/react'

const ProgressBar = () => {
  return (
    <>
      <CCard>
        <CCardHeader>
          Progress
          <div className="card-header-actions">
            <a href="https://coreui.github.io/components/progress/" rel="noreferrer noopener" target="_blank" className="card-header-action">
              <small className="text-muted">docs</small>
            </a>
          </div>
        </CCardHeader>
        <CCardBody>
          <CProgress className="mb-3" />
          <CProgress value={25} className="mb-3" />
          <CProgress value={50} className="mb-3" />
          <CProgress value={75} className="mb-3" />
          <CProgress value={100} className="mb-3" />
        </CCardBody>
      </CCard>
      <CCard>
        <CCardHeader>
          Progress
          <small> labels</small>
        </CCardHeader>
        <CCardBody>
          <CProgress value={25.3746472} showPercentage precision={2} className="mb-3"/>
          <CProgress value={50.45} showValue className="mb-3"/>
          <CProgress value={15} max={20} showPercentage className="mb-3"/>
        </CCardBody>
      </CCard>
      <CCard>
        <CCardHeader>
          Progress
          <small> heights</small>
        </CCardHeader>
        <CCardBody>
          <CProgress value={25} className="mb-3" style={{height: "3px"}}/>
          <CProgress value={25} className="mb-3" style={{height: "30px"}}/>
        </CCardBody>
      </CCard>
      <CCard>
        <CCardHeader>
          Progress
          <small> backgrounds</small>
        </CCardHeader>
        <CCardBody>
          <CProgress color="success" value="25" className="mb-3" />
          <CProgress color="info" value={50} className="mb-3" />
          <CProgress color="warning" value={75} className="mb-3" />
          <CProgress color="danger" value="100" className="mb-3" />
        </CCardBody>
      </CCard>
      <CCard>
        <CCardHeader>
          Progress
          <small> multiple bar</small>
        </CCardHeader>
        <CCardBody>
          <CProgress size="xs">
            <CProgressBar value={10}/>
            <CProgressBar color="success" value={30}/>
            <CProgressBar color="danger" value={20}/>
          </CProgress>
        </CCardBody>
      </CCard>
      <CCard>
        <CCardHeader>
          Progress
          <small> striped</small>
        </CCardHeader>
        <CCardBody>
          <CProgress striped value={2 * 5} className="mb-3" />
          <CProgress striped color="success" value={25} className="mb-3" />
          <CProgress striped color="info" value={50} className="mb-3" />
          <CProgress striped color="warning" value={75} className="mb-3" />
          <CProgress striped color="danger" value={100} className="mb-3" />
        </CCardBody>
      </CCard>
      <CCard>
        <CCardHeader>
          Progress
          <small> animated</small>
        </CCardHeader>
        <CCardBody>
          <CProgress animated value={75} className="mb-3" />
        </CCardBody>
      </CCard>
    </>
  )
}

export default ProgressBar

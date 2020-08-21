import React, { Component,useRef, Fragment } from 'react'
import Stores from '../../../utils/stores/storelist.js'
import { useDrag, UseDrop } from 'react-dnd'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import './createstore.css'
import { ItemTypes } from '../../../utils/items/items.js'
import {
    CContainer,
    CBadge,
    CCard,
    CCardBody,
    CCardFooter,
    CCardHeader,
    CCol,
    CRow,
    CCollapse,
    CFade,
    CSwitch,
    CLink
  } from  '@coreui/react'
  import CIcon from '@coreui/icons-react'



const StoreContainer = () => {
    const [{ isDragging }, drag] = useDrag({
        item: {
            type:ItemTypes.CARD
        },
        collect: monitor({
            isDragging: !!monitor.isDragging()
        })
    })

return (
    <div
    className="store-div"
    ref={drag}
    opacity={isDragging? '0.5':'1'}
    >

<CContainer fluid>
    <CRow>
    <CCol xs="12" sm="6" md="4">
          <CCard color="gradient-secondary">
            <CCardHeader>
              Card title - gradient
              <CBadge color="info" className="mfs-auto">42</CBadge>
            </CCardHeader>
            <CCardBody>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
              laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
              ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs="12" sm="6" md="4">
          <CFade in={showCard}>
            <CCard>
              <CCardHeader>
                Card actions
                <div className="card-header-actions">
                  <CLink className="card-header-action">
                    <CIcon name="cil-settings" />
                  </CLink>
                  <CLink className="card-header-action" onClick={() => setCollapsed(!collapsed)}>
                    <CIcon name={collapsed ? 'cil-chevron-bottom':'cil-chevron-top'} />
                  </CLink>
                  <CLink className="card-header-action" onClick={() => setShowCard(false)}>
                    <CIcon name="cil-x-circle" />
                  </CLink>
                </div>
              </CCardHeader>
              <CCollapse show={collapsed}>
                <CCardBody>
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
                  laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
                  ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
                </CCardBody>
              </CCollapse>
            </CCard>
          </CFade>
        </CCol>
    </CRow>
    </CContainer>
    </div>
)

}
export default StoreContainer

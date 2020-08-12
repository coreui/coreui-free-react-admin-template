import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CCollapse,
  CFade,
  CRow 
} from '@coreui/react';
import { DocsLink } from 'src/reusable'

const Collapses = () => {

  const [collapse, setCollapse] = useState(false)
  const [collapseMulti, setCollapseMulti] = useState([false, false])
  const [accordion, setAccordion] = useState(1)
  const [fade, setFade] = useState(true)

  const toggle = (e) => {
    setCollapse(!collapse)
    e.preventDefault()
  }

  const toggleMulti = (type) => {
    let newCollapse = collapseMulti.slice()
    switch (type) {
      case "left":
        newCollapse[0] = !collapseMulti[0];
        break;
      case "right":
        newCollapse[1] = !collapseMulti[1];
        break;
      case "both":
        newCollapse[0] = !collapseMulti[0];
        newCollapse[1] = !collapseMulti[1];
        break;
      default:
    }
    setCollapseMulti(newCollapse)
  }

  const toggleFade = () => {
    setFade(!fade)
  }

  return (
    <CRow>
      <CCol xl="6">
        <CCard>
          <CCardHeader>
            Collapse
            <DocsLink name="CCollapse"/>
          </CCardHeader>
          <CCollapse show={collapse}>
            <CCardBody>
              <p>
                Anim pariatur cliche reprehenderit,
                enim eiusmod high life accusamus terry richardson ad squid. Nihil
                anim keffiyeh helvetica, craft beer labore wes anderson cred
                nesciunt sapiente ea proident.
              </p>
              <p>
                Donec molestie odio id nisi malesuada, mattis tincidunt velit egestas. Sed non pulvinar risus. Aenean
                elementum eleifend nunc, pellentesque dapibus arcu hendrerit fringilla. Aliquam in nibh massa. Cras
                ultricies lorem non enim volutpat, a eleifend urna placerat. Fusce id luctus urna. In sed leo tellus.
                Mauris tristique leo a nisl feugiat, eget vehicula leo venenatis. Quisque magna metus, luctus quis
                sollicitudin vel, vehicula nec ipsum. Donec rutrum commodo lacus ut condimentum. Integer vel turpis
                purus. Etiam vehicula, nulla non fringilla blandit, massa purus faucibus tellus, a luctus enim orci non
                augue. Aenean ullamcorper nisl urna, non feugiat tortor volutpat in. Vivamus lobortis massa dolor, eget
                faucibus ipsum varius eget. Pellentesque imperdiet, turpis sed sagittis lobortis, leo elit laoreet arcu,
                vehicula sagittis elit leo id nisi.
              </p>
            </CCardBody>
          </CCollapse>
          <CCardFooter>
            <CButton
              color="primary"
              onClick={toggle}
              className={'mb-1'}
            >Toggling button</CButton>
          </CCardFooter>
        </CCard>

        <CCard>
          <CCardHeader>
            Collapse
            <small> multi target</small>
          </CCardHeader>
            <CCardBody>
              <p>
                <CButton color="primary" onClick={()=>{toggleMulti('left')}}>
                  Left</CButton>{' '}
                <CButton color="primary" onClick={()=>{toggleMulti('right')}}>
                  Right</CButton>{' '}
                <CButton color="primary" onClick={()=>{toggleMulti('both')}}>
                  Both</CButton>{' '}
              </p>
              <CRow>
                <CCol>
                  <CCollapse show={collapseMulti[0]}>
                    <CCard>
                      <CCardBody>
                        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid.Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
                      </CCardBody>
                    </CCard>
                  </CCollapse>
                </CCol>
                <CCol className="col-sm-12 col-md-6">
                  <CCollapse show={collapseMulti[1]}>
                    <CCard>
                      <CCardBody>
                        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid.Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
                      </CCardBody>
                    </CCard>
                  </CCollapse>
                </CCol>
              </CRow>
            </CCardBody>
        </CCard>

        <hr/>

        <CCard>
          <CCardHeader>
            Fade
            <DocsLink name="CFade"/>
          </CCardHeader>
          <CCardBody>
            <CFade timeout={300} in={fade} tag="h5" className="mt-3">
              This content will fade in and out as the button is pressed...
            </CFade>
          </CCardBody>
          <CCardFooter>
            <CButton color="primary" onClick={toggleFade}>Toggle Fade</CButton>
          </CCardFooter>
        </CCard>
      </CCol>
      <CCol xl="6">
        <CCard>
          <CCardHeader>
            Collapse
            <small> accordion</small>
          </CCardHeader>
          <CCardBody>
            <div id="accordion">
              <CCard className="mb-0">
                <CCardHeader id="headingOne">
                  <CButton 
                    block 
                    color="link" 
                    className="text-left m-0 p-0" 
                    onClick={() => setAccordion(accordion === 0 ? null : 0)}
                  >
                    <h5 className="m-0 p-0">Collapsible Group Item #1</h5>
                  </CButton>
                </CCardHeader>
                <CCollapse show={accordion === 0}>
                  <CCardBody>
                    1. Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non
                    cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird
                    on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred
                    nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft
                    beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven''t heard of them accusamus labore sustainable VHS.
                  </CCardBody>
                </CCollapse>
              </CCard>
              <CCard className="mb-0">
                <CCardHeader id="headingTwo">
                  <CButton 
                    block 
                    color="link" 
                    className="text-left m-0 p-0" 
                    onClick={() => setAccordion(accordion === 1 ? null : 1)}
                  >
                    <h5 className="m-0 p-0">Collapsible Group Item #2</h5>
                  </CButton>
                </CCardHeader>
                <CCollapse show={accordion === 1}>
                  <CCardBody>
                    2. Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non
                    cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird
                    on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred
                    nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft
                    beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven''t heard of them accusamus labore sustainable VHS.
                  </CCardBody>
                </CCollapse>
              </CCard>
              <CCard className="mb-0">
                <CCardHeader id="headingThree">
                  <CButton 
                    block 
                    color="link" 
                    className="text-left m-0 p-0" 
                    onClick={() => setAccordion(accordion === 2 ? null : 2)}
                  >
                    <h5 className="m-0 p-0">Collapsible Group Item #3</h5>
                  </CButton>
                </CCardHeader>
                <CCollapse show={accordion === 2}>
                  <CCardBody>
                    3. Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non
                    cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird
                    on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred
                    nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft
                    beer farm-to-table, raw denim aesthetic synth nesciunt you probably havent heard of them accusamus labore sustainable VHS.
                  </CCardBody>
                </CCollapse>
              </CCard>
            </div>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Collapses

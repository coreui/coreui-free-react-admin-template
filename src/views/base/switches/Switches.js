import React from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CSwitch
} from '@coreui/react'
import { DocsLink } from 'src/reusable'

const Switches = () => {
  return (
    <CRow>
      <CCol xs="12" md="12">
        <CCard>
          <CCardHeader>
            3d Switch
            <DocsLink name="CSwitch"/>
          </CCardHeader>
          <CCardBody>
            <CSwitch className={'mx-1'} variant={'3d'} color={'primary'} defaultChecked onChange={(e)=>console.log(e.target.checked)}/>
            <CSwitch className={'mx-1'} variant={'3d'} color={'secondary'} defaultChecked />
            <CSwitch className={'mx-1'} variant={'3d'} color={'success'} defaultChecked />
            <CSwitch className={'mx-1'} variant={'3d'} color={'warning'} defaultChecked />
            <CSwitch className={'mx-1'} variant={'3d'} color={'info'} defaultChecked />
            <CSwitch className={'mx-1'} variant={'3d'} color={'danger'} defaultChecked />
            <CSwitch className={'mx-1'} variant={'3d'} color={'light'} defaultChecked />
            <CSwitch className={'mx-1'} variant={'3d'} color={'dark'} defaultChecked />
            <CSwitch className={'mx-1'} variant={'3d'} color={'primary'}  />
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs="12" md="6">
        <CCard>
          <CCardHeader>
            Switch default
          </CCardHeader>
          <CCardBody>
            <CSwitch className={'mx-1'} color={'primary'} defaultChecked />
            <CSwitch className={'mx-1'} color={'secondary'} defaultChecked />
            <CSwitch className={'mx-1'} color={'success'} defaultChecked />
            <CSwitch className={'mx-1'} color={'warning'} defaultChecked />
            <CSwitch className={'mx-1'} color={'info'} defaultChecked />
            <CSwitch className={'mx-1'} color={'danger'} defaultChecked />
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs="12" md="6">
        <CCard>
          <CCardHeader>
            Switch default - pills
          </CCardHeader>
          <CCardBody>
            <CSwitch className={'mx-1'} shape={'pill'} color={'primary'} defaultChecked />
            <CSwitch className={'mx-1'} shape={'pill'} color={'secondary'} defaultChecked />
            <CSwitch className={'mx-1'} shape={'pill'} color={'success'} defaultChecked />
            <CSwitch className={'mx-1'} shape={'pill'} color={'warning'} defaultChecked />
            <CSwitch className={'mx-1'} shape={'pill'} color={'info'} defaultChecked />
            <CSwitch className={'mx-1'} shape={'pill'} color={'danger'} defaultChecked />
          </CCardBody>
        </CCard>
      </CCol>

      <CCol md="12">
        <h4>Outline</h4>
      </CCol>

      <CCol xs="12" md="6">
        <CCard>
          <CCardHeader>
            Switch outline

          </CCardHeader>
          <CCardBody>
            <CSwitch className={'mx-1'} color={'primary'} variant="outline" defaultChecked />
            <CSwitch className={'mx-1'} color={'secondary'} variant="outline" defaultChecked />
            <CSwitch className={'mx-1'} color={'success'} variant="outline" defaultChecked />
            <CSwitch className={'mx-1'} color={'warning'} variant="outline" defaultChecked />
            <CSwitch className={'mx-1'} color={'info'} variant="outline" defaultChecked />
            <CSwitch className={'mx-1'} color={'danger'} variant="outline" defaultChecked />
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs="12" md="6">
        <CCard>
          <CCardHeader>
            Switch outline pills

          </CCardHeader>
          <CCardBody>
            <CSwitch className={'mx-1'} shape={'pill'} color={'primary'} variant="outline" defaultChecked />
            <CSwitch className={'mx-1'} shape={'pill'} color={'secondary'} variant="outline" defaultChecked />
            <CSwitch className={'mx-1'} shape={'pill'} color={'success'} variant="outline" defaultChecked />
            <CSwitch className={'mx-1'} shape={'pill'} color={'warning'} variant="outline" defaultChecked />
            <CSwitch className={'mx-1'} shape={'pill'} color={'info'} variant="outline" defaultChecked />
            <CSwitch className={'mx-1'} shape={'pill'} color={'danger'} variant="outline" defaultChecked />
          </CCardBody>
        </CCard>
      </CCol>

      <CCol md="12">
        <h4>Opposite</h4>
      </CCol>

      <CCol xs="12" md="6">
        <CCard>
          <CCardHeader>
            Switch outline alternative

          </CCardHeader>
          <CCardBody>
            <CSwitch className={'mx-1'} color={'primary'} variant="opposite" defaultChecked />
            <CSwitch className={'mx-1'} color={'secondary'} variant="opposite" defaultChecked />
            <CSwitch className={'mx-1'} color={'success'} variant="opposite" defaultChecked />
            <CSwitch className={'mx-1'} color={'warning'} variant="opposite" defaultChecked />
            <CSwitch className={'mx-1'} color={'info'} variant="opposite" defaultChecked />
            <CSwitch className={'mx-1'} color={'danger'} variant="opposite" defaultChecked />
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs="12" md="6">
        <CCard>
          <CCardHeader>
            Switch outline alternative - pills

          </CCardHeader>
          <CCardBody>
            <CSwitch className={'mx-1'} shape={'pill'} color={'primary'} variant={'opposite'} defaultChecked />
            <CSwitch className={'mx-1'} shape={'pill'} color={'secondary'} variant={'opposite'} defaultChecked />
            <CSwitch className={'mx-1'} shape={'pill'} color={'success'} variant={'opposite'} defaultChecked />
            <CSwitch className={'mx-1'} shape={'pill'} color={'warning'} variant={'opposite'} defaultChecked />
            <CSwitch className={'mx-1'} shape={'pill'} color={'info'} variant={'opposite'} defaultChecked />
            <CSwitch className={'mx-1'} shape={'pill'} color={'danger'} variant={'opposite'} defaultChecked />
          </CCardBody>
        </CCard>
      </CCol>

      <CCol md="12">
        <h4>With text</h4>
      </CCol>

      <CCol xs="12" md="6">
        <CCard>
          <CCardHeader>
            Switch with text

          </CCardHeader>
          <CCardBody>
            <CSwitch className={'mx-1'} color={'primary'} labelOn={'\u2713'} labelOff={'\u2715'} defaultChecked />
            <CSwitch className={'mx-1'} color={'secondary'} labelOn={'\u2713'} labelOff={'\u2715'} defaultChecked />
            <CSwitch className={'mx-1'} color={'success'} labelOn={'\u2713'} labelOff={'\u2715'} defaultChecked />
            <CSwitch className={'mx-1'} color={'warning'} labelOn={'\u2713'} labelOff={'\u2715'} defaultChecked />
            <CSwitch className={'mx-1'} color={'info'} labelOn={'\u2713'} labelOff={'\u2715'} defaultChecked />
            <CSwitch className={'mx-1'} color={'danger'} labelOn={'\u2713'} labelOff={'\u2715'} defaultChecked />
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs="12" md="6">
        <CCard>
          <CCardHeader>
            Switch with text pills

          </CCardHeader>
          <CCardBody>
            <CSwitch className={'mx-1'} shape={'pill'} color={'primary'} labelOn={'\u2713'} labelOff={'\u2715'} defaultChecked />
            <CSwitch className={'mx-1'} shape={'pill'} color={'secondary'} labelOn={'\u2713'} labelOff={'\u2715'} defaultChecked />
            <CSwitch className={'mx-1'} shape={'pill'} color={'success'} labelOn={'\u2713'} labelOff={'\u2715'} defaultChecked />
            <CSwitch className={'mx-1'} shape={'pill'} color={'warning'} labelOn={'\u2713'} labelOff={'\u2715'} defaultChecked />
            <CSwitch className={'mx-1'} shape={'pill'} color={'info'} labelOn={'\u2713'} labelOff={'\u2715'} defaultChecked />
            <CSwitch className={'mx-1'} shape={'pill'} color={'danger'} labelOn={'\u2713'} labelOff={'\u2715'} defaultChecked />
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs="12" md="6">
        <CCard>
          <CCardHeader>
            Switch with text outline

          </CCardHeader>
          <CCardBody>
            <CSwitch className={'mx-1'} color={'primary'} variant="outline" labelOn={'\u2713'} labelOff={'\u2715'} defaultChecked />
            <CSwitch className={'mx-1'} color={'secondary'} variant="outline" labelOn={'\u2713'} labelOff={'\u2715'} defaultChecked />
            <CSwitch className={'mx-1'} color={'success'} variant="outline" labelOn={'\u2713'} labelOff={'\u2715'} defaultChecked />
            <CSwitch className={'mx-1'} color={'warning'} variant="outline" labelOn={'\u2713'} labelOff={'\u2715'} defaultChecked />
            <CSwitch className={'mx-1'} color={'info'} variant="outline" labelOn={'\u2713'} labelOff={'\u2715'} defaultChecked />
            <CSwitch className={'mx-1'} color={'danger'} variant="outline" labelOn={'\u2713'} labelOff={'\u2715'} defaultChecked />
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs="12" md="6">
        <CCard>
          <CCardHeader>
            Switch with text outline pills

          </CCardHeader>
          <CCardBody>
            <CSwitch className={'mx-1'} shape={'pill'} color={'primary'} variant="outline" labelOn={'\u2713'} labelOff={'\u2715'} defaultChecked />
            <CSwitch className={'mx-1'} shape={'pill'} color={'secondary'} variant="outline" labelOn={'\u2713'} labelOff={'\u2715'} defaultChecked />
            <CSwitch className={'mx-1'} shape={'pill'} color={'success'} variant="outline" labelOn={'\u2713'} labelOff={'\u2715'} defaultChecked />
            <CSwitch className={'mx-1'} shape={'pill'} color={'warning'} variant="outline" labelOn={'\u2713'} labelOff={'\u2715'} defaultChecked />
            <CSwitch className={'mx-1'} shape={'pill'} color={'info'} variant="outline" labelOn={'\u2713'} labelOff={'\u2715'} defaultChecked />
            <CSwitch className={'mx-1'} shape={'pill'} color={'danger'} variant="outline" labelOn={'\u2713'} labelOff={'\u2715'} defaultChecked />
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs="12" md="6">
        <CCard>
          <CCardHeader>
            Switch with text outline alternative

          </CCardHeader>
          <CCardBody>
            <CSwitch className={'mx-1'} color={'primary'} variant={'opposite'} labelOn={'\u2713'} labelOff={'\u2715'} defaultChecked />
            <CSwitch className={'mx-1'} color={'secondary'} variant={'opposite'} labelOn={'\u2713'} labelOff={'\u2715'} defaultChecked />
            <CSwitch className={'mx-1'} color={'success'} variant={'opposite'} labelOn={'\u2713'} labelOff={'\u2715'} defaultChecked />
            <CSwitch className={'mx-1'} color={'warning'} variant={'opposite'} labelOn={'\u2713'} labelOff={'\u2715'} defaultChecked />
            <CSwitch className={'mx-1'} color={'info'} variant={'opposite'} labelOn={'\u2713'} labelOff={'\u2715'} defaultChecked />
            <CSwitch className={'mx-1'} color={'danger'} variant={'opposite'} labelOn={'\u2713'} labelOff={'\u2715'} defaultChecked />
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs="12" md="6">
        <CCard>
          <CCardHeader>
            Switch with text outline alternative pills

          </CCardHeader>
          <CCardBody>
            <CSwitch className={'mx-1'} shape={'pill'} color={'primary'} variant={'opposite'} labelOn={'\u2713'} labelOff={'\u2715'} defaultChecked />
            <CSwitch className={'mx-1'} shape={'pill'} color={'secondary'} variant={'opposite'} labelOn={'\u2713'} labelOff={'\u2715'} defaultChecked />
            <CSwitch className={'mx-1'} shape={'pill'} color={'success'} variant={'opposite'} labelOn={'\u2713'} labelOff={'\u2715'} defaultChecked />
            <CSwitch className={'mx-1'} shape={'pill'} color={'warning'} variant={'opposite'} labelOn={'\u2713'} labelOff={'\u2715'} defaultChecked />
            <CSwitch className={'mx-1'} shape={'pill'} color={'info'} variant={'opposite'} labelOn={'\u2713'} labelOff={'\u2715'} defaultChecked />
            <CSwitch className={'mx-1'} shape={'pill'} color={'danger'} variant={'opposite'} labelOn={'\u2713'} labelOff={'\u2715'} defaultChecked />
          </CCardBody>
        </CCard>
      </CCol>

      <CCol md="12">
        <h4>With icon</h4>
      </CCol>

      <CCol xs="12" md="6">
        <CCard>
          <CCardHeader>
            Switch with text

          </CCardHeader>
          <CCardBody>
            <CSwitch className={'mx-1'} color={'primary'} labelOn={'\u2713'} labelOff={'\u2715'} defaultChecked />
            <CSwitch className={'mx-1'} color={'secondary'} labelOn={'\u2713'} labelOff={'\u2715'} defaultChecked />
            <CSwitch className={'mx-1'} color={'success'} labelOn={'\u2713'} labelOff={'\u2715'} defaultChecked />
            <CSwitch className={'mx-1'} color={'warning'} labelOn={'\u2713'} labelOff={'\u2715'} defaultChecked />
            <CSwitch className={'mx-1'} color={'info'} labelOn={'\u2713'} labelOff={'\u2715'} defaultChecked />
            <CSwitch className={'mx-1'} color={'danger'} labelOn={'\u2713'} labelOff={'\u2715'} defaultChecked />
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs="12" md="6">
        <CCard>
          <CCardHeader>
            Switch with text pills

          </CCardHeader>
          <CCardBody>
            <CSwitch className={'mx-1'} shape={'pill'} color={'primary'} labelOn={'\u2713'} labelOff={'\u2715'} defaultChecked />
            <CSwitch className={'mx-1'} shape={'pill'} color={'secondary'} labelOn={'\u2713'} labelOff={'\u2715'} defaultChecked />
            <CSwitch className={'mx-1'} shape={'pill'} color={'success'} labelOn={'\u2713'} labelOff={'\u2715'} defaultChecked />
            <CSwitch className={'mx-1'} shape={'pill'} color={'warning'} labelOn={'\u2713'} labelOff={'\u2715'} defaultChecked />
            <CSwitch className={'mx-1'} shape={'pill'} color={'info'} labelOn={'\u2713'} labelOff={'\u2715'} defaultChecked />
            <CSwitch className={'mx-1'} shape={'pill'} color={'danger'} labelOn={'\u2713'} labelOff={'\u2715'} defaultChecked />
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs="12" md="6">
        <CCard>
          <CCardHeader>
            Switch with text outline

          </CCardHeader>
          <CCardBody>
            <CSwitch className={'mx-1'} color={'primary'} variant="outline" labelOn={'\u2713'} labelOff={'\u2715'} defaultChecked />
            <CSwitch className={'mx-1'} color={'secondary'} variant="outline" labelOn={'\u2713'} labelOff={'\u2715'} defaultChecked />
            <CSwitch className={'mx-1'} color={'success'} variant="outline" labelOn={'\u2713'} labelOff={'\u2715'} defaultChecked />
            <CSwitch className={'mx-1'} color={'warning'} variant="outline" labelOn={'\u2713'} labelOff={'\u2715'} defaultChecked />
            <CSwitch className={'mx-1'} color={'info'} variant="outline" labelOn={'\u2713'} labelOff={'\u2715'} defaultChecked />
            <CSwitch className={'mx-1'} color={'danger'} variant="outline" labelOn={'\u2713'} labelOff={'\u2715'} defaultChecked />
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs="12" md="6">
        <CCard>
          <CCardHeader>
            Switch with text outline pills

          </CCardHeader>
          <CCardBody>
            <CSwitch className={'mx-1'} shape={'pill'} color={'primary'} variant="outline" labelOn={'\u2713'} labelOff={'\u2715'} defaultChecked />
            <CSwitch className={'mx-1'} shape={'pill'} color={'secondary'} variant="outline" labelOn={'\u2713'} labelOff={'\u2715'} defaultChecked />
            <CSwitch className={'mx-1'} shape={'pill'} color={'success'} variant="outline" labelOn={'\u2713'} labelOff={'\u2715'} defaultChecked />
            <CSwitch className={'mx-1'} shape={'pill'} color={'warning'} variant="outline" labelOn={'\u2713'} labelOff={'\u2715'} defaultChecked />
            <CSwitch className={'mx-1'} shape={'pill'} color={'info'} variant="outline" labelOn={'\u2713'} labelOff={'\u2715'} defaultChecked />
            <CSwitch className={'mx-1'} shape={'pill'} color={'danger'} variant="outline" labelOn={'\u2713'} labelOff={'\u2715'} defaultChecked />
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs="12" md="6">
        <CCard>
          <CCardHeader>
            Switch with text outline alternative

          </CCardHeader>
          <CCardBody>
            <CSwitch className={'mx-1'} color={'primary'} variant={'opposite'} labelOn={'\u2713'} labelOff={'\u2715'} defaultChecked />
            <CSwitch className={'mx-1'} color={'secondary'} variant={'opposite'} labelOn={'\u2713'} labelOff={'\u2715'} defaultChecked />
            <CSwitch className={'mx-1'} color={'success'} variant={'opposite'} labelOn={'\u2713'} labelOff={'\u2715'} defaultChecked />
            <CSwitch className={'mx-1'} color={'warning'} variant={'opposite'} labelOn={'\u2713'} labelOff={'\u2715'} defaultChecked />
            <CSwitch className={'mx-1'} color={'info'} variant={'opposite'} labelOn={'\u2713'} labelOff={'\u2715'} defaultChecked />
            <CSwitch className={'mx-1'} color={'danger'} variant={'opposite'} labelOn={'\u2713'} labelOff={'\u2715'} defaultChecked />
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs="12" md="6">
        <CCard>
          <CCardHeader>
            Switch with text outline alternative pills

          </CCardHeader>
          <CCardBody>
            <CSwitch className={'mx-1'} shape={'pill'} color={'primary'} variant={'opposite'} labelOn={'\u2713'} labelOff={'\u2715'} defaultChecked />
            <CSwitch className={'mx-1'} shape={'pill'} color={'secondary'} variant={'opposite'} labelOn={'\u2713'} labelOff={'\u2715'} defaultChecked />
            <CSwitch className={'mx-1'} shape={'pill'} color={'success'} variant={'opposite'} labelOn={'\u2713'} labelOff={'\u2715'} defaultChecked />
            <CSwitch className={'mx-1'} shape={'pill'} color={'warning'} variant={'opposite'} labelOn={'\u2713'} labelOff={'\u2715'} defaultChecked />
            <CSwitch className={'mx-1'} shape={'pill'} color={'info'} variant={'opposite'} labelOn={'\u2713'} labelOff={'\u2715'} defaultChecked />
            <CSwitch className={'mx-1'} shape={'pill'} color={'danger'} variant={'opposite'} labelOn={'\u2713'} labelOff={'\u2715'} defaultChecked />
          </CCardBody>
        </CCard>
      </CCol>

      <CCol md="12">
        <h4>Disabled</h4>
      </CCol>

      <CCol xs="12" md="6">
        <CCard>
          <CCardHeader>
            3d Switch
          </CCardHeader>
          <CCardBody>
            <CSwitch className={'mx-1'} variant={'3d'} color={'primary'} defaultChecked disabled />
            <CSwitch className={'mx-1'} variant={'3d'} color={'secondary'} defaultChecked disabled />
            <CSwitch className={'mx-1'} variant={'3d'} color={'success'} defaultChecked disabled />
            <CSwitch className={'mx-1'} variant={'3d'} color={'warning'} defaultChecked disabled />
            <CSwitch className={'mx-1'} variant={'3d'} color={'info'} defaultChecked disabled />
            <CSwitch className={'mx-1'} variant={'3d'} color={'danger'} defaultChecked disabled />
            <CSwitch className={'mx-1'} variant={'3d'} color={'light'} defaultChecked disabled />
            <CSwitch className={'mx-1'} variant={'3d'} color={'dark'} defaultChecked disabled />
            <CSwitch className={'mx-1'} variant={'3d'} color={'primary'} disabled />
          </CCardBody>
        </CCard>
      </CCol>

      <CCol xs="12" md="6">
        <CCard>
          <CCardHeader>
            3d Switch
          </CCardHeader>
          <CCardBody>
            <CSwitch className={'mx-1'} color={'primary'} defaultChecked variant="opposite" />
            <CSwitch className={'mx-1'} color={'secondary'} defaultChecked variant="opposite" />
            <CSwitch className={'mx-1'} color={'success'} defaultChecked variant="opposite" />
            <CSwitch className={'mx-1'} color={'warning'} defaultChecked variant="opposite" />
            <CSwitch className={'mx-1'} color={'info'} defaultChecked variant="opposite" />
            <CSwitch className={'mx-1'} color={'danger'} defaultChecked variant="opposite" />
            <CSwitch className={'mx-1'} color={'light'} defaultChecked variant="opposite" />
            <CSwitch className={'mx-1'} color={'dark'} defaultChecked variant="opposite" />
            <CSwitch className={'mx-1'} color={'primary'} variant="opposite" disabled />
          </CCardBody>
        </CCard>
      </CCol>

      <CCol md="12">
        <h4>3D</h4>
      </CCol>

      <CCol xs="12" md="6">
        <CCard>
          <CCardHeader>
            3d Switch
          </CCardHeader>
          <CCardBody>
            <CSwitch className={'mx-1'} variant={'3d'} color={'primary'} defaultChecked />
            <CSwitch className={'mx-1'} variant={'3d'} color={'secondary'} defaultChecked />
            <CSwitch className={'mx-1'} variant={'3d'} color={'success'} defaultChecked />
            <CSwitch className={'mx-1'} variant={'3d'} color={'warning'} defaultChecked />
            <CSwitch className={'mx-1'} variant={'3d'} color={'info'} defaultChecked />
            <CSwitch className={'mx-1'} variant={'3d'} color={'danger'} defaultChecked />
            <CSwitch className={'mx-1'} variant={'3d'} color={'light'} defaultChecked />
            <CSwitch className={'mx-1'} variant={'3d'} color={'dark'} defaultChecked />
            <CSwitch className={'mx-1'} variant={'3d'} color={'primary'} />
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs="12" md="6">
        <CCard>
          <CCardHeader>
            3d Switch
          </CCardHeader>
          <CCardBody>
            <CSwitch className={'mx-1'} variant={'3d'} color={'primary'} defaultChecked labelOn={'\u2713'} labelOff={'\u2715'} />
            <CSwitch className={'mx-1'} variant={'3d'} color={'secondary'} defaultChecked labelOn={'\u2713'} labelOff={'\u2715'}/>
            <CSwitch className={'mx-1'} variant={'3d'} color={'success'} defaultChecked labelOn={'\u2713'} labelOff={'\u2715'}/>
            <CSwitch className={'mx-1'} variant={'3d'} color={'warning'} defaultChecked labelOn={'\u2713'} labelOff={'\u2715'}/>
            <CSwitch className={'mx-1'} variant={'3d'} color={'info'} defaultChecked labelOn={'\u2713'} labelOff={'\u2715'}/>
            <CSwitch className={'mx-1'} variant={'3d'} color={'danger'} defaultChecked labelOn={'\u2713'} labelOff={'\u2715'}/>
            <CSwitch className={'mx-1'} variant={'3d'} color={'light'} defaultChecked labelOn={'\u2713'} labelOff={'\u2715'}/>
            <CSwitch className={'mx-1'} variant={'3d'} color={'dark'} defaultChecked labelOn={'\u2713'} labelOff={'\u2715'}/>
            <CSwitch className={'mx-1'} variant={'3d'} color={'primary'} labelOn={'\u2713'} labelOff={'\u2715'}/>
          </CCardBody>
        </CCard>
      </CCol>

      <CCol md="12">
        <h4>Sizes</h4>
      </CCol>

      <CCol xs="12">
        <CCard>
          <CCardHeader>
            Sizes
          </CCardHeader>
          <CCardBody className="p-0">
            <table className="table table-hover table-striped table-align-middle mb-0">
              <thead>
              <tr>
                <th>Size</th>
                <th>Example</th>
                <th>Props</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>
                  Large
                </td>
                <td>
                  <CSwitch className={'mx-1'} variant={'3d'} color={'primary'} defaultChecked size={'lg'} />
                </td>
                <td>
                  Add <code>size={'lg'}</code>
                </td>
              </tr>
              <tr>
                <td>
                  Normal
                </td>
                <td>
                  <CSwitch className={'mx-1'} variant={'3d'} color={'primary'} defaultChecked  />
                </td>
                <td>
                  -
                </td>
              </tr>
              <tr>
                <td>
                  Small
                </td>
                <td>
                  <CSwitch className={'mx-1'} variant={'3d'} color={'primary'} defaultChecked size={'sm'} />
                </td>
                <td>
                  Add <code>size={'sm'}</code>
                </td>
              </tr>
              </tbody>
            </table>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Switches

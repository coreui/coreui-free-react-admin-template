import React, { useState } from 'react';
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CListGroup,
  CListGroupItem,
  CRow,
  CTabContent,
  CTabPane
} from '@coreui/react';

const ListGroups = () => {
  const [activeTab, setActiveTab] = useState(1)

  return (
    <>
      <CRow>
        <CCol sm="12" xl="6">

          <CCard>
            <CCardHeader>
              List group
              <div className="card-header-actions">
                <a href="https://coreui.github.io/components/listgroup/" rel="noreferrer noopener" target="_blank" className="card-header-action">
                  <small className="text-muted">docs</small>
                </a>
              </div>
            </CCardHeader>
            <CCardBody>
              <CListGroup>
                <CListGroupItem>Cras justo odio</CListGroupItem>
                <CListGroupItem>Dapibus ac facilisis in</CListGroupItem>
                <CListGroupItem>Morbi leo risus</CListGroupItem>
                <CListGroupItem>Porta ac consectetur ac</CListGroupItem>
                <CListGroupItem>Vestibulum at eros</CListGroupItem>
              </CListGroup>
            </CCardBody>
          </CCard>

        </CCol>
        <CCol sm="12" xl="6">
          <CCard>
            <CCardHeader>
              List group links
              <small> with first item active and last item disabled</small>
            </CCardHeader>
            <CCardBody>
              <CListGroup>
                <CListGroupItem href="#" active>Cras justo odio</CListGroupItem>
                <CListGroupItem href="#">Dapibus ac facilisis in</CListGroupItem>
                <CListGroupItem href="#">Morbi leo risus</CListGroupItem>
                <CListGroupItem href="#">Porta ac consectetur ac</CListGroupItem>
                <CListGroupItem href="#" disabled>Vestibulum at eros</CListGroupItem>
              </CListGroup>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <CRow>
        <CCol sm="12" xl="6">

          <CCard>
            <CCardHeader>
              List group
              <small> contextual classes</small>
            </CCardHeader>
            <CCardBody>
              <CListGroup>
                <CListGroupItem>Dapibus ac facilisis in</CListGroupItem>
                <CListGroupItem color="primary">This is a primary list group item</CListGroupItem>
                <CListGroupItem color="secondary">This is a secondary list group item</CListGroupItem>
                <CListGroupItem color="success">This is a success list group item</CListGroupItem>
                <CListGroupItem color="danger">This is a danger list group item</CListGroupItem>
                <CListGroupItem color="warning">This is a warning list group item</CListGroupItem>
                <CListGroupItem color="info">This is a info list group item</CListGroupItem>
                <CListGroupItem color="light">This is a light list group item</CListGroupItem>
                <CListGroupItem color="dark">This is a dark list group item</CListGroupItem>
              </CListGroup>
            </CCardBody>
          </CCard>

        </CCol>
        <CCol sm="12" xl="6">

          <CCard>
            <CCardHeader>
              List group
              <small> contextual classes with .action</small>
            </CCardHeader>
            <CCardBody>
              <CListGroup>
                <CListGroupItem action>Dapibus ac facilisis in</CListGroupItem>
                <CListGroupItem action color="primary">This is a primary list group item</CListGroupItem>
                <CListGroupItem action color="secondary">This is a secondary list group item</CListGroupItem>
                <CListGroupItem action color="success">This is a success list group item</CListGroupItem>
                <CListGroupItem action color="danger">This is a danger list group item</CListGroupItem>
                <CListGroupItem action color="warning">This is a warning list group item</CListGroupItem>
                <CListGroupItem action color="info">This is a info list group item</CListGroupItem>
                <CListGroupItem action color="light">This is a light list group item</CListGroupItem>
                <CListGroupItem action color="dark">This is a dark list group item</CListGroupItem>
              </CListGroup>
            </CCardBody>
          </CCard>

        </CCol>
      </CRow>
      <CRow>
        <CCol sm="12" xl="6">
          <CCard>
            <CCardHeader>
              List group
              <small> accent</small>
            </CCardHeader>
            <CCardBody>
              <CListGroup accent>
                <CListGroupItem accent="primary">This is a primary list group item</CListGroupItem>
                <CListGroupItem accent="secondary">This is a secondary list group item</CListGroupItem>
                <CListGroupItem accent="success">This is a success list group item</CListGroupItem>
                <CListGroupItem accent="danger">This is a danger list group item</CListGroupItem>
                <CListGroupItem accent="warning">This is a warning list group item</CListGroupItem>
                <CListGroupItem accent="info">This is a info list group item</CListGroupItem>
                <CListGroupItem accent="light">This is a light list group item</CListGroupItem>
                <CListGroupItem accent="dark">This is a dark list group item</CListGroupItem>
              </CListGroup>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol sm="12" xl="6">
          <CCard>
            <CCardHeader>
              List group
              <small> accent with color</small>
            </CCardHeader>
            <CCardBody>
              <CListGroup accent>
                <CListGroupItem accent="primary" color="primary">This is a primary list group item</CListGroupItem>
                <CListGroupItem accent="secondary" color="secondary">This is a secondary list group item</CListGroupItem>
                <CListGroupItem accent="success" color="success">This is a success list group item</CListGroupItem>
                <CListGroupItem accent="danger" color="danger">This is a danger list group item</CListGroupItem>
                <CListGroupItem accent="warning" color="warning">This is a warning list group item</CListGroupItem>
                <CListGroupItem accent="info" color="info">This is a info list group item</CListGroupItem>
                <CListGroupItem accent="light" color="light">This is a light list group item</CListGroupItem>
                <CListGroupItem accent="dark" color="dark">This is a dark list group item</CListGroupItem>
              </CListGroup>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CRow>
        <CCol sm="12" xl="6">
          <CCard>
            <CCardHeader>
              List group
              <small> with badges</small>
            </CCardHeader>
            <CCardBody>
              <CListGroup>
                <CListGroupItem className="justify-content-between">
                  Cras justo odio
                  <CBadge className="float-right" shape="pill" color="primary">14</CBadge>
                </CListGroupItem>
                <CListGroupItem className="justify-content-between">
                  Dapibus ac facilisis in
                  <CBadge className="float-right" shape="pill" color="primary">2</CBadge>
                </CListGroupItem>
                <CListGroupItem className="justify-content-between">
                  Morbi leo risus
                  <CBadge className="float-right" shape="pill" color="primary">1</CBadge>
                </CListGroupItem>
              </CListGroup>
            </CCardBody>
          </CCard>

        </CCol>
        <CCol sm="12" xl="6">

          <CCard>
            <CCardHeader>
              List group
              <small> custom content</small>
            </CCardHeader>
            <CCardBody>

              <CListGroup>
                <CListGroupItem action active>
                  <h5 className="d-flex w-100 justify-content-between">
                    List group item heading
                    <small>3 days ago</small>
                  </h5>
                  <div className="mb-1">
                    Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.
                    <small>Donec id elit non mi porta.</small>
                  </div>
                </CListGroupItem>
                <CListGroupItem action>
                  <h5>List group item heading</h5>
                  <div>
                    Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.
                  </div>
                  <small>Small.</small>
                </CListGroupItem>
                <CListGroupItem action>
                  <h5>List group item heading</h5>
                  <div>
                    Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.
                  </div>
                  <small>Small.</small>
                </CListGroupItem>
              </CListGroup>

            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              List group
              <small> tab Javascript plugin</small>
            </CCardHeader>
            <CCardBody>
              <CRow>
                <CCol xs="4">
                  <CListGroup id="list-tab" role="tablist">
                    <CListGroupItem onClick={() => setActiveTab(0)} action active={activeTab === 0} >Home</CListGroupItem>
                    <CListGroupItem onClick={() => setActiveTab(1)} action active={activeTab === 1} >Profile</CListGroupItem>
                    <CListGroupItem onClick={() => setActiveTab(2)} action active={activeTab === 2} >Messages</CListGroupItem>
                    <CListGroupItem onClick={() => setActiveTab(3)} action active={activeTab === 3} >Settings</CListGroupItem>
                  </CListGroup>
                </CCol>
                <CCol xs="8">
                  <CTabContent>
                    <CTabPane active={activeTab === 0} >
                      <p>Velit aute mollit ipsum ad dolor consectetur nulla officia culpa adipisicing exercitation fugiat tempor. Voluptate deserunt sit sunt
                        nisi aliqua fugiat proident ea ut. Mollit voluptate reprehenderit occaecat nisi ad non minim
                        tempor sunt voluptate consectetur exercitation id ut nulla. Ea et fugiat aliquip nostrud sunt incididunt consectetur culpa aliquip
                        eiusmod dolor. Anim ad Lorem aliqua in cupidatat nisi enim eu nostrud do aliquip veniam minim.</p>
                    </CTabPane>
                    <CTabPane active={activeTab === 1}>
                      <p>Cupidatat quis ad sint excepteur laborum in esse qui. Et excepteur consectetur ex nisi eu do cillum ad laborum. Mollit et eu officia
                        dolore sunt Lorem culpa qui commodo velit ex amet id ex. Officia anim incididunt laboris deserunt
                        anim aute dolor incididunt veniam aute dolore do exercitation. Dolor nisi culpa ex ad irure in elit eu dolore. Ad laboris ipsum
                        reprehenderit irure non commodo enim culpa commodo veniam incididunt veniam ad.</p>
                    </CTabPane>
                    <CTabPane active={activeTab === 2}>
                      <p>Ut ut do pariatur aliquip aliqua aliquip exercitation do nostrud commodo reprehenderit aute ipsum voluptate. Irure Lorem et laboris
                        nostrud amet cupidatat cupidatat anim do ut velit mollit consequat enim tempor. Consectetur
                        est minim nostrud nostrud consectetur irure labore voluptate irure. Ipsum id Lorem sit sint voluptate est pariatur eu ad cupidatat et
                        deserunt culpa sit eiusmod deserunt. Consectetur et fugiat anim do eiusmod aliquip nulla
                        laborum elit adipisicing pariatur cillum.</p>
                    </CTabPane>
                    <CTabPane active={activeTab === 3}>
                      <p>Irure enim occaecat labore sit qui aliquip reprehenderit amet velit. Deserunt ullamco ex elit nostrud ut dolore nisi officia magna
                        sit occaecat laboris sunt dolor. Nisi eu minim cillum occaecat aute est cupidatat aliqua labore
                        aute occaecat ea aliquip sunt amet. Aute mollit dolor ut exercitation irure commodo non amet consectetur quis amet culpa. Quis ullamco
                        nisi amet qui aute irure eu. Magna labore dolor quis ex labore id nostrud deserunt dolor
                        eiusmod eu pariatur culpa mollit in irure.</p>
                    </CTabPane>
                  </CTabContent>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default ListGroups

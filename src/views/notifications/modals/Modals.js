import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow
} from '@coreui/react'
import { DocsLink } from 'src/reusable'

const Modals = () => {

  const [modal, setModal] = useState(true)
  const [large, setLarge] = useState(false)
  const [small, setSmall] = useState(false)
  const [primary, setPrimary] = useState(false)
  const [success, setSuccess] = useState(false)
  const [warning, setWarning] = useState(false)
  const [danger, setDanger] = useState(false)
  const [info, setInfo] = useState(false)

  return (
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>
            Bootstrap Modals
            <DocsLink name="CModal"/>
          </CCardHeader>
          <CCardBody>
            <CButton 
              onClick={() => setModal(!modal)} 
              className="mr-1"
            >Launch demo modal</CButton>
            <CButton onClick={() => setLarge(!large)} className="mr-1">
              Launch large modal
            </CButton>
            <CButton onClick={() => setSmall(!large)} className="mr-1">
              Launch small modal
            </CButton>
            <CModal 
              show={modal} 
              onClose={setModal}
            >
              <CModalHeader closeButton>
                <CModalTitle>Modal title</CModalTitle>
              </CModalHeader>
              <CModalBody>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore
                et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                culpa qui officia deserunt mollit anim id est laborum.
              </CModalBody>
              <CModalFooter>
                <CButton color="primary">Do Something</CButton>{' '}
                <CButton 
                  color="secondary" 
                  onClick={() => setModal(false)}
                >Cancel</CButton>
              </CModalFooter>
            </CModal>


            <CModal 
              show={large} 
              onClose={() => setLarge(!large)}
              size="lg"
            >
              <CModalHeader closeButton>
                <CModalTitle>Modal title</CModalTitle>
              </CModalHeader>
              <CModalBody>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore
                et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                culpa qui officia deserunt mollit anim id est laborum.
              </CModalBody>
              <CModalFooter>
                <CButton color="primary" onClick={() => setLarge(!large)}>Do Something</CButton>{' '}
                <CButton color="secondary" onClick={() => setLarge(!large)}>Cancel</CButton>
              </CModalFooter>
            </CModal>

            <CModal 
              show={small} 
              onClose={() => setSmall(!small)}
              size="sm"
            >
              <CModalHeader closeButton>
                <CModalTitle>Modal title</CModalTitle>
              </CModalHeader>
              <CModalBody>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore
                et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                culpa qui officia deserunt mollit anim id est laborum.
              </CModalBody>
              <CModalFooter>
                <CButton color="primary" onClick={() => setSmall(!small)}>Do Something</CButton>{' '}
                <CButton color="secondary" onClick={() => setSmall(!small)}>Cancel</CButton>
              </CModalFooter>
            </CModal>

            <hr />

            <CButton color="primary" onClick={() => setPrimary(!primary)} className="mr-1">
              Primary modal
            </CButton>
            <CButton color="success" onClick={() => setSuccess(!success)} className="mr-1">Success modal</CButton>
            <CButton color="warning" onClick={() => setWarning(!warning)} className="mr-1">Warning modal</CButton>
            <CButton color="danger" onClick={() => setDanger(!danger)} className="mr-1">Danger modal</CButton>
            <CButton color="info" onClick={() => setInfo(!info)} className="mr-1">Info modal</CButton>

            <CModal 
              show={primary} 
              onClose={() => setPrimary(!primary)}
              color="primary"
            >
              <CModalHeader closeButton>
                <CModalTitle>Modal title</CModalTitle>
              </CModalHeader>
              <CModalBody>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore
                et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                culpa qui officia deserunt mollit anim id est laborum.
              </CModalBody>
              <CModalFooter>
                <CButton color="primary" onClick={() => setPrimary(!primary)}>
                  Do Something
                </CButton>{' '}
                <CButton color="secondary" onClick={() => setPrimary(!primary)}>
                  Cancel
                </CButton>
              </CModalFooter>
            </CModal>

            <CModal 
              show={success} 
              onClose={() => setSuccess(!success)}
              color="success"
            >
              <CModalHeader closeButton>
                <CModalTitle>Modal title</CModalTitle>
              </CModalHeader>
              <CModalBody>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore
                et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                culpa qui officia deserunt mollit anim id est laborum.
              </CModalBody>
              <CModalFooter>
                <CButton color="success" onClick={() => setSuccess(!success)}>Do Something</CButton>{' '}
                <CButton color="secondary" onClick={() => setSuccess(!success)}>Cancel</CButton>
              </CModalFooter>
            </CModal>

            <CModal 
              show={warning} 
              onClose={() => setWarning(!warning)}
              color="warning"
            >
              <CModalHeader closeButton>
                <CModalTitle>Modal title</CModalTitle>
              </CModalHeader>
              <CModalBody>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore
                et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                culpa qui officia deserunt mollit anim id est laborum.
              </CModalBody>
              <CModalFooter>
                <CButton color="warning" onClick={() => setWarning(!warning)}>Do Something</CButton>{' '}
                <CButton color="secondary" onClick={() => setWarning(!warning)}>Cancel</CButton>
              </CModalFooter>
            </CModal>

            <CModal 
              show={danger} 
              onClose={() => setDanger(!danger)}
              color="danger"
            >
              <CModalHeader closeButton>
                <CModalTitle>Modal title</CModalTitle>
              </CModalHeader>
              <CModalBody>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore
                et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                culpa qui officia deserunt mollit anim id est laborum.
              </CModalBody>
              <CModalFooter>
                <CButton color="danger" onClick={() => setDanger(!danger)}>Do Something</CButton>{' '}
                <CButton color="secondary" onClick={() => setDanger(!danger)}>Cancel</CButton>
              </CModalFooter>
            </CModal>

            <CModal 
              show={info} 
              onClose={() => setInfo(!info)}
              color="info"
            >
              <CModalHeader closeButton>
                <CModalTitle>Modal title</CModalTitle>
              </CModalHeader>
              <CModalBody>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore
                et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                culpa qui officia deserunt mollit anim id est laborum.
              </CModalBody>
              <CModalFooter>
                <CButton color="secondary" onClick={() => setInfo(!info)}>Cancel</CButton>
                <CButton color="info" onClick={() => setInfo(!info)}>Do Something</CButton>{' '}
              </CModalFooter>
            </CModal>

          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Modals

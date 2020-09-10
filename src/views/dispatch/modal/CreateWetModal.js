
import React,{useState} from 'react'

import {CButton,CModal,CModalHeader,CModalBody,CModalFooter,CForm,CFormGroup,CLabel,CInput,CFormText} from '@coreui/react'

const CreateWetModal = () => {
const [modal, setModal] = useState(false);
const toggle = ()=>{
  setModal(!modal);
}

return (
  <>
    <CButton color="info" shape="square" size="large"
      onClick={toggle}
      className="l-2"
    >Create WET Load</CButton>
    <CModal
      show={modal}
      onClose={toggle}
    >
      <CModalHeader closeButton>Add WET Load</CModalHeader>
      <CModalBody>
      <CForm action="" method="post">
            <CFormGroup>
              <CLabel htmlFor="nf-whse">Whse</CLabel>
              <CInput
                type="number"
                id="nf-number"
                name="nf-number"
                placeholder="Enter Whse.."
              />
              <CFormText className="help-block">Please enter Whse</CFormText>
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="nf-appt">Appt. Time</CLabel>
              <CInput
                type="time"
                id="nf-appt"
                name="nf-appt"
                placeholder="Enter Appt Time.."
              />
              <CFormText className="help-block">Please enter Appt Time</CFormText>
            </CFormGroup>
          </CForm>
      </CModalBody>
      <CModalFooter>
        <CButton color="primary">Do Something</CButton>{' '}
        <CButton
          color="secondary"
          onClick={toggle}
        >Cancel</CButton>
      </CModalFooter>
    </CModal>
  </>
)
}
export default CreateWetModal


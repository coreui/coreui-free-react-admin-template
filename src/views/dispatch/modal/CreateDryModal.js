import React,{useState} from 'react'

import {CButton,CModal,CModalHeader,CModalBody,CModalFooter,CForm,CFormGroup,CLabel,CInput,CFormText} from '@coreui/react'

const CreateDryModal = () => {
const [modal, setModal] = useState(false);
const toggle = ()=>{
  setModal(!modal);
}

return (
  <>
    <CButton color="danger" shape="square" size="large"
     onClick={toggle}
      className="l-2"
    >Create Dry Load</CButton>
    <CModal
      show={modal}
      onClose={toggle}
    >
      <CModalHeader closeButton>Add DRY Load</CModalHeader>
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
              <CFormText className="help-block">WHSE</CFormText>
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="nf-date">Date</CLabel>
              <CInput
                type="date"
                id="nf-date"
                name="nf-date"
                placeholder="Enter Date.."
              />
              <CFormText className="help-block">DATE</CFormText>
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="nf-appt">Appt. Time</CLabel>
              <CInput
                type="time"
                id="nf-appt"
                name="nf-appt"
                placeholder="Enter Appt Time.."
              />
              <CFormText className="help-block">TIME</CFormText>
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="nf-LoadNumber">Load Number</CLabel>
              <CInput
                type="number"
                id="nf-loadNumber"
                name="nf-loadNumber"
                placeholder="LOAD NUMBER.."
              />
              <CFormText className="help-block">LOAD NUMBER</CFormText>
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="nf-trailerNumber">Trailer Number</CLabel>
              <CInput
                type="trailerNumber"
                id="nf-trailerNumber"
                name="nf-trailerNumber"
                placeholder="TRAILER NUMBER.."
              />
              <CFormText className="help-block">TRAILER NUMBER</CFormText>
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
export default CreateDryModal


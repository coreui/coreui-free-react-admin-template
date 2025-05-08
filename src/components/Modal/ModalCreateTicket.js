import { CButton, CModal, CModalBody, CModalFooter, CModalHeader } from '@coreui/react'
import React from 'react'
import { toggleCreateTicketModalClose } from '../../actions/ticketActions'
import { useDispatch, useSelector } from 'react-redux'

const ModalCreateTicket = () => {
  const { isCreateTicketModalOpen } = useSelector((state) => state.ticket)
  const dispatch = useDispatch()
  return (
    <CModal
      visible={isCreateTicketModalOpen}
      onClose={() => dispatch(toggleCreateTicketModalClose())}
      backdrop="static"
      aria-labelledby="ScrollingLongContentExampleLabel LiveDemoExampleLabel"
      scrollable
      alignment="center"
    >
      <CModalHeader onClose={() => dispatch(toggleCreateTicketModalClose())}>
        Créer un nouveau ticket
      </CModalHeader>
      <CModalBody>
        <p>Les champs obligatoires sont marqués d'un astérisque *</p>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => dispatch(toggleCreateTicketModalClose())}>
          Fermer
        </CButton>
        <CButton color="primary">Sauvegarder</CButton>
      </CModalFooter>
    </CModal>
  )
}

export default ModalCreateTicket

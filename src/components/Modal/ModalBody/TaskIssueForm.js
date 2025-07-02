import React from 'react'
import PropTypes from 'prop-types'
import { CCol, CFormInput, CFormLabel, CFormSelect, CRow } from '@coreui/react'
import { Editor } from '@tinymce/tinymce-react'
import { Prioritys } from '../../../utils/TicketsConsts'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'

const TaskIssueForm = ({ newIssue, setNewIssue }) => {
  const [Priority, setPriority] = React.useState(Prioritys[0].value)
  const [startDate, setStartDate] = React.useState(null)
  const [endDate, setEndDate] = React.useState(null)
  const [assignee, setAssignee] = React.useState('')
  const [estimation, setEstimation] = React.useState('')

  const handleEditorChange = (content) => {
    setNewIssue({
      ...newIssue,
      fields: {
        ...newIssue.fields,
        description: content,
      },
    })
  }

  const handleChangeSummary = (event) => {
    setNewIssue({
      ...newIssue,
      fields: {
        ...newIssue.fields,
        summary: event.target.value,
      },
    })
  }

  const handlePriorityChange = (event) => {
    const selectedPriority = event.target.value
    setPriority(selectedPriority)

    // Trouve l'objet priority complet basé sur la valeur sélectionnée
    const priorityObj = Prioritys.find((p) => p.value === selectedPriority)

    setNewIssue({
      ...newIssue,
      fields: {
        ...newIssue.fields,
        priority: priorityObj,
      },
    })
  }

  const handleAssigneeChange = (event) => {
    const value = event.target.value
    setAssignee(value)

    setNewIssue({
      ...newIssue,
      fields: {
        ...newIssue.fields,
        assignee: value ? { displayName: value, emailAddress: value } : null,
      },
    })
  }

  const handleEstimationChange = (event) => {
    const value = event.target.value
    setEstimation(value)

    setNewIssue({
      ...newIssue,
      fields: {
        ...newIssue.fields,
        timeoriginalestimate: value ? parseInt(value, 10) * 3600 : null, // Convertir heures en secondes
      },
    })
  }

  const handleStartDateChange = (date) => {
    setStartDate(date)
    setNewIssue({
      ...newIssue,
      fields: {
        ...newIssue.fields,
        customfield_10015: date ? date.toISOString() : null, // Date de début
      },
    })
  }

  const handleEndDateChange = (date) => {
    setEndDate(date)
    setNewIssue({
      ...newIssue,
      fields: {
        ...newIssue.fields,
        duedate: date ? date.toISOString().split('T')[0] : null, // Date d'échéance
      },
    })
  }

  return (
    <div className="mt-3">
      <CRow className="mb-3">
        <CCol md={3}>
          <CFormLabel className="fw-bold">Summary*</CFormLabel>
        </CCol>
        <CCol md={9}>
          <CFormInput
            type="text"
            placeholder="Résumé de la tâche..."
            value={newIssue.fields.summary || ''}
            onChange={handleChangeSummary}
          />
        </CCol>
      </CRow>

      <CRow className="mb-3">
        <CCol md={3}>
          <CFormLabel className="fw-bold">Description*</CFormLabel>
        </CCol>
        <CCol md={9}>
          <Editor
            apiKey="pgeao7zzbo9u4uoozk1nlccidje7yemdafe1egcax1afrsz8"
            initialValue=""
            init={{
              height: 300,
              menubar: false,
              plugins: [
                'advlist autolink lists link charmap preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table code help wordcount',
              ],
              toolbar:
                'undo redo | formatselect | bold italic underline | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
            }}
            onEditorChange={handleEditorChange}
          />
        </CCol>
      </CRow>

      <CRow className="mb-3">
        <CCol md={3}>
          <CFormLabel className="fw-bold">Assigné à</CFormLabel>
        </CCol>
        <CCol md={9}>
          <CFormInput
            type="email"
            placeholder="email@exemple.com"
            value={assignee}
            onChange={handleAssigneeChange}
          />
          <small className="form-text text-muted">
            Adresse email de la personne assignée à cette tâche
          </small>
        </CCol>
      </CRow>

      <CRow className="mb-3">
        <CCol md={3}>
          <CFormLabel className="fw-bold">Estimation (heures)</CFormLabel>
        </CCol>
        <CCol md={9}>
          <CFormInput
            type="number"
            placeholder="0"
            value={estimation}
            onChange={handleEstimationChange}
            min="0"
            step="0.5"
          />
          <small className="form-text text-muted">Estimation du temps nécessaire en heures</small>
        </CCol>
      </CRow>

      <CRow className="mb-3">
        <CCol md={3}>
          <CFormLabel className="fw-bold">Priorité</CFormLabel>
        </CCol>
        <CCol md={9}>
          <CFormSelect
            value={Priority}
            onChange={handlePriorityChange}
            aria-describedby="priority-help"
          >
            {Prioritys.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </CFormSelect>
          <small id="priority-help" className="form-text text-muted">
            Veuillez sélectionner la priorité de la tâche
          </small>
        </CCol>
      </CRow>

      <CRow className="mb-3">
        <CCol md={3}>
          <CFormLabel className="fw-bold">Date début</CFormLabel>
        </CCol>
        <CCol md={9}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              value={startDate}
              onChange={handleStartDateChange}
              slotProps={{
                textField: {
                  fullWidth: true,
                  variant: 'outlined',
                  size: 'small',
                },
              }}
            />
          </LocalizationProvider>
        </CCol>
      </CRow>

      <CRow className="mb-3">
        <CCol md={3}>
          <CFormLabel className="fw-bold">Date d&apos;échéance</CFormLabel>
        </CCol>
        <CCol md={9}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              value={endDate}
              onChange={handleEndDateChange}
              slotProps={{
                textField: {
                  fullWidth: true,
                  variant: 'outlined',
                  size: 'small',
                },
              }}
            />
          </LocalizationProvider>
        </CCol>
      </CRow>
    </div>
  )
}

TaskIssueForm.propTypes = {
  newIssue: PropTypes.object.isRequired,
  setNewIssue: PropTypes.func.isRequired,
}

export default TaskIssueForm

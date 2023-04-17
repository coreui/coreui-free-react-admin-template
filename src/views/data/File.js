import {
  CButton,
  CCol,
  CPagination,
  CPaginationItem,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { BACKEND_HOST } from '../../constant'
import UploadFileModal from '../modal/UploadFileModal'

const File = () => {
  const [files, setFiles] = useState([])
  const [limit, setLimit] = useState(20)
  const [offset, setOffset] = useState(0)

  const uploadFileRef = useRef()

  useEffect(() => {
    console.log('shit')
    getFilesData()
  }, [])

  const getFilesData = () => {
    axios
      .get(`${BACKEND_HOST}/file`, {
        params: {
          limit,
          offset,
        },
      })
      .then((res) => {
        const newFiles = res.data.files
        console.log('123123', newFiles)
        setFiles(newFiles)
      })
      .catch((err) => {
        console.log('Error while getting user', err)
      })
  }

  const openUploadFile = () => {
    uploadFileRef.current?.show()
  }

  return (
    <CRow>
      <CCol>
        <CButton onClick={openUploadFile} className="px-4 mb-3">
          Upload file
        </CButton>
      </CCol>
      <CTable>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">Filename</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {files.map((item, index) => {
            return (
              <CTableRow key={index}>
                <CTableDataCell>{item.originalName}</CTableDataCell>
              </CTableRow>
            )
          })}
        </CTableBody>
      </CTable>
      <CPagination aria-label="Page navigation example">
        <CPaginationItem aria-label="Previous" disabled>
          <span aria-hidden="true">&laquo;</span>
        </CPaginationItem>
        <CPaginationItem>1</CPaginationItem>
        <CPaginationItem aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
        </CPaginationItem>
      </CPagination>
      <UploadFileModal ref={uploadFileRef} />
    </CRow>
  )
}

export default File

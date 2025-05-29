import React, { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Collapse,
  List,
  ListItem,
  ListItemText,
  Modal,
  Box,
} from '@mui/material'
import { CModal, CModalHeader, CModalTitle, CModalBody, CButton } from '@coreui/react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import AddSubCategory from './AddSubCategory'

const SubCategories = ({ data }) => {
  if (data.length == 0) return <div style={{ textAlign: 'center' }}>No Categories added</div>
  return data.map((r) => (
    <ListItem key={r.id}>
      <ListItemText primary={r.name} />
    </ListItem>
  ))
}

const DynamicCollapseTable = ({ data }, { props }) => {
  const [categoryName, setCategoryName] = useState(null)
  const [categoryId, setCategoryId] = useState(null)

  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  const [expandedRows, setExpandedRows] = useState([])

  const handleRowClick = (index) => {
    const isRowExpanded = expandedRows.includes(index)
    setExpandedRows(
      isRowExpanded ? expandedRows.filter((i) => i !== index) : [...expandedRows, index],
    )
  }
  const [visible, setVisible] = useState(false)

  const showModal = (name, id) => {
    setVisible(!visible)
    setCategoryName(name)
    setCategoryId(id)
  }
  const closeModal = () => {
    setVisible(false)
  }

  return (
    <div>
      <>
        <CModal visible={visible} onClose={() => setVisible(false)} size="lg">
          <CModalHeader>
            <CModalTitle>Add Subcategory</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <AddSubCategory
              name={categoryName}
              id={categoryId}
              ParentFunction={closeModal}
              data={data}
            />
          </CModalBody>
        </CModal>
      </>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {data.map((row, index) => (
              <React.Fragment key={index}>
                <TableRow onClick={() => handleRowClick(index)}>
                  <TableCell>
                    {expandedRows.includes(index) ? (
                      <KeyboardArrowUpIcon />
                    ) : (
                      <KeyboardArrowDownIcon />
                    )}
                    {row.name}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Collapse in={expandedRows.includes(index)}>
                      <List>
                        <SubCategories data={row.sub_categories} />
                      </List>
                      <CButton color="secondary" onClick={() => showModal(row.name, row.id)}>
                        Add Subcategory
                      </CButton>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default DynamicCollapseTable

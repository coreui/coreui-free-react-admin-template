import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { CBadge, CContainer } from '@coreui/react'
import { Paper } from '@material-ui/core'
import MaterialTable from 'material-table'

import { getAllTicketAPI } from '../../../actions/ticketActions'
import tableIcons from '../../icons/MaterialTableIcons'
import DetailPanelTableTicket from '../../../components/DetailPanel/DetailPanelTableTicket'

const Tickets = () => {
  const dispatch = useDispatch()
  const isFirstRender = useRef(true)
  const { ticketList } = useSelector((state) => state.ticket)

  useEffect(() => {
    if (isFirstRender.current) {
      dispatch(getAllTicketAPI())
      isFirstRender.current = false
    }
  }, [dispatch])

  return (
    <>
      <MaterialTable
        title="Tickets"
        icons={tableIcons}
        isLoading={ticketList.length === 0}
        options={{
          paging: false,
        }}
        columns={[
          {
            title: 'From',
            field: 'configId',
            cellStyle: { width: '10%' },
            headerStyle: { width: '10%' },
            render: (rowData) =>
              rowData.configId ? (
                <CBadge color="primary" shape="rounded-pill">
                  externe
                </CBadge>
              ) : (
                <CBadge color="secondary" shape="rounded-pill">
                  interne
                </CBadge>
              ),
          },
          {
            title: 'key',
            field: 'key',
            cellStyle: { width: '10%' },
            headerStyle: { width: '10%' },
          },
          {
            title: 'summary',
            field: 'fields.summary',
            cellStyle: { width: '80%' },
            headerStyle: { width: '80%' },
          },
          {
            title: 'status',
            field: 'fields.status.name',
            cellStyle: { width: '10%' },
            headerStyle: { width: '10%' },
          },
        ]}
        data={ticketList}
        components={{
          Container: (props) => (
            <Paper
              {...props}
              elevation={0}
              style={{ backgroundColor: 'transparent', boxShadow: 'none' }}
            />
          ),
        }}
        detailPanel={[
          {
            tooltip: 'Show more info',
            render: (rowData) => <DetailPanelTableTicket rowData={rowData} />,
          },
        ]}
      />
    </>
  )
}

export default Tickets

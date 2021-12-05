/* eslint-disable */
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom";
import { withAdminAuth } from "../../../hoc/withAdminAuth";
import { fetchAllRequests } from "../../../redux/slices/request";
import { UserTable, SelectColumnFilter } from './UserTable'

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 0.2px black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }

  .pagination {
    padding: 0.5rem;
  }
`

export const UserTablePage = withAdminAuth(true)(() => {
  const { push } = useHistory();
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.requests.loading);
  const requests = useSelector((state) => state.requests.requests.items);
  const totalPages = useSelector((state) => state.requests.requests.totalPages);
  const currentPage = useSelector((state) => state.requests.requests.currentPage);
  const totalItems = useSelector((state) => state.requests.requests.totalItems + 1);
  const deleteLoading = useSelector((state) => state.admin.authLoading);
  // get user_id from the appwrite getUser or localstorage
  useEffect(() => {
    (async () => {
      dispatch(fetchAllRequests(localStorage.getItem("admin_id")))
    })()
  }, [])

  const columns = React.useMemo(
    () => [
      {
        Header: 'Request Information',
        columns: [
          {
            Header: 'Request ID',
            accessor: 'id',
          },
          {
            Header: 'Service',
            accessor: 'service',
            Filter: SelectColumnFilter
          },
          {
            Header: 'Title',
            accessor: 'title',
          },
          // {
          //     Header: 'Description',
          //     accessor: 'description',
          // },
          // {
          //     Header: 'Address',
          //     accessor: 'address',
          // },
          {
            Header: 'Status',
            accessor: 'status',
            Filter: SelectColumnFilter
          },
          {
            Header: 'Equipment',
            accessor: 'equipment',
          },
          // {
          //     Header: 'Admin Approval',
          //     accessor: 'admin_approval',
          // },
          // {
          //     Header: 'Submission Date',
          //     accessor: 'submission_date',
          // },
          // {
          //     Header: 'Creative ID',
          //     accessor: 'creative_id',
          // },
          // {
          //     Header: 'Customer ID',
          //     accessor: 'customer_id',
          // },
        ],
      },
    ],
    []
  )

  return (
    <div>
      {loading ? (<div>loading</div >) : (
        <Styles>
          <UserTable columns={columns} data={requests} pageIndex={currentPage} pageSize={totalItems} />
        </Styles>)}

    </div>
  )
})

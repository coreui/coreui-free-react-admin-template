/* eslint-disable */
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Pagination from "@material-ui/lab/Pagination";
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom";
import { withAdminAuth } from "../../../hoc/withAdminAuth";
import { fetchAllUsers } from "../../../redux/slices/user";
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

  const dispatch = useDispatch();
  const loading = useSelector((state) => state.requests.loading);
  const users = useSelector((state) => state.users.users.users);
  const totalPages = useSelector((state) => state.users.users.sum);
  const currentPage = useSelector((state) => state.requests.requests.currentPage);
  // const totalItems = useSelector((state) => state.requests.requests.totalItems + 1);
  const deleteLoading = useSelector((state) => state.admin.authLoading);
  // get user_id from the appwrite getUser or localstorage
  useEffect(() => {
    (async () => {

      dispatch(fetchAllUsers({ id: localStorage.getItem("admin_id"), limit: 100, offset: 0 }))

    })()
  }, [])

  const columns = React.useMemo(
    () => [
      {
        Header: 'User Information',
        columns: [
          {
            Header: 'Name',
            accessor: 'name',
            // Filter: SelectColumnFilter
          },
          {
            Header: 'Email',
            accessor: 'email',
          },
          {
            Header: 'Role',
            accessor: 'prefs.role',
            Filter: SelectColumnFilter
          },
          // {
          //   Header: 'Address',
          //   accessor: 'prefs.location',
          // },
        ],
      },
    ],
    []
  )

  return (
    <div>
      {loading ? (<div class="d-flex justify-content-center">
        <div class="spinner-border" role="status">
          <span class="sr-only"></span>
        </div>
      </div>) : (
        <Styles>
          <UserTable columns={columns} data={users} pageIndex={currentPage} pageSize={totalPages} />
        </Styles>)}

    </div>
  )
})

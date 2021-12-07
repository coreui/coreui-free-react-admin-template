/* eslint-disable */
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom";
import { withAdminAuth } from "../../../hoc/withAdminAuth";
import { fetchAllCategories } from "../../../redux/slices/category"
import { CategoryTable, SelectColumnFilter } from './CategoryTable'
import Loader from "react-loader-spinner";

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

export const CategoryTablePage = withAdminAuth(true)(() => {
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.categories.loading);
    const categories = useSelector((state) => state.categories.categories.items);
    const totalPages = useSelector((state) => state.categories.categories.totalPages);
    const currentPage = useSelector((state) => state.categories.categories.currentPage);
    const totalItems = useSelector((state) => state.categories.categories.totalItems + 1);
    const deleteLoading = useSelector((state) => state.admin.authLoading);
    // get user_id from the appwrite getUser or localstorage
    useEffect(() => {
        (async () => {
            dispatch(fetchAllCategories(localStorage.getItem("admin_id")))
        })()
    }, [])

    const columns = React.useMemo(
        () => [
            {
                Header: 'Category Information',
                columns: [

                    {
                        Header: 'Name',
                        accessor: 'name',
                    },
                    {
                        Header: 'Description',
                        accessor: 'description',
                    },
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
                    <CategoryTable columns={columns} data={categories} pageIndex={currentPage} pageSize={totalItems} />
                </Styles>)}

        </div>
    )
})
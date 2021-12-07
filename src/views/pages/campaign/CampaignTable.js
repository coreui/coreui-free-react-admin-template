/* eslint-disable */
import React, { useState, lazy } from 'react'
import { useTable, useFilters, useGlobalFilter, useAsyncDebounce, usePagination, useRowSelect } from 'react-table'
// A great library for fuzzy filtering/sorting items
import { matchSorter } from 'match-sorter'
import { Table, TableHead, TableBody, TableRow, TableCell, makeStyles } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import {
    CButton,
    CCol,
    CRow,
    CCardBody,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CFormInput,
    CFormLabel,
    CFormFloating,
    CForm,
    CFormTextarea,
    CTooltip
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilCheck, cilTrash, cilRecycle } from '@coreui/icons';

const useStyles = makeStyles(theme => ({
    table: {
        marginTop: theme.spacing(3),
        '& thead th': {
            fontWeight: '600',
            color: theme.palette.primary.main,
            backgroundColor: theme.palette.primary.light,
        },
        '& tbody td': {
            fontWeight: '300',
        },
        '& tbody tr:hover': {
            backgroundColor: '#fffbf2',
            cursor: 'pointer',
        },
    },
    icon: {
        color: '#246bce',
        marginLeft: '5px'

    },
    success: {
        color: '#33cc33'
    },
    delete: {
        color: "#e30022",
        marginLeft: '5px'
    }
}))

// Define a default UI for filtering
function GlobalFilter({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter,
}) {
    const count = preGlobalFilteredRows.length
    const [value, setValue] = React.useState(globalFilter)
    const onChange = useAsyncDebounce(value => {
        setGlobalFilter(value || undefined)
    }, 200)

    return (
        <span>
            Search:{' '}
            <input
                value={value || ""}
                onChange={e => {
                    setValue(e.target.value);
                    onChange(e.target.value);
                }}
                placeholder={`${count} records...`}
                style={{
                    fontSize: '1.1rem',
                    border: '0',
                }}
            />
        </span>
    )
}

// Define a default UI for filtering
function DefaultColumnFilter({
    column: { filterValue, preFilteredRows, setFilter },
}) {
    const count = preFilteredRows.length + 1

    return (
        <input
            value={filterValue || ''}
            onChange={e => {
                setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
            }}
            placeholder={`Search ${count} records...`}
        />
    )
}

// This is a custom filter UI for selecting
// a unique option from a list
export const SelectColumnFilter = ({
    column: { filterValue, setFilter, preFilteredRows, id },
}) => {
    // Calculate the options for filtering
    // using the preFilteredRows
    const options = React.useMemo(() => {
        const options = new Set()
        preFilteredRows.forEach(row => {
            options.add(row.values[id])
        })
        return [...options.values()]
    }, [id, preFilteredRows])

    // Render a multi-select box
    return (
        <select
            value={filterValue}
            onChange={e => {
                setFilter(e.target.value || undefined)
            }}
        >
            <option value="">All</option>
            {options.map((option, i) => (
                <option key={i} value={option}>
                    {option}
                </option>
            ))}
        </select>
    )
}

// This is a custom filter UI that uses a
// slider to set the filter value between a column's
// min and max values
function SliderColumnFilter({
    column: { filterValue, setFilter, preFilteredRows, id },
}) {
    // Calculate the min and max
    // using the preFilteredRows

    const [min, max] = React.useMemo(() => {
        let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
        let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
        preFilteredRows.forEach(row => {
            min = Math.min(row.values[id], min)
            max = Math.max(row.values[id], max)
        })
        return [min, max]
    }, [id, preFilteredRows])

    return (
        <>
            <input
                type="range"
                min={min}
                max={max}
                value={filterValue || min}
                onChange={e => {
                    setFilter(parseInt(e.target.value, 10))
                }}
            />
            <button onClick={() => setFilter(undefined)}>Off</button>
        </>
    )
}

// This is a custom UI for our 'between' or number range
// filter. It uses two number boxes and filters rows to
// ones that have values between the two
function NumberRangeColumnFilter({
    column: { filterValue = [], preFilteredRows, setFilter, id },
}) {
    const [min, max] = React.useMemo(() => {
        let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
        let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
        preFilteredRows.forEach(row => {
            min = Math.min(row.values[id], min)
            max = Math.max(row.values[id], max)
        })
        return [min, max]
    }, [id, preFilteredRows])

    return (
        <div
            style={{
                display: 'flex',
            }}
        >
            <input
                value={filterValue[0] || ''}
                type="number"
                onChange={e => {
                    const val = e.target.value
                    setFilter((old = []) => [val ? parseInt(val, 10) : undefined, old[1]])
                }}
                placeholder={`Min (${min})`}
                style={{
                    width: '70px',
                    marginRight: '0.5rem',
                }}
            />
            to
            <input
                value={filterValue[1] || ''}
                type="number"
                onChange={e => {
                    const val = e.target.value
                    setFilter((old = []) => [old[0], val ? parseInt(val, 10) : undefined])
                }}
                placeholder={`Max (${max})`}
                style={{
                    width: '70px',
                    marginLeft: '0.5rem',
                }}
            />
        </div>
    )
}

function fuzzyTextFilterFn(rows, id, filterValue) {
    return matchSorter(rows, filterValue, { keys: [row => row.values[id]] })
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = val => !val

// Define a custom filter filter function!
function filterGreaterThan(rows, id, filterValue) {
    return rows.filter(row => {
        const rowValue = row.values[id]
        return rowValue >= filterValue
    })
}

// This is an autoRemove method on the filter function that
// when given the new filter value and returns true, the filter
// will be automatically removed. Normally this is just an undefined
// check, but here, we want to remove the filter if it's not a number
filterGreaterThan.autoRemove = val => typeof val !== 'number'

const IndeterminateCheckbox = React.forwardRef(
    ({ indeterminate, ...rest }, ref) => {
        const defaultRef = React.useRef()
        const resolvedRef = ref || defaultRef

        React.useEffect(() => {
            resolvedRef.current.indeterminate = indeterminate
        }, [resolvedRef, indeterminate])

        return (
            <>
                <input type="checkbox" ref={resolvedRef} {...rest} />
            </>
        )
    }
)

// Our table component
export const CampaignTable = ({ columns, data, pageIndex, pageSize }) => {
    const classes = useStyles();
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const dispatch = useDispatch();

    const [categoryModal, setCategoryModal] = useState({ visible: false });

    const changeNameHandler = (e) => setName(e.target.value)
    const changeDescriptionHandler = (e) => setDescription(e.target.value)

    const categoryHandler = (e) => {
        e.preventDefault()
        console.log(name)
        dispatch(postCategory({ name, description, user_id: localStorage.getItem("admin_id") }))
    }

    const filterTypes = React.useMemo(
        () => ({
            // Add a new fuzzyTextFilterFn filter type.
            fuzzyText: fuzzyTextFilterFn,
            // Or, override the default text filter to use
            // "startWith"
            text: (rows, id, filterValue) => {
                return rows.filter(row => {
                    const rowValue = row.values[id]
                    return rowValue !== undefined
                        ? String(rowValue)
                            .toLowerCase()
                            .startsWith(String(filterValue).toLowerCase())
                        : true
                })
            },
        }),
        []
    )

    const defaultColumn = React.useMemo(
        () => ({
            // Let's set up our default Filter UI
            Filter: DefaultColumnFilter,
        }),
        []
    )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        selectedFlatRows,
        // rows,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state,
        state: { selectedRowIds },
        visibleColumns,
        preGlobalFilteredRows,
        setGlobalFilter,
    } = useTable(
        {
            columns,
            data,
            defaultColumn, // Be sure to pass the defaultColumn option
            filterTypes,
            initialState: { pageIndex: 0 }
        },

        useFilters, // useFilters!
        useGlobalFilter, // useGlobalFilter!
        usePagination,
        useRowSelect,
        hooks => {
            hooks.visibleColumns.push(columns => [
                // Let's make a column for selection
                ...columns,
                {
                    id: 'selection',
                    Cell: ({ row }) => (
                        <div>
                            <CTooltip
                                content="Click to delete category."
                                placement="top"
                            >
                                <CIcon
                                    className={classes.icon}
                                    icon={cilPencil} size="sm"
                                    {...row.getToggleRowSelectedProps()}
                                    onClick={() =>
                                        push(`/categories/${row.original.id}`)
                                    }
                                />
                            </CTooltip>
                            <CTooltip
                                content="Click to view category details."
                                placement="top"
                            >
                                <CIcon
                                    className={classes.delete}
                                    icon={cilTrash} size="sm"
                                    {...row.getToggleRowSelectedProps()}
                                    onClick={() => push(`/categories/${row.original.id}`)}
                                />
                            </CTooltip>
                        </div>
                    ),
                },
            ])
        }
    )

    return (
        <>
            <CModal visible={categoryModal.visible} onClose={() => setCategoryModal({ visible: !categoryModal.visible })}>
                <CModalHeader onClose={() => setCategoryModal({ visible: !categoryModal.visible })}>
                    <CModalTitle>Add a new category</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm className="row g-3 needs-validation" onSubmit={categoryHandler}>
                        <CCol xs={12}>
                            <CCardBody>
                                <CFormFloating>
                                    <CFormInput
                                        type="text"
                                        id="floatingInputValue"
                                        placeholder="name@example.com"
                                        value={name}
                                        onChange={changeNameHandler}
                                    />
                                    <CFormLabel htmlFor="floatingInput">Name</CFormLabel>
                                </CFormFloating>
                                <br />
                                <CFormFloating className="mb-3">
                                    <CFormTextarea
                                        id="floatingTextarea"
                                        placeholder="Leave a comment here"
                                        style={{ height: '100px' }}
                                        value={description}
                                        onChange={changeDescriptionHandler}
                                    ></CFormTextarea>
                                    <CFormLabel htmlFor="floatingInput">Description</CFormLabel>
                                </CFormFloating>
                            </CCardBody>
                        </CCol>
                        <CRow>
                            <CCol xs={6}>
                                <CButton color="primary" type="submit" className="px-4">Submit</CButton>
                            </CCol>
                        </CRow>
                    </CForm>
                </CModalBody>
            </CModal>
            <CCol xs={12}>
                <CButton color="primary" onClick={() => setCategoryModal({ visible: !categoryModal.visible })}>Add Category</CButton>

            </CCol>
            <Table className={classes.table}>
                <TableHead>
                    {headerGroups.map(headerGroup => (
                        <TableRow {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <TableCell {...column.getHeaderProps()}>
                                    {column.render('Header')}
                                    {/* Render the columns filter UI */}
                                    <div>{column.canFilter ? column.render('Filter') : null}</div>
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                    <TableRow>
                        <TableCell
                            colSpan={visibleColumns.length}
                            style={{
                                textAlign: 'left',
                            }}
                        >
                            <GlobalFilter
                                preGlobalFilteredRows={preGlobalFilteredRows}
                                globalFilter={state.globalFilter}
                                setGlobalFilter={setGlobalFilter}
                            />
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {page.map((row, i) => {
                        prepareRow(row)
                        return (
                            <TableRow {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return (
                                        <TableCell {...cell.getCellProps()}>
                                            {cell.render('Cell')}
                                        </TableCell>
                                    )
                                })}
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
            <br />
            <div className="pagination">
                <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                    {'<<'}
                </button>{' '}
                <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                    {'<'}
                </button>{' '}
                <button onClick={() => nextPage()} disabled={!canNextPage}>
                    {'>'}
                </button>{' '}
                <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                    {'>>'}
                </button>{' '}
                <span>
                    Page{' '}
                    <strong>
                        {pageIndex + 1} of {pageOptions.length}
                    </strong>{' '}
                </span>
                <span>
                    | Go to page:{' '}
                    <input
                        type="number"
                        defaultValue={pageIndex + 1}
                        onChange={e => {
                            const page = e.target.value ? Number(e.target.value) - 1 : 0
                            gotoPage(page)
                        }}
                        style={{ width: '100px' }}
                    />
                </span>{' '}
                <select
                    value={pageSize}
                    onChange={e => {
                        setPageSize(Number(e.target.value))
                    }}
                >
                    {[10, 20, 30, 40, 50].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>
            </div>
            <div>Showing the first {page.length} results of {pageOptions.length} rows</div>
        </>
    )
}
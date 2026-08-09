import React, { useMemo, useState } from 'react'
import { CDataGrid } from '@coreui/react-data-grid'
import '@coreui/data-grid/dist/css/data-grid.css'

const firstNames = [
  'Alice',
  'Bob',
  'Carol',
  'Dave',
  'Eve',
  'Frank',
  'Grace',
  'Heidi',
  'Ivan',
  'Judy',
]
const lastNames = [
  'Smith',
  'Jones',
  'Brown',
  'Taylor',
  'Wilson',
  'Davies',
  'Evans',
  'Thomas',
  'Roberts',
  'Walker',
]
const departments = ['Engineering', 'Sales', 'Marketing', 'Support', 'Finance', 'People']
const roles = ['Manager', 'Lead', 'Senior', 'Junior', 'Contractor']
const statuses = ['active', 'invited', 'suspended']
const countries = [
  'Poland',
  'Germany',
  'France',
  'Spain',
  'Italy',
  'United States',
  'United Kingdom',
]
const cities = ['Warsaw', 'Berlin', 'Paris', 'Madrid', 'Rome', 'New York', 'London']

const badges = { active: 'success', invited: 'info', suspended: 'danger' }

const currency = (value) =>
  Number(value).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  })
const date = (value) => new Date(value).toLocaleDateString('en-US')

const buildItems = () =>
  Array.from({ length: 10000 }, (_, i) => ({
    id: i + 1,
    name: `${firstNames[i % firstNames.length]} ${lastNames[i % lastNames.length]}`,
    email: `user${i + 1}@example.com`,
    department: departments[i % departments.length],
    role: roles[i % roles.length],
    status: statuses[i % statuses.length],
    salary: 45000 + (i % 60) * 1500,
    rating: ((i % 9) + 1) / 2,
    projects: (i % 24) + 1,
    country: countries[i % countries.length],
    city: cities[i % cities.length],
    startDate: new Date(2021, i % 12, (i % 28) + 1).toISOString(),
    lastActive: new Date(2026, i % 6, (i % 27) + 1).toISOString(),
    phone: `+1 555 ${String(1000 + (i % 9000))}`,
  }))

const DataGridOverviewExample = () => {
  const initialItems = useMemo(() => buildItems(), [])
  const [items, setItems] = useState(initialItems)

  return (
    <CDataGrid
      columns={[
        { key: 'id', label: '#', width: 72, hideable: false },
        {
          key: 'name',
          label: 'Name',
          width: 180,
          editable: true,
          editValidate: (value) => (value === '' ? 'Name is required' : true),
        },
        { key: 'email', label: 'Email', width: 220 },
        {
          key: 'department',
          label: 'Department',
          width: 150,
          filterType: 'select',
          editable: { type: 'select', options: departments },
        },
        {
          key: 'role',
          label: 'Role',
          width: 130,
          filterType: 'select',
          editable: { type: 'select', options: roles },
        },
        {
          key: 'status',
          label: 'Status',
          width: 130,
          filterType: 'select',
          editable: { type: 'select', options: statuses },
          render: (item) => (
            <span className={`badge text-bg-${badges[item.status]}`}>{item.status}</span>
          ),
        },
        {
          key: 'salary',
          label: 'Salary',
          width: 130,
          filterType: 'number',
          formatter: currency,
          editable: { type: 'number', min: 0 },
        },
        { key: 'rating', label: 'Rating', width: 110, filterType: 'number' },
        { key: 'projects', label: 'Projects', width: 120, filterType: 'number' },
        { key: 'country', label: 'Country', width: 160, filterType: 'select' },
        { key: 'city', label: 'City', width: 150 },
        { key: 'startDate', label: 'Started', width: 140, filterType: 'date', formatter: date },
        {
          key: 'lastActive',
          label: 'Last active',
          width: 140,
          filterType: 'date',
          formatter: date,
        },
        { key: 'phone', label: 'Phone', width: 160 },
      ]}
      items={items}
      itemKey={(item) => String(item.id)}
      columnFilters
      columnMenu
      columnOrder
      columnPinning={{ start: ['id'] }}
      columnSizing
      columnVisibility={{
        projects: false,
        city: false,
        lastActive: false,
        phone: false,
      }}
      rowSelection
      rowOrder
      editing
      sorting={{ multiple: true }}
      pagination={{ pageSize: 20, pageSizeOptions: [10, 20, 50, 100] }}
      toolbar={{
        columns: true,
        export: { filename: 'employees.csv' },
        search: true,
      }}
      onRowOrderChange={(event) => setItems(event.items)}
      onEditCommit={({ item, columnId, value }) =>
        setItems((current) =>
          current.map((row) => (row.id === item.id ? { ...row, [columnId]: value } : row)),
        )
      }
    />
  )
}

export default DataGridOverviewExample

import React, { useMemo } from 'react'
import { CDataGrid } from '@coreui/react-data-grid'

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
const lastNames = ['Smith', 'Jones', 'Brown', 'Taylor', 'Wilson', 'Davies', 'Evans', 'Thomas']
const roles = ['admin', 'editor', 'viewer']
const statuses = ['active', 'pending', 'banned']

const buildItems = () =>
  Array.from({ length: 100000 }, (_, i) => {
    const name = `${firstNames[i % firstNames.length]} ${lastNames[i % lastNames.length]}`
    return {
      id: i + 1,
      name,
      email: `${name.toLowerCase().replace(' ', '.')}${i}@example.com`,
      role: roles[i % roles.length],
      status: statuses[i % statuses.length],
      score: (i * 37) % 1000,
    }
  })

const DataGridVirtualExample = () => {
  const items = useMemo(() => buildItems(), [])

  return (
    <CDataGrid
      columns={[
        { key: 'id', label: '#', width: 90 },
        { key: 'name', label: 'Name', width: 200 },
        { key: 'email', label: 'Email', width: 260 },
        { key: 'role', label: 'Role', width: 110 },
        { key: 'status', label: 'Status', width: 110 },
        { key: 'score', label: 'Score', width: 90 },
      ]}
      items={items}
      itemKey={(item) => String(item.id)}
      columnFilters
      globalFilter
      rowSelection
    />
  )
}

export default DataGridVirtualExample

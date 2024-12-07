import React, { useEffect, useState } from 'react';
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CAvatar,
  CProgress,
} from '@coreui/react';

import { useTableData, useFetchOne } from '../../api/api';

const TableComponent = () => {
  const skipKeys = [
    'type',
    'status',
    'created',
    'updated',
    'updated_by',
    'data',
    'comment_hub',
    'file_hub',
    'gen_hub',
  ];

  const patternsToModify = [
    { pattern: /_for_display/, replacement: '' },
  ];

  const { tableData, loading, error } = useTableData(
    'userconfiguration',
    skipKeys,
    patternsToModify
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return <CTable columns={tableData.columns} items={tableData.items} />;
};

export default TableComponent;
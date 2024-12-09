import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector } from 'react-redux';

const ConnectionSettingGrid = ({  columns }) => {
  const { connectionList} = useSelector((state) => state.connection);

  const rows = connectionList;

  const generateColumnsFromData = (data) => {
    if (!data || data.length === 0) {
      return [];
    }

    const keys = Object.keys(data[0]).filter(key => key !== 'id');
    return keys.map(key => ({
      field: key,
      headerName: key,
      editable: false,
      flex: 1,
      minWidth: 200,
    }));
  }
    return (
        <div style={{ height: 'auto', width: '100%' }}>
            <DataGrid 
              rows={rows} 
              columns={columns } 
              getRowId={(row) => row.id}
            //   pageSize={5} 
              hideFooterPagination
              showCellVerticalBorder
              showColumnVerticalBorder
            />
        </div>
    );
};



export default ConnectionSettingGrid;
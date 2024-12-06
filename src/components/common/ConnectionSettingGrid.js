import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const ConnectionSettingGrid = ({ rows, columns }) => {
    return (
        <div style={{ height: 'auto', width: '100%' }}>
            <DataGrid 
              rows={rows} 
              columns={columns} 
            //   pageSize={5} 
              hideFooterPagination
              showCellVerticalBorder
              showColumnVerticalBorder
            />
        </div>
    );
};



export default ConnectionSettingGrid;
import React, { useState } from 'react';
import { useTablePaginatedData } from '../../api/api';
import Pagination from './Pagination';
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

const TableWithPagination = () => {
    const model = 'appconfiguration';

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
        'comment_hub_for_display',
        'file_hub_for_display',
        'gen_hub_for_display',
    ];

    const patternsToModify = [
        { pattern: /_for_display/, replacement: '' },
    ];

    const { tableData, loading, error, pagination, setPagination } = useTablePaginatedData(model, skipKeys, patternsToModify);

    const handlePageChange = (page) => {
        setPagination((prev) => ({ ...prev, currentPage: page }));
    };

    const handlePageSizeChange = (pageSize) => {
        setPagination((prev) => ({ ...prev, pageSize: pageSize, currentPage: 1}));
    };

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                       {/*  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}> */}
                            <Pagination
                                pagination={pagination}
                                onPageChange={handlePageChange}
                                onPageSizeChange={handlePageSizeChange}
                            />
                       {/*  </div> */}
                        <CTable columns={tableData.columns} items={tableData.items} />
                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
                            {/* <Pagination
                                pagination={pagination}
                                onPageChange={handlePageChange}
                                onPageSizeChange={handlePageSizeChange}
                            /> */}
                        </div>
                    </div>

                </>
            )}
        </div>
    );
};

export default TableWithPagination;

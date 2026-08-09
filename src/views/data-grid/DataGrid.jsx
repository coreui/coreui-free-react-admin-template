import React from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import { DocsDataGrid } from 'src/components'

import DataGridExample from './DataGridExample'
import DataGridOverviewExample from './DataGridOverviewExample'
import DataGridVirtualExample from './DataGridVirtualExample'

const DataGrid = () => (
  <CRow>
    <CCol xs={12}>
      <DocsDataGrid />
      <CCard className="mb-4">
        <CCardHeader>
          <strong>Data Grid</strong>{' '}
          <small>sorting, filtering, row reordering, inline editing &amp; pagination</small>
        </CCardHeader>
        <CCardBody>
          <p className="text-body-secondary">
            This is the kitchen-sink demo: one grid with every interaction feature turned on at
            once, so you can see how they compose. It renders 10,000 rows across fourteen columns —
            four hidden by default — with the{' '}
            <a
              href="https://coreui.io/data-grid/docs/features/toolbar/"
              target="_blank"
              rel="noopener noreferrer"
            >
              toolbar
            </a>
            ,{' '}
            <a
              href="https://coreui.io/data-grid/docs/features/filtering/"
              target="_blank"
              rel="noopener noreferrer"
            >
              per-column filters
            </a>
            , column{' '}
            <a
              href="https://coreui.io/data-grid/docs/columns/sizing/"
              target="_blank"
              rel="noopener noreferrer"
            >
              sizing
            </a>
            ,{' '}
            <a
              href="https://coreui.io/data-grid/docs/columns/pinning/"
              target="_blank"
              rel="noopener noreferrer"
            >
              pinning
            </a>
            ,{' '}
            <a
              href="https://coreui.io/data-grid/docs/columns/ordering-visibility/"
              target="_blank"
              rel="noopener noreferrer"
            >
              ordering &amp; visibility
            </a>
            , the{' '}
            <a
              href="https://coreui.io/data-grid/docs/columns/menu/"
              target="_blank"
              rel="noopener noreferrer"
            >
              column menu
            </a>
            ,{' '}
            <a
              href="https://coreui.io/data-grid/docs/features/row-selection/"
              target="_blank"
              rel="noopener noreferrer"
            >
              row selection
            </a>
            , multi-column{' '}
            <a
              href="https://coreui.io/data-grid/docs/features/sorting/"
              target="_blank"
              rel="noopener noreferrer"
            >
              sorting
            </a>{' '}
            and{' '}
            <a
              href="https://coreui.io/data-grid/docs/features/pagination/"
              target="_blank"
              rel="noopener noreferrer"
            >
              pagination
            </a>{' '}
            — plus drag-and-drop{' '}
            <a
              href="https://coreui.io/data-grid/docs/features/row-reordering/"
              target="_blank"
              rel="noopener noreferrer"
            >
              row reordering
            </a>{' '}
            and inline{' '}
            <a
              href="https://coreui.io/data-grid/docs/features/editing/"
              target="_blank"
              rel="noopener noreferrer"
            >
              cell editing
            </a>{' '}
            on top.
            <br />
            <br />
            Every one of these is a single option, documented on its own page in the{' '}
            <a
              href="https://coreui.io/data-grid/docs/features/overview/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Data Grid docs
            </a>{' '}
            — this demo just enables them together.
          </p>
          <DataGridExample href="https://coreui.io/data-grid/docs/features/overview/">
            <DataGridOverviewExample />
          </DataGridExample>
        </CCardBody>
      </CCard>
      <CCard className="mb-4">
        <CCardHeader>
          <strong>Data Grid</strong> <small>virtualization</small>
        </CCardHeader>
        <CCardBody>
          <p className="text-body-secondary">
            Only the visible window of rows exists in the DOM — scroll, sort, filter and select
            across the full dataset. This live demo runs on 100,000 generated rows, tuned by the{' '}
            <a
              href="https://coreui.io/data-grid/docs/features/virtualization/"
              target="_blank"
              rel="noopener noreferrer"
            >
              rowHeight and overscan options
            </a>
            . For datasets larger than browser memory, hand paging to your backend with{' '}
            <a
              href="https://coreui.io/data-grid/docs/features/server-side-data/"
              target="_blank"
              rel="noopener noreferrer"
            >
              server-side data
            </a>{' '}
            — see the{' '}
            <a
              href="https://coreui.io/data-grid/docs/guides/performance/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Performance guide
            </a>{' '}
            for tuning advice.
          </p>
          <DataGridExample href="https://coreui.io/data-grid/docs/features/virtualization/">
            <DataGridVirtualExample />
          </DataGridExample>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
)

export default DataGrid

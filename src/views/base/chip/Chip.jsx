import { CCard, CCardBody, CCardHeader, CChip, CCol, CRow } from '@coreui/react'
import { DocsComponents, DocsExample } from 'src/components'

import avatar1 from 'src/assets/images/avatars/1.jpg'
import avatar4 from 'src/assets/images/avatars/4.jpg'

const Chip = () => {
  return (
    <CRow>
      <CCol xs={12}>
        <DocsComponents href="components/chip/" />
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Chip</strong> <small>Basic and outline</small>
          </CCardHeader>
          <CCardBody>
            <p className="text-body-secondary small">
              Chips are compact UI elements for labels, filters, and quick selections. Use the{' '}
              <code>CChip</code> component with optional <code>variant</code> prop.
            </p>
            <DocsExample href="components/chip/#basic-chips">
              <div className="d-flex flex-wrap gap-2">
                <CChip>Basic chip</CChip>
                <CChip>Frontend</CChip>
                <CChip>Design system</CChip>
                <CChip>Documentation</CChip>
              </div>
            </DocsExample>
            <p className="text-body-secondary small">
              Add <code>variant=&#34;outline&#34;</code> to create a lighter, bordered appearance.
            </p>
            <DocsExample href="components/chip/#outline-chips">
              <div className="d-flex flex-wrap gap-2">
                <CChip variant="outline">Outline chip</CChip>
                <CChip variant="outline">Product</CChip>
                <CChip variant="outline">Marketing</CChip>
                <CChip variant="outline">Analytics</CChip>
              </div>
            </DocsExample>
          </CCardBody>
        </CCard>

        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Chip</strong> <small>With icons and avatars</small>
          </CCardHeader>
          <CCardBody>
            <p className="text-body-secondary small">
              Chips can include icons, user avatars, or avatar components to make tags easier to
              scan.
            </p>
            <DocsExample href="components/chip/#chips-with-icons">
              <div className="d-flex flex-wrap gap-2">
                <CChip>
                  <span className="chip-icon">
                    <svg
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                      aria-hidden="true"
                    >
                      <path d="M8 1a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm-5 12s0-3 5-3 5 3 5 3v1H3v-1Z" />
                    </svg>
                  </span>{' '}
                  Team member
                </CChip>
                <CChip>
                  <span className="chip-icon">
                    <svg
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                      aria-hidden="true"
                    >
                      <path d="M2 2h12v2H2V2Zm0 5h8v2H2V7Zm0 5h12v2H2v-2Z" />
                    </svg>
                  </span>{' '}
                  Backlog item
                </CChip>
              </div>
            </DocsExample>
            <DocsExample href="components/chip/#chips-with-avatars">
              <div className="d-flex flex-wrap gap-2">
                <CChip>
                  <img className="chip-img" src={avatar1} width="16" height="16" alt="" /> Olivia
                  Martin
                </CChip>
                <CChip>
                  <img className="chip-img" src={avatar4} width="16" height="16" alt="" /> Ethan
                  Carter
                </CChip>
                <CChip>
                  <span className="avatar avatar-sm bg-primary text-white">A</span> Account manager
                </CChip>
                <CChip>
                  <span className="avatar avatar-sm bg-success text-white">Q</span> QA owner
                </CChip>
              </div>
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>

      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Chip</strong> <small>Variants and sizes</small>
          </CCardHeader>
          <CCardBody>
            <p className="text-body-secondary small">
              Use the <code>color</code> prop for contextual variants and the <code>size</code> prop
              for different sizes.
            </p>
            <DocsExample href="components/chip/#variants">
              <div className="d-flex flex-wrap gap-2 mb-3">
                <CChip color="primary" clickable>
                  Product
                </CChip>
                <CChip color="primary" active>
                  Active product
                </CChip>
                <CChip color="success" clickable>
                  Published
                </CChip>
                <CChip color="success" active>
                  Live
                </CChip>
                <CChip color="warning" clickable>
                  Review
                </CChip>
                <CChip color="danger" active>
                  Blocked
                </CChip>
              </div>
              <div className="d-flex flex-wrap gap-2">
                <CChip size="sm">Small chip</CChip>
                <CChip>Default chip</CChip>
                <CChip size="lg">Large chip</CChip>
                <CChip variant="outline" color="primary" clickable>
                  Outline primary
                </CChip>
              </div>
            </DocsExample>
          </CCardBody>
        </CCard>

        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Chip</strong> <small>Interactive examples</small>
          </CCardHeader>
          <CCardBody>
            <p className="text-body-secondary small">
              Chips support selection, removal, and disabled states using props like{' '}
              <code>selectable</code>, <code>removable</code>, and <code>disabled</code>.
            </p>
            <DocsExample href="components/chip/#interactive">
              <div className="d-flex flex-wrap gap-2 mb-3">
                <CChip selectable>Selectable</CChip>
                <CChip selectable selected>
                  Selected
                </CChip>
                <CChip removable>Removable</CChip>
                <CChip disabled>Disabled</CChip>
              </div>
              <div className="d-flex flex-wrap gap-2">
                <CChip size="lg" removable>
                  Team Alpha
                </CChip>
                <CChip variant="outline" color="info" selectable>
                  Filter: Priority
                </CChip>
                <CChip variant="outline" color="success" selectable selected>
                  Filter: Ready
                </CChip>
              </div>
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Chip

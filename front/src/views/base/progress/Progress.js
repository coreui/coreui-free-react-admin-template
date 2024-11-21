import React from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CProgress, CProgressBar, CRow } from '@coreui/react'
import { DocsExample } from 'src/components'

const Progress = () => {
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Progress</strong> <small>Basic example</small>
          </CCardHeader>
          <CCardBody>
            <p className="text-body-secondary small">
              Progress components are built with two HTML elements, some CSS to set the width, and a
              few attributes. We don&#39;tuse{' '}
              <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/progress">
                the HTML5 <code>&lt;progress&gt;</code> element
              </a>
              , ensuring you can stack progress bars, animate them, and place text labels over them.
            </p>
            <DocsExample href="components/progress">
              <CProgress className="mb-3">
                <CProgressBar value={0} />
              </CProgress>
              <CProgress className="mb-3">
                <CProgressBar value={25} />
              </CProgress>
              <CProgress className="mb-3">
                <CProgressBar value={50} />
              </CProgress>
              <CProgress className="mb-3">
                <CProgressBar value={75} />
              </CProgress>
              <CProgress className="mb-3">
                <CProgressBar value={100} />
              </CProgress>
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Progress</strong> <small>Labels</small>
          </CCardHeader>
          <CCardBody>
            <p className="text-body-secondary small">
              Add labels to your progress bars by placing text within the{' '}
              <code>&lt;CProgressBar&gt;</code>.
            </p>
            <DocsExample href="components/progress#labels">
              <CProgress className="mb-3">
                <CProgressBar value={25}>25%</CProgressBar>
              </CProgress>
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Progress</strong> <small>Height</small>
          </CCardHeader>
          <CCardBody>
            <p className="text-body-secondary small">
              We only set a <code>height</code> value on the <code>&lt;CProgress&gt;</code>, so if
              you change that value the inner <code>&lt;CProgressBar&gt;</code> will automatically
              resize accordingly.
            </p>
            <DocsExample href="components/progress#height">
              <CProgress height={1} className="mb-3">
                <CProgressBar value={25}></CProgressBar>
              </CProgress>
              <CProgress height={20} className="mb-3">
                <CProgressBar value={25}></CProgressBar>
              </CProgress>
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Progress</strong> <small>Backgrounds</small>
          </CCardHeader>
          <CCardBody>
            <p className="text-body-secondary small">
              Use <code>color</code> prop to change the appearance of individual progress bars.
            </p>
            <DocsExample href="components/progress#backgrounds">
              <CProgress className="mb-3">
                <CProgressBar color="success" value={25} />
              </CProgress>
              <CProgress className="mb-3">
                <CProgressBar color="info" value={50} />
              </CProgress>
              <CProgress className="mb-3">
                <CProgressBar color="warning" value={75} />
              </CProgress>
              <CProgress className="mb-3">
                <CProgressBar color="danger" value={100} />
              </CProgress>
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Progress</strong> <small>Multiple bars</small>
          </CCardHeader>
          <CCardBody>
            <p className="text-body-secondary small">
              Include multiple progress bars in a progress component if you need.
            </p>
            <DocsExample href="components/progress#multiple-bars">
              <CProgress className="mb-3">
                <CProgressBar value={15} />
                <CProgressBar color="success" value={30} />
                <CProgressBar color="info" value={20} />
              </CProgress>
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Progress</strong> <small>Striped</small>
          </CCardHeader>
          <CCardBody>
            <p className="text-body-secondary small">
              Add <code>variant=&#34;striped&#34;</code> to any <code>&lt;CProgressBar&gt;</code> to
              apply a stripe via CSS gradient over the progress bar&#39;s background color.
            </p>
            <DocsExample href="components/progress#striped">
              <CProgress className="mb-3">
                <CProgressBar color="success" variant="striped" value={25} />
              </CProgress>
              <CProgress className="mb-3">
                <CProgressBar color="info" variant="striped" value={50} />
              </CProgress>
              <CProgress className="mb-3">
                <CProgressBar color="warning" variant="striped" value={75} />
              </CProgress>
              <CProgress className="mb-3">
                <CProgressBar color="danger" variant="striped" value={100} />
              </CProgress>
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Progress</strong> <small>Animated stripes</small>
          </CCardHeader>
          <CCardBody>
            <p className="text-body-secondary small">
              The striped gradient can also be animated. Add <code>animated</code> property to{' '}
              <code>&lt;CProgressBar&gt;</code> to animate the stripes right to left via CSS3
              animations.
            </p>
            <DocsExample href="components/progress#animated-stripes">
              <CProgress className="mb-3">
                <CProgressBar color="success" variant="striped" animated value={25} />
              </CProgress>
              <CProgress className="mb-3">
                <CProgressBar color="info" variant="striped" animated value={50} />
              </CProgress>
              <CProgress className="mb-3">
                <CProgressBar color="warning" variant="striped" animated value={75} />
              </CProgress>
              <CProgress className="mb-3">
                <CProgressBar color="danger" variant="striped" animated value={100} />
              </CProgress>
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Progress

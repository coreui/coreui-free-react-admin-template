import React, { useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CAccordion,
  CAccordionBody,
  CAccordionButton,
  CAccordionCollapse,
  CAccordionHeader,
  CAccordionItem,
} from '@coreui/react'
import { DocsCallout, Example } from 'src/reusable'

const Accordion = () => {
  const [activeKey, setActiveKey] = useState(0)
  const [activeKey2, setActiveKey2] = useState(0)

  return (
    <CRow>
      <CCol xs={12}>
        <DocsCallout name="Accordion" href="components/accordion" />
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Accordion</strong>
          </CCardHeader>
          <CCardBody>
            <p className="text-medium-emphasis small">
              Click the accordions below to expand/collapse the accordion content.
            </p>
            <Example href="components/accordion">
              <CAccordion>
                <CAccordionItem>
                  <CAccordionHeader>
                    <CAccordionButton
                      collapsed={activeKey !== 1}
                      onClick={() => (activeKey === 1 ? setActiveKey(0) : setActiveKey(1))}
                    >
                      Accordion Item #1
                    </CAccordionButton>
                  </CAccordionHeader>
                  <CAccordionCollapse visible={activeKey === 1}>
                    <CAccordionBody>
                      <strong>This is the first item&#39;s accordion body.</strong> It is hidden by
                      default, until the collapse plugin adds the appropriate classes that we use to
                      style each element. These classes control the overall appearance, as well as
                      the showing and hiding via CSS transitions. You can modify any of this with
                      custom CSS or overriding our default variables. It&#39;s also worth noting
                      that just about any HTML can go within the <code>.accordion-body</code>,
                      though the transition does limit overflow.
                    </CAccordionBody>
                  </CAccordionCollapse>
                </CAccordionItem>
                <CAccordionItem>
                  <CAccordionHeader>
                    <CAccordionButton
                      collapsed={activeKey !== 2}
                      onClick={() => (activeKey === 2 ? setActiveKey(0) : setActiveKey(2))}
                    >
                      Accordion Item #2
                    </CAccordionButton>
                  </CAccordionHeader>
                  <CAccordionCollapse visible={activeKey === 2}>
                    <CAccordionBody>
                      <strong>This is the second item&#39;s accordion body.</strong> It is hidden by
                      default, until the collapse plugin adds the appropriate classes that we use to
                      style each element. These classes control the overall appearance, as well as
                      the showing and hiding via CSS transitions. You can modify any of this with
                      custom CSS or overriding our default variables. It&#39;s also worth noting
                      that just about any HTML can go within the <code>.accordion-body</code>,
                      though the transition does limit overflow.
                    </CAccordionBody>
                  </CAccordionCollapse>
                </CAccordionItem>
                <CAccordionItem>
                  <CAccordionHeader>
                    <CAccordionButton
                      collapsed={activeKey !== 3}
                      onClick={() => (activeKey === 3 ? setActiveKey(0) : setActiveKey(3))}
                    >
                      Accordion Item #3
                    </CAccordionButton>
                  </CAccordionHeader>
                  <CAccordionCollapse visible={activeKey === 3}>
                    <CAccordionBody>
                      <strong>This is the third item&#39;s accordion body.</strong> It is hidden by
                      default, until the collapse plugin adds the appropriate classes that we use to
                      style each element. These classes control the overall appearance, as well as
                      the showing and hiding via CSS transitions. You can modify any of this with
                      custom CSS or overriding our default variables. It&#39;s also worth noting
                      that just about any HTML can go within the <code>.accordion-body</code>,
                      though the transition does limit overflow.
                    </CAccordionBody>
                  </CAccordionCollapse>
                </CAccordionItem>
              </CAccordion>
            </Example>
          </CCardBody>
        </CCard>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Accordion</strong> <small>Flush</small>
          </CCardHeader>
          <CCardBody>
            <p className="text-medium-emphasis small">
              Add <code>flush</code> to remove the default <code>background-color</code>, some
              borders, and some rounded corners to render accordions edge-to-edge with their parent
              container.
            </p>
            <Example href="components/accordion#flush">
              <CAccordion flush>
                <CAccordionItem>
                  <CAccordionHeader>
                    <CAccordionButton
                      collapsed={activeKey2 !== 1}
                      onClick={() => (activeKey2 === 1 ? setActiveKey2(0) : setActiveKey2(1))}
                    >
                      Accordion Item #1
                    </CAccordionButton>
                  </CAccordionHeader>
                  <CAccordionCollapse visible={activeKey2 === 1}>
                    <CAccordionBody>
                      <strong>This is the first item&#39;s accordion body.</strong> It is hidden by
                      default, until the collapse plugin adds the appropriate classes that we use to
                      style each element. These classes control the overall appearance, as well as
                      the showing and hiding via CSS transitions. You can modify any of this with
                      custom CSS or overriding our default variables. It&#39;s also worth noting
                      that just about any HTML can go within the <code>.accordion-body</code>,
                      though the transition does limit overflow.
                    </CAccordionBody>
                  </CAccordionCollapse>
                </CAccordionItem>
                <CAccordionItem>
                  <CAccordionHeader>
                    <CAccordionButton
                      collapsed={activeKey2 !== 2}
                      onClick={() => (activeKey2 === 2 ? setActiveKey2(0) : setActiveKey2(2))}
                    >
                      Accordion Item #2
                    </CAccordionButton>
                  </CAccordionHeader>
                  <CAccordionCollapse visible={activeKey2 === 2}>
                    <CAccordionBody>
                      <strong>This is the second item&#39;s accordion body.</strong> It is hidden by
                      default, until the collapse plugin adds the appropriate classes that we use to
                      style each element. These classes control the overall appearance, as well as
                      the showing and hiding via CSS transitions. You can modify any of this with
                      custom CSS or overriding our default variables. It&#39;s also worth noting
                      that just about any HTML can go within the <code>.accordion-body</code>,
                      though the transition does limit overflow.
                    </CAccordionBody>
                  </CAccordionCollapse>
                </CAccordionItem>
                <CAccordionItem>
                  <CAccordionHeader>
                    <CAccordionButton
                      collapsed={activeKey2 !== 3}
                      onClick={() => (activeKey2 === 3 ? setActiveKey2(0) : setActiveKey2(3))}
                    >
                      Accordion Item #3
                    </CAccordionButton>
                  </CAccordionHeader>
                  <CAccordionCollapse visible={activeKey2 === 3}>
                    <CAccordionBody>
                      <strong>This is the third item&#39;s accordion body.</strong> It is hidden by
                      default, until the collapse plugin adds the appropriate classes that we use to
                      style each element. These classes control the overall appearance, as well as
                      the showing and hiding via CSS transitions. You can modify any of this with
                      custom CSS or overriding our default variables. It&#39;s also worth noting
                      that just about any HTML can go within the <code>.accordion-body</code>,
                      though the transition does limit overflow.
                    </CAccordionBody>
                  </CAccordionCollapse>
                </CAccordionItem>
              </CAccordion>
            </Example>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Accordion

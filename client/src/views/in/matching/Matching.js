/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import { CNav, CNavItem, CNavLink, CTabContent, CTabPane } from '@coreui/react'
import OpenMatching from './OpenMatching'

const Matching = () => {
  const [opened, setOpened] = useState(false)
  const [page, setPage] = useState(1)
  return opened ? (
    <div className="matching bg-white border-2 mx-3">
      <CNav variant="pills" role="tablist" layout="justified">
        <CNavItem>
          <CNavLink href="javascript:void(0);" active={page === 1} onClick={() => setPage(1)}>
            配對結果
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink href="javascript:void(0);" active={page === 2} onClick={() => setPage(2)}>
            申請結果回報
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink href="javascript:void(0);" active={page === 3} onClick={() => setPage(3)}>
            申請心得精華區
          </CNavLink>
        </CNavItem>
      </CNav>
      <hr />
      <CTabContent>
        <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={page === 1}>
          配對結果在這
        </CTabPane>
        <CTabPane role="tabpanel" aria-labelledby="profile-tab" visible={page === 2}>
          申請結果在這
        </CTabPane>
        <CTabPane role="tabpanel" aria-labelledby="contact-tab" visible={page === 3}>
          申請心得在這
        </CTabPane>
      </CTabContent>
    </div>
  ) : (
    <OpenMatching setOpened={setOpened} />
  )
}

export default Matching

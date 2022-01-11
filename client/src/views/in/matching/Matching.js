/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import { CNav, CNavItem, CNavLink, CTabContent, CTabPane } from '@coreui/react'
import OpenMatching from './OpenMatching'
import MatchResult from './MatchResult'
import Experience from './Experience'

const Matching = () => {
  const [opened, setOpened] = useState(false)
  const [page, setPage] = useState(1)
  const sdata = {
    num: 'B03901023 ',
    name: '許秉鈞',
    school: 'Stanford University',
    department: 'EE MS',
    field: ['通信', '電波', '計算機'],
    gpa: 4.3,
    mail: 'b03901023@ntu.edu.tw',
    image: 'https://picsum.photos/200',
  }
  const jdata = {
    num: 'b09901072',
    name: '巫竑儒',
    field: ['通信', '電波', '量子電腦'],
    gpa: 4.28,
    mail: 'b09901072@ntu.edu.tw',
    image: 'https://picsum.photos/300',
  }
  return opened ? (
    <div className="matching mx-auto mt-5 w-75 pb-3">
      <CNav className="mb-4" variant="tabs" role="tablist" layout="justified">
        <CNavItem>
          <CNavLink href="javascript:void(0);" active={page === 1} onClick={() => setPage(1)}>
            配對結果
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink href="javascript:void(0);" active={page === 2} onClick={() => setPage(2)}>
            申請心得精華區
          </CNavLink>
        </CNavItem>
      </CNav>
      <CTabContent>
        <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={page === 1}>
          <MatchResult jdata={jdata} sdata={sdata} />
        </CTabPane>
        <CTabPane role="tabpanel" aria-labelledby="contact-tab" visible={page === 2}>
          <Experience />
        </CTabPane>
      </CTabContent>
    </div>
  ) : (
    <OpenMatching setOpened={setOpened} />
  )
}

export default Matching

/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react'
import { CNav, CNavItem, CNavLink, CTabContent, CTabPane } from '@coreui/react'
import axios from 'axios'
import OpenMatching from './OpenMatching'
import MatchResult from './MatchResult'
import Experience from './Experience'
import Spinner from '../../components/Spinner'

const Matching = () => {
  const [jdata, setJdata] = useState({})
  const [sdata, setSdata] = useState({})
  const [identity, setIdentity] = useState('')
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const checkOpen = () => {
    axios
      .get('/api/study/form')
      .then((res) => {
        setIdentity(res.data.identity)
        if (res.data.identity === 'senior') setSdata(res.data)
        else if (res.data.identity === 'junior') setJdata(res.data)
        else setLoading(false)
      })
      .catch(
        (err) => err.response.data.description && alert('錯誤\n' + err.response.data.description),
      )
  }
  const checkResult = () => {
    axios
      .get('/api/study/result')
      .then((res) => {
        if (identity === 'junior') {
          setSdata(res.data)
          setLoading(false)
        }
        if (identity === 'senior') {
          setJdata(res.data)
          setLoading(false)
        }
      })
      .catch((err) => {
        console.log('Error while fetching match results')
      })
  }
  useEffect(() => {
    checkOpen()
  }, [])

  useEffect(() => {
    checkResult()
  }, [identity])
  return loading ? (
    <Spinner />
  ) : identity ? (
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
          <MatchResult jdata={jdata} sdata={sdata} identity={identity} prepared={setLoading} />
        </CTabPane>
        <CTabPane role="tabpanel" aria-labelledby="contact-tab" visible={page === 2}>
          <Experience />
        </CTabPane>
      </CTabContent>
    </div>
  ) : (
    <OpenMatching />
  )
}

export default Matching

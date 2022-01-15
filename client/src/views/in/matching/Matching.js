/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react'
import { CNav, CNavItem, CNavLink, CTabContent, CTabPane } from '@coreui/react'
import axios from 'axios'
import OpenMatching from './OpenMatching'
import MatchResult from './MatchResult'
import Experience from './Experience'
import Spinner from '../../components/Spinner'

const earlier = (t1, t2) => {
  const time1 = Date.parse(t1)
  const time2 = Date.parse(new Date(t2[0], Number(t2[1]) - 1, t2[2], t2[3], t2[4], 0, 0))
  return time1 < time2
}

const Matching = () => {
  const [startTime, setStartTime] = useState()
  const [endTime, setEndTime] = useState()
  const [jdata, setJdata] = useState({})
  const [sdata, setSdata] = useState({})
  const [identity, setIdentity] = useState('')
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const getTime = async () => {
    axios.get('/api/time/getTime', { params: { target: 'matching_start' } }).then((res) => {
      const [year, month, day, h_m] = res.data.split('-')
      const [hour, min] = h_m.split(':')
      setStartTime(() => [year, month, day, hour, min])
    })
    axios.get('/api/time/getTime', { params: { target: 'matching_end' } }).then((res) => {
      const [year, month, day, h_m] = res.data.split('-')
      const [hour, min] = h_m.split(':')
      setEndTime(() => [year, month, day, hour, min])
    })
  }
  const checkOpen = async () => {
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
  const checkResult = async () => {
    axios
      .get('/api/study/result')
      .then((res) => {
        if (identity === 'junior') {
          setSdata(res.data)
        }
        if (identity === 'senior') {
          setJdata(res.data)
        }
        setLoading(false)
      })
      .catch((err) => {
        console.log('Error while fetching match results')
      })
  }
  useEffect(() => {
    getTime()
  }, [])

  useEffect(() => {
    if (!startTime || !endTime) return
    checkOpen()
  }, [startTime, endTime])

  useEffect(() => {
    if (!identity) return
    checkResult()
  }, [identity])
  return loading ? (
    <Spinner />
  ) : (
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
          {earlier(Date(), startTime) || !earlier(Date(), endTime) ? (
            <div>
              {earlier(Date(), startTime) ? (
                <h2>抱歉，配對表單填寫尚未開始</h2>
              ) : (
                <h2>抱歉，配對表單填寫已經結束</h2>
              )}
              <h3>
                本期表單開放時間: {startTime[0]}/{startTime[1]}/{startTime[2]} {startTime[3]}:
                {startTime[4]} ~ {endTime[0]}/{endTime[1]}/{endTime[2]} {endTime[3]}:{endTime[4]}
              </h3>
            </div>
          ) : (
            <div className="d-flex align-items-center m-4 justify-content-around p-2 result-block">
              {identity ? (
                <MatchResult
                  jdata={jdata}
                  sdata={sdata}
                  identity={identity}
                  ended={!earlier(Date(), endTime)}
                />
              ) : (
                <>
                  <h2>
                    本期表單開放時間: {startTime[0]}/{startTime[1]}/{startTime[2]} {startTime[3]}:
                    {startTime[4]} ~ {endTime[0]}/{endTime[1]}/{endTime[2]} {endTime[3]}:
                    {endTime[4]}
                  </h2>
                  <OpenMatching />
                </>
              )}
            </div>
          )}
        </CTabPane>
        <CTabPane role="tabpanel" aria-labelledby="contact-tab" visible={page === 2}>
          <Experience />
        </CTabPane>
      </CTabContent>
    </div>
  )
}

export default Matching

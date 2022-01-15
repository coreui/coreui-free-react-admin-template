/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
  CInputGroup,
  CInputGroupText,
  CFormControl,
} from '@coreui/react'
import axios from 'axios'
import Spinner from '../../components/Spinner'
const RunMatch = ({ hasSent, setHasSent, setHasMatched }) => {
  const [isModal, setIsModal] = useState(false)
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [newStartTime, setNewStartTime] = useState('')
  const [newEndTime, setNewEndTime] = useState('')
  const [snumber, setSnumber] = useState(0)
  const [jnumber, setJnumber] = useState(0)
  const [loading, setLoading] = useState(true)
  const [pass, setPass] = useState(false)
  const nowDate = new Date()
  const match = () => {
    axios
      .get('/api/study/matching', { responseType: 'blob' })
      .then((res) => {
        console.log('res', res)
        const url = window.URL.createObjectURL(new Blob([res.data]))
        console.log('url', url)
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', 'output.xlsx')
        document.body.appendChild(link)
        link.click()
      })
      .then(() => {
        console.log('finish match!')
        setHasMatched(true)
        setHasSent(false)
      })
      .catch((err) => console.log(err))
  }
  const getMatchInfo = () => {
    axios
      .get('/api/time/getTime', { params: { target: 'matching_start' } })
      .then((res) => {
        setStartTime(res.data)
      })
      .catch((err) => console.log(err))
    axios
      .get('/api/time/getTime', { params: { target: 'matching_end' } })
      .then((res) => {
        setEndTime(res.data)
        const realDate = res.data.substring(0, 10) + 'T' + res.data.substring(11, 16)
        if (new Date(realDate).getTime() < nowDate) setPass(true)
      })
      .catch((err) => console.log(err))
    axios
      .get('/api/study/allForms')
      .then((res) => {
        setSnumber(res.data.seniorCount)
        setJnumber(res.data.juniorCount)
      })
      .then(() => setLoading(false))
      .catch((err) => console.log(err))
  }
  const setMatchTime = () => {
    axios
      .post('/api/time/setTime', { target: 'matching_start', time: newStartTime })
      .then(() => console.log('set start time'))
      .catch((err) => console.log(err))
    axios
      .post('/api/time/setTime', { target: 'matching_end', time: newEndTime })
      .then(() => {
        console.log('set end time')
        hasSent ? setHasSent(false) : getMatchInfo()
      })
      .catch((err) => console.log(err))
  }
  const clearDB = () => {
    axios
      .delete('/api/study/form')
      .then(() => console.log('clear all form!'))
      .catch((e) => console.log(e))
  }
  useEffect(() => {
    getMatchInfo()
  }, [hasSent])
  const startNewMatch = () => {
    if (newStartTime === '') alert('請輸入起始日期')
    if (newEndTime === '') alert('請輸入截止日期')
    setMatchTime()
    clearDB()
    setIsModal(false)
  }
  return loading ? (
    <Spinner />
  ) : (
    <>
      <CModal size="lg" visible={isModal} onDismiss={() => setIsModal(false)} alignment="center">
        <CModalHeader onDismiss={() => setIsModal(false)}>
          <CModalTitle>開啟新一期配對</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <h3 className="mb-2">請選擇新一期的起始與結束時間：</h3>
          <CInputGroup className="mb-4">
            <CInputGroupText>起始日期</CInputGroupText>
            <CFormControl
              type="date"
              onChange={(e) => {
                if (
                  new Date(e.target.value) < nowDate ||
                  new Date(e.target.value) > new Date(newEndTime)
                ) {
                  e.target.value = ''
                  setNewStartTime('')
                  alert('無效的起始日期')
                  return
                }
                setNewStartTime(e.target.value)
              }}
            />
          </CInputGroup>
          <CInputGroup className="mb-4">
            <CInputGroupText>截止日期</CInputGroupText>
            <CFormControl
              type="date"
              onChange={(e) => {
                if (
                  new Date(e.target.value) < new Date(newStartTime) ||
                  !new Date(e.target.value) > nowDate
                ) {
                  e.target.value = ''
                  setNewEndTime('')
                  alert('無效的截止日期')
                  return
                }
                setNewEndTime(e.target.value)
              }}
            />
          </CInputGroup>
        </CModalBody>
        <CModalFooter>
          <CButton color="warning" onClick={() => setIsModal(false)}>
            Cancel
          </CButton>
          <CButton color="dark" onClick={startNewMatch}>
            Yes
          </CButton>
        </CModalFooter>
      </CModal>
      <div className="run-match">
        <h2 style={{ lineHeight: '2.5rem' }}>
          本期的配對時間為
          <br />
          <span className="text-danger">
            {startTime} ~ {endTime}
          </span>
          <br />
          請在截止日後配對學長姐與學弟妹
          <br />
          {pass ? `目前共有${jnumber}名學弟妹以及${snumber}名學長姐在等待您的配對結果` : ''}
        </h2>
        <button className="btn btn-primary" disabled={!pass} onClick={() => match()}>
          <h5 className="m-0">點我{setHasMatched ? '重新' : '開始'}配對並下載結果</h5>
        </button>
        <br />
        <br />
        <h2>
          {hasSent
            ? '若要開啟一期新配對，請點下方按鈕'
            : '要先將本期的配對結果寄給大家後才能再開一期喔~'}
        </h2>
        <button
          className="btn btn-danger mt-3"
          disabled={!hasSent && (snumber !== 0 || jnumber !== 0)}
          onClick={() => setIsModal(true)}
        >
          <h5 className="m-0">我要開新的一期</h5>
        </button>
      </div>
    </>
  )
}
RunMatch.propTypes = {
  hasSent: PropTypes.bool,
  setHasSent: PropTypes.func,
  setHasMatched: PropTypes.func,
}
export default RunMatch

/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react'
import Applicant from './Applicant'
import axios from 'axios'
import { CModal, CModalBody, CModalHeader, CModalFooter, CModalTitle, CButton } from '@coreui/react'
import { Spinner } from './index'
const Register = () => {
  const [isModal, setIsModal] = useState(false)
  const [modalPerson, setModalPerson] = useState({
    username: '',
    account: '',
    email: '',
    imgSrc: '',
  })
  const [isPending, setIsPending] = useState(true)
  const [applicants, setApplicants] = useState([])
  const getPendings = () => {
    setIsPending(true)
    axios
      .post('/api/showPending')
      .then((res) => {
        console.log('pendings:', res.data.pendings.length)
        setApplicants(res.data.pendings)
        setIsPending(false)
      })
      .catch((err) => console.log(err))
  }
  const verify = () => {
    axios
      .post('/api/handlePending', { account: modalPerson.account, acceptUser: true })
      .then((res) => {
        alert('已發送驗證信至對方信箱！')
        setIsModal(false)
        getPendings()
      }).catch(err=>console.log(err))
    }
    const reject = () => {
    axios
      .post('/api/handlePending', { account: modalPerson.account, acceptUser: false })
      .then((res) => {
        alert('已發送拒絕申請信至對方信箱！')
        setIsModal(false)
        getPendings()
      }).catch(err=>console.log(err))
  }
  useEffect(() => {
    getPendings()
  }, [])
  return isPending ? (
    <Spinner />
  ) : (
    <>
      <CModal></CModal>
      <CModal size="lg" visible={isModal} onDismiss={() => setIsModal(false)} alignment="center">
        <CModalHeader onDismiss={() => setIsModal(false)}>
          <CModalTitle>驗證身分</CModalTitle>
        </CModalHeader>
        <CModalBody className="d-flex flex-column justify-content-center align-items-center h3">
          姓名：{modalPerson.username}
          <br />
          學號：{modalPerson.account}
          <br />
          信箱：{modalPerson.email}
          <br />
          <img src={modalPerson.imgSrc} alt="" style={{ width: '48rem', margin: '1rem' }} />
        </CModalBody>
        <CModalFooter>
          <CButton color="warning" onClick={()=>reject()}>
            拒絕申請
          </CButton>
          <CButton color="dark" onClick={()=>verify()}>
            同意申請
          </CButton>
        </CModalFooter>
      </CModal>
      <div className="auth-register mx-auto w-75 py-3">
        {applicants.length ? (
          <>
            <h1 className="mt-3">底下為待您確認的註冊申請：</h1>
            {applicants.map((a, i) => (
              <Applicant
                person={a}
                key={i}
                setIsModal={setIsModal}
                setModalPerson={setModalPerson}
              />
            ))}
          </>
        ) : (
          <h1>目前無新的確認申請！</h1>
        )}
      </div>
    </>
  )
}

export default Register

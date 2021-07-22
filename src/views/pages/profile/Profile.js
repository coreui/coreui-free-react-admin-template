import React, { useState } from 'react'
// import './profile.css'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormControl,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'

const Profile = () => {
  const [data, setData] = useState({
    account: {
      show: true,
      data: 'B08901072',
    },
    username: {
      show: true,
      data: 'Tim Wang',
    },
    nickname: {
      show: true,
      data: '提姆',
    },
    profile: {
      show: true,
      data: '一人救全系', //自介
    },
    education: {
      major: {
        show: true,
        SD: 'NTUEE', //school and department
        Note: '', //一些備註，如：畢業、在學....
      },
      double_major: {
        show: true,
        SD: '', //school and department
        Note: '', //一些備註，如：畢業、在學....
      },
      minor: {
        show: true,
        SD: '', //school and department
        Note: '', //一些備註，如：畢業、在學....
      },
      master: {
        show: true,
        SD: '', //school and department
        Note: '', //一些備註，如：畢業、在學....
      },
      doctor: {
        show: true,
        SD: '', //school and department
        Note: '', //一些備註，如：畢業、在學....
      },
    },
    publicEmail: {
      show: true,
      data: 'b08901072@ntu.edu.tw', //mongoose.SchemaTypes.Email ?
    },
    office: {
      show: true,
      data: '',
    }, //phone
    homephone: {
      show: false,
      data: '',
    },
    cellphone: {
      show: true,
      data: '0987654321',
    },
    CC: {
      show: true,
      data: 'Taipei, Taiwan',
    }, //city+country
    web: {
      show: true,
      data: '',
    },
    facebook: {
      show: true,
      data: 'https://www.facebook.com/noidname',
    },
    Linkedin: {
      show: true,
      data: '',
    },
    Occupation: [
      {
        show: true,
        O: '', //部門?
        P: 'CEO & CTO', //職稱?
        C: '友廷股份有限公司', //公司?
      },
    ],
    JobID: '', //有空去查一下mongoose的ref和populate
    userimage: 'https://avatars.githubusercontent.com/u/55401762?v=4', // not same as schema
  })

  return (
    <div className="container">
      <div className="main-body">
        {/* <!-- Breadcrumb --> */}
        <nav aria-label="breadcrumb" className="main-breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="index.html">Home</a>
            </li>
            <li className="breadcrumb-item">
              <a href="javascript:void(0)">User</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              User Profile
            </li>
          </ol>
        </nav>
        {/* <!-- /Breadcrumb --> */}

        <div className="row gutters-sm">
          <div className="col-md-4 mb-3">
            <div className="card">
              <div className="card-body">
                <div className="d-flex flex-column align-items-center text-center">
                  <img src={data.userimage} alt="Admin" className="rounded-circle" width="150" />
                  <div className="mt-3">
                    <h4>{data.username.show ? data.username.data : ''}</h4>
                    <p className="text-secondary mb-1">
                      {data.profile.show ? data.profile.data : ''}
                    </p>
                    <p className="text-muted font-size-sm">{data.CC.show ? data.CC.data : ''}</p>
                    <button className="btn btn-primary">Follow</button>
                    <button className="btn btn-outline-primary">Message</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="card mt-3">
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                  <h6 className="mb-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-Width="2"
                      stroke-Linecap="round"
                      stroke-Linejoin="round"
                      className="feather feather-globe mr-2 icon-inline"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="2" y1="12" x2="22" y2="12"></line>
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                    </svg>
                    Website
                  </h6>
                  <span className="text-secondary">{data.web.show ? data.web.data : ''}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                  <h6 className="mb-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-Width="2"
                      stroke-Linecap="round"
                      stroke-Linejoin="round"
                      className="feather feather-github mr-2 icon-inline"
                    >
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                    </svg>
                    Github
                  </h6>
                  <span className="text-secondary"> noidname01 </span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                  <h6 className="mb-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-Width="2"
                      stroke-Linecap="round"
                      stroke-Linejoin="round"
                      className="feather feather-twitter mr-2 icon-inline text-info"
                    >
                      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                    </svg>
                    Linkedin
                  </h6>
                  <span className="text-secondary">
                    {data.Linkedin.show ? data.Linkedin.data : ''}
                  </span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                  <h6 className="mb-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-Width="2"
                      stroke-Linecap="round"
                      stroke-Linejoin="round"
                      className="feather feather-instagram mr-2 icon-inline text-danger"
                    >
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                    Instagram
                  </h6>
                  <span className="text-secondary">bootdey</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                  <h6 className="mb-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-Width="2"
                      stroke-Linecap="round"
                      stroke-Linejoin="round"
                      className="feather feather-facebook mr-2 icon-inline text-primary"
                    >
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                    </svg>
                    Facebook
                  </h6>
                  <span className="text-secondary">
                    {data.facebook.show ? data.facebook.data : ''}
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-8">
            <div className="card mb-3">
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Nick Name</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    {data.nickname.show ? data.nickname.data : ''}
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Email</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    {data.publicEmail.show ? data.publicEmail.data : ''}
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Phone</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    {data.homephone.show ? data.homephone.data : ''}
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Mobile</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    {data.cellphone.show ? data.cellphone.data : ''}
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-12">
                    <a
                      className="btn btn-info "
                      target="__blank"
                      href="https://www.bootdey.com/snippets/view/profile-edit-data-and-skills"
                    >
                      Edit
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="row gutters-sm">
              <div className="col-sm-6 mb-3">
                <div className="card h-100">
                  <div className="card-body">
                    <h6 className="d-flex align-items-center mb-3">
                      <i className="material-icons text-info mr-2">Education</i>
                    </h6>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <h6 className="mb-0">Bachelor</h6>
                      </div>
                      <div className="col-sm-9 text-secondary">
                        {data.education.major.show ? data.education.major.SD : ''}
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <h6 className="mb-0">Master</h6>
                      </div>
                      <div className="col-sm-9 text-secondary">
                        {data.education.master.show ? data.education.master.SD : ''}
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <h6 className="mb-0">Doctor</h6>
                      </div>
                      <div className="col-sm-9 text-secondary">
                        {data.education.doctor.show ? data.education.doctor.SD : ''}
                      </div>
                    </div>
                    <hr />
                  </div>
                </div>
              </div>
              <div className="col-sm-6 mb-3">
                <div className="card h-100">
                  <div className="card-body">
                    <h6 className="d-flex align-items-center mb-3">
                      <i className="material-icons text-info mr-2">Current Occupation</i>
                    </h6>
                    <hr />
                    <div className="row">
                      <div className="col-sm-4">
                        <h6 className="mb-0">Company</h6>
                      </div>
                      <div className="col-sm-9 text-secondary">
                        {data.Occupation[0].show ? data.Occupation[0].C : ''}
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-4">
                        <h6 className="mb-0">Department</h6>
                      </div>
                      <div className="col-sm-9 text-secondary">
                        {data.Occupation[0].show ? data.Occupation[0].O : ''}
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-4">
                        <h6 className="mb-0">Position</h6>
                      </div>
                      <div className="col-sm-9 text-secondary">
                        {data.Occupation[0].show ? data.Occupation[0].P : ''}
                      </div>
                    </div>
                    <hr />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile

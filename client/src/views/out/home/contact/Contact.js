/* eslint-disable prettier/prettier */
import { CCol, CContainer, CRow } from '@coreui/react'
import React, { useState } from 'react'
import CIcon from '@coreui/icons-react'

import axios from 'axios'

const initialState = {
  name: '',
  email: '',
  message: '',
}
const Contact = () => {
  const [{ name, email, message }, setState] = useState(initialState)

  const handleChange = (e) => {
    const { name, value } = e.target
    setState((prevState) => ({ ...prevState, [name]: value }))
  }
  const clearState = () => setState({ ...initialState })

  const handleSubmit = (e) => {
    e.preventDefault()

    const url =
      'https://docs.google.com/forms/d/e/1FAIpQLSed-GXXBhqIRUBEX7-nMlwuQ3a22-Z51mtxVSlcyhWzG9TH2Q/formResponse'

    axios
      .get(url, {
        params: {
          usp: 'pp_url',
          'entry.1670134810': name,
          'entry.302205267': email,
          'entry.307115258': message,
        },
      })
      .then((res) => {
        alert('感謝您的意見!')
        clearState()
      })
  }
  return (
    <div>
      <div id="contact" className="section">
        <CContainer data-aos="fade-up" data-aos-anchor-placement="top-bottom">
          <CRow>
            <div className="col-md-8">
              <CRow>
                <div className="section-title">
                  <h2>Get In Touch</h2>
                  <p>
                    Please fill out the form below to send us an email and we will get back to you
                    as soon as possible.
                  </p>
                </div>
                <form name="sentMessage" validate onSubmit={handleSubmit}>
                  <CRow>
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          type="text"
                          id="name"
                          name="name"
                          className="form-control"
                          placeholder="Name"
                          required
                          onChange={handleChange}
                          value={name}
                        />
                        <p className="help-block text-danger"></p>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          type="email"
                          id="email"
                          name="email"
                          className="form-control"
                          placeholder="Email"
                          required
                          onChange={handleChange}
                          value={email}
                        />
                        <p className="help-block text-danger"></p>
                      </div>
                    </div>
                  </CRow>
                  <div className="form-group">
                    <textarea
                      name="message"
                      id="message"
                      className="form-control"
                      rows="4"
                      placeholder="Message"
                      required
                      onChange={handleChange}
                      value={message}
                    ></textarea>
                    <p className="help-block text-danger"></p>
                  </div>
                  <div id="success"></div>
                  <button type="submit" className="btn btn-custom btn-lg">
                    Send Message
                  </button>
                </form>
              </CRow>
            </div>
            <div className="col-md-4 col-md-offset-1 contact-info">
              <div className="contact-item">
                <h3>Contact Info</h3>
                <p>
                  <span>
                    <CIcon icon="cil-home" name="cil-home" /> Address
                  </span>
                  台灣大學博理館 B1 系學會辦
                </p>
              </div>
              <div className="contact-item">
                <p>
                  <span>
                    <CIcon icon="cib-gmail" name="cib-gmail" /> Email
                  </span>{' '}
                  eeplus2020@gmail.com
                </p>
              </div>
              <div className="contact-item">
                <p>
                  <span>
                    <CIcon icon="cil-dollar" name="cil-dollar" /> Support
                  </span>{' '}
                  700-0001236-0553850(Taiwan)
                </p>
              </div>
            </div>
            <div className="col-md-12">
              <CRow style={{ color: 'white' }}>
                <div className="social">
                  <ul>
                    <li>
                      <a
                        href="https://www.facebook.com/groups/ntueeplus"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <CIcon
                          icon="cib-facebook"
                          name="cib-facebook"
                          customClassName="social-icon"
                        />
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.instagram.com/ntueeplus/"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <CIcon
                          icon="cib-instagram"
                          name="cib-instagram"
                          customClassName="social-icon"
                        />
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://github.com/NTUEE-PLUS/EndOfWeb/"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <CIcon icon="cib-github" name="cib-github" customClassName="social-icon" />
                      </a>
                    </li>
                  </ul>
                </div>
              </CRow>
            </div>
          </CRow>
        </CContainer>
      </div>
    </div>
  )
}

export default Contact

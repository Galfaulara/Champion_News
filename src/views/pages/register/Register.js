import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import React, { useState } from 'react'
import { cilLockLocked, cilUser } from '@coreui/icons'

import Axios from 'axios'
import CIcon from '@coreui/icons-react'
import validator from 'validator'

const Register = () => {
  const [username, setUsername] = useState([''])
  const [password, setPassword] = useState([''])
  const [eMail, setEmail] = useState([''])
  const [repeatPassword, setRepeatPassword] = useState([''])
  const onUsernameChange = (event) => {
    setUsername(event.target.value)
  }
  const onPasswordChange = (event) => {
    setPassword(event.target.value)
  }
  const onRepeatPasswordChange = (event) => {
    setRepeatPassword(event.target.value)
  }
  const onEmailChange = (event) => {
    setEmail(event.target.value)
  }
  const submitRegister = async (req, res) => {
    if (password === repeatPassword && validator.isEmail(eMail)) {
      await Axios.post('http://localhost:3000/register', {
        username: username.toLowerCase(),
        password: password,
        eMail: eMail.toLowerCase(),
      }).then((data) => {
        console.log(data.data)
        if (data.data === 'OK') {
          alert('User registered succesfully')
        } else {
          alert('Email already registered, try another one')
        }
      })
    } else if (password !== repeatPassword) {
      alert('Repeated password does not match')
    } else if (validator.isEmail(eMail) === false) {
      alert('Enter a valid email')
    }
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Register</h1>
                  <p className="text-medium-emphasis">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Username"
                      autoComplete="username"
                      onChange={onUsernameChange}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput placeholder="Email" autoComplete="email" onChange={onEmailChange} />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      autoComplete="new-password"
                      onChange={onPasswordChange}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Repeat password"
                      autoComplete="new-password"
                      onChange={onRepeatPasswordChange}
                    />
                  </CInputGroup>
                  <div className="d-grid">
                    <CButton color="success" role="button" onClick={submitRegister}>
                      Create Account
                    </CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register

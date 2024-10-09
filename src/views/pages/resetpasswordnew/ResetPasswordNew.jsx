import React, { useState } from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react';

const ResetPasswordNew = () => {
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleResetPasswordNew = async (e) => {
    e.preventDefault();
    setError(''); // Reset errors before submission
    setSuccess(''); // Reset success message before submission

    try {
      const response = await fetch('http://localhost:5000/api/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: newPassword }),
      });

      if (response.ok) {
        setSuccess('Password successfully updated.'); // Success message
        setNewPassword(''); // Clear password field
      } else {
        const errorText = await response.text();
        setError(errorText || 'Error updating password'); // Error message
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred. Please try again.'); // Error message
    }
  };

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handleResetPasswordNew}>
                    <h1>Password Reset</h1> {/* Title */}
                    <p className="text-body-secondary">Enter a new password for your account.</p> {/* Instruction */}
                    {error && <p className="text-danger">{error}</p>} {/* Error message */}
                    {success && <p className="text-success">{success}</p>} {/* Success message */}
                    <CInputGroup className="mb-3">
                      <CInputGroupText>New Password</CInputGroupText> {/* Label */}
                      <CFormInput
                        type="password"
                        placeholder="Enter new password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={12}>
                        <CButton color="primary" className="px-4" type="submit">
                          Save
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default ResetPasswordNew;

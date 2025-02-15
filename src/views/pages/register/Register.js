import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CFormSelect,
  CInputGroup,
  CInputGroupText,
  CRow,
  CAlert,
  CProgress
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilLockLocked, cilUser, cilPhone, cilContact, cilShieldAlt } from '@coreui/icons';
import { 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider 
} from "firebase/auth";
import { auth, firestore } from '../../../Firebase/firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

// Google Auth Provider Configuration
const googleProvider = new GoogleAuthProvider();

const Register = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phone: '',
    role: '',
    emergencyNumber: '',
    subjects: '',
    permissions: ''
  });
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (step === 1) {
      if (!validateStep1()) return;
      setStep(2);
      return;
    }

    if (step === 2) {
      if (!validateStep2()) return;
      setStep(3);
      return;
    }

    await handleFinalSubmission();
  };

  const handleGoogleSignUp = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const [firstName, lastName] = user.displayName?.split(' ') || ['', ''];

      const userData = {
        firstName,
        lastName,
        email: user.email,
        phone: user.phoneNumber || '',
        role: 'parent',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        lastLogin: serverTimestamp(),
        loginCount: 0,
        parentProfile: {
          emergencyNumber: '',
          children: [],
          communicationPreferences: { email: true, sms: true }
        }
      };

      await setDoc(doc(firestore, 'users', user.uid), userData);
      navigate('/dashboard');
    } catch (error) {
      handleFirebaseError(error);
    }
  };

  const validateStep1 = () => {
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!formData.firstName || !formData.lastName || !formData.phone || !formData.role) {
      setError('All fields are required');
      return false;
    }
    return true;
  };

  const handleFinalSubmission = async () => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth, 
        formData.email, 
        formData.password
      );

      const userData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        role: formData.role,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        lastLogin: serverTimestamp(),
        loginCount: 0,
        ...getRoleSpecificData()
      };

      await setDoc(doc(firestore, 'users', userCredential.user.uid), userData);
      navigate('/dashboard');
    } catch (err) {
      handleFirebaseError(err);
    } finally {
      setLoading(false);
    }
  };

  const getRoleSpecificData = () => {
    switch(formData.role) {
      case 'parent':
        return {
          parentProfile: {
            emergencyNumber: formData.emergencyNumber,
            children: [],
            communicationPreferences: { email: true, sms: true }
          }
        };
      case 'teacher':
        return {
          teacherProfile: {
            subjects: formData.subjects.split(',').map(s => s.trim()),
            classesManaged: [],
            teacherPerformance: { averageClassAttendance: 0, feedbackScore: 0 }
          }
        };
      case 'admin':
        return {
          adminProfile: {
            permissions: formData.permissions.split(',').map(p => p.trim()),
            auditMetrics: { lastAudit: null, actionsLogged: 0 }
          }
        };
      default:
        return {};
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFirebaseError = (error) => {
    switch (error.code) {
      case 'auth/email-already-in-use':
        setError('Email is already registered');
        break;
      case 'auth/invalid-email':
        setError('Invalid email address');
        break;
      case 'auth/weak-password':
        setError('Password must be at least 6 characters');
        break;
      case 'auth/popup-closed-by-user':
        setError('Google sign-up window was closed');
        break;
      case 'auth/account-exists-with-different-credential':
        setError('Email already exists with different login method');
        break;
      default:
        setError('Registration failed. Please try again.');
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <CInputGroup className="mb-3">
              <CInputGroupText>
                <CIcon icon={cilUser} />
              </CInputGroupText>
              <CFormInput
                type="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                required
              />
            </CInputGroup>
            <small className="text-muted d-block mb-3">
              Use your official email address
            </small>

            <CInputGroup className="mb-3">
              <CInputGroupText>
                <CIcon icon={cilLockLocked} />
              </CInputGroupText>
              <CFormInput
                type="password"
                placeholder="•••••••"
                value={formData.password}
                onChange={(e) => handleChange('password', e.target.value)}
                required
              />
            </CInputGroup>
            <small className="text-muted d-block mb-3">
              Minimum 6 characters with letters and numbers
            </small>

            <CInputGroup className="mb-4">
              <CInputGroupText>
                <CIcon icon={cilLockLocked} />
              </CInputGroupText>
              <CFormInput
                type="password"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={(e) => handleChange('confirmPassword', e.target.value)}
                required
              />
            </CInputGroup>

            <div className="text-center mb-4">
              <CButton 
                color="secondary" 
                onClick={handleGoogleSignUp}
                style={{ width: '100%' }}
              >
                <CIcon icon={cilUser} className="me-2" />
                Sign up with Google
              </CButton>
              <small className="text-muted d-block mt-2">
                Google sign-up defaults to Parent role
              </small>
            </div>
          </>
        );

      case 2:
        return (
          <>
            <CInputGroup className="mb-3">
              <CInputGroupText>
                <CIcon icon={cilContact} />
              </CInputGroupText>
              <CFormInput
                placeholder="First Name"
                value={formData.firstName}
                onChange={(e) => handleChange('firstName', e.target.value)}
                required
              />
            </CInputGroup>
            <small className="text-muted d-block mb-3">
              Legal name as per official documents
            </small>

            <CInputGroup className="mb-3">
              <CInputGroupText>
                <CIcon icon={cilContact} />
              </CInputGroupText>
              <CFormInput
                placeholder="Last Name"
                value={formData.lastName}
                onChange={(e) => handleChange('lastName', e.target.value)}
                required
              />
            </CInputGroup>

            <CInputGroup className="mb-3">
              <CInputGroupText>
                <CIcon icon={cilPhone} />
              </CInputGroupText>
              <CFormInput
                placeholder="+1 (555) 123-4567"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                required
              />
            </CInputGroup>
            <small className="text-muted d-block mb-3">
              Include country code for SMS notifications
            </small>

            <CInputGroup className="mb-3">
              <CInputGroupText>
                <CIcon icon={cilShieldAlt} />
              </CInputGroupText>
              <CFormSelect 
                value={formData.role}
                onChange={(e) => handleChange('role', e.target.value)}
                required
              >
                <option value="">Select Role</option>
                <option value="parent">Parent</option>
                <option value="teacher">Teacher</option>
                <option value="admin">Admin</option>
              </CFormSelect>
            </CInputGroup>
            <small className="text-muted d-block mb-3">
              Choose your primary role in the institution
            </small>
          </>
        );

      case 3:
        return (
          <>
            {formData.role === 'parent' && (
              <>
                <CInputGroup className="mb-3">
                  <CInputGroupText>
                    <CIcon icon={cilPhone} />
                  </CInputGroupText>
                  <CFormInput
                    placeholder="Emergency Contact Number"
                    value={formData.emergencyNumber}
                    onChange={(e) => handleChange('emergencyNumber', e.target.value)}
                    required
                  />
                </CInputGroup>
                <small className="text-muted d-block mb-3">
                  Primary emergency contact number
                </small>
              </>
            )}

            {formData.role === 'teacher' && (
              <>
                <CInputGroup className="mb-3">
                  <CInputGroupText>
                    <CIcon icon={cilContact} />
                  </CInputGroupText>
                  <CFormInput
                    placeholder="Subjects (comma separated)"
                    value={formData.subjects}
                    onChange={(e) => handleChange('subjects', e.target.value)}
                    required
                  />
                </CInputGroup>
                <small className="text-muted d-block mb-3">
                  Example: Mathematics, Physics, Chemistry
                </small>
              </>
            )}

            {formData.role === 'admin' && (
              <>
                <CInputGroup className="mb-3">
                  <CInputGroupText>
                    <CIcon icon={cilShieldAlt} />
                  </CInputGroupText>
                  <CFormInput
                    placeholder="Permissions (comma separated)"
                    value={formData.permissions}
                    onChange={(e) => handleChange('permissions', e.target.value)}
                    required
                  />
                </CInputGroup>
                <small className="text-muted d-block mb-3">
                  Example: user_management, system_config
                </small>
              </>
            )}
          </>
        );
    }
  };

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm onSubmit={handleSubmit}>
                  <div className="text-center mb-4">
                    <CProgress
                      value={(step / 3) * 100}
                      className="mb-3"
                      style={{ height: '5px' }}
                    />
                    <h1>Register ({step}/3)</h1>
                    <p className="text-body-secondary">
                      {step === 1 && 'Account Setup'}
                      {step === 2 && 'Personal Information'}
                      {step === 3 && `${formData.role.charAt(0).toUpperCase() + formData.role.slice(1)} Details`}
                    </p>
                  </div>

                  {error && <CAlert color="danger">{error}</CAlert>}

                  {renderStep()}

                  <div className="d-grid">
                    <CButton 
                      color="success" 
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? 'Processing...' : step === 3 ? 'Complete Registration' : 'Next Step'}
                    </CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Register;
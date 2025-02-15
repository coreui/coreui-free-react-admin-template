import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider 
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc 
} from 'firebase/firestore';
import { auth } from '../../../Firebase/firebase';
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
  CAlert,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilLockLocked, cilUser } from '@coreui/icons';

// Configure Google Provider
const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('https://www.googleapis.com/auth/forms.body');
googleProvider.addScope('https://www.googleapis.com/auth/presentations');
googleProvider.addScope('https://www.googleapis.com/auth/drive.file');

const db = getFirestore();

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (err) {
      handleAuthError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      // Check/create user document
      const userRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userRef);
      
      if (!userDoc.exists()) {
        const [firstName, lastName] = user.displayName?.split(' ') || ['', ''];
        await setDoc(userRef, {
          firstName,
          lastName,
          email: user.email,
          role: 'parent',
          createdAt: serverTimestamp(),
          lastLogin: serverTimestamp(),
          loginCount: 0
        });
      }

      navigate('/');
    } catch (err) {
      handleAuthError(err);
    }
  };

  const handleAuthError = (error) => {
    switch (error.code) {
      case 'auth/user-not-found':
        setError('No account found with this email');
        break;
      case 'auth/wrong-password':
        setError('Incorrect password');
        break;
      case 'auth/popup-closed-by-user':
        setError('Google sign-in window closed');
        break;
      case 'auth/account-exists-with-different-credential':
        setError('Account exists with different login method');
        break;
      default:
        setError('Login failed. Please try again.');
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
                  <CForm onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <p className="text-body-secondary">Sign In to your account</p>
                    {error && <CAlert color="danger">{error}</CAlert>}
                    
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        type="email"
                        placeholder="Email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </CInputGroup>

                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </CInputGroup>

                    <CRow>
                      <CCol xs={6}>
                        <CButton 
                          color="primary" 
                          className="px-4" 
                          type="submit" 
                          disabled={loading}
                        >
                          {loading ? 'Loading...' : 'Login'}
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>

                    <div className="text-center mt-4">
                      <CButton 
                        color="secondary" 
                        onClick={handleGoogleLogin}
                        disabled={loading}
                        style={{ width: '100%' }}
                      >
                        <CIcon icon={cilUser} className="me-2" />
                        Continue with Google
                      </CButton>
                      <small className="text-muted d-block mt-2">
                        Google login creates a parent account by default
                      </small>
                    </div>
                  </CForm>
                </CCardBody>
              </CCard>

              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>Don't have an account? Register now to access all features!</p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;
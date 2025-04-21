import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  CContainer,
  CCard,
  CCardBody,
  CCardHeader,
  CCardFooter,
  CCol,
  CRow,
  CForm,
  CFormLabel,
  CFormInput,
  CButton,
  CListGroup,
  CListGroupItem,
  CBadge,
  CSpinner
} from '@coreui/react';
import { updateUser } from '../../features/auth/authSlice';
import axiosInstance from '../../utils/api/axiosConfig';

const UserProfilePage = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  
  const [isEditing, setIsEditing] = useState(false);
  const [editedFirstName, setEditedFirstName] = useState('');
  const [editedLastName, setEditedLastName] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [departmentName, setDepartmentName] = useState('');
  const [isLoadingDepartments, setIsLoadingDepartments] = useState(false);

  // Set edited name values whenever user data changes
  useEffect(() => {
    if (user) {
      setEditedFirstName(user.firstName);
      setEditedLastName(user.lastName);
      fetchDepartments();
    }
  }, [user]);

  const fetchDepartments = async () => {
    if (!user || !user.departmentId) return;
    
    setIsLoadingDepartments(true);
    try {
      const response = await axiosInstance.get('/api/departments', {
        params: {
          page: 0,
          pageSize: 100, // Get a reasonable number of departments
        },
      });
      
      if (response.data && response.data.data) {
        setDepartments(response.data.data);
        
        // Find the department that matches the user's departmentId
        const userDepartment = response.data.data.find(
          (dept) => dept.id === user.departmentId
        );
        
        if (userDepartment) {
          setDepartmentName(userDepartment.name);
        } else {
          setDepartmentName('Unknown Department');
        }
      }
    } catch (error) {
      console.error('Error fetching departments:', error);
      setDepartmentName('Unknown Department');
    } finally {
      setIsLoadingDepartments(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    setError(null);
    
    try {
      // Use the updateUser thunk action
      const userData = {
        firstName: editedFirstName,
        lastName: editedLastName
      };
      
      const success = await dispatch(updateUser(userData));
      
      if (success) {
        setIsEditing(false);
      } else {
        setError('Failed to update user data. Please try again later.');
      }
    } catch (err) {
      console.error('Error updating user data:', err);
      setError('Failed to update user data. Please try again later.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    // Reset to current user data from Redux
    setEditedFirstName(user.firstName);
    setEditedLastName(user.lastName);
    setIsEditing(false);
    setError(null);
  };

  if (!user) {
    return (
      <CContainer className="px-5 mt-4 d-flex justify-content-center">
        <CSpinner color="primary" />
      </CContainer>
    );
  }

  return (
    <CContainer className="px-5 mt-4">
      <CRow>
        <CCol md={8}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>User Profile</strong>
            </CCardHeader>
            <CCardBody>
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
              
              <CForm>
                {/* <CRow className="mb-3">
                  <CCol sm={3}>
                    <CFormLabel>User ID</CFormLabel>
                  </CCol>
                  <CCol sm={9}>
                    <p className="form-control-plaintext">{user.id}</p>
                  </CCol>
                </CRow> */}

                <CRow className="mb-3">
                  <CCol sm={3}>
                    <CFormLabel>First Name</CFormLabel>
                  </CCol>
                  <CCol sm={9}>
                    {isEditing ? (
                      <CFormInput
                        value={editedFirstName}
                        onChange={(e) => setEditedFirstName(e.target.value)}
                      />
                    ) : (
                      <p className="form-control-plaintext">{user.firstName}</p>
                    )}
                  </CCol>
                </CRow>

                <CRow className="mb-3">
                  <CCol sm={3}>
                    <CFormLabel>Last Name</CFormLabel>
                  </CCol>
                  <CCol sm={9}>
                    {isEditing ? (
                      <CFormInput
                        value={editedLastName}
                        onChange={(e) => setEditedLastName(e.target.value)}
                      />
                    ) : (
                      <p className="form-control-plaintext">{user.lastName}</p>
                    )}
                  </CCol>
                </CRow>

                <CRow className="mb-3">
                  <CCol sm={3}>
                    <CFormLabel>Email</CFormLabel>
                  </CCol>
                  <CCol sm={9}>
                    <p className="form-control-plaintext">{user.login}</p>
                  </CCol>
                </CRow>

                <CRow className="mb-3">
                  <CCol sm={3}>
                    <CFormLabel>Role</CFormLabel>
                  </CCol>
                  <CCol sm={9}>
                    <p className="form-control-plaintext">
                      <CBadge color="primary">{user.role.name}</CBadge>
                    </p>
                  </CCol>
                </CRow>

                <CRow className="mb-3">
                  <CCol sm={3}>
                    <CFormLabel>Department</CFormLabel>
                  </CCol>
                  <CCol sm={9}>
                    <p className="form-control-plaintext">
                      {isLoadingDepartments ? (
                        <CSpinner size="sm" />
                      ) : (
                        <>
                          {departmentName} 
                        </>
                      )}
                    </p>
                  </CCol>
                </CRow>
              </CForm>
            </CCardBody>
            <CCardFooter className="d-flex justify-content-end">
              {isEditing ? (
                <>
                  <CButton 
                    color="primary" 
                    onClick={handleSave} 
                    className="me-2"
                    disabled={isSaving}
                  >
                    {isSaving ? <CSpinner size="sm" /> : 'Save Changes'}
                  </CButton>
                  <CButton 
                    color="secondary" 
                    onClick={handleCancel}
                    disabled={isSaving}
                  >
                    Cancel
                  </CButton>
                </>
              ) : (
                <CButton color="primary" onClick={() => setIsEditing(true)}>
                  Edit Profile
                </CButton>
              )}
            </CCardFooter>
          </CCard>
        </CCol>

        <CCol md={4}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Permissions</strong>
            </CCardHeader>
            <CCardBody>
              <CListGroup>
                {user.role.actions.map((action) => (
                  <CListGroupItem key={action.id} className="d-flex justify-content-between align-items-center">
                    <div>{action.name}</div>
                    <div>
                      {action.allowedMethods.map((method, index) => (
                        <CBadge 
                          key={index} 
                          color="success" 
                          className="me-1" 
                          style={{ 
                            display: 'inline-flex',
                            alignItems: 'center',
                          
                          }}
                        >
                          <span >✓</span>
                        </CBadge>
                      ))}
                    </div>
                  </CListGroupItem>
                ))}
              </CListGroup>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  );
};

export default UserProfilePage;
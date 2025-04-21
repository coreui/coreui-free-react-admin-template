import React, { useState } from 'react';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCardFooter,
  CCol,
  CRow,
  CButton,
  CForm,
  CFormInput,
  CFormLabel,
  CSpinner,
  CAlert,
  CContainer,
} from '@coreui/react';
import { cilArrowLeft, cilCloudUpload } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import axiosInstance from '../../utils/api/axiosConfig';
import { useNavigate } from 'react-router-dom';

const AddLayer = () => {
  const [uploadFile, setUploadFile] = useState(null);
  const [layerName, setLayerName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  // Handle file upload
  const handleFileChange = (event) => {
    setUploadFile(event.target.files[0]);
  };

  // Display and clear alerts
  const showErrorAlert = (message) => {
    setError(message);
    setSuccess(null);
  };

  const showSuccessAlert = (message) => {
    setSuccess(message);
    setError(null);
  };

  // Upload and create new layer
  const uploadLayer = async () => {
    if (!uploadFile || !layerName) {
      showErrorAlert('Please provide both a layer name and a zip file');
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', uploadFile);
      
      const response = await axiosInstance.post(
        `/layers/new/${layerName}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',},
            expose: ['Location']
          }
       
      );
      
      showSuccessAlert(`Layer uploaded successfully.`);
      
      navigate('/layers');
      // Navigate to edit page with the newly created layer
      // setTimeout(() => {
      //   navigate(`/layers/edit/${response.data.id}`, { state: { isNew: true } });
      // }, 1500);
      
    } catch (err) {
      showErrorAlert(`Upload failed: ${err.response?.data?.error || err.message}`);
      setLoading(false);
    }
  };

  return (
    <CContainer className='px-5 mt-4'>
      <CCol>
        <CCard className="mb-4">
          <CCardHeader className="d-flex justify-content-between align-items-center">
            <strong>Upload New Layer</strong>
            <CButton
              color="secondary"
              variant="outline"
              onClick={() => navigate('/layers')}
            >
              <CIcon icon={cilArrowLeft} className="me-2" />
              Back to Layers
            </CButton>
          </CCardHeader>
          <CCardBody>
            {error && <CAlert color="danger">{error}</CAlert>}
            {success && <CAlert color="success">{success}</CAlert>}
            
            <CForm>
              <CRow>
                <CCol md={6}>
                  <div className="mb-3">
                    <CFormLabel>Layer Name</CFormLabel>
                    <CFormInput
                      type="text"
                      value={layerName}
                      onChange={(e) => setLayerName(e.target.value)}
                      placeholder="Enter layer name"
                      disabled={loading}
                    />
                    <div className="form-text">
                      Enter a descriptive name for your layer
                    </div>
                  </div>
                </CCol>
                
                <CCol md={6}>
                  <div className="mb-3">
                    <CFormLabel>Shapefile (ZIP)</CFormLabel>
                    <CFormInput
                      type="file"
                      accept=".zip"
                      onChange={handleFileChange}
                      disabled={loading}
                    />
                    <div className="form-text">
                      Upload a ZIP file containing shapefile (.shp, .dbf, .shx, .prj)
                    </div>
                  </div>
                </CCol>
              </CRow>
            </CForm>
          </CCardBody>
          <CCardFooter className="d-flex justify-content-end">
            <CButton
              color="secondary"
              className="me-2"
              onClick={() => navigate('/layers')}
              disabled={loading}
            >
              Cancel
            </CButton>
            <CButton
              color="primary"
              onClick={uploadLayer}
              disabled={loading || !layerName || !uploadFile}
            >
              {loading ? (
                <>
                  <CSpinner size="sm" className="me-2" />
                  Uploading...
                </>
              ) : (
                <>
                  <CIcon icon={cilCloudUpload} className="me-2" />
                  Upload Layer
                </>
              )}
            </CButton>
          </CCardFooter>
        </CCard>
      </CCol>
    </CContainer>
  );
};

export default AddLayer;
import React, { useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectCareer, setCroppedFile, setCroppedDataUrl } from '../../../slices/careerSlice'
import {
  CButton,
  CCol,
  CContainer,
  CImage,
  CRow,
  CFormLabel,
  CFormRange,
  CInputGroup,
} from '@coreui/react'
import Cropper from 'react-easy-crop'
import { getCroppedImg } from './'

const CareerImageEditor = ({ imgSrc }) => {
  const dispatch = useDispatch()
  const { croppedDataUrl } = useSelector(selectCareer)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const showCroppedImage = useCallback(async () => {
    try {
      const { file, dataUrl } = await getCroppedImg(imgSrc, croppedAreaPixels)
      dispatch(setCroppedFile(file))
      dispatch(setCroppedDataUrl(dataUrl))
    } catch (e) {
      console.error(e)
    }
  }, [imgSrc, croppedAreaPixels])

  return (
    <>
      {croppedDataUrl === '' ? (
        <>
          <CContainer style={{ position: 'relative', width: '100%', height: 600 }}>
            <Cropper
              image={imgSrc}
              crop={crop}
              zoom={zoom}
              aspect={7 / 4}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
              restrictPosition={false}
            ></Cropper>
          </CContainer>

          <CRow className="p-3">
            <CInputGroup>
              <CFormLabel htmlFor="customRange">Zoom</CFormLabel>
              <CFormRange
                min={0.1}
                max={3}
                defaultValue={1}
                step={0.1}
                id="customRange"
                onChange={(e) => {
                  setZoom(e.target.value)
                }}
              />

              <CButton onClick={showCroppedImage} color="primary">
                Show Result
              </CButton>
            </CInputGroup>
          </CRow>
        </>
      ) : (
        <>
          <CImage src={croppedDataUrl} style={{ width: '90%' }} />
        </>
      )}
    </>
  )
}

export default CareerImageEditor

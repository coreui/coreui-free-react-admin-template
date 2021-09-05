import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectProfile, closeEditImageModal } from '../../../../slices/profileSlice'
import { selectLogin, setImgSrc } from '../../../../slices/loginSlice'
import ProfilePicture from '@dsalvagni/react-profile-picture'
import '@dsalvagni/react-profile-picture/dist/ProfilePicture.css'

import { CModal, CModalHeader, CModalBody, CModalTitle, CModalFooter, CButton } from '@coreui/react'
import axios from 'axios'

const ProfileImageEditor = () => {
  const dispatch = useDispatch()
  const { imgSrc } = useSelector(selectLogin)
  const { editImage } = useSelector(selectProfile)
  const profilePictureRef = useRef(null)

  const closeModal = () => {
    dispatch(closeEditImageModal())
  }

  const handleSaveImage = (e) => {
    e.preventDefault()

    let canvas = profilePictureRef.current.canvasRef.current
    canvas.toBlob(
      (blob) => {
        let data = new FormData()
        data.append('userimage', blob, '.png')
        const config = {
          headers: {
            'content-type': 'multipart/form-data',
          },
        }
        // send to backend
        axios
          .patch('api/profile', data, config)
          .then((res) => {
            dispatch(setImgSrc(profilePictureRef.current.getImageAsDataUrl()))
            closeModal()
          })
          .catch((err) => {
            switch (err.response.status) {
              default:
                console.log(err.response)
                break
            }
          })
      },
      'image/png',
      1,
    )
  }

  return (
    <CModal visible={editImage} onDismiss={closeModal}>
      <CModalHeader onDismiss={closeModal}>
        <CModalTitle>Edit Your Photo</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <ProfilePicture ref={profilePictureRef} frameFormat={'circle'} cropSize="150" />
      </CModalBody>
      <CModalFooter>
        <CButton color="dark" onClick={handleSaveImage}>
          OK
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default ProfileImageEditor

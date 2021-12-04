/* eslint-disable */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import {
    CButton,
    CCard,
    CForm,
    CRow,
    CCardBody,
    CCardHeader,
    CCol,
    CFormInput,
    CFormLabel,
    CModal,
    CModalBody,
    CModalHeader,
    CModalFooter,
    CModalTitle,
} from '@coreui/react'
import { withAdminAuth } from '../../../hoc/withAdminAuth'
import { fetchMatchRequest, matchRequest } from "../../../redux/slices/request";

export const MatchRequest = withAdminAuth(true)(() => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.requests.matchRequestsLoading);
    const matchRequests = useSelector((state) => state.requests.matchRequests.users);
    const [matchRequestModal, setMatchRequestModal] = useState({ visible: false, creative_id: null });


    useEffect(() => {
        (async () => {
            dispatch(fetchMatchRequest({ id }))
        })()
    }, [])

    const handleMatchRequest = () => {
        dispatch(matchRequest({request_id: id, creative_id: matchRequestModal.creative_id}))
    }

    return (
        <div>
            <CModal visible={matchRequestModal.visible} onClose={() => setMatchRequestModal({ visible: !matchRequestModal.visible, creative_id: matchRequests.$id })}>
                <CModalHeader onClose={() => setMatchRequestModal({ visible: !matchRequestModal.visible, row: null })}>
                    <CModalTitle>Do you wish to match request with {matchRequestModal.visible ? matchRequestModal.creative_id : null}?</CModalTitle>
                </CModalHeader>
                {/* <CModalBody>{requestModal.visible ? requestModal.row.original.description : null}</CModalBody> */}
                <CModalFooter>
                    {/* <CButton color="secondary" onClick={() => setRequestModal({ visible: false, row: row })}>
                        Close
                    </CButton> */}
                    <CButton type="button" color="primary" onClick={handleMatchRequest} >Yes</CButton>
                </CModalFooter>
            </CModal>
            {loading ? (<div>Loading</div>) : (
                <div>

                    {matchRequests.map((matchRequest) => (
                        <CRow>
                            <CCol xs={12}>
                                <CCard className="mb-4">
                                    <CCardHeader>
                                        <strong>Match Request with</strong> <small>{matchRequest.name}</small>
                                    </CCardHeader>
                                    <CCardBody>
                                        <p className="text-medium-emphasis small">
                                            By adding <a href="https://coreui.io/docs/layout/gutters/">gutter modifier classes</a>
                                            , you can have control over the gutter width in as well the inline as block direction.
                                        </p>

                                        <CRow className="g-3">
                                            <CCol xs>
                                                <CFormInput placeholder="First name" aria-label="First name" defaultValue={matchRequest.$id} />
                                            </CCol>
                                            <CCol xs>
                                                <CFormInput placeholder="Last name" aria-label="Last name" />
                                            </CCol>
                                        </CRow>
                                        <p className="text-medium-emphasis small">
                                            More complex layouts can also be created with the grid system.
                                        </p>
                                        <CForm className="row g-3">
                                            <CCol md={6}>
                                                <CFormLabel htmlFor="inputEmail4">Email</CFormLabel>
                                                <CFormInput type="email" id="inputEmail4" placeholder="Email" defaultValue={matchRequest.email}
                                                    disabled />
                                            </CCol>
                                            <CCol md={6}>
                                                <CFormLabel htmlFor="inputAddress">Address</CFormLabel>
                                                <CFormInput id="inputAddress" placeholder="Address" defaultValue={matchRequest?.prefs?.location} disabled />
                                            </CCol>
                                            <CCol md={12}>
                                                <CFormLabel htmlFor="inputPhone">Phone</CFormLabel>
                                                <CFormInput id="inputPhone" placeholder="Phone" defaultValue={matchRequest?.prefs?.phone_number} disabled />
                                            </CCol>
                                            <CCol mdxs={12}>
                                                <CButton onClick={() => setMatchRequestModal({ visible: !matchRequestModal.visible, creative_id: matchRequest.$id })}>Match</CButton>
                                            </CCol>
                                        </CForm>
                                    </CCardBody>
                                </CCard>
                            </CCol>

                        </CRow>
                    ))}

                </div>
            )}

        </div>
    )
});

/* eslint-disable */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import {
    CButton,
    CCard,
    CForm,
    CFormTextarea,
    CRow,
    CCardBody,
    CCardHeader,
    CCol,
    CFormInput,
    CFormLabel,
    CFormFloating,
    CFormSelect,
} from '@coreui/react'
import { DocsCallout, DocsExample } from 'src/components'
import { fetchCustomerByID, fetchCreativeByID } from "../../../redux/slices/user";
import { withAdminAuth } from '../../../hoc/withAdminAuth'


export const RequestForm = withAdminAuth(true)(() => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const request = useSelector((state) => state.requests.requests.items.find((request) => request.id === parseInt(id)))
    const customerLoading = useSelector((state) => state.users.customerLoading)
    const creativeLoading = useSelector((state) => state.users.creativeLoading)
    const creative = useSelector((state) => state.users.creative)
    const customer = useSelector((state) => state.users.customer)

    useEffect(() => {
        (async () => {
            if (request.customer_id) {
                dispatch(fetchCustomerByID(request.customer_id))
            }

            if (request.creative_id) {
                dispatch(fetchCreativeByID(request.creative_id))
            }

        })()
    }, [])
    return (

        <div>
            {customerLoading && creativeLoading ? (
                <div>loading</div >
            ) : (
                <CRow>
                    <CCol xs={12}>
                        <CCard className="mb-4">
                            <CCardHeader>
                                <strong>{request.title}</strong> by <small>{request.company}</small>
                            </CCardHeader>
                            <CCardBody>
                                <p className="text-medium-emphasis small">
                                    {request.description}
                                </p>

                                <CRow xs={{ gutter: 2 }}>
                                    <CCol md>
                                        <CFormFloating>
                                            <CFormInput
                                                type="text"
                                                id="floatingInputGrid"
                                                placeholder="Service"
                                                defaultValue={request.service}
                                                disabled
                                            />
                                            <CFormLabel htmlFor="floatingInputGrid">Type of service</CFormLabel>
                                        </CFormFloating>
                                    </CCol>
                                    <CCol md>
                                        <CFormFloating>
                                            <CFormInput
                                                type="text"
                                                id="floatingInputGrid"
                                                placeholder="Equipment"
                                                defaultValue={request.equipment}
                                                disabled
                                            />
                                            <CFormLabel htmlFor="floatingInputGrid">What equipment is required?</CFormLabel>
                                        </CFormFloating>
                                    </CCol>

                                </CRow>
                                <br />
                                <CRow xs={{ gutter: 2 }}>

                                    <CCol md>
                                        <CFormFloating>
                                            <CFormInput
                                                type="text"
                                                id="floatingInputGrid"
                                                placeholder="Submission Date"
                                                defaultValue={request.submission_date}
                                                disabled
                                            />
                                            <CFormLabel htmlFor="floatingInputGrid">When is the deadline?</CFormLabel>
                                        </CFormFloating>
                                    </CCol>
                                    <CCol md>
                                        <CFormFloating>
                                            <CFormInput
                                                type="text"
                                                id="floatingInputGrid"
                                                placeholder="Customer Name"
                                                defaultValue={customer ? customer.user_name : null}
                                                disabled
                                            />
                                            <CFormLabel htmlFor="floatingInputGrid">Customer Name</CFormLabel>
                                        </CFormFloating>
                                    </CCol>
                                    <CCol md>
                                        <CFormFloating>
                                            <CFormInput
                                                type="text"
                                                id="floatingInputGrid"
                                                placeholder="Customer Email"
                                                defaultValue={customer ? customer.email : null}
                                                disabled
                                            />
                                            <CFormLabel htmlFor="floatingInputGrid">Customer Email</CFormLabel>
                                        </CFormFloating>
                                    </CCol>
                                </CRow>

                            </CCardBody>
                        </CCard>
                    </CCol>
                    <CCol xs={12}>
                        <CCard className="mb-4">
                            <CCardHeader>
                                <strong>Details About The Creative</strong>
                            </CCardHeader>
                            <CCardBody>
                                <CRow xs={{ gutter: 2 }}>
                                    <CCol md>
                                        <CFormFloating>
                                            <CFormInput
                                                type="text"
                                                id="floatingInputGrid"
                                                placeholder="Creative Name"
                                                defaultValue={creative ? creative.user_name : null}
                                                disabled
                                            />
                                            <CFormLabel htmlFor="floatingInputGrid">Creative Name</CFormLabel>
                                        </CFormFloating>
                                    </CCol>
                                    <CCol md>
                                        <CFormFloating>
                                            <CFormInput
                                                type="text"
                                                id="floatingInputGrid"
                                                placeholder="Creative Email"
                                                defaultValue={creative ? creative.email : null}
                                                disabled
                                            />
                                            <CFormLabel htmlFor="floatingInputGrid">Creative Email</CFormLabel>
                                        </CFormFloating>
                                    </CCol>
                                </CRow>

                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
            )}
        </div>
    )
});

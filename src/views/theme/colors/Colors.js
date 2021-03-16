import React, { useEffect, useState, createRef } from 'react'
import classNames from 'classnames'
import {
  CRow,
  CCol,
  CCard,
  CCardHeader,
  CCardBody,
  CInput,
  CLabel,
  CButton,
  CCardFooter
} from '@coreui/react'
import { rgbToHex } from '@coreui/utils'
import { DocsLink } from 'src/reusable'
import axios from 'axios';
import https from 'https';


const ThemeView = () => {
  const [color, setColor] = useState('rgb(255, 255, 255)')
  const ref = createRef()

  useEffect(() => {
    const el = ref.current.parentNode.firstChild
    const varColor = window.getComputedStyle(el).getPropertyValue('background-color')
    setColor(varColor)
  }, [ref])

  return (
    <table className="table w-100" ref={ref}>
      <tbody>
      <tr>
        <td className="text-muted">HEX:</td>
        <td className="font-weight-bold">{ rgbToHex(color) }</td>
      </tr>
      <tr>
        <td className="text-muted">RGB:</td>
        <td className="font-weight-bold">{ color }</td>
      </tr>
      </tbody>
    </table>
  )
}


const Colors = () => {
  const [foodInput, setFoodInput] = useState('');

  const handleSubmit = () => {
    console.log('** SUBMITTING FORM FOR CREATING SHIFT **')
    console.log(`\tfoodInput: ${foodInput}`)

    // make axios call to create a shift
    const createShiftRoute = `${process.env.REACT_APP_BACKEND}/get-num-ingredients`;
    const agent = new https.Agent({
      rejectUnauthorized: false,
    });

    axios.post(createShiftRoute, {
      food_item: foodInput
    },{
      httpsAgent: agent
    }).then((response) => {
      console.log(`Created Shift Response`)
      console.log(response)
    })
    .catch((err) => console.log(err));
  }

  return (
    <>
      <CCard>
        <CCardHeader>
          499 TESTING
        </CCardHeader>
        <CCardBody>
          <CRow>
            <CCol xs="6">
              <CLabel htmlFor="foodInput">Max Number of Volunteers</CLabel>
              <CInput 
                type="text" 
                id="foodInput"
                placeholder="#" 
                value={foodInput}
                onChange={ (e) => setFoodInput(e.target.value) }
                min="0"
              />
            </CCol>
          </CRow>
        </CCardBody>
        <CCardFooter>
              <CButton 
                type="submit" 
                size="sm" 
                color="primary"
                onClick={handleSubmit} >
                  Create Shift
              </CButton>
            </CCardFooter>
      </CCard>
    </>
  )
}

export default Colors

import React, { useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CAccordion,
  CAccordionBody,
  CAccordionButton,
  CAccordionCollapse,
  CAccordionHeader,
  CAccordionItem,
} from '@coreui/react'
import { DocsCallout, Example } from 'src/reusable'

class Accordion extends React.Component {
  state = {
    name: 'test',
    data: [],
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then((response) => response.json())
      .then((json) => {
        console.log(json)
        this.setState({ data: json })
      })
  }

  render() {
    return (
      <CRow>
        <CCol xs={12}>
          <h1>Hello customers {this.state.name}</h1>
          {/* eslint-disable-next-line react/prop-types */}
          <button onClick={() => this.props.history.push('/icons/flags')}>Add</button>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Title</th>
              </tr>
            </thead>
            <tbody>
              {!!this.state.data.length && (
                <React.Fragment>
                  {this.state.data.map((item) => {
                    return (
                      <tr key={item.id}>
                        <th scope="row">{item.id}</th>
                        <td>{item.title}</td>
                      </tr>
                    )
                  })}
                </React.Fragment>
              )}
            </tbody>
          </table>
        </CCol>
      </CRow>
    )
  }
}

export default Accordion

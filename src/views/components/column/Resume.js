/* eslint-disable react/prop-types */
import React from 'react'
const Resume = ({ data }) => {
  const getSubSections = (bigsection) => {
    var subSections = bigsection.bigsections.map((bigsection) => {
      return (
        <div key={bigsection.subtitle}>
          <h3>{bigsection.subtitle}</h3>
          <p className="info">
            {bigsection.degree} <span>&bull;</span>
            <em className="date">{bigsection.graduated}</em>
          </p>
          <p>{bigsection.subsection}</p>
        </div>
      )
    })
    return subSections
  }
  const getBigSection = () => {
    if (data) {
      var bigSections = data.body.map((bigsection) => {
        return (
          <div className="row education" key={bigsection.bigtitle}>
            <div className="three columns header-col">
              <nobr>
                <h1>
                  <span>{bigsection.bigtitle}</span>
                </h1>
              </nobr>
            </div>
            <div className="nine columns main-col">
              <div className="row item">
                <div className="twelve columns">{getSubSections(bigsection)}</div>
              </div>
            </div>
          </div>
        )
      })
    }
    return bigSections
  }
  return <section id="resume">{getBigSection()}</section>
}

export default Resume

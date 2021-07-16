/* eslint-disable react/prop-types */
import React from 'react'

const Testimonials = ({ data }) => {
  const annotations = data.annotation.map((annotation) => {
    return (
      <li key={annotation.contributer}>
        <blockquote>
          <p>{annotation.job}</p>
          <cite>{annotation.contributer}</cite>
        </blockquote>
      </li>
    )
  })
  return (
    <section id="testimonials">
      <div className="text-container">
        <div className="row">
          <div className="two columns header-col">
            <h1>
              <span>Client annotation</span>
            </h1>
          </div>
          <div className="ten columns flex-container">
            <ul className="slides">{annotations}</ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials

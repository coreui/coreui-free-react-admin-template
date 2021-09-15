import React from 'react'
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component'
import history_icon from '../../../../assets/icons/history_icon.png'
import 'react-vertical-timeline-component/style.min.css'
import PropTypes from 'prop-types'

const Timeline = ({ data }) => {
  return (
    <div className="d-flex jusitfy-contnet-center align-items-center" id="history">
      <VerticalTimeline>
        {data.history.map((year, i) => (
          <VerticalTimelineElement
            key={i}
            className="vertical-timeline-element--work"
            contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
            contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
            date={year.grade}
            iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
            icon={<img src={history_icon} alt="O" className="img-fluid" />}
          >
            <h3 className="vertical-timeline-element-title">{year.title}</h3>
            <div className="row">
              {year.people.map((person) => {
                return (
                  <div
                    key={person.name}
                    className="col d-flex flex-column align-items-center justify-content-between mt-2"
                  >
                    <img
                      src={person.img}
                      alt=""
                      className="img-fluid"
                      style={{
                        boxShadow: '3px 3px 12px gray',
                        padding: '2px',
                        borderRadius: '50%',
                        maxHeight: '10rem',
                      }}
                    />
                    <h4 className="mt-2">{person.name}</h4>
                  </div>
                )
              })}
            </div>
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
    </div>
  )
}

export default Timeline
Timeline.propTypes = {
  data: PropTypes.object,
}

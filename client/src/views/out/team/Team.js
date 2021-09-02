/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react'
import TeamBlocks from './TeamBlocks'
const Team = () => {
  const [data, setData] = useState([])
  const getData = () => {
    fetch('teamData.json', {
      headers: {
        ContentType: 'application/json',
        Accept: 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => setData(data))
  }
  useEffect(() => {
    getData()
  }, [])
  return (
    <div className="align-items-center" style={{ margin: 0 }}>
      <h1 className="mb-4">Website Contributers</h1>
      {data.front && <TeamBlocks data={data} />}
    </div>
  )
}

export default Team

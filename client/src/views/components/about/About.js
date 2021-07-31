/* eslint-disable prettier/prettier */
import React from 'react'

const About = () => {
  return (
    <div
      style={{
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '40rem',
        justifyContent: 'center',
      }}
    >
      <h1 style={{ lineHeight: '4.5rem', fontWeight: '600' }}>Welcome to NTUEE+</h1>
      <h2 style={{ textAlign: 'center', lineHeight: '3rem' }}>
        我們希望這個聯絡網能成為
        <br />
        一個整合式的社群網路，
        <br />
        讓NTUEErs聚在一起；
        <br />
        秉持著恢復人脈網的精神，
        <br />
        讓NTUEE能在世界上有更大的影響力；
        <br />
        建立一個連結電機系的共同回憶，
        <br />
        讓系友們有專屬的家！
        <br />
      </h2>
      <button
        style={{
          fontWeight: '700',
          border: '2px solid',
        }}
      >
        JOIN US
      </button>
    </div>
  )
}

export default About

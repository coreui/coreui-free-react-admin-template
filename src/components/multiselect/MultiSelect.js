/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import './MultiSelect.scss'
import { CCloseButton } from '@coreui/react'

export default function MultiSelect() {
  const [text, setText] = useState('')

  const data = [
    { id: 1, name: 'hieu' },
    { id: 2, name: 'hieu2' },
    { id: 3, name: 'hieu3' },
    { id: 4, name: 'hieu4s' },
    { id: 5, name: 'hieu4s' },
    { id: 6, name: 'hieu4s' },
    { id: 7, name: 'hieu4s' },
  ]

  return (
    <div className="multi-select">
      <div className="search-bar">
        {data.map((d, i) => {
          return (
            <p className="search-item" key={i}>
              {d.name}
              <CCloseButton className="item-icon" />
            </p>
          )
        })}
        <input
          className="search-input"
          type="text"
          placeholder="nhap tu khoa"
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div className="search-option">
        <ul>
          {data.map((d) => {
            return <li key={d.id}>{d.name}</li>
          })}
        </ul>
      </div>
    </div>
  )
}

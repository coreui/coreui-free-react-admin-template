/* eslint-disable react/prop-types */
import React from 'react'

const Title = ({ data }) => {
  const name = data.name
  const exp = data.experience
  const hashtags = data.hashtags.map((hashtag) => {
    return (
      <nobr key={hashtag}>
        <a className="hashtag" href="">
          #{hashtag}&emsp;
        </a>
      </nobr>
    )
  })
  return (
    <header>
      <div className="row banner">
        <div className="banner-text">
          <h1 className="responsive-headline">{name}</h1>
          <h1>{exp}</h1>
          {hashtags}
          <hr />
        </div>
      </div>
    </header>
  )
}

export default Title

/* eslint-disable react/prop-types */
import React from 'react'

const Title = ({ data }) => {
  if (data) {
    var name = data.name
    var exp = data.experience
    var hashtags = data.hashtags.map((hashtag) => {
      return (
        <nobr key={hashtag}>
          <a className="hashtag" href="">
            #{hashtag}&emsp;
          </a>
        </nobr>
      )
    })
  }
  return (
    <header id="home">
      <div className="row banner">
        <div className="banner-text">
          <h1 className="responsive-headline">{name}</h1>
          <h1 className="responsive-headline">{exp}</h1>
          {hashtags}
          <hr />
        </div>
      </div>
    </header>
  )
}

export default Title

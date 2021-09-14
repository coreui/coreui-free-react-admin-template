/* eslint-disable prettier/prettier */
import React from 'react'
import About from './about'
import Contact from './contact'
import History from './history'
import Team from './team'
import Services from './services'
import Feature from './features'
import Interviews from './interviews'
import Header from './header'

const Home = () => {
  return (
    <div
      className="landing"
      style={{ color: 'white', justifyContent: 'center', alignItems: 'center' }}
    >
      <Header />
      <Feature />
      <About />
      <Services />
      <Interviews />
      <History />
      <Team />
      <Contact />
    </div>
  )
}

export default Home

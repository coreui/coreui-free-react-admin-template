/* eslint-disable prettier/prettier */
import { useEffect } from 'react'
import AOS from 'aos'
import React from 'react'
import About from './about'
import Contact from './contact'
import History from './history'
import Team from './team'
import Services from './services'
import Interviews from './interviews'
import Header from './header'

const Home = () => {
  useEffect(() => {
    AOS.init({
      once: false,
      disable: 'phone',
      duration: 1000,
      easing: 'ease-out-cubic',
    })
    window.addEventListener('load', AOS.refresh)
  }, [])
  return (
    <div
      className="landing"
      style={{ color: 'white', justifyContent: 'center', alignItems: 'center' }}
    >
      <Header />
      <Services />
      <About />
      <Interviews />
      <History />
      <Team />
      <Contact />
    </div>
  )
}

export default Home

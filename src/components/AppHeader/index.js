import React from 'react'
import { useSelector } from 'react-redux'
import AppHeaderEmployee from './AppHeaderEmployee'
import AppHeaderManager from './AppHeaderManager'

const AppHeader = () => {
  const { user } = useSelector((state) => state.auth)
  return user.user.IsEmployee ? <AppHeaderEmployee /> : <AppHeaderManager />
}

export default AppHeader

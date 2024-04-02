import React from 'react'
import { Outlet } from 'react-router-dom'

const ScreenHome = () => {
  return (
    <div>
      Screen
      <Outlet/>
    </div>
  )
}

export default ScreenHome
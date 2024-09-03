import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import { AuthProvider } from '../utility/AuthContext'

const Body = () => {
  return (
   <AuthProvider>
    <div  className=" box-border w-full h-screen bg-lime-200 " >
        <Header/>

        {/* MAINPAGE , SIGNIN  */}
        <Outlet/>
    </div>
    </AuthProvider>
  )
}

export default Body
import React from 'react'
import { Routes, Route, Navigate } from "react-router-dom"
import './Registration.css'
import Login from '../../components/Login/Login'
import Signup from '../../components/Signup/Signup'


function Registeration() {
  return (
    <div className='registration'>
      <div className='register-box'>
        <Routes>
          <Route path='/' element={<Navigate to="login" />} />
          <Route path='login' element={<Login />} />
          <Route path='signup' element={<Signup />} />
        </Routes>
      </div>
      
    </div>
  )
}

export default Registeration
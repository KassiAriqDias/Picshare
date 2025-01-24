import React from 'react'
import { Routes, Route, Navigate } from "react-router-dom"
import './Registration'
import Login from '../../components/Login/Login'
import Signup from '../../components/Signup/Signup'


function Registeration() {
  return (
    <div>
      <h1>Registration</h1>
      <Routes>
        <Route path='/' element={<Navigate to="login" />} />
        <Route path='login' element={<Login />} />
        <Route path='signup' element={<Signup />} />
      </Routes>
    </div>
  )
}

export default Registeration
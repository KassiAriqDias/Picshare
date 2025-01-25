import React from 'react'
import "./Admin.css"
import Login from '../../components/Login/Login'

const Admin = () => {
  let login = true;

  if(login){
    return (
      <div className='admin-page'>
        <h1>Admin Page</h1>
        <p>welcome to admin page, this page is under development</p>
      </div>
    )
  }
  else{
    return (
      <div className='admin-page'>
        <div className='admin-login-box'>
          <Login admin={true} />
        </div>
          
      </div>
    )
  }
  
}

export default Admin
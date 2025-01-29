import React from 'react'
import './Header.css'
import { useLocation } from 'react-router-dom'

const Header = props => {
  const location = useLocation();
  let path = location.pathname.split("/").filter(Boolean).shift();
  if(!path){
    path = "home"
  }

  const onLogout = () => {
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("user")
  }

  return (
    <header className='header'>
        <p className='logo'>Picshare</p>
        <ul>
            <li>
                {path === "home" && <div><a href='/#/profile'>Account</a><a href='/#/admin'>Admin</a></div>}
                {path === "profile" && <div><a href='/'>Home</a><a href='/' onClick={onLogout}>Logout</a></div>}
            </li>
        </ul>
    </header>
  )
}


export default Header;
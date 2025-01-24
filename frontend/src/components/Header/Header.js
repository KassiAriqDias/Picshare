import React from 'react'
import './Header.css'

const Header = () => {
  return (
    <header className='header'>
        <p className='logo'>Picshare</p>
        <ul>
            <li>
                <a href='/registration/'>Account</a>
            </li>
        </ul>
    </header>
  )
}


export default Header;
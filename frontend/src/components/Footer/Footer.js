import React from 'react'
import './Footer.css'

const Footer = () => {
  return (
    <div className='footer'>
      <ul className='creators-list'>
        <p>Kassiyet Bolat</p>
        <p>Dias </p>
        <p>Ariq</p>
        <p><strong>Group: IT-2307</strong></p>
      </ul>
      <div className='contact'>
          <i class='contact-actions bx bxl-instagram-alt' ></i>
          <i class='contact-actions bx bxl-facebook-circle' ></i>
          <i class='contact-actions bx bxl-gmail'></i>
      </div>
      <p className='footer-copyright'>© 2025 Copyright: KassiAriqDias. All Rights Reserved</p>
    </div>
    
  )
}

export default Footer
import React from 'react'
import './Announcement.css'

const Announcement = (promp) => {

    return (
        <div className='announcement'>
            <div className='announcement-header'>
               <h2>Announcement & Udate</h2>          
            </div>
            <div className='announcement-body' >
              <img src={promp.images[0]} alt='announcement'/>
              <div className='carusel'>
                <i className='bx bxs-left-arrow'></i>
                <i className='bx bxs-right-arrow' ></i>
              </div>
            </div>
            <div className='announcement-footer'>
                <div>
                <h4>Now Available in More Languages!</h4><br/>
                <p>We've added support for Russian! Go to settings to switch your language.</p>
                </div>                
            </div>
        </div>
      )
}

export default Announcement
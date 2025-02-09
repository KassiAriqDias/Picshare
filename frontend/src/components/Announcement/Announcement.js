import React from 'react'
import './Announcement.css'

const Announcement = (promp) => {

    const dummy_image = ['../../']
    return (
        <div className='announcement'>
            <div className='announcement-header'>
    
              <div className='announcement-box-left'>
                <img className='profile-pic' src={promp.profilePic} alt='profile' />
                <p className='profile-username'>{promp.username}</p>
              </div> 
              
            </div>
            <div className='announcement-body' >
              <img src='https://i.pinimg.com/736x/dc/7d/48/dc7d4866cfcc0cf1f32123d822113230.jpg' alt='post'/>
              <div className='carusel'>
                <i class='bx bxs-left-arrow'></i>
                <i class='bx bxs-right-arrow' ></i>
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
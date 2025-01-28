import React from 'react'
import './Post.css'


const Post = (promp) => {
  return (
    <div className='post'>
        <div className='post-header'>

          <div className='post-box-left'>
            <img className='profile-pic' src={promp.profilePic} alt='profile' />
            <p className='profile-username'>{promp.username}</p>
          </div>

          <div className='post-box-right'>
            <i className='post-actions bx bx-dots-vertical-rounded'></i>
          </div>

          
        </div>
        <div className='post-body' >
          <img src={promp.post} alt='post'/>
        </div>
        <div className='post-footer'>
          <div className='post-box-left'>
            <i className='post-actions bx bx-heart' ></i>
            <i className='post-actions bx bx-message-rounded-dots'></i>
            <i className='post-actions bx bx-send' ></i>
          </div>
          <div className='post-box-right'>
            <i className='post-actions bx bx-bookmark'></i>
          </div>
        </div>
    </div>
  )
}

export default Post
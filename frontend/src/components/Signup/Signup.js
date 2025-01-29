import React from 'react'

const Signup = props => {
  return (
    <>
        <h2>SIGN UP</h2>
        <form onSubmit={props.onSubmit}>
          <div>
          <label htmlFor="username"><i className='bx bxs-user' ></i></label>
          <input type='text' name="username" id="username" placeholder='Username' value={props.generatedUsername} onChange={props.onUsernameChange} required  minLength={3}/><br/>
          <a onClick={props.onGenerate} className='generate-username-btn'>generate username</a>
          </div>
          
          <div>
            <label htmlFor="password"><i className='bx bxs-lock' ></i></label>
            <input type='password' name="password" id="password" placeholder='Password' required minLength={8} /><br/>
          </div>
          <p className='error-message' style={{color:props.messageColor}} >{props.message}</p>
          
          <input className="submit-btn" type='submit' value="Sign up" />
        </form>
        <a href='./login'>Already have an account?</a>
    </>
  )
}

export default Signup
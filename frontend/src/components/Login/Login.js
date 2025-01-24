import React from 'react'

const Login = () => {
  return (
    <>
        <h2>LOGIN</h2>
        <form>
          <div>
          <label for="username"><i class='bx bxs-user' ></i></label>
          <input type='text' name="username" id="username" placeholder='Username' required /><br/>
          </div>
          <div>
            <label for="password"><i class='bx bxs-lock' ></i></label>
            <input type='password' name="password" id="password" placeholder='Password' required /><br/>
          </div>
          
          <input className="submit-btn"type='submit' value="Login" />
        </form>
        <a href='./signup'>Don't have an account?</a>
    </>
  )
}

export default Login
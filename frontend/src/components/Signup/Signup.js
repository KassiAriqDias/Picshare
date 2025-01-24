import React from 'react'

const Signup = () => {
  return (
    <>
        <h2>SIGN UP</h2>
        <form>
          <div>
          <label for="username"><i class='bx bxs-user' ></i></label>
          <input type='text' name="username" id="username" placeholder='Username' required  minLength={8}/><br/>
          </div>
          <div>
            <label for="password"><i class='bx bxs-lock' ></i></label>
            <input type='password' name="password" id="password" placeholder='Password' required minLength={8} /><br/>
          </div>
          
          <input className="submit-btn" type='submit' value="Sign up" />
        </form>
        <a href='./login'>Already have an account?</a>
    </>
  )
}

export default Signup
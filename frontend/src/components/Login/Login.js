import React from 'react'

const Login = (props) => {
  if (!props.admin) {
    return (
      <>
        <h2>LOGIN</h2>
        <form>
          <div>
            <label htmlFor="username">
              <i className="bx bxs-user"></i>
            </label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Username"
              required
            />
          </div>
          <div>
            <label htmlFor="password">
              <i className="bx bxs-lock"></i>
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              required
            />
          </div>
          <input className="submit-btn" type="submit" value="Login" />
        </form>
        <a href="./signup">Don't have an account?</a>
      </>
    );
  } else {
    return (
      <>
        <h2>ADMIN LOGIN</h2>
        <form>
          <div>
            <label htmlFor="username">
              <i className="bx bxs-user"></i>
            </label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Username"
              required
            />
          </div>
          <div>
            <label htmlFor="password">
              <i className="bx bxs-lock"></i>
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              required
            />
          </div>
          <input className="submit-btn" type="submit" value="Login" />
        </form>
      </>
    );
  }
}

export default Login
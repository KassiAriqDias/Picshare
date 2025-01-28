import React from 'react'
import "./Admin.css"
import { useState, useEffect } from 'react'
import serverUrl from '../../serverUrl.json'

const Admin = () => {
  let isAdmin = JSON.parse(localStorage.getItem("isLoggedIn"));
  const user = JSON.parse(localStorage.getItem("user"));
  const [usersList, setUsersList] = useState([]);
  const [errorMessage, seterrorMessage] = useState("");
    const [messageColor, setMessageColor] = useState("");

  const getUsersList = () => {
    fetch(`${serverUrl.url}/admin/users`)
    .then(response => {
      if(!response.ok){
        return response.json().then(data => { throw new Error(data.error)});
      }
      return response.json()
    })
    .then(data => {
      setUsersList(data);
      
    })
    .catch(err => {
      console.log(err);
      seterrorMessage(err.message);
      setMessageColor("red");
    })
  }

  const deleteUser = id => {
    fetch(`${serverUrl.url}/admin/delete/${id}`, {
      method:"DELETE",
      headers:{
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if(!response.ok){
        return response.json().then(data => { throw new Error(data.error)});
      }
      return response.json()
    })
    .then(data => {
      console.log(data.message)
      seterrorMessage(data.message);
      setMessageColor("green");
    })
    .catch(err => {
      console.log(err);
      seterrorMessage(err.message);
      setMessageColor("red");
    })
    setTimeout(() => {
      window.location.href = "/admin";
    }, 1000);
  }

  const createUser = (event) => {
    event.preventDefault();
    const { username, password } = event.target.elements;

    const userData = {
      username: username.value,
      password: password.value
    };

    return fetch(`${serverUrl.url}/users/register`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
    .then(response => {
      if (!response.ok) {
        return response.json().then(data => { throw new Error(data.error); });
      }
      return response.json();
    })
    .then(data => {
      seterrorMessage(data.message);
      setMessageColor("green");
      setTimeout(() => {
        window.location.href = "/admin";
      }, 500);
    })
    .catch(error => {
      setMessageColor("red");
      seterrorMessage(error.message);
    });
    
  }

  useEffect(() => {
    getUsersList();
  }, [])

  if(isAdmin){
    return (
      <div className='admin-page'>
        <h1 className='page-title'>Admin Page</h1>
        <div className='admin-info'>
          <img src={user.profilePicture} className='pfp' alt='profile'></img>
          <p className='admin-username'>{user.username}</p>
        </div>
        <p style={{color: messageColor}}>{errorMessage}</p>
        <div className='workspace'>
          <h2>Worksapce</h2>
          {usersList.map( user => {
              return (<div className='row' key={user._id}>
                <div className='id'>
                  <p>{user._id}</p>
                </div>
                <div className='username'>
                  <p>{user.username}</p>
                </div>
                <div className='action'>
                  <button className='action-btn action-edit'>edit</button>
                  <button onClick={() => deleteUser(user._id)} className='action-btn action-delete'>delete</button>
                </div>
              </div>)
            })}
          
          <div className='create-user'>
            <h3>create user</h3>
            <form onSubmit={createUser}>
              <div>
              <label htmlFor="username"><i className='bx bxs-user' ></i></label>
              <input type='text' name="username" id="username" placeholder='Username' required  minLength={3}/><br/>
              </div>
              <div>
                <label htmlFor="password"><i className='bx bxs-lock' ></i></label>
                <input type='password' name="password" id="password" placeholder='Password' required minLength={8} /><br/>
              </div>
              
              <input className="submit-btn" type='submit' value="Create" />
            </form>
          </div>
  
        </div>
      </div>
    )
  }
  else{
    return(<p>You are not an admin user</p>)
  }
  
}

export default Admin
import React, { use } from 'react'
import "./Admin.css"
import { useState, useEffect } from 'react'
import serverUrl from '../../serverUrl.json'

const Admin = () => {
  let isAdmin = JSON.parse(localStorage.getItem("user")).isAdmin;
  const user = JSON.parse(localStorage.getItem("user"));
  const [usersList, setUsersList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [messageColor, setMessageColor] = useState("");
  const [userToEdit, setUserToEdit] = useState(null);

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
      setErrorMessage(err.message);
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
      setErrorMessage(data.message);
      setMessageColor("green");
      setTimeout(() => {
        window.location.href = "/admin";
      }, 1000);
    })
    .catch(err => {
      console.log(err);
      setErrorMessage(err.message);
      setMessageColor("red");
    })
    
  }

  const createUser = event => {
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
      setErrorMessage(data.message);
      setMessageColor("green");
      setTimeout(() => {
        window.location.href = "/admin";
      }, 500);
    })
    .catch(error => {
      setMessageColor("red");
      setErrorMessage(error.message);
    });
    
  }

  const getUser = async id => {
    try{
      const response = await fetch(`${serverUrl.url}/admin/user/${id}`)
      if(!response.ok){
          return response.json().then(data => {throw new Error(data.error)});
      }
      const data = await response.json();
      setUserToEdit(data);
    }
    catch(err){
      setErrorMessage(err.message);
      setMessageColor("red");
      console.log(err.message);
    }
  }

  const editUser = event => {
    event.preventDefault();
    const { username, password, isAdmin } = event.target.elements;

    const updatedUser = {
      ...userToEdit,
      username: username.value,
      password: password.value,
      isAdmin: isAdmin.value
    };
    console.log(updatedUser)
    fetch(`${serverUrl.url}/admin/edit/${userToEdit._id}`, {
      method: "PUT", 
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUser)
    })
    .then(response => {
        if(!response.ok){
            return response.json().then(data => {throw new Error(data.error)});
        }
        return response.json()
    })
    .then(data => {
        setErrorMessage(data.message);
        setMessageColor("green");
        setTimeout(() => window.location.href = "/admin", 100);
    })
    .catch(err => {
        setErrorMessage(err.message);
        setMessageColor("red");
        console.log(err.message);
    })
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
              return (<div className='row' key={user._id} style={user.isAdmin ? {'background-color': 'green'} : {}}>
                <div className='id'>
                  <p>{user._id}</p>
                </div>
                <div className='username'>
                  <p>{user.username}</p>
                </div>
                <div className='action'>
                  <button className='action-btn action-edit' onClick={(e) => getUser(user._id)}>edit</button>
                  <button onClick={() => deleteUser(user._id)} className='action-btn action-delete'>delete</button>
                </div>
              </div>)
          })}
          <div style={{display:'flex', margin: "10px", width:'100%'}}><div style={{width: '20px', height: '20px', 'background-color':'green', 'margin-right':'10px'}}></div>- admin</div>

          {userToEdit && (<div className='edit-user'>
            <h3>edit user</h3>
            <p>usermame: {userToEdit.username}</p>
            <p>usermame: {userToEdit.password}</p>
            <p>admin status: {`${userToEdit.isAdmin}`}</p>
            <form onSubmit={ e => editUser(e)}>
              <div>
              <label htmlFor="username-edit"><i className='bx bxs-user' ></i></label>
              <input type='text' name="username" id="username-edit" placeholder='Username' required /><br/>
              </div>
              <div>
                <label htmlFor="password-edit"><i className='bx bxs-lock' ></i></label>
                <input type='password' name="password" id="password-edit" placeholder='Password' required /><br/>
              </div>
              <input id='isAdmin' type='checkbox' name="isAdmin" value="true" /><label for="isAdmin"> admin </label><br/>
              
              <input className="submit-btn" type='submit' value="Edit" />
            </form>
          </div>)}
          
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
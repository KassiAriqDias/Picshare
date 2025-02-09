import React from 'react'
import "./Admin.css"
import { useState, useEffect } from 'react'
import serverUrl from '../../serverUrl.json'

const Admin = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const [usersList, setUsersList] = useState([]);
  const [itemList, setItemsList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [messageColor, setMessageColor] = useState("");
  const [userToEdit, setUserToEdit] = useState(null);
  const [itemToEdit, setItemToEdit] = useState(null);

  useEffect(()=> {
    const fetchUserInfo = async setUserInfo => {
      const token = JSON.parse(localStorage.getItem("token"));

      if (!token) {
          setErrorMessage("No token found. Please log in.");
          setTimeout(() => window.location.assign('./#/registeration/login'), 500);
          return;
      }

      try {
          const response = await fetch(`${serverUrl.url}/users/user`, {
              method: "GET",
              headers: {
                  "Authorization": `Bearer ${token}`,
                  "Content-Type": "application/json",
              },
          });

          if (!response.ok) {
              throw new Error("Failed to fetch user info");
          }

          const data = await response.json();
          setUserInfo(data);
      } catch (err) {
          setMessageColor("red")
          setErrorMessage(err.message);
      }
  };

  fetchUserInfo(setUser);
  setTimeout(() => setLoading(false), 500)

  getUsersList();
  getItemsList();
  
  }, [])

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
        window.location.reload();
      }, 500);
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
        window.location.reload();
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
      isAdmin: isAdmin.checked
    };
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
        setTimeout(() => window.location.reload(), 100);
    })
    .catch(err => {
        setErrorMessage(err.message);
        setMessageColor("red");
        console.log(err.message);
    })
  } 

  const createItem = async (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData();

    const title_en = form.elements.title_en.value;
    const description_en = form.elements.description_en.value;
    const images = form.elements.images.files;

    formData.append("title_en", title_en);
    formData.append("description_en", description_en);

    if (images.length !== 3) {
        alert("Please select exactly 3 images.");
        return;
    }

    for (let i = 0; i < images.length; i++) {
        formData.append("images", images[i]); 
    }

    try {
        const response = await fetch(`${serverUrl.url}/api/items`, {
            method: "POST",
            body: formData,
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.error);
        }

        setErrorMessage("Item created successfully!");
        setMessageColor("green");
        setTimeout(() => window.location.reload(), 500);
    } catch (error) {
        setErrorMessage(error.message);
        setMessageColor("red");
    }
  };

  const getItemsList = () => {
    fetch(`${serverUrl.url}/api/items`)
    .then(response => {
      if(!response.ok){
        return response.json().then(data => { throw new Error(data.error)});
      }
      return response.json()
    })
    .then(data => {
      setItemsList(data);
      
    })
    .catch(err => {
      console.log(err);
      setErrorMessage(err.message);
      setMessageColor("red");
    })
  }

  const getItem = async id => {
    try{
      const response = await fetch(`${serverUrl.url}/api/items/${id}`)
      if(!response.ok){
          return response.json().then(data => {throw new Error(data.error)});
      }
      const data = await response.json();
      setItemToEdit(data);
    }
    catch(err){
      setErrorMessage(err.message);
      setMessageColor("red");
      console.log(err.message);
    }
  }

  const editItem = async (event) => {
    event.preventDefault();

    const form = event.target;
    const title_en = form.elements.title_en.value;
    const description_en = form.elements.description_en.value;

    try {
        const response = await fetch(`${serverUrl.url}/api/items/${itemToEdit._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ title_en, description_en }), 
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.error);
        }

        setErrorMessage("Item updated successfully!");
        setMessageColor("green");
        setTimeout(() => window.location.reload(), 500);
    } catch (error) {
        setErrorMessage(error.message);
        setMessageColor("red");
    }
  };

  const deleteItem = id => {
    fetch(`${serverUrl.url}/api/items/${id}`, {
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
        window.location.reload();
      }, 500);
    })
    .catch(err => {
      console.log(err);
      setErrorMessage(err.message);
      setMessageColor("red");
    })
    
  }
  

  if(loading){
    return(
      <div className='admin-page'>
        <p>loading...</p>
      </div>
    )
  }

 

  if(user.isAdmin){
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
              return (<div className='row' key={user._id} style={user.isAdmin ? {backgroundColor: 'green'} : {}}>
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
          <div style={{display:'flex', margin: "10px", width:'100%'}}><div style={{width: '20px', height: '20px', backgroundColor:'green', marginRight:'10px'}}></div>- admin</div>

          {userToEdit && (<div className='edit-user'>
            <h3>edit user</h3>
            <p>usermame: {userToEdit.username}</p>
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
              <input id='isAdmin' type='checkbox' name="isAdmin" value="true" /><label htmlFor="isAdmin"> admin </label><br/>
              
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
        <div className='workspace'>
          <h2>Announcements & Updates</h2>
          {itemList.map( item => {
              return (<div className='row' key={item._id}>
                <div className='id'>
                  <p>{item._id}</p>
                </div>
                <div className='username'>
                  <p>{item.title_en}</p>
                </div>
                <div className='action'>
                  <button className='action-btn action-edit' onClick={(e) => getItem(item._id)}>edit</button>
                  <button onClick={() => deleteItem(item._id)} className='action-btn action-delete'>delete</button>
                </div>
              </div>)
          })}

          {itemToEdit && (<div className='edit-user'>
            <div className='create-item'>
            <h3>edit item</h3>
            <p>id: {itemToEdit._id}</p>
            <p>title: {itemToEdit.title_en}</p>
            <form onSubmit={editItem}>
              <input type='text' name="title_en" id="title" placeholder='Title' required />
              <textarea name='description_en' id='description'  rows="10" placeholder='Description' required/><br/>
              <input className="submit-btn" type='submit' value="Edit" />
            </form> 
          </div>
          </div>)}
          <div className='create-item'>
            <h3>create item</h3>
            <form onSubmit={createItem}>
              <input type='text' name="title_en" id="title" placeholder='Title' required />
              <textarea name='description_en' id='description'  rows="10" placeholder='Description' required/><br/>
              <label htmlFor="imageUpload">Upload 3 images:</label>
              <input type="file" id="imageUpload" name="images" accept="image/*" multiple required/><br/>
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
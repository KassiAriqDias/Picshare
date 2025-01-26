import React from 'react'
import "./Admin.css"
import Login from '../../components/Login/Login'
import { useState, useEffect } from 'react'
import dummyPost from '../../dummy_data/post.json'

const Admin = () => {
  let login = true;
  const [pfpUrl, setPfpUrl] = useState(null);

  const generatePFP = async () => {
    const response = await fetch('https://api.dicebear.com/9.x/pixel-art/svg');
    const data = response.url;
    return data;
  }

  useEffect(() => {
    if (login) {
      const fetchPFP = async () => {
        const url = await generatePFP();
        setPfpUrl(url);
      };
      fetchPFP();
    }
  }, [login]);

  if(login){
    return (
      <div className='admin-page'>
        <h1 className='page-title'>Admin Page</h1>
        <div className='admin-info'>
          <img src={pfpUrl} className='pfp' alt='profile'></img>
          <p className='admin-username'>Kassiyet</p>
        </div>

        <div className='workspace'>
          <h2>Worksapce</h2>
          {dummyPost.map( post => {
              return (<div className='row' key={post.id}>
                <div className='id'>
                  <p>{post.id}</p>
                </div>
                <div className='username'>
                  <p>{post.username}</p>
                </div>
                <div className='action'>
                  <a href="/" className='action-btn action-edit'>edit</a>
                  <a href="/" className='action-btn action-delete'>delete</a>
                </div>
              </div>)
            })}
          
          <div className='create-user'>
            <h3>create user</h3>
            <form>
              <div>
              <label for="username"><i class='bx bxs-user' ></i></label>
              <input type='text' name="username" id="username" placeholder='Username' required  minLength={8}/><br/>
              </div>
              <div>
                <label for="password"><i class='bx bxs-lock' ></i></label>
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
    return (
      <div className='admin-page'>
        <div className='admin-login-box'>
          <Login admin={true} />
        </div>
          
      </div>
    )
  }
  
}

export default Admin
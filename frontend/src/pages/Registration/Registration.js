import React from 'react'
import { Routes, Route, Navigate} from "react-router-dom"
import { useState } from 'react'
import './Registration.css'
import Login from '../../components/Login/Login'
import Signup from '../../components/Signup/Signup'
import serverUrl from '../../serverUrl.json'


function Registeration() {

  const [generatedUsername, setGenetatedUsername] = useState("");

  const [responseMessage, setResponseMessage] = useState("");
  const [messageColor, setMessageColor] = useState("");

  const generateUsername = () => {
    fetch(`${serverUrl.url}/users/generate_name`)
    .then(response => {
      if(!response.ok){
        return response.json().then(data => {
          throw new Error(data.error)
        })
      }
      return response.json();
    })
    .then(data => {
      setGenetatedUsername(data.username)
    })
    .catch(error => {
      setMessageColor("red");
      setResponseMessage(error.message);
    });
  }

  const handleApiRequest = (endpoint, data) => {
    return fetch(`${serverUrl.url}/users/${endpoint}`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        if (!response.ok) {
          return response.json().then(data => { throw new Error(data.error); });
        }
        return response.json();
      });
  };

  const handleSubmit = (event, endpoint) => {
    event.preventDefault();
    const { username, password } = event.target.elements;

    const userData = {
      username: username.value,
      password: password.value
    };

    handleApiRequest(endpoint, userData)
    .then(data => {
      setResponseMessage(data.message);
      setMessageColor("green");
      if (endpoint === 'login') {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("token", JSON.stringify(data.token));
        setTimeout(() => window.location.href = "/", 1000);
      } else {
        
        setTimeout(() => {
          window.location.href = "/#/registration/login";
        }, 1000);
      }
    })
    .catch(error => {
      setMessageColor("red");
      setResponseMessage(error.message);
    });
    
  }

  const handleUsernameChange = (event) => {
    setGenetatedUsername(event.target.value); 
  };




  return (
    <div className='registration'>
      <div className='register-box'>
        <Routes>
          <Route path='/' element={<Navigate to="login" />} />
          <Route path='login' element={
            <Login
              onSubmit={(e) => handleSubmit(e, 'login')}
              message={responseMessage} 
              messageColor={messageColor}
            />
          } />
          <Route path='signup' element={
            <Signup 
              onSubmit={(e) => handleSubmit(e, 'register')}
              message={responseMessage} 
              messageColor={messageColor} 
              onGenerate={generateUsername}
              generatedUsername={generatedUsername}
              onUsernameChange={handleUsernameChange}
            />
          } />
        </Routes>
      </div>
      
    </div>
  )
}

export default Registeration
import React from 'react'
import { Routes, Route, Navigate, useNavigate } from "react-router-dom"
import { useState, useEffect } from 'react'
import './Registration.css'
import Login from '../../components/Login/Login'
import Signup from '../../components/Signup/Signup'
import serverUrl from '../../serverUrl.json'


function Registeration() {
  const navigate = useNavigate();

  const [registerUserData, setRegisterUserData] = useState({
    username: "",
    password: ""
  });
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

  const handleSignUp = () =>{
    fetch(`${serverUrl.url}/users/register`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(registerUserData)
    })
    .then(response => {

      if (!response.ok) {
      
        return response.json().then(data => {
          throw new Error(data.error);
        });
      }
      return response.json();
    })
    .then(data => {
      setResponseMessage(data.message);
      setMessageColor("green");
      setTimeout(() => navigate("/"), 2000);
    })
    .catch(error => {
      setMessageColor("red");
      setResponseMessage(error.message);
    });
  }

  const  handleLogin = () => {
    fetch(`${serverUrl.url}/users/register`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(registerUserData)
    })
    .then(response => {

      if (!response.ok) {
      
        return response.json().then(data => {
          throw new Error(data.error);
        });
      }
      return response.json();
    })
    .then(data => {
      setResponseMessage(data.message);
      setMessageColor("green");
      setInterval(() => console.log("redirected"), 2000);
    })
    .catch(error => {
      setMessageColor("red");
      setResponseMessage(error.message);
    });
  }

  useEffect(() => {
    if(registerUserData.username !== "" && registerUserData.password !== ""){
      handleSignUp();
    }

  }, [registerUserData]);

  const onSignUp = event => {
    event.preventDefault();
    const { username, password } = event.target.elements;
    const updatedData = {
      username: username.value,
      password: password.value
    };
    setRegisterUserData(prev => {
      return {
        ...prev,
        ...updatedData
      }
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
          <Route path='login' element={<Login  />} />
          <Route path='signup' element={
            <Signup 
              onSubmit={onSignUp} 
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
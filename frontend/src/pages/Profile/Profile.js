import React, { useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import serverUrl from '../../serverUrl.json'
import './Profile.css'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
    const navigate = useNavigate();

    const [userInfo, setUserInfo] = useState({
        username: "",
        password: "",
        profilePicture: "https://api.dicebear.com/9.x/notionists-neutral/svg?seed=Avery&eyes=variant04&lips=variant24,variant19",
        createdAt: ""
    });

    const [errorMessage, setErrorMessage] = useState("");
    const [messageColor, setMessageColor] = useState("");
    const [editMode, setEditMode] = useState(false);
    const [pfpUrl, setPfpUrl] = useState("https://api.dicebear.com/9.x/notionists-neutral/svg?seed=Avery&eyes=variant04&lips=variant24,variant19");

    useEffect(() => {
        const fetchUserInfo = async () => {
            const token = JSON.parse(localStorage.getItem("token"));

            if (!token) {
                setErrorMessage("No token found. Please log in.");
                setTimeout(() => navigate("/login"), 2000);
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

                if (response.status === 401) {
                    setErrorMessage("Session expired. Please log in again.");
                    localStorage.removeItem("token");
                    setTimeout(() => navigate("/login"), 2000);
                    return;
                }

                if (!response.ok) {
                    throw new Error("Failed to fetch user info");
                }

                const data = await response.json();
                setUserInfo(data);
                setPfpUrl(data.profilePicture);
            } catch (err) {
                setMessageColor("red")
                setErrorMessage(err.message);
            }
        };

        fetchUserInfo();
    }, [navigate]);


    const toggleNextPfp = () => {
        fetch(`${serverUrl.url}/users/generate_pfp`)
        .then(response => {
            if(!response.ok){
                throw new Error("Error while generating profile picture");
            }
            return response.json()
        })
        .then(data => {
            setPfpUrl(data.generated_pfp_url)
        })
        .catch(err => {
            setErrorMessage(err.message);
            setMessageColor("red");
            console.log(err.message);
        })
    }
    const savePfp = () => {
        const updatedUser = {
            ...userInfo,
            profilePicture: pfpUrl
        };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        fetch(`${serverUrl.url}/admin/edit/${userInfo._id}`, {
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
            setTimeout(() => window.location.reload(), 500);
        })
        .catch(err => {
            setErrorMessage(err.message);
            setMessageColor("red");
            console.log(err.message);
        })
        
    }
    
  return (
    <div>
        {/* {console.log(userInfo)} */}
        <Header />
        <div className='profile-page'>
            <h3>Account Info</h3>
            
            <div className='user-info'>
                <div className='user-info-pfp'>
                    <img src={userInfo.profilePicture} alt="Profile" />
                    <button onClick={()=> setEditMode(true)}>Edit profile picture</button>
                </div>
                <ul className='user-info-list'>
                    <li>Username: <span>{userInfo.username}</span></li>
                    <li>Password: <span>{userInfo.password}</span></li>
                    <li>Account created: <span>{userInfo.createdAt.split("T")[0]}</span></li>
                </ul>
            </div>

            {editMode && (<div className='edit-pfp'>
                <p>choose new profile picture</p>
                <img className='pfp' src={pfpUrl} alt="Profile" />
                <div>
                    <button href='#' onClick={toggleNextPfp}>next</button>
                    <button href='#' onClick={savePfp}>save</button>
                </div>
        
                
            </div>)}  
            <p style={{color: messageColor}}>{errorMessage}</p>
        </div>
    </div>
  )
}

export default Profile
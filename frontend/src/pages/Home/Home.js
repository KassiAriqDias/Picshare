import React from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
const Home = () => {
    let list= [];
    for(let i =0; i<100; i++){
        list.push(<p>the app is under development!</p>);
    }
  return (
    <div>
        <Header/>
        <div className="home-page">
            <h2>Welcome to Picshare frontend</h2>
            {list}
        </div>
    </div>
  )
}

export default Home;
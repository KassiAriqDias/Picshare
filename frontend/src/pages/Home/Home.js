import React from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import Post from '../../components/Post/Post'
import Footer from '../../components/Footer/Footer'
import dummyPost from '../../dummy_data/post.json'


const Home = () => {
  return (
    <div>
        <Header/>
        <div className="home-page">
            {dummyPost.map( post => {
              return <Post key={post.id} profilePic={post.profile_pic} username={post.username} post={post.post}/>
            })}
        </div>
        <Footer />
    </div>
  )
}

export default Home;
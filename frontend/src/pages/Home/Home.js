import React from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import Post from '../../components/Post/Post'
import Announcement from '../../components/Announcement/Announcement'
//import News from '../../components/News/News'
import Quotes from '../../components/Quotes/Quotes'
import Footer from '../../components/Footer/Footer'
import dummyPost from '../../dummy_data/post.json'


const Home = () => {

  return (
    <div className='home'>
        <Header/>
        <div className="home-page">
            <Announcement profilePic={'https://i.pinimg.com/736x/d3/ba/35/d3ba351eb31f34000a26a221cf68601f.jpg'} username={"title"} post={'https://i.pinimg.com/736x/dc/7d/48/dc7d4866cfcc0cf1f32123d822113230.jpg'} />
            {/*<News />*/} 
            <Quotes/>
            {dummyPost.map( post => {
              return <Post key={post.id} profilePic={post.profile_pic} username={post.username} post={post.post}/>
            })}
        </div>
        <Footer />
    </div>
  )
}

export default Home;
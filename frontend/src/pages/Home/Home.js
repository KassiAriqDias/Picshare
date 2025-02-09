import React, { useEffect, useState } from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import Post from '../../components/Post/Post'
import Announcement from '../../components/Announcement/Announcement'
//import News from '../../components/News/News'
import Quotes from '../../components/Quotes/Quotes'
import Footer from '../../components/Footer/Footer'
import dummyPost from '../../dummy_data/post.json'
import serverUrl from '../../serverUrl.json'


const Home = () => {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    fetch(`${serverUrl.url}/api/items`)
    .then(response => {
      if(!response.ok){
        return response.json().then(data => { throw new Error(data.error)});
      }
      return response.json()
    })
    .then(data => {
      setAnnouncements(data);
      
    })
    .catch(err => {
      console.log(err);
    })
  }, [])

  return (
    <div className='home'>
        <Header/>
        <div className="home-page">
          {announcements.map( announcement => {
            return <Announcement key={announcement._id} images={announcement.images} title_en={announcement.title_en} description_en={announcement.description_en}/>
          })}
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
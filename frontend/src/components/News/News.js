import React, { useEffect, useState } from 'react'
import './News.css'
const NEWS_API_KEY = "afe0596a0dbfcbc543cf16084bdc2d1d"

const News = () => {
    const [news, setNews] = useState({});

    useEffect(() => {
        const fetchNews = async () => {
            //console.log(`http://api.mediastack.com/v1/sources?access_key=${NEWS_API_KEY}&categories=entertainment,technology&sort=popularity&sources=buzzfeed,mashable,techcrunch`)
            const response = await fetch(`https://api.mediastack.com/v1/news?access_key=${NEWS_API_KEY}&categories=entertainment,technology&languages=en&sort=popularity&limit=6`);
            const data = await response.json()
            const radomIndex = Math.floor(Math.random() * data.data.length)
            setNews(data.data[radomIndex]);
        }
        fetchNews()
        
    }, [])

    useEffect(() => {
        console.log(news);
    }, [news])
    

    return (
        <div className='news'>
            <div className='news-header'>
                <h2>News</h2>
            </div>
            {news.image ? (<div className='news-body' >
                <img src={news.image} alt='news'/>
            </div>) : (<div></div>) }
            <div className='news-footer'>
                <div>
                <h4>{news.title}</h4><br/>
                <p>{news.description}</p>
                </div>                
            </div>
        </div>
    )
}

export default News
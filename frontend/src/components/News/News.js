import React, { useEffect, useState } from 'react';
import './News.css';
import serverUrl from '../../serverUrl.json';

const News = () => {
    const [news, setNews] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch(`${serverUrl.url}/news`);
                if (!response.ok) {
                    throw new Error("Failed to fetch news");
                }
                const data = await response.json();
                setNews(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    if (loading) return <div className="news">Loading news...</div>;
    if (error) return <div className="news">Error: {error}</div>;
    if (!news || !news.data) return <div className="news">No news available.</div>;

    return (
        <div className='news'>
            <div className='news-header'>
                <h2>News</h2>
            </div>

            {news.data.image && (
                <div className='news-body'>
                    <img src={news.data.image} alt='news' />
                </div>
            )}

            <div className='news-footer'>
                <div>
                    <h4>{news.data.title}</h4>
                    <h4 className='ru'>{news.data_ru?.title || "No Russian translation available"}</h4>

                </div>
                <div>
                    <p>{news.data.description}</p>
                    <p className='ru'>{news.data_ru?.description || "No Russian translation available"}</p>
                </div>

            </div>
        </div>
    );
};

export default News;
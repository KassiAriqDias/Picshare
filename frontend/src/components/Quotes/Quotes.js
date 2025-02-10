import React, { useEffect, useState } from 'react';
import './Quotes.css';
import serverURL from "../../serverUrl.json";

const Quotes = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quote, setQuote] = useState({
        quote: { body: "NO DATA", author: "NO DATA" },
        quote_ru: { body: "NO DATA", author: "NO DATA" }
    });

    const fetchQuote = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${serverURL.url}/quote`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setQuote(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchQuote();
    }, []);

    if (loading) return <div className="quote">Loading quote...</div>;

    if (error) {
        return (
            <div className="quote">
                <p>Error: {error}</p>
                <button onClick={fetchQuote}>Retry</button>
            </div>
        );
    }

    return (
        <div className='quote'>
            <div className='quote-header'>
                <h2>Quote</h2>
            </div>
            <div className='quote-footer'>
                <div>
                    <h4>{quote.quote.body}</h4><br/> 
                    <h4 className='ru'>{quote.quote_ru.body}</h4><br/> 
                </div>
                <div>
                    <p>{quote.quote.author}</p><br />      
                    <p className='ru'>{quote.quote_ru.author}</p>
                </div>
            </div>
        </div>
    );
}

export default Quotes;

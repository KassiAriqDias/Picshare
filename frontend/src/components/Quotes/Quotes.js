import React, { useEffect, useState } from 'react'
import './Quotes.css'
import serverURL from "../../serverUrl.json"

const Quotes = () => {
    const [quote, setQuote] = useState({});

    useEffect(()=>{
        const fetchQuote = async () => {
            const response = await fetch(`${serverURL.url}/quote`);
            if(!response.ok){
                console.log(response.status)
            }
            const data = await response.json()
            setQuote(data.quote)
        }
        fetchQuote()
    }, [])
    return (
        <div className='quote'>
            <div className='quote-header'>
                <h2>Quote</h2>
            </div>
            <div className='quote-footer'>
                <h4>{quote.body}</h4><br/> 
                <p>{quote.author}</p>             
            </div>
        </div>
    )
}

export default Quotes
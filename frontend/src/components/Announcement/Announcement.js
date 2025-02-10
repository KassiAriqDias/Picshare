import React, { useState } from 'react'
import './Announcement.css'

const Announcement = (promp) => {
  const [currentIndex ,setCurrentIndex] = useState(0);
  const images = promp.images;

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
      setCurrentIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
  };

    return (
        <div className='announcement'>
            <div className='announcement-header'>
               <h2>Announcements & Updates</h2>          
            </div>
            <div className='announcement-body' >
              <img src={promp.images[currentIndex].url} alt='announcement'/>
              <div className='carusel'>
                <i className='bx bxs-left-arrow' onClick={handlePrev}></i>
                <i className='bx bxs-right-arrow' onClick={handleNext} ></i>
              </div>
            </div>
            <div className='announcement-footer'>
                  <div>
                  <h4>{promp.title_en}</h4><br/>
                  <h4 className='ru'>{promp.title_ru}</h4><br/>
                  </div>
                  <div>
                  <p>{promp.description_en}</p><br />
                  <p className='ru'>{promp.description_ru}</p>
                  </div>              
            </div>
        </div>
      )
}

export default Announcement 
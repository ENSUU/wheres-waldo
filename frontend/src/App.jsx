import './App.css'

import PictureCard from './components/pictureCard';
import Navbar from './components/Navbar';

import { useState, useEffect } from 'react';

function App() {
  const [pictures, setPictures] = useState([]); 
  const [clickedPic, setClickedPic] = useState({}); 

  useEffect(() => {
    // Fetch all the pictures in the app using REST API endpoint: http://localhost:3000/pictures
    const getPictures = async () => {
      // const response = await fetch("https://wheres-waldo-backend.vercel.app/pictures");
      const response = await fetch("http://localhost:3000/pictures");
      const json = await response.json(); 
      setPictures(json.pictures); 
    }

    try {
      getPictures(); 
    } catch(err) {
      throw new Response("Not Found", {status: 404}); 
    }

  }, []); 

  const handleClick = (picture) => {
    setClickedPic(picture); 
  }

  return (
    <div>
      <Navbar />
      <h2 style={{ textAlign: "center" }}>Choose any picture to start playing: </h2>
      <div style={{
        display:"flex",
        justifyContent:"center", 
        alignItems: "center", 
      }}> 
        {pictures.map((picture) => ( 
          <PictureCard 
           key={picture.id} 
           picture={picture} 
           handleClick={handleClick}
          />
        ))}
      </div>      
    </div>
  )
}
export default App; 
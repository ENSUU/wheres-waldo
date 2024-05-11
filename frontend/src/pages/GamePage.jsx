import { useParams, Navigate } from 'react-router-dom'; 
import { useState, useEffect, useRef } from 'react';  

import Navbar from '../components/Navbar';
import PictureContainer from '../components/pictureContainer';

const GamePage = () => {
    const { picture_id } = useParams(); // Get the clicked picture's id from the url params. 
    const [picture, setPicture] = useState({}); 

    const [loading, setLoading] = useState(true); 
    const [gameStatus, setGameStatus] = useState(true); 
    const [error, setError] = useState(false); 

    const [user, setUser] = useState("");
    const [userTime, setUserTime] = useState(0);  
    const [message, setMessage] = useState(""); 
    const [goBackHome, setGoBackHome] = useState(false); 
    const [scoreboard, setScoreboard] = useState([]); 

    const headingRef = useRef(null); 

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        const response = await fetch(`https://wheres-waldo-backend.vercel.app/pictures/${picture_id}`, {
            method: "PUT", 
            headers: {
                "Content-Type": "application/json", 
            }, 
            body: JSON.stringify({ user, time: userTime}), 
        }); 
        const json = await response.json(); 

        if (!response.ok) {
            setMessage({ found: false, message: json.message });
        } 

        console.log(json.message); 
        setMessage({ found: true, message: json.message }); 
        setPicture(json.picture); 
        setUser(""); 
        setGoBackHome(true); 
    }


    const getTopFiveScores = () => {
        const temp = []; 
        for (const score in picture.scores) {
            temp.push([score, picture.scores[score]]); 
        }
        temp.sort((a, b) => { return a[1] - b[1] }); 
        return temp; 
    }; 


    useEffect(() => {
        // Fetch the picture and its details from REST API endpoint: http://localhost:3000/pictures/:picture_id
        const gameSetup = async () => {
            try {
                const response = await fetch(`https://wheres-waldo-backend.vercel.app/pictures/${picture_id}`); 
                const json = await response.json(); 
                setPicture(json.picture); 
                const scores = getTopFiveScores(); 
                setScoreboard(scores); 
                // Manually set a delay.
                setTimeout(() => {
                    setLoading(false)
                }, "3000");
            } catch(err) {
                setError(true); 
            }
        }

        gameSetup(); // Load the picture so the user can start searching for characters. Also start the timer at the same time.

        // Once the user completes the game, allow user to add their time to the picture's scoreboard. 
    }, [gameStatus])

   if (error) throw new Error("Something went wrong"); 

    return ( 
        <div>
            <div className="heading" ref={headingRef}>
                <Navbar />
            </div>
            {goBackHome && <Navigate to="/"></Navigate>}
            {message && (
                <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <h2 style={{textAlign: "center", fontStyle: "italic", color:(message.found ? "limegreen" : "tomato")}}>{message.message}</h2>
                </div>
            )}
            {loading && (
                <div className="" style={{ height: "100vh", display: "flex", justifyContent:"center", alignItems:"center"}}>
                    <h1 style={{ textAlign: "center" }}>Loading...</h1>
                </div>
            )}            
            {(!loading && gameStatus === true) && (
                <PictureContainer picture={picture} headingRef={headingRef} setGameStatus={setGameStatus} setUserTime={setUserTime} />
            )}        
            {gameStatus === false && (
                <div className="scoreboard" style={{ display: "flex", flexDirection: "column", alignItems:"center",  justifyContent:"center" }}>
                    <div className="top-scores">
                        <h1>Scoreboard: </h1>
                        <div className="" style={{ display: "flex", gap: "12px" }}>
                            {scoreboard.length === 0 ? (
                                <p>No scores yet. Add yours!</p>
                            ) : (
                                scoreboard.slice(0, 5).map((score, index) => {
                                    return (
                                        <div 
                                            key={index} 
                                            className="scoreboard-card" 
                                            style={{ 
                                                width: "200px", 
                                                height: "200px", 
                                                borderRadius:"4px",  
                                                boxShadow:" 0 2px 4px 0 rgba(0,0,0,.2)", 
                                                display: "flex", 
                                                flexDirection: "column", 
                                                justifyContent: "center", 
                                                alignItems: "center", 
                                        }}>
                                            <h3>{score[0]}</h3>
                                            <h4>{score[1]}s</h4>
                                        </div>
                                    )
                                })
                            )}
                        </div>
                    </div>
                    <form className="scoreboard-form" onSubmit={handleSubmit}>
                        <h1>You win! Add your score: </h1>
                        <div className="input-container">
                            <label htmlFor="username">Username: </label>
                            <input 
                                type="text" 
                                name="username"
                                onChange={(e) => setUser(e.target.value)}
                                value={user}
                            />
                            <button className="btn submit-btn">Submit</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}
 
export default GamePage;

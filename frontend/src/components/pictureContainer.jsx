import { useState, useRef, useEffect } from 'react'; 

const PictureContainer = ({ picture, headingRef, setGameStatus, setUserTime }) => {
    const [clicked, setClicked] = useState(false); 
    const [currUserClick, setCurrUserClick] = useState({x: 0, y: 0}); 
    const [message, setMessage] = useState({}); 
    // This will have -> found: new Set(), correctUserClicks: [], incorrectUserClicks: [] 
    const [userData, setUserData] = useState({
        found: new Set(), 
        correctUserClicks: [], 
        incorrectUserClicks: [], 
    });
    const [timer, setTimer] = useState(0); 

    const imgRef = useRef(null);
    const imgContainerRef = useRef(null); 
    const instructionsRef = useRef(null); 
    const boardRef = useRef(null);
    const messageRef = useRef(null); 

    useEffect(() => {
        checkWin(); 
        const interval = setInterval(() => {
            setTimer(prevTimer => prevTimer + 1); 
        }, 1000);

        return () => clearInterval(interval); 
    }, [userData, timer]); 

    const handleClick = (e) => {
        setCurrUserClick({x: e.pageX, y: e.pageY}); 
        setClicked(!clicked); 
    }

    const checkWin = () => {
        if (userData.found.size === picture.images.length) {
            setGameStatus(false); 
            setUserTime(timer); 
        } 
    };

    const calculateDistance = (clickedCoord, selectedImage) => {
       const distance =  Math.sqrt(((clickedCoord.x - selectedImage.center[0]) ** 2) + (clickedCoord.y - selectedImage.center[1]) ** 2);
       return distance; 
    }

    const normalizeCoord = (coord) => {
        // Get the image's dimensions on the webpage. 
        const width = imgRef.current.offsetWidth;
        const height = imgRef.current.offsetHeight;

        // Get the left margin applied to board div. 
        const computedStyleBoard = window.getComputedStyle(boardRef.current); 
        // - Need to slice(0, 2) these because .getPropertyValue returns a string like 12px. 
        const marginLeftBoard = Number(computedStyleBoard.getPropertyValue('margin-left').slice(0, -2))
        
        const computedStyleImgContainer = window.getComputedStyle(imgContainerRef.current); 
        const marginTopImg = Number(computedStyleImgContainer.getPropertyValue('margin-top').slice(0, -2))
        
        // Validate the coordinate. 
       const cleanedCoord = [coord.x - marginLeftBoard, coord.y - headingRef.current.offsetHeight - marginTopImg];  

       // Find how much the image is scaled on the webpage. 
       const shrinkX = picture.dimensions.width / width; 
       const shrinkY = picture.dimensions.height / height; 
       
       // Calculate the clicked coordinate's ACTUAL coordinate on the original image's dimensions
       const actualCoord = {x: cleanedCoord[0] * shrinkX, y: cleanedCoord[1] * shrinkY};

       return actualCoord; 
    }; 

    // Check if the user clicked the correct location for the image they selected. 
    const checkUserChoice = (e) => { 
       const actualCoord = normalizeCoord(currUserClick); 
       // Check if the user already found the image. 
       if (userData.found.has(e.target.value)) {
            setMessage({found: false, message: `You already found ${e.target.value}. Find the rest!`}); 
            return;     
       }
        
        // Get the image's dimensions on the webpage. 
        const width = imgRef.current.offsetWidth;

        // Get the left margin applied to board div. 
        const computedStyle = window.getComputedStyle(boardRef.current); 
        // - Need to slice(0, 2) these because .getPropertyValue returns a string like 12px. 
        const marginLeft = Number(computedStyle.getPropertyValue('margin-left').slice(0, -2))
        
       // Check if the actualCoord is in the area of the chosen image  
        for (const image of picture.images) {
            if (image.name === e.target.value) {
                const distance = calculateDistance(actualCoord, image);  
                
                console.log(picture.dimensions.width); 
                if (distance > image.radius * (width / picture.dimensions.width)) {
                    setMessage({ found: false, message: `Nah, this isn't where ${image.name} is. Try again. `})
                    console.log(`Distance ${distance} is bigger than the image's radius of ${image.radius * (width / picture.dimensions.width)}`);
                    setUserData({...userData, incorrectUserClicks: [...userData.incorrectUserClicks, currUserClick]})
                } else {
                    console.log(`Calculated distance: ${distance} is less than or equal to ${image.radius * (width / picture.dimensions.width)}`)
                    setMessage({ found: true, message: `Yay, you found ${image.name}. Look for the others.`});
                    console.log(userData.found); 
                    setUserData({...userData, found: new Set([...userData.found, e.target.value ]), correctUserClicks: [...userData.correctUserClicks, currUserClick]})
                }
                break;
            }
        }
    }


    const handleCloseMenu = () => {
        setClicked(false); 
    }

    return (
        <div style={{ maxWidth: "1280px", margin: "auto", display: "flex", height: "90vh", alignItems: "center", gap: "12px"}} ref={boardRef}> 
            {clicked && (
                <div className="selection-form"
                    onClick={handleCloseMenu}
                    style={{
                        position: 'absolute', 
                        top: currUserClick.y, 
                        left: currUserClick.x, 
                        padding: '5px',
                        borderRadius: '12px',
                        zIndex: 1,
                    }}
                >
                    {picture.images.map(image => {
                        return (
                            <button 
                                key={image.id}
                                className="btn form-btn" 
                                value={image.name}
                                onClick={checkUserChoice}
                            >
                                {image.name}
                            </button>
                        )
                    })}
                </div>
            )}
            {userData.found.size !== picture.images.length && (
                <div className="board" ref={imgContainerRef} onClick={userData.found.size < picture.images.length ? handleClick : null}>
                    <img 
                        style={{width: "1000px"}}
                        src={picture.src} 
                        alt="Crowded ship filled with random characters" 
                        ref={imgRef}
                    />
                </div>
            )}
            <div className="gameInfo" style={{display: "flex", flexDirection: "column", padding: "1rem"}}>
                {userData.found.size !== picture.images.length && (
                    <div ref={instructionsRef} style={{display: "flex", gap: "12px", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                            <h2 style={{ textAlign: "center" }}>Find the following characters in the picture: </h2>
                            <div 
                                className="card-row" 
                                style={{
                                    display: "flex", 
                                    gap: "16px", 
                                }}
                            >
                                {picture.images.map(image => {

                                    return (<div 
                                                key={image.id} 
                                                style={{
                                                    display: "flex",
                                                    flexDirection: "column", 
                                                    alignItems: "center", 
                                                    justifyContent: "center", 
                                                    gap: "8px", 
                                                    width: "100px", 
                                                    height: "100px", 
                                                    borderRadius: "12px",
                                                    boxShadow: "0 0 4px rgba(255, 255, 255, 0.51)", 
                                                    fontSize: "1rem",
                                                }}
                                                className={userData.found.has(image.name) ? 'found' : ''}
                                        > 
                                            <img 
                                                src={`/assets/${picture.name}/images/${image.name}.jpg`}
                                                alt={`Image of ${image.name}`} 
                                                style={{ width: "50px", height: "50px", borderRadius: "100%"  }}/>
                                            <p>{image.name}</p>
                                        </div>)
                                    })}
                            </div>
                        </div> 
                    )}
                <div className="timer" style={{ fontWeight: "bold", textAlign: "center" }}>
                    <h2>Time (in seconds): {timer}</h2>
                </div>
                {message && (
                    <div ref={messageRef} style={{display: "flex", justifyContent: "center", alignItems: "center", height: "68px"}}>
                        <h3 style={{textAlign: "center", fontStyle: "italic", color:(message.found ? "limegreen" : "tomato")}}>{message.message}</h3>
                    </div>
                )}
                <p style={{ textAlign: "center", fontStyle: "italic" }}>
                    <a href={picture.attribution_link}>{picture.attribution_text}</a>
                </p>
            </div>
        </div>
     );
}
 
export default PictureContainer;
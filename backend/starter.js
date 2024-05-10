const Picture = require('./models/picture'); 
const Image = require('./models/image'); 

const generateInitialData = async () => {
    // Create the picture and associated images documents for the crowded ship picture
    const spaceManImage = new Image({
        name: "space-man", 
        src: "./assets/crowded-ship/images/space-man.jpg", 
        center: [815, 249],
        radius: 30,
    }); 

    // Creating waldo image 
    const waldoImage = new Image({
        name: "waldo", 
        src: "./assets/crowded-ship/images/waldo.jpg",
        center: [66, 378], 
        radius: 30,
    }); 

    const boyImage = new Image({
        name: "boy", 
        src: "./assets/crowded-ship/images/boy.jpg", 
        center: [733, 169], 
        radius: 30,
    }); 

    const crowdedShipPic = new Picture({
        name: "crowded-ship", 
        src: "./assets/crowded-ship/crowded-ship.jpg", 
        scores: {}, 
        dimensions: {
            width: 900, 
            height: 662,
        }, 
        images: [
            spaceManImage.id, 
            waldoImage.id, 
            boyImage.id, 
        ],
        attribution_text: "Wallpaper by tide777 on Wallpapers.com",
        attribution_link: "https://wallpapers.com/wallpapers/where-s-waldo-crowded-ship-d72fdlc30qu2viu1.html", 
    }); 

    // Create the picture and associated images documents for the galactic city picture
    const alienImage = new Image({
        name: "alien", 
        src: "./assets/galactic-city/images/alien.jpg", 
        center: [102, 529],
        radius: 30, 
    }); 
    
    const knightImage = new Image({
        name: "knight", 
        src: "./assets/galactic-city/images/knight.jpg", 
        center: [591, 302],
        radius: 30, 
    }); 

    const pirateImage = new Image({
        name: "pirate", 
        src: "./assets/galactic-city/images/pirate.jpg", 
        center: [584, 405],
        radius: 30, 
    }); 
    
    const galacticCityPic = new Picture({
        name: "galactic-city", 
        src: "./assets/galactic-city/galactic-city.jpg", 
        scores: {}, 
        dimensions: {
            width: 900, 
            height: 582, 
        }, 
        images: [
            alienImage.id, 
            knightImage.id,
            pirateImage.id, 
        ],
        attribution_text: "Wallpaper by teemus8811 from Wallpapers.com", 
        attribution_link: "https://wallpapers.com/wallpapers/where-s-waldo-galactic-city-6lyyvy63bqchie48.html", 
    });
    
    // Create the picture and associated images documents for the train station picture
    const officerImage = new Image({
        name: "officer", 
        src: "./assets/train-station/images/officer.jpg", 
        center: [295, 556], 
        radius: 30, 
    }); 

    const armstrongImage = new Image({
        name: "armstrong", 
        src: "./assets/train-station/images/armstrong.jpg", 
        center: [499, 247], 
        radius: 30, 
    }); 

    const painterImage = new Image({
        name: "painter", 
        src: "./assets/train-station/images/painter.jpg", 
        center: [226, 138], 
        radius: 30,
    }); 

    const trainStationPic = new Picture({
        name: "train-station", 
        src: "./assets/train-station/train-station.jpg", 
        scores: {}, 
        dimensions: {
            width: 900, 
            height: 608, 
        }, 
        images: [
            officerImage.id, 
            armstrongImage.id, 
            painterImage.id, 
        ], 
        attribution_text: "Wallpaper by sindyq from Wallpapers.com", 
        attribution_link: "https://wallpapers.com/wallpapers/where-s-waldo-train-station-syhc9avp2k1fvu47.html", 
    });

    // Save the images & picture to db 
    await Promise.all([
        spaceManImage.save(), 
        waldoImage.save(),
        boyImage.save(), 
        alienImage.save(), 
        knightImage.save(), 
        pirateImage.save(), 
        officerImage.save(), 
        armstrongImage.save(), 
        painterImage.save(), 

        crowdedShipPic.save(),
        galacticCityPic.save(), 
        trainStationPic.save(),  
    ]); 
}; 

module.exports = generateInitialData; 
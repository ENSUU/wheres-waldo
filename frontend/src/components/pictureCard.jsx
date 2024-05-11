import { Link } from 'react-router-dom';

const PictureCard = ({ picture, handleClick }) => {
    return ( 
        <div className="card" onClick={handleClick(picture)}>
            <Link to={"/" + picture._id}>
                <img style={{width: "100%"}} src={picture.src} alt={`Picture of ${picture.name}`} />
            </Link>
        </div>
        
     );
}
 
export default PictureCard;
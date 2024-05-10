import { Link } from 'react-router-dom'; 

const Navbar = () => {
    return ( 
        <div className="navbar">
            <h1 className="navbar-title">
                <Link to="/">
                    ENSUU's Photo Tagging App (in the works tho)
                </Link>
            </h1>
        </div>
     );
}
 
export default Navbar;
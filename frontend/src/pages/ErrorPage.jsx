import { Link, useRouteError } from "react-router-dom";
import Navbar from '../components/Navbar'; 


const ErrorPage = () => {
    const error = useRouteError(); 
    console.error(error); 

    return ( 
        <>
            <Navbar />
            <div className="error-page">
                <h1>Oops!</h1>
                <h2>Sorry, an unexpected error has occured. </h2>
                <p style={{ fontStyle: "italic" }}>{error.name}: {error.message}</p>
                <Link to="/">
                    <button className="btn error-btn">Go Back Home</button>
                </Link>
            </div>
        </>
     );
}
 
export default ErrorPage;
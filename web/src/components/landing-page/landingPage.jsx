import './landingPage.css'
import 'animate.css';
import {Link } from "react-router-dom";

function front() {
    return (
        <div className='main'>  
           <Link to={`/login`}><button type="submit" class="animate__animated animate__fadeIn getStarted">Let's Get Started </button></Link>
        </div>
    )
}

export default front;
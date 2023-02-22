import { useState, useContext } from "react";
import axios from 'axios';
import { GlobalContext } from '../../store/Context';
import './signup.css'
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faUser, faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";

function Signup() {
    let { state, dispatch } = useContext(GlobalContext);
    const [result, setResult] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signupHandler = async (e) => {
        e.preventDefault();

        try {
            let response = await axios.post(`${state.baseUrl}/signup`, {
                firstName: name,
                lastName: name,
                email: email,
                password: password,
                role: 'customer'
            })

            console.log("signup successful");
            setResult("signup successful")

        } catch (e) {
            console.log("e: ", e);
        }
        // e.reset();
    }


    return (
        <>
            <div className="signuphead">
                <h1>SAYLANI WELFARE</h1>
                <h4>ONLINE DISCOUNT STORE</h4>
            </div>
            <form className="signupform" onSubmit={signupHandler}>
                <div className="namediv">
                    <input type="text" name="name" placeholder="Full name" onChange={(e) => { setName(e.target.value) }} />
                    <FontAwesomeIcon className="icon" icon={faUser} />
                </div>
                <br />
                <div className="contactDiv">
                    <input type="number" name="new-password" autoComplete="new-password" placeholder="Contact" />
                    <FontAwesomeIcon className="icon" icon={faPhone} />
                </div>
                <br />
                <div className="emailsdiv">
                    <input type="email" name="username" autoComplete="username" placeholder="Email" onChange={(e) => { setEmail(e.target.value) }} />
                    <FontAwesomeIcon className="icon" icon={faEnvelope} />
                </div>
                <br />
                <div className="passDiv">
                    <input type="password" name="new-password" autoComplete="new-password" placeholder="Password" onChange={(e) => { setPassword(e.target.value) }} />
                    <FontAwesomeIcon className="icon" icon={faEye} />
                </div>
                <br />
                {(state.isLogin === false) ?
                    <p className=''>already have an account? <Link className="a" to={`/login`}>Login</Link>
                    </p> : null}
                <button className="signupButton" type="submit">Signup</button>
            </form>
            <p>{result}</p>
        </>
    )
}

export default Signup;
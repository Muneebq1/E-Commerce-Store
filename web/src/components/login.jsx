import { useState, useContext } from "react";
import { GlobalContext } from '../context/Context';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye ,faEnvelope} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";


import axios from 'axios';
import './login.css'



function Login() {
    let { state, dispatch } = useContext(GlobalContext);


    const [result, setResult] = useState("");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const admin= "admin@aa.com"


    const loginHandler = async (e) => {
        e.preventDefault();

        try {
            let response = await axios.post(`${state.baseUrl}/login`, {

                email: email,
                password: password
            }, {
                withCredentials: true
            })

            // dispatch({
            //     type: 'USER_LOGIN',
            //     payload: response.data.profile
            // })
            if (response.data.profile.email === admin) {
                dispatch({
                    type: 'USER_ADMIN',
                    payload: response.data.profile
                })
            } else {
                dispatch({
                    type: 'USER_LOGIN',
                    payload: response.data.profile
                })
            }
            
            console.log("Login successful");
            setResult("Login successful")

        } catch (e) {
            console.log("e: ", e);
        }

        // e.reset();
    }



    return (
        <>
            <div className="loginhead">
                <h1>SAYLANI WELFARE</h1>
                <h4>ONLINE DISCOUNT STORE</h4>
            </div>

            {state.text}

            <form onSubmit={loginHandler} className="loginForm">

                <div className="emaildiv">
                    <input
                        className="TextField"
                        id="email"
                        label="Email"
                        variant="outlined"
                        type="email"
                        name="username"
                        placeholder="Email"
                        autoComplete="username"
                        onChange={(e) => { setEmail(e.target.value) }}
                    />
                <FontAwesomeIcon className="icon" icon={faEnvelope} />
                    
                </div>

                <br />

                <div className="passdiv">
                    <input
                        className="TextField"
                        id="password"
                        label="Password"
                        variant="outlined"
                        type="password"
                        name="current-password"
                        autoComplete="current-password"
                        placeholder="Password"
                        onChange={(e) => { setPassword(e.target.value) }}
                    />
                    <FontAwesomeIcon className="icon" icon={faEye} />
                </div>

                <br />
                <button className="loginButton" type="submit">Login</button>
                {(state.isLogin === false) ?
                            <p>dont have an account? <Link className="a" to={`/signup`}>Register</Link>
                            </p> : null}
            </form>

            <p>{result}</p>
        </>
    )
}

export default Login;
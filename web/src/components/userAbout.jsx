import axios from "axios";
import { useContext } from "react";
import { GlobalContext } from '../context/Context';


function Userabout() {
    let { state, dispatch } = useContext(GlobalContext);


    const logoutHandler = async () => {
        try {
            let response = await axios.post(`${state.baseUrl}/logout`,
                {},
                {
                    withCredentials: true
                })
            dispatch({
                type: 'USER_LOGOUT'
            })
        } catch (error) {
            console.log("axios error", error)
        }
    }


    return (
        <div>
            <h1>this is user about</h1>
            <button className="logoutButton" onClick={logoutHandler}>Logout</button>
        </div>
    )
}

export default Userabout;
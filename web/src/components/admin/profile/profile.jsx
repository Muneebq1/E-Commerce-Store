import axios from "axios";
import { useContext} from "react";
import { GlobalContext } from '../../../context/Context';
import './profile.css'

function Profile() {
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

    return(
        <div>
        <h1>This is profile</h1>
        <button className="logoutButton" onClick={logoutHandler}>Logout</button>
        </div>
    ) 

}

export default Profile;

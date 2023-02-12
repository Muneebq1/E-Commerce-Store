import { useContext, useEffect } from "react";
import { GlobalContext } from './context/Context';
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faHome,faAdd } from "@fortawesome/free-solid-svg-icons";
import './App.css';
import { Routes, Route, Link, Navigate } from "react-router-dom";


import Home from "./components/home";
import About from "./components/about";
import Gallery from "./components/gallery";
import Login from "./components/login";
import Signup from "./components/signup";
import Front from "./components/front";
import Userhome from "./components/userHome";
import Usercart from "./components/userCart";
import Userabout from "./components/userAbout";

// let see
// check please
function App() {

  let { state, dispatch } = useContext(GlobalContext);
  // const [fullName, setFullName] = useState("");


  console.log("State", state)
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


  useEffect(() => {
    const admin = "admin@aa.com"


    const getProfile = async () => {

      try {
        let response = await axios.get(`${state.baseUrl}/profile`, {
          withCredentials: true
        })
        // dispatch({
        //   type: 'USER_LOGIN',
        //   payload: response.data
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
      } catch (error) {
        dispatch({
          type: 'USER_LOGOUT'
        })
      }

    }
    getProfile()
  }, [])

  useEffect(() => {
    // Add a request interceptor
    axios.interceptors.request.use(function (config) {
      // Do something before request is sent
      config.withCredentials = true;
      return config;
    }, function (error) {
      // Do something with request error
      return Promise.reject(error);
    });

    // Add a response interceptor
    axios.interceptors.response.use(function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    }, function (error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      if (error.response.status === 401) {
        dispatch({
          type: 'USER_LOGOUT'
        })
      }
      return Promise.reject(error);
    });
  })


  return (
    <div>
      {/* for user */}
      {
        (state.isLogin === true) ?
          <nav className='navBar'>
            <ul >
              <li> <Link to={`/`}>Home</Link> </li>
              <li> <Link to={`/gallery`}>Add itmes</Link> </li>
              <li> <Link to={`/about`}>Account</Link> </li>
            </ul>
          </nav>
          : null}



      {
        (state.isLogin === 1) ?
          <nav className='navBar'>
            <ul >
              <li><FontAwesomeIcon icon={faHome}/> <Link to={`/`}>Home</Link> </li>
              <li><FontAwesomeIcon icon={faAdd}/> <Link to={`/gallery`}>Add itmes</Link> </li>
              <li> <FontAwesomeIcon icon={faUser}/><Link to={`/about`}>Account</Link> </li>
            </ul>
          </nav>
          : null}


      {(state.isLogin === 1) ?
        // adminroute
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="*" element={<Navigate to="/" replace={true} />} />
        </Routes>
        : null}

        {/* userroute */}
      {(state.isLogin === true) ?

        <Routes>
          <Route path="/" element={<Userhome />} />
          <Route path="about" element={<Userabout />} />
          <Route path="gallery" element={<Usercart />} />
          <Route path="*" element={<Navigate to="/" replace={true} />} />
        </Routes>
        : null}



      {(state.isLogin === false) ?
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Front />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Navigate to="/" replace={true} />} />
        </Routes>
        : null
      }

      {(state.isLogin === null) ?
        <div> Splash screen</div>
        : null}


    </div>
  );
}

export default App;
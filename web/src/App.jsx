import { useContext, useEffect } from "react";
import { GlobalContext } from './store/Context';
import axios from "axios";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faUser, faHome, faAdd } from "@fortawesome/free-solid-svg-icons";
import './App.css';
import { Routes, Route, Link, Navigate } from "react-router-dom";

import Home from "./components/admin/home/home";
import About from "./components/admin/profile/profile";
import Gallery from "./components/admin/add-item/addItem";

import Login from "./components/login/login";
import Signup from "./components/signup/signup";
import LandingPage from "./components/landing-page/landingPage";

import UserHome from "./components/user/userHome";
import UserCart from "./components/user/userCart";
import UserProfile from "./components/user/userProfile";

function App() {
  let { state, dispatch } = useContext(GlobalContext);

  useEffect(() => {
    getProfile()
  }, [])

  const getProfile = async () => {
    try {
      let response = await axios.get(`${state.baseUrl}/profile`, {
        withCredentials: true
      })
      if (response.data.profile.role === "admin") {
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

  const logoutHandler = async () => {
    try {
      let response = await axios.post(`${state.baseUrl}/logout`, {},
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
      {
        // for user 
        (state.isLogin === true) ?
          <div>
            <nav className="navbar">
              <ul >
                <h1>DISCOUNT STORE</h1>
                <input type="text" placeholder="Search by product name" />
                <div>

                  <li> <Link to={`/`}>Home</Link> </li>
                  <li> <Link to={`/gallery`}>Cart</Link> </li>
                  <li> <Link to={`/about`}>Account</Link> </li>
                  <li><button className="logout" onClick={logoutHandler}>Logout</button></li>
                </div>
              </ul>
            </nav>
            <div className="image"></div>
          </div>
          : null}

      {(state.isLogin === true) ?
        /* userRoute */
        <Routes>
          <Route path="/" element={<UserHome />} />
          <Route path="about" element={<UserProfile />} />
          <Route path="gallery" element={<UserCart />} />
          <Route path="*" element={<Navigate to="/" replace={true} />} />
        </Routes>
        : null}

      { // for admin
        (state.isLogin === 1) ?
          <nav className="navbar">
            <ul >
              <h1>DISCOUNT STORE</h1>
              <input type="text" placeholder="Search here" />
              <div>
                <li>
                  {/* <FontAwesomeIcon icon={faHome} /> */}
                  <Link to={`/`}>Home</Link> </li>
                <li>
                  {/* <FontAwesomeIcon icon={faAdd} />  */}
                  <Link to={`/gallery`}>Add items</Link> </li>
                <li>
                  {/* <FontAwesomeIcon icon={faUser} /> */}
                  <Link to={`/about`}>Account</Link> </li>
                  
              </div>
            </ul>
          </nav>
          : null}

      {(state.isLogin === 1) ?
        // adminRoute
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="*" element={<Navigate to="/" replace={true} />} />
        </Routes>
        : null}

      {(state.isLogin === false) ?
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Navigate to="/" replace={true} />} />
        </Routes>
        : null
      }
      {(state.isLogin === null) ?
        <div id='preloader'></div> : null}
    </div>
  );
}
export default App;
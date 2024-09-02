import React, { useRef, useState } from 'react';
import './LoginSignupContainer.css';
import Login from '../Login/Login';
import Signup from '../Signup/Signup';

const LoginSignupContainer = ({setToken}) => {
    // define state to make sure if login or signup is clicked or visible or active
    const [login, setLogin] = useState(true);

    const handleClick = () => {
        setLogin(!login);
        // using useRef we can do DOM manuplation
        LoginSignupContainerRef.current.classList.toggle("active");
    }
    const LoginSignupContainerRef = useState(null);

  return (
    <div className="login-signup-container" ref = {LoginSignupContainerRef}>
        <Login setToken={setToken}/>
        <div className="side-div">
            <button type="button" onClick={handleClick}>
                {login ? "Signup" : "Login"}
            </button>           
        </div>
        <Signup />
    </div>
  )
}

export default LoginSignupContainer
import React, { useState } from 'react';
import './Login.css'
import axios from 'axios';


function Login({setToken}) {
  const [usernameLogin, setUsernameLogin] = useState('');
  const [passwordLogin, setPasswordLogin] = useState('');
  const [loginStatus, setLoginStatus] = useState('');

  const login = (event) => {
    event.preventDefault();
    axios.post(
      '/api/login', {username: usernameLogin, password: passwordLogin}
    ).then((response) => {
      if (response.data.token) {
        setToken(response.data);
        setLoginStatus("Welcome " + usernameLogin);
      }
      else { 
        setLoginStatus(response.data.message);
      }
    });
  };

  return (
    <div className="login">
      <h1>Login</h1>
      <form>
        <input type={"email"} placeholder={"Email"} onChange={(e) => {setUsernameLogin(e.target.value);}}/>
        <input type={"password"} placeholder={"Password"} onChange={(e) => {setPasswordLogin(e.target.value);}}/>
        <button type={"submit"} onClick={login}>Login</button>
      </form>
      <p>{loginStatus}</p>
    </div>
  )
}

export default Login
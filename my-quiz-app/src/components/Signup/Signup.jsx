import React, { useState } from 'react';
import './Signup.css'
import axios from 'axios';

function Signup() {
  const [usernameSignup, setUsernameSignup] = useState('');
  const [passwordSignup, setPasswordSignup] = useState('');

  const [signupStatus, setSignupStatus] = useState('');

  const register = (event) => {
    event.preventDefault();
    axios.post(
      '/api/verifyregister', {username: usernameSignup}
    ).then((response) => {
      if (response.data.message){
        setSignupStatus(response.data.message);
      } else {
        axios.post(
          '/api/register', {username: usernameSignup, password: passwordSignup}
        ).then((response) => {
          console.log(response);
        });
      }
    })
  };

  return (
    <div className="signup">
    <h1>Sign Up</h1>
    <form>
      <input type={"email"} placeholder={"Email"} onChange={(e) => {setUsernameSignup(e.target.value);}}/>
      <input type={"password"} placeholder={"Password"} />
      <input type={"password"} placeholder={"Confirm password"} onChange={(e) => {setPasswordSignup(e.target.value);}}/>
      <button type={"submit"} onClick={register}>Sign up</button>
    </form>
    <p>{signupStatus}</p>
  </div>
  )
}

export default Signup
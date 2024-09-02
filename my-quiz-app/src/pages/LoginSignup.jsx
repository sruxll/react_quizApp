import React, { useState } from 'react';
import NavigationBar from '../components/NavigationBar/NavigationBar';
import LoginSignupContainer from '../components/LoginSignupContainer/LoginSignupContainer';

function LoginSignup({setToken}) {
    return (
        <div>
            {/* <h1>LoginSignup page </h1><br /> */}
            <div>
                <NavigationBar />
                <LoginSignupContainer setToken={setToken}/>
            </div>
        </div>
    );
};

export default LoginSignup;
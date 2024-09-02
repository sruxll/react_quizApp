import React from 'react';
import './header.css';


const Header = () =>{
    return(
        <div className='div-header'>
            <div type = 'text'>
            <a> Welcome to the quiz app
            </a>
            </div>
            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                <button className='button'>Log out</button>
            </div>
        </div>

    )
}

export default Header;
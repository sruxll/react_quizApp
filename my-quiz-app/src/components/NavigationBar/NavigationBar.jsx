import React from 'react'
import './NavigationBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';


const NavigationBar = () => {
  return (
    <nav>
        <a href="/">English Class Online Assignments</a>
        <div>
            <p>
                Welcome, <span>Guest</span>
            </p>
            <i>
                <FontAwesomeIcon icon={faUser} />
            </i>           
        </div>
    </nav>
  )
}

export default NavigationBar
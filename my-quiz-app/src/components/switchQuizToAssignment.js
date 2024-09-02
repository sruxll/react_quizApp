import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import assignmentLogo from '../assets/assignment.svg'

const SwitchComponent = () => {
    const navigate = useNavigate();
    useEffect(() => {
        // navigate to another page
        navigate('/assignments');
    }, []);

  return (
    <div>
        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
            <svg>assignmentLogo</svg>
        </div>
        <div type = 'text'>
        <a> Assignment001
        </a>
        </div>
    </div>
  );
};


export default SwitchComponent;

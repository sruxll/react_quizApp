// import React from 'react';
import React, { useState } from 'react';
import { ReactComponent as AssignmentLogo } from '../assets/assignment.svg';
import styled from 'styled-components';

const Button = styled.button`
    background-color: #3f51b5;
    color: white;
    padding: 5px 15px;
    border-radius: 5px;
    outline: 0;
    box-shadow: 0px 2px 2px lightgray;
    cursor: pointer;
    transition: ease background-color 250ms;
    &:hover{
        background-color: #283593
    }
`

const Tab = styled.button`
    padding: 10px 60px;
    border: 0;
    outline: 0;
    background: white;
    cursor: pointer;
    ${({active}) => active && `
    border-bottom: 2px solid black;
    opacity: 1;`
}
`

const ButtonToggle = styled(Button)`
    opacity: 0.7;
    ${({active}) => active && `
        opacity: 1;`
    }
`


const types = ['Dashboard', 'Assignment', 'Submission', 'AccountInformation']

function ToggleGroup(){
    const [active, setActive] = useState(types[0]);
    return <div>
        {types.map(type =>(
            <ButtonToggle 
            active ={active === type}
            onClick ={() => setActive(type)}>
                {type}
            </ButtonToggle>
        ))}
    </div>
}

function TabGroup(){
    const [active, setActive] = useState(types[0]);
    return <>
        <div>
            {types.map(type =>(
                <Tab 
                key={type}
                active ={active === type}
                onClick ={() => setActive(type)}>
                    {type}
                </Tab>
            ))}
        </div>       
    </>
}

const Body = () =>{
    return(
        <div>
            <ToggleGroup/>
        </div>
    )
}

export default Body;
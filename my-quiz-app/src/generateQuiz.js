// import React, { useEffect, useState } from 'react';
import React, { useState } from 'react';
import axios from 'axios';
import './components/header.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import SwitchComponent from './components/switchQuizToAssignment';


function QuizGeneration() {
    const [quizData, setQuizData] = useState([]);
    const [quizID, setQuizID] = useState([]);
    const [assignmentID, setAssignmentID] = useState([]);
    const navigate = useNavigate();
    
    const handleGenerateQuiz = async () =>{
        if (!quizData.length){
            setQuizData([]);
        }
            
        try {
            const response = await axios.get(baseURL + '/api/quiz/' + quizID);
            setQuizData(response.data);
        } catch (error) {
            console.error('Error fetching quiz data:', error);
        }        
    };

    const handleSaveAssignment = async () =>{   
        if (assignmentID) {
            axios.get('/api/assignment/' + quizID + '/' + assignmentID).then(response => {
                toast.success("Assignment Generated Successfully");
                navigate('/assignments');
            }).catch(error => {
                toast.error("Assignment Generated Failed");
            });        
        }
    }

    return (
        <div>
            <div>
                <input type = 'text' value = {quizID} placeholder='Enter quizID' onChange={(e) => setQuizID(e.target.value)} />
                <button className='button' onClick = {handleGenerateQuiz}>PreviewQuiz</button>
            </div>
            {quizData.length === 0 ? (
                <p>No inputs!</p>
            ) : (
            quizData.map(item => (
                <div key={item.quizID}>
                    <p>{item.question}</p>

                </div>               
            )))}
            <div>
                <input type = 'text' value = {assignmentID} placeholder='Enter assignment name' onChange={(e) => setAssignmentID(e.target.value)} />
                <button className='button' onClick = {handleSaveAssignment}>SaveAssignment</button>  
                <ToastContainer />
            </div>
        </div>
    );
};

export default QuizGeneration;
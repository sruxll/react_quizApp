import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import AssignmentLogo from '../assets/assignment.svg'
import AssignmentLogo from '../assets/assignment.svg';
import { useNavigate } from 'react-router-dom';
import Quiz from '../pages/Quiz';


function DisplayAssignments() {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        const fetchDataAsync = async () => {
            try{
                const response = await axios.get('/api/fetchAssignmentName');
                setData(response.data);
            } catch (error) {
                console.error('Error fetching assignment name:', error);
            }
        };

        fetchDataAsync();
    };

    const [displayQuizData, setDisplayQuizData] = useState([]);
    const displayQuizDetail = async (assignment_name) => {
        if (!displayQuizData.length) {
            setDisplayQuizData([]);
        }
        try {
            const response = await axios.get('/api/displayQuiz/' + assignment_name);
            setDisplayQuizData(response.data);
            navigate('/quiz', {state: {quizData: response.data, name: assignment_name}});
        } catch (error) {
            console.error('Error displaying quiz data:', error);
        }      
    }

    return(
        <div>
            {data.length === 0 ? (<p>No Assignment!</p>) : (
                data.map(item => (
                    <div>
                        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                            <img src={AssignmentLogo} alt="Assignment Logo" height='100px' width='100px' />
                        </div>    
                        <div >
                            <a onClick={() => {
                                displayQuizDetail(item.assignmentName)
                            }}>{item.assignmentName}</a>                       
                        </div>
                    </div>                
                ))
            )}
        </div>
    )
};

export default DisplayAssignments;
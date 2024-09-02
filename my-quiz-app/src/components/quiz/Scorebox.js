import React, { useEffect } from 'react';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';


function Scorebox({numberOfCorrect, totalQuestion, assignmentName}) {
    const score = 100 * (numberOfCorrect / totalQuestion);
    const savedUsernameString = sessionStorage.getItem('token');
    const savedUsername = JSON.parse(savedUsernameString);
    const generateSubmissionId = () => {
        return Math.random().toString(36).substr(2, 9);
    };

    const saveSubmission = () => {
        var submissionData =[generateSubmissionId(), savedUsername.token, assignmentName, score];
        axios.post('/api/savesubmission', submissionData);
    };

    let message;
    if (score > 80) {
        message = 'Awesome Work!';
    } else if (score > 60) {
        message = 'You did ok!';
    } else {
        message = 'Not Good!';
    }

    return (
        <div className="well">  
            <br /><br /> 
            <h3>
                <strong>Question {numberOfCorrect} out of {totalQuestion}  are correct. <br /> </strong>
            </h3>
            <span className="pull-right"><h1><strong>Score: {score}%  </strong></h1></span>
            {saveSubmission()}
        </div>
    );
}

export default Scorebox;
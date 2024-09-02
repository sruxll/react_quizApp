import React from 'react';
import FileUpload from '../uploadCSV.js'
import QuizGeneration from '../generateQuiz.js'

const QuizGenerator = () => {
    return (
        <div>
            <h1>QuizGenerator page</h1>
            <FileUpload />
            <QuizGeneration />
        </div>
    );
};

export default QuizGenerator;
// import React from 'react';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Solution from '../components/quiz/Solution'
import Scorebox from '../components/quiz/Scorebox'

const Result = () => {
    const location = useLocation();
    const user_answer = location.state.userAnswers;

    let countCorrect = 0;  
    let countNumQuestions = 0;
    return (
        <div>
            <h1>Result Details</h1><br /><br />
            <div>
                {location.state.dbAnswers.map((answer) => {
                    if (answer.questionType === "mc"){
                        if (!(answer.id in user_answer)) {
                            return (
                                <Solution dbAnswers = {answer} userAnswers = "null" />
                            )
                        }
    
                        let userAns = user_answer[[answer.id]];
                        if (answer.answer.toLowerCase() != userAns.toLowerCase()) {
                            return (
                                <Solution dbAnswers = {answer} userAnswers = {user_answer[answer.id]}/>
                            )
                        }
    
                        countCorrect += 1;
                        countNumQuestions += 1;
                    }

                    if (answer.questionType === "fib"){
                        let wrongAns = 0
                        let allUserAns = ''
                        answer.answer.split(', ').map((part, i) => {
                            let userAnsBlank = user_answer[`${answer.id}_blank${i + 1}`] || '';
                            allUserAns += `${i + 1}` + ": "
                            allUserAns += userAnsBlank.length === 0 ? "[blank] " : userAnsBlank;
                            if (part.toLowerCase() == userAnsBlank.toLowerCase()) {
                                countCorrect += 1;
                            }
                            if (part.toLowerCase() != userAnsBlank.toLowerCase()) {
                                wrongAns += 1;
                            }
                            countNumQuestions += 1;
                        })
                        if (wrongAns > 0){
                            return (
                                <Solution dbAnswers = {answer} userAnswers = {allUserAns}/>
                            )
                        }
                    }
                }
                )}
            </div>
            <div>
                <Scorebox numberOfCorrect = {countCorrect} totalQuestion = {countNumQuestions}
                assignmentName = {location.state.assignmentName} />
            </div>
        </div>
    );
};

export default Result;






import React, {useState} from 'react';
import QuestionList from './QuestionList.js';


function MainQ({questions, questionType, answerData, setAnswerData}) {
    const [score, setScore] = useState(0);
    const [current, setCurrent] = useState(1);

    return (
        <div>
            <QuestionList
                questions = {questions}
                current = {current}
                score = {score}
                setCurrent = {setCurrent}
                setScore = {setScore}
                answerData = {answerData}
                setAnswerData = {setAnswerData}
            />
        </div>
    );
}

export default MainQ;
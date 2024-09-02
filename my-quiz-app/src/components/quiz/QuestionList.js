import React from 'react';
import Question from './Question';

function QuestionList(props){
    // props: questions, current, setCurrent, setScore
    return (
        <div className = "questions">
            {props.questions.map((question) => {
                return (
                    <Question question={question} key={question.id} questionType={question.questionType} {...props} />
                );
            })}
        </div>
    );
}

export default QuestionList;
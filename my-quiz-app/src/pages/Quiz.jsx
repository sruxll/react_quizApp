import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import MainQ from '../components/quiz/MainQ.js';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';


function Quiz() {
  const navigate = useNavigate(); 
  const initialvalues = {}
  const [data, setData] = useState(initialvalues);
  const location = useLocation();
  const convertedData = {questions: []};
    
  location.state.quizData.forEach((item, index) => {
    const questionId = index + 1;
    var questionText = '';
    var choices = '';
    if (item.questionType === 'mc'){
      questionText = item.question.match(/\d+[\s\S]*?(?=\n|\\n)/m);
      choices = item.question.match(/[a-z]\)\s*\w*(?=\\n|)/g).map(choice => {
        const id = choice.match(/[a-f]/)[0];
        const text = choice.match(/(?<=[a-f]\)\s).*$/)[0];
        return { id, text };
      });
    }
    if (item.questionType === 'fib'){
      questionText = item.question;
      choices = null;
    }
    const answer = item.answer;
  
    convertedData.questions.push({
      id: questionId,
      text: questionText,
      choices: choices,
      answer: answer,
      questionType: item.questionType
    });
  });

  const handleSubmission = (event) =>{ 
    event.preventDefault();         
    navigate('/result', {state: {userAnswers: data, dbAnswers: convertedData.questions, assignmentName: location.state.name}});
  }

  return (
      <div>
          <h1>Assignment/Quiz: {location.state.name} </h1><br />
          <MainQ questions={convertedData.questions} questionType={convertedData.questionType} answerData={data} setAnswerData ={setData} /><br />
          <button className='button' onClick = {handleSubmission}>Submission</button>
      </div>
  );
};

export default Quiz;
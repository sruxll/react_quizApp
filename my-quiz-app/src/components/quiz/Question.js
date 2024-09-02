import React from 'react';
import './Question.css';

function Question(props){
    const {question, key, questionType, questions, current, score, setCurrent, setScore, answerData, setAnswerData} = props;
    const onChange = (e) => {
        props.setAnswerData({...props.answerData, [e.target.name]: e.target.value});
    };

    // function to handle input changes in text boxes
    const handleInputChange = (event) => {
        const {name, value} = event.target;
        // update the answers state with the new value
        setAnswerData((prevAnswers) => ({ ... prevAnswers, [name]: value}));
    };

    return (<div>
    {
        questionType === 'fib' ? (
            <div><h3> {
                question.text.split('_____').map((part, i) => (
                    <React.Fragment key={i}> {
                        i != question.text.split('_____').length - 1 ? (
                        <>
                            {part}
                            <div className='field'>
                                <input type="text"
                                    name={`${question.id}_blank${i + 1}`}
                                    value={answerData[`${question.id}_blank${i + 1}`] || ''}
                                    onChange={handleInputChange}/>
                            </div>
                        </>
                    ) : (part)
                    } </React.Fragment>
                ))
            } </h3></div>
        ) : (
            <div><h3>{question.text}</h3>
            <ul className="list-group">
            {
                question.choices ?
                (
                    question.choices.map((choice) => (
                        <li className="list-group-item" key={choice.id}>
                            <input
                                type="radio"
                                onChange={onChange}
                                name={question.id}
                                value={choice.id}
                                id={choice.id}
                                />{' '}
                            <label htmlFor={choice.id}>{choice.id}{' '}{choice.text}</label>
                            <br />
                        </li>
                    )
                )) : ('')
            }
            </ul>
            <br/>
            </div>
        ) 
    }
    </div>);
}

export default Question;
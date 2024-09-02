import React from 'react';

function Solution({dbAnswers, userAnswers}) {
    return (
        <div className="panel panel-default">
            <div className="panel-body">
                <h4>{dbAnswers.text}</h4><br />
                <div>
                    {    
                        dbAnswers.questionType === 'fib' ? (<div/>) : (
                            <div>
                                {
                                    dbAnswers.choices.map((choice) => (
                                        <label htmlFor={choice.id}>{choice.id}{' '}{choice.text} 
                                        <br/>
                                        </label>                         
                                    ))
                                }
                            </div>
                        )
                    }
                </div>
                <br />
                <p>Your Answer: {userAnswers}</p>
                <p>Correct Answer: {dbAnswers.answer}</p>
                <br />
            </div>
        </div>
    );
}

export default Solution;
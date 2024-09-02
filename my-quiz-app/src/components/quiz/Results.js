import React from 'react';
import Solution from "./Solution";

function Results(props) {
    const percent = (props.score / props.questions.length) * 100;

    let message;
    if (percent > 80) {
        message = 'Awesome Work!';
    } else if (percent > 60) {
        message = 'You did ok!';
    } else {
        message = 'Not Good!';
    }

    return (
        <div className="well">
            <h4>You got {props.score} out of {props.questions.length} correct</h4>
            <h1>{percent}% - {message}</h1>
        </div>
    )

}

export default Results;
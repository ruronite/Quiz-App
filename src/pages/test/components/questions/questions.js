import React, { useState, useEffect } from "react";

import getQuestions from "../../../../api/api";

export default function Questions(props) {
    //let currentQuestion = props.currentQuestion;
    const [questions, setQuestions] = useState(null);

    useEffect(() => {
        // Fetch questions when the component mounts
        async function fetchQuestions() {
            try {
                const quiz = await getQuestions();
                setQuestions(quiz);
            } catch (error) {
                // Handle the error here, e.g., show an error message to the user
                console.error("Error fetching questions:", error);
            }
        }

        if (questions === null) {
            fetchQuestions();
        }
    }, []);

    return (
        <>{questions === null ? <h1>Loading...</h1> :
            <>
                <div id="questions">
                    <p>{questions[0].question}</p>

                </div>
                <div>
                    <button value={questions[0].option_a}>A. {questions[0].option_a}</button>
                    <button value={questions[0].option_b}>B. {questions[0].option_b}</button>
                    <button value={questions[0].option_c}>C. {questions[0].option_c}</button>
                    <button value={questions[0].option_d}>D. {questions[0].option_d}</button>
                </div>
            </>
        }
        </>
    )
}
import React, { useState, useEffect } from "react";

import { useNavigate, useLocation } from "react-router-dom";

import Timer from "./components/timer/timer";

import {getQuestions, submitTest} from "../../api/api";

import QuickNav from "./components/quick-nav/quick-nav"

import "./test.css"

import Spinner from "../spinner/spinner";


export default function Test(props) {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [questions, setQuestions] = useState(null);
    const [answers, setAnswers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [submitted, setSubmitted] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    const { firstName, nickName } = location.state || {};

    //console.log(firstName, nickName)
    

    useEffect(() => {
        document.title = "World Quiz | Test"
        if (!firstName || !nickName) {
            navigate("/info")
        }

    }, [firstName, nickName, navigate]);

    useEffect(() => {
        // Fetch questions when the component mounts
        async function fetchQuestions() {
            try {
                const quiz = await getQuestions();
                setQuestions(quiz);

                // Initialize answers state here
                const initialAnswers = [];
                quiz.forEach((element, index) => {

                    let answerObject = {
                        [element.id]: "",
                        answered: false,
                        opened: index === 0 ? true : false
                    }

                    initialAnswers.push(answerObject);

                });
                setAnswers(initialAnswers);
                setIsLoading(false);


            } catch (error) {
                // Handle the error here, e.g., show an error message to the user
                console.error("Error fetching questions:", error);
            }
        }

        if (questions === null) {
            fetchQuestions();
        }
    }, [questions]);
    

    const saveSelect = (e) => {
        let selectedOption = e.target.value;
        let questionId = questions[currentQuestion].id;

        //console.log("selectedOption", selectedOption)
        //console.log("question Id", questionId)
        setAnswers((prev) => {
            //console.log("previous answers", prev)
            /*
            let oldAnswers = prev;
            console.log("old answers: ", oldAnswers)
            oldAnswers[currentQuestion] = {
                [questionId]: selectedOption,
                answered: true,
                opened: true
            }
            console.log("new Answers", oldAnswers)
            return oldAnswers*/
            return prev.map((answer, ind)=>{
                //console.log("answer[questionId]",answer.questionId)
                //console.log("mapping", answer)
                if(currentQuestion === ind){
                    //console.log("saving answer")
                    return {
                        [questionId]: selectedOption,
                        answered: true,
                        opened: true
                    }
                }
                else {
                    return answer
                }
            })
            //console.log("saved answer", answers)
        })
    }

    const handleQuickNav = (newQuestion)=>{
        setCurrentQuestion(prev =>{
            if (!answers[newQuestion].opened) {
                setAnswers((prev) => {
                    let oldAnswers = prev;
                    let currentAnswer = oldAnswers[newQuestion];
                    currentAnswer.opened = true;
                    oldAnswers[newQuestion] = currentAnswer;
                    return oldAnswers
                })

            }
            return newQuestion
        })
    }

    const testSubmit = async(e)=>{
        
        if(e){
            e.target.setAttribute("disabled", true)
            //console.log("target",e.target);
        }
        setSubmitted(true)
        //console.log(answers)
        let testAnswers = {};
        answers.forEach((answer, ind)=>{
            let answerId = questions[ind].id;
            testAnswers[answerId] = answer[answerId];
            
        })
        //console.log("submit answer format", testAnswers)
        let allInfo = {
            firstName: firstName,
            nickName: nickName,
            responses : testAnswers
        }
        let feedBack = await submitTest(allInfo)
        //console.log("feedback",feedBack);
        navigate("/submission", {state: {feedBack: feedBack}})
    }
    
    let onFirst;
    let onLast;
    let question;
    if (questions) {
        question = questions[currentQuestion]
        onFirst = currentQuestion === 0;
        onLast = currentQuestion === questions.length - 1;
        //console.log("I dy run")

    }
    
    const goBack = () => {
        setCurrentQuestion(prev => {
            let newQuestion = prev - 1
            /**Setting quick nav answer state*/
            if (!answers[newQuestion].opened) {
                setAnswers((prev) => {
                    let oldAnswers = prev;
                    let currentAnswer = oldAnswers[newQuestion];
                    currentAnswer.opened = true;
                    oldAnswers[newQuestion] = currentAnswer;
                    return oldAnswers
                })

            }
            return newQuestion


        })


    }

    const goFront = () => {
        //setCurrentQuestion(prev => prev + 1)
        setCurrentQuestion(prev => {
            let newQuestion = prev + 1
            /**Setting quick nav answer state*/
            if (!answers[newQuestion].opened) {
                setAnswers((prev) => {
                    let oldAnswers = prev;
                    let currentAnswer = oldAnswers[newQuestion];
                    currentAnswer.opened = true;
                    oldAnswers[newQuestion] = currentAnswer;
                    return oldAnswers
                })

            }
            return newQuestion


        })

    }



    return (
        <div id="test-body">  <h2> Test page </h2>
            {submitted? <Spinner message="Submitting..."/> : isLoading ? <Spinner message="Loading..."/> :
                <section id="test-section">
                    <div id="name-bar">
                        <h3>{firstName} {nickName}</h3>
                        {/*<h4>nickName: </h4> */}
                        <Timer handleSubmit={testSubmit} />
                    </div>
                    
                    <div id="questions">
                        <p id="question">{question.question}</p>

                    </div>
                    <div id="options">
                        <button onClick={saveSelect} className={answers[currentQuestion][question.id] === question.option_a ? "quiz-option option-select" : "quiz-option"} value={question.option_a}>A. {question.option_a}</button>
                        <button onClick={saveSelect} className={answers[currentQuestion][question.id] === question.option_b ? "quiz-option option-select" : "quiz-option"} value={question.option_b}>B. {question.option_b}</button>
                        <button onClick={saveSelect} className={answers[currentQuestion][question.id] === question.option_c ? "quiz-option option-select" : "quiz-option"} value={question.option_c}>C. {question.option_c}</button>
                        <button onClick={saveSelect} className={answers[currentQuestion][question.id] === question.option_d ? "quiz-option option-select" : "quiz-option"} value={question.option_d}>D. {question.option_d}</button>
                    </div>

                    <div id="test-nav">
                        <button className="test-nav-button" onClick={goBack} disabled={onFirst}>
                            Prev
                        </button>

                        { onLast? <button className="test-nav-button test-submit" onClick={testSubmit} >
                            Submit
                        </button> :
                        <button className="test-nav-button" onClick={goFront} disabled={onLast}>
                            Next
                        </button>}
                    </div>
                    {/*<p>answers:{` ${JSON.stringify(answers)}`}</p>*/}
                    <QuickNav answers={answers} currentQuestion={currentQuestion} handleQuickNav={handleQuickNav} />
                </section>


            }
        </div>

    )

}



/*else {
            console.log("question value", questions)

            if (!questions) {
                const quiz = getQuestions();
                setQuestions(quiz);
                console.log("question end value", questions)
            }

        }*/
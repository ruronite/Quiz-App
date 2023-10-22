import React, {useState, useEffect} from "react";

import {useNavigate, useLocation} from "react-router-dom"

import SubmissionIcon from "./resources/successful-submission.png"
import "./submission.css"
import Spinner from "../spinner/spinner";


function Submission (props){
    const [showCorrection, setShowCorrection] = useState(false);
    /**adding extra state */
    //const [feedBack, setFeedBack] = useState(null);

    const toggleCorrection = ()=>{
        setShowCorrection(prev => !prev)
    }

    let location  = useLocation();
    const navigate = useNavigate();

    let {feedBack} = location.state || {};

    useEffect(()=>{
        document.title = "World Quiz | Submission"
        if(!feedBack){
            navigate("/info")
        }
        // eslint-disable-next-line
    }, [])
    /*
    useEffect(()=>{
        let pageData = location.state.feedBack || {};
        console.log("page data",pageData)
        if(!pageData){
            navigate("/info")
        }
        else{
            document.title = "World Quiz | Submission";
            setFeedBack(pageData);
        }
    }, [])*/
   
   
    

    return (
        <div>
            {!feedBack? <Spinner message="loading..."/> :
        <div>
            <section id="score-card">
                <figure className="image-container">
                    <img src={SubmissionIcon} alt="successful submission"/>
                </figure>
                <h4>Submission Successful</h4>
                 <p>Candidate: {feedBack.first_name} {feedBack.nick_name}</p>
                <p>Score: {feedBack.score}%</p>
                <button onClick={()=>{navigate("/test")}}>Retake Quiz</button>
                <button onClick={()=>{navigate("/results")}}>See Result board</button>
            </section>
            {feedBack.incorrect.length >= 1   && <section id="correction">
                <h4>Correction</h4>
                <p className="intro">You did not pass some of the questions, click the button below to see the questions and correct answers</p>
                <button onClick={toggleCorrection}>{showCorrection? "Hide Correction" : "See Correction"}</button>
                {showCorrection && <div>
                    <h4>Solution</h4>
                    {feedBack.incorrect.map((questionObject)=>{
                        return (
                            <div key={questionObject.id.toString()} className="correction-card">
                                <p>{questionObject.question}</p>
                                <p><span>Correct Answer:</span> {questionObject.answer}</p>
                            </div>
                        )
                    })}

                </div>}

            </section>}
            
            {/*<div>
                {JSON.stringify(feedBack)};
            </div>*/}
        </div>}
        </div>
    )
    
}

export default Submission
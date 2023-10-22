import React, {useEffect} from "react";
import "./home.css"

import {useNavigate} from "react-router-dom";

export default function Home(props) {
    const navigate = useNavigate();

    const handleClick = (e)=>{
        e.preventDefault();
        navigate("/info");
    }

    const seeResult = (e)=>{
        e.preventDefault();
        navigate("/results")
    }

    useEffect(()=>{
        document.title = "World Quiz | Home"
    }, [])

    return (
        <div id="home">
            <h1>WELCOME TO WORLD QUIZ</h1>
            <h4>Your Gateway to Global Knowledge!</h4>
            <p>Step into the exciting world of geography, culture, and travel with our engaging quizzes.
                Explore countries, capitals, and renowned cities from around the globe while putting your knowledge to the test.
                Whether you're a seasoned traveler or just starting your journey,
                "World Quiz" is your destination for fun and educational challenges.
            </p>
            <p>Embark on a virtual tour of the world's wonders, uncover fascinating facts about nations and their capitals, and discover iconic cities you've always wanted to visit. Challenge yourself, compete with friends, and expand your horizons with each quiz.

            </p>
            <p>
                Are you ready to become a global expert? Let's dive in and explore the diverse and captivating planet we call home, one question at a time. Start your quiz adventure now at "World Quiz"!
            </p>

            <button className="nav-button" onClick={handleClick}>Proceed</button>
            <button className="nav-button" onClick={seeResult}>See Result Board</button>
        </div>
    )
}
import React from "react";

import "./quick-nav.css";

export default function QuickNav(props) {
    let { answers, currentQuestion, handleQuickNav } = props;
    return (
        <div className="quickNav-container">
            {answers.map((answer, ind) => {
                return (
                    <button key={ind.toString()} onClick={()=>{handleQuickNav(ind)}} className={answer.answered && currentQuestion === ind ? "current answered" : answer.answered ? "answered" : answer.opened && currentQuestion === ind ? "current" : answer.opened ? "opened" : "closed"}>
                        {ind + 1}
                    </button>
                )
            })}
        </div>
    )
}
import React from "react";

import spinIcon from "./loading spinner.webp"

import "./spinner.css"


export default function Spinner (props){
    let message = props.message;
    return(
        <div id="spinner">
            <h1>Please wait {message}...</h1>
            <figure className="spinner-container">
                <img src={spinIcon} alt="Loading Icon"/>
            </figure>            
        </div>
    )
}
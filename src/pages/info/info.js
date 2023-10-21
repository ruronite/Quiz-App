import React, {useState, useEffect} from "react";

import {useNavigate} from "react-router-dom";

import "./info.css"

export default function Info(props){
    const [firstName, setFirstName] = useState("");
    const [nickName, setNickName] = useState("");

    const navigate = useNavigate();

    const handleSubmit = (e)=>{
        e.preventDefault();
        if(firstName && nickName){
            navigate("/test", {state:{firstName: firstName, nickName: nickName}})
        }
    }
    
    useEffect(()=>{
        document.title = "World Quiz | Info"
    },[])

    return (
        <form onSubmit= {handleSubmit}>
            <label htmlFor="firstName">First Name:</label>
            <input maxLength="10" id="firstName" required name="firstName" type="text" placeholder="First Name" value={firstName} onChange={(e)=>{setFirstName(e.target.value.toUpperCase())}} />

            <label htmlFor="nickName">Nick Name:</label>
            <input maxLength="10" id="nickName" required name="nickName" type="text" placeholder="Nick Name" value={nickName} onChange={(e)=>{setNickName(e.target.value.toUpperCase())}} />

            <button type="submit" className="nav-button form-button">Submit</button>
        </form>
    )

    
} 
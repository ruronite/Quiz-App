import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { fetchResults } from "../../api/api";

import "./results.css"

import Spinner from "../spinner/spinner";

export default function Results(props) {
    const [results, setResults] = useState(null);
    const [isLoading, setIsLoading] = useState(true)
    const [showResults, setShowResult] = useState(false)
    const navigate = useNavigate();


    const toggleResults = async () => {
        setShowResult(prev => !prev)
    }

    const getResults = async () => {
        toggleResults()
        let feedBack = await fetchResults();
        //console.log("feedback", feedBack)
        setResults(feedBack);
        setIsLoading(false);
    }

    useEffect(()=>{
        document.title = "World Quiz | Results"
    },[])


    return (
        <div>
            <button className="result-buttons" onClick={() => { navigate("/info") }}>{`<--Retake Quiz`}</button>
            {/*<section>
                <h4>Find a result:</h4>
                <div>
                    <h5>Filter By: </h5>
                    <select name="filter-option" id="">
                        <option value="firstName">First Name</option>
                        <option value="nickName">Nick Name</option>
                    </select>
                    <input type="search" name="" id="" />
                    <button>Search</button>
                </div>

            </section>*/}
            <section id="all-results">
                <button className="result-buttons" onClick={getResults}>See all Results</button>
                {showResults && <div id="table-container">
                    <h1>Results Board</h1>
                    {isLoading? <Spinner message="loading"/> : <table>
                        <thead>
                            <tr>
                                <td>Rank</td>
                                <td>First Name</td>
                                <td>Nick Name</td>
                                <td>Score</td>
                            </tr>
                        </thead>
                        <tbody>
                            {results.map((result, ind)=>{
                                return(
                                    <tr key={result.id.toString()} className="table-row">
                                        <td>{ind + 1}</td>
                                        <td>{result.first_name}</td>
                                        <td>{result.nick_name}</td>
                                        <td>{result.score}</td>
                                    </tr>
                                )

                            })}
                            
                        </tbody>
                    </table>}



                </div>}
            </section>
            {/*<div>
                {JSON.stringify(results)}
            </div>*/}

        </div>

    )
}
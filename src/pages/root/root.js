import React from "react";
import {Outlet} from "react-router-dom"

import "./style.css"

export default function Root(props) {
    return (
        <main className = "main-container" >
            <header>
                <h1>World Quiz</h1>
            </header>
            <div className="content">
                <Outlet/>

            </div>

            <footer>
                <p>@2023 World Quiz</p>
            </footer>
        </main>
    )
}
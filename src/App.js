
import './App.css';
import React from "react";

import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";

import Root from "./pages/root/root";
import Home from "./pages/home/home";
import Info from "./pages/info/info";
import Test from "./pages/test/test";
import Submission from "./pages/submission/submission"
import Results from "./pages/results/results"

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Root />}>
    <Route index element={<Home />} />
    <Route path="/info" element={<Info/>} />
    <Route path="/test" element={<Test/>} />
    <Route path= "/submission" element = {<Submission/>} /> 
    <Route path="/results" element = {<Results/>} />
  </Route>

))

function App() {
  return (
    <RouterProvider router={router} />

  );
}

export default App;

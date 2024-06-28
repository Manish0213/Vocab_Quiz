import "./App.css";
import React from "react";
import Quiz from "./component/Quiz";
import Navbar from "./component/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./component/Login";
import Signup from "./component/Signup";
import Home from "./component/Home";
import AddVocab from "./component/AddVocab";

const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/quiz" element={<Quiz/>} />
          <Route path="/addvocabulary" element={<AddVocab/>} />
        </Routes>
      </Router>
    </>
  );
};

export default App;

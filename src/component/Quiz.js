// src/Quiz.js
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const Quiz = () => {
  const navigate = useNavigate();
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  const [vocab, setVocab] = useState();

  useEffect(() => {
    if(!localStorage.getItem('token')){
      navigate('/login');
    } else {
      fetchQuiz();
    }
  }, []);

  const fetchQuiz = () => {
    // Fetch the quiz questions from the backend
    fetch("http://localhost:5000/quiz/play",{
      method: 'GET',
      headers: {
        token: localStorage.getItem('token')
      }
    }) // Adjust the URL to match your backend endpoint
      .then((response) => response.json())
      .then((data) => setQuizQuestions(data));
  }

  const openModal = async (id) => {
    const response = await fetch(`http://localhost:5000/quiz/fetchvocab/${id}`);
    const data = await response.json();
    setVocab(data);
  }

  const handleOptionClick = (optionIndex) => {
    if (!isAnswered) {
      setSelectedOptionIndex(optionIndex);
      setIsAnswered(true);

      if (optionIndex === quizQuestions[currentQuestionIndex].correctIndex) {
        setScore(score + 1);
      }
    }
  };

  const handleNextQuestion = () => {
    setSelectedOptionIndex(null);
    setIsAnswered(false);

    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResult(true);
    }
  };

  if (quizQuestions.length === 0) {
    return <div>Loading...</div>;
  }

  if (showResult) {
    return (
      <div className="container my-3">
        <h2>
          Your Score: {score}/{quizQuestions.length}
        </h2>
        <button className="quizBtn" onClick={() => window.location.reload()}>Play Again</button>
      </div>
    );
  }

  const currentQuestion = quizQuestions[currentQuestionIndex];

  return (
    <>
      <div className="quiz-container">
        <h2>{currentQuestion.question}</h2>
        <ul>
          {currentQuestion.options.map((option, index) => (
            <li key={option.id}>
              <div
                className="options"
                onClick={() => handleOptionClick(index)}
                style={{
                  backgroundColor: isAnswered
                    ? index === currentQuestion.correctIndex
                      ? "rgba(72, 175, 77, 0.877)"
                      : index === selectedOptionIndex
                      ? "rgba(199, 63, 63, 0.945)"
                      : "white"
                    : "white",
                  color: isAnswered
                    ? index === currentQuestion.correctIndex
                      ? "white"
                      : index === selectedOptionIndex
                      ? "white"
                      : "black"
                    : "black",
                }}
                disabled={isAnswered}
              >
                {option.meaning}
                {isAnswered === true && (
                  <i data-bs-toggle="modal" data-bs-target="#exampleModal" class="fa-solid fa-eye" onClick={() => openModal(option.id)}></i>
                )}
              </div>
            </li>
          ))}
        </ul>
        <button className="quizBtn" onClick={handleNextQuestion} disabled={!isAnswered}>
          Next
        </button>
      </div>

      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                description
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              {
              vocab && (<>
              <li>Vocab: {vocab.vocab}</li>
              <li>Meaning: {vocab.meaning}</li>
              <li>Example Sentence: {vocab.sentence}</li>
              </>)      
              }
            </div>
            {/* close and update button to be added */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Quiz;

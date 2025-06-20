// src/Quiz.js
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import correctSound from "../sound/correctSound.mp3";
import incorrectSound from "../sound/incorrectSound.mp3";

const Quiz = () => {
  const navigate = useNavigate();
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  const [vocab, setVocab] = useState({
    vocab: "",
    meaning: "",
    sentence: "",
    description: "",
  });
  const [fullView, setFullView] = useState(false);

  // Audio references
  const correctAudioRef = useRef(new Audio(correctSound));
  const incorrectAudioRef = useRef(new Audio(incorrectSound));

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      fetchQuiz();
    }
  }, []);

  const fetchQuiz = () => {
    // Fetch the quiz questions from the backend
    fetch(`${process.env.REACT_APP_API_URL}/quiz/play`, {
      method: "GET",
      headers: {
        token: localStorage.getItem("token"),
      },
    }) // Adjust the URL to match your backend endpoint
      .then((response) => response.json())
      .then((data) => setQuizQuestions(data));
  };

  const openModal = async (id) => {
    setFullView(false);
    setVocab({ vocab: "", meaning: "", sentence: "", description: "" });
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/quiz/fetchvocab/${id}`
    );
    const data = await response.json();
    setVocab(data);
  };

  const handleOptionClick = (optionIndex) => {
    if (!isAnswered) {
      setSelectedOptionIndex(optionIndex);
      setIsAnswered(true);

      if (optionIndex === quizQuestions[currentQuestionIndex].correctIndex) {
        setScore(score + 1);
        playSound(correctAudioRef);
      } else {
        playSound(incorrectAudioRef);
      }
    }
  };

  const playSound = (audioRef) => {
    audioRef.current.currentTime = 0;
    audioRef.current.play();
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

  const resetQuiz = () => {
    setQuizQuestions([]); //this is added by me to set again new quiz questions
    setCurrentQuestionIndex(0);
    setSelectedOptionIndex(null);
    setScore(0);
    setShowResult(false);
    setIsAnswered(false);
    fetchQuiz(); //this is added by me to set again new quiz questions
  };

  if (quizQuestions.length === 0) {
    return (
      <div class="center-spinner">
        <div class="spinner-grow text-dark" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  if (showResult) {
    return (
      <div className="container my-3">
        <h2>
          Your Score: {score}/{quizQuestions.length}
        </h2>
        <button className="quizBtn" onClick={resetQuiz}>
          Play Again
        </button>
      </div>
    );
  }

  const currentQuestion = quizQuestions[currentQuestionIndex];

  return (
    <>
      <div className="quiz-container">
        <h2 className="mx-2">{`${currentQuestionIndex + 1}. ${currentQuestion.question
          }`}</h2>
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
                        : ""
                    : "",
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
                  <i
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    class="fa-solid fa-eye"
                    onClick={() => openModal(option.id)}
                  ></i>
                )}
              </div>
            </li>
          ))}
        </ul>
        <button
          className="quizBtn"
          onClick={handleNextQuestion}
          disabled={!isAnswered}
        >
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
              {vocab && (
                <ul>
                  <li>Vocab: {vocab.vocab}</li>
                  <hr />
                  <li>Meaning: {vocab.meaning}</li>
                  <hr />
                  <li>Example Sentence: {vocab.sentence}</li>
                  <hr />
                  {fullView === true && (
                    <li>Description: {vocab.description}</li>
                  )}
                </ul>
              )}
            </div>
            <div class="modal-footer" style={{ fontSize: "30px" }}>
              {/* <button type="button" class="btn btn-success mx-2">View</button> */}
              <i
                className={`fa-solid ${fullView ? "fa-minus" : "fa-plus"}`}
                onClick={() => setFullView(!fullView)}
              ></i>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Quiz;

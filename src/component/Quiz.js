// src/Quiz.js
import React, { useState, useEffect } from 'react';

const Quiz = () => {
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    // Fetch the quiz questions from the backend
    fetch('http://localhost:5000/quiz/play') // Adjust the URL to match your backend endpoint
      .then(response => response.json())
      .then(data => setQuizQuestions(data));
  }, []);

  const handleOptionClick = (optionIndex) => {
    setSelectedOptionIndex(optionIndex);
  };

  const handleNextQuestion = () => {
    if (selectedOptionIndex === quizQuestions[currentQuestionIndex].correctIndex) {
      setScore(score + 1);
    }

    setSelectedOptionIndex(null);

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
      <div>
        <h2>Your Score: {score}/{quizQuestions.length}</h2>
        <button onClick={() => window.location.reload()}>Restart Quiz</button>
      </div>
    );
  }

  const currentQuestion = quizQuestions[currentQuestionIndex];

  return (
    <div>
      <h2>{currentQuestion.question}</h2>
      <ul>
        {currentQuestion.options.map((option, index) => (
          <li key={option.id}>
            <button
              onClick={() => handleOptionClick(index)}
              style={{
                backgroundColor: selectedOptionIndex === index ? 'lightblue' : 'white',
              }}
            >
              {option.meaning}
            </button>
          </li>
        ))}
      </ul>
      <button onClick={handleNextQuestion} disabled={selectedOptionIndex === null}>
        Next Question
      </button>
    </div>
  );
};

export default Quiz;

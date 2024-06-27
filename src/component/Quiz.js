// src/Quiz.js
import React, { useState, useEffect } from 'react';

const Quiz = () => {
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);

  useEffect(() => {
    // Fetch the quiz questions from the backend
    fetch('http://localhost:5000/quiz/play') // Adjust the URL to match your backend endpoint
      .then(response => response.json())
      .then(data => setQuizQuestions(data));
  }, []);

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
                backgroundColor: isAnswered
                  ? index === currentQuestion.correctIndex
                    ? 'green'
                    : index === selectedOptionIndex
                    ? 'red'
                    : 'white'
                  : 'white',
                color: isAnswered
                  ? index === currentQuestion.correctIndex
                    ? 'white'
                    : index === selectedOptionIndex
                    ? 'white'
                    : 'black'
                  : 'black',
              }}
              disabled={isAnswered}
            >
              {option.meaning}
            </button>
          </li>
        ))}
      </ul>
      <button onClick={handleNextQuestion} disabled={!isAnswered}>
        Next Question
      </button>
    </div>
  );
};

export default Quiz;

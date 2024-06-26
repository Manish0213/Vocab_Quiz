import React from 'react';

const Question = ({ question, handleAnswer }) => {
  return (
    <div>
      <h2>{question.question}</h2>
      <div>
        {question.options.map((option) => (
          <button key={option} onClick={() => handleAnswer(option)}>
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Question;

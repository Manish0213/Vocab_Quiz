import React from 'react';

const Result = ({ score, total }) => {
  return (
    <div>
      <h2>Your Score: {score} / {total}</h2>
    </div>
  );
};

export default Result;

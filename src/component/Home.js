import React, { useEffect, useState } from "react";

const Home = () => {
  const [vocabs, setVocabs] = useState([]);

  const fetchAllVocab = async () => {
    const response = await fetch(`http://localhost:5000/quiz/fetchallvocab`);
    const data = await response.json();
    setVocabs(data);
    console.log(data);
  };

  useEffect(() => {
    fetchAllVocab();
  }, []);

  return (
    <>
      <div className="vocab-container my-3">
        {vocabs &&
          vocabs.map((vocab) => <div className="vocab-list">
            <p className="vocab">{vocab.vocab}</p>
            <p className="meaning">{vocab.meaning}</p>
          </div>)}
      </div>
    </>
  );
};

export default Home;

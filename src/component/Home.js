import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [vocabs, setVocabs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchAllVocab = async () => {
    const response = await fetch(`http://localhost:5000/quiz/fetchallvocab`,{
      method: 'GET',
      headers: {
        token: localStorage.getItem('token')
      }
    });
    const data = await response.json();
    setVocabs(data);
    console.log(data);
  };

  useEffect(() => {
    if(!localStorage.getItem('token')){
      navigate('/login');
    }
    else{
      fetchAllVocab();
    }
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredVocabs = vocabs.filter((vocab) =>
    vocab.vocab.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vocab.meaning.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="vocab-container my-3">
        <div class="search-container">
          <input
            type="text"
            class="search-box"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button class="search-button">🔍</button>
        </div>
        {filteredVocabs.length > 0 ? (
          filteredVocabs.map((vocab) => (
            <div className="vocab-list" key={vocab._id}>
              <p className="vocab">{vocab.vocab}</p>
              <p className="meaning">{vocab.meaning}</p>
            </div>
          ))
        ) : (
          <p>No vocab found</p>
        )}
      </div>
    </>
  );
};

export default Home;

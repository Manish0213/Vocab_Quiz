import React, { useState,useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const AddVocab = () => {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    vocab: "",
    meaning: "",
    sentence: "",
  });

  useEffect(() => {
    if(!localStorage.getItem('token')){
      navigate('/login');
    }
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch(`http://localhost:5000/quiz/create`,{
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            token: localStorage.getItem('token')
        },
        body: JSON.stringify(formData)
    });
    await response.json();
    setFormData({
      vocab: "",
      meaning: "",
      sentence: "",
    });
  };

  return (
    <div className="container my-3">
      <form onSubmit={handleSubmit}>
        <div class="mb-3">
          <label for="vocab" class="form-label">
            Vocabulary
          </label>
          <input
            type="text"
            class="form-control"
            id="vocab"
            name="vocab"
            value={formData.vocab}
            onChange={handleChange}
          />
        </div>
        <div class="mb-3">
          <label for="meaning" class="form-label">
            Meaning
          </label>
          <input
            type="text"
            class="form-control"
            id="meaning"
            name="meaning"
            value={formData.meaning}
            onChange={handleChange}
          />
        </div>
        <div class="mb-3">
          <label for="sentence" class="form-label">
            Example Sentences
          </label>
          <input
            type="text"
            class="form-control"
            id="sentence"
            name="sentence"
            value={formData.sentence}
            onChange={handleChange}
          />
        </div>
        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddVocab;

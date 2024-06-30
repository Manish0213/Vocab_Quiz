import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Edit = ({showAlert}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    vocab: "",
    meaning: "",
    sentence: "",
    description: "",
  });

  const getVocab = async () => {
    const response = await fetch(`http://localhost:5000/quiz/fetchvocab/${id}`);
    const data = await response.json();
    setFormData({
      vocab: data.vocab,
      meaning: data.meaning,
      sentence: data.sentence,
      description: data.description,
    });
  };

  useEffect(() => {
    getVocab();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/quiz/updatevocab/${id}`, {
      method: 'PUT',
      headers: {
        "content-type": "application/json",
        token: localStorage.getItem("token")
      },
      body: JSON.stringify(formData)
    });
    const data = await response.json();
    console.log(data);
    showAlert("Vocabulary Updated Successfully!", "success")
    navigate(`/view/${id}`);
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
            onChange={handleChange}
            value={formData.vocab}
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
            onChange={handleChange}
            value={formData.meaning}
          />
        </div>
        <div class="mb-3">
          <label for="sentence" class="form-label">
            Example sentence
          </label>
          <textarea
            type="text"
            class="form-control"
            id="sentence"
            rows= "3"
            name="sentence"
            onChange={handleChange}
            value={formData.sentence}
          />
        </div>
        <div class="mb-3">
          <label for="sentence" class="form-label">
            Description
          </label>
          <textarea
            type="text"
            class="form-control"
            id="description"
            rows= "5"
            name="description"
            onChange={handleChange}
            value={formData.description}
          />
        </div>
        <button type="submit" class="btn btn-primary">
          Update
        </button>
      </form>
    </div>
  );
};

export default Edit;

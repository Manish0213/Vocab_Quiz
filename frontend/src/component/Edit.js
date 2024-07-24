import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateVocab } from "../app/features/vocab/vocabslice";

const Edit = ({showAlert}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    vocab: "",
    meaning: "",
    sentence: "",
    description: "",
  });

  const getVocab = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/quiz/fetchvocab/${id}`);
    const data = await response.json();
    setFormData({
      id: data._id,
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
    dispatch(updateVocab(formData));
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
            required
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
            required
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
            required
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
            required
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

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addVocab } from "../app/features/vocab/vocabslice";

const AddVocab = ({ showAlert }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    vocab: "",
    meaning: "",
    sentence: "",
    description: "",
  });

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await dispatch(addVocab(formData)).unwrap();
    showAlert("Vocabulary Added Successfully!", "success");
    setFormData({
      vocab: "",
      meaning: "",
      sentence: "",
      description: "",
    });
  };

  return (
    <div className="container my-3">
      <h2 className="mb-4">Add Vocabulary</h2>
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
            value={formData.meaning}
            onChange={handleChange}
            required
          />
        </div>
        <div class="mb-3">
          <label for="sentence" class="form-label">
            Example Sentences
          </label>
          <textarea
            type="text"
            class="form-control"
            id="sentence"
            rows="3"
            name="sentence"
            value={formData.sentence}
            onChange={handleChange}
            required
          />
        </div>
        <div class="mb-3">
          <label for="description" class="form-label">
            Description
          </label>
          <textarea
            type="text"
            class="form-control"
            id="description"
            rows="5"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
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

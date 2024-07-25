import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteVocab } from "../app/features/vocab/vocabslice";

const View = ({ showAlert }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [vocab, setVocab] = useState({});

  const getVocab = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/quiz/fetchvocab/${id}`
    );
    const data = await response.json();
    setVocab(data);
  };

  useEffect(() => {
    getVocab();
  }, [id]);

  if (Object.keys(vocab).length === 0) {
    return (
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    );
  }

  const handleDelete = async (e) => {
    e.preventDefault();
    dispatch(deleteVocab(id));
    showAlert("Vocabulary Deleted Successfully!", "success");
    navigate("/");
  };

  return (
    <>
      <div className="view-container">
        <div className="view-nav">
          <Link
            to={`/edit/${id}`}
            style={{ textDecoration: "none", color: "black" }}
          >
            <i class="fa-solid fa-pen-to-square"></i>
          </Link>
          <Link style={{ textDecoration: "none", color: "black" }}>
            <i
              class="fa-solid fa-trash"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            ></i>
          </Link>
        </div>
        <hr />
        <h1>{vocab.vocab}</h1>
        <div>
          <span>Meaning :</span> {vocab.meaning}
        </div>
        <div>
          <span>Example Sentence:</span> {vocab.sentence}
        </div>
        <div>
          <span>Description:</span> {vocab.description}
        </div>
      </div>

      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                confirm delete
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default View;

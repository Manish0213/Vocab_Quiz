import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllVocab } from "../app/features/vocab/vocabslice";

const Home = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const vocabs = useSelector((state) => state.vocab.vocabs);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      dispatch(fetchAllVocab()).then(() => setLoading(false));
    }
  }, [dispatch]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredVocabs = vocabs.filter(
    (vocab) =>
      vocab.vocab.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vocab.meaning.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="home-container">
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
        {loading ? (
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        ) : filteredVocabs.length > 0 ? (
          filteredVocabs.map((vocab) => (
            <Link
              to={`/view/${vocab._id}`}
              style={{ textDecoration: "none", color: "black" }}
            >
              <div className="vocab-list" key={vocab._id}>
                <p className="vocab">{vocab.vocab}</p>
                <p className="meaning">{vocab.meaning}</p>
              </div>
            </Link>
          ))
        ) : (
          <p>No vocab found</p>
        )}
      </div>
      <div className="link-btn-container">
        <Link
          to="addvocabulary"
          style={{ textDecoration: "none", color: "black" }}
        >
          <div className="link-btn">
            <i class="fa-solid fa-plus fa-2x"></i>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Home;

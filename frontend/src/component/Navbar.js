import React from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  }

  return (
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Vocabulary Quiz</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <Link class="nav-link active" aria-current="page" to="/">Home</Link>
        </li>
        {/* <li class="nav-item">
          <Link class="nav-link" to="quiz">Play Quiz</Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link" to="addvocabulary">Add Vocabulary</Link>
        </li> */}
      </ul>
      <form class="d-flex" role="search">
      {localStorage.getItem('token') === null ?
        (
        <>
        <Link to='/login'><button class="btn btn-outline-success mx-2" type="submit">Login</button></Link>
        <Link to='/signup'><button class="btn btn-outline-success" type="submit">Sign Up</button></Link>
        </>
        ) : (
          <><button class="btn btn-outline-success" onClick={handleLogout} type="submit">Logout</button></>
        )
      }
      </form>
    </div>
  </div>
</nav>
  )
}

export default Navbar

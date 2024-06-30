import React, {useState} from 'react'
import { useNavigate } from "react-router-dom";

const Signup = ({showAlert}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    cPassword: ""
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch(`https://vocab-quiz-api.vercel.app/auth/signup`,{
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(formData)
    });
    const data = await response.json();

    if(data.success === true){
      localStorage.setItem('token', data.authToken);
      showAlert("Account Created Successfully!","success");
      navigate('/');
      setFormData({
        name: "",
        email: "",
        password: "",
        cPassword: ""
      });
    } else {
      showAlert("Invlid Crediantials!","danger");
    }
  };

  return (
    <div class="container my-3">
      <h2 className="mb-4">Create Your Account</h2>
      <form onSubmit={handleSubmit}>
        <div class="mb-3">
          <label for="name" class="form-label">
            Enter Your Name
          </label>
          <input
            type="text"
            class="form-control"
            id="name"
            name="name"
            onChange={handleChange}
            value={formData.name}
          />
        </div>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">
            Email address
          </label>
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            name="email"
            onChange={handleChange}
            value={formData.email}
          />
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">
            Password
          </label>
          <input
            type="password"
            class="form-control"
            id="exampleInputPassword1"
            name="password"
            onChange={handleChange}
            value={formData.password}
          />
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword2" class="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            class="form-control"
            id="exampleInputPassword2"
            name="cPassword"
            onChange={handleChange}
            value={formData.cPassword}
          />
        </div>
        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  )
}

export default Signup

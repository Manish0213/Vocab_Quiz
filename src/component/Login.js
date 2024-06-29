import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

const Login = ({showAlert}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
    const response = await fetch(`http://localhost:5000/auth/login`,{
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(formData)
    });
    const data = await response.json();
    if(data.success === true) {
      localStorage.setItem('token', data.authToken);
      showAlert("Login Successfully!","success");
      navigate('/');
    }
    else {
      showAlert("Invlid Crediantials!","danger");
    }
    setFormData({
      email: "",
      password: ""
    });
  };
  
  return (
    <div class="container my-3">
      <form onSubmit={handleSubmit}>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">
            Email address
          </label>
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            name="email"
            aria-describedby="emailHelp"
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
        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;

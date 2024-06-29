import "./App.css";
import React, {useState} from "react";
import Quiz from "./component/Quiz";
import Navbar from "./component/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./component/Login";
import Signup from "./component/Signup";
import Home from "./component/Home";
import AddVocab from "./component/AddVocab";
import View from "./component/View";
import Edit from "./component/Edit";
import Alert from "./component/Alert";

const App = () => {
  const [alert, setAlert] = useState(null);
  
  const showAlert = (message,type) => {
    setAlert({ msg: message, type: type});
    setTimeout(()=>{
      setAlert(null);
    },1500);
  }

  return (
    <>
      <Router>
        <Navbar />
        {alert !== null ? <Alert alert={alert} /> : null}
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login showAlert={showAlert} />} />
          <Route path="/signup" element={<Signup showAlert={showAlert} />} />
          <Route path="/quiz" element={<Quiz/>} />
          <Route path="/addvocabulary" element={<AddVocab showAlert={showAlert}/>} />
          <Route path="/view/:id" element={<View showAlert={showAlert}/>} />
          <Route path="/edit/:id" element={<Edit showAlert={showAlert}/>} />
        </Routes>
      </Router>
    </>
  );
};

export default App;

import VocabularyList from "./VocabularyList";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } 
  }, []);
  
  return (
    <VocabularyList/>
  );
};

export default Home;

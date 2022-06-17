import React, { useContext } from 'react'
import AuthContext from "../context/AuthProvider";
import { useNavigate, Link } from "react-router-dom";

const Home = () => {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = async () => {
    setAuth({});
    navigate('/loginAdmin');
  }

  return (
    <>    
      <div>Home</div>
      <Link to="/newForm">Create a new form</Link>
      <button onClick={logout}>Sign Out</button>
    </>
  )
}

export default Home
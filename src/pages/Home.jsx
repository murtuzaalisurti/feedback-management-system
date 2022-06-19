import React, { useContext } from 'react'
import AuthContext from "../context/AuthProvider";
import { useNavigate, Link } from "react-router-dom";
import useLogout from '../hooks/useLogout';

const Home = () => {
  // const { setAuth } = useContext(AuthContext);
  const logout = useLogout()
  const navigate = useNavigate();

  const signOut = async () => {
    await logout();
    navigate('/loginAdmin');
  }

  return (
    <>    
      <div>Home</div>
      <Link to="/newForm">Create a new form</Link>
      <button onClick={signOut}>Sign Out</button>
    </>
  )
}

export default Home
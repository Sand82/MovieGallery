import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext.js";

const Logout = () => {
  const { logoutHandler } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    logoutHandler();
    localStorage.clear();
    navigate("/");
  },[]);

  return null;
};

export default Logout;

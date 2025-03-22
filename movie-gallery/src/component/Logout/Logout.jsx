import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../contexts/AuthContext.js";

const Logout = () => {
  const { userLogout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    userLogout();
    navigate("/");
  },[]);

  return null;
};

export default Logout;
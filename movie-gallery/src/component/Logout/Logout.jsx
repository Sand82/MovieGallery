import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../contexts/AuthContext.js";

const Logout = () => {
  const { userLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    userLogin({})
    navigate("/");
  },[]);

  return null;
};

export default Logout;
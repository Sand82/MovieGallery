import { useContext} from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../contexts/AuthContext.js";

const Logout = () => {
  const { logoutHandler } = useContext(AuthContext);
  const navigate = useNavigate();
 
    logoutHandler();
    localStorage.clear();
    navigate("/");
  return null;
};

export default Logout;

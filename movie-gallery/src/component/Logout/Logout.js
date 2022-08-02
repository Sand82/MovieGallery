import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext.js";
const Logout = () => {

    const {logoutHandler} = useContext(AuthContext);
    const navigate = useNavigate();

    logoutHandler();
    navigate('/');    
    return null;
}

export default Logout;
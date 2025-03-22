import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import * as authService from "../services/AuthServices.js";
import { useLocalStorage } from "../hooks/useLocalStorage.js";
import { badRequestStatusCode } from "../constants/GlobalConstants.js";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useLocalStorage("auth", {});
  const [serverErrors, setServerErrors] = useState(null);

  const navigate = useNavigate();

  const userLogin = async (authData) => {
    setServerErrors(null);

    try {
      const result = await authService.login(authData);
      setAuth(result);
      navigate("/");
    } catch (error) {
      if (error.message.includes(badRequestStatusCode)) {
        navigate("/badrequest");
      } else {
        setServerErrors(error.message);
      }
    }
  };

  const userRegister = async (authData) => {
    setServerErrors(null);

    try {
      await authService.register(authData);
      navigate("/login");
    } catch (error) {
      if (error.message.includes(badRequestStatusCode)) {
        navigate("/badrequest");
      } else {
        setServerErrors(error.message);
      }
    }
  };

  const userLogout = () => {
    setAuth({});
  };

  return (
    <AuthContext.Provider
      value={{ user: auth, userLogin, userRegister, userLogout, serverErrors }}
    >
      {children}
    </AuthContext.Provider>
  );
};

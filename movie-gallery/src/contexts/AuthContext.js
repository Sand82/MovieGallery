import { createContext } from "react";
import { useNavigate } from "react-router-dom";

import { useLocalStorage } from "../hooks/useLocalStorage.js";
import * as authService from "../services/AuthServices.js";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useLocalStorage("auth", {});
  const navigate = useNavigate();

  const userLogin = (authData) => {
    authService
      .login(authData)
      .then((result) => {
        if (result === "Bad response") {
          return navigate("/notfound");
        }
        setAuth(result);
        return navigate("/");
      })
      .catch((error) => {
        throw console.error(error);
      });
  };

  const userRegister = (authData) => {
    authService
      .register(authData)
      .then((result) => {
        if (result === "Bad response") {
          return navigate("/badrequest");
        }
        return navigate("/login");
      })
      .catch((error) => {
        throw console.error(error);
      });
  };

  const userLogout = () => {
    setAuth({});
  };

  return (
    <AuthContext.Provider
      value={{ user: auth, userLogin, userRegister, userLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

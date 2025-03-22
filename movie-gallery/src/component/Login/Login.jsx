import { useContext } from "react";

import * as style from "../Login/Login.Module.css";
import { AuthContext } from "../../contexts/AuthContext.js";
import Input from "../UI/Input.jsx"
import { useInput } from "../../hooks/useInput.js"
import * as GlobalConstant from "../../constants/GlobalConstants.js"
import { hasLength, minLength } from "../../services/Validators.js"

const Login = () => {    

  const {
    value: usernameValue,
    changeHandler: usernameChangeHandler,
    hasError: usernameHasError,
    inputBlurHandler: usernameInputBluerHandler,
    isEmpty: isUsernameFieldEmpty,    
  } = useInput("", (value) => hasLength(value, GlobalConstant.userNameMinLength, GlobalConstant.userNameMaxLength));
    
  const {
    value: passwordValue,
    changeHandler: passwordChangeHandler,
    hasError: passwordError,
    inputBlurHandler: passwordInputBluerHandler, 
    isEmpty: isPasswordFieldEmpty,   
  } = useInput("", (value) => minLength(value, GlobalConstant.passwordLength));
    
  const { userLogin } = useContext(AuthContext);

  const loginSubmitHandler = async (e) => {
      e.preventDefault();        
      var loginCredential = {
          username: usernameValue,
          password: passwordValue
      }
      userLogin(loginCredential);
  };

  let isLoginButtonDisaled = usernameHasError || passwordError || isUsernameFieldEmpty || isPasswordFieldEmpty;
	
  return (
    <div id="login" style={style}>
      <h1>
          <strong>Welcome.</strong> Please login.
      </h1>
      <form onSubmit={loginSubmitHandler}>
        <fieldset>
          <div>
            <Input
              label="Username"
              type="text"
              name="username"
              value={usernameValue}
              onChange={usernameChangeHandler}
              onBlur={usernameInputBluerHandler}
              error={usernameHasError && `User name should be between ${GlobalConstant.userNameMinLength} and ${GlobalConstant.userNameMaxLength} symbols.`}
            />
          </div>
          <div>
            <Input
              label="Password"
              type="password"
              name="password"
              value={passwordValue}
              onChange={passwordChangeHandler}
              onBlur={passwordInputBluerHandler}
              error={passwordError && `Password should be more than ${GlobalConstant.passwordLength} symbols.`}
            />
          </div>
          <div>
              <button className="button" type="submit" disabled={isLoginButtonDisaled} >Login</button>
          </div>
        </fieldset>
      </form>
      <p>
          <span className="btn-round">or</span>
      </p>
      <p>
        <a className="facebook-before">
          <span className="fontawesome-facebook" />
        </a>
        <button className="facebook" disabled={isLoginButtonDisaled} >Login Using Facbook</button>
      </p>
      <p>
        <a className="twitter-before">
          <span className="fontawesome-twitter" />
        </a>
        <button className="twitter" disabled={isLoginButtonDisaled} >Login Using Twitter</button> 
      </p>
    </div>
  );
};

export default Login;

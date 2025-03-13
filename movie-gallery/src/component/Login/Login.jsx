import { useNavigate } from 'react-router-dom'
import { useContext } from "react";

import * as style from "../Login/Login.Module.css";
import * as authService from '../../services/AuthServices.js';
import { AuthContext } from "../../contexts/AuthContext.js";
import Input from "../UI/Input.jsx"
import { useInput } from "../../hooks/useInput.js"
import * as GlobalConstant from "../../constants/GlobalConstants.js"
import { hasLength, minLength } from "../../services/Validators.js"

const Login = () => {    

    const {
        value: usernameValue,
        changeHeandler: usernameChangeHeandler,
        hasError: usernameHasError,
        inputBlurHeandler: usernameInputBluerHeandler,
        isEmpty: isUsernameFieldEmpty,    
      } = useInput("", (value) => hasLength(value, GlobalConstant.userNameMinLength, GlobalConstant.userNameMaxLength));
    
    const {
        value: passwordValue,
        changeHeandler: passwordChangeHeandler,
        hasError: passwordError,
        inputBlurHeandler: passwordInputBluerHeandler, 
        isEmpty: isPasswordFieldEmpty,   
      } = useInput("", (value) => minLength(value, GlobalConstant.passwordLength));

    const navigate = useNavigate();
    const { userLogin } = useContext(AuthContext);

    const loginSubmitHandler = async (e) => {
        e.preventDefault();        

        var loginCredential = {
            username: usernameValue,
            password: passwordValue
        }
       
        authService.login(loginCredential)
            .then(result => {   
             if (result === 'Bad response') {
                 return navigate('/notfound') 
             }            
                 userLogin(result);
                 return navigate('/')
            })
            .catch((error) => {
                 throw console.error(error);
            });
        
    };

    let isLoginButtonDisaled = usernameHasError || passwordError || isUsernameFieldEmpty || isPasswordFieldEmpty;

    return (
        <div id="login" style={style}>
            <h1>
                <strong>Welcome.</strong> Please login.
            </h1>
            <form onSubmit={loginSubmitHandler}>
                <fieldset>
                    <p>
                        <Input
                            label="Username"
                            type="text"
                            name="username"
                            value={usernameValue}
                            onChange={usernameChangeHeandler}
                            onBlur={usernameInputBluerHeandler}
                            error={usernameHasError && `User name should be between ${GlobalConstant.userNameMinLength} and ${GlobalConstant.userNameMaxLength} symbols.`}
                        />
                    </p>
                    <p>
                        <Input
                           label="Password"
                           type="password"
                           name="password"
                           value={passwordValue}
                           onChange={passwordChangeHeandler}
                           onBlur={passwordInputBluerHeandler}
                           error={passwordError && `Password should be more than ${GlobalConstant.passwordLength} symbols.`}
                        />
                    </p>
                    <p>
                        <button className="button" type="submit" disabled={isLoginButtonDisaled} >Login</button>
                    </p>
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

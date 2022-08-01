import { useState } from "react";

import * as style from "../Login/Login.Module.css";
import * as userValidator from '../../services/UserValidator.js'

const Login = () => {
    const [login, setLogin] = useState({
        username: '',
        password: '',
    });

    const [userNameError, setUserNameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const changeHandler = (e) => {
        setLogin((state) => ({
            ...state,
            [e.target.name]: e.target.value,
        }));        
    };

    const loginSubmitHandler = async (e) => {
        e.preventDefault();        

        const response = await fetch("https://localhost:7222/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(login),
        });

        const result = await response.json();
        console.log(result);

        if (response.ok) {
            console.log(result);
        } else {
            console.log(result);
        }
    };

    const validateUsername = (e) => {
        const userName = e.target.value;        
        setUserNameError(userValidator.user(userName));        
    };

    const validatePassword = (e) => {
        const password = e.target.value;
        setPasswordError(userValidator.password(password))
    };

    const isValid = Object.values(login).some(x => x == '') || userNameError || passwordError ;

    return (
        <div id="login" style={style}>
            <h1>
                <strong>Welcome.</strong> Please login.
            </h1>
            <form onSubmit={loginSubmitHandler}>
                <fieldset>
                    <p>
                        <input
                            type="text"
                            name="username"
                            value={login.username}
                            onChange={changeHandler}
                            placeholder="Username"
                            onBlur={validateUsername}
                        />
                        <label htmlFor="username">User name:</label>
                    </p>
                    {userNameError ? (
                        <p className="alert alert-danger">
                            User name should be more than 2 and less than 50 symbols.
                        </p>
                    ) : (
                        <p></p>
                    )}

                    <p>                       
                        <input
                            type="password"
                            name="password"
                            value={login.password}
                            onChange={changeHandler}
                            placeholder="Password"
                            onBlur={validatePassword}
                        />
                         <label htmlFor="password">Password:</label>
                    </p>
                    {passwordError ? (
                        <p className="alert alert-danger">
                            Password should be more than 5 and less than 50 symbols.
                        </p>
                    ) : (
                        <p></p>
                    )}
                    <p>                        
                        <button className="button" type="submit" disabled={isValid}>Login</button>
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
                <button className="facebook" disabled={isValid}>Login Using Facbook</button>
            </p>
            <p>
                <a className="twitter-before">
                    <span className="fontawesome-twitter" />
                </a>
                <button className="twitter" disabled={isValid}>Login Using Twitter</button>
            </p>
        </div>
    );
};

export default Login;

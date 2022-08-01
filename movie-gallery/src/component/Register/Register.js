import { useState } from "react";
import { useNavigate } from 'react-router-dom';

import * as style from "./Register.Module.css";
import * as userValidator from '../../services/UserValidator.js'

const Register = () => {
  const [register, setRegister] = useState({
    username: '',
    email: '',
    password: '',
    repeatPassword: '',
  });
 
  const [usernameError, setUsernameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [conformPasswordError, setConformPasswordError] = useState(false);

  const navigate = useNavigate();

  const registerSubmitHandler = async (e) => {
    e.preventDefault();    

    const response = await fetch('https://localhost:7222/api/users/register', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(register),
    })
        if (response.ok) {
            const result = await response.json();
            console.log(result);
            navigate('/login');
        }else {
            
        }
        
  };

  const changeHandler = (e) => {    
    setRegister((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };
  

const validateUsername = (e) => {
    const userName = e.target.value;        
    setUsernameError(userValidator.user(userName));        
};

const validateEmail = (e) => {
    const currEmail = e.target.value;   
    setEmailError(userValidator.emailAddress(currEmail));    
}

const validatePassword = (e) => {
    const currPass = e.target.value;
    setPasswordError(userValidator.password(currPass))
};

const validateConformePassword = (e) => {
    const password = e.target.value;
    setConformPasswordError(userValidator.password(password))
};

 const isValid = Object.values(register).some(x => x == '') 
        || usernameError || passwordError || conformPasswordError || emailError;

  return (
    <section className="vh-100" style={style}>
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black">
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                      Sign in
                    </p>
                    <form
                      onSubmit={registerSubmitHandler}
                      className="mx-1 mx-md-4"
                    >
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-user fa-lg me-3 fa-fw" />
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="text"
                            id="form3Example1c"
                            className="form-control"
                            name="username"
                            onChange={changeHandler}
                            value={register.username}
                            onBlur={validateUsername}
                          />
                          <label
                            className="form-label"
                            htmlFor="form3Example1c"
                          >
                            User Name
                          </label>
                            {usernameError &&
                                <p className="alert alert-danger">
                                    User name should be more than 2 and less than 50 symbols.
                                </p>                           
                            }
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-envelope fa-lg me-3 fa-fw" />
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="email"
                            id="form3Example3c"
                            className="form-control"
                            name="email"
                            onChange={changeHandler}
                            value={register.email}
                            onBlur={validateEmail}
                          />
                          <label
                            className="form-label"
                            htmlFor="form3Example3c"
                          >
                            Your Email
                          </label>
                          {emailError &&
                                <p className="alert alert-danger">
                                    Invalid email address.
                                </p>                           
                            }
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-lock fa-lg me-3 fa-fw" />
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="password"
                            id="form3Example4c"
                            className="form-control"
                            name="password"
                            onChange={changeHandler}
                            value={register.password}
                            onBlur={validatePassword}
                          />
                          <label
                            className="form-label"
                            htmlFor="form3Example4c"
                          >
                            Password
                          </label>
                            {passwordError &&
                                <p className="alert alert-danger">
                                    Password should be more than 5 and less than 50 symbols.
                                </p>
                            }
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-key fa-lg me-3 fa-fw" />
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="password"
                            id="form3Example4cd"
                            className="form-control"
                            name="repeatPassword"
                            onChange={changeHandler}
                            value={register.repeatPassword}
                            onBlur={validateConformePassword}
                          />
                          <label
                            className="form-label"
                            htmlFor="form3Example4cd"
                          >
                            Repeat your password
                          </label>
                            {conformPasswordError &&
                                <p className="alert alert-danger">
                                    Password conformation should be more than 5 and less than 50 symbols.
                                </p>
                            }
                        </div>
                      </div>
                      {/* <div className="form-check d-flex justify-content-center mb-5">
                    <input
                      className="form-check-input me-2"
                      type="checkbox"
                      defaultValue=""
                      id="form2Example3c"
                    />
                    <label className="form-check-label" htmlFor="form2Example3">
                      I agree all statements in{" "}
                      <a href="#!">Terms of service</a>
                    </label>
                  </div> */}
                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">                      
                        <button
                          type="submit"
                          className="btn btn-lg"
                          disabled={isValid}
                        >
                          Register
                        </button>
                      </div>
                    </form>
                  </div>
                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                      className="img-fluid"
                      alt="Sample image"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;

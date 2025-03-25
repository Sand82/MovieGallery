import style from "./Register.module.css";
import * as GlobalConstant from "../../constants/GlobalConstants.js";
import Error from "../UI/Error/Error.jsx";
import Input from "../UI/Input.jsx";
import { useContext } from "react";
import { useInput } from "../../hooks/useInput.js";
import { AuthContext } from "../../contexts/AuthContext.js";
import { hasLength, minLength, isEmail, isEqualToOtherValue } from "../../services/Validators.js";


const Register = () => {

	const {
    value: usernameValue,
    changeHandler: usernameChangeHandler,
    hasError: usernameHasError,
    inputBlurHandler: usernameInputBluerHandler,
    isEmpty: isUsernameFieldEmpty,    
  } = useInput("", (value) => hasLength(value, GlobalConstant.userNameMinLength, GlobalConstant.userNameMaxLength));
	
	const {
		value: emailValue,
		changeHandler: emailChangeHandler,
		hasError: emailHasError,
		inputBlurHandler: emailInputBluerHandler,
		isEmpty: isEmailFieldEmpty,    
	} = useInput("", (value) => isEmail(value));

	const {
		value: passwordValue,
		changeHandler: passwordChangeHandler,
		hasError: passwordError,
		inputBlurHandler: passwordInputBluerHandler, 
		isEmpty: isPasswordFieldEmpty,   
	} = useInput("", (value) => minLength(value, GlobalConstant.passwordLength));

	const {
		value: repeatPasswordValue,
		changeHandler: repeatPasswordChangeHandler,
		hasError: repeatPasswordError,
		inputBlurHandler: repeatPasswordInputBluerHandler, 
		isEmpty: isRepeatPasswordFieldEmpty,   
	} = useInput("", (value) => isEqualToOtherValue(value, passwordValue));

  const { userRegister, serverErrors } = useContext(AuthContext);

  const registerSubmitHandler = async (e) => {
      e.preventDefault();

    const registerCredentials = {
	    username: usernameValue,
	    email: emailValue,
	    password: passwordValue,
	    repeatPassword: repeatPasswordValue,
    };
    
    userRegister(registerCredentials);
  };  

  const isRegisterButtonDisaled = usernameHasError || emailHasError || passwordError || repeatPasswordError || 
  	isUsernameFieldEmpty || isEmailFieldEmpty || isPasswordFieldEmpty || isRepeatPasswordFieldEmpty || serverErrors;   

  return (
    <section className={`vh-100 ${style["register-container"]}`} style={style}>
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className={`card text-black ${style["register-card"]}`}>
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
                      <div>
                        <Error error={serverErrors}/>
                      </div>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-user fa-lg me-3 fa-fw" />
                        <div className="form-outline flex-fill mb-0">                          
                          <Input
                            label="Username"
                            type="text"
                            name="username"
                            className="w-100"                           
                            value={usernameValue}
                            onChange={usernameChangeHandler}
                            onBlur={usernameInputBluerHandler}
                            error={usernameHasError && `User name should be between ${GlobalConstant.userNameMinLength} and ${GlobalConstant.userNameMaxLength} symbols.`}
                        />
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-envelope fa-lg me-3 fa-fw" />
                        <div className="form-outline flex-fill mb-0">
                          <Input
                            label="Email address"
                            type="text"
                            name="email"
                            className="w-100"                           
                            value={emailValue}
                            onChange={emailChangeHandler}
                            onBlur={emailInputBluerHandler}
                            error={emailHasError && `Email should be valid email address.`}/>
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-lock fa-lg me-3 fa-fw" />
                        <div className="form-outline flex-fill mb-0">
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
                      </div>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-key fa-lg me-3 fa-fw" />
                        <div className="form-outline flex-fill mb-0">
                          <Input
                           label="Repeat password"
                           type="password"
                           name="repeatPassword"                                                                             
                           value={repeatPasswordValue}
                           onChange={repeatPasswordChangeHandler}
                           onBlur={repeatPasswordInputBluerHandler}
                           error={repeatPasswordError && `The password and password confirmation do not match.`}
                        />                
                        </div>
                      </div>                      
                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button
                          type="submit"
                          className="btn btn-warning text-light btn-lg"
                          disabled={isRegisterButtonDisaled}
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

import { useNavigate } from "react-router-dom";

import * as style from "./Register.Module.css";
import Input from "../UI/Input.jsx"
import { useInput } from "../../hooks/useInput.js"
import * as authService from '../../services/AuthServices.js';
import * as GlobalConstant from "../../constants/GlobalConstants.js"
import { hasLength, minLength, isEmail, isEqualToOtherValue } from "../../services/Validators.js"

const Register = () => {

  	const {
          value: usernameValue,
          changeHeandler: usernameChangeHeandler,
          hasError: usernameHasError,
          inputBlurHeandler: usernameInputBluerHeandler,
          isEmpty: isUsernameFieldEmpty,    
        } = useInput("", (value) => hasLength(value, GlobalConstant.userNameMinLength, GlobalConstant.userNameMaxLength));
	
	const {
		value: emailValue,
		changeHeandler: emailChangeHeandler,
		hasError: emailHasError,
		inputBlurHeandler: emailInputBluerHeandler,
		isEmpty: isEmailFieldEmpty,    
	  } = useInput("", (value) => isEmail(value));

	const {
			value: passwordValue,
			changeHeandler: passwordChangeHeandler,
			hasError: passwordError,
			inputBlurHeandler: passwordInputBluerHeandler, 
			isEmpty: isPasswordFieldEmpty,   
		} = useInput("", (value) => minLength(value, GlobalConstant.passwordLength));

	const {
		value: repeatPasswordValue,
		changeHeandler: repeatPasswordChangeHeandler,
		hasError: repeatPasswordError,
		inputBlurHeandler: repeatPasswordInputBluerHeandler, 
		isEmpty: isRepeatPasswordFieldEmpty,   
	  } = useInput("", (value) => isEqualToOtherValue(value, passwordValue));

  const navigate = useNavigate();

  const registerSubmitHandler = async (e) => {
    e.preventDefault();

    const registerCredential = {
		username: usernameValue,
		email: emailValue,
		password: passwordValue,
		repeatPassword: repeatPasswordValue,
	  };

    authService
      .register(registerCredential)
      .then((result) => {
        if (result === 'Bad response') {
          return navigate('/badrequest');
        }        
        return navigate('/login');
      })
      .catch((error) => {
        throw console.error(error);
      });
  };  

  const isRegisterButtonDisaled = usernameHasError || emailHasError || passwordError || repeatPasswordError || 
  	isUsernameFieldEmpty || isEmailFieldEmpty || isPasswordFieldEmpty || isRepeatPasswordFieldEmpty;   

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
                          <Input
                            label="Username"
                            type="text"
                            name="username"
							className="regester-input"                           
                            value={usernameValue}
                            onChange={usernameChangeHeandler}
                            onBlur={usernameInputBluerHeandler}
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
							className="regester-input"                           
                            value={emailValue}
                            onChange={emailChangeHeandler}
                            onBlur={emailInputBluerHeandler}
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
						   className="regester-input-password"                                                  
                           value={passwordValue}
                           onChange={passwordChangeHeandler}
                           onBlur={passwordInputBluerHeandler}
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
						   className="regester-input-password"                                                     
                           value={repeatPasswordValue}
                           onChange={repeatPasswordChangeHeandler}
                           onBlur={repeatPasswordInputBluerHeandler}
                           error={repeatPasswordError && `The password and password confirmation do not match.`}
                        />                
                        </div>
                      </div>                      
                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button
                          type="submit"
                          className="btn btn-lg"
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

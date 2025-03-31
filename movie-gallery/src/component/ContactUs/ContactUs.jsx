import emailjs from "emailjs-com";
import { Link } from "react-router-dom";
import { useContext, useState, useRef } from "react";

import * as GlobalConstant from "../../constants/GlobalConstants.js"
import { useInput } from "../../hooks/useInput.js"
import { AuthContext } from "../../contexts/AuthContext.js";
import { hasLength, isEmail } from "../../services/Validators.js"
import Input from "../../component/UI/Input/Input.jsx"
import ContactUsMap from "./ContactUsMap/ContactUsMap.jsx";
import ContactInformation from "./ContactInformation/ContactInformation.jsx";
import ContactUsHeader from "./ContactUsHeader/ContactUsHeader.jsx";

const ContactUs = () => {    

  const { user } = useContext(AuthContext); 

  const {
    value: usernameValue,
    changeHandler: usernameChangeHandler,
    hasError: usernameHasError,
    inputBlurHandler: usernameInputBluerHandler, 
    isEmpty: isUsernameFieldEmpty, 
    resetValue: usernameResetValue,  
  } = useInput(user ? user.username : "", (value) => hasLength(value, GlobalConstant.userNameMinLength, GlobalConstant.userNameMaxLength));
  
  const {
    value: emailValue,
    changeHandler: emailChangeHandler,
    hasError: emailHasError,
    inputBlurHandler: emailInputBluerHandler,
    isEmpty: isEmailFieldEmpty, 
    resetValue: emailResetValue,   
  } = useInput(user ? user.email : "", (value) => isEmail(value));

  const {
    value: subjectValue,
    changeHandler: subjectChangeHandler,
    hasError: subjectHasError,
    inputBlurHandler: subjectInputBluerHandler, 
    isEmpty: isSubjectFieldEmpty,
    resetValue: subjectResetValue,   
  } = useInput("", (value) => hasLength(value, GlobalConstant.subjectMinLength, GlobalConstant.subjectMaxLength));

  const {
    value: messageValue,
    changeHandler: messageChangeHandler,
    hasError: messageHasError,
    inputBlurHandler: messageInputBluerHandler, 
    isEmpty: isMessageFieldEmpty, 
    resetValue: messageResetValue,  
  } = useInput("", (value) => hasLength(value, GlobalConstant.textareaMinLength, GlobalConstant.textareaMaxLength));
      
  const form = useRef();
  const [data, setData] = useState(null); 

  const sendEmail = (e) => {
  e.preventDefault();
  
  emailjs
      .sendForm(
      'service_ufh83g4',
      'template_qgn844p',
      form.current,
      '97bvqzMYCmiGXN1wA'
      )
      .then((result) => {
        if (result.text == 'OK') {
        setData(true);
        usernameResetValue();
        emailResetValue();
        subjectResetValue();
        messageResetValue();          
        }
      },
      (error) => {
        console.log(error.text);
      }
    );       
  };
 
  const isValid = usernameHasError || isUsernameFieldEmpty ||
    emailHasError || isEmailFieldEmpty ||
    subjectHasError || isSubjectFieldEmpty ||
    messageHasError || isMessageFieldEmpty;    

  return (
    <>
      <ContactUsHeader />
      <section>
        <div className="gmap-with-map">
          <div className="gmap" />
          <ContactUsMap />
          <div className="container">
            <div className="row">
              <div className="col-lg-6 ml-lg-auto">
                <div className="gmap-form bg-white">
                  <h4 className="form-title text-uppercase">
                    Contact
                    <span className="text-theme">us</span>
                  </h4>
                  <p className="form-text">
                    We understand your requirement and provide quality works
                  </p>
                  <form ref={form} onSubmit={sendEmail}>
                    <div className="row form-grid">
                      <div className="col-sm-6 ">
                        <div className="input-view-flat input-group">
                            <Input
            		    	        label="Username"
            		    	        type="text"
            		    	        name="username"
							                className="form-control"
                              disabled={true}
            		    	        value={usernameValue}
            		    	        onChange={usernameChangeHandler}
            		    	        onBlur={usernameInputBluerHandler}
            		    	        error={usernameHasError && `User name should be between ${GlobalConstant.userNameMinLength} and ${GlobalConstant.userNameMaxLength} symbols.`}
            			    />                           
                        </div>                        
                      </div>
                      <div className="col-sm-6">
                        <div className="input-view-flat input-group">
                            <Input
                			        label="Email address"
                			        type="text"
                			        name="email"
							                className="form-control"
                              disabled={true}
                			        value={emailValue}
                			        onChange={emailChangeHandler}
                			        onBlur={emailInputBluerHandler}
                			        error={emailHasError && `Email should be valid email address.`}/> 
                            </div>                        
                      </div>
                      <div className="col-sm-12">
                        <div className="input-view-flat">                          
                            <Input
                			        label="Subject"
                			        type="text"
                			        name="subject"
							                className="form-control"
                			        value={subjectValue}
                			        onChange={subjectChangeHandler}
                			        onBlur={subjectInputBluerHandler}
                			        error={subjectHasError && `Subject should be between ${GlobalConstant.subjectMinLength} and ${GlobalConstant.subjectMaxLength} symbols.`}/> 
                        </div>                       
                      </div>
                      <div className="col-12">
                        <div className="input-view-flat">                          
                            <Input
                              label="Message"
                              type="textarea"
                              name="message"
						                  fieldType="textarea"
						                  rows={3} 
						                  className="form-control"                          
                              value={messageValue}
                              onChange={messageChangeHandler}
                              onBlur={messageInputBluerHandler}
                              error={messageHasError && `Message should be between ${GlobalConstant.textareaMinLength} and ${GlobalConstant.textareaMaxLength} symbols.`}
                            />   
                        </div>                        
                        {data == "OK" && (
                          <div className="input-view-flat input-group">
                            <p className="alert alert-success">
                              Successful send the message.
                            </p>
                          </div>
                        )}
                      </div>
                      <div className="col-12">
                        <button
                          disabled={isValid}
                          className="px-5 btn btn-theme"
                          type="submit"
                        >
                          Send
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ContactInformation />
      <Link className="scroll-top disabled" to="#">
        <i className="fas fa-angle-up" aria-hidden="true" />
      </Link>
    </>
  );
};

export default ContactUs;

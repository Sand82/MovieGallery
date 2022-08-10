import { Link } from "react-router-dom";
import emailjs from "emailjs-com";
import { useContext, useState, useRef } from "react";

import ContactInformation from "./ContactInformation/ContactInformation.js";
import ContactUsHeader from "./ContactUsHeader/ContactUsHeader.js";
import { AuthContext } from "../../contexts/AuthContext.js";
import * as movieValidator from "../../services/MovieValidator.js";
import * as userValidator from "../../services/UserValidator.js";
import ContactUsMap from "./ContactUsMap/ContactUsMap.js";

const ContactUs = () => {
  const { user } = useContext(AuthContext);
  const [sendMail, setSendMail] = useState({
    username: user.username,
    email: user.email,
    subject: "",
    message: "",
  });
  const [usernameError, setUsernameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [subjectError, setSubjectError] = useState(false);
  const [messegError, setMessegeError] = useState(false);
  const form = useRef();

  const changeHandler = (e) => {
    setSendMail((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };

  const sendEmail = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));

    console.log(data);

    emailjs
      .sendForm(
        "service_ufh83g4",
        "template_qgn844p",
        form.current,
        "97bvqzMYCmiGXN1wA"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );

    setSendMail({ subject: "", message: "" });
  };

  const validateUsername = (e) => {
    const userName = e.target.value;
    setUsernameError(userValidator.user(userName));
  };

  const validateEmail = (e) => {
    const currEmail = e.target.value;
    setEmailError(userValidator.emailAddress(currEmail));
  };

  const validateSubject = (e) => {
    const subject = e.target.value;
    setSubjectError(movieValidator.title(subject));
  };

  const validateMessage = (e) => {
    const message = e.target.value;
    setMessegeError(movieValidator.description(message));
  };

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
                      <div className="col-sm-6">
                        <div className="input-view-flat input-group">
                          <input
                            className="form-control"
                            name="username"
                            type="text"
                            placeholder="Username"
                            onChange={changeHandler}
                            value={sendMail.username}
                            onBlur={validateUsername}
                          />
                        </div>
                        {usernameError && (
                          <p className="alert alert-danger">
                            User name should be more than 2 and less than 50
                            symbols.
                          </p>
                        )}
                      </div>
                      <div className="col-sm-6">
                        <div className="input-view-flat input-group">
                          <input
                            className="form-control"
                            name="email"
                            type="email"
                            placeholder="Email"
                            onChange={changeHandler}
                            value={sendMail.email}
                            onBlur={validateEmail}
                          />
                        </div>
                        {emailError && (
                          <p className="alert alert-danger">
                            Invalid email address.
                          </p>
                        )}
                      </div>
                      <div className="col-sm-12">
                        <div className="input-view-flat input-group">
                          <input
                            className="form-control"
                            name="subject"
                            placeholder="Subject"
                            type="text"
                            value={sendMail.subject}
                            onChange={changeHandler}
                            onBlur={validateSubject}
                          />
                        </div>
                        {subjectError && (
                          <p className="alert alert-danger">
                            Subject should be more than 2 and less than 100
                            symbols.
                          </p>
                        )}
                      </div>
                      <div className="col-12">
                        <div className="input-view-flat input-group">
                          <textarea
                            className="form-control"
                            name="message"
                            placeholder="Message"
                            value={sendMail.message}
                            onChange={changeHandler}
                            onBlur={validateMessage}
                          />
                        </div>
                        {messegError && (
                          <p className="alert alert-danger">
                            Message should be more than 10 and less than 500
                            symbols.
                          </p>
                        )}
                      </div>
                      <div className="col-12">
                        <button className="px-5 btn btn-theme" type="submit">
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

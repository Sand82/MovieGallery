import { Link } from "react-router-dom";
import emailjs from "emailjs-com";
import { useContext, useState } from "react";

import ContactInformation from "./ContactInformation/ContactInformation.js";
import ContactUsHeader from "./ContactUsHeader/ContactUsHeader.js";
import { AuthContext } from "../../contexts/AuthContext.js";
import * as movieValidator from "../../services/MovieValidator.js";

const ContactUs = () => {
  const { user } = useContext(AuthContext);
  const [sendMail, setSendMail] = useState({
    subject: "",
    message: "",
  });
  const [subjectError, setSubjectError] = useState(false);
  const [messegError, setMessegeError] = useState(false);

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
    setSendMail({subject: '', message: ''});

    
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
          <div className="gmap" data-lat="-33.878897" data-lng="151.103737" />
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
                  <form onSubmit={sendEmail}>
                    <div className="row form-grid">
                      <div className="col-sm-6">
                        <div className="input-view-flat input-group">
                          <input
                            className="form-control"
                            name="username"
                            type="text"
                            placeholder="Username"
                            defaultValue={user.username}
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="input-view-flat input-group">
                          <input
                            className="form-control"
                            name="email"
                            type="email"
                            placeholder="Email"
                            defaultValue={user.email}
                          />
                        </div>                        
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

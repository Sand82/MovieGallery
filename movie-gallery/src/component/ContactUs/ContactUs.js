import { Link } from "react-router-dom";

import ContactInformation from "./ContactInformation/ContactInformation.js"
import ContactUsHeader from "./ContactUsHeader/ContactUsHeader.js";

const ContactUs = () => {
    
  return (
    <>
     <ContactUsHeader/>
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
                  <form>
                    <div className="row form-grid">
                      <div className="col-sm-6">
                        <div className="input-view-flat input-group">
                          <input
                            className="form-control"
                            name="username"
                            type="text"
                            placeholder="Name"
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
                          />
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="input-view-flat input-group">
                          <textarea
                            className="form-control"
                            name="message"
                            placeholder="Message"
                            defaultValue={""}
                          />
                        </div>
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
      <ContactInformation/>
      <Link className="scroll-top disabled" to="#">
        <i className="fas fa-angle-up" aria-hidden="true" />
      </Link>
    </>
  );
};

export default ContactUs;

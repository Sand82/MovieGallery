const ContactUs = () => {
  return (
    <>
      <section className="after-head d-flex section-text-white position-relative">
        <div
          className="d-background"
          data-image-src="http://via.placeholder.com/1920x1080"
          data-parallax="scroll"
        />
        <div className="d-background bg-black-80" />
        <div className="top-block top-inner container">
          <div className="top-block-content">
            <h1 className="section-title">Contact us</h1>
            <div className="page-breadcrumbs">
              <a className="content-link" href="#">
                Home
              </a>
              <span className="text-theme mx-2">
                <i className="fas fa-chevron-right" />
              </span>
              <span>Contact us</span>
            </div>
          </div>
        </div>
      </section>
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
                  <form autoComplete="off">
                    <div className="row form-grid">
                      <div className="col-sm-6">
                        <div className="input-view-flat input-group">
                          <input
                            className="form-control"
                            name="name"
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
      <section className="section-long">
        <div className="container">
          <div className="grid row">
            <div className="col-md-6">
              <h4 className="entity-title">Address</h4>
              <p className="entity-text">
                Sidestate NSW 4132, Sidney, Australia
                <br /> 2200-2214 S Washtenaw Ave, Chicago, USA
              </p>
            </div>
            <div className="col-md-6">
              <h4 className="entity-title">Phone</h4>
              <p className="entity-text">
                (+88) 018 4113 6251, (+43) 018 4111 7255
                <br />
                (+50) 118 4341 5251, (+08) 123 567 7255
              </p>
            </div>
            <div className="col-md-6">
              <h4 className="entity-title">Email</h4>
              <p className="entity-text">
                info@memico.net
                <br />
                service@memico.net
              </p>
            </div>
            <div className="col-md-6">
              <h4 className="entity-title">Fax</h4>
              <p className="entity-text">
                (+88) 018 4113 6251, (+43) 018 4111 7255
                <br />
                (+50) 118 4341 5251, (+08) 123 567 7255
              </p>
            </div>
          </div>
          <p className="text-muted mt-5">
            If you have any questions or suggestions, we are always happy to
            hear from you. Contact us convenient for you.
          </p>
        </div>
      </section>
      <a className="scroll-top disabled" href="#">
        <i className="fas fa-angle-up" aria-hidden="true" />
      </a>
    </>
  );
};

export default ContactUs;

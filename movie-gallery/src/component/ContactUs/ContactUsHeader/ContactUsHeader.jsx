import { Link } from "react-router-dom";

const ContactUsHeader = () => {
  return (
    <section className="after-head d-flex section-text-white position-relative">
      <div className="d-background" data-image-src="" data-parallax="scroll" />
      <div className="d-background bg-black-80" />
      <div className="top-block top-inner container">
        <div className="top-block-content">
          <h1 className="section-title">Contact us</h1>
          <div className="page-breadcrumbs">
            <Link className="content-link" to="/">
              Home
            </Link>
            <span className="text-theme mx-2">
              <i className="fas fa-chevron-right" />
            </span>
            <span>Contact us</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUsHeader;

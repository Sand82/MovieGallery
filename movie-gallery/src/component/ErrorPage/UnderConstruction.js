import { Link } from "react-router-dom";

const UnderConstruction = () => {

  return (
    <>
    <section className="after-head d-flex section-text-white position-relative">
        <div
          className="d-background"
          data-image-src=""
          data-parallax="scroll"
        />
        <div className="d-background bg-black-80" />
        <div className="top-block top-inner container">
          <div className="top-block-content">
            <h1 className="section-title">Under construction</h1>
            <div className="page-breadcrumbs">
              <Link className="content-link" to="/">
                Home
              </Link>
              <span className="text-theme mx-2">
                <i className="fas fa-chevron-right" />
              </span>
              <span>Under construction</span>
            </div>
          </div>
        </div>
      </section>
      <section className="section-long">
        <div className="container">
          <div className="status-entity">
            <div className="entity-icon">
              <i className="fas fa-cogs opacity-20" />
            </div>
            <h4 className="entity-title">Under construction</h4>
            <p className="entity-text">
              We are working hard to bring it to you
            </p>
            <div className="entity-actions">
              <Link className="btn btn-theme" to="/">
                Back To Homepage
              </Link>
            </div>
          </div>
        </div>
      </section>      
    </>
  );
};

export default UnderConstruction;

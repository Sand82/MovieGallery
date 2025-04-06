import { Link } from 'react-router-dom';

const BadRequest = () => {
  return (
    <>
      <section className="after-head d-flex section-text-white position-relative">
        <div
          className="d-background"
          data-image-src="https://uniblogbg.com/moqtaonlainkariera/wp-content/uploads/sites/38/2015/08/images.jpg"
          data-parallax="scroll"
        />
        <div className="d-background bg-black-80" />
        <div className="top-block top-inner container">
          <div className="top-block-content">
            <h1 className="section-title">Page not found</h1>
            <div className="page-breadcrumbs">
              <Link className="content-link" to="/">
                Home
              </Link>
              <span className="text-theme mx-2">
                <i className="fas fa-chevron-right" />
              </span>
              <span>Error</span>
            </div>
          </div>
        </div>
      </section>
      <section className="section-long">
        <div className="container">
          <div className="status-entity">
            <div className="entity-icon">
              4<span className="text-theme">0</span>0
            </div>
            <h4 className="entity-title">Sorry!</h4>
            <p className="entity-text">Bad Request</p>
            <div className="entity-actions">
              <Link className="btn btn-theme" to="/">
                Back Home
              </Link>
            </div>
          </div>
        </div>
      </section>      
    </>
  );
};

export default BadRequest;

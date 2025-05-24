import { Link } from "react-router-dom";

import { arrayToString } from "../../services/HelperService.js"

const Description = ({description, tags}) => { 
	
return (
  <div className="section-line">
    <div className="section-head">
      <h2 className="section-title text-uppercase">Description</h2>
    </div>
    <div className="section-description">
      <div dangerouslySetInnerHTML={{ __html: description }} />
    </div>
    <div className="section-bottom">
      <div className="row">
        <div className="mr-auto col-auto">
          <div className="entity-links">
            <div className="entity-list-title">Share:</div>
            <Link className="content-link entity-share-link" to="#">
            <i className="fab fa-facebook-f" />
            </Link>
            <Link className="content-link entity-share-link" to="#">
            <i className="fab fa-twitter" />
            </Link>
            <Link className="content-link entity-share-link" to="#">
            <i className="fab fa-google-plus-g" />
            </Link>
            <Link className="content-link entity-share-link" to="#">
            <i className="fab fa-pinterest-p" />
            </Link>
            <Link className="content-link entity-share-link" to="#">
            <i className="fab fa-instagram" />
            </Link>
          </div>
        </div>
        <div className="col-auto">
          <div className="entity-links">
            <div className="entity-list-title">Tags:</div>            
            {tags && tags.length > 0 ? arrayToString(tags) : "No createed tags for that movie."}            
          </div>
        </div>
      </div>
    </div>
  </div>
)};

export default Description;
import { useContext } from "react";
import { Link } from "react-router-dom";

import { FilterCotntext } from "../../../contexts/FiltersContext.js";

const ViewTag = ({tag}) => {

  const { tagHandler } = useContext(FilterCotntext);

  const tagClickHandler = () => {
    tagHandler(tag.id);
  }

  return (    
    <Link className="content-link" to="/movies" onClick={tagClickHandler}>
      {tag.name}
    </Link>      
  )
}

export default ViewTag;
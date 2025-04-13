import { Link } from "react-router-dom";

const DetailsLi = ({starring}) => {
  return (
    <>
      <li>
        <span className="entity-list-title">Release:</span>July 21, 2014 (Dolby
        Theatre), August 1, 2014 (United States)
      </li>
      <li>
        <span className="entity-list-title">Directed:</span>
        <Link className="content-link" to="#">
          Lindson Wardens
        </Link>
        ,
        <Link className="content-link" to="#">
          Anabelle One
        </Link>
      </li>
      <li>
        <span className="entity-list-title">Starring:</span>
        {starring}       
      </li>
      <li>
        <span className="entity-list-title">Production company:</span>
        <Link className="content-link" to="#">
          Re-Production Bro.
        </Link>
        ,
        <Link className="content-link" to="#">
          Pentakid
        </Link>
      </li>
      <li>
        <span className="entity-list-title">Country:</span>
        <Link className="content-link" to="#">
          USA
        </Link>
        ,
        <Link className="content-link" to="#">
          India
        </Link>
      </li>
      <li>
        <span className="entity-list-title">Language:</span>
        english
      </li>
    </>
  );
};

export default DetailsLi;

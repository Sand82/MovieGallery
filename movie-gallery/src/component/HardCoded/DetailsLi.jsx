import styles from "./DetailsLi.module.css"
import { Link } from "react-router-dom";

const DetailsLi = ({starring, directors, release}) => {
  return (
    <>
      <li className={styles["details-li"]}>
        <span className="entity-list-title">Release:</span> {release}
      </li>
      <li className={styles["details-li"]}>
        <span className="entity-list-title">Directed:</span>
        {directors}        
      </li>
      <li className={styles["details-li"]}>
        <span className="entity-list-title">Starring:</span>
        {starring + " and more..."}       
      </li>
      <li className={styles["details-li"]}>
        <span className="entity-list-title">Production company:</span>
        <Link className="content-link" to="#">
          Re-Production Bro.
        </Link>
        ,
        <Link className="content-link" to="#">
          Pentakid
        </Link>
      </li>
      <li className={styles["details-li"]}>
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

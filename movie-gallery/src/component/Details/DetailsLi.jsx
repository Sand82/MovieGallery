import styles from "./DetailsLi.module.css"

const DetailsLi = ({starring, directors, release, company, countries, languages}) => {
  return (
    <>
      <li>
        <span className="entity-list-title">Release:</span> 
        <span className={styles["details-li"]}>{release}</span>
      </li>
      <li className={styles["details-li"]}>
        <span className="entity-list-title">Directed:</span>
        <span className={styles["details-li"]}>{directors}</span>
      </li>
      <li className={styles["details-li"]}>
        <span className="entity-list-title">Starring:</span>
        <span className={styles["details-li"]}>{starring + " and more..."}</span>
      </li>
      <li className={styles["details-li"]}>
        <span className="entity-list-title">Production company:</span>
        <span className={styles["details-li"]}>{company}</span>
      </li>
      <li className={styles["details-li"]}>
        <span className="entity-list-title">Country:</span>
        <span className={styles["details-li"]}>{countries}</span>
      </li>
      <li>
        <span className="entity-list-title">Language:</span>
        <span className={styles["details-li"]}>{languages}</span>
      </li>
    </>
  );
};

export default DetailsLi;

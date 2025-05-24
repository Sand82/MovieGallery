import styles from "./Tag.module.css"

const Tag = ({value, tagRemoveHandler}) => {

  const removeHandler = () => {
    
    tagRemoveHandler(value);
  }

  return (
    <span className={styles["tag-container"]}>
       <span className={` ${styles["tag-value"]}`}>{value}</span>
      <span className={styles["tag-remove"]} onClick={removeHandler}><i class="fa-solid fa-trash"></i></span>
    </span>
  )
}

export default Tag;
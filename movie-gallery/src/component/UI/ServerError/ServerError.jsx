import styles from "./ServerError.module.css";

const ServerError = () => {
   
  return (
    <div className={`container ${styles["server-error"]}`}>            
      <div class="alert alert-danger alert-dismissible fade show" role="alert">
        Something went wrong. Try again latter.
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
    </div>
  )
}

export default ServerError;
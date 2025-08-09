import styles from "./ServerError.module.css";

const ServerError = () => {

  let serverErrorClass = "alert alert-success";

  if (isSuccess) {
    serverErrorClass = "alert alert-danger";
  }

  return (
    <div className={`container ${styles["server-error"]}`}>            
      <div class="alert alert-danger alert-dismissible fade show" role="alert">
        
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
    </div>
  )
}

export default ServerError;
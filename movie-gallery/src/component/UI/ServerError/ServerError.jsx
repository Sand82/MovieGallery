import styles from "./ServerError.module.css";

const ServerError = ({ message}) => {

  let serverErrorClass = "alert alert-success";

  if (message) {
    serverErrorClass = "alert alert-danger";
  }

  return (
    <div className={`container ${styles["server-error"]}`}>            
      <div className={serverErrorClass} role="alert">
        {message}
      </div>      
    </div>
  )
}

export default ServerError;
import style from "./Error.module.css"

const Error = ({error}) => {

  return (
    <>
      {error && <span className={style.error}>{error}</span>}    
    </>    
  )
}

export default Error;
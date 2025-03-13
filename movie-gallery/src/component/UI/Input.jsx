import style from "./Input.module.css"

const Input = ({ id, label, error, fieldType = "input", ...props }) => {
     
    return (
      <div className="input-container">   
       <label className="form-label input-label" htmlFor={id}>
          {label}
        </label>     
        { fieldType === "textarea" 
          ? (<textarea className="input-field" id={id} {...props}/>)
          : (<input className="input-field" id={id} {...props} />)
        }       
        {error && <span className={style.error}>{error}</span>}      
      </div>
    );
  };
  
  export default Input;
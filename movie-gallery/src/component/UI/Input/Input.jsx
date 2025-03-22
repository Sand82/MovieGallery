import style from "./Input.module.css"
import Error from "../Error/Error.jsx"

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
        <Error error={error}/>      
      </div>
    );
  };
  
  export default Input;
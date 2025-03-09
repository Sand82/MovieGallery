const Input = ({ id, label, error, fieldType = "input", ...props }) => {
  
    return (
      <>
        <label className="form-label" htmlFor={id}>
          {label}
        </label>
        { fieldType === "textarea" 
          ? (<textarea id={id} {...props}/>)
          : (<input id={id} {...props} />)
        }
        {error && <span className="field-error-message">{error}</span>}      
      </>
    );
  };
  
  export default Input;
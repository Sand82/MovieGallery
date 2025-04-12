import { useState } from "react";

import styels from "./DynamicInput.module.css"

const DynamicInput = ({sectionName}) => {

	const [inputFields, setInputFields] = useState([
    {name: ''}
	])

	const formChangeHandler = (e, index) => {
		let data = [...inputFields];
		data[index][e.target.name] = e.target.value;
		setInputFields(data);
	}	

	const addFieldsHandler = () => {
    let newfield = { name: ''}
		setInputFields([...inputFields, newfield])
	}	

	const removeFieldshandler = (index) => {
		let data = [...inputFields];
    data.splice(index, 1)
    setInputFields(data)
	}	

  return(
		<div className={styels["dynamic-container"]}>
			<h2 className={`container ${styels["dynamic-title"]}`}>{sectionName}</h2>
    	<div className="row">
			
			{inputFields.map((input, index) => {
          return (
            <div key={index} className="col-12 col-md-6 mb-4">
              <label className="form-label" htmlFor={"name"}>
      		      {"Name"}
   			      </label>
      	    <input className="form-control" name="name" value={input.name} onChange={(e) => formChangeHandler(e, index)}/>  
						<button type="button" className="btn btn-danger mt-2" onClick={() => removeFieldshandler(index)}>Remove</button>
    		    {/* <Error error={error}/>       */}
  		      </div>
          )
        })
			}
			</div>
			<button type="button" className="btn btn-secondary" onClick={addFieldsHandler}>Add More..</button>
	  </div>
  )
}

export default DynamicInput;
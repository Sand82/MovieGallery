import { useState } from "react";

import * as GlobalConstants from "../../../constants/GlobalConstants.js"
import styels from "./DynamicInput.module.css"
import Error from "../Error/Error.jsx"
import { hasLength } from "../../../services/Validators.js"

const DynamicInput = ({sectionName, inputData, onChange}) => {

	console.log(inputData)

	const [inputFields, setInputFields] = useState(inputData 
		? inputData.map(x => ({name: x.name, error: false, isFieldEdited: true, id: x.id})) 
		: [{name: '', error: false, isFieldEdited: false}
	])

	const formChangeHandler = (e, index) => {
		let data = [...inputFields];
		data[index][e.target.name] = e.target.value;
		setInputFields(data);
		onChange(data);
	}	

	const addFieldsHandler = () => {
    let newfield = { name: '' };
  	const updatedFields = [...inputFields, newfield];
  	setInputFields(updatedFields);
  	onChange(updatedFields);
	}	

	const removeFieldsHandler = (index) => {
		let data = [...inputFields];
    data.splice(index, 1);
    setInputFields(data);
		onChange(data);
	}	

	const errorHandler = (index) => {
		let data = [...inputFields];
  	let isValidInput = hasLength(
    	data[index].name,
    	GlobalConstants.titleMinLength,
    	GlobalConstants.titelMaxLength
  	);

  	data[index].error = !isValidInput;
  	data[index].isFieldEdited = true;

  	setInputFields(data);
  	onChange(data);
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
							<div className="container">
								<div className="row d-flex">
							  	<input className="col-8 form-control" name="name" onBlur={() => errorHandler(index)} value={input.name} onChange={(e) => formChangeHandler(e, index)}/>  
							  	<button type="button" className="btn btn-danger col-3 m-auto" onClick={() => removeFieldsHandler(index)}>Remove</button>
								</div> 
							</div>     	    
    		     {inputFields[index].error && <Error error={`Name shoud be between ${GlobalConstants.titleMinLength} and ${GlobalConstants.titelMaxLength} symbols.`}/> }
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
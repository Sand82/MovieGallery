import { useContext } from "react";

import { AuthContext } from "../../../contexts/AuthContext.js";
import MovieRating from "../../Rating/MovieRating.jsx";
import Input from "../../UI/Input.jsx"
import { useInput } from "../../../hooks/useInput.js"
import * as GlobalConstant from "../../../constants/GlobalConstants.js"
import { hasLength, isEmail } from "../../../services/Validators.js"
import { DetailContext } from "../../../contexts/DetailContext.js";

const CreateComment = ({ movieId }) => {

	const { user } = useContext(AuthContext);
	const { createCommentHandler } = useContext(DetailContext)

	const {
		value: usernameValue,
		changeHandler: usernameChangeHandler,		   
	} = useInput(user.username, (value) => hasLength(value, GlobalConstant.userNameMinLength, GlobalConstant.userNameMaxLength));

	const {
		value: emailValue,
		changeHandler: emailChangeHandler,
	} = useInput(user.email, (value) => isEmail(value));	
		
	const {
		value: commentValue,
		changeHandler: commentChangeHandler,
		hasError: commentHasError,
		inputBlurHandler: commentInputBluerHandler, 
		isEmpty: isCommentFieldEmpty,
		resetValue: commentResetValue,  
	} = useInput("", (value) => hasLength(value, GlobalConstant.textareaMinLength, GlobalConstant.textareaMaxLength));

  	const createHandler = (e) => {
    	e.preventDefault();

    	const currentCommentInfo = {
			comment: commentValue,
			username: usernameValue,
			email: emailValue,
			movieId		
		}

		createCommentHandler(currentCommentInfo);
		commentResetValue(); 	
	};  

  const isValid = commentHasError || isCommentFieldEmpty;

  return (
    <div className="section-line">
      <div className="section-head">
        <h2 className="section-title text-uppercase">Add comment</h2>
      </div>
      <form autoComplete="off" onSubmit={createHandler}>		  
        <div className="row form-grid">
          <div className="col-12 col-sm-6">
            <div className="input-view-flat input-group">
              <div className="col-12">		
                <Input
                  label="Username"
                  type="text"
                  name="username"
                  className="form-control"
                  value={usernameValue}
                  onChange={usernameChangeHandler}            		    	
                  disabled={true}            		    	
                /> 
              </div>	          
            </div>
          </div>
          <div className="col-12 col-sm-6">
            <div className="input-view-flat input-group"> 
              <div className="col-12">
                <Input
                  label="Email address"
                  type="text"
                  name="email"
                  className="form-control"                          
                  value={emailValue}
                  onChange={emailChangeHandler}                			
                  disabled={true}               			
                />                        
              </div>
            </div>			
          </div>
            <div className="col-12">
              <div className="input-view-flat input-group">             
                <div className="col-12">
                  <Input
                    label="Comment"
                    type="textarea"
                    name="comment"
                    fieldType="textarea"
                    rows={3} 
                    className="form-control"                          
                  	value={commentValue}
                  	onChange={commentChangeHandler}
                  	onBlur={commentInputBluerHandler}
                  	error={commentHasError && `Comment should be between ${GlobalConstant.textareaMinLength} and ${GlobalConstant.textareaMaxLength} symbols.`}
                  />
                </div>
              </div>
            </div>
            <MovieRating movieId={movieId} />
              <div className="col-12">
                <button
                  className="px-5 btn btn-theme"
                  type="submit"
                  disabled={isValid}
                >
              	  Send
            	  </button>
          	  </div>
        	  </div>
      	</form>
    </div>
  );
};

export default CreateComment;

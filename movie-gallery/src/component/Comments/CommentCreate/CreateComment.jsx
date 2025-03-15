import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../../contexts/AuthContext.js";
import * as commentService from "../../../services/CommentService.js";
import MovieRating from "../../Rating/MovieRaiting.jsx";
import Input from "../../UI/Input.jsx"
import { useInput } from "../../../hooks/useInput.js"
import * as GlobalConstant from "../../../constants/GlobalConstants.js"
import { hasLength, isEmail } from "../../../services/Validators.js"

const CreateComment = ({ movieId, commentHandler }) => {

	const { user } = useContext(AuthContext);

	const {
		value: usernameValue,
		changeHeandler: usernameChangeHeandler,		   
	} = useInput(user.username, (value) => hasLength(value, GlobalConstant.userNameMinLength, GlobalConstant.userNameMaxLength));

	const {
		value: emailValue,
		changeHeandler: emailChangeHeandler,
	} = useInput(user.email, (value) => isEmail(value));	
		
	const {
		value: commentValue,
		changeHeandler: commentChangeHeandler,
		hasError: commentHasError,
		inputBlurHeandler: commentInputBluerHeandler, 
		isEmpty: isCommentFieldEmpty,
		resetValue: commentResetValue,  
	} = useInput("", (value) => hasLength(value, GlobalConstant.textareaMinLength, GlobalConstant.textareaMaxLength));

  	const navigate = useNavigate();

  	const createCommentHandler = (e) => {
    	e.preventDefault();

    	const currComment = {
			comment: commentValue,
			username: usernameValue,
			email: emailValue,
			movieId
		}	

    	commentService
      		.create(currComment, user.accessToken)
      		.then((result) => {
      		  if (result === "Bad response") {
      		    return navigate("/notfound");
      		  }
      		  commentHandler(result);
				commentResetValue();        
      		})
      		.catch((error) => {
      		  throw console.error(error);
      		});
	};  

  	const isValid = commentHasError || isCommentFieldEmpty;

  	return (
    	<div className="section-line">
      		<div className="section-head">
        	<h2 className="section-title text-uppercase">Add comment</h2>
      	</div>
      	<form autoComplete="off" onSubmit={createCommentHandler}>
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
            		    	onChange={usernameChangeHeandler}            		    	
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
                			onChange={emailChangeHeandler}                			
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
                			onChange={commentChangeHeandler}
                			onBlur={commentInputBluerHeandler}
                			error={commentHasError && `comment should be between ${GlobalConstant.textareaMinLength} and ${GlobalConstant.textareaMaxLength} symbols.`}
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

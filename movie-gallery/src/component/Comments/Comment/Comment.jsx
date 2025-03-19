import { Link } from "react-router-dom";
import { useContext, useState } from "react";

import * as style from "./Comment.Module.css";
import { AuthContext } from "../../../contexts/AuthContext.js";
import { DetailContext } from "../../../contexts/DetailContext.js";
import * as helperService from "../../../services/HelperService.js";
import * as GlobalConstant from "../../../constants/GlobalConstants.js";
import { hasLength } from "../../../services/Validators.js";
import { useInput } from "../../../hooks/useInput.js";
import Input from "../../UI/Input.jsx";

const Comment = ({ comment }) => {

  const {
      value: commentValue,
      changeHeandler: commentChangeHeandler,
      hasError: commentHasError,
      inputBlurHeandler: commentInputBluerHeandler,       
  } = useInput(comment.comment, (value) => hasLength(value, GlobalConstant.textareaMinLength, GlobalConstant.textareaMaxLength));
  
  const { user } = useContext(AuthContext);
  const { editCommentHandler, daleteCommentHandler } = useContext(DetailContext)
  const [resetState, setResetState] = useState(false);  

  const editHandler = (e) => {
    e.preventDefault();
    
    editCommentHandler(commentValue, comment);
    setResetState(true);
  };  

  const daleteHandler = () => {
    daleteCommentHandler(comment.id);
  };

  const isValid = user.id === comment.userId;

  return (
    <div style={style} className="comment-entity">
      <div className="entity-inner">
        <form className="entity-content">
          <h4 className="entity-title">{comment.username}</h4>
          <p className="entity-subtext">
            {helperService.formatData(comment.creationData)}
          </p>
          {resetState ? (            
            <Input
                label="Comment"
                type="text"
                name="comment"    
		            className="form-control entity-text"                          
                value={commentValue}
                onChange={commentChangeHeandler}
                onBlur={commentInputBluerHeandler}
                error={commentHasError && `Comment should be between ${GlobalConstant.textareaMinLength} and ${GlobalConstant.textareaMaxLength} symbols.`}
              />   
          ) : (
            <p className="entity-text"> {comment.comment} </p>
          )}
        </form>
        {isValid && (
          <div className="comment-div">
            <Link className="comment-link" to="#" onClick={editHandler}>
              Edit
            </Link>
            <Link className="comment-link" to="#" onClick={daleteHandler}>
              Delete
            </Link>
          </div>
        )}        
      </div>
    </div>
  );
};

export default Comment;

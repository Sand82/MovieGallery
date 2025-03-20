import { Link } from "react-router-dom";
import { useContext, useState } from "react";

import { AuthContext } from "../../../contexts/AuthContext.js";
import { DetailContext } from "../../../contexts/DetailContext.js";
import * as helperService from "../../../services/HelperService.js";
import * as GlobalConstant from "../../../constants/GlobalConstants.js";
import { hasLength } from "../../../services/Validators.js";
import { useInput } from "../../../hooks/useInput.js";
import Input from "../../UI/Input.jsx";
import styles from './Comment.module.css';

const Comment = ({ comment }) => {
  const {
    value: commentValue,
    changeHandler: commentChangeHandler,
    inputBlurHandler: commentBlurHandler, 
    hasError: commentHasError,
  } = useInput(comment.comment, (value) =>
    hasLength(value, GlobalConstant.textareaMinLength, GlobalConstant.textareaMaxLength)
  );  

  const { user } = useContext(AuthContext);
  const { editCommentHandler, deleteCommentHandler } = useContext(DetailContext);
  const [isEditing, setIsEditing] = useState(false);   

  const handleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    editComment();
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();      
      editComment();
    }
  };

  const deleteHandler = () => {
    deleteCommentHandler(comment.id);
  };

  const editComment = () => {

    commentBlurHandler();
  
    if(hasLength(commentValue, GlobalConstant.textareaMinLength, GlobalConstant.textareaMaxLength) && comment.comment !== commentValue.trim()) {
      editCommentHandler(commentValue, comment);
      setIsEditing(false);
    }    
  };

  const isValidUser = user.id === comment.userId;

  return (
    <div className="comment-entity">
      <div className="entity-inner">
        <form className="entity-content">
          <h4 className="entity-title">{comment.username}</h4>
          <p className="entity-subtext">{helperService.formatData(comment.creationData)}</p>
          {isEditing ? (           
              <Input
                label=""
                type="text"
                name="comment"
                className="form-control entity-text"
                value={commentValue}
                onChange={commentChangeHandler}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                error={commentHasError ? `Comment should be between ${GlobalConstant.textareaMinLength} and ${GlobalConstant.textareaMaxLength} symbols.` : ""}
              />            
          ) : (
            <p className="entity-text">{comment.comment}</p>
          )}
        </form>
        {isValidUser && !isEditing && (
          <div className={styles["comment-div"]}>
            <Link className={styles["comment-link"]} to="#" onClick={handleClick}>
              Edit
            </Link>
            <Link className={styles["comment-link"]} to="#" onClick={deleteHandler}>
              Delete
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;

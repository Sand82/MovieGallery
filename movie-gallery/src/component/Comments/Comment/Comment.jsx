import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";

import * as style from "./Comment.Module.css";
import { AuthContext } from "../../../contexts/AuthContext.js";
import { DetailContext } from "../../../contexts/DetailContext.js";
import * as commentService from "../../../services/CommentService.js";
import * as helperService from "../../../services/HelperService.js";
import * as GlobalConstant from "../../../constants/GlobalConstants.js"
import { hasLength } from "../../../services/Validators.js"

const Comment = ({ comment, deleteCommentHandler }) => {
  
  const { user } = useContext(AuthContext);
  const { editCommentHandler } = useContext(DetailContext)
  const [resetState, setResetState] = useState(false);
  const [editComment, setEditComment] = useState(comment);
  const [commentError, setCommentError] = useState(false);
  const navigate = useNavigate();

  const restartState = (e) => {
    e.preventDefault();

    setResetState(true);
  };

  const changeHandler = (e) => {
    setEditComment((state) => state === e.target.value);
  };

  const validateComment = (e) => {
    const description = e.target.value;
    const isValidComment = !hasLength(description, GlobalConstant.textareaMinLength, GlobalConstant.textareaMaxLength);

    setCommentError(isValidComment);
    setResetState(false);

    if (!isValidComment) {
      editCurrentComment(description);
      comment.comment = description;
    }
  };

  const editCurrentComment = (editedComment) => {    
    editCommentHandler(editedComment, comment);
  };

  const daleteHandler = () => {
    commentService
      .remove(comment.id, user.accessToken)
      .then((result) => {
        if (result === "Bad response") {
          return navigate("/notfound");
        }
        deleteCommentHandler();
      })
      .catch((error) => {
        throw console.error(error);
      });
  };

  const isValid = user.id === comment.userId;

  return (
    <div style={style} className="comment-entity">
      <div className="entity-inner">
        <form className="entity-content" onSubmit={restartState}>
          <h4 className="entity-title">{comment.username}</h4>
          <p className="entity-subtext">
            {helperService.formatData(comment.creationData)}
          </p>
          {resetState ? (
            <input
              name="comment"
              className="form-control entity-text"
              onChange={changeHandler}
              defaultValue={comment.comment}
              onBlur={validateComment}
            />
          ) : (
            <p className="entity-text"> {comment.comment} </p>
          )}
        </form>
        {isValid && (
          <div className="comment-div">
            <Link className="comment-link" to="#" onClick={restartState}>
              Edit
            </Link>
            <Link className="comment-link" to="#" onClick={daleteHandler}>
              Delete
            </Link>
          </div>
        )}
        {commentError && (
          <p className="alert alert-danger">
            Comment should be more than {GlobalConstant.textareaMinLength} and less than {GlobalConstant.textareaMaxLength} symbols.
          </p>
        )}
      </div>
    </div>
  );
};

export default Comment;

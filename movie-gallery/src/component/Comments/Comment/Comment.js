import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";

import * as style from "./Comment.Module.css";
import { AuthContext } from "../../../contexts/AuthContext.js";
import * as movieValidator from "../../../services/MovieValidator.js";
import * as commentService from "../../../services/CommentService.js";
import * as helperService from "../../../services/HelperService.js"

const Comment = ({ comment, editCommentHandler, deleteCommentHandler }) => {
  const { user } = useContext(AuthContext);
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

    const isValidComment = movieValidator.description(description);
    setCommentError(isValidComment);
    setResetState(false);
    if (!isValidComment) {
      editCurrentComment(description);
      comment.comment = description;
    }
  };

  const editCurrentComment = (commentString) => {
    comment.comment = commentString;
    commentService
      .edit(comment, user.accessToken)
      .then((result) => {
        if (result === "Bad response") {
          return navigate("/notfound");
        }

        editCommentHandler(result);
      })
      .catch((error) => {
        throw console.error(error);
      });
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
          <p className="entity-subtext">{helperService.formatData(comment.creationData)}</p>
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
            Comment should be more than 10 and less than 500 symbols.
          </p>
        )}
      </div>
    </div>
  );
};

export default Comment;

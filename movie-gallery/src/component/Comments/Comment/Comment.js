import { Link } from "react-router-dom";
import { useContext, useState } from "react";

import * as style from "./Comment.Module.css";
import { AuthContext } from "../../../contexts/AuthContext.js";
import * as movieValidator from "../../../services/MovieValidator.js";
import * as commentService from "../../../services/CommentService.js"

const Comment = ({ comment, editCommentHandler }) => {
  const { user } = useContext(AuthContext);
  const [resetState, setResetState] = useState('');
  const [editComment, setEditComment] = useState(comment);
  const [commentError, setCommentError] = useState(false);

  console.log(comment);

  const restartState = (e) => {
    e.preventDefault();    
    setResetState(state => ({...state}));
  };

  const changeHandler = (e) => {
    setEditComment(state => state == e.target.value)
  };  

  const validateComment = (e) => {
    const description = e.target.value;
    setCommentError(movieValidator.description(description));

    if (!commentError) {
        editCurrentComment(description)
        setResetState('');
    }
  };

  const editCurrentComment= (coment) => {
    console.log(coment);

    commentService.edit(coment,user.AuthContext, coment.id)
    .then((result) => {
        console.log(result);
    })
}  

  const isValid = user.id === comment.userId;
  

  return (
    <div style={style} className="comment-entity">
      <div className="entity-inner">
        <form  className="entity-content">
          <h4 className="entity-title">{comment.username}</h4>
          <p className="entity-subtext">{comment.creationData}</p>
          {resetState ? (
            <input
              name="comment"
              type="text"
              className="form-control entity-text"
              onChange={changeHandler}
              value={editComment.comment}
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
            <Link className="comment-link" to="#">
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

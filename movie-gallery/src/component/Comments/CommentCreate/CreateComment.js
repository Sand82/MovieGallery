import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../../contexts/AuthContext.js";
import * as movieValidator from "../../../services/MovieValidator.js";
import * as commentService from "../../../services/CommentService.js"
import MovieRating from "../../Rating/MovieRaiting.js"

const CreateComment = ({movieId, commentHandler}) => {

  const { user } = useContext(AuthContext);
  const [comment, setComment] = useState('');
  const [commentError, setCommentError] = useState(false);
  const navigate = useNavigate();

  const createCommentHandler = (e) => {
    e.preventDefault();

    const currComment = Object.fromEntries(new FormData(e.target));
    currComment.movieId = movieId;
    
    commentService
      .create(currComment, user.accessToken)
      .then((result) => {
        
        if (result === "Bad response") {
          return navigate("/notfound");
        }      

        commentHandler(result);
        setComment('');       
      })
      .catch((error) => {
        throw console.error(error);
      });    
  };

  const changeHandler = (e) => {   
    setComment(state => state = e.target.value);
  };

  const validateComment = (e) => {
    const description = e.target.value;
    setCommentError(movieValidator.description(description));
  };

  const isValid = comment === '' || commentError;

  return (
    <div className="section-line">
      <div className="section-head">
        <h2 className="section-title text-uppercase">Add comment</h2>
      </div>
      <form autoComplete="off" onSubmit={createCommentHandler}>
        <div className="row form-grid">
          <div className="col-12 col-sm-6">
            <div className="input-view-flat input-group">
              <input
                className="form-control"
                name="username"
                type="text"
                placeholder="username"
                onChange={() =>({})}
                value={user.username}
              />
            </div>
          </div>
          <div className="col-12 col-sm-6">
            <div className="input-view-flat input-group">
              <input
                className="form-control"
                name="email"
                type="email"
                placeholder="Email"
                onChange={() =>({})}
                value={user.email}
              />
            </div>
          </div>
          <div className="col-12">
            <div className="input-view-flat input-group">
              <textarea
                className="form-control"
                name="comment"
                placeholder="Add your review"
                value={comment}
                onBlur={validateComment}
                onChange={changeHandler}
              />
            </div>
            {commentError && (
              <p className="alert alert-danger">
                Comment should be more than 10 and less than 500 symbols.
              </p>
            )}
          </div>
          <MovieRating  movieId={movieId}/>
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

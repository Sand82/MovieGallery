const Comment = ({comment}) => {
  return (
     <div className="comment-entity">
        <div className="entity-inner">
          <div className="entity-content">
            <h4 className="entity-title">{comment.username}</h4>
            <p className="entity-subtext">{comment.creationData}</p>
            <p className="entity-text">
              {comment.comment}
            </p>
          </div>         
      </div>  
      </div>     
  );
};

export default Comment;

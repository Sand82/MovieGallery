using MovieGalleryWebAPI.Data.Models;
using MovieGalleryWebAPI.Models.Comments;

namespace MovieGalleryWebAPI.Service.Comments
{
    public interface ICommentService
    {
        Task CreateComment(CommentCreateModel model, string userId);

        Task<CommentGetModel> FindComment(string content, int movieId);

        Task<bool> EditComment(CommentEditModel model, DateTime date);

        Task<bool> RemoveComment(int commentId, string userId);
    }
}

using AutoMapper;
using Microsoft.EntityFrameworkCore;

using MovieGalleryWebAPI.Data;
using MovieGalleryWebAPI.Data.Models;
using MovieGalleryWebAPI.Models.Comments;

namespace MovieGalleryWebAPI.Service.Comments
{
    public class CommentService : ICommentService
    {
        private readonly MovieGalleryDbContext data;
        private readonly IMapper mapper;

        public CommentService(MovieGalleryDbContext data, IMapper mapper)
        {
            this.data = data;
            this.mapper = mapper;            
        }
        public async Task CreateComment(CommentCreateModel model, string userId)
        {
            var comment = new Comment
            {
                Content = model.Comment,
                UserId = userId,
                MovieId = model.MovieId
            };

            var movie = await this.data.Movies.Where(m => m.Id == model.MovieId).FirstOrDefaultAsync();

            movie!.Comments!.Add(comment);

            await this.data.SaveChangesAsync();
        }

        public async Task<bool> EditComment(CommentEditModel model, DateTime date)
        {          

            var comment = await this.data.Comments
                .Where(c => c.Id == model.Id && c.MovieId == model.MovieId && c.IsDelete == false)
                .FirstOrDefaultAsync();

            if (comment == null)
            {
                return false;
            }

            comment.Content = model.Comment;
            comment.CreationData = date;

            await this.data.SaveChangesAsync();

            return true;

        }

        public async Task<CommentGetModel> FindComment(string content, int movieId)
        {
            var comment = await this.data.Comments
                .Include(c => c.User)
                .Where(m => m.Content == content && movieId == m.MovieId)
                .Select(m => new CommentGetModel
                {
                    Id = m.Id,
                    MovieId = m.MovieId,
                    Comment = m.Content,
                    Email = m.User.Email,
                    Username = m.User.UserName,
                    CreationData = m.CreationData
                })
                .FirstOrDefaultAsync();

            return comment;
        }

        public async Task<bool> RemoveComment(int commentId, string userId)
        {
            var comment = await this.data.Comments
                .Where(c => c.Id == commentId && c.UserId == userId)
                .FirstOrDefaultAsync();

            if (comment == null)
            {
                return false;
            }

            comment.IsDelete = true;

            await this.data.SaveChangesAsync();

            return true;
        }
    }
}

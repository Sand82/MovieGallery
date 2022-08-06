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
            this.mapper = mapper;
            this.data = data;
        }
        public async Task CreateComment(CommentCreateModel model, string userId)
        {
            var coment = new Comment
            {
                Content = model.Comment,
                UserId = userId,
                MovieId = model.MovieId
            };

            var movie = await this.data.Movies.Where(m => m.Id == model.MovieId).FirstOrDefaultAsync();

            movie.Comments.Add(coment);

            await this.data.SaveChangesAsync();

           
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
    }
}

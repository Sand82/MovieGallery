using MovieGalleryWebAPI.Data;
using MovieGalleryWebAPI.Data.Models;
using MovieGalleryWebAPI.Models.Movies;

using Microsoft.EntityFrameworkCore;
using MovieGalleryWebAPI.Models.Create;
using MovieGalleryWebAPI.Models.Edit;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MovieGalleryWebAPI.Data.Movies;

namespace MovieGalleryWebAPI.Service.Movies
{
    public class MoviesService : IMoviesService
    {
        private readonly MovieGalleryDbContext data;
        private readonly IMapper mapper;

        public MoviesService(MovieGalleryDbContext data, IMapper mapper)
        {
            this.data = data;
            this.mapper = mapper;
        }

        public async Task CreateMovie(MovieCreateModel model)
        {
            var movieModel = this.mapper.Map<Movie>(model);

            //var movie = new Movie
            //{
            //    Title = model.Title,
            //    Description = model.Description,
            //    Category = model.Category,
            //    ImageUrl = model.ImageUrl,
            //    Year = model.Year,
            //};

            await this.data.Movies.AddAsync(movieModel);

            await this.data.SaveChangesAsync();
        }        

        public async Task<MovieGetModel> GetLastMovie()
        {
            var movie = await this.data.Movies
                .OrderByDescending(m => m.Id)
                .Where(m => m.IsDelete == false)
                .Select(m => new MovieGetModel
                {
                    Id = m.Id,
                    Title= m.Title,
                    Description= m.Description,
                    Year= m.Year,
                    Category= m.Category,
                    ImageUrl= m.ImageUrl,
                    AvergeRating = m.Ratings.Average(m => m.Value).ToString("F1"),
                    Duration = m.Duration,
                })
                .FirstOrDefaultAsync();

            return movie;
        }

        public async Task<List<MoviesDataModel>> GetMovies()
        {
            var movies = await this.data.Movies
                .Include(m => m.Ratings)
                .Where(m => m.IsDelete == false)
                //.ProjectTo<MoviesDataModel>(this.mapper.ConfigurationProvider)
                .Select(m => new MoviesDataModel
                {
                    Id = m.Id,
                    Title = m.Title,
                    Description = m.Description,
                    ImageUrl = m.ImageUrl,
                    Category = m.Category,
                    Year = m.Year,
                    AvergeRating = m.Ratings.Average(m => m.Value).ToString("F1")
                })
                .ToListAsync();           

            return movies;
        }

        public async Task<MovieDataModel> GetOneMovie(int movieId)
        {
            var movie = await this.data.Movies
                .Include(m => m.Comments).ThenInclude(c => c.User)
                .Where(m => m.Id == movieId && m.IsDelete == false)
                .Select(m => new MovieDataModel
                {
                    Id = m.Id,
                    Title = m.Title,
                    Description = m.Description,
                    ImageUrl = m.ImageUrl,
                    Category = m.Category,
                    Year = m.Year,
                    Duration = m.Duration,
                    AvergeRating = m.Ratings.Average(m => m.Value).ToString("F1"),
                    Comments = m.Comments.Where(c => c.IsDelete == false)
                        .Select(c => new MovieCommentModel
                        {
                            Id = c.Id,
                            Comment = c.Content,
                            UserId = c.UserId,
                            MovieId = movieId,
                            Username = c.User.UserName,
                            CreationData = c.CreationData,
                            
                        })
                        .ToList()
                })
                .FirstOrDefaultAsync();

            return movie;
        }

        public async Task<bool> RemoveMovie(int movieId)
        {
            var movie = await this.data.Movies
                .Where(m => m.Id == movieId && m.IsDelete == false)
                .FirstOrDefaultAsync();

            if (movie == null)
            {
                return false;
            }

            await DeleteMovie(movie);

            return true;
        }

        public async Task<bool> EditMovei(MovieEditModel model)
        {
            var isEdited = true;

            var movie = await this.data
                .Movies
                .Where(m => m.Id == model.Id)                
                .FirstOrDefaultAsync();

            if (movie is null)
            {
                isEdited = false;
                return isEdited;
            }

            movie.Title = model.Title;
            movie.Description = model.Description;
            movie.ImageUrl = model.ImageUrl;
            movie.Category = model.Category;
            movie.Year = model.Year;

            await this.data.SaveChangesAsync();

            return isEdited;
        }

        public async Task<bool> ChackForDublicate(string title)
        {
            return await this.data.Movies.AnyAsync(m => m.Title == title);
        }

        private async Task DeleteMovie(Movie movie)
        {
            movie.IsDelete = true;

            await this.data.SaveChangesAsync();
        }        
    }
}

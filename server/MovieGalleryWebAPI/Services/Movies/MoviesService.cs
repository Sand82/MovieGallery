using MovieGalleryWebAPI.Data;
using MovieGalleryWebAPI.Data.Models;
using MovieGalleryWebAPI.Models.Movies;

using Microsoft.EntityFrameworkCore;
using MovieGalleryWebAPI.Models.Create;
using MovieGalleryWebAPI.Models.Edit;
using AutoMapper;
using MovieGalleryWebAPI.Service.Favorites;
using MovieGalleryWebAPI.Service.Ratings;

namespace MovieGalleryWebAPI.Service.Movies
{
    public class MoviesService : IMoviesService
    {
        private readonly MovieGalleryDbContext data;
        private readonly IFavoriteService favoriteService;   
        private readonly IRatingService ratingService;

        private readonly IMapper mapper;

        public MoviesService(
            MovieGalleryDbContext data, 
            IMapper mapper, 
            IFavoriteService favoriteService, 
            IRatingService ratingService)
        {
            this.data = data;
            this.mapper = mapper;
            this.favoriteService = favoriteService;
            this.ratingService = ratingService;
        }

        public async Task CreateMovie(MovieCreateModel model)
        {
            var movieModel = this.mapper.Map<Movie>(model);            

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
                    AverageRating = m.Ratings!.Average(m => m.Value).ToString("F1"),
                    Duration = m.Duration,
                })
                .FirstOrDefaultAsync();

            return movie!;
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
                    Duration = m.Duration,
                    AverageRating = m.Ratings!.Average(m => m.Value).ToString("F1")
                })
                .ToListAsync();            

            return movies;
        }

        public async Task<MovieDataModel> GetOneMovie(int movieId , string userId)
        {
            var movie = await this.data.Movies
                .Include(m => m.Comments!).ThenInclude(c => c.User)
                .Include(m => m.Favorites)
                .Include(m => m.Ratings)
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
                    AverageRating = m.Ratings!.Count == 0 ? "0.0" : m.Ratings!.Average(m => m.Value).ToString("F1"),                    
                    Comments = m.Comments!.Where(c => c.IsDelete == false)
                        .Select(c => new MovieCommentModel
                        {
                            Id = c.Id,
                            Comment = c.Content,
                            UserId = c.UserId,
                            MovieId = movieId,
                            Username = c.User!.UserName,
                            CreationData = c.CreationData,
                            
                        })
                        .ToList()
                })
                .FirstOrDefaultAsync();

            var favoriteMovieInfo = await favoriteService.FindFavorite(userId, movieId);
            movie!.IsFavorite = favoriteMovieInfo == null ? false : favoriteMovieInfo.IsFavorite;

            var personalRating = await ratingService.SearchPersonalRating(userId, movieId);
            movie.PersonalRating = personalRating;

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

        public async Task<bool> EditMovie(MovieEditModel model)
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
            movie.Duration = model.Duration;

            await this.data.SaveChangesAsync();

            return isEdited;
        }

        public async Task<bool> CheckForDuplicates(string title)
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

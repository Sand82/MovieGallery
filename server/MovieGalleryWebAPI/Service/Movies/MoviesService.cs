using Microsoft.EntityFrameworkCore;
using MovieGalleryWebAPI.Data;
using MovieGalleryWebAPI.Models.Movies;

namespace MovieGalleryWebAPI.Service.Movies
{
    public class MoviesService : IMoviesService
    {
        private readonly MovieGalleryDbContext data;

        public MoviesService(MovieGalleryDbContext data)
        {
            this.data = data;
        }

        public async Task<List<MovieDataModel>> GetMovies()
        {
            var movies = await this.data.Movies
                .Select(m => new MovieDataModel
                {
                    Id = m.Id,
                    Title = m.Title,
                    Description = m.Description,
                    ImageUrl = m.ImageUrl,
                })
                .ToListAsync();

            return movies;
        }

        public async Task<MovieDataModel> GetOneMovies(int movieId)
        {
            var movie = await this.data.Movies
                .Where(m => m.Id == movieId)
                .Select(m => new MovieDataModel
                {
                    Id = m.Id,
                    Title = m.Title,
                    Description = m.Description,
                    ImageUrl = m.ImageUrl,
                })
                .FirstOrDefaultAsync();

            return movie;
        }
    }
}

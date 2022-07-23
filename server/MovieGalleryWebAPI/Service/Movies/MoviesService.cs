using MovieGalleryWebAPI.Data;
using MovieGalleryWebAPI.Data.Models;
using MovieGalleryWebAPI.Models.Movies;

using Microsoft.EntityFrameworkCore;

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
                .Where(m => m.Id == movieId && m.IsDelete == false)
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

        private async Task DeleteMovie(Movie movie)
        {
            movie.IsDelete = true;

            await this.data.SaveChangesAsync();
        }
    }
}

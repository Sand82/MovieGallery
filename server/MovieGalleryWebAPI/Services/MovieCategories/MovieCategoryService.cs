using Microsoft.EntityFrameworkCore;

using MovieGalleryWebAPI.Data;
using MovieGalleryWebAPI.Data.Models;
using MovieGalleryWebAPI.Models.Category;

namespace MovieGalleryWebAPI.Services.MovieCategories
{
    public class MovieCategoryService : IMovieCategoryService
    {

        private readonly MovieGalleryDbContext data;

        public MovieCategoryService(MovieGalleryDbContext data)
        {
            this.data = data;
        }

        public async Task AddMovieCategories(ICollection<MovieCategoryModel> categories, Movie movie)
        {
            var movieCategories = new List<MovieCategory>();

            foreach (var category in categories)
            {
                var currCategory = await this.data.Categories.FirstOrDefaultAsync(c => c.Id == category.Id);

                movieCategories.Add(new MovieCategory { Category = currCategory, Movie = movie });
            }

            await this.data.MovieCategories.AddRangeAsync(movieCategories);
            await this.data.SaveChangesAsync();
        }

        public async Task EditMovieCategories(ICollection<MovieCategoryModel> categories, Movie movie)
        {
            if (movie.MovieCategories == null)
            {
                movie.MovieCategories = new List<MovieCategory>();
            }

            await RemoveMappings(movie.Id);

            foreach (var category in categories)
            {
                var currentCategory = await this.data.Countries!.FirstOrDefaultAsync(d => d.Id == category.Id);

                movie.MovieCategories!.Add(new MovieCategory
                {
                    MovieId = movie.Id,
                    CategoryId = currentCategory!.Id
                });
            }

            await this.data.SaveChangesAsync();
        }

        public async Task RemoveMappings(int movieId)
        {
            var mappings = await this.data.MovieCategories.Where(mc => mc.MovieId == movieId).ToListAsync();

            this.data.MovieCategories.RemoveRange(mappings);            
        }
    }
}

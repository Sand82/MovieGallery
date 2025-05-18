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
                var currCategory = await data.Categories.FirstOrDefaultAsync(c => c.Id == category.Id);

                movieCategories.Add(new MovieCategory { Category = currCategory, Movie = movie });
            }

            await data.MovieCategories.AddRangeAsync(movieCategories);
            await data.SaveChangesAsync();
        }

        public Task EditMovieCategories(ICollection<MovieCategoryModel> categories, Movie movie)
        {
            throw new NotImplementedException();
        }

        public Task RemoveMappings(int movieId)
        {
            throw new NotImplementedException();
        }
    }
}

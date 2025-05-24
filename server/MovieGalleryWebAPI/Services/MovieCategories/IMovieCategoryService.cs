using MovieGalleryWebAPI.Data.Models;
using MovieGalleryWebAPI.Models.Category;

namespace MovieGalleryWebAPI.Services.MovieCategories
{
    public interface IMovieCategoryService
    {
        public Task AddMovieCategories(ICollection<MovieCategoryModel> categories, Movie movie);

        public Task EditMovieCategories(ICollection<MovieCategoryModel> categories, Movie movie);

        public Task RemoveMappings(int movieId);
    }
}

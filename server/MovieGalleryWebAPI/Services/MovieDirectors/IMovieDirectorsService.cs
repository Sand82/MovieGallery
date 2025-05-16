using MovieGalleryWebAPI.Data.Models;
using MovieGalleryWebAPI.Models.Edit;

namespace MovieGalleryWebAPI.Services.MovieDirectors
{
    public interface IMovieDirectorsService
    {
        public Task AddMovieDirectors(ICollection<string> directors, Movie movie);

        public Task EditMovieDirectors(MovieEditModel model, Movie movie);

        public Task RemoveMovieDirectors(int movieId);
    }
}

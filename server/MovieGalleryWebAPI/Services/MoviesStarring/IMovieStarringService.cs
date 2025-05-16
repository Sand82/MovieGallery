using MovieGalleryWebAPI.Data.Models;
using MovieGalleryWebAPI.Models.Edit;

namespace MovieGalleryWebAPI.Services.MoviesStarring
{
    public interface IMovieStarringService
    {
        public Task AddMovieStarring(ICollection<string> starring, Movie movie);

        public Task EditMovieStarring(MovieEditModel model, Movie movie);

        public Task RemoveMovieStarring(int movieId);
    }
}

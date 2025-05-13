using MovieGalleryWebAPI.Data.Models;
using MovieGalleryWebAPI.Models.Edit;

namespace MovieGalleryWebAPI.Services.MoviesStarring
{
    public interface IMovieStarringService
    {
        public Task AddMappings(MovieEditModel model, Movie movie);

        public Task RemoveMappings(int movieId);
    }
}

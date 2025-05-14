using MovieGalleryWebAPI.Data.Models;
using MovieGalleryWebAPI.Models.Edit;

namespace MovieGalleryWebAPI.Services.MovieDirectors
{
    public interface IMovieDirectorsService
    {
        public Task AddMovieDirectors(ICollection<string> directors, Movie movie);

        public Task AddMappings(MovieEditModel model, Movie movie);

        public Task RemoveMappings(int movieId);
    }
}

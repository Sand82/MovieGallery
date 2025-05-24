using MovieGalleryWebAPI.Data.Models;

namespace MovieGalleryWebAPI.Services.MovieTags
{
    public interface IMovieTagService
    {
        public Task AddMovieTags(ICollection<string> tags, Movie movie);
    }
}

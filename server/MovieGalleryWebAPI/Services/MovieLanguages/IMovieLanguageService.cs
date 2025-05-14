using MovieGalleryWebAPI.Data.Models;
using MovieGalleryWebAPI.Models.Languages;

namespace MovieGalleryWebAPI.Services.MovieLanguages
{
    public interface IMovieLanguageService
    {
        public Task AddMovieLanguages(ICollection<MovieLanguagesModel> languages, Movie movie);
    }
}

using MovieGalleryWebAPI.Data.Models;
using MovieGalleryWebAPI.Models.Countries;

namespace MovieGalleryWebAPI.Services.MovieCountries
{
    public interface IMovieCountriesService
    {
        public Task AddMovieCountries(ICollection<MovieCountriesModel> countries, Movie movie);

        public Task RemoveMappings(int movieId);
    }
}

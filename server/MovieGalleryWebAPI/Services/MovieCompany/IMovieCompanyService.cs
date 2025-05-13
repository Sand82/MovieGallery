using MovieGalleryWebAPI.Data.Models;

namespace MovieGalleryWebAPI.Services.MovieCompany
{
    public interface IMovieCompanyService
    {
        public Task AddMovieCompany(string companyName, Movie movie);
    }
}

using MovieGalleryWebAPI.Data.Models;

namespace MovieGalleryWebAPI.Services.MovieCompany
{
    public interface ICompanyService
    {
        public Task<Company> AddMovieCompany(string companyName);

        public Task EditMovieCompany(string companyName, Movie movie);

        public Task RemoveMovieCompany(Company company, Movie movie);
    }
}

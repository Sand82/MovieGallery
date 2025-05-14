using MovieGalleryWebAPI.Data.Models;

namespace MovieGalleryWebAPI.Services.MovieCompany
{
    public interface ICompanyService
    {
        public Task<Company> AddMovieCompany(string companyName);
    }
}

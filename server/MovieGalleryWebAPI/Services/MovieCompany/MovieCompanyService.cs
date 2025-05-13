
using Microsoft.EntityFrameworkCore;
using MovieGalleryWebAPI.Data;
using MovieGalleryWebAPI.Data.Models;

namespace MovieGalleryWebAPI.Services.MovieCompany
{
    public class MovieCompanyService : IMovieCompanyService
    {
        private readonly MovieGalleryDbContext data;

        public MovieCompanyService(MovieGalleryDbContext data)
        {
            this.data = data;
        }

        public async Task AddMovieCompany(string companyName, Movie movie)
        {
            var company = await data.Companies.FirstOrDefaultAsync();

            if (company == null)
            {
                company = new Company { Name = companyName };

                data.Companies.Add(company);                
            }

            company!.Movies!.Add(movie);

            await data.SaveChangesAsync();            
        }
    }
}

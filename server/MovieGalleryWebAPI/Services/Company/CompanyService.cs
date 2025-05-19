using Microsoft.EntityFrameworkCore;

using MovieGalleryWebAPI.Data;
using MovieGalleryWebAPI.Data.Models;

using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace MovieGalleryWebAPI.Services.MovieCompany
{
    public class CompanyService : ICompanyService
    {
        private readonly MovieGalleryDbContext data;

        public CompanyService(MovieGalleryDbContext data)
        {
            this.data = data;
        }

        public async Task<Company> AddMovieCompany(string companyName)
        {
            var company = await data.Companies.FirstOrDefaultAsync(c => c.Name == companyName);

            if (company == null)
            {
                company = await CreateCompany(companyName);
            }

            return company;
        }

        public async Task<Company> EditMovieCompany(string companyName, Movie movie)
        {
            var company = await data.Companies.FirstOrDefaultAsync(c => c.Name == companyName);

            if (company == null)
            {
                company = await CreateCompany(companyName);
            }
            
            company.Movies = new HashSet<Movie>();            

            return company;
        }        

        private async Task<Company> CreateCompany(string companyName) 
        {
            var company = new Company { Name = companyName };
            await data.Companies.AddAsync(company);
            await data.SaveChangesAsync();

            return company;
        }
    }
}

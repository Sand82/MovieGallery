
using Microsoft.EntityFrameworkCore;
using MovieGalleryWebAPI.Data;
using MovieGalleryWebAPI.Data.Models;

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
            var company = await data.Companies .FirstOrDefaultAsync(c => c.Name == companyName);

            if (company == null)
            {
                company = new Company { Name = companyName };
                await data.Companies.AddAsync(company);
                await data.SaveChangesAsync();
            }

            return company;
        }
    }
}

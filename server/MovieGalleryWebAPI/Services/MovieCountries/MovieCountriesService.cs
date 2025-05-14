using Microsoft.EntityFrameworkCore;
using MovieGalleryWebAPI.Data;
using MovieGalleryWebAPI.Data.Models;
using MovieGalleryWebAPI.Models.Countries;

namespace MovieGalleryWebAPI.Services.MovieCountries
{
    public class MovieCountriesService : IMovieCountriesService
    {
        private readonly MovieGalleryDbContext data;

        public MovieCountriesService(MovieGalleryDbContext data)
        {
            this.data = data;
        }

        public async Task AddMovieCountries(ICollection<MovieCountriesModel> countries, Movie movie)
        {           
            var movieCountries = new List<MovieCountry>();

            foreach (var country in countries)
            {
                var currCountry = await data.Countries.FirstOrDefaultAsync(c => c.Id == country.Id);

                movieCountries.Add( new MovieCountry { Country = currCountry, Movie = movie } );
            }

            await data.MovieCountries.AddRangeAsync(movieCountries);
            await data.SaveChangesAsync();
        }

        public Task RemoveMappings(int movieId)
        {
            throw new NotImplementedException();
        }
    }
}

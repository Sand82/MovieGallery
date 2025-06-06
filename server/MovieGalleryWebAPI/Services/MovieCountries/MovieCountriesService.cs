﻿using Microsoft.EntityFrameworkCore;

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
                var currCountry = await this.data.Countries.FirstOrDefaultAsync(c => c.Id == country.Id);

                movieCountries.Add( new MovieCountry { Country = currCountry, Movie = movie } );
            }

            await this.data.MovieCountries.AddRangeAsync(movieCountries);
            await this.data.SaveChangesAsync();
        }

        public async Task EditMovieCountries(ICollection<MovieCountriesModel> countries, Movie movie)
        {
            if (movie.MovieCountries == null)
            {
                movie.MovieCountries = new List<MovieCountry>();
            }

            await RemoveMappings(movie.Id);

            foreach (var country in countries)
            {
                var currentCountry = await this.data.Countries!.FirstOrDefaultAsync(d => d.Id == country.Id);

                movie.MovieCountries!.Add(new MovieCountry
                {
                    MovieId = movie.Id,
                    CountryId = currentCountry!.Id
                });
            }

            await this.data.SaveChangesAsync();
        }

        public async Task RemoveMappings(int movieId)
        {
            var mappings = await this.data.MovieCountries.Where(mc => mc.MovieId == movieId).ToListAsync();

            this.data.MovieCountries.RemoveRange(mappings);            
        }        
    }
}

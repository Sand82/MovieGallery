using Microsoft.EntityFrameworkCore;

using MovieGalleryWebAPI.Data;
using MovieGalleryWebAPI.Data.Models;
using MovieGalleryWebAPI.Models.Languages;

namespace MovieGalleryWebAPI.Services.MovieLanguages
{
    public class MovieLanguageService : IMovieLanguageService
    {
        private readonly MovieGalleryDbContext data;

        public MovieLanguageService(MovieGalleryDbContext data)
        {
            this.data = data;
        }

        public async Task AddMovieLanguages(ICollection<MovieLanguagesModel> languages, Movie movie)
        {
            var movieLanguages = new List<MovieLanguage>();

            foreach (var language in languages)
            {
                var currLanguage = await this.data.Languages.FirstOrDefaultAsync(l => l.Id == language.Id);

                movieLanguages.Add(new MovieLanguage { Language = currLanguage, Movie = movie });
            }

            await this.data.AddRangeAsync(movieLanguages);
            await this.data.SaveChangesAsync();
        }

        public async Task EditMovieLanguages(ICollection<MovieLanguagesModel> languages, Movie movie)
        {
            if (movie.MovieLanguages == null)
            {
                movie.MovieLanguages = new List<MovieLanguage>();
            }

            await RemoveMappings(movie.Id);

            foreach (var language in languages)
            {
                var currentLanguage = await this.data.Languages!.FirstOrDefaultAsync(d => d.Id == language.Id);

                movie.MovieLanguages!.Add(new MovieLanguage
                {
                    MovieId = movie.Id,
                    LanguageId = currentLanguage!.Id
                });
            }

            await this.data.SaveChangesAsync();
        }

        public async Task RemoveMappings(int movieId)
        {
            var mappings = await this.data.MovieLanguages.Where(ml => ml.MovieId == movieId).ToListAsync();

            this.data.MovieLanguages.RemoveRange(mappings);            
        }
    }
}

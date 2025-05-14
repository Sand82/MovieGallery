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
                var currLanguage = await data.Languages.FirstOrDefaultAsync(l => l.Id == language.Id);

                movieLanguages.Add(new MovieLanguage { Language = currLanguage, Movie = movie });
            }

            await data.AddRangeAsync(movieLanguages);
            await data.SaveChangesAsync();
        }
    }
}

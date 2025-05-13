using Microsoft.EntityFrameworkCore;
using MovieGalleryWebAPI.Data;
using MovieGalleryWebAPI.Data.Models;
using MovieGalleryWebAPI.Models.Edit;

namespace MovieGalleryWebAPI.Services.MoviesStarring
{
    public class MovieStarringService : IMovieStarringService
    {
        private readonly MovieGalleryDbContext data;

        public MovieStarringService(MovieGalleryDbContext data)
        {
            this.data = data;
        }

        public async Task AddMappings(MovieEditModel model, Movie movie)
        {
            await RemoveMappings(movie.Id);

            foreach (var starring in model.Starring!)
            {
                Starring? currentStarring;

                if (starring.Id == -1)
                {
                    currentStarring = new Starring { Name = starring.Name };
                    this.data.Starring.Add(currentStarring);
                }
                else
                {
                    currentStarring = await this.data.Starring.FirstOrDefaultAsync(s => s.Id == starring.Id);

                    if (currentStarring!.Name != starring.Name)
                    {
                        currentStarring.Name = starring.Name;
                    }
                }

                movie.MovieStarrings!.Add(new MovieStarring
                {
                    Movie = movie,
                    Starring = currentStarring
                });
            }
        }

        public async Task RemoveMappings(int movieId)
        {
            var mappings = await data.MovieStarrings.Where(m => m.MovieId == movieId).ToListAsync();
            data.MovieStarrings.RemoveRange(mappings);
        }
    }
}

using Microsoft.EntityFrameworkCore;
using MovieGalleryWebAPI.Data;
using MovieGalleryWebAPI.Data.Models;
using MovieGalleryWebAPI.Models.Edit;

namespace MovieGalleryWebAPI.Services.MovieDirectors
{
    public class MovieDirectorsService : IMovieDirectorsService
    {
        private readonly MovieGalleryDbContext data;

        public MovieDirectorsService(MovieGalleryDbContext data)
        {
            this.data = data;
        }

        public async Task AddMappings(MovieEditModel model, Movie movie)
        {
            await RemoveMappings(movie.Id);

            foreach (var director in model.Directors!)
            {
                Director? currentDirector;

                if (director.Id == -1)
                {
                    currentDirector = new Director { Name = director.Name };
                    this.data.Directors.Add(currentDirector);
                }
                else
                {
                    currentDirector = await this.data.Directors!.FirstOrDefaultAsync(d => d.Id == director.Id);

                    if (currentDirector!.Name != director.Name)
                    {
                        currentDirector.Name = director.Name;
                    }
                }

                movie.MovieDirectors!.Add(new MovieDirector
                {
                    Movie = movie,
                    Director = currentDirector
                });
            }
        }

        public async Task RemoveMappings(int movieId)
        {
            var mappings = await data.MovieDirectors.Where(m => m.MovieId == movieId).ToListAsync();

            data.MovieDirectors.RemoveRange(mappings);
        }
    }
}

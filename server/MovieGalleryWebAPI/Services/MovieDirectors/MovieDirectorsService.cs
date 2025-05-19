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

        public async Task AddMovieDirectors(ICollection<string> directors, Movie movie)
        {
            var movieDirectors = new List<MovieDirector>();

            foreach (var director in directors)
            {
                var currDirector = await data.Directors.FirstOrDefaultAsync(d => d.Name == director);

                if (currDirector == null)
                {
                    currDirector = new Director { Name = director };

                    await data.Directors.AddAsync(currDirector);                    
                    await data.SaveChangesAsync();
                }

                movieDirectors.Add(new MovieDirector { Director = currDirector, Movie = movie });
            }

            await data.MovieDirectors.AddRangeAsync(movieDirectors);
            await data.SaveChangesAsync();
        }

        public async Task EditMovieDirectors(MovieEditModel model, Movie movie)
        {            
            if (movie.MovieDirectors == null)
            {
                movie.MovieDirectors = new List<MovieDirector>();
            }
            
            await RemoveMovieDirectors(movie.Id);

            foreach (var director in model.Directors!)
            {
                Director? currentDirector;

                if (director.Id == -1)
                {
                    currentDirector = new Director { Name = director.Name };
                    this.data.Directors.Add(currentDirector);
                    await data.SaveChangesAsync();
                }
                else
                {
                    currentDirector = await this.data.Directors
                        .FirstOrDefaultAsync(d => d.Id == director.Id);

                    if (currentDirector == null)
                        continue;

                    if (currentDirector.Name != director.Name)
                    {
                        currentDirector.Name = director.Name;
                        this.data.Directors.Update(currentDirector);
                    }
                }

                movie.MovieDirectors.Add( new MovieDirector
                {
                    MovieId = movie.Id,
                    DirectorId = currentDirector.Id
                });                
            }

            await data.SaveChangesAsync();
        }

        public async Task RemoveMovieDirectors(int movieId)
        {
            var mappings = await data.MovieDirectors.Where(m => m.MovieId == movieId).ToListAsync();

            data.MovieDirectors.RemoveRange(mappings);            
        }
    }
}

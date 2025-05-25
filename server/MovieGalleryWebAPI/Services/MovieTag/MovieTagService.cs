using Microsoft.EntityFrameworkCore;
using MovieGalleryWebAPI.Data;
using MovieGalleryWebAPI.Data.Models;

namespace MovieGalleryWebAPI.Services.MovieTags
{
    public class MovieTagService : IMovieTagService
    {
        private readonly MovieGalleryDbContext data;

        public MovieTagService(MovieGalleryDbContext data)
        {
            this.data = data;
        }

        public async Task AddMovieTags(ICollection<string> tags, Movie movie)
        {
            var movieTags = new List<MovieTag>();

            foreach (var tag in tags)
            {
                var currTags = await this.data.Tags.FirstOrDefaultAsync(d => d.Name == tag);

                if (currTags == null)
                {
                    currTags = new Tag { Name = tag };

                    await this.data.Tags.AddAsync(currTags);
                    await this.data.SaveChangesAsync();
                }

                movieTags.Add(new MovieTag { Tag = currTags, Movie = movie });
            }

            await this.data.MovieTags.AddRangeAsync(movieTags);
            await this.data.SaveChangesAsync();
        }

        public async Task EditMovieTags(ICollection<string> tags, Movie movie)
        {
            if (movie.MovieTags == null)
            {
                movie.MovieTags = new List<MovieTag>();
            }
            
            await RemoveMovieTags(movie.Id);

            var currentMovieTags = new List<MovieTag>();

            foreach (var tag in tags!)
            {
                var currentTag = await this.data.Tags.FirstOrDefaultAsync(t => t.Name == tag);

                if (currentTag == null)
                {
                    currentTag = new Tag { Name = tag };
                    await this.data.Tags.AddAsync(currentTag);
                    await this.data.SaveChangesAsync();
                }

                currentMovieTags.Add(new MovieTag
                {
                    Movie = movie,
                    TagId = currentTag.Id
                });
            }

            await this.data.MovieTags.AddRangeAsync(currentMovieTags);
            await this.data.SaveChangesAsync();
        }

        public async Task RemoveMovieTags(int movieId)
        {
            var mappings = await this.data.MovieTags.Where(m => m.MovieId == movieId).ToListAsync();
            this.data.MovieTags.RemoveRange(mappings);

            await this.data.SaveChangesAsync();                                                                                                                  
        }
    }
}

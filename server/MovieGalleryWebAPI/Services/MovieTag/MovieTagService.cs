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
    }
}

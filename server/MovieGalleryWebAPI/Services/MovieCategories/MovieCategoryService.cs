using Microsoft.EntityFrameworkCore;

using MovieGalleryWebAPI.Data;
using MovieGalleryWebAPI.Data.Models;
using MovieGalleryWebAPI.Models.Category;

namespace MovieGalleryWebAPI.Services.MovieCategories
{
    public class MovieCategoryService : IMovieCategoryService
    {

        private readonly MovieGalleryDbContext data;

        public MovieCategoryService(MovieGalleryDbContext data)
        {
            this.data = data;
        }

        public async Task AddMovieCategories(ICollection<MovieCategoryModel> categories, Movie movie)
        {
            foreach (var category in categories)
            {
                var existingCategory = await this.data.Categories
                    .FirstOrDefaultAsync(c => c.Name == category.Name);

                if (existingCategory == null)
                {
                    existingCategory = new Category
                    {
                        Name = category.Name
                    };

                    await this.data.Categories.AddAsync(existingCategory);                    
                    await this.data.SaveChangesAsync();
                }

                movie.MovieCategories.Add(new MovieCategory
                {
                    Movie = movie,                    
                    Category = existingCategory,                    
                });
            }

            await this.data.SaveChangesAsync();
        }

        public async Task EditMovieCategories(ICollection<MovieCategoryModel> categories, Movie movie)
        {
            if (movie.MovieCategories == null)
            {
                movie.MovieCategories = new List<MovieCategory>();
            }

            await RemoveMappings(movie.Id);

            foreach (var category in categories)
            {
                var currentCategory = await this.data.Countries!.FirstOrDefaultAsync(d => d.Id == category.Id);

                movie.MovieCategories!.Add(new MovieCategory
                {
                    MovieId = movie.Id,
                    CategoryId = currentCategory!.Id
                });
            }

            await this.data.SaveChangesAsync();
        }

        public async Task RemoveMappings(int movieId)
        {
            var mappings = await this.data.MovieCategories.Where(mc => mc.MovieId == movieId).ToListAsync();

            this.data.MovieCategories.RemoveRange(mappings);            
        }        
    }
}

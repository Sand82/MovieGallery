using MovieGalleryWebAPI.Data;
using MovieGalleryWebAPI.Data.Models;
using MovieGalleryWebAPI.Models.Movies;

using Microsoft.EntityFrameworkCore;
using MovieGalleryWebAPI.Models.Create;
using MovieGalleryWebAPI.Models.Edit;
using AutoMapper;
using AutoMapper.QueryableExtensions;

namespace MovieGalleryWebAPI.Service.Movies
{
    public class MoviesService : IMoviesService
    {
        private readonly MovieGalleryDbContext data;
        private readonly IMapper mapper;

        public MoviesService(MovieGalleryDbContext data, IMapper mapper)
        {
            this.data = data;
            this.mapper = mapper;
        }

        public async Task CreateMovie(MovieCreateModel model)
        {
            var movieModel = this.mapper.Map<Movie>(model);

            //var movie = new Movie
            //{
            //    Title = model.Title,
            //    Description = model.Description,
            //    Category = model.Category,
            //    ImageUrl = model.ImageUrl,
            //    Year = model.Year,
            //};

            await this.data.Movies.AddAsync(movieModel);

            await this.data.SaveChangesAsync();
        }        

        public async Task<MovieGetModel> GetLastMovie()
        {
            var movie = await this.data.Movies
                .OrderByDescending(m => m.Id)
                .Select(m => new MovieGetModel
                {
                    Id = m.Id,
                    Title= m.Title,
                    Description= m.Description,
                    Year= m.Year,
                    Category= m.Category,
                    ImageUrl= m.ImageUrl,
                })
                .FirstOrDefaultAsync();

            return movie;
        }

        public async Task<List<MovieDataModel>> GetMovies()
        {
            var movies = await this.data.Movies                
                .ProjectTo<MovieDataModel>(this.mapper.ConfigurationProvider)
                //.Select(m => new MovieDataModel
                //{
                //    Id = m.Id,
                //    Title = m.Title,
                //    Description = m.Description,
                //    ImageUrl = m.ImageUrl,
                //    Category = m.Category,
                //    Year = m.Year,
                //})
                .ToListAsync();           

            return movies;
        }

        public async Task<MovieDataModel> GetOneMovies(int movieId)
        {
            var movie = await this.data.Movies
                .Where(m => m.Id == movieId && m.IsDelete == false)
                .ProjectTo<MovieDataModel>(this.mapper.ConfigurationProvider)
                //.Select(m => new MovieDataModel
                //{
                //    Id = m.Id,
                //    Title = m.Title,
                //    Description = m.Description,
                //    ImageUrl = m.ImageUrl,
                //    Category = m.Category,
                //    Year= m.Year,
                //})
                .FirstOrDefaultAsync();

            return movie;
        }

        public async Task<bool> RemoveMovie(int movieId)
        {
            var movie = await this.data.Movies
                .Where(m => m.Id == movieId && m.IsDelete == false)
                .FirstOrDefaultAsync();

            if (movie == null)
            {
                return false;
            }

            await DeleteMovie(movie);

            return true;
        }

        public async Task<bool> EditMovei(MovieEditModel model)
        {
            var isEdited = true;

            var movie = await this.data
                .Movies
                .Where(m => m.Id == model.Id)                
                .FirstOrDefaultAsync();

            if (movie is null)
            {
                isEdited = false;
                return isEdited;
            }

            movie.Title = model.Title;
            movie.Description = model.Description;
            movie.ImageUrl = model.ImageUrl;
            movie.Category = model.Category;
            movie.Year = model.Year;

            await this.data.SaveChangesAsync();

            return isEdited;
        }

        private async Task DeleteMovie(Movie movie)
        {
            movie.IsDelete = true;

            await this.data.SaveChangesAsync();
        }
    }
}

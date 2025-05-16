using AutoMapper;
using Microsoft.EntityFrameworkCore;

using MovieGalleryWebAPI.Data;
using MovieGalleryWebAPI.Data.Models;
using MovieGalleryWebAPI.Models.Favorites;

namespace MovieGalleryWebAPI.Service.Favorites
{
    public class FavoriteController : IFavoriteService
    {
        private readonly MovieGalleryDbContext data;
        private readonly IMapper mapper;

        public FavoriteController(MovieGalleryDbContext data, IMapper mapper)
        {
            this.data = data;
            this.mapper = mapper;
        }

        public async Task<bool> GetFavorite(string userId, int movieId)
        {
            
            var favorite = await FindFavorite(userId, movieId);

            if (favorite == null || !favorite.IsFavorite )
            {
               return false;
            }

            return true;
        }

        public async Task<ICollection<FavoriteMovieModel>> GetFavoriteMovies(string userId)
        {
            var movies = await this.data.Movies
                .Include(m => m.Favorites)
                .Where(m => m.Favorites.Any(f => f.IsFavorite == true && userId == f.UserId))
                .Select(m => new FavoriteMovieModel
                {
                    Id = m.Id,
                    Description = m.Description,
                    Title = m.Title,
                    ImageUrl = m.ImageUrl,
                    //Category = m.Category,
                    Duration = m.Duration,
                    Year = m.Year
                })
                .ToListAsync();

            return movies;
        }

        public async Task<bool> SetFavorite(FavoriteDataModel model)
        {
            Favorite? favorite = await FindFavorite(model.UserId, model.MovieId);                

            if (favorite == null)
            {
                favorite = new Favorite
                {
                    MovieId = model.MovieId,
                    UserId = model.UserId,
                    IsFavorite = model.IsFavorite,
                };

                await this.data.Favorites.AddAsync(favorite);
            }
            else 
            {
                favorite.IsFavorite = model.IsFavorite;
            }

            await this.data.SaveChangesAsync();

            return favorite.IsFavorite;
        }

        public async Task<Favorite> FindFavorite(string userId, int movieId)
        {
            var favorite = await this.data.Favorites
                .Where(f => f.MovieId == movieId && f.UserId == userId)
                .FirstOrDefaultAsync();

            return favorite;
        }
    }
}

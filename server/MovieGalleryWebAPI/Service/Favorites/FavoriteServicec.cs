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
            
            var favorite = await Findfavorite(userId, movieId);

            if (favorite == null || !favorite.IsFavorite )
            {
               return false;
            }

            return true;
        }

        public async Task<bool> SetFavorite(FavoriteDataModel model)
        {
            Favorite? favorite = await Findfavorite(model.UserId, model.MovieId);                

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

        private async Task<Favorite> Findfavorite(string userId, int movieId)
        {
            var favorite = await this.data.Favorites
                .Where(f => f.MovieId == movieId && f.UserId == userId)
                .FirstOrDefaultAsync();

            return favorite;
        }
    }
}

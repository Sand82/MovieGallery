using MovieGalleryWebAPI.Models.Favorites;

namespace MovieGalleryWebAPI.Service.Favorites
{
    public interface IFavoriteService
    {
        Task<bool> SetFavorite(FavoriteDataModel model);

        Task<bool> GetFavorite(string userId, int movieId);

        Task<ICollection<FavoriteMovieModel>> GetFavoriteMovies(string userId);
    }
}

using MovieGalleryWebAPI.Data.Models;
using MovieGalleryWebAPI.Models.Ratings;

namespace MovieGalleryWebAPI.Service.Ratings
{
    public interface IRatingService
    {
        Task AddRating(RatingsCreateModel model);

        Task<RatingApiModel> SearchRating(string userId, int movieId);

        Task<string> SearchPersonalRating(string userId, int movieId);
    }
}

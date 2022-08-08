using MovieGalleryWebAPI.Data.Models;
using MovieGalleryWebAPI.Models.Ratings;

namespace MovieGalleryWebAPI.Service.Ratings
{
    public interface IRatingService
    {
        Task AddRating(RatingsCreateModel model);

        Task<RatingApiModel> SearcheRating(string value, int movieId, string userId);
    }
}

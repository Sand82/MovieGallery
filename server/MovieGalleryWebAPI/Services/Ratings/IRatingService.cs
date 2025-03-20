using MovieGalleryWebAPI.Data.Models;
using MovieGalleryWebAPI.Models.Ratings;

namespace MovieGalleryWebAPI.Service.Ratings
{
    public interface IRatingService
    {
        Task AddRating(RatingsCreateModel model);

        Task<RatingApiModel> SearchRating( int movieId, string userId);
    }
}

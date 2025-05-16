using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

using MovieGalleryWebAPI.Data;
using MovieGalleryWebAPI.Data.Models;
using MovieGalleryWebAPI.Models.Ratings;

namespace MovieGalleryWebAPI.Service.Ratings
{
    public class RatingService : IRatingService
    {
        private readonly MovieGalleryDbContext data;
        private readonly IMapper mapper;

        public RatingService(MovieGalleryDbContext data, IMapper mapper)
        {           
            this.mapper = mapper;
            this.data = data;
        }
        public async Task AddRating(RatingsCreateModel model)
        {
            var rating = await this.data.Ratings
                .Where(r => r.UserId == model.UserId && r.MovieId == model.MovieId)
                .FirstOrDefaultAsync();

            if (rating == null)
            {
                rating = new Rating
                {
                    MovieId = model.MovieId,
                    UserId = model.UserId,
                    Value = int.Parse(model.Value!)
                };

                await this.data.Ratings.AddAsync(rating);
            }
            else
            {
                rating.Value = int.Parse(model.Value!);
            } 

            await this.data.SaveChangesAsync();                
        }       

        public async Task<RatingApiModel> SearchRating(string userId, int movieId)
        {
            var rating = await this.data.Ratings
                .Where(r => r.UserId == userId && r.MovieId == movieId)
                .ProjectTo<RatingApiModel>(this.mapper.ConfigurationProvider)                
                .FirstOrDefaultAsync();
            

            if (rating == null)
            {
                rating = new RatingApiModel
                {
                   Value = "0",
                   MovieId = movieId,
                   UserId = userId,
                   AverageRating = "0.0"
                };
            }else
            {
                rating.AverageRating = this.data.Ratings.Where(m => m.MovieId == movieId).Average(r => r.Value).ToString("F1");
            }

            return rating;
        }

        public async Task<string> SearchPersonalRating(string userId, int movieId)
        {
            var personalRating = await SearchRating(userId, movieId);

            return personalRating.Value!;
        }
    }
}

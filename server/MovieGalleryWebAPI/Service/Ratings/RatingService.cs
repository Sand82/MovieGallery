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
                    Value = int.Parse(model.Value)
                };

                await this.data.Ratings.AddAsync(rating);
            }
            else
            {
                rating.Value = int.Parse(model.Value);
            } 

            await this.data.SaveChangesAsync();                
        }

        public async Task<RatingApiModel> SearcheRating(int movieId, string userId)
        {
            var rating = await this.data.Ratings
                .Where(r => r.UserId == userId && r.MovieId == movieId)
                .ProjectTo<RatingApiModel>(this.mapper.ConfigurationProvider)
                //.Select(r => new RatingApiModel
                //{
                //    Id = r.Id,
                //    Value = r.Value.ToString(),
                //    MovieId = r.MovieId,
                //    UserId = r.UserId,
                //})
                .FirstOrDefaultAsync();

            if (rating == null)
            {
                rating = new RatingApiModel
                {
                   Value = "0",
                   MovieId = movieId,
                   UserId = userId,
                };
            }

            return rating;
        }
    }
}

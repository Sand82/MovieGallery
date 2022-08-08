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
        public async Task CreateRating(RatingsCreateModel model)
        {
            var rating = new Rating
            {
                Value = int.Parse(model.Value),
                MovieId = model.MovieId,
                UserId = model.UserId,
            };

            await this.data.Ratings.AddAsync(rating);

            await this.data.SaveChangesAsync();                
        }

        public async Task<RatingApiModel> SearcheRating(string value, int movieId, string userId)
        {
            var rating = await this.data.Ratings
                .Where(r => r.UserId == userId && r.MovieId == movieId && r.Value == int.Parse(value))
                .ProjectTo<RatingApiModel>(this.mapper.ConfigurationProvider)
                //.Select(r => new RatingApiModel
                //{
                //    Id = r.Id,
                //    Value = r.Value.ToString(),
                //    MovieId = r.MovieId,
                //    UserId = r.UserId,
                //})
                .FirstOrDefaultAsync();

            return rating;
        }
    }
}

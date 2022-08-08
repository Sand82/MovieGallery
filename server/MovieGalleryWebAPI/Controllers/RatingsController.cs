using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MovieGalleryWebAPI.Infrastructure;
using MovieGalleryWebAPI.Models.Comments;
using MovieGalleryWebAPI.Models.Ratings;
using MovieGalleryWebAPI.Service.Ratings;

namespace MovieGalleryWebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RatingsController : Controller
    {
        private readonly IRatingService ratingService;

        public RatingsController(IRatingService ratingService)
        {
            this.ratingService = ratingService;
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPost]
        public async Task<IActionResult> Post(RatingsCreateModel model)
        {
            var userId = User.GetId();

            if (userId == null || userId != model.UserId)
            {
                return NotFound("User not found");
            }

            await ratingService.AddRating(model);

            var rating = await ratingService.SearcheRating(model.MovieId, model.UserId);

            return Ok(rating);
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPut]
        public async Task<IActionResult> Put(RatingGetModel model)
        {
            var userId = User.GetId();

            if (userId == null || userId != model.UserId)
            {
                return NotFound("User not found");
            }

            var rating = await ratingService.SearcheRating(model.MovieId, userId);

            
            return Ok(rating);
        }
    }
}

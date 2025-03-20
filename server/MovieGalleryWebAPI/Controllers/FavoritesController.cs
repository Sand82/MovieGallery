using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MovieGalleryWebAPI.Models.Favorites;
using MovieGalleryWebAPI.Service.Favorites;
using static MovieGalleryWebAPI.Infrastructure.ClaimsPrincipalExtensions;

namespace MovieGalleryWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FavoritesController : Controller
    {
        private readonly IFavoriteService favoriteService;

        public FavoritesController(IFavoriteService favoriteService)
        {
            this.favoriteService = favoriteService;
        }

        [HttpGet]
        public async Task<IEnumerable<FavoriteMovieModel>> Get(string userId)
        {
           var movies = await favoriteService.GetFavoriteMovies(userId);

            return movies;
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPost]
        public async Task<IActionResult> Post(FavoriteDataModel model)
        {
            var userId = User.GetId();

            if (userId == null || userId != model.UserId)
            {
                return NotFound("User not found.");
            }

            var IsFavorite = await favoriteService.SetFavorite(model);

            return Ok(IsFavorite);
        }


        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPut]
        public async Task<IActionResult> Edit(FavoriteDataModel model)
        {
            var userId = User.GetId();

            var isValidUser = userId == model.UserId;

            if (!isValidUser)
            {
                return BadRequest("Unauthorised request.");
            }

            var isFavorite = await favoriteService.GetFavorite(model.UserId, model.MovieId);

            return Ok(isFavorite);
        }
    }
}

using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using static MovieGalleryWebAPI.Infrastructure.ClaimsPrincipalExtensions;

namespace MovieGalleryWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FavoritesController : Controller
    {
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPost]
        public async Task<IActionResult> Post()
        {
            var userId = User.GetId();

            var Isfavorite = true;

            return Ok(Isfavorite);
        }
    }
}

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication.JwtBearer;

using MovieGalleryWebAPI.Models.Movies;
using MovieGalleryWebAPI.Service.Movies;
using MovieGalleryWebAPI.Models.Edit;
using MovieGalleryWebAPI.Models.Create;
using MovieGalleryWebAPI.Infrastructure;
using MovieGalleryWebAPI.Service.Users;

namespace MovieGalleryWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MoviesController : ControllerBase
    {
        private readonly IMoviesService moviesService;
        private readonly IUserService userService;

        public MoviesController(IMoviesService moviesService, IUserService userService)
        {            
            this.moviesService = moviesService;
            this.userService = userService;
        }
        
        [HttpGet]
        public async Task<MoviesData> Get([FromQuery]GetMoviesModel model)
        {
            var movies = await moviesService.GetMovies(model);

            return movies;
        }

        [HttpGet("{id}")]
        public async Task<MovieDataModel> Get(int id, [FromQuery] string userId)
        {
            var movie = await moviesService.GetOneMovie(id, userId);
           
            return movie;
        }
        

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPost]
        public async Task<IActionResult> Post(MovieCreateModel model)
        {
            var userId = User.GetId();

            var isAdmin = await userService.CheckIsAdmin(userId);

            if (!isAdmin)
            {
                return BadRequest("Authorization denied");
            }

            var isExist = await moviesService.CheckForDuplicates(model.Title!);

            if (isExist)
            {
                return BadRequest("Movie already exist.");
            }            

            await moviesService.CreateMovie(model);

            var movie = await moviesService.GetLastMovie();

            return Ok(movie);
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPut("{id}")]
        public async Task<IActionResult> Edit(MovieEditModel model)
        {
            var userId = User.GetId();

            var isAdmin = await userService.CheckIsAdmin(userId);

            if (!isAdmin)
            {
                return BadRequest("Authorization denied.");
            }

            var movie = await moviesService.EditMovie(model);

            return Ok(movie);
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var userId = User.GetId();

            var isAdmin = await userService.CheckIsAdmin(userId);

            if (!isAdmin)
            {
                return BadRequest("Authorization denied.");
            }

            var isDelete = await moviesService.RemoveMovie(id);

            if (isDelete == false)
            {
                return BadRequest("Movie still persist in the database.");
            }

            return Ok(id.ToString());
        }        
    }
}

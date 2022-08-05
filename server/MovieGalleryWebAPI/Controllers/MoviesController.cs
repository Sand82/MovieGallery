using MovieGalleryWebAPI.Models.Movies;
using MovieGalleryWebAPI.Service.Movies;

using Microsoft.AspNetCore.Mvc;
using MovieGalleryWebAPI.Models.Edit;
using MovieGalleryWebAPI.Models.Create;

using Microsoft.AspNetCore.Authorization;
using MovieGalleryWebAPI.Models.Errors;
using MovieGalleryWebAPI.Infrastructure;
using MovieGalleryWebAPI.Service.Users;
using System.Net;

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
        public async Task<IEnumerable<MovieDataModel>> Get()
        {
            var movies = await moviesService.GetMovies();

            return movies;
        }

        [HttpGet("{id}")]
        public async Task<MovieDataModel> Get(int id)
        {
            var movies = await moviesService.GetOneMovies(id);
           
            return movies;
        }

        [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme)]
        [HttpPost]
        public async Task<IActionResult> Post(MovieCreateModel model)
        {
            var userId = User.GetId();

            var isAdmin = await userService.CheckIsAdmin(userId);

            if (!isAdmin)
            {
                return BadRequest("Authorization denied");
            }

            var isExist = await moviesService.ChackForDublicate(model.Title);

            if (isExist)
            {
                return BadRequest("Movie already exist");
            }            

            await moviesService.CreateMovie(model);

            var movie = await moviesService.GetLastMovie();

            return Ok(movie);
        }

        [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme)]
        [HttpPut]
        public async Task<bool> Edit(MovieEditModel model)
        {

            var movie = await moviesService.EditMovei(model);

            return movie;
        }

        [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme)]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var userId = User.GetId();

            var isAdmin = await userService.CheckIsAdmin(userId);

            if (!isAdmin)
            {
                return BadRequest("Authorization denied");
            }

            var isDelete = await moviesService.RemoveMovie(id);

            if (isDelete == false)
            {
                return BadRequest("Movie is not deleted from data base");
            }

            return Ok(id.ToString());
        }        
    }
}

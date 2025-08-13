using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication.JwtBearer;

using MovieGalleryWebAPI.Models.Movies;
using MovieGalleryWebAPI.Service.Movies;
using MovieGalleryWebAPI.Models.Edit;
using MovieGalleryWebAPI.Models.Create;
using MovieGalleryWebAPI.Infrastructure;
using MovieGalleryWebAPI.Service.Users;
using System.Text.Json;
using MovieGalleryWebAPI.Models.FormModel;

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

        [HttpGet("lates")]
        public async Task<IEnumerable<MoviesDataModel>> GetLates()
        {
            var movies = await moviesService.GetLatesMovies();

            return movies;
        }

        [HttpGet("{id}")]
        public async Task<MovieDataModel> Get(int id, [FromQuery] string userId)
        {
            var movie = await moviesService.GetOneMovie(id, userId);
           
            return movie;
        }

        [HttpPost]
        [Consumes("multipart/form-data")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]        
        public async Task<IActionResult> Post([FromForm] ManageMovieFormModel formModel)
        {
            var userId = User.GetId();

            var isAdmin = await userService.CheckIsAdmin(userId);

            if (!isAdmin)
            {
                return BadRequest("Authorization denied");
            }

            if (formModel.File == null || formModel.File.Length == 0)
            {
                return BadRequest("File is required");
            }                
            
            var model = JsonSerializer.Deserialize<MovieCreateModel>(formModel!.Data!, new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            });

            var isExist = await moviesService.CheckForDuplicates(model?.Title!);

            if (isExist)
            {
                return BadRequest("Movie already exist.");
            } 

            await moviesService.CreateMovie(model!, formModel.File);
            
            var movie = await moviesService.GetLastCreatedMovie();

            return Ok(movie);
        }

        [HttpPut("{id}")]
        [Consumes("multipart/form-data")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]        
        public async Task<IActionResult> Edit([FromForm]ManageMovieFormModel formModel)
        {
            var userId = User.GetId();

            var isAdmin = await userService.CheckIsAdmin(userId);

            if (!isAdmin)
            {
                return BadRequest("Authorization denied.");
            }

            if (formModel.File == null || formModel.File.Length == 0)
            {
                return BadRequest("File is required");
            }

            var model = JsonSerializer.Deserialize<MovieEditModel>(formModel!.Data!, new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            });

            var movie = await moviesService.EditMovie(model!, formModel.File);

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

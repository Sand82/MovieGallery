using MovieGalleryWebAPI.Models.Movies;
using MovieGalleryWebAPI.Service.Movies;

using Microsoft.AspNetCore.Mvc;
using MovieGalleryWebAPI.Models.Edit;
using MovieGalleryWebAPI.Models.Create;

using Microsoft.AspNetCore.Authorization;

namespace MovieGalleryWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MoviesController : ControllerBase
    {
        private readonly IMoviesService moviesService;

        public MoviesController(IMoviesService moviesService)
        {            
            this.moviesService = moviesService;
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

        [Authorize]
        [HttpPost]
        public async Task<MovieGetModel> Post(MovieCreateModel model)
        {
            //Request.Headers.TryGetValue("Bearer", out var token);            

            await moviesService.CreateMovie(model);

            var movie = await moviesService.GetLastMovie();

            return movie;
        }

        [Authorize]
        [HttpPut]
        public async Task<bool> Edit(MovieEditModel model)
        {

            var movie = await moviesService.EditMovei(model);

            return movie;
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<string> Delete(int id)
        {            
            var isDelete = await moviesService.RemoveMovie(id);

            if (isDelete == false)
            {
                return "Movie is not deleted from data base";
            }

            return id.ToString();
        }        
    }
}

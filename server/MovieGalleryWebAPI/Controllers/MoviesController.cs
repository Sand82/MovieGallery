using MovieGalleryWebAPI.Models.Movies;
using MovieGalleryWebAPI.Service.Movies;

using Microsoft.AspNetCore.Mvc;
using MovieGalleryWebAPI.Data.Models;

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

using Microsoft.AspNetCore.Mvc;
using MovieGalleryWebAPI.Models.Movies;
using MovieGalleryWebAPI.Models.StaticData;
using MovieGalleryWebAPI.Services.MovieImport;

namespace MovieGalleryWebAPI.Controllers
{
    [ApiController]
    [Route("api/movies")]
    public class MovieImportController : ControllerBase
    {
        private readonly IMovieImportService movieImportService;

        public MovieImportController(IMovieImportService movieImportService)
        {
            this.movieImportService = movieImportService;
        }

        [HttpPost("import")]
        public async Task<IActionResult> Import([FromBody] List<MovieScraperData> movies)
        {            
            await movieImportService.ImportMovies(movies);            

            return Ok();
        }
    }
}

using Microsoft.AspNetCore.Mvc;
using MovieGalleryWebAPI.Models.Movies;
using MovieGalleryWebAPI.Models.StaticData;

namespace MovieGalleryWebAPI.Controllers
{
    [ApiController]
    [Route("api/movies")]
    public class MovieImportController : ControllerBase
    {
        //private readonly IMovieImportService movieImportService;

        public MovieImportController()
        {
            //this.movieImportService = movieImportService;
        }

        [HttpPost("import")]
        public async Task<IActionResult> Import([FromBody] List<MovieScraperData> movies)
        {
            //await _movieImportService.ImportAsync(movies);
            ;

            return Ok();
        }
    }
}

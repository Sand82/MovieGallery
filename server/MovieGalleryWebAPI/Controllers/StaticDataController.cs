using Microsoft.AspNetCore.Mvc;
using MovieGalleryWebAPI.Services.StaticData;

namespace MovieGalleryWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StaticDataController : ControllerBase
    {
        private readonly IStaticDataService staticDataService;

        public StaticDataController(IStaticDataService staticDataService)
        {
            this.staticDataService = staticDataService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var model = await staticDataService.GetStaticData();

            return Ok(model);
        }
    }
}

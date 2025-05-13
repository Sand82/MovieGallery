using Microsoft.AspNetCore.Mvc;
using MovieGalleryWebAPI.Models.StaticData;
using MovieGalleryWebAPI.Services.StaticData;

namespace MovieGalleryWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StaticDataController
    {
        private readonly IStaticDataService staticDataService;

        public StaticDataController(IStaticDataService staticDataService)
        {
            this.staticDataService = staticDataService;
        }

        [HttpGet]
        public async Task<GetStaticDataEntities> Get()
        {
            var model = await staticDataService.GetStaticData();

            return model;
        }
    }
}

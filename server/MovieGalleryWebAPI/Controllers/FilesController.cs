using Microsoft.AspNetCore.Mvc;
using MovieGalleryWebAPI.Services.Image;

namespace MovieGalleryWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FilesController : Controller
    {
        private readonly IManageImage manageImage;

        public FilesController(IManageImage manageImage)
        {
            this.manageImage = manageImage;
        }


        [HttpGet("{fileName}")]
        public IActionResult GetImage(string fileName)
        {
            if (string.IsNullOrWhiteSpace(fileName))
            {
                return BadRequest("File name is required.");
            }

            (byte[] fileBytes, string contentType) = manageImage.GetFile(fileName);

            return File(fileBytes, contentType);
        }
    }
}

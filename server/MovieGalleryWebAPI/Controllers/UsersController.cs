using Microsoft.AspNetCore.Mvc;
using MovieGalleryWebAPI.Models.Users;
using MovieGalleryWebAPI.Service.Users;

namespace MovieGalleryWebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly IUserService userService;

        public UsersController(IUserService userService)
        {
            this.userService = userService;
        }

        [HttpGet]
        public async Task<IActionResult> Login(LoginInputModel model)
        {
            var chekedUser = await userService.FindUser(model.Email, model.Password);

            if (chekedUser == null)
            {
                ModelState.AddModelError("User exsist", "Invalide username or password.");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            return Ok(chekedUser);
        }

        [HttpPost]
        public async Task<IActionResult> Register(RegisterInputModel model)
        {
            
            if (model.Password.CompareTo(model.RepeatPassword) != 0)
            {
                ModelState.AddModelError("RepeatPassword", "Passwort and confirm password should be the same.");
            }

            var chekedUser = await userService.FindUserByEmail(model.Email);

            if (chekedUser != null)
            {
                ModelState.AddModelError("User exsist", "This email address is already taken.");
            }

            if (!ModelState.IsValid)
            {                
                return BadRequest(ModelState);
            }

            var user = await userService.CreateUser(model);

            return Ok(user);
        }
    }
}

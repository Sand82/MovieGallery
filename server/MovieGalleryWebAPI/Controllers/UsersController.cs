using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using MovieGalleryWebAPI.Models.Errors;
using MovieGalleryWebAPI.Models.Users;
using MovieGalleryWebAPI.Service.Users;
using MovieGalleryWebAPI.Settings;

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

        [HttpPost("register")]
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

        [HttpPost("login")]
        public async Task<ActionResult<UserApiModel>> Login(LoginInputModel model)
        {
            var user = await userService.FindUser(model.Username, model.Password);

            if (user == null)
            {
                var errorMode = new LoginErrorModel();

                errorMode.Error = "Invalid username or password.";

                return BadRequest(errorMode);
            }

            var token = await userService.CreateToken(model.Username, model.Password);

            user.AccessToken = token;

            return user;
        }        
    }
}

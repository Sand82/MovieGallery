using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MovieGalleryWebAPI.Infrastructure;
using MovieGalleryWebAPI.Models.Comments;
using MovieGalleryWebAPI.Service.Comments;
using MovieGalleryWebAPI.Service.Users;

namespace MovieGalleryWebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CommentsController : Controller
    {
        private readonly IUserService userService;
        private readonly ICommentService commentService;

        public CommentsController(IUserService userService, ICommentService commentService)
        {
            this.userService = userService;
            this.commentService = commentService;
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPost]
        public async Task<IActionResult> Post(CommentCreateModel model)
        {
            var userId = User.GetId();
           
            if (userId == null)
            {
                return NotFound("User not found");
            }

            await commentService.CreateComment(model, userId);

            var comment = await commentService.FindComment(model.Comment, model.MovieId);

            comment.UserId = userId;

            return Ok(comment);
        }
    }
}

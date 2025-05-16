using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using MovieGalleryWebAPI.Infrastructure;
using MovieGalleryWebAPI.Models.Comments;
using MovieGalleryWebAPI.Service.Comments;

namespace MovieGalleryWebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CommentsController : Controller
    {
        
        private readonly ICommentService commentService;

        public CommentsController( ICommentService commentService)
        {            
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

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPut("{id}")]
        public async Task<IActionResult> Edit(CommentEditModel model)
        {
            var userId = User.GetId();

            var isValidUser = userId == model.UserId;

            if (!isValidUser)
            {
                return BadRequest("Unauthorized request.");
            }

            var date = DateTime.UtcNow;

            var isEdited = await commentService.EditComment(model, date);

            if (!isEdited)
            {
                return BadRequest("Comment not found.");
            }

            var comment = await commentService.FindComment(model.Comment, model.MovieId);
            comment.UserId = userId;

            return Ok(comment);
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var userId = User.GetId();

            var isRemoved = await commentService.RemoveComment(id, userId);

            if (!isRemoved)
            {
                return BadRequest("Unauthorized request.");
            }

            return Ok(isRemoved);
        }
    }
}

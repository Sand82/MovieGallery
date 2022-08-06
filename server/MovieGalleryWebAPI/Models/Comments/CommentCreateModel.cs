using System.ComponentModel.DataAnnotations;

using static MovieGalleryWebAPI.Data.Constant;

namespace MovieGalleryWebAPI.Models.Comments
{
    public class CommentCreateModel
    {
        public int MovieId { get; set; }

        [Required]
        [StringLength(MaxContentLength, MinimumLength = MinContentLength,
            ErrorMessage = "The field {0} is not valid! Must be between of {2} and {1} symbols.")]
        public string? Comment { get; set; }

        [Required]
        [StringLength(MaxUsernameLength, MinimumLength = MinUsernameLength,
            ErrorMessage = "The field {0} is not valid! Must be between of {2} and {1} symbols.")]
        public string? Username { get; set; }

        [Required]
        [EmailAddress]
        public string? Email { get; set; }
    }
}

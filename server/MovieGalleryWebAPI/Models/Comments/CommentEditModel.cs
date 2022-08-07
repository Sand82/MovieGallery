using System.ComponentModel.DataAnnotations;

using static MovieGalleryWebAPI.Data.Constant;

namespace MovieGalleryWebAPI.Models.Comments
{
    public class CommentEditModel
    {
        public int Id { get; set; }

        [Required]
        [StringLength(MaxContentLength, MinimumLength = MinContentLength,
            ErrorMessage = "The field {0} is not valid! Must be between of {2} and {1} symbols.")]
        public string? Comment { get; set; }

        public int MovieId { get; set; }

        public string? Username { get; set; }

        public string? UserId { get; set; }

    }
}

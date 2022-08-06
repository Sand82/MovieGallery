using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

using static MovieGalleryWebAPI.Data.Constant;

namespace MovieGalleryWebAPI.Data.Models
{
    public class Comment
    {
        public int Id { get; set; }

        [Required]
        [StringLength(MaxMovieTitleLength)]
        public string? Content { get; set; }

        public DateTime CreationData { get; set; } = DateTime.UtcNow;

        [Required]
        public string? UserId { get; set; }

        public IdentityUser? User { get; set; }

        public int MovieId { get; set; }

        public Movie? Movie { get; set; }
    }
}

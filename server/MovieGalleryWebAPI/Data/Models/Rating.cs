using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

using static MovieGalleryWebAPI.Data.Constant;

namespace MovieGalleryWebAPI.Data.Models
{
    public class Rating
    {
        [Key]
        public int Id { get; set; }

        [Range(MinRatingValue, MaxRatingValue)]
        public int Value { get; set; }

        [Required]
        public string? UserId { get; set; }

        public IdentityUser? User { get; set; }

        public int MovieId { get; set; }

        public Movie? Movie { get; set; }
    }
}

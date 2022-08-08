using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace MovieGalleryWebAPI.Data.Models
{
    public class Rating
    {
        public int Id { get; set; }

        public int Value { get; set; }

        [Required]
        public string? UserId { get; set; }

        public IdentityUser? User { get; set; }

        public int MovieId { get; set; }

        public Movie? Movie { get; set; }
    }
}

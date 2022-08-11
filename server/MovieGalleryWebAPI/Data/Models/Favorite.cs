using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace MovieGalleryWebAPI.Data.Models
{
    public class Favorite
    {
        public int Id { get; set; }

        [Required]
        public string? UserId { get; set; }

        public IdentityUser? User { get; set; }

        public bool IsFavorite { get; set; } = false;

        public int MovieId { get; set; }

        public Movie? Movie { get; set; }
    }
}

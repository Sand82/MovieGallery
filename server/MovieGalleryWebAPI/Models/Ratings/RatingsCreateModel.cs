using System.ComponentModel.DataAnnotations;

using static MovieGalleryWebAPI.Data.Constant;

namespace MovieGalleryWebAPI.Models.Ratings
{
    public class RatingsCreateModel
    {
        [Required]
        [Range(MinRatingValue, MaxRatingValue,
            ErrorMessage = "The field {0} is not valid! Must be between of {2} and {1} symbols.")]

        public string? Value { get; set; }

        public string? UserId { get; set; }

        public int MovieId { get; set; }
    }
}

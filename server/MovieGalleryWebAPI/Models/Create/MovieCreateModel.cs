using System.ComponentModel.DataAnnotations;

using static MovieGalleryWebAPI.Data.Constant;

namespace MovieGalleryWebAPI.Models.Create
{
    public class MovieCreateModel
    {

        [Required]
        [StringLength(MaxMovieTitleLength, MinimumLength = MinMovieTitleLength,
            ErrorMessage = "The field {0} is not valid! Must be between of {2} and {1} symbols.")]
        public string? Title { get; set; }

        [Required]
        [StringLength(MaxMovieDescriptionLength, MinimumLength = MinMovieDescriptionLength,
            ErrorMessage = "The field {0} is not valid! Must be between of {2} and {1} symbols.")]
        public string? Description { get; set; }

        [Required]
        [StringLength(MaxMovieImageUrlLength, MinimumLength = MinMovieImageUrlLength,
            ErrorMessage = "The field {0} is not valid! Must be between of {2} and {1} symbols.")]
        public string? ImageUrl { get; set; }

        [Required]
        [StringLength(MaxMovieCategoryLength, MinimumLength = MinMovieCategoryLength,
            ErrorMessage = "The field {0} is not valid! Must be between of {2} and {1} symbols.")]
        public string? Category { get; set; }

        [Required]
        [StringLength(MovieYearLength,
            ErrorMessage = "The field {0} is not valid! Must be exact {1} symbols.")]
        public string? Year { get; set; }

        [Required]
        [StringLength(MaxMovieDuration, MinimumLength = MinMovieDuration,
            ErrorMessage = "The field {0} is not valid! Must be between of {2} and {1} symbols.")]
        public string? Duration { get; set; }        
    }
}

namespace MovieGalleryWebAPI.Data.Models
{
    using System.ComponentModel.DataAnnotations;
    using static MovieGalleryWebAPI.Data.Constant;
    public class Movie
    {
        public int Id { get; set; }

        [Required]
        [StringLength(MaxMovieTitleLength)]
        public string? Title { get; set; }

        [Required]
        [StringLength(MaxMovieImageUrlLength)]
        public string? ImageUrl { get; set; }

        [Required]
        [StringLength(MaxMovieDescriptionLength)]
        public string? Description { get; set; }

        [Required]
        [StringLength(MovieYearLength)]
        public string? Year { get; set; }

        [Required]
        [StringLength(MaxMovieCategoryLength)]
        public string? Category { get; set; }

        [Required]
        [StringLength(MaxMovieDuration)]
        public string? Duration { get; set; }

        public bool IsDelete { get; set; } = false;
    }
}

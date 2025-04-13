using System.ComponentModel.DataAnnotations;

using static MovieGalleryWebAPI.Data.Constant;

namespace MovieGalleryWebAPI.Data.Models
{    
    public class Movie
    {
        public Movie()
        {
            this.Comments =  new HashSet<Comment>();

            this.Ratings = new HashSet<Rating>();

            this.Favorites = new HashSet<Favorite>();

            this.Startings = new HashSet<Starring>();
        }

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

        [Required]
        [StringLength(MaxMovieEmbededLength)]
        public string? EmbededVideo { get; set; } 

        public bool IsDelete { get; set; } = false;

        public ICollection<Comment>? Comments { get; set; }

        public ICollection<Rating>? Ratings { get; set; }

        public ICollection<Favorite>? Favorites { get; set; }

        public ICollection<Starring>? Startings { get; set; }
    }
}

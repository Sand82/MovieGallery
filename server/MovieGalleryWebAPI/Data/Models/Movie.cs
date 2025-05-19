using System.ComponentModel.DataAnnotations;

using MovieGalleryWebAPI.Services;

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

            this.MovieStarrings = new HashSet<MovieStarring>();

            this.MovieDirectors = new HashSet<MovieDirector>();

            this.MovieCountries = new HashSet<MovieCountry>();

            this.MovieLanguages = new HashSet<MovieLanguage>();

            this.MovieCategories = new HashSet<MovieCategory>();

            this.MovieTags = new HashSet<MovieTag>();
        }

        [Key]
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
        [StringLength(MaxMovieDuration)]
        public string? Duration { get; set; }

        [Required]
        [StringLength(MaxMovieEmbededLength)]
        public string? EmbededVideo { get; set; }

        [Required]
        [StringLength(MaxMovieReleaseLength)]
        public string? Release { get; set; }

        public int CompanyId { get; set; }

        public Company? Company { get; set; }

        public bool IsDelete { get; set; } = false;

        public ICollection<Comment>? Comments { get; set; }

        public ICollection<Rating>? Ratings { get; set; }

        public ICollection<Favorite>? Favorites { get; set; }

        public ICollection<MovieTag>? MovieTags { get; set; }

        public ICollection<MovieStarring>? MovieStarrings { get; set; }

        public ICollection<MovieDirector>? MovieDirectors { get; set; }

        public ICollection<MovieCountry>? MovieCountries { get; set; }

        public ICollection<MovieLanguage>? MovieLanguages { get; set; }

        public ICollection<MovieCategory> MovieCategories { get; set; }
    }
}

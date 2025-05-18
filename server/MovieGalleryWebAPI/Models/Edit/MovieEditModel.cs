using System.ComponentModel.DataAnnotations;

using MovieGalleryWebAPI.Models.Category;
using MovieGalleryWebAPI.Models.Countries;
using MovieGalleryWebAPI.Models.Languages;

using static MovieGalleryWebAPI.Data.Constant;

namespace MovieGalleryWebAPI.Models.Edit
{  

    public class MovieEditModel
    {
        public int Id { get; set; }

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
        [StringLength(MovieYearLength,
            ErrorMessage = "The field {0} is not valid! Must be exact {1} symbols.")]
        public string? Year { get; set; }

        [Required]
        [StringLength(MaxMovieDuration, MinimumLength = MinMovieDuration,
           ErrorMessage = "The field {0} is not valid! Must be exact {1} symbols.")]
        public string? Duration { get; set; }

        [Required]
        [StringLength(MaxMovieEmbededLength)]
        public string? EmbededVideo { get; set; }

        [Required]
        [StringLength(MaxMovieReleaseLength)]
        public string? Release { get; set; }

        [Required]
        [StringLength(MaxCompanyNameLength)]
        public string? Company { get; set; }

        public List<StarringEditModel>? Starring { get; set; } 

        public List<DirectorsEditModel>? Directors { get; set; }

        public ICollection<MovieCategoryModel>? Categories { get; set; }

        public ICollection<MovieCountriesModel>? Countries { get; set; }

        public ICollection<MovieLanguagesModel>? Languages { get; set; }
    }
}

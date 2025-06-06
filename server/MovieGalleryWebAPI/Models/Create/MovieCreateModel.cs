﻿using MovieGalleryWebAPI.Models.Category;
using MovieGalleryWebAPI.Models.Countries;
using MovieGalleryWebAPI.Models.Languages;

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

        //[Required]
        //[StringLength(MaxMovieImageUrlLength, MinimumLength = MinMovieImageUrlLength,
        //    ErrorMessage = "The field {0} is not valid! Must be between of {2} and {1} symbols.")]
        //public string? ImageUrl { get; set; }
        //
       
        [Required]
        [StringLength(MovieYearLength,
            ErrorMessage = "The field {0} is not valid! Must be exact {1} symbols.")]
        public string? Year { get; set; }

        [Required]
        [StringLength(MaxMovieDuration, MinimumLength = MinMovieDuration,
            ErrorMessage = "The field {0} is not valid! Must be between of {2} and {1} symbols.")]
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
        
        public ICollection<string>? Starring { get; set; } = new List<string>();
        
        public ICollection<string>? Directors { get; set; } = new List<string>();

        public ICollection<string>? Tags { get; set; } = new List<string>();

        public ICollection<MovieCountriesModel>? Countries {  get; set; } = new List<MovieCountriesModel>();

        public ICollection<MovieLanguagesModel>? Languages {  get; set; } = new List<MovieLanguagesModel>();

        public ICollection<MovieCategoryModel>? Categories { get; set; } = new List<MovieCategoryModel>();
    }
}

using MovieGalleryWebAPI.Data.Models;
using MovieGalleryWebAPI.Models.Category;
using MovieGalleryWebAPI.Models.Countries;
using MovieGalleryWebAPI.Models.Directors;
using MovieGalleryWebAPI.Models.Languages;
using MovieGalleryWebAPI.Models.Starring;
using MovieGalleryWebAPI.Models.Tags;

namespace MovieGalleryWebAPI.Models.Movies
{
    public class MovieDataModel
    {
        public int Id { get; set; }
                
        public string? Title { get; set; }
                
        public string? Description { get; set; }
                
        public string? ImageUrl { get; set; }

        public string? Year { get; set; }       

        public string? Duration { get; set; }

        public string? AverageRating { get; set; }
        
        public string? PersonalRating { get; set; }

        public string? EmbededVideo { get; set; }

        public string? Release { get; set; }

        public string? Company { get; set; }

        public bool IsFavorite { get; set; }       

        public ICollection<MovieCommentModel>? Comments { get; set; }

        public ICollection<MovieStarringModel>? Starring { get; set; }

        public ICollection<MovieDirectorsModel>? Directors { get; set; }

        public ICollection<MovieCountriesModel>? Countries { get; set; }

        public ICollection<MovieLanguagesModel>? Languages { get; set; }

        public ICollection<MovieCategoryModel>? Categories { get; set; }

        public ICollection<MovieTagsModel>? Tags { get; set; }
    }
}

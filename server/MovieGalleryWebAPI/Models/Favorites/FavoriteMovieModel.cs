using MovieGalleryWebAPI.Models.Category;
using System.ComponentModel.DataAnnotations;

namespace MovieGalleryWebAPI.Models.Favorites
{
    public class FavoriteMovieModel
    {
        public int Id { get; set; }

        public string? Title { get; set; }

        public string? Description { get; set; }
        
        public string? MainImage { get; set; }

        public string? Year { get; set; }        

        public string? Duration { get; set; }

        public ICollection<MovieCategoryModel>? Categories { get; set; }
    }
}

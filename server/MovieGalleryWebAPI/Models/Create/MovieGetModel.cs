using MovieGalleryWebAPI.Models.Category;
using System.ComponentModel.DataAnnotations;

namespace MovieGalleryWebAPI.Models.Create
{
    public class MovieGetModel
    {
        public int Id { get; set; }

        public string? Title { get; set; }

        public string? Description { get; set; }

        public string? BackgroundImage { get; set; }       

        public string? Year { get; set; }        

        public string? Duration { get; set; }

        public string? AverageRating { get; set; }

        public string? EmbededVideo { get; set; }

        public ICollection<MovieCategoryModel>? Categories {  get; set; }
    }
}

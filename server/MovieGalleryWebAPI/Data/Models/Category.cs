using System.ComponentModel.DataAnnotations;

using static MovieGalleryWebAPI.Data.Constant;

namespace MovieGalleryWebAPI.Data.Models
{
    public class Category
    {
        public Category()
        {
            this.MovieCategories = new HashSet<MovieCategory>();  
        }

        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(MaxMovieCategoryLength)]
        public string? Name { get; set; }

        public ICollection<MovieCategory>?  MovieCategories { get; set; }
    }
}

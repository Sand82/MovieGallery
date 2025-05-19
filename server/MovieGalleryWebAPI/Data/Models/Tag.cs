using MovieGalleryWebAPI.Services;
using System.ComponentModel.DataAnnotations;

using static MovieGalleryWebAPI.Data.Constant;

namespace MovieGalleryWebAPI.Data.Models
{
    public class Tag
    {
        public Tag()
        {
            this.MovieTags = new List<MovieTag>();
        }

        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(MaxTagLength)]
        public string? Name { get; set; }

        public ICollection<MovieTag>? MovieTags { get; set; }
    }
}

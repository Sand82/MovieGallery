using System.ComponentModel.DataAnnotations;

using static MovieGalleryWebAPI.Data.Constant;

namespace MovieGalleryWebAPI.Data.Models
{
    public class Starring
    {
        public Starring()
        {
            this.Movies = new List<Movie>();
        }

        public int Id { get; set; }

        [Required]
        [StringLength(MaxMovieTitleLength)]
        public string? Name { get; set; }

        public ICollection<Movie>? Movies { get; set;}
    }
}

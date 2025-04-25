using System.ComponentModel.DataAnnotations;

using static MovieGalleryWebAPI.Data.Constant;

namespace MovieGalleryWebAPI.Data.Models
{
    public class Director
    {
        public Director()
        {
            this.MovieDirectors = new List<MovieDirector>();
        }
        public int Id { get; set; }

        [Required]
        [StringLength(MaxMovieTitleLength)]
        public string? Name { get; set; }

        public ICollection<MovieDirector>? MovieDirectors { get; set; }
    }
}

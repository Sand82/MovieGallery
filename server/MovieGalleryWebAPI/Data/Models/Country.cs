using System.ComponentModel.DataAnnotations;

using static MovieGalleryWebAPI.Data.Constant;

namespace MovieGalleryWebAPI.Data.Models
{
    public class Country
    {
        public Country()
        {
            this.MovieCountries = new HashSet<MovieCountry>();
        }

        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(MaxCountryNameValue)]
        public string? Name { get; set; }

        public ICollection<MovieCountry>? MovieCountries { get; set; }
    }
}

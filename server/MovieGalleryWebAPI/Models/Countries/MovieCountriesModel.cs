using System.ComponentModel.DataAnnotations;

using static MovieGalleryWebAPI.Data.Constant;

namespace MovieGalleryWebAPI.Models.Countries
{
    public class MovieCountriesModel
    {
        public int Id { get; set; }

        [Required]
        [StringLength(MaxCountryNameLength)]
        public string? Name { get; set; }
    }
}

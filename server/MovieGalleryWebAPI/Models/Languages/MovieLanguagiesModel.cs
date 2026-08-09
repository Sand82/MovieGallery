using System.ComponentModel.DataAnnotations;

using static MovieGalleryWebAPI.Data.Constants;

namespace MovieGalleryWebAPI.Models.Languages
{
    public class MovieLanguagesModel
    {
        public int Id { get; set; }

        [Required]
        [StringLength(MaxLanguageLength)]
        public string? Name { get; set; }
    }
}

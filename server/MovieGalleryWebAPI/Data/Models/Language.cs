using System.ComponentModel.DataAnnotations;

using static MovieGalleryWebAPI.Data.Constant;

namespace MovieGalleryWebAPI.Data.Models
{
    public class Language
    {
        public Language()
        {
            this.MovieLanguages = new HashSet<MovieLanguage>();
        }

        [Key]
        public int Id{ get; set; }

        [Required]
        [StringLength(MaxLanguageValue)]
        public string? Name { get; set; }

        public ICollection<MovieLanguage>? MovieLanguages { get; set; }
    }
}

using System.ComponentModel.DataAnnotations;

using static MovieGalleryWebAPI.Data.Constant;

namespace MovieGalleryWebAPI.Data.Models
{
    public class Company
    {
        public Company()
        {
            this.Movies = new HashSet<Movie>();
        }

        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(MaxCompanyNameLength)]
        public string? Name { get; set; }

        public ICollection<Movie>? Movies { get; set; }
    }
}

using System.ComponentModel.DataAnnotations;

using static MovieGalleryWebAPI.Data.Constants;

namespace MovieGalleryWebAPI.Models.Edit
{
    public class StarringEditModel
    {        
        public int Id { get; set; }

        [Required]
        [StringLength(MaxDirectorNameLength)]
        public string? Name { get; set; }
    }
}

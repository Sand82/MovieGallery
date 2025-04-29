using System.ComponentModel.DataAnnotations;

using static MovieGalleryWebAPI.Data.Constant;

namespace MovieGalleryWebAPI.Models.Edit
{
    public class StarringEditModel
    {        
        public int Id { get; set; }

        [Required]
        [StringLength(MaxDirectorNameValue)]
        public string? Name { get; set; }
    }
}

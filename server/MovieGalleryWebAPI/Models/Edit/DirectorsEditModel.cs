using System.ComponentModel.DataAnnotations;

using static MovieGalleryWebAPI.Data.Constant;

namespace MovieGalleryWebAPI.Models.Edit
{
    public class DirectorsEditModel
    {
        public int Id { get; set; }

        [Required]
        [StringLength(MaxStarringNameValue)]
        public string? Name { get; set; }
    }
}

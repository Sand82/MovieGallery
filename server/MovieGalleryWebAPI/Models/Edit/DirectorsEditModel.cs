using System.ComponentModel.DataAnnotations;

using static MovieGalleryWebAPI.Data.Constant;

namespace MovieGalleryWebAPI.Models.Edit
{
    public class DirectorsEditModel
    {
        public int Id { get; set; }

        [Required]
        [StringLength(MaxStarringNameLength)]
        public string? Name { get; set; }
    }
}

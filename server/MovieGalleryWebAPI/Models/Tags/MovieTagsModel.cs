using System.ComponentModel.DataAnnotations;

using static MovieGalleryWebAPI.Data.Constant;

namespace MovieGalleryWebAPI.Models.Tags
{
    public class MovieTagsModel
    {
        public int Id { get; set; }
        
        [StringLength(MaxTagLength)]
        public string? Name { get; set; }
    }
}

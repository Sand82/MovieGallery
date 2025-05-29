using System.ComponentModel.DataAnnotations;

namespace MovieGalleryWebAPI.Models.FormModel
{
     public class MovieCreateFormModel
     {
         [Required]
         public IFormFile? File { get; set; }

         [Required]
         public string? Data { get; set; }
     }
 
}

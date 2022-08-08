namespace MovieGalleryWebAPI.Models.Ratings
{
    public class RatingGetModel
    {
        public int Id { get; set; }       

        public string? UserId { get; set; }

        public int MovieId { get; set; }
    }
}

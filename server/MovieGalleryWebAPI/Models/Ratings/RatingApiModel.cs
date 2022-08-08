namespace MovieGalleryWebAPI.Models.Ratings
{
    public class RatingApiModel
    {
        public int Id { get; set; }

        public string? Value { get; set; }

        public string? UserId { get; set; }

        public int MovieId { get; set; }
    }
}

namespace MovieGalleryWebAPI.Models.Movies
{
    public class MovieCommentModel
    {
        public int Id { get; set; }

        public int MovieId { get; set; }

        public string? Comment { get; set; }

        public string? UserId { get; set; }

        public string? Username { get; set; }

        public DateTime CreationData { get; set; }
    }
}

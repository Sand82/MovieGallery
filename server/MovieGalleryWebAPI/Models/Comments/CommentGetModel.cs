namespace MovieGalleryWebAPI.Models.Comments
{
    public class CommentGetModel
    {
        public int Id { get; set; }

        public string? Username { get; set; }

        public string? Email { get; set; }

        public string? Comment { get; set; }

        public DateTime CreationData { get; set; }

        public int MovieId { get; set; }

        public string? UserId { get; set; }
    }
}

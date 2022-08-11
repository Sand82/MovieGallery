namespace MovieGalleryWebAPI.Models.Favorites
{
    public class FavoriteDataModel
    {
        public int MovieId { get; set; }

        public bool IsFavorite { get; set; }

        public string? UserId { get; set; }
    }
}

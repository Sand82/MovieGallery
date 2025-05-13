namespace MovieGalleryWebAPI.Data.Models
{
    public class MovieStarring
    {
        public int MovieId { get; set; }
        public Movie? Movie { get; set; }

        public int StarringId { get; set; }
        public Starring? Starring { get; set; }
    }
}

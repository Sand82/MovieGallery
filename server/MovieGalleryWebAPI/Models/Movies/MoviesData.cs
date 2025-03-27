namespace MovieGalleryWebAPI.Models.Movies
{
    public class MoviesData
    {
        public IEnumerable<MoviesDataModel>? Movies { get; set; }

        public int Count { get; set; }
    }
}

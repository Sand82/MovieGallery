namespace MovieGalleryWebAPI.Models.Movies
{
    public class MoviesData
    {
        public IEnumerable<MoviesDataModel>? Movies { get; set; }

        public IEnumerable<MoviesDataModel>? LatestMovies { get; set; }

        public int Count { get; set; }
    }
}

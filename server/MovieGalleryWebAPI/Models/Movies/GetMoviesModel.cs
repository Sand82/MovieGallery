namespace MovieGalleryWebAPI.Models.Movies
{
    public class GetMoviesModel
    {
        public string? Search { get; set; }

        public string? Select { get; set; }

        public string? Sort { get; set; }

        public int ItemsPerPage { get; set; }

        public int CurrentPage { get; set; }
    }
}

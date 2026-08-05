namespace MovieGalleryWebAPI.Models.StaticData
{
    public class MovieScraperData
    {
        public MovieScraperData()
        {

            this.MovieStarrings = new HashSet<string>();

            this.MovieDirectors = new HashSet<string>();           

            this.MovieLanguages = new HashSet<string>();

            this.MovieCategories = new HashSet<string>();

            this.MovieTags = new HashSet<string>();
        }

        public string? ExternalId { get; set; }

        public string? Title { get; set; }

        public string? BackgroundImage { get; set; }

        public string? MainImage { get; set; }

        public string? Description { get; set; }

        public string? Year { get; set; }

        public string? Duration { get; set; }

        public string? EmbededVideo { get; set; }

        public string? Release { get; set; }

        public string? Company { get; set; }

        public bool IsDelete { get; set; } = false;

        public ICollection<string>? MovieTags { get; set; }

        public ICollection<string>? MovieStarrings { get; set; }

        public ICollection<string>? MovieDirectors { get; set; }        

        public ICollection<string>? MovieLanguages { get; set; }

        public ICollection<string> MovieCategories { get; set; }
    }
}

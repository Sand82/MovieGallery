using MovieGalleryWebAPI.Models.Directors;
using MovieGalleryWebAPI.Models.Starring;

namespace MovieGalleryWebAPI.Models.Movies
{
    public class MovieDataModel
    {
        public int Id { get; set; }
                
        public string? Title { get; set; }
                
        public string? Description { get; set; }
                
        public string? ImageUrl { get; set; }

        public string? Year { get; set; }

        public string? Category { get; set; }

        public string? Duration { get; set; }

        public string? AverageRating { get; set; }
        
        public string? PersonalRating { get; set; }

        public string? EmbededVideo { get; set; }

        public string? Release { get; set; }

        public string? Company { get; set; }

        public bool IsFavorite { get; set; }       

        public ICollection<MovieCommentModel>? Comments { get; set; }

        public ICollection<MovieStarringModel>? Starring { get; set; }

        public ICollection<MovieDirectorsModel>? Directors { get; set; }
    }
}

using MovieGalleryWebAPI.Models.StaticData;

namespace MovieGalleryWebAPI.Services.MovieImport
{
    public interface IMovieImportService
    {
        public Task ImportMovies(List<MovieScraperData> models);        
    }
}

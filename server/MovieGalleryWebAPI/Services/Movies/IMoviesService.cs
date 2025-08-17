using MovieGalleryWebAPI.Models.Create;
using MovieGalleryWebAPI.Models.Edit;
using MovieGalleryWebAPI.Models.Movies;

namespace MovieGalleryWebAPI.Service.Movies
{
    public interface IMoviesService
    {
        public Task<MoviesData> GetMovies(GetMoviesModel model);

        public Task<IEnumerable<MoviesDataModel>> GetLatesMovies();

        public Task<IEnumerable<MoviesDataModel>> GetTopRatedMovies();

        public Task<MovieDataModel> GetOneMovie(int movieId, string userId);        

        public Task<bool> RemoveMovie(int movieId);

        public Task CreateMovie(MovieCreateModel model, IFormFile file);

        public Task<MovieGetModel> GetLastCreatedMovie();

        public Task<bool> EditMovie(MovieEditModel model, IFormFile file);

        public Task<bool> CheckForDuplicates(string title);
    }
}

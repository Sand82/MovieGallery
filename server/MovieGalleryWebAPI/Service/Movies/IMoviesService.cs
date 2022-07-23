using MovieGalleryWebAPI.Models.Create;
using MovieGalleryWebAPI.Models.Movies;

namespace MovieGalleryWebAPI.Service.Movies
{
    public interface IMoviesService
    {
        Task<List<MovieDataModel>> GetMovies();

        Task<MovieDataModel> GetOneMovies(int movieId);

        Task<bool> RemoveMovie(int movieId);

        Task CreateMovie(MovieCreateModel model);

        Task<MovieGetModel> GetLastMovie();
    }
}

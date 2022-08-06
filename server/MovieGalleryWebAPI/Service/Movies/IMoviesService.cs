using MovieGalleryWebAPI.Models.Create;
using MovieGalleryWebAPI.Models.Edit;
using MovieGalleryWebAPI.Models.Movies;

namespace MovieGalleryWebAPI.Service.Movies
{
    public interface IMoviesService
    {
        Task<List<MoviesDataModel>> GetMovies();

        Task<MovieDataModel> GetOneMovies(int movieId);

        Task<bool> RemoveMovie(int movieId);

        Task CreateMovie(MovieCreateModel model);

        Task<MovieGetModel> GetLastMovie();

        Task<bool> EditMovei(MovieEditModel model);

        Task<bool> ChackForDublicate(string title);
    }
}

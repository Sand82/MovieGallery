using MovieGalleryWebAPI.Models.Create;
using MovieGalleryWebAPI.Models.Edit;
using MovieGalleryWebAPI.Models.Movies;

namespace MovieGalleryWebAPI.Service.Movies
{
    public interface IMoviesService
    {
        Task<MoviesData> GetMovies(GetMoviesModel model);

        Task<MovieDataModel> GetOneMovie(int movieId, string userId);

        Task<bool> RemoveMovie(int movieId);

        Task CreateMovie(MovieCreateModel model);

        Task<MovieGetModel> GetLastMovie();

        Task<bool> EditMovie(MovieEditModel model);

        Task<bool> CheckForDuplicates(string title);
    }
}

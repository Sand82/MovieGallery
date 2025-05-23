﻿using MovieGalleryWebAPI.Models.Create;
using MovieGalleryWebAPI.Models.Edit;
using MovieGalleryWebAPI.Models.Movies;

namespace MovieGalleryWebAPI.Service.Movies
{
    public interface IMoviesService
    {
        public Task<MoviesData> GetMovies(GetMoviesModel model);       

        public Task<MovieDataModel> GetOneMovie(int movieId, string userId);        

        public Task<bool> RemoveMovie(int movieId);

        public Task CreateMovie(MovieCreateModel model);

        public Task<MovieGetModel> GetLastMovie();

        public Task<bool> EditMovie(MovieEditModel model);

        public Task<bool> CheckForDuplicates(string title);
    }
}

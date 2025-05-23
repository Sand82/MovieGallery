﻿using MovieGalleryWebAPI.Models.Category;

namespace MovieGalleryWebAPI.Models.Favorites
{
    public class FavoriteMovieModel
    {
        public int Id { get; set; }

        public string? Title { get; set; }

        public string? Description { get; set; }

        public string? ImageUrl { get; set; }

        public string? Year { get; set; }        

        public string? Duration { get; set; }

        public ICollection<MovieCategoryModel>? Categories { get; set; }
    }
}

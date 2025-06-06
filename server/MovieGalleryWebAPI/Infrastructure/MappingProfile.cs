﻿using AutoMapper;
using Microsoft.AspNetCore.Identity;

using MovieGalleryWebAPI.Data.Models;
using MovieGalleryWebAPI.Models.Create;
using MovieGalleryWebAPI.Models.Edit;
using MovieGalleryWebAPI.Models.Users;
using MovieGalleryWebAPI.Models.Ratings;
using MovieGalleryWebAPI.Models.Movies;

namespace MovieGalleryWebAPI.Infrastructure
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            this.CreateMap<MovieCreateModel, Movie>().ReverseMap();            

            this.CreateMap<Movie, MoviesDataModel>().ReverseMap();

            this.CreateMap<MovieEditModel, Movie>().ReverseMap();

            this.CreateMap<IdentityUser, UserApiModel>();

            this.CreateMap<Rating, RatingApiModel>();
            
        }
    }
}

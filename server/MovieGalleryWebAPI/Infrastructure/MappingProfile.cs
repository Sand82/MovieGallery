using MovieGalleryWebAPI.Data.Models;
using MovieGalleryWebAPI.Data.Movies;
using MovieGalleryWebAPI.Models.Create;
using MovieGalleryWebAPI.Models.Edit;
using MovieGalleryWebAPI.Models.Users;

using AutoMapper;
using Microsoft.AspNetCore.Identity;

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
            
        }
    }
}

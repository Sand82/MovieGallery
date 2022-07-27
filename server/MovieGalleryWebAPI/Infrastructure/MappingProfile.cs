using AutoMapper;
using Microsoft.AspNetCore.Identity;
using MovieGalleryWebAPI.Data.Models;
using MovieGalleryWebAPI.Models.Create;
using MovieGalleryWebAPI.Models.Edit;
using MovieGalleryWebAPI.Models.Movies;
using MovieGalleryWebAPI.Models.Users;

namespace MovieGalleryWebAPI.Infrastructure
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            this.CreateMap<MovieCreateModel, Movie>().ReverseMap();            

            this.CreateMap<Movie, MovieDataModel>().ReverseMap();

            this.CreateMap<MovieEditModel, Movie>().ReverseMap();

            this.CreateMap<IdentityUser, UserApiModel>();
            
        }
    }
}

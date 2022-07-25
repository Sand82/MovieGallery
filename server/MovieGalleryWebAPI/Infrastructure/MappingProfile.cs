using AutoMapper;
using MovieGalleryWebAPI.Data.Models;
using MovieGalleryWebAPI.Models.Create;
using MovieGalleryWebAPI.Models.Edit;
using MovieGalleryWebAPI.Models.Movies;

namespace MovieGalleryWebAPI.Infrastructure
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            this.CreateMap<MovieCreateModel, Movie>().ReverseMap();            

            this.CreateMap<Movie, MovieDataModel>().ReverseMap();

            this.CreateMap<MovieEditModel, Movie>().ReverseMap();
        }
    }
}

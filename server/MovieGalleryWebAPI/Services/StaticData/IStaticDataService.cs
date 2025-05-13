using MovieGalleryWebAPI.Models.StaticData;

namespace MovieGalleryWebAPI.Services.StaticData
{
    public interface IStaticDataService
    {
        public Task<GetStaticDataEntities> GetStaticData();
    }
}

using Microsoft.EntityFrameworkCore;

using MovieGalleryWebAPI.Data;
using MovieGalleryWebAPI.Models.StaticData;

namespace MovieGalleryWebAPI.Services.StaticData
{
    public class StaticDataService : IStaticDataService
    {
        private readonly MovieGalleryDbContext data;

        public StaticDataService(MovieGalleryDbContext data)
        {
            this.data = data;
        }

        public async Task<GetStaticDataEntities> GetStaticData()
        {       
            var model = new GetStaticDataEntities();

            model.Countries = await GetCountries();
            model.Languages = await GetLanguages();
            model.Categories = await GetCategories();

            return model;
        }

        private async Task<List<GetStaticDataModel>> GetCountries()
        {
            return await this.data.Countries.Select(c => new GetStaticDataModel { Id = c.Id, Name = c.Name, }).ToListAsync();
        }

        private async Task<List<GetStaticDataModel>> GetLanguages()
        {
            return await this.data.Languages.Select(l => new GetStaticDataModel { Id = l.Id, Name = l.Name, }).ToListAsync();
        }

        private async Task<List<GetStaticDataModel>> GetCategories() 
        { 
            return await this.data.Categories.Select(c => new GetStaticDataModel { Id = c.Id, Name = c.Name, }).ToListAsync();
        }
    }
}

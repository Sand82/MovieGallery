namespace MovieGalleryWebAPI.Models.StaticData
{
    public class GetStaticDataEntities
    {

        public ICollection<GetStaticDataModel>? Countries { get; set; }

        public ICollection<GetStaticDataModel>? Languages { get; set; }

        public ICollection<GetStaticDataModel>? Categories { get; set; }
    }
}

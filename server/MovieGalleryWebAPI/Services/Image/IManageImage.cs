namespace MovieGalleryWebAPI.Services.Image
{
    public interface IManageImage
    {
        public Task<string> ImageManager(IFormFile formFile, int wight, int height);

        public (byte[], string) GetFile(string fileName);
    }
}

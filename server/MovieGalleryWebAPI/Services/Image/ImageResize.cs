using MovieGalleryWebAPI.Services.Image;

using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Processing;
using System.Text.RegularExpressions;

public class ManageImage : IManageImage
{
    private readonly IWebHostEnvironment env;

    public ManageImage(IWebHostEnvironment env)
    {
        this.env = env;
    }

    public async Task<string> ImageManager(IFormFile formFile, int width, int height)
    {
        using var inputStream = new MemoryStream();
        await formFile.CopyToAsync(inputStream);

        var imageBytes = await ResizeImageAsync(inputStream, width, height);

        var originalName = CreateImageName(formFile.FileName);
       
        var fileName = $"{originalName}-{width}x{height}.jpg";

        var path = await SaveToServer(imageBytes, fileName);

        return path;
    }

    private async Task<byte[]> ResizeImageAsync(Stream inputStream, int width, int height)
    {
        inputStream.Position = 0;

        using var image = await Image.LoadAsync(inputStream);
        image.Mutate(x => x.Resize(width, height));

        using var outputStream = new MemoryStream();
        await image.SaveAsJpegAsync(outputStream);
        return outputStream.ToArray();
    }

    private async Task<string> SaveToServer(byte[] fileBytes, string fileName)
    {
        var subfolder = "images";
        var folderPath = Path.Combine(env.WebRootPath, subfolder);
        Directory.CreateDirectory(folderPath);

        var filePath = Path.Combine(folderPath, fileName);

        await File.WriteAllBytesAsync(filePath, fileBytes);

        return $"/{fileName}";
    }   

    private string CreateImageName(string imageName) 
    {
        if (string.IsNullOrWhiteSpace(imageName))
        {
            return string.Empty;
        }            
        
        var sanitized = Regex.Replace(imageName, @"[^a-zA-Z0-9]+", "-");
       
        sanitized = sanitized.Trim('-');

        return sanitized;
    }
}

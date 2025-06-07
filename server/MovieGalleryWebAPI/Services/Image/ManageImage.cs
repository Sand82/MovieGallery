using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Processing;
using System.Text.RegularExpressions;

using static System.IO.File;

using MovieGalleryWebAPI.Services.Image;

public class ManageImage : IManageImage
{
    private readonly IWebHostEnvironment env;

    public ManageImage(IWebHostEnvironment env)
    {
        this.env = env;
    }

    public (byte[], string) GetFile(string fileName)
    {
        var imagePath = Path.Combine(env.WebRootPath, "images", fileName);

        //TODO null check

        var contentType = GetContentType(imagePath);
        var fileBytes = ReadAllBytes(imagePath);

        return (fileBytes, contentType);
    }

    public async Task<string> ImageManager(IFormFile formFile, int width, int height)
    {
        using var inputStream = new MemoryStream();
        await formFile.CopyToAsync(inputStream);

        var imageBytes = await ResizeImageAsync(inputStream, width, height);

        var originalName = CreateImageName(formFile.FileName);
       
        var fileName = $"{originalName}-{width}x{height}.jpg";

        await SaveToServer(imageBytes, fileName);

        return fileName;
    }

    public bool DeleteFile(string fileName)
    {
        if (string.IsNullOrWhiteSpace(fileName))
        {
            return false;
        }

        var filePath = PeakFile(fileName);
       
        if (filePath == null)
        {
            return false;
        }           

        try
        {
            File.Delete(filePath);
            return true;
        }
        catch
        {            
            return false;
        }
    }

    private string? PeakFile(string fileName)
    {
        fileName = Path.GetFileName(fileName);

        var folderPath = Path.Combine(env.WebRootPath, "images");
        var filePath = Path.Combine(folderPath, fileName);

        if (!File.Exists(filePath))
        {
            return null;
        }

        return filePath;
    }

    private string GetContentType(string path)
    {
        var ext = Path.GetExtension(path).ToLowerInvariant();
        return ext switch
        {
            ".jpg" or ".jpeg" => "image/jpeg",
            ".png" => "image/png",
            ".gif" => "image/gif",            
            _ => "application/octet-stream",
        };
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

    private async Task SaveToServer(byte[] fileBytes, string fileName)
    {
        var subfolder = "images";
        var folderPath = Path.Combine(env.WebRootPath, subfolder);
        Directory.CreateDirectory(folderPath);

        var filePath = Path.Combine(folderPath, fileName);

        await File.WriteAllBytesAsync(filePath, fileBytes);      
    }   

    private string CreateImageName(string imageName) 
    {
        var imageArr = imageName.Split(".").ToArray();

        if (string.IsNullOrWhiteSpace(imageName))
        {
            return string.Empty;
        }            
        
        var sanitized = Regex.Replace(imageArr[0], @"[^a-zA-Z0-9]+", "-");
       
        sanitized = sanitized.Trim('-');

        return sanitized;
    }    
}

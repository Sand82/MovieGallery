using MovieGalleryWebAPI.Models.Users;

namespace MovieGalleryWebAPI.Service.PasswordHelper
{
    public interface IPasswordHelper
    {
        string GeneratePassword(ApplicationUser user, string password);

        bool VerifyPassword(ApplicationUser user, string hashedPassword, string password);
    }
}

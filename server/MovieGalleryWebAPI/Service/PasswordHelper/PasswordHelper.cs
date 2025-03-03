using Microsoft.AspNetCore.Identity;
using MovieGalleryWebAPI.Models.Users;

namespace MovieGalleryWebAPI.Service.PasswordHelper
{
    public class PasswordHelper : IPasswordHelper
    {
        private readonly IPasswordHasher<ApplicationUser> passwordHasher;

        public PasswordHelper(IPasswordHasher<ApplicationUser> passwordHasher)
        {
            this.passwordHasher = passwordHasher;
        }

        public string GeneratePassword(ApplicationUser user, string password)
        {
            return passwordHasher.HashPassword(user, password);
        }

        public bool VerifyPassword(ApplicationUser user, string hashedPassword, string password)
        {
            var result = passwordHasher.VerifyHashedPassword(user, hashedPassword, password);            
            return result == PasswordVerificationResult.Success;
        }
    }
}

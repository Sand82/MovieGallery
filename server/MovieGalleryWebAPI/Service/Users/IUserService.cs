using Microsoft.AspNetCore.Identity;
using MovieGalleryWebAPI.Models.Users;

namespace MovieGalleryWebAPI.Service.Users
{
    public interface IUserService
    {
        Task<IdentityUser> CreateUser(RegisterInputModel model);

        Task<IdentityUser> FindUser(string email);
    }
}

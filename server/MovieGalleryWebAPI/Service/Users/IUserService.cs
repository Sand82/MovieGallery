using Microsoft.AspNetCore.Identity;
using MovieGalleryWebAPI.Models.Users;

namespace MovieGalleryWebAPI.Service.Users
{
    public interface IUserService
    {
        Task<IdentityUser> CreateUser(RegisterInputModel model);

        Task<UserApiModel> FindUserByEmail(string email);

        Task<UserApiModel> FindUser(string email, string password);

    }
}

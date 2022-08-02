using Microsoft.AspNetCore.Identity;
using MovieGalleryWebAPI.Models.Users;

namespace MovieGalleryWebAPI.Service.Users
{
    public interface IUserService
    {
        Task<bool> CreateUser(RegisterInputModel model);

        Task<UserApiModel> FindUserByEmail(string email);

        Task<UserApiModel> FindUser(string username, string password);

        Task<string> CreateToken(string username, string password);

    }
}

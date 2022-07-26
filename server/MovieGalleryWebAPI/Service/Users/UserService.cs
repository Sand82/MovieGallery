using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using MovieGalleryWebAPI.Data;
using MovieGalleryWebAPI.Models.Users;

namespace MovieGalleryWebAPI.Service.Users
{
    public class UserService : IUserService
    {
        private readonly MovieGalleryDbContext data;

        public UserService(MovieGalleryDbContext data)
        {
            this.data = data;
        }

        public async Task<IdentityUser> CreateUser(RegisterInputModel model)
        {
            var user = new IdentityUser
            {
                Email = model.Email,
                PasswordHash = model.Password,
            };

            await data.Users.AddAsync(user);

            await data.SaveChangesAsync();

            return user;
        }

        public async Task<IdentityUser> FindUser(string email)
        {
            var user = await data.Users.FirstOrDefaultAsync(u => u.Email == email);

            return user;
        }
    }
}

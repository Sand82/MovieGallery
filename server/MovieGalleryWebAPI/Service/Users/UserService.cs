using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using MovieGalleryWebAPI.Data;
using MovieGalleryWebAPI.Models.Users;

namespace MovieGalleryWebAPI.Service.Users
{
    public class UserService : IUserService
    {
        private readonly MovieGalleryDbContext data;
        private readonly IMapper mapper;

        public UserService(MovieGalleryDbContext data, IMapper mapper)
        {
            this.data = data;
            this.mapper = mapper;
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

        public async Task<UserApiModel> FindUser(string email, string password)
        {
            var user = await data.Users
                .Where(u => u.Email == email && u.PasswordHash == password)
                .ProjectTo<UserApiModel>(this.mapper.ConfigurationProvider)
                //.Select(u => new UserApiModel
                //{
                //    Id = u.Id,
                //    Password = u.PasswordHash,
                //    Email = u.Email,
                //})
                .FirstOrDefaultAsync();

            return user;
        }

        public async Task<UserApiModel> FindUserByEmail(string email)
        {
            var user = await data.Users.Where(u => u.Email == email)
                .ProjectTo<UserApiModel>(this.mapper.ConfigurationProvider)
                .FirstOrDefaultAsync();

            return user;
        }
    }
}

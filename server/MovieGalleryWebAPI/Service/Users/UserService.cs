using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using MovieGalleryWebAPI.Data;
using MovieGalleryWebAPI.Models.Users;
using MovieGalleryWebAPI.Settings;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace MovieGalleryWebAPI.Service.Users
{
    public class UserService : IUserService
    {
        private readonly MovieGalleryDbContext data;
        private readonly IMapper mapper;
        private readonly IOptions<JwtSettings> jwtSettings;

        public UserService(MovieGalleryDbContext data, 
            IMapper mapper, 
            IOptions<JwtSettings> jwtSettings
            )
        {
            this.data = data;
            this.mapper = mapper;
            this.jwtSettings = jwtSettings;
        }

        public async Task<bool> CreateUser(RegisterInputModel model)
        {

            var user = new IdentityUser
            {
                UserName = model.UserName,
                Email = model.Email,
                PasswordHash = model.Password,               
            };

            await data.Users.AddAsync(user);

            await data.SaveChangesAsync();

            return true;
        }

        public async Task<UserApiModel> FindUser(string username, string password)
        {
            var user = await data.Users
                .Where(u => u.UserName == username && u.PasswordHash == password)
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

        public async Task<string> CreateToken (string username, string password)
        {
            var user = await this.data.Users.FirstOrDefaultAsync(
                x => x.UserName == username && x.PasswordHash == password);

            if (user == null)
            {
                return null;
            }

            var token = TokenGenerate(user);

            return token;
        }

        private string TokenGenerate(IdentityUser user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(this.jwtSettings.Value.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.UserName), // can do with email too !!!
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha256Signature
                )
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            var jwt = tokenHandler.WriteToken(token);

            return jwt;
        }
    }
}

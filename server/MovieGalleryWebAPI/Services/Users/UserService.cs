using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using AutoMapper;
using AutoMapper.QueryableExtensions;

using MovieGalleryWebAPI.Data;
using MovieGalleryWebAPI.Models.Users;
using MovieGalleryWebAPI.Settings;

namespace MovieGalleryWebAPI.Service.Users
{
    public class UserService : IUserService
    {
        private readonly MovieGalleryDbContext data;
        private readonly IMapper mapper;
        private readonly IOptions<JwtSettings> jwtSettings;
        private readonly IPasswordHasher<string> passwordHasher;

        public UserService(MovieGalleryDbContext data, 
            IMapper mapper, 
            IOptions<JwtSettings> jwtSettings,
            IPasswordHasher<string> passwordHasher
            )
        {
            this.data = data;
            this.mapper = mapper;
            this.jwtSettings = jwtSettings;
            this.passwordHasher = passwordHasher;
        }

        public async Task<bool> CreateUser(RegisterInputModel model)
        {
            var currPassword = passwordHasher.HashPassword(null ,model.Password);
            var user = new IdentityUser
            {
                UserName = model.UserName,
                Email = model.Email,
                PasswordHash = currPassword
            };

            await data.Users.AddAsync(user);

            await data.SaveChangesAsync();

            return true;
        }

        public async Task<UserApiModel> FindUser(string username, string password)
        {

            var user = await FindIdentityUser(username);

            if (user == null)
            {
                return null;
            }            
           
            var result = passwordHasher.VerifyHashedPassword(null, user.PasswordHash, password);

            if (result != PasswordVerificationResult.Success)
            {
                return null;             
            }
            
            return new UserApiModel
            {
                Id = user.Id,
                Email = user.Email,
                Username = user.UserName
            };
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
            var user = await FindIdentityUser(username);

            if (user == null)
            {
                return null;
            }

            var token = TokenGenerator(user);

            return token;
        }

        private string TokenGenerator(IdentityUser user)
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

        public async Task<bool> CheckIsAdmin(string userId)
        {
            return await this.data.UserRoles.AnyAsync(x => x.UserId == userId);
        }

        private async Task<IdentityUser> FindIdentityUser(string username)
        {
            var user = await data.Users
                .Where(u => u.UserName == username)
                .FirstOrDefaultAsync();
            return user;
        }
    }
}

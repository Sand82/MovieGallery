using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;

using MovieGalleryWebAPI.Settings;
using MovieGalleryWebAPI.Data;
using MovieGalleryWebAPI.Infrastructure;
using MovieGalleryWebAPI.Service.Movies;
using MovieGalleryWebAPI.Service.Users;
using MovieGalleryWebAPI.Service.Comments;
using MovieGalleryWebAPI.Service.Ratings;
using MovieGalleryWebAPI.Service.Favorites;
using MovieGalleryWebAPI.Services.StaticData;
using MovieGalleryWebAPI.Services.MovieCompany;
using MovieGalleryWebAPI.Services.MovieDirectors;
using MovieGalleryWebAPI.Services.MoviesStarring;
using MovieGalleryWebAPI.Services.MovieCountries;
using MovieGalleryWebAPI.Services.MovieLanguages;
using MovieGalleryWebAPI.Services.MovieCategories;
using MovieGalleryWebAPI.Services.MovieTags;
using MovieGalleryWebAPI.Services.Image;

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddDbContext<MovieGalleryDbContext>(options =>
    options.UseSqlServer(connectionString));
builder.Services.AddDatabaseDeveloperPageExceptionFilter();

var jwtSettingsSection =
    builder.Configuration.GetSection("JwtSettings");
builder.Services.Configure<JwtSettings>(jwtSettingsSection);

var jwtSettings = jwtSettingsSection.Get<JwtSettings>();
var key = Encoding.ASCII.GetBytes(jwtSettings.Secret!);
builder.Services.AddAuthentication(x =>
{
    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(option =>
{
    option.RequireHttpsMetadata = false;
    option.SaveToken = true;
    option.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(key),
        ValidateIssuer = false,
        ValidateAudience = false,
    };
});

builder.
    Services.
    AddDefaultIdentity<IdentityUser>(options =>
    {
        options.Password.RequireDigit = false;
        options.Password.RequireLowercase = false;
        options.Password.RequireNonAlphanumeric = false;
        options.Password.RequireUppercase = false;
        //options.Lockout.MaxFailedAccessAttempts = 5;
        //options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(30);
        //options.User.RequireUniqueEmail = true;
    })
    .AddRoles<IdentityRole>()
    .AddEntityFrameworkStores<MovieGalleryDbContext>();

builder.Services.AddControllersWithViews();
builder.Services.AddTransient<IMoviesService, MoviesService>();
builder.Services.AddTransient<IUserService, UserService>();
builder.Services.AddTransient<ICommentService, CommentService>();
builder.Services.AddTransient<IRatingService, RatingService>();
builder.Services.AddTransient<IFavoriteService, FavoriteController>();
builder.Services.AddTransient<IStaticDataService, StaticDataService>();
builder.Services.AddTransient<ICompanyService, CompanyService>();
builder.Services.AddTransient<IMovieDirectorsService, MovieDirectorsService>();
builder.Services.AddTransient<IMovieStarringService, MovieStarringService>();
builder.Services.AddTransient<IMovieCountriesService, MovieCountriesService>();
builder.Services.AddTransient<IMovieLanguageService, MovieLanguageService>();
builder.Services.AddTransient<IMovieCategoryService, MovieCategoryService>();
builder.Services.AddTransient<IMovieTagService, MovieTagService>();
builder.Services.AddTransient<IManageImage, ManageImage>();
builder.Services.AddScoped<IPasswordHasher<string>, PasswordHasher<string>>();

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
    policy =>
    {
        policy.WithOrigins("http://localhost:3000", "http://localhost:3000/login");
    });
});

builder.Services.AddAutoMapper(typeof(Program).Assembly);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "My API",
        Version = "v1",
        Description = "ASP.NET Core 6 Web API with Swagger",
    });
});

var app = builder.Build();

app.PrepareDatabase();

if (app.Environment.IsDevelopment())
{
    app.UseMigrationsEndPoint();

    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API v1");
        c.RoutePrefix = "";
    });
}
else
{
    app.UseExceptionHandler("/Home/Error");    
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();
app.UseCors(x => x
        .AllowAnyOrigin()
        .AllowAnyMethod()
        .AllowAnyHeader());

app.UseAuthentication();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");
app.MapRazorPages();

app.Run();

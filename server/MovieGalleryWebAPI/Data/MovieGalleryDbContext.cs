using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using MovieGalleryWebAPI.Data.Models;

namespace MovieGalleryWebAPI.Data
{
    public class MovieGalleryDbContext : IdentityDbContext
    {
        public MovieGalleryDbContext(DbContextOptions<MovieGalleryDbContext> options)
            : base(options)
        {
        }

        public DbSet<Movie> Movies { get; set; }
    }
}
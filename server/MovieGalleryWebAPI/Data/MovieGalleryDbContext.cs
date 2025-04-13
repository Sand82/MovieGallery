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

        public DbSet<Comment> Comments { get; set; }

        public DbSet<Rating> Ratings { get; set; }

        public DbSet<Favorite> Favorites { get; set; }

        public DbSet<Starring> Starring { get; set; }

        public DbSet<MovieStarring> MovieStarrings { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<MovieStarring>()
                .HasKey(ms => new { ms.MovieId, ms.StarringId });

            modelBuilder.Entity<MovieStarring>()
                .HasOne(ms => ms.Movie)
                .WithMany(m => m.MovieStarrings)
                .HasForeignKey(ms => ms.MovieId);

            modelBuilder.Entity<MovieStarring>()
                .HasOne(ms => ms.Starring)
                .WithMany(s => s.MovieStarrings)
                .HasForeignKey(ms => ms.StarringId);
        }
    }
}
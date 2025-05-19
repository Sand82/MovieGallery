using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

using MovieGalleryWebAPI.Data.Models;

namespace MovieGalleryWebAPI.Data
{
    public class MovieGalleryDbContext : IdentityDbContext
    {
        public MovieGalleryDbContext(DbContextOptions<MovieGalleryDbContext> options)
            : base(options)
        {}

        public DbSet<Movie> Movies { get; set; }

        public DbSet<Comment> Comments { get; set; }

        public DbSet<Rating> Ratings { get; set; }

        public DbSet<Favorite> Favorites { get; set; }

        public DbSet<Starring> Starring { get; set; }

        public DbSet<Director> Directors { get; set; }

        public DbSet<Company> Companies { get; set; }

        public DbSet<Country> Countries { get; set; }

        public DbSet<Language> Languages { get; set; }

        public DbSet<Category> Categories { get; set; }

        public DbSet<MovieStarring> MovieStarrings { get; set; }

        public DbSet<MovieDirector> MovieDirectors { get; set; }

        public DbSet<MovieCountry> MovieCountries { get; set; }

        public DbSet<MovieLanguage> MovieLanguages { get; set; }        

        public DbSet<MovieCategory> MovieCategories { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Movie>()
                .Property(m => m.Id)
                .ValueGeneratedOnAdd();

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

            modelBuilder.Entity<MovieDirector>()
                .HasKey(md => new { md.MovieId, md.DirectorId });

            modelBuilder.Entity<MovieDirector>()
                .HasOne(md => md.Movie)
                .WithMany(m => m.MovieDirectors)
                .HasForeignKey(md => md.MovieId);

            modelBuilder.Entity<MovieDirector>()
                .HasOne(md => md.Director)
                .WithMany(m => m.MovieDirectors)
                .HasForeignKey(md => md.DirectorId);

            modelBuilder.Entity<MovieCountry>()
               .HasKey(mc => new { mc.MovieId, mc.CountryId });

            modelBuilder.Entity<MovieCountry>()
                .HasOne(mc => mc.Movie)
                .WithMany(m => m.MovieCountries)
                .HasForeignKey(mc => mc.MovieId);

            modelBuilder.Entity<MovieCountry>()
                .HasOne(mc => mc.Country)
                .WithMany(c => c.MovieCountries)
                .HasForeignKey(mc => mc.CountryId);

            modelBuilder.Entity<MovieLanguage>()
               .HasKey(ml => new { ml.MovieId, ml.LanguageId });

            modelBuilder.Entity<MovieLanguage>()
                .HasOne(ml => ml.Movie)
                .WithMany(m => m.MovieLanguages)
                .HasForeignKey(ml => ml.MovieId);

            modelBuilder.Entity<MovieLanguage>()
                .HasOne(ml => ml.Language)
                .WithMany(l => l.MovieLanguages)
                .HasForeignKey(ml => ml.LanguageId);

            modelBuilder.Entity<MovieCategory>()
               .HasKey(mc => new { mc.MovieId, mc.CategoryId });

            modelBuilder.Entity<MovieCategory>()
                .HasOne(mc => mc.Movie)
                .WithMany(m => m.MovieCategories)
                .HasForeignKey(mc => mc.MovieId);

            modelBuilder.Entity<MovieCategory>()
                .HasOne(mc => mc.Category)
                .WithMany(c => c.MovieCategories)
                .HasForeignKey(mc => mc.CategoryId);

            modelBuilder.Entity<Movie>()
                .HasOne(m => m.Company)
                .WithMany(c => c.Movies)
                .HasForeignKey(m => m.CompanyId);              
        }
    }
}
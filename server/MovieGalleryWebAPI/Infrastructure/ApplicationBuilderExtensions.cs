using Microsoft.EntityFrameworkCore;
using MovieGalleryWebAPI.Data;
using MovieGalleryWebAPI.Data.Models;

namespace MovieGalleryWebAPI.Infrastructure
{
    public static class ApplicationBuilderExtensions
    {
        public static IApplicationBuilder PrepareDatabase(
         this IApplicationBuilder app)
        {
            var scolpedServices = app.ApplicationServices.CreateScope();
            var serviceProvider = scolpedServices.ServiceProvider;

            var data = serviceProvider.GetRequiredService<MovieGalleryDbContext>();

            //var webHostEnvironment = serviceProvider.GetRequiredService<IWebHostEnvironment>();

            data.Database.Migrate();

            SeedMovies(data);

            return app;
        }

        private static void SeedMovies(MovieGalleryDbContext data)
        {
            if (data.Movies.Any())
            {
                return;
            }

            var movies = new List<Movie>();

            movies.Add(new Movie
            {
                Title = "Obi-Wan Kenobi",
                Year = "2022",
                ImageUrl = "https://m.media-amazon.com/images/M/MV5BOTAxOTlmOTAtMjA0Yy00YjVjLWE3OTQtYjAzMWMxOTAwZTY1XkEyXkFqcGdeQXVyMTM1MTE1NDMx._V1_UX67_CR0,0,67,98_AL_.jpg",
                Description = "Jedi Master Obi-Wan Kenobi has to save young Leia after she is kidnapped, all the while being pursued by Imperial Inquisitors and his former Padawan, now known as Darth Vader.",
                Category = "Adventure",
            }) ;

            movies.Add(new Movie
            {
                Title = "Thor: Love and Thunder",
                Year = "2022",
                ImageUrl = "https://m.media-amazon.com/images/M/MV5BYmMxZWRiMTgtZjM0Ny00NDQxLWIxYWQtZDdlNDNkOTEzYTdlXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_UX67_CR0,0,67,98_AL_.jpg",
                Description = "Thor enlists the help of Valkyrie, Korg and ex-girlfriend Jane Foster to fight Gorr the God Butcher, who intends to make the gods extinct.",
                Category = "Action",

            });

            movies.Add(new Movie
            {
                Title = "The Lord of the Rings: The Fellowship of the Ring",
                Year = "2001",
                ImageUrl = "https://m.media-amazon.com/images/M/MV5BN2EyZjM3NzUtNWUzMi00MTgxLWI0NTctMzY4M2VlOTdjZWRiXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_UX67_CR0,0,67,98_AL_.jpg",
                Description = "A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.",
                Category = "Adventure",
            });

            movies.Add(new Movie
            {
                Title = "The Lord of the Rings: The Two Towers",
                Year = "2002",
                ImageUrl = "https://m.media-amazon.com/images/M/MV5BZGMxZTdjZmYtMmE2Ni00ZTdkLWI5NTgtNjlmMjBiNzU2MmI5XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_UX67_CR0,0,67,98_AL_.jpg",
                Description = "While Frodo and Sam edge closer to Mordor with the help of the shifty Gollum, the divided fellowship makes a stand against Sauron's new ally, Saruman, and his hordes of Isengard.",
                Category = "Adventure",
            });

            movies.Add(new Movie
            {
                Title = "The Lord of the Rings: The Return of the King",
                Year = "2003",
                ImageUrl = "https://m.media-amazon.com/images/M/MV5BNzA5ZDNlZWMtM2NhNS00NDJjLTk4NDItYTRmY2EwMWZlMTY3XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_UX67_CR0,0,67,98_AL_.jpg",
                Description = "Gandalf and Aragorn lead the World of Men against Sauron's army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.",
                Category = "Adventure",
            });

            movies.Add(new Movie
            {
                Title = "Heat",
                Year = "1995",
                ImageUrl = "https://m.media-amazon.com/images/M/MV5BYjZjNTJlZGUtZTE1Ny00ZDc4LTgwYjUtMzk0NDgwYzZjYTk1XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_UY98_CR0,0,67,98_AL_.jpg",
                Description = "A group of high-end professional thieves start to feel the heat from the LAPD when they unknowingly leave a clue at their latest heist.",
                Category = "Action",
            });

            movies.Add(new Movie
            {
                Title = "Top Gun: Maverick",
                Year = "2021",
                ImageUrl = "https://m.media-amazon.com/images/M/MV5BOWQwOTA1ZDQtNzk3Yi00ZmVmLWFiZGYtNjdjNThiYjJhNzRjXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_UY98_CR0,0,67,98_AL_.jpg",
                Description = "After more than thirty years of service as one of the Navy's top aviators, Pete Mitchell is where he belongs, pushing the envelope as a courageous test pilot and dodging the advancement in rank that would ground him.",
                Category = "Action",

            });

            //movies.Add(new Movie
            //{
            //    Title = "",
            //    Year = "",
            //    ImageUrl = "",
            //    Description = "",
            //    Category = "",

            //});

            data.Movies.AddRange(movies);
            data.SaveChanges();
        }
    }
}

using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using static MovieGalleryWebAPI.GlobalConstans;

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

            SeedAdministrator(serviceProvider);

            SeedMovies(data);

            return app;
        }
        private static void SeedAdministrator(IServiceProvider service)
        {
            var userMager = service.GetRequiredService<UserManager<IdentityUser>>();
            var roleManager = service.GetRequiredService<RoleManager<IdentityRole>>();

            Task
                .Run(async () =>
                {
                    if (await roleManager.RoleExistsAsync(AdministratorRoleName))
                    {
                        return;
                    }

                    var role = new IdentityRole { Name = AdministratorRoleName };

                    await roleManager.CreateAsync(role);

                    var author = new IdentityUser
                    {
                        Email = "sandoki@abv.bg",
                        UserName = "sandoki",
                        PasswordHash = "123456"
                    };

                    await userMager.CreateAsync(author, "123456");

                    await userMager.AddToRoleAsync(author, role.Name);
                })
                .GetAwaiter()
                .GetResult();
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
                Category = "Adventure",
                Year = "2022",
                ImageUrl = "https://zamunda-net.com/wp-content/uploads/2022/03/obi-wan-kenobi-season-1-2.jpg",
                Description = "Jedi Master Obi-Wan Kenobi has to save young Leia after she is kidnapped, all the while being pursued by Imperial Inquisitors and his former Padawan, now known as Darth Vader.",                
                Duration = "150",
            }) ;

            movies.Add(new Movie
            {
                Title = "Thor: Love and Thunder",
                Year = "2022",
                ImageUrl = "https://m.media-amazon.com/images/M/MV5BYmMxZWRiMTgtZjM0Ny00NDQxLWIxYWQtZDdlNDNkOTEzYTdlXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg",
                Description = "Thor enlists the help of Valkyrie, Korg and ex-girlfriend Jane Foster to fight Gorr the God Butcher, who intends to make the gods extinct.",
                Category = "Action",
                Duration = "130",

            });

            movies.Add(new Movie
            {
                Title = "The Lord of the Rings: The Fellowship of the Ring",
                Year = "2001",
                ImageUrl = "https://m.media-amazon.com/images/M/MV5BN2EyZjM3NzUtNWUzMi00MTgxLWI0NTctMzY4M2VlOTdjZWRiXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_.jpg",
                Description = "A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.",
                Category = "Adventure",
                Duration = "180",
            });

            movies.Add(new Movie
            {
                Title = "The Lord of the Rings: The Two Towers",
                Year = "2002",
                ImageUrl = "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/9136/9136263_so.jpg",
                Description = "While Frodo and Sam edge closer to Mordor with the help of the shifty Gollum, the divided fellowship makes a stand against Sauron's new ally, Saruman, and his hordes of Isengard.",
                Category = "Adventure",
                Duration = "180",
            });

            movies.Add(new Movie
            {
                Title = "The Lord of the Rings: The Return of the King",
                Year = "2003",
                ImageUrl = "https://m.media-amazon.com/images/M/MV5BNzA5ZDNlZWMtM2NhNS00NDJjLTk4NDItYTRmY2EwMWZlMTY3XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_FMjpg_UX1000_.jpg",
                Description = "Gandalf and Aragorn lead the World of Men against Sauron's army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.",
                Category = "Adventure",
                Duration = "160"
            });

            movies.Add(new Movie
            {
                Title = "Heat",
                Year = "1995",
                ImageUrl = "https://m.media-amazon.com/images/M/MV5BYjZjNTJlZGUtZTE1Ny00ZDc4LTgwYjUtMzk0NDgwYzZjYTk1XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_FMjpg_UX1000_.jpg",
                Description = "A group of high-end professional thieves start to feel the heat from the LAPD when they unknowingly leave a clue at their latest heist.",
                Category = "Action",
                Duration = "180",
            });

            movies.Add(new Movie
            {
                Title = "Top Gun: Maverick",
                Year = "2021",
                ImageUrl = "https://images.fandango.com/ImageRenderer/0/0/redesign/static/img/default_poster.png/0/images/masterrepository/Fandango/219625/tgmdomonlinedigitalkeyartt-cruisestandingjetv10.jpg",
                Description = "After more than thirty years of service as one of the Navy's top aviators, Pete Mitchell is where he belongs, pushing the envelope as a courageous test pilot and dodging the advancement in rank that would ground him.",
                Category = "Action",
                Duration = "140",

            });

            movies.Add(new Movie
            {
                Title = "The Godfather Part II",
                Year = "1974",
                ImageUrl = "https://m.media-amazon.com/images/M/MV5BMWMwMGQzZTItY2JlNC00OWZiLWIyMDctNDk2ZDQ2YjRjMWQ0XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
                Description = "220",
                Category = "Crime",
                Duration = "210",

            });

            movies.Add(new Movie
            {
                Title = "The Godfather",
                Year = "1972",
                ImageUrl = "https://images-na.ssl-images-amazon.com/images/I/714ZOEiVNtL._RI_.jpg",
                Description = "The aging patriarch of an organized crime dynasty in postwar New York City transfers control of his clandestine empire to his reluctant youngest son.",
                Category = "Crime",
                Duration = "175",

            });

            movies.Add(new Movie
            {
                Title = "The Fast and the Furious",
                Year = "2001",
                ImageUrl = "http://vignette1.wikia.nocookie.net/fastandfurious/images/0/04/The_Fast_and_the_Furious_%28DVD_Cover%29.jpeg/revision/latest?cb=20150501043627",
                Description = "Los Angeles police officer Brian O'Conner must decide where his loyalty really lies when he becomes enamored with the street racing world he has been sent undercover to destroy.",
                Category = "Adventure",
                Duration = "105",
            });

            movies.Add(new Movie
            {
                Title = "F9: The Fast Saga",
                Year = "2021",
                ImageUrl = "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6469/6469286_so.jpg",
                Description = "Dom and the crew must take on an international terrorist who turns out to be Dom and Mia's estranged brother.",
                Category = "Action",
                Duration = "143",

            });

            movies.Add(new Movie
            {
                Title = "Die hard",
                Year = "1981",
                ImageUrl = "https://images-na.ssl-images-amazon.com/images/I/819cf1ZR2WL.jpg",
                Description = "An NYPD officer tries to save his wife and several others taken hostage by German terrorists during a Christmas party at the Nakatomi Plaza in Los Angeles.",
                Category = "Action",
                Duration = "132",

            });

            movies.Add(new Movie
            {
                Title = "Die hard 2",
                Year = "1990",
                ImageUrl = "https://m.media-amazon.com/images/M/MV5BZjI0ZWFiMmQtMjRlZi00ZmFhLWI4NmYtMjQ5YmY0MzIyMzRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg",
                Description = "John McClane attempts to avert disaster as rogue military operatives seize control of Dulles International Airport in Washington, D.C.",
                Category = "Action",
                Duration = "124",

            });

            movies.Add(new Movie
            {
                Title = "Die Hard with a Vengeance",
                Year = "1995",
                ImageUrl = "https://image.tmdb.org/t/p/original/sOqB9iMEcbGhAgH70dbs8U58UW5.jpg",
                Description = "128",
                Category = "Action",
                Duration = "John McClane and a Harlem store owner are targeted by German terrorist Simon in New York City, where he plans to rob the Federal Reserve Building.",

            });

            movies.Add(new Movie
            {
                Title = "Live Free or Die Hard",
                Year = "2007",
                ImageUrl = "https://m.media-amazon.com/images/M/MV5BNDQxMDE1OTg4NV5BMl5BanBnXkFtZTcwMTMzOTQzMw@@._V1_.jpg",
                Description = "128",
                Category = "Action",
                Duration = "John McClane and a young hacker join forces to take down master cyber-terrorist Thomas Gabriel in Washington D.C.",

            });

            movies.Add(new Movie
            {
                Title = "Beautiful mind",
                Year = "2001",
                ImageUrl = "https://images-na.ssl-images-amazon.com/images/I/61uzUoS79LL.jpg",
                Description = "After John Nash, a brilliant but asocial mathematician, accepts secret work in cryptography, his life takes a turn for the nightmarish.",
                Category = "Drama",
                Duration = "135",

            });        

            movies.Add(new Movie
            {
                Title = "Cinderella Man",
                Year = "2005",
                ImageUrl = "https://m.media-amazon.com/images/I/81vHUrHKLKL._SL1500_.jpg",
                Description = "145",
                Category = "Drama",
                Duration = "The story of James J. Braddock, a supposedly washed-up boxer who came back to challenge for the heavyweight championship of the world.",

            });        

            movies.Add(new Movie
            {
                Title = "The Shawshank Redemption",
                Year = "1994",
                ImageUrl = "https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_FMjpg_UX1000_.jpg",
                Description = "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
                Category = "Drama",
                Duration = "142",

            });

            movies.Add(new Movie
            {
                Title = "Million Dollar Baby",
                Year = "2004",
                ImageUrl = "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/7170/7170018_so.jpg",
                Description = "A determined woman works with a hardened boxing trainer to become a professional.",
                Category = "Drama",
                Duration = "142",
            });

            //movies.Add(new Movie
            //{
            //    Title = "",
            //    Year = "",
            //    ImageUrl = "",
            //    Description = "",
            //    Category = "",
            //    Duration = "",
            //});

            data.Movies.AddRange(movies);
            data.SaveChanges();
        }
    }
}

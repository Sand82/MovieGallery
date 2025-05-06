using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

using static MovieGalleryWebAPI.GlobalConstans;

using MovieGalleryWebAPI.Data;
using MovieGalleryWebAPI.Data.Models;
using MovieGalleryWebAPI.Models.Seed;

namespace MovieGalleryWebAPI.Infrastructure
{
    public static class ApplicationBuilderExtensions
    {
        
        public static IApplicationBuilder PrepareDatabase(
         this IApplicationBuilder app)
        {
            using var scopedServices = app.ApplicationServices.CreateScope();
            var serviceProvider = scopedServices.ServiceProvider;

            var data = serviceProvider.GetRequiredService<MovieGalleryDbContext>();            

            data.Database.Migrate();

            SeedAdministrator(serviceProvider);

            SeedStarring(data);

            SeedDirectors(data);

            SeedCompanies(data);

            SeedMovies(data);

            return app;
        }
        private static void SeedAdministrator(IServiceProvider service)
        {
            var userMagner = service.GetRequiredService<UserManager<IdentityUser>>();
            var roleManager = service.GetRequiredService<RoleManager<IdentityRole>>();
            var passwordHasher = service.GetRequiredService<IPasswordHasher<IdentityUser>>();

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
                    };                   

                    await userMagner.CreateAsync(author, "123456");

                    await userMagner.AddToRoleAsync(author, role.Name);
                })
                .GetAwaiter()
                .GetResult();
        }       

        private static void SeedStarring(MovieGalleryDbContext data)
        {
            if (data.Starring.Any())
            {
                return;
            }

            var starring = new List<Starring>();

            //Seed starring
            starring.Add(new Starring { Name = "Ewan McGregor" });
            starring.Add(new Starring { Name = "Moses Ingram" });
            starring.Add(new Starring { Name = "Vivien Lyra Blair" });
            starring.Add(new Starring { Name = "Hayden Christensen" });            
            starring.Add(new Starring { Name = "Chris Hemsworth" });
            starring.Add(new Starring { Name = "Natalie Portman" });
            starring.Add(new Starring { Name = "Christian Bale" });
            starring.Add(new Starring { Name = "Tessa Thompson" });
            starring.Add(new Starring { Name = "Russell Crowe" });
            starring.Add(new Starring { Name = "Idris Elba" });
            starring.Add(new Starring { Name = "Chris Pratt" });            
            starring.Add(new Starring { Name = "Sean Bean" });
            starring.Add(new Starring { Name = "Cate Blanchett" });
            starring.Add(new Starring { Name = "Orlando Bloom" });
            starring.Add(new Starring { Name = "Ian McKellen" });
            starring.Add(new Starring { Name = "Viggo Mortensen" });
            starring.Add(new Starring { Name = "Elijah Wood" });  
            starring.Add(new Starring { Name = "Al Pacino" });
            starring.Add(new Starring { Name = "Robert De Niro"});
            starring.Add(new Starring { Name = "Val Kilmer" });
            starring.Add(new Starring { Name = "Jon Voight" });
            starring.Add(new Starring { Name = "Ashley Judd" });
            starring.Add(new Starring { Name = "Tom Cruise" });
            starring.Add(new Starring { Name = "Jennifer Connelly"});
            starring.Add(new Starring { Name = "Robert Duvall" });
            starring.Add(new Starring { Name = "Diane Keaton" });
            starring.Add(new Starring { Name = "Marlon Brando" });
            starring.Add(new Starring { Name = "James Caan" });
            starring.Add(new Starring { Name = "Vin Diesel" });
            starring.Add(new Starring { Name = "Paul Walker" });
            starring.Add(new Starring { Name = "Michelle Rodriguez" });
            starring.Add(new Starring { Name = "Tyrese Gibson" });
            starring.Add(new Starring { Name = "Charlize Theron" });
            starring.Add(new Starring { Name = "John Cena" });
            starring.Add(new Starring { Name = "Kurt Russell" });
            starring.Add(new Starring { Name = "Bruce Willis" });
            starring.Add(new Starring { Name = "Alan Rickman" });
            starring.Add(new Starring { Name = "Bonnie Bedelia" });
            starring.Add(new Starring { Name = "Jeremy Irons" });
            starring.Add(new Starring { Name = "Samuel L. Jackson" });
            starring.Add(new Starring { Name = "Graham Greene" });
            starring.Add(new Starring { Name = "Justin Long" });
            starring.Add(new Starring { Name = "Timothy Olyphant" });
            starring.Add(new Starring { Name = "Maggie Q" });
            starring.Add(new Starring { Name = "Ed Harris" });
            starring.Add(new Starring { Name = "Christopher Plummer"});
            starring.Add(new Starring { Name = "Renée Zellweger" });
            starring.Add(new Starring { Name = "Paul Giamatti" });
            starring.Add(new Starring { Name = "Bruce McGill" });
            starring.Add(new Starring { Name = "Tim Robbins" });
            starring.Add(new Starring { Name = "Morgan Freeman" });
            starring.Add(new Starring { Name = "Clancy Brown" });
            starring.Add(new Starring { Name = "Hilary Swank" });
            starring.Add(new Starring { Name = "Clint Eastwood" });
            starring.Add(new Starring { Name = "Anthony Mackie" });
            starring.Add(new Starring { Name = "Michael Peña" });
            
            starring.Distinct().ToList();

            data.Starring.AddRange(starring);
            data.SaveChanges();
        }

        private static void SeedDirectors(MovieGalleryDbContext data)
        {
            if (data.Directors.Any())
            {
                return;
            }

            var directors = new List<Director>();
           
            //seed directors
            directors.Add(new Director { Name = "Joby Harold" });            
            directors.Add(new Director { Name = "Taika Waititi" });
            directors.Add(new Director { Name = "Peter Jackson" });            
            directors.Add(new Director { Name = "Michael Mann" });
            directors.Add(new Director { Name = "Joseph Kosinski" });
            directors.Add(new Director { Name = "Francis Ford Coppola" });            
            directors.Add(new Director { Name = "Rob Cohen" });        
            directors.Add(new Director { Name = "Justin Lin" });           
            directors.Add(new Director { Name = "John McTiernan" });           
            directors.Add(new Director { Name = "Renny Harlin" });            
            directors.Add(new Director { Name = "John McTiernan" });        
            directors.Add(new Director { Name = "Len Wiseman" });            
            directors.Add(new Director { Name = "Ron Howard" });            
            directors.Add(new Director { Name = "Ron Howard" });            
            directors.Add(new Director { Name = "Frank Darabont" });            
            directors.Add(new Director { Name = "Clint Eastwood" });

            directors.Distinct().ToList();

            data.Directors.AddRange(directors);
            data.SaveChanges();
        }

        private static void SeedCompanies(MovieGalleryDbContext data)
        {
            if (data.Companies.Any())
            {
                return;
            }

            var companies = new List<Company>();

            //seed companies
            companies.Add(new Company { Name = "Lucasfilm" });
            companies.Add(new Company { Name = "Marvel Studios" });
            companies.Add(new Company { Name = "New Line Cinema" });
            companies.Add(new Company { Name = "Warner Bros" });
            companies.Add(new Company { Name = "Paramount Pictures" });
            companies.Add(new Company { Name = "Universal Pictures" });
            companies.Add(new Company { Name = "One Race Films" });
            companies.Add(new Company { Name = "Twentieth Century Fox" });
            companies.Add(new Company { Name = "Cinergi Pictures Entertainment" });
            companies.Add(new Company { Name = "Castle Rock Entertainment" });            

            companies.Distinct().ToList();

            data.Companies.AddRange(companies);
            data.SaveChanges();
        }

        private static void SeedMovies(MovieGalleryDbContext data)
        {
            if (data.Movies.Any())
            {
                return;
            }                  

            var moviesInfo = new List<SeedMovies>();

            moviesInfo.Add(new SeedMovies
            {
                Title = "Obi-Wan Kenobi",
                Category = "Adventure",
                Year = "2022",
                ImageUrl = "https://zamunda-net.com/wp-content/uploads/2022/03/obi-wan-kenobi-season-1-2.jpg",
                Description = "<h3>Storyline</h3>\n<p>Jedi Master Obi-Wan Kenobi has to save young Leia after she is kidnapped, all the while being pursued by Imperial Inquisitors and his former Padawan, now known as Darth Vader.</p>",
                Duration = "150",
                EmbededVideo = "3Yh_6_zItPU?si=dk1ssOZsTDw_kog0",
                StartingString = "Ewan McGregor,Moses Ingram,Vivien Lyra Blair,Hayden Christensen",
                DirectorsString = "Joby Harold",
                ReleaseInfo = "TV Mini Series, May 27 2022 (United States), TV-14",
                Company = "Lucasfilm",
                CountryString = "United States",
                LanguageString = "English",
            });


            moviesInfo.Add(new SeedMovies
            {
                Title = "Thor: Love and Thunder",
                Year = "2022",
                ImageUrl = "https://m.media-amazon.com/images/M/MV5BYmMxZWRiMTgtZjM0Ny00NDQxLWIxYWQtZDdlNDNkOTEzYTdlXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg",
                Description = "<h3>Storyline</h3>\n<p>Thor's retirement is interrupted by a galactic killer known as Gorr the God Butcher, who seeks the extinction of the gods. To combat the threat, Thor enlists the help of King Valkyrie, Korg and ex-girlfriend Jane Foster, who - to Thor's surprise - inexplicably wields his magical hammer, Mjolnir, as the Mighty Thor. Together, they embark upon a harrowing cosmic adventure to uncover the mystery of the God Butcher's vengeance and stop him before it's too late.</p>",
                Category = "Action",
                Duration = "130",
                EmbededVideo = "Go8nTmfrQd8?si=inrwJR4btkt0Dv_h",
                StartingString = "Chris Hemsworth,Natalie Portman,Christian Bale,Tessa Thompson,Russell Crowe,Idris Elba,Chris Pratt",
                DirectorsString = "Taika Waititi",
                ReleaseInfo = "United States June 23, 2022(Los Angeles, California, premiere)",
                Company = "Marvel Studios",
                CountryString = "Australia,United States",
                LanguageString = "English",
            });

            moviesInfo.Add(new SeedMovies
            {
                Title = "The Lord of the Rings: The Fellowship of the Ring",
                Year = "2001",
                ImageUrl = "https://m.media-amazon.com/images/M/MV5BN2EyZjM3NzUtNWUzMi00MTgxLWI0NTctMzY4M2VlOTdjZWRiXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_.jpg",
                Description = "<h3>Storyline</h3>\n<p>An ancient Ring thought lost for centuries has been found, and through a strange twist of fate has been given to a small Hobbit named Frodo. When Gandalf discovers the Ring is in fact the One Ring of the Dark Lord Sauron, Frodo must make an epic quest to Mount Doom in order to destroy it. However, he does not go alone. He is joined by Gandalf, Legolas the elf, Gimli the Dwarf, Aragorn, Boromir, and his three Hobbit friends Merry, Pippin, and Samwise. Through mountains, snow, darkness, forests, rivers and plains, facing evil and danger at every corner the Fellowship of the Ring must go. Their quest to destroy the One Ring is the only hope for the end of the Dark Lords reign.</p>",
                Category = "Adventure",
                Duration = "180",
                EmbededVideo = "V75dMMIW2B4?si=-WwtuTm9MxKw45dv",
                StartingString = "Sean Bean,Cate Blanchett,Orlando Bloom,Ian McKellen,Viggo Mortensen,Elijah Wood",
                DirectorsString = "Peter Jackson",
                ReleaseInfo = "December 10, 2001(London, premiere)",
                Company = "New Line Cinema",
                CountryString = "New Zealand,UnitedStates,United Kingdom",
                LanguageString = "English,Sindarin",
            });

            moviesInfo.Add(new SeedMovies
            {
                Title = "The Lord of the Rings: The Two Towers",
                Year = "2002",
                ImageUrl = "https://m.media-amazon.com/images/M/MV5BMGQxMDdiOWUtYjc1Ni00YzM1LWE2NjMtZTg3Y2JkMjEzMTJjXkEyXkFqcGc@._V1_QL75_UX190_CR0,7,190,281_.jpg",
                Description = "<h3>Storyline</h3>\n<p>The continuing quest of Frodo and the Fellowship to destroy the One Ring. Frodo and Sam discover they are being followed by the mysterious Gollum. Aragorn, the Elf archer Legolas, and Gimli the Dwarf encounter the besieged Rohan kingdom, whose once great King Theoden has fallen under Saruman's deadly spell.</p>",
                Category = "Adventure",
                Duration = "180",
                EmbededVideo = "hYcw5ksV8YQ?si=yjLxoErFwFW9Q9O-",
                StartingString = "Sean Bean,Cate Blanchett,Orlando Bloom,Ian McKellen,Viggo Mortensen,Elijah Wood",
                DirectorsString = "Peter Jackson",
                ReleaseInfo = "United States December 5, 2002(New York City, New York, premiere)",
                Company = "New Line Cinema",
                CountryString = "New Zealand,United States",
                LanguageString = "English,Sindarin,Old English",
            });

            moviesInfo.Add(new SeedMovies
            {
                Title = "The Lord of the Rings: The Return of the King",
                Year = "2003",
                ImageUrl = "https://m.media-amazon.com/images/M/MV5BNzA5ZDNlZWMtM2NhNS00NDJjLTk4NDItYTRmY2EwMWZlMTY3XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_FMjpg_UX1000_.jpg",
                Description = "<h3>Storyline</h3>\n<p>The final confrontation between the forces of good and evil fighting for control of the future of Middle-earth. Frodo and Sam reach Mordor in their quest to destroy the One Ring, while Aragorn leads the forces of good against Sauron's evil army at the stone city of Minas Tirith.</p>",
                Category = "Adventure",
                Duration = "160",
                EmbededVideo = "r5X-hFf6Bwo?si=oXspWluTpsIYS_zm",
                StartingString = "Sean Bean,Cate Blanchett,Orlando Bloom,Ian McKellen,Viggo Mortensen,Elijah Wood",
                DirectorsString = "Peter Jackson",
                ReleaseInfo = "New Zealand December 1, 2003(Wellington, premiere)",
                Company = "New Line Cinema",
                CountryString = "New Zealand,United States",
                LanguageString = "English,Quenya,Old English,Sindarin",
            });

            moviesInfo.Add(new SeedMovies
            {
                Title = "Heat",
                Year = "1995",
                ImageUrl = "https://m.media-amazon.com/images/M/MV5BYjZjNTJlZGUtZTE1Ny00ZDc4LTgwYjUtMzk0NDgwYzZjYTk1XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_FMjpg_UX1000_.jpg",
                Description = "<h3>Storyline</h3>\n<p>Hunters and their prey--Neil and his professional criminal crew hunt to score big money targets (banks, vaults, armored cars) and are, in turn, hunted by Lt. Vincent Hanna and his team of cops in the Robbery/Homicide police division. A botched job puts Hanna onto their trail while they regroup and try to put together one last big 'retirement' score. Neil and Vincent are similar in many ways, including their troubled personal lives. At a crucial moment in his life, Neil disobeys the dictum taught to him long ago by his criminal mentor--'Never have anything in your life that you can't walk out on in thirty seconds flat, if you spot the heat coming around the corner'--as he falls in love. Thus the stage is set for the suspenseful ending.</p>",
                Category = "Action",
                Duration = "180",
                EmbededVideo = "h7N1gsQY4Io?si=CDDdxEGHQWolaDET",
                StartingString = "Al Pacino,Robert De Niro,Val Kilmer,Jon Voight,Ashley Judd",
                DirectorsString = "Michael Mann",
                ReleaseInfo = "United States December 6, 1995(Burbank, California, premiere)",
                Company = "Warner Bros",
                CountryString = "United States",
                LanguageString = "English,Spanish",
            });

            moviesInfo.Add(new SeedMovies
            {
                Title = "Top Gun: Maverick",
                Year = "2021",
                ImageUrl = "https://images.fandango.com/ImageRenderer/0/0/redesign/static/img/default_poster.png/0/images/masterrepository/Fandango/219625/tgmdomonlinedigitalkeyartt-cruisestandingjetv10.jpg",
                Description = "<h3>Storyline</h3>\n<p>Set 30 years after its predecessor, it follows Maverick's return to the United States Navy Strike Fighter Tactics Instructor program (also known as U.S. Navy-Fighter Weapons School - \"TOPGUN\"), where he must confront his past as he trains a group of younger pilots, among them the son of Maverick's deceased best friend Lieutenant Nick \"Goose\" Bradshaw, USN.</p>",
                Category = "Action",
                Duration = "140",
                EmbededVideo = "qSqVVswa420?si=Ij4Y9cDwTv9fV382",
                StartingString = "Val Kilmer,Tom Cruise,Jennifer Connelly",
                DirectorsString = "Joseph Kosinski",
                ReleaseInfo = "France May 18, 2022(Cannes Film Festival, premiere)",
                Company = "Paramount Pictures",
                CountryString = "United States",
                LanguageString = "English",
            });

            moviesInfo.Add(new SeedMovies
            {
                Title = "The Godfather Part II",
                Year = "1974",
                ImageUrl = "https://m.media-amazon.com/images/M/MV5BMWMwMGQzZTItY2JlNC00OWZiLWIyMDctNDk2ZDQ2YjRjMWQ0XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
                Description = "<h3>Storyline</h3>\n<p>The continuing saga of the Corleone crime family tells the story of a young Vito Corleone growing up in Sicily and in 1910s New York; and follows Michael Corleone in the 1950s as he attempts to expand the family business into Las Vegas, Hollywood and Cuba.</p>",
                Category = "Crime",
                Duration = "210",
                EmbededVideo = "OA1ij0alE0w?si=SobU9AA0FfCoJmrH",
                StartingString = "Al Pacino,Robert De Niro,Robert Duvall,Diane Keaton",
                DirectorsString = "Francis Ford Coppola",
                ReleaseInfo = "United States December 12, 1974(New York City, New York, premiere)",
                Company = "Paramount Pictures",
                CountryString = "United States",
                LanguageString = "English,Italian,Spanish,Latin,Sicilian",
            });

            moviesInfo.Add(new SeedMovies
            {
                Title = "The Godfather",
                Year = "1972",
                ImageUrl = "https://images-na.ssl-images-amazon.com/images/I/714ZOEiVNtL._RI_.jpg",
                Description = "<h3>Storyline</h3>\n<p>The Godfather \"Don\" Vito Corleone is the head of the Corleone mafia family in New York. He is at the event of his daughter's wedding. Michael, Vito's youngest son and a decorated WWII Marine is also present at the wedding. Michael seems to be uninterested in being a part of the family business. Vito is a powerful man, and is kind to all those who give him respect but is ruthless against those who do not. But when a powerful and treacherous rival wants to sell drugs and needs the Don's influence for the same, Vito refuses to do it. What follows is a clash between Vito's fading old values and the new ways which may cause Michael to do the thing he was most reluctant in doing and wage a mob war against all the other mafia families which could tear the Corleone family apart.</p>",
                Category = "Crime",
                Duration = "175",
                EmbededVideo = "sY1S34973zA?si=ZK5p4zr19R2E0L4h",
                StartingString = "Al Pacino,Robert Duvall,Diane Keaton,Marlon Brando,James Caan",
                DirectorsString = "Francis Ford Coppola",
                ReleaseInfo = "United States March 14, 1972(New York City, New York, premiere)",
                Company = "Paramount Pictures",
                CountryString = "United States",
                LanguageString = "English,Italian,Latin",
            });

            moviesInfo.Add(new SeedMovies
            {
                Title = "The Fast and the Furious",
                Year = "2001",
                ImageUrl = "http://vignette1.wikia.nocookie.net/fastandfurious/images/0/04/The_Fast_and_the_Furious_%28DVD_Cover%29.jpeg/revision/latest?cb=20150501043627",
                Description = "<h3>Storyline</h3>\n<p>Los Angeles street racer Dominic Toretto falls under the suspicion of the LAPD as a string of high-speed electronics truck robberies rocks the area. Brian O'Connor, an officer of the LAPD, joins the ranks of Toretto's highly skilled racing crew undercover to convict Toretto. However, O'Connor finds himself both enamored with this new world and in love with Toretto's sister, Mia. As a rival racing crew gains strength, O'Connor must decide where his loyalty really lies.</p>",
                Category = "Adventure",
                Duration = "105",
                EmbededVideo = "ZsJz2TJAPjw?si=OYiiIb0QkIOSYjMs",
                StartingString = "Vin Diesel,Paul Walker,Michelle Rodriguez",
                DirectorsString = "Rob Cohen",
                ReleaseInfo = "United States June 18, 2001(premiere)",
                Company = "Universal Pictures",
                CountryString = "United States,Germany",
                LanguageString = "English,Spanish",
            });

            moviesInfo.Add(new SeedMovies
            {
                Title = "F9: The Fast Saga",
                Year = "2021",
                ImageUrl = "https://i5.walmartimages.com/seo/F9-The-Fast-Saga-Blu-ray-DVD-Digital-Copy-Universal-Studios-Action-Adventure_2c37275b-b8f9-4a88-93d7-7bb785960479.7b553d31cf2b5302be3e1904111717d4.jpeg",
                Description = "<h3>Storyline</h3>\n<p>Vin Diesel's Dom Toretto is leading a quiet life off the grid with Letty and his son, little Brian, but they know that danger always lurks just over their peaceful horizon. This time, that threat will force Dom to confront the sins of his past if he's going to save those he loves most.Dom and the crew must take on an international terrorist who turns out to be Dom and Mia's estranged brother.</p>",
                Category = "Action",
                Duration = "143",
                EmbededVideo = "aSiDu3Ywi8E?si=3Vpcfph__NmTuBy6",
                StartingString = "Vin Diesel,Michelle Rodriguez,Tyrese Gibson,Charlize Theron,John Cena,Kurt Russell",
                DirectorsString = "Justin Lin",
                ReleaseInfo = "Egypt May 19, 2021",
                Company = "One Race Films",
                CountryString = "United States,Thailand,Canada,Japan",
                LanguageString = "English,Japanese,Spanish",
            });

            moviesInfo.Add(new SeedMovies
            {
                Title = "Die hard",
                Year = "1981",
                ImageUrl = "https://images-na.ssl-images-amazon.com/images/I/819cf1ZR2WL.jpg",
                Description = "<h3>Storyline</h3>\n<p>NYPD cop John McClane goes on a Christmas vacation to visit his wife Holly in Los Angeles where she works for the Nakatomi Corporation. While they are at the Nakatomi headquarters for a Christmas party, a group of robbers led by Hans Gruber take control of the building and hold everyone hostage, with the exception of John, while they plan to perform a lucrative heist. Unable to escape and with no immediate police response, John is forced to take matters into his own hands.</p>",
                Category = "Action",
                Duration = "132",
                EmbededVideo = "gYWvwkXreaI?si=aE24822eejdNg9Pe",
                StartingString = "Bruce Willis,Alan Rickman,Bonnie Bedelia",
                DirectorsString = "John McTiernan",
                ReleaseInfo = "United States July 12, 1988(Westwood, California, premiere)",
                Company = "Twentieth Century Fox",
                CountryString = "United States",
                LanguageString = "English,German,Italian,Japanese",
            });

            moviesInfo.Add(new SeedMovies
            {
                Title = "Die hard 2",
                Year = "1990",
                ImageUrl = "https://m.media-amazon.com/images/M/MV5BZjI0ZWFiMmQtMjRlZi00ZmFhLWI4NmYtMjQ5YmY0MzIyMzRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg",
                Description = "<h3>Storyline</h3>\n<p>After the terrifying events in LA, John McClane (Willis) is about to go through it all again. A team of terrorists, led by Col. Stuart (Sadler) is holding the entire airport hostage. The terrorists are planning to rescue a drug lord from justice. In order to do so, they have seized control of all electrical equipment affecting all planes. With no runway lights available, all aircraft have to remain in the air, with fuel running low, McClane will need to be fast.</p>",
                Category = "Action",
                Duration = "124",
                EmbededVideo = "OyxfXQ4MGLQ?si=eWXb1or-5-9rUqzs",
                StartingString = "Bruce Willis,Alan Rickman,Bonnie Bedelia",
                DirectorsString = "Renny Harlin",
                ReleaseInfo = "United States July 2, 1990(Los Angeles, California, premiere)",
                Company = "Twentieth Century Fox",
                CountryString = "United States",
                LanguageString = "English,Spanish",
            });

            moviesInfo.Add(new SeedMovies
            {
                Title = "Die Hard with a Vengeance",
                Year = "1995",
                ImageUrl = "https://image.tmdb.org/t/p/original/sOqB9iMEcbGhAgH70dbs8U58UW5.jpg",
                Description = "<h3>Storyline</h3>\n<p>John McClane is now almost a full-blown alcoholic and is suspended from the NYPD. But when a bomb goes off in the Bonwit Teller Department Store the police go insane trying to figure out what's going on. Soon, a man named Simon calls and asks for McClane. Simon tells Inspector Walter Cobb that McClane is going to play a game called \"Simon Says\". He says that McClane is going to do the tasks he assigns him. If not, he'll set off another bomb. With the help of a Harlem electrician, John McClane must race all over New York trying to figure out the frustrating puzzles that the crafty terrorist gives him. But when a bomb goes off in a subway station right by the Federal Reserve (the biggest gold storage in the world) things start to get heated.</p>",
                Category = "Action",
                Duration = "128" ,
                EmbededVideo = "gQ0uSh2Hgcs?si=YXdCMA0hvr4if4PP",
                StartingString = "Bruce Willis,Jeremy Irons,Samuel L. Jackson,Graham Greene",
                DirectorsString = "John McTiernan",
                ReleaseInfo = "United States May 15, 1995(New York City, New York, premiere)",
                Company = "Cinergi Pictures Entertainment",
                CountryString = "United States",
                LanguageString = "English,German,Romanian",
            });

            moviesInfo.Add(new SeedMovies
            {
                Title = "Live Free or Die Hard",
                Year = "2007",
                ImageUrl = "https://m.media-amazon.com/images/M/MV5BNDQxMDE1OTg4NV5BMl5BanBnXkFtZTcwMTMzOTQzMw@@._V1_.jpg",
                Description = "<h3>Storyline</h3>\n<p>When someone hacks into the computers at the FBI's Cyber Crime Division; the Director decides to round up all the hackers who could have done this. When he's told that because it's the 4th of July most of their agents are not around so they might have trouble getting people to get the hackers. So he instructs them to get local PD'S to take care of it. And one of the cops they ask is John McClane who is tasked with bringing a hacker named Farrell to the FBI. But as soon as he gets there someone starts shooting at them. McClane manages to get them out but they're still being pursued. And it's just when McClane arrives in Washington that the whole system breaks down and chaos ensues.</p>",
                Category = "Action",
                Duration = "128",
                EmbededVideo = "pVgGRLH5n6U?si=ZXbJV4tfg0yfgyBE",
                StartingString = "Bruce Willis,Justin Long,Timothy Olyphant,Maggie Q",
                DirectorsString = "Len Wiseman",
                ReleaseInfo = "Japan June 12, 2007(Tokyo, premiere)",
                Company = "Twentieth Century Fox",
                CountryString = "United States,United Kingdom",
                LanguageString = "English,Italian,French",
            });

            moviesInfo.Add(new SeedMovies
            {
                Title = "Beautiful mind",
                Year = "2001",
                ImageUrl = "https://images-na.ssl-images-amazon.com/images/I/61uzUoS79LL.jpg",
                Description = "<h3>Storyline</h3>\n<p>From the heights of notoriety to the depths of depravity, John Forbes Nash, Jr. experienced it all. A mathematical genius, he made an astonishing discovery early in his career and stood on the brink of international acclaim. But the handsome and arrogant Nash soon found himself on a painful and harrowing journey of self-discovery. After many years of struggle, he eventually triumphed over his tragedy, and finally - late in life - received the Nobel Prize.</p>",
                Category = "Drama",
                Duration = "135",
                EmbededVideo = "EajIlG_OCvw?si=qVQ3hV-o7wcWKs99",
                StartingString = "Russell Crowe,Jennifer Connelly,Ed Harris,Christopher Plummer",
                DirectorsString = "Ron Howard",
                ReleaseInfo = "United States December 13, 2001(Beverly Hills, California, premiere)",
                Company = "Universal Pictures",
                CountryString = "United States",
                LanguageString = "English",
            });

            moviesInfo.Add(new SeedMovies
            {
                Title = "Cinderella Man",
                Year = "2005",
                ImageUrl = "https://m.media-amazon.com/images/I/81vHUrHKLKL._SL1500_.jpg",
                Description = "<h3>Storyline</h3>\n<p>It is a movie about James J. Braddock. He was a boxer who became very poor during the Great Depression. But he didn't give up. He fought hard and won the Heavyweight boxing championship, making people feel hopeful. His story shows that you can overcome tough times with courage and hard work.</p>",
                Category = "Drama",
                Duration = "145",
                EmbededVideo = "DlbHzcH4VJY?si=KWvYEO76ycZ9ZMJp",
                StartingString = "Russell Crowe,Renée Zellweger,Paul Giamatti,Bruce McGill",
                DirectorsString = "Ron Howard",
                ReleaseInfo = "United States May 23, 2005(Universal City, California, premiere)",
                Company = "Universal Pictures",
                CountryString = "United States",
                LanguageString = "English",
            });

            moviesInfo.Add(new SeedMovies
            {
                Title = "The Shawshank Redemption",
                Year = "1994",
                ImageUrl = "https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_FMjpg_UX1000_.jpg",
                Description = "<h3>Storyline</h3>\n<p>Chronicles the experiences of a formerly successful banker as a prisoner in the gloomy jailhouse of Shawshank after being found guilty of a crime he did not commit. The film portrays the man's unique way of dealing with his new, torturous life; along the way he befriends a number of fellow prisoners, most notably a wise long-term inmate named Red.</p>",
                Category = "Drama",
                Duration = "142",
                EmbededVideo = "PLl99DlL6b4?si=ZL1XdFVDcCww_SJK",
                StartingString = "Tim Robbins,Morgan Freeman,Clancy Brown",
                DirectorsString = "Frank Darabont",
                ReleaseInfo = "Canada September 10, 1994(Toronto International Film Festival)",
                Company = "Castle Rock Entertainment",
                CountryString = "United States",
                LanguageString = "English",
            });

            moviesInfo.Add(new SeedMovies
            {
                Title = "Million Dollar Baby",
                Year = "2004",
                ImageUrl = "https://m.media-amazon.com/images/M/MV5BMTkxNzA1NDQxOV5BMl5BanBnXkFtZTcwNTkyMTIzMw@@._V1_FMjpg_UX1000_.jpg",
                Description = "<h3>Storyline</h3>\n<p>Wanting to learn from the best, aspiring boxer Maggie Fitzgerald (Hilary Swank) wants Frankie Dunn (Clint Eastwood) to train her. At the outset, he flatly refuses saying he has no interest in training a girl. Frankie leads a lonely existence, alienated from his only daughter and having few friends. Maggie's rough around the edges, but shows a lot of grit in the ring and he eventually relents. Maggie not only proves to be the boxer he always dreamed of having under his wing, but a friend who fills the great void he's had in his life. Maggie's career skyrockets, but an accident in the ring leads her to ask Frankie for one last favor.</p>",
                Category = "Drama",
                Duration = "142",
                EmbededVideo = "5_RsHRmIRBY?si=Ebv4n-9nSJpqx-_H",
                StartingString = "Morgan Freeman,Hilary Swank,Clint Eastwood,Anthony Mackie,Michael Peña",
                DirectorsString = "Clint Eastwood",
                ReleaseInfo = "United States December 5, 2004(New York City, New York, premiere)",
                Company = "Warner Bros",
                CountryString = "United States",
                LanguageString = "English,Irish,Gaelic,German",
            });

            var movies = GenerateMovies(moviesInfo, data);

            data.Movies.AddRange(movies);
            data.SaveChanges();
        }

        private static List<Movie> GenerateMovies(List<SeedMovies> seedMovies, MovieGalleryDbContext data)
        {
            var movies = new List<Movie>();

            foreach (var movieInfo in seedMovies)
            {
                var currentMovie = new Movie
                {
                    Title = movieInfo.Title,
                    Year = movieInfo.Year,
                    ImageUrl = movieInfo.ImageUrl,
                    Description = movieInfo.Description,
                    Category = movieInfo.Category,
                    Duration = movieInfo.Duration,
                    EmbededVideo = movieInfo.EmbededVideo,
                    Release = movieInfo.ReleaseInfo,
                    Company = data.Companies.FirstOrDefault(x => x.Name == movieInfo.Company),
            };                

                var movieStarring = movieInfo.StartingString!.Split(",").ToList();

                foreach (var starringName in movieStarring)
                {
                    var currentStarring = data.Starring.FirstOrDefault(x => x.Name == starringName);

                    currentMovie.MovieStarrings!.Add(new MovieStarring { Starring = currentStarring!, Movie = currentMovie });
                }

                var currentDirector = data.Directors.FirstOrDefault(x => x.Name == movieInfo.DirectorsString);

                currentMovie.MovieDirectors!.Add( new MovieDirector { Director = currentDirector, Movie = currentMovie });

                movies.Add(currentMovie);
            }

            return movies;
        }
    }
    
}

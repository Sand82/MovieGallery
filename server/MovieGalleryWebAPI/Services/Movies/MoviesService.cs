using MovieGalleryWebAPI.Data;
using MovieGalleryWebAPI.Data.Models;
using MovieGalleryWebAPI.Models.Movies;

using Microsoft.EntityFrameworkCore;
using MovieGalleryWebAPI.Models.Create;
using MovieGalleryWebAPI.Models.Edit;
using AutoMapper;
using MovieGalleryWebAPI.Service.Favorites;
using MovieGalleryWebAPI.Service.Ratings;
using MovieGalleryWebAPI.Models.Starring;

namespace MovieGalleryWebAPI.Service.Movies
{
    public class MoviesService : IMoviesService
    {
        private readonly MovieGalleryDbContext data;
        private readonly IFavoriteService favoriteService;   
        private readonly IRatingService ratingService;

        private readonly IMapper mapper;

        public MoviesService(
            MovieGalleryDbContext data, 
            IMapper mapper, 
            IFavoriteService favoriteService, 
            IRatingService ratingService)
        {
            this.data = data;
            this.mapper = mapper;
            this.favoriteService = favoriteService;
            this.ratingService = ratingService;
        }        

        public async Task<MovieGetModel> GetLastMovie()
        {
            var movie = await this.data.Movies
                .OrderByDescending(m => m.Id)
                .Where(m => m.IsDelete == false)
                .Select(m => new MovieGetModel
                {
                    Id = m.Id,
                    Title= m.Title,
                    Description= m.Description,
                    Year= m.Year,
                    Category= m.Category,
                    ImageUrl= m.ImageUrl,
                    AverageRating = m.Ratings!.Average(m => m.Value).ToString("F1"),
                    Duration = m.Duration,
                    EmbededVideo = m.EmbededVideo,
                })
                .FirstOrDefaultAsync();

            return movie!;
        }

        public async Task<MoviesData> GetMovies(GetMoviesModel model)
        {
            var moviesQuery = GetQueryMovies();

            var moviesData = new MoviesData();
            moviesData.Count = this.data.Movies.Where(m => m.IsDelete == false).Count();

            var latestMovies = await GetLatestMovies(moviesQuery);

            if (!string.IsNullOrWhiteSpace(model.Search))
            {
                moviesQuery = moviesQuery.Where(m => m.Title!.Contains(model.Search));
                moviesData.Count = moviesQuery.Where(m => m.Title!.Contains(model.Search)).Count();
            }

            moviesQuery = SelectQueryMoviesBy(model.Select!, model.Sort!, moviesQuery);

            moviesQuery = moviesQuery
                .Skip((model.CurrentPage - 1) * model.ItemsPerPage)
                .Take(model.ItemsPerPage);

            var movies = await MaterializeMoviesQuery(moviesQuery);

            moviesData.Movies = movies;
            moviesData.LatestMovies = latestMovies;

            return moviesData;
        }        

        public async Task<MovieDataModel> GetOneMovie(int movieId , string userId)
        {
            var movie = await this.data.Movies
                .Include(m => m.Comments!).ThenInclude(c => c.User)
                .Include(m => m.Favorites)
                .Include(m => m.Ratings)
                .Include(m => m.MovieStarrings)
                .Include(m => m.MovieDirectors)
                .Where(m => m.Id == movieId && m.IsDelete == false)
                .Select(m => new MovieDataModel
                {
                    Id = m.Id,
                    Title = m.Title,
                    Description = m.Description,
                    ImageUrl = m.ImageUrl,
                    Category = m.Category,
                    Year = m.Year,
                    Duration = m.Duration,
                    EmbededVideo = m.EmbededVideo,
                    Release = m.Release,
                    AverageRating = m.Ratings!.Count == 0 ? "0.0" : m.Ratings!.Average(m => m.Value).ToString("F1"),                    
                    Starring = m.MovieStarrings!.Where(m => m.MovieId == movieId).Select(ms => new MovieStarringModel
                    {
                        Id = ms.Starring.Id,
                        Name = ms.Starring.Name!,

                    }).ToList(),
                    Directors = m.MovieDirectors!.Where(m => m.MovieId == movieId).Select(md => new Models.Directors.MovieDirectorsModel
                    {
                        Id = md.Director!.Id,
                        Name = md.Director!.Name!,

                    }).ToList(),
                    Comments = m.Comments!.Where(c => c.IsDelete == false)
                        .Select(c => new MovieCommentModel
                        {
                            Id = c.Id,
                            Comment = c.Content,
                            UserId = c.UserId,
                            MovieId = movieId,
                            Username = c.User!.UserName,
                            CreationData = c.CreationData,
                            
                        })
                        .ToList()                  
                })
                .FirstOrDefaultAsync();

            var favoriteMovieInfo = await favoriteService.FindFavorite(userId, movieId);
            movie!.IsFavorite = favoriteMovieInfo == null ? false : favoriteMovieInfo.IsFavorite;

            var personalRating = await ratingService.SearchPersonalRating(userId, movieId);
            movie.PersonalRating = personalRating;            

            return movie;
        }

        public async Task CreateMovie(MovieCreateModel model)
        {
            var movie = new Movie
            {
                Title = model.Title,
                Description = model.Description,
                ImageUrl = model.ImageUrl,
                Category = model.Category,
                Year = model.Year,
                Duration = model.Duration,
                EmbededVideo = model.EmbededVideo,
                Release = model.Release,
                MovieStarrings = new List<MovieStarring>()
            };

            movie = AddStarring(movie, model);
            movie = AddDirector(movie, model);

            await this.data.Movies.AddAsync(movie);
            await this.data.SaveChangesAsync();
        }
        
        public async Task<bool> EditMovie(MovieEditModel model)
        {
            var isEdited = true;

            var movie = await this.data
                .Movies
                .Where(m => m.Id == model.Id)                
                .FirstOrDefaultAsync();

            if (movie is null)
            {
                isEdited = false;
                return isEdited;
            }

            movie.Title = model.Title;
            movie.Description = model.Description;
            movie.ImageUrl = model.ImageUrl;
            movie.Category = model.Category;
            movie.Year = model.Year;
            movie.Duration = model.Duration;
            movie.EmbededVideo = model.EmbededVideo;
            movie.Release = model.Release;

            await RemoveMappings(movie.Id);
            await AddNewStarringMappings(model, movie);
            await AddNewDirectorsMappings(model, movie);

            await this.data.SaveChangesAsync();

            return isEdited;
        }

        private async Task AddNewDirectorsMappings(MovieEditModel model, Movie movie)
        {             
            foreach (var director in model.Directors!)
            {
                Director? currentDirector;

                if (director.Id == -1)
                {
                    currentDirector = new Director { Name = director.Name };
                    this.data.Directors.Add(currentDirector);
                }
                else
                {
                    currentDirector = await this.data.Directors!.FirstOrDefaultAsync(d => d.Id == director.Id);

                    if (currentDirector!.Name != director.Name)
                    {
                        currentDirector.Name = director.Name;
                    }
                }

                movie.MovieDirectors!.Add(new MovieDirector
                {
                    Movie = movie,
                    Director = currentDirector
                });
            }
        }

        private async Task AddNewStarringMappings(MovieEditModel model, Movie movie)
        {
            foreach (var starring in model.Starring!)
            {
                Starring? currentStarring;

                if (starring.Id == -1)
                {
                    currentStarring = new Starring { Name = starring.Name };
                    this.data.Starring.Add(currentStarring);
                }
                else
                {
                    currentStarring = await this.data.Starring.FirstOrDefaultAsync(s => s.Id == starring.Id);

                    if (currentStarring!.Name != starring.Name)
                    {
                        currentStarring.Name = starring.Name;
                    }
                }

                movie.MovieStarrings!.Add(new MovieStarring
                {
                    Movie = movie,
                    Starring = currentStarring
                });
            }
        }

        public async Task<bool> RemoveMovie(int movieId)
        {
            var movie = await this.data.Movies
                .Where(m => m.Id == movieId && m.IsDelete == false)
                .FirstOrDefaultAsync();

            if (movie == null)
            {
                return false;
            }

            await DeleteMovie(movie);

            return true;
        }

        public async Task<bool> CheckForDuplicates(string title)
        {
            return await this.data.Movies.AnyAsync(m => m.Title == title);
        }

        private async Task<List<MoviesDataModel>> GetLatestMovies(IQueryable<Movie> moviesQuery)
        {
            moviesQuery = moviesQuery.OrderByDescending(m => m.Year).AsQueryable().Take(4);

            var movies = await MaterializeMoviesQuery(moviesQuery);

            return movies;
        }

        private IQueryable<Movie> SelectQueryMoviesBy(string select, string sort, IQueryable<Movie> moviesQuery)
        {
            bool isAscending = sort == "asc";
            switch (select)
            {
                case "year":
                    moviesQuery = isAscending ? moviesQuery.OrderBy(m => m.Year) : moviesQuery.OrderByDescending(m => m.Year);
                    break;
                case "averageRating":
                    moviesQuery = isAscending
                        ? moviesQuery.OrderBy(m => m.Ratings!.Any() ? m.Ratings!.Average(r => r.Value) : 0)
                        : moviesQuery.OrderByDescending(m => m.Ratings!.Any() ? m.Ratings!.Average(r => r.Value) : 0);
                    break;
                case "duration":
                    moviesQuery = isAscending ? moviesQuery.OrderBy(m => m.Duration) : moviesQuery.OrderByDescending(m => m.Duration);
                    break;
                default:
                    moviesQuery = moviesQuery.OrderByDescending(m => m.Id);
                    break;
            }

            return moviesQuery;
        }

        private async Task<List<MoviesDataModel>> MaterializeMoviesQuery(IQueryable<Movie> moviesQuery)
        {
            var movies = await moviesQuery
               .Select(m => new MoviesDataModel
               {
                   Id = m.Id,
                   Title = m.Title,
                   Description = m.Description,
                   ImageUrl = m.ImageUrl,
                   Category = m.Category,
                   Year = m.Year,
                   Duration = m.Duration,
                   EmbededVideo = m.EmbededVideo,
                   AverageRating = m.Ratings != null && m.Ratings.Any()
                       ? m.Ratings.Average(r => r.Value).ToString("F1")
                       : "0.0"
               })
               .ToListAsync();

            return movies;
        }

        //TODO Refactoring
        private Movie AddStarring(Movie movie, MovieCreateModel model)
        {
            return AddRelations<Movie, Starring, MovieStarring>(
                movie,
                model.Starring!,
                name => this.data.Starring.FirstOrDefault(s => s.Name == name),
                name =>
                {
                    var newStarring = new Starring { Name = name };
                    this.data.Starring.Add(newStarring);
                    return newStarring;
                },
                (m, s) => m.MovieStarrings!.Add(new MovieStarring { Movie = m, Starring = s })
            );
        }

        //TODO Refactoring
        private Movie AddDirector(Movie movie, MovieCreateModel model)
        {
            return AddRelations<Movie, Director, MovieDirector>(
                movie,
                model.Starring!,
                name => this.data.Directors.FirstOrDefault(s => s.Name == name),
                name =>
                {
                    var newDirector = new Director { Name = name };
                    this.data.Directors.Add(newDirector);
                    return newDirector;
                },
                (m, d) => m.MovieDirectors!.Add(new MovieDirector { Movie = m, Director = d })
            );
        }

        //TODO Refactoring
        private TEntity AddRelations<TEntity, TRelation, TJoin>(
            TEntity entity,
            IEnumerable<string> names,
            Func<string, TRelation?> findExisting,
            Func<string, TRelation> createNew,
            Action<TEntity, TRelation> addJoin)
        {
            foreach (var name in names)
            {
                var related = findExisting(name);

                if (related == null)
                {
                    related = createNew(name);
                }

                addJoin(entity, related);
            }

            return entity;
        }

        //TODO Refactoring
        private async Task RemoveMappings(int movieId)
        {
            var starringMappingsToRemove = await data.MovieStarrings.Where(m => m.MovieId == movieId).ToListAsync();
            var directorsMappingsToRemove = await data.MovieDirectors.Where(m => m.MovieId == movieId).ToListAsync();

            data.MovieStarrings.RemoveRange(starringMappingsToRemove); 
            data.MovieDirectors.RemoveRange(directorsMappingsToRemove);
        }

        private IQueryable<Movie> GetQueryMovies()
        {
            return this.data.Movies
                .Include(m => m.Ratings)
                .Where(m => !m.IsDelete)
                .AsQueryable();
        }       

        private async Task DeleteMovie(Movie movie)
        {
            movie.IsDelete = true;

            await this.data.SaveChangesAsync();
        }        
    }
}

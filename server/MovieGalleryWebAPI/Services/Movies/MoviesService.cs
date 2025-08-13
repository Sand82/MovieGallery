using Microsoft.EntityFrameworkCore;

using MovieGalleryWebAPI.Data;
using MovieGalleryWebAPI.Data.Models;
using MovieGalleryWebAPI.Models.Movies;
using MovieGalleryWebAPI.Models.Create;
using MovieGalleryWebAPI.Models.Edit;
using MovieGalleryWebAPI.Models.Starring;
using MovieGalleryWebAPI.Models.Directors;
using MovieGalleryWebAPI.Models.Countries;
using MovieGalleryWebAPI.Models.Languages;
using MovieGalleryWebAPI.Service.Favorites;
using MovieGalleryWebAPI.Service.Ratings;
using MovieGalleryWebAPI.Services.MovieCompany;
using MovieGalleryWebAPI.Services.MovieDirectors;
using MovieGalleryWebAPI.Services.MoviesStarring;
using MovieGalleryWebAPI.Services.MovieCountries;
using MovieGalleryWebAPI.Services.MovieLanguages;
using MovieGalleryWebAPI.Models.Category;
using MovieGalleryWebAPI.Services.MovieCategories;
using MovieGalleryWebAPI.Models.Tags;
using MovieGalleryWebAPI.Services.MovieTags;
using MovieGalleryWebAPI.Services.Image;

namespace MovieGalleryWebAPI.Service.Movies
{
    public class MoviesService : IMoviesService
    {
        private readonly MovieGalleryDbContext data;
        private readonly IFavoriteService favoriteService;   
        private readonly IRatingService ratingService;
        private readonly ICompanyService companyService;
        private readonly IMovieDirectorsService movieDirectorsService;
        private readonly IMovieStarringService movieStarringService;
        private readonly IMovieCountriesService movieCountriesService;
        private readonly IMovieLanguageService movieLanguageService;
        private readonly IMovieCategoryService movieCategoryService;
        private readonly IMovieTagService movieTagService;
        private readonly IManageImage manageImage;

        public MoviesService(
            MovieGalleryDbContext data,
            IFavoriteService favoriteService,
            IRatingService ratingService,
            ICompanyService companyService,
            IMovieDirectorsService movieDirectorsService,
            IMovieStarringService movieStarringService,
            IMovieCountriesService movieCountriesService,
            IMovieLanguageService movieLanguageService,
            IMovieCategoryService movieCategoryService,
            IMovieTagService movieTagService
,
            IManageImage manageImage)
        {
            this.data = data;
            this.favoriteService = favoriteService;
            this.ratingService = ratingService;
            this.companyService = companyService;
            this.movieDirectorsService = movieDirectorsService;
            this.movieStarringService = movieStarringService;
            this.movieCountriesService = movieCountriesService;
            this.movieLanguageService = movieLanguageService;
            this.movieCategoryService = movieCategoryService;
            this.movieTagService = movieTagService;
            this.manageImage = manageImage;
        }

        public async Task<MovieGetModel> GetLastCreatedMovie()
        {
            var movie = await this.data.Movies
                .Include(m => m.MovieCountries)
                .OrderByDescending(m => m.Id)
                .Where(m => m.IsDelete == false)
                .Select(m => new MovieGetModel
                {
                    Id = m.Id,
                    Title= m.Title,
                    Description= m.Description,
                    Year= m.Year,                    
                    BackgroundImage = m.BackgroundImage,
                    AverageRating = m.Ratings!.Average(m => m.Value).ToString("F1"),
                    Duration = m.Duration,
                    EmbededVideo = m.EmbededVideo,
                    Categories = m.MovieCategories
                        .Where(mc => m.Id == mc.MovieId)
                        .Select(c => new MovieCategoryModel { Id = c.Category!.Id, Name = c.Category.Name })
                        .ToList()
                })
                .FirstOrDefaultAsync();

            return movie!;
        }

        public async Task<MoviesData> GetMovies(GetMoviesModel model)
        {            
            var moviesQuery = GetQueryMovies();

            var moviesData = new MoviesData();
            moviesData.Count = this.data.Movies.Where(m => m.IsDelete == false).Count();

            //var latestMovies = await GetLatestMovies(moviesQuery);

            if (!string.IsNullOrWhiteSpace(model.Tag))
            {
                moviesQuery = moviesQuery.Where(m => m.MovieTags!.Any(mt => mt.TagId == int.Parse(model.Tag)));
            }

            if (!string.IsNullOrWhiteSpace(model.Category))
            {
                moviesQuery = moviesQuery.Where(m => m.MovieCategories.Any(mc => mc.CategoryId == int.Parse(model.Category)));                
            }

            if (!string.IsNullOrWhiteSpace(model.Search))
            {
                moviesQuery = moviesQuery.Where(m => m.Title!.Contains(model.Search));                
            }

            moviesData.Count = moviesQuery.ToList().Count();

            moviesQuery = SelectQueryMoviesBy(model.Select!, model.Sort!, moviesQuery);

            moviesQuery = moviesQuery
                .Skip((model.CurrentPage - 1) * model.ItemsPerPage)
                .Take(model.ItemsPerPage);

            var movies = await MaterializeMoviesQuery(moviesQuery);

            moviesData.Movies = movies;
            //moviesData.LatestMovies = latestMovies;            

            return moviesData;
        }

        public async Task<IEnumerable<MoviesDataModel>> GetLatesMovies()
        {
            var moviesQuery = GetQueryMovies();
            var latestMovies = await GetLatestMovies(moviesQuery);

            return latestMovies;
        }

        public async Task<MovieDataModel> GetOneMovie(int movieId , string userId)
        {
            var movie = await this.data.Movies
                .Include(m => m.Comments!).ThenInclude(c => c.User)
                .Include(m => m.Favorites)
                .Include(m => m.Ratings)
                .Include(m => m.Company)
                .Include(m => m.MovieStarrings)
                .Include(m => m.MovieDirectors)
                .Include(m => m.MovieCountries)
                .Include(m => m.MovieLanguages) 
                .Include(m => m.MovieCategories)
                .Include(m => m.MovieTags)
                .Where(m => m.Id == movieId && m.IsDelete == false)
                .Select(m => new MovieDataModel
                {
                    Id = m.Id,
                    Title = m.Title,
                    Description = m.Description,
                    MainImage= m.MainImage,                 
                    Year = m.Year,
                    Duration = m.Duration,
                    EmbededVideo = m.EmbededVideo,
                    Release = m.Release,
                    AverageRating = m.Ratings!.Count == 0 ? "0.0" : m.Ratings!.Average(m => m.Value).ToString("F1"),   
                    Company = m.Company!.Name,
                    Starring = m.MovieStarrings!.Where(m => m.MovieId == movieId).Select(ms => new MovieStarringModel
                    {
                        Id = ms.Starring!.Id,
                        Name = ms.Starring.Name!,

                    }).ToList(),

                    Categories = m.MovieCategories
                       .Where(mc => mc.MovieId == m.Id)
                       .Select(mc => new MovieCategoryModel { Id = mc.Category!.Id, Name = mc.Category.Name })
                       .ToList(),

                    Directors = m.MovieDirectors!.Where(m => m.MovieId == movieId)
                    .Select(md => new MovieDirectorsModel
                    {
                        Id = md.Director!.Id,
                        Name = md.Director!.Name!,

                    }).ToList(),

                    Countries = m.MovieCountries!.Where(m => m.MovieId == movieId)
                    .Select(mc => new MovieCountriesModel
                    {
                        Id = mc.Country!.Id,
                        Name = mc.Country!.Name!,

                    }).ToList(),

                    Languages = m.MovieLanguages!.Where(m => m.MovieId == movieId)
                    .Select(ml => new MovieLanguagesModel 
                    { 
                        Id = ml.Language!.Id,
                        Name = ml.Language!.Name!,

                    }).ToList(),

                    Tags = m.MovieTags!.Where(m => m.MovieId == movieId)
                    .Select(ml => new MovieTagsModel
                    {
                        Id = ml.Tag!.Id,
                        Name = ml.Tag!.Name!,

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

        public async Task CreateMovie(MovieCreateModel model, IFormFile file)
        {
            var backgroundImage = await manageImage.ImageManager(file, 1800, 600);            

            var mainImage = await manageImage.ImageManager(file, 1000, 1600);            

            var movie = new Movie
            {
                Title = model.Title,
                Description = model.Description,                               
                Year = model.Year,
                Duration = model.Duration,
                EmbededVideo = model.EmbededVideo,
                Release = model.Release,
                BackgroundImage = backgroundImage,
                MainImage = mainImage
            };

            var company = await companyService.AddMovieCompany(model.Company!);
            movie.CompanyId = company.Id;

            await this.data.Movies.AddAsync(movie);
            await this.data.SaveChangesAsync();

            await movieCategoryService.AddMovieCategories(model.Categories!, movie);
            await movieDirectorsService.AddMovieDirectors(model.Directors!, movie);
            await movieStarringService.AddMovieStarring(model.Starring!, movie);
            await movieCountriesService.AddMovieCountries(model.Countries!, movie);
            await movieLanguageService.AddMovieLanguages(model.Languages!, movie);

            if (model.Tags?.Count > 0)
            {
                await movieTagService.AddMovieTags(model.Tags!, movie);
            }
        }

        public async Task<bool> EditMovie(MovieEditModel model, IFormFile file)
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

            //TODO isMainImageDelete or isBackgroundImageDelete throw some error

            var mainImage = movie.MainImage;

            var backgroundImage = movie.BackgroundImage;            

            if (!movie.MainImage!.Equals(file.FileName))
            {
                var isMainImageDelete = manageImage.DeleteFile(movie.MainImage!);

                var isBackgroundImageDelete = manageImage.DeleteFile(movie.BackgroundImage!);

                backgroundImage = await manageImage.ImageManager(file, 1800, 600);

                mainImage = await manageImage.ImageManager(file, 1000, 1600);
            }

            movie.Title = model.Title;
            movie.Description = model.Description;
            movie.MainImage = mainImage;
            movie.BackgroundImage = backgroundImage;           
            movie.Year = model.Year;
            movie.Duration = model.Duration;
            movie.EmbededVideo = model.EmbededVideo;
            movie.Release = model.Release;
            movie.IsDelete = false;

            var company = await companyService.EditMovieCompany(model.Company!, movie);
            movie.CompanyId = company.Id;
            movie.Company = company;

            await movieTagService.EditMovieTags(model.Tags!, movie);
            await movieStarringService.EditMovieStarring(model, movie);
            await movieDirectorsService.EditMovieDirectors(model, movie);

            await movieCategoryService.EditMovieCategories(model.Categories!, movie);
            await movieCountriesService.EditMovieCountries(model.Countries!, movie);
            await movieLanguageService.EditMovieLanguages(model.Languages!, movie);
            
            await this.data.SaveChangesAsync();

            return isEdited;
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
                   MainImage = m.MainImage,
                   BackgroundImage = m.BackgroundImage,
                   Categories = m.MovieCategories
                       .Where(mc => mc.MovieId == m.Id)
                       .Select(mc => new MovieCategoryModel { Id = mc.Category!.Id, Name = mc.Category.Name})
                       .ToList(),
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

        private IQueryable<Movie> GetQueryMovies()
        {
            return this.data.Movies
                .Include(m => m.Ratings)
                .Include(m => m.MovieCategories)
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

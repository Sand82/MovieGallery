using MovieGalleryWebAPI.Data;
using MovieGalleryWebAPI.Data.Models;
using MovieGalleryWebAPI.Models.Category;
using MovieGalleryWebAPI.Models.Countries;
using MovieGalleryWebAPI.Models.Languages;
using MovieGalleryWebAPI.Models.StaticData;
using MovieGalleryWebAPI.Services.MovieCategories;
using MovieGalleryWebAPI.Services.MovieCompany;
using MovieGalleryWebAPI.Services.MovieCountries;
using MovieGalleryWebAPI.Services.MovieDirectors;
using MovieGalleryWebAPI.Services.MovieLanguages;
using MovieGalleryWebAPI.Services.MoviesStarring;
using MovieGalleryWebAPI.Services.MovieTags;
using System.Text;

namespace MovieGalleryWebAPI.Services.MovieImport
{
    public class MovieImportService : IMovieImportService
    {
        private readonly MovieGalleryDbContext data;          
        private readonly IMovieDirectorsService movieDirectorsService;
        private readonly IMovieStarringService movieStarringService;
        private readonly IMovieCountriesService movieCountriesService;
        private readonly IMovieLanguageService movieLanguageService;
        private readonly IMovieCategoryService movieCategoryService;
        private readonly IMovieTagService movieTagService;      
        private readonly ICompanyService companyService;      

        public MovieImportService(
            MovieGalleryDbContext data,           
            IMovieDirectorsService movieDirectorsService,
            IMovieStarringService movieStarringService,
            IMovieCountriesService movieCountriesService,
            IMovieLanguageService movieLanguageService,
            IMovieCategoryService movieCategoryService,
            IMovieTagService movieTagService,
            ICompanyService companyService
            )
        {
            this.data = data;            
            this.movieDirectorsService = movieDirectorsService;
            this.movieStarringService = movieStarringService;
            this.movieCountriesService = movieCountriesService;
            this.movieLanguageService = movieLanguageService;
            this.movieCategoryService = movieCategoryService;
            this.movieTagService = movieTagService;
            this.companyService = companyService;
        }

        public async Task ImportMovies(List<MovieScraperData> models)
        {
            foreach (var movie in models)
            {
                if (data.Movies.Any(x => x.Title!.ToLower() == movie.Title!.ToLower()))
                {
                    continue;
                }

                await CreateMovie(movie);
            }
        }

        private async Task CreateMovie(MovieScraperData model)
        {
            var movie = new Movie
            {
                Title = model.Title,
                Description = DescriptionBuilder(model.Description!),
                Year = model.Year,
                Duration = model.Duration,
                EmbededVideo = GetUrlId(model.EmbededVideo),
                Release = model.Release,
                BackgroundImage = model.BackgroundImage,
                MainImage = model.MainImage,
            };

            var company = await companyService.AddMovieCompany("Unknown");
            movie.CompanyId = company.Id;            

            await this.data.Movies.AddAsync(movie);
            await this.data.SaveChangesAsync();

            await movieCategoryService.AddMovieCategories(ConvertCategories(model.MovieCategories!), movie);
            await movieDirectorsService.AddMovieDirectors(model.MovieDirectors!, movie);
            await movieStarringService.AddMovieStarring(model.MovieStarrings!, movie);
            await movieCountriesService.AddMovieCountries(ConvertCountries(model.MovieLanguages!), movie);
            await movieLanguageService.AddMovieLanguages(ConvertLanguages(model.MovieLanguages!), movie);

            if (model.MovieTags?.Count > 0)
            {
                await movieTagService.AddMovieTags(model.MovieTags!, movie);
            }
        }

        private string? GetUrlId(string? selectedUrl)
        {
            if (string.IsNullOrWhiteSpace(selectedUrl))
                return null;

            if (!Uri.TryCreate(selectedUrl, UriKind.Absolute, out var uri))
                return null;

            return uri.Segments.LastOrDefault()?.Trim('/');
        }

        private string DescriptionBuilder(string description)
        {
            var sb = new StringBuilder();
            sb.AppendLine("<h3>Storyline</h3>");
            sb.Append($"<p>{description}</p>");

            return sb.ToString();
        }

        private List<MovieCategoryModel> ConvertCategories(ICollection<string> movieCategories)
        {
            var categories= new List<MovieCategoryModel>();

            foreach (var item in movieCategories)
            {
                categories.Add(new MovieCategoryModel()
                {
                    Id = -1,
                    Name = item
                });
            }

            return categories;
        }

        private List<MovieCountriesModel> ConvertCountries(ICollection<string> movieCountries)
        {
            var countries = new List<MovieCountriesModel>();

            foreach (var item in movieCountries)
            {
                countries.Add(new MovieCountriesModel()
                {
                    Id = -1,
                    Name = item
                });
            }

            return countries;
        }

        private List<MovieLanguagesModel> ConvertLanguages(ICollection<string> movieLanguages)
        {
            var languages = new List<MovieLanguagesModel>();

            foreach (var item in movieLanguages)
            {
                languages.Add(new MovieLanguagesModel()
                {
                    Id = -1,
                    Name = item
                });
            }

            return languages;
        }
    }    
}

namespace MovieGalleryWebAPI.Data
{
    public static class Constant
    {
        public const int MinUsernameLength = 2;
        public const int MaxUsernameLength = 50;

        public const int MinMovieTitleLength = 2;
        public const int MaxMovieTitleLength = 100;       

        public const int MinMovieCategoryLength = 2;
        public const int MaxMovieCategoryLength = 50;

        public const int MinMovieImageUrlLength = 5;
        public const int MaxMovieImageUrlLength = 300;

        public const int MinMovieDescriptionLength = 3;
        public const int MaxMovieDescriptionLength = 10000;
        public const int MaxMovieEmbededLength = 40;
        public const int MaxMovieReleaseLength = 200;

        public const int MinMovieDuration = 2;
        public const int MaxMovieDuration = 400;

        public const int MovieYearLength = 4;

        public const int UserNameMinLength = 2;
        public const int UserNameMaxLength = 50;       

        public const int UserPasswordMinLength = 5;
        public const int UserPasswordMaxLength = 50;

        public const int MinContentLength = 3;
        public const int MaxContentLength = 500;

        public const int MinRatingValue = 1;
        public const int MaxRatingValue = 10;

        public const int MaxStarringNameValue = 100;
        public const int MaxDirectorNameValue = 100;
    }
}

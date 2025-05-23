﻿using Microsoft.EntityFrameworkCore;

using MovieGalleryWebAPI.Data;
using MovieGalleryWebAPI.Data.Models;
using MovieGalleryWebAPI.Models.Edit;

namespace MovieGalleryWebAPI.Services.MoviesStarring
{
    public class MovieStarringService : IMovieStarringService
    {
        private readonly MovieGalleryDbContext data;

        public MovieStarringService(MovieGalleryDbContext data)
        {
            this.data = data;
        }        

        public async Task AddMovieStarring(ICollection<string> starringCollection, Movie movie)
        {
            var movieStarring = new List<MovieStarring>();

            foreach (var starring in starringCollection)
            {
                var currStarring = await data.Starring.FirstOrDefaultAsync(s => s.Name == starring);

                if (currStarring == null) 
                {
                    currStarring = new Starring { Name = starring };

                    await data.Starring.AddAsync(currStarring);
                    await data.SaveChangesAsync();
                }

                movieStarring.Add( new MovieStarring { Starring = currStarring, Movie = movie });
            }

            await data.MovieStarrings.AddRangeAsync(movieStarring);
            await data.SaveChangesAsync();
        }

        public async Task EditMovieStarring(MovieEditModel model, Movie movie)
        {
            if (movie.MovieStarrings == null)
            {
                movie.MovieStarrings = new List<MovieStarring>();
            }

            await RemoveMovieStarring(movie.Id);

            foreach (var starring in model.Starring!)
            {
                Starring? currentStarring;

                if (starring.Id == -1)
                {
                    currentStarring = new Starring { Name = starring.Name };
                    this.data.Starring.Add(currentStarring);
                    await this.data.SaveChangesAsync();
                }
                else
                {
                    currentStarring = await this.data.Starring.FirstOrDefaultAsync(s => s.Id == starring.Id);

                    if (currentStarring == null)
                        continue;

                    if (currentStarring!.Name != starring.Name)
                    {
                        currentStarring.Name = starring.Name;
                    }
                }

                movie.MovieStarrings!.Add(new MovieStarring
                {
                    MovieId = movie.Id,
                    StarringId = currentStarring.Id
                });
            }

            await this.data.SaveChangesAsync();
        }

        public async Task RemoveMovieStarring(int movieId)
        {
            var mappings = await this.data.MovieStarrings.Where(m => m.MovieId == movieId).ToListAsync();
            this.data.MovieStarrings.RemoveRange(mappings);            
        }
    }
}

import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../contexts/AuthContext.js";
import { MovieContext } from "../../contexts/MovieContext.js";
import * as movieServis from "../../services/MoviesService.js";
import * as movieValidator from "../../services/MovieValidator.js";
import * as style from './EditMovie.Model.css'

const EditMovie = ({movie}) => {
  
    const { user } = useContext(AuthContext);
    const { editHandler} = useContext(MovieContext)

    const [editMovie, setCreateMovie] = useState({
    title: movie.title,
    category: movie.category,
    year: movie.year,
    imageUrl: movie.imageUrl,
    duration: movie.duration,
    description: movie.description,
  });

  const [titleError, setTitleError] = useState(false);
  const [categoryError, setCategoryError] = useState(false);
  const [yearError, setYearError] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [durationError, setDurationError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);

  const navigate = useNavigate();  
 
  const editMovieHandler = (e) => {
    e.preventDefault();

    const movieData = Object.fromEntries(new FormData(e.target));
    movieData.id = movie.id;

    movieServis.edit(movieData, user.accessToken)
    .then((result) => {               
     
      if (result === "Bad response") {
        return navigate("/notfound");
      }
      editHandler(movieData);
      return navigate("/");
    })
    .catch((error) => {
      throw console.error(error);
    });
  }

  const changeHandler = (e) => {    
    setCreateMovie((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };

  const validateTitle = (e) => {
    const title = e.target.value;
    setTitleError(movieValidator.title(title));
  };

  const validateCategory = (e) => {
    const category = e.target.value;
    setCategoryError(movieValidator.category(category));
  };

  const validateYear = (e) => {
    const year = e.target.value;
    setYearError(movieValidator.year(year));
  };

  const validateImage = (e) => {
    const image = e.target.value;
    setImageError(movieValidator.image(image));
  };

  const validateDuration = (e) => {
    const duration = e.target.value;
    setDurationError(movieValidator.duration(duration));
  };

  const validateDescription = (e) => {
    const description = e.target.value;
    setDescriptionError(movieValidator.description(description));
  };

  const isValid =
    Object.values(editMovie).some((x) => x === "") ||
    titleError ||
    categoryError ||
    yearError ||
    imageError ||
    durationError ||
    descriptionError;

  
    return (
        <div className="container px-12 form-container" style={style}>
          <div className="row top-buffer">
            <div className="col-sm-12 col-lg-3 col-lg-8 offset-xl-3 col-xl-6 col">
              <h2 className="heading text-center movie-title">Edit Movie</h2>
              <form onSubmit={editMovieHandler}>
                <div className="form-outline mb-4">
                  <input
                    type="text"
                    name="title"
                    className="form-control"
                    placeholder="Enter game title..."
                    onChange={changeHandler}
                    value={editMovie.title}
                    onBlur={validateTitle}
                  />
                  <label className="form-label" htmlFor="title">
                    Tite
                  </label>
                  {titleError && (
                    <p className="alert alert-danger">
                      Title should be more than 2 and less than 100 symbols.
                    </p>
                  )}
                </div>
    
                <div className="form-outline mb-4">
                  <input
                    type="text"
                    name="category"
                    className="form-control"
                    placeholder="Enter game category..."
                    onChange={changeHandler}
                    value={editMovie.category}
                    onBlur={validateCategory}
                  />
                  <label className="form-label" htmlFor="category">
                    Category
                  </label>
                  {categoryError && (
                    <p className="alert alert-danger">
                      Category should be more than 2 and less than 50 symbols.
                    </p>
                  )}
                </div>
    
                <div className="form-outline mb-4">
                  <input
                    type="text"
                    name="year"
                    className="form-control"
                    placeholder="Enter year in format yyyy"
                    onChange={changeHandler}
                    value={editMovie.year}
                    onBlur={validateYear}
                  />
                  <label className="form-label" htmlFor="year">
                    Year
                  </label>
                  {yearError && (
                    <p className="alert alert-danger">
                      Year should be exact 4 symbols.
                    </p>
                  )}
                </div>
    
                <div className="form-outline mb-4">
                  <input
                    type="text"
                    name="imageUrl"
                    className="form-control"
                    placeholder="Enter game image..."
                    onChange={changeHandler}
                    value={editMovie.imageUrl}
                    onBlur={validateImage}
                  />
                  <label className="form-label" htmlFor="imageUrl">
                    Image
                  </label>
                  {imageError && (
                    <p className="alert alert-danger">
                      Image should be more than 5 and less than 300 symbols.
                    </p>
                  )}
                </div>
    
                <div className="form-outline mb-4">
                  <input
                    type="text"
                    name="duration"
                    className="form-control"
                    placeholder="Enter game duration..."
                    onChange={changeHandler}
                    value={editMovie.duration}
                    onBlur={validateDuration}
                  />
                  <label className="form-label" htmlFor="duration">
                    Duration
                  </label>
                  {durationError && (
                    <p className="alert alert-danger">
                      Duration should be more than 2 and less than 20 symbols.
                    </p>
                  )}
                </div>
    
                <div className="form-outline mb-4">
                  <textarea
                    className="form-control"
                    name="description"
                    rows={3}
                    placeholder="Enter game description..."
                    onChange={changeHandler}
                    value={editMovie.description}
                    onBlur={validateDescription}
                  />
                  <label className="form-label" htmlFor="description">
                    Description
                  </label>
                  {descriptionError && (
                    <p className="alert alert-danger">
                      Description should be more than 10 and less than 500 symbols.
                    </p>
                  )}
                </div>
                {/* Submit button */}
                <button
                  type="submit"
                  className="btn btn-block mb-4"
                  disabled={isValid}
                >
                  Edit movie
                </button>
              </form>
            </div>
          </div>
        </div>
      );
};

export default EditMovie;
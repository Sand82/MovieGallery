import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import * as style from "./Create.Module.css";
import * as movieServis from "../../services/MoviesService.js";
import { AuthContext } from "../../contexts/AuthContext.js";
import * as movieValidator from "../../services/MovieValidator.js";

const CreateMovie = ({createMovieHandler}) => {
  const { user } = useContext(AuthContext);
  const [createMovie, setCreateMovie] = useState({
    title: "",
    category: "",
    year: "",
    imageUrl: "",
    duration: "",
    description: "",
  });

  const [titleError, setTitleError] = useState(false);
  const [categoryError, setCategoryError] = useState(false);
  const [yearError, setYearError] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [durationError, setDurationError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);

  const navigate = useNavigate();

  const changeHandler = (e) => {
    setCreateMovie((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };

  const createMovieHandle = (e) => {
    e.preventDefault();

    const movieData = Object.fromEntries(new FormData(e.target));

    movieServis
      .create(movieData, user.accessToken)
      .then((result) => {
       
        if (result === "Bad response") {
          return navigate("/notfound");
        }
        createMovieHandler(result);
        return navigate("/");
      })
      .catch((error) => {
        throw console.error(error);
      });

    navigate("/");
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
    Object.values(createMovie).some((x) => x === "") ||
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
          <h2 className="heading text-center movie-title">Add Movie</h2>
          <form onSubmit={createMovieHandle}>
            <div className="form-outline mb-4">
              <input
                type="text"
                name="title"
                className="form-control"
                placeholder="Enter game title..."
                onChange={changeHandler}
                value={createMovie.title}
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
                value={createMovie.category}
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
                value={createMovie.year}
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
                value={createMovie.imageUrl}
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
                value={createMovie.duration}
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
                value={createMovie.description}
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
            
            <button
              type="submit"
              className="btn btn-block mb-4"
              disabled={isValid}
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateMovie;

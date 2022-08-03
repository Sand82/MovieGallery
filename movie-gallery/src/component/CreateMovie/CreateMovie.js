import * as style from './Create.Module.css';
import * as movieServis from '../../services/MoviesService.js';

const CreateMovie = () => {

  const createMovieHandle = (e) => {
      e.preventDefault();
 
      const movieData = Object.fromEntries(new FormData(e.target));

      movieServis.create(movieData);

      console.log(movieData);
  }

  return (
    <div className="container px-12 form-container" style={style}>
      <div className="row top-buffer">
        <div className="col-sm-12 col-lg-3 col-lg-8 offset-xl-3 col-xl-6 col">
          <h2 className="heading text-center movie-title">Add Movie</h2>
          <form onSubmit={createMovieHandle}>
            
            <div className="form-outline mb-4">
              <input type="text"  name="title" className="form-control"  placeholder="Enter game title..." />
              <label className="form-label" htmlFor="title">
                Tite
              </label>
              {/* <p className="alert alert-danger">
                  User name should be more than 2 and less than 50 symbols.
              </p> */}
            </div>
            
            <div className="form-outline mb-4">
              <input type="text" name="category" className="form-control" />
              <label className="form-label" htmlFor="category">
                Category
              </label>
            </div>
            
            <div className="form-outline mb-4">
              <input type="text" name="year" className="form-control" />
              <label className="form-label" htmlFor="year">
                Year
              </label>
            </div>

            <div className="form-outline mb-4">
              <input type="text" name="imageUrl" className="form-control" />
              <label className="form-label" htmlFor="imageUrl">
                Image
              </label>
            </div>

            <div className="form-outline mb-4">
              <input type="text" name="duration" className="form-control" />
              <label className="form-label" htmlFor="duration">
                Duration
              </label>
            </div>

            <div className="form-outline mb-4">
              <textarea
                className="form-control"
                name="description"
                rows={3}
                defaultValue={""}
              />
              <label className="form-label" htmlFor="description">
                Description
              </label>
            </div>
            {/* Submit button */}
            <button type="submit" className="btn btn-primary btn-block mb-4">
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateMovie;

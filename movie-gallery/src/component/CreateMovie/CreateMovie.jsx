import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import * as style from "./Create.Module.css";
import * as movieServis from "../../services/MoviesService.js";
import { AuthContext } from "../../contexts/AuthContext.js";
import { MovieContext } from "../../contexts/MovieContext.js";
import * as movieValidator from "../../services/MovieValidator.js";
import Input from "../UI/Input.jsx"
import { useInput } from "../../hooks/useInput.js"
import * as GlobalConstant from "../../constants/GlobalConstants.js"
import { hasLength, isEqualToExactLenght, isValidUrl, hasLengthNumberValue } from "../../services/Validators.js"

const CreateMovie = () => {

const {
	value: titleValue,
	changeHeandler: titleChangeHeandler,
	hasError: titleHasError,
	inputBlurHeandler: titleInputBluerHeandler,
	isEmpty: isTitleFieldEmpty,    
  } = useInput("", (value) => hasLength(value, GlobalConstant.userNameMinLength, GlobalConstant.userNameMaxLength));

const {
	value: categoryValue,
	changeHeandler: categoryChangeHeandler,
	hasError: categoryHasError,
	inputBlurHeandler: categoryInputBluerHeandler,
	isEmpty: isCategoryFieldEmpty,    
} = useInput("", (value) => hasLength(value, GlobalConstant.categoryMinLength, GlobalConstant.categoryMaxLength));

const {
	value: yearValue,
	changeHeandler: yearChangeHeandler,
	hasError: yearHasError,
	inputBlurHeandler: yearInputBluerHeandler,
	isEmpty: isYearFieldEmpty,    
} = useInput("", (value) => isEqualToExactLenght(value, GlobalConstant.yearLength));

const {
	value: imageUrlValue,
	changeHeandler: imageUrlChangeHeandler,
	hasError: imageUrlHasError,
	inputBlurHeandler: imageUrlInputBluerHeandler,
	isEmpty: isImageUrlFieldEmpty,    
} = useInput("", (value) => isValidUrl(value));

const {
	value: durationValue,
	changeHeandler: durationChangeHeandler,
	hasError: durationHasError,
	inputBlurHeandler: durationInputBluerHeandler,
	isEmpty: isDurationFieldEmpty,    
} = useInput("", (value) => hasLengthNumberValue(value, GlobalConstant.durationMinLength, GlobalConstant.durationMaxLength));

const {
	value: descriptionValue,
	changeHeandler: descriptionChangeHeandler,
	hasError: descriptionHasError,
	inputBlurHeandler: descriptionInputBluerHeandler,
	isEmpty: isDescriptionFieldEmpty,    
} = useInput("", (value) => hasLength(value, GlobalConstant.descriptionMinLength, GlobalConstant.descriptionMaxLength));

  const { user } = useContext(AuthContext);
  const { contextCreateMovieHandler } = useContext(MovieContext);  

  const navigate = useNavigate();  

  const createMovieHandler = (e) => {
    e.preventDefault();

    const movieData = {
		title: titleValue,
    	category: categoryValue,
    	year: yearValue,
    	imageUrl: imageUrlValue,
    	duration: durationValue,
    	description: descriptionValue,
	}
	
    movieServis
      .create(movieData, user.accessToken)
      .then((result) => {
        if (result === "Bad response") {
          return navigate("/notfound");
        }
        contextCreateMovieHandler();
        return navigate("/movies");
      })
      .catch((error) => {
        throw console.error(error);
      });
  };
  
  const isValid = titleHasError || isTitleFieldEmpty ||
  				categoryHasError || isCategoryFieldEmpty || 
				yearHasError || isYearFieldEmpty ||
				imageUrlHasError || isImageUrlFieldEmpty ||
				durationHasError || isDurationFieldEmpty ||
				descriptionHasError || isDescriptionFieldEmpty;    

  return (
    <div className="container px-12 form-container" style={style}>
      <div className="row top-buffer">
        <div className="col-sm-12 col-lg-3 col-lg-8 offset-xl-3 col-xl-6 col">
          {user.isAdmin ? (
            <>
              <h2 className="heading text-center movie-title">Create Movie</h2>
              <form onSubmit={createMovieHandler}>
                <div className="form-outline mb-4">                  
                   	<Input
                        label="Title"
                        type="text"
                        name="title" 
						className="form-control"                          
                        value={titleValue}
                        onChange={titleChangeHeandler}
                        onBlur={titleInputBluerHeandler}
                        error={titleHasError && `Title should be between ${GlobalConstant.titleMinLength} and ${GlobalConstant.titelMaxLength} symbols.`}
                    />
                </div>

                <div className="form-outline mb-4">
					<Input
                        label="Category"
                        type="text"
                        name="category" 
						className="form-control"                          
                        value={categoryValue}
                        onChange={categoryChangeHeandler}
                        onBlur={categoryInputBluerHeandler}
                        error={categoryHasError && `Category should be between ${GlobalConstant.categoryMinLength} and ${GlobalConstant.categoryMaxLength} symbols.`}
                    />                  
                </div>

                <div className="form-outline mb-4">                  
				    <Input
                        label="Year"
                        type="text"
                        name="year" 
						className="form-control"                          
                        value={yearValue}
                        onChange={yearChangeHeandler}
                        onBlur={yearInputBluerHeandler}
                        error={yearHasError && `Year should be exact ${GlobalConstant.yearLength} symbols.`}
                    /> 
                </div>

                <div className="form-outline mb-4"> 
					<Input
                        label="Image Link"
                        type="text"
                        name="imageUrl" 
						className="form-control"                          
                        value={imageUrlValue}
                        onChange={imageUrlChangeHeandler}
                        onBlur={imageUrlInputBluerHeandler}
                        error={imageUrlHasError && `Image link shoud be valid Url.`}
                    />                   
                </div>

                <div className="form-outline mb-4">                  
				  	<Input
                        label="Duration"
                        type="text"
                        name="duration" 
						className="form-control"                          
                        value={durationValue}
                        onChange={durationChangeHeandler}
                        onBlur={durationInputBluerHeandler}
                        error={durationHasError && `Duration should be between ${GlobalConstant.durationMinLength} and ${GlobalConstant.durationMaxLength} symbols.`}
                    /> 
                </div>

                <div className="form-outline mb-4">
					<Input
                        label="Description"
                        type="textarea"
                        name="duration"
						fieldType="textarea"
						rows={3} 
						className="form-control"                          
                        value={descriptionValue}
                        onChange={descriptionChangeHeandler}
                        onBlur={descriptionInputBluerHeandler}
                        error={descriptionHasError && `description should be between ${GlobalConstant.descriptionMinLength} and ${GlobalConstant.descriptionMaxLength} symbols.`}
                    />                 
                </div>
                {/* Submit button */}
                <button
                  type="submit"
                  className="btn btn-block mb-4"
				  disabled={isValid}
                >
                  Send
                </button>
              </form>
            </>
          ) : (
            <h1 style={{ textAlign: "center" }}>
              You don't have rights to create movie.
            </h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateMovie;

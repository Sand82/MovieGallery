import { useContext } from "react";

import { AuthContext } from "../../contexts/AuthContext.js";
import { MovieContext } from "../../contexts/MovieContext.js";
import Input from "../UI/Input.jsx"
import { useInput } from "../../hooks/useInput.js"
import * as GlobalConstant from "../../constants/GlobalConstants.js"
import { hasLength, isEqualToExactLenght, isValidUrl, hasLengthNumberValue } from "../../services/Validators.js"
import { DetailContext } from "../../contexts/DetailContext.js";
import style from "./ManageMove.module.css"

const ManageMovie = ({isCreated}) => {

const { user } = useContext(AuthContext);
const { createHandler, editHandler } = useContext(MovieContext);
const { movie } = useContext(DetailContext);

const {
	value: titleValue,
	changeHandler: titleChangeHandler,
	hasError: titleHasError,
	inputBlurHandler: titleInputBluerHandler,
	isEmpty: isTitleFieldEmpty,    
  } = useInput(isCreated ? "": movie.title, (value) => hasLength(value, GlobalConstant.userNameMinLength, GlobalConstant.userNameMaxLength));

const {
	value: categoryValue,
	changeHandler: categoryChangeHandler,
	hasError: categoryHasError,
	inputBlurHandler: categoryInputBluerHandler,
	isEmpty: isCategoryFieldEmpty,    
} = useInput(isCreated ? "": movie.category, (value) => hasLength(value, GlobalConstant.categoryMinLength, GlobalConstant.categoryMaxLength));

const {
	value: yearValue,
	changeHandler: yearChangeHandler,
	hasError: yearHasError,
	inputBlurHandler: yearInputBluerHandler,
	isEmpty: isYearFieldEmpty,    
} = useInput(isCreated ? "": movie.year, (value) => isEqualToExactLenght(value, GlobalConstant.yearLength));

const {
	value: imageUrlValue,
	changeHandler: imageUrlChangeHandler,
	hasError: imageUrlHasError,
	inputBlurHandler: imageUrlInputBluerHandler,
	isEmpty: isImageUrlFieldEmpty,    
} = useInput(isCreated ? "": movie.imageUrl, (value) => isValidUrl(value));

const {
	value: durationValue,
	changeHandler: durationChangeHandler,
	hasError: durationHasError,
	inputBlurHandler: durationInputBluerHandler,
	isEmpty: isDurationFieldEmpty,    
} = useInput(isCreated ? "": movie.duration, (value) => hasLengthNumberValue(value, GlobalConstant.durationMinLength, GlobalConstant.durationMaxLength));

const {
	value: descriptionValue,
	changeHandler: descriptionChangeHandler,
	hasError: descriptionHasError,
	inputBlurHandler: descriptionInputBluerHandler,
	isEmpty: isDescriptionFieldEmpty,    
} = useInput(isCreated ? "": movie.description, (value) => hasLength(value, GlobalConstant.textareaMinLength, GlobalConstant.textareaMaxLength));
 
  const manageMovieHandler = (e) => {
    e.preventDefault();	

    const movieData = {
      id: movie.id,
		  title: titleValue,
    	category: categoryValue,
    	year: yearValue,
    	imageUrl: imageUrlValue,
    	duration: durationValue,
    	description: descriptionValue,
	  }

    if (isCreated) {
      createHandler(movieData);      
    } else {
      editHandler(movieData);
    }   
  };   
  
const isValid = titleHasError || isTitleFieldEmpty ||
  	categoryHasError || isCategoryFieldEmpty || 
	  yearHasError || isYearFieldEmpty ||
	  imageUrlHasError || isImageUrlFieldEmpty ||
	  durationHasError || isDurationFieldEmpty ||
	  descriptionHasError || isDescriptionFieldEmpty; 
    
const movieActionType = isCreated ? "Create" : "Edit";

return (
    <div className={`container px-12 ${style["form-container"]}`}>
      <div className="row top-buffer">
        <div className="col-sm-12 col-lg-3 col-lg-8 offset-xl-3 col-xl-6 col">
          {user.isAdmin ? (
            <>
              <h2 className={`heading text-center ${style["movie-title"]}`}>{movieActionType} Movie</h2>
              <form onSubmit={manageMovieHandler}>
                <div className="form-outline mb-4">                  
                   	<Input
                        label="Title"
                        type="text"
                        name="title" 
                        className="form-control"                          
                        value={titleValue}
                        onChange={titleChangeHandler}
                        onBlur={titleInputBluerHandler}
                        error={titleHasError && 
                          `Title should be between ${GlobalConstant.titleMinLength} and 
                          ${GlobalConstant.titelMaxLength} symbols.`}
                    />
                </div>

                <div className="form-outline mb-4">
                     <Input
                        label="Category"
                        type="text"
                        name="category" 
                        className="form-control"                          
                        value={categoryValue}
                        onChange={categoryChangeHandler}
                        onBlur={categoryInputBluerHandler}
                        error={categoryHasError && 
                          `Category should be between ${GlobalConstant.categoryMinLength} and 
                          ${GlobalConstant.categoryMaxLength} symbols.`}
                    />                  
                </div>

                <div className="form-outline mb-4">                  
                      <Input
                        label="Year"
                        type="text"
                        name="year" 
                        className="form-control"                          
                        value={yearValue}
                        onChange={yearChangeHandler}
                        onBlur={yearInputBluerHandler}
                        error={yearHasError && 
                          `Year should be exact ${GlobalConstant.yearLength} symbols.`}
                    /> 
                </div>

                <div className="form-outline mb-4"> 
                      <Input
                        label="Image Link"
                        type="text"
                        name="imageUrl" 
                        className="form-control"                          
                        value={imageUrlValue}
                        onChange={imageUrlChangeHandler}
                        onBlur={imageUrlInputBluerHandler}
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
                        onChange={durationChangeHandler}
                        onBlur={durationInputBluerHandler}
                        error={durationHasError && 
                          `Duration should be between ${GlobalConstant.durationMinLength} and 
                          ${GlobalConstant.durationMaxLength} symbols.`}
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
                        onChange={descriptionChangeHandler}
                        onBlur={descriptionInputBluerHandler}
                        error={descriptionHasError && 
                          `description should be between ${GlobalConstant.textareaMinLength} and 
                          ${GlobalConstant.textareaMaxLength} symbols.`}
                    />                 
                </div>
                {/* Submit button */}
                <button
                  type="submit"
                  className="btn btn-block mb-4"                  
                  disabled={isValid}
                >
                  {movieActionType}
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

export default ManageMovie;
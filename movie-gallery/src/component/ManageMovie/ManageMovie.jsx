import { useContext } from "react";

import * as GlobalConstant from "../../constants/GlobalConstants.js";
import Input from "../UI/Input/Input.jsx";
import Error from "../UI/Error/Error.jsx";
import TextEditor from "../UI/TextEditor/TextEditor.jsx";
import style from "./ManageMove.module.css";
import { useInput } from "../../hooks/useInput.js";
import { DetailContext } from "../../contexts/DetailContext.js";
import { AuthContext } from "../../contexts/AuthContext.js";
import { MovieContext } from "../../contexts/MovieContext.js";
import { hasLength, isEqualToExactLenght, isValidUrl, hasLengthNumberValue } from "../../services/Validators.js";
import { useTextEditor } from "../../hooks/useTextEditor.js";

const ManageMovie = ({ isCreated }) => {
  const { user } = useContext(AuthContext);
  const { createHandler, editHandler, serverErrors } = useContext(MovieContext);
  const { movie } = useContext(DetailContext);

  const {
    value: titleValue,
    changeHandler: titleChangeHandler,
    hasError: titleHasError,
    inputBlurHandler: titleInputBluerHandler,
    isEmpty: isTitleFieldEmpty,
  } = useInput(isCreated ? "" : movie.title, (value) =>
    hasLength(value, GlobalConstant.userNameMinLength, GlobalConstant.userNameMaxLength)
  );

  const {
    value: categoryValue,
    changeHandler: categoryChangeHandler,
    hasError: categoryHasError,
    inputBlurHandler: categoryInputBluerHandler,
    isEmpty: isCategoryFieldEmpty,
  } = useInput(isCreated ? "" : movie.category, (value) =>
    hasLength(value, GlobalConstant.categoryMinLength, GlobalConstant.categoryMaxLength)
  );

  const {
    value: yearValue,
    changeHandler: yearChangeHandler,
    hasError: yearHasError,
    inputBlurHandler: yearInputBluerHandler,
    isEmpty: isYearFieldEmpty,
  } = useInput(isCreated ? "" : movie.year, (value) => isEqualToExactLenght(value, GlobalConstant.yearLength));

  const {
    value: imageUrlValue,
    changeHandler: imageUrlChangeHandler,
    hasError: imageUrlHasError,
    inputBlurHandler: imageUrlInputBluerHandler,
    isEmpty: isImageUrlFieldEmpty,
  } = useInput(isCreated ? "" : movie.imageUrl, (value) => isValidUrl(value));

  const {
    value: durationValue,
    changeHandler: durationChangeHandler,
    hasError: durationHasError,
    inputBlurHandler: durationInputBluerHandler,
    isEmpty: isDurationFieldEmpty,
  } = useInput(isCreated ? "" : movie.duration, (value) =>
    hasLengthNumberValue(value, GlobalConstant.durationMinLength, GlobalConstant.durationMaxLength)
  );

  const {
    value: embededVideoValue,
    changeHandler: embededVideoChangeHandler,
    hasError: embededVideoHasError,
    inputBlurHandler: embededVideoInputBluerHandler,
    isEmpty: isEmbededVideoFieldEmpty,
  } = useInput(isCreated ? "" : movie.embededVideo, (value) =>
    isEqualToExactLenght(value, GlobalConstant.embededVideoLength)
  );
  
  const {
    editorState: textEditorState,
    textEditorInput: textEditorInput,
    handleKeyCommand: textEditorKeyCommnad,
    handleEditorChange: textEditorChangeHandler,
    inputBlurHandler: textEditorInputBluerHandler,
    applyStyle: textEditorApplyStyle,
    applyBlockStyle: textEditorApplyBlockStyle,
    applyLink: textEditorApplyLink,
    hasError: textEditorHasError,
    isEmpty: isTextEditorFieldEmpty, 
  } = useTextEditor(isCreated ? "" : movie.description, (value) =>
    hasLength(value, GlobalConstant.descriptionMinLength, GlobalConstant.descriptionMaxLength)
  );   

  const manageMovieHandler = (e) => {
    e.preventDefault();      
    
    console.log(textEditorInput); 

    const movieData = {
      id: movie.id,
      title: titleValue,
      category: categoryValue,
      year: yearValue,
      imageUrl: imageUrlValue,
      duration: durationValue,
      description: textEditorInput,
      embededVideo: embededVideoValue,      
    };

    if (isCreated) {
      createHandler(movieData);
    } else {
      editHandler(movieData);
    }
  };  

  const isValid =
    titleHasError ||
    isTitleFieldEmpty ||
    categoryHasError ||
    isCategoryFieldEmpty ||
    yearHasError ||
    isYearFieldEmpty ||
    imageUrlHasError ||
    isImageUrlFieldEmpty ||
    durationHasError ||
    isDurationFieldEmpty ||
    isTextEditorFieldEmpty ||
    embededVideoHasError ||
    isEmbededVideoFieldEmpty ||
    serverErrors;

  const movieActionType = isCreated ? "Create" : "Edit";

  return (
    <div className={`container px-12 ${style["form-container"]}`}>
      <div className="row">
        <div className="col">
          {user.isAdmin ? (
            <>
            <div className="mt-5 mb-5 section-head">
              <h2 className="section-title text-uppercase">{movieActionType} Movie</h2>
            </div>
              <form onSubmit={manageMovieHandler}>
                <div className="col-12">
                  <Error error={serverErrors} />
                </div>
                <div className="row mb-4">                  
                  <div className="col-12 col-md-4">
                    <Input
                      label="Title"
                      type="text"
                      name="title"
                      className="form-control"
                      value={titleValue}
                      onChange={titleChangeHandler}
                      onBlur={titleInputBluerHandler}
                      error={titleHasError && `Title should be between ${GlobalConstant.titleMinLength} and ${GlobalConstant.titelMaxLength} symbols.`}
                    />
                  </div>
                  <div className="col-12 col-md-4">
                    <Input
                      label="Category"
                      type="text"
                      name="category"
                      className="form-control"
                      value={categoryValue}
                      onChange={categoryChangeHandler}
                      onBlur={categoryInputBluerHandler}
                      error={categoryHasError && `Category should be between ${GlobalConstant.categoryMinLength} and ${GlobalConstant.categoryMaxLength} symbols.`}
                    />                
                  </div>
                  <div className="col-12 col-md-4">
                    <Input
                      label="You Tude Embeded Video Code"
                      type="text"
                      name="embededVideo"
                      className="form-control"
                      value={embededVideoValue}
                      onChange={embededVideoChangeHandler}
                      onBlur={embededVideoInputBluerHandler}
                      error={embededVideoHasError && `Embeded video code should be exact ${GlobalConstant.embededVideoLength} symbols.`}
                    />
                  </div>
                </div> 
                <div className="row mb-4">
                  <div className="col-12 col-md-4">
                    <Input
                      label="Year"
                      type="text"
                      name="year"
                      className="form-control"
                      value={yearValue}
                      onChange={yearChangeHandler}
                      onBlur={yearInputBluerHandler}
                      error={yearHasError && `Year should be exact ${GlobalConstant.yearLength} symbols.`}
                    />
                  </div>

                  <div className="col-12 col-md-4">
                    <Input
                      label="Image Link"
                      type="text"
                      name="imageUrl"
                      className="form-control"
                      value={imageUrlValue}
                      onChange={imageUrlChangeHandler}
                      onBlur={imageUrlInputBluerHandler}
                      error={imageUrlHasError && `Image link should be a valid URL.`}
                    />
                  </div>

                  <div className="col-12 col-md-4">
                    <Input
                      label="Duration"
                      type="text"
                      name="duration"
                      className="form-control"
                      value={durationValue}
                      onChange={durationChangeHandler}
                      onBlur={durationInputBluerHandler}
                      error={durationHasError && `Duration should be between ${GlobalConstant.durationMinLength} and ${GlobalConstant.durationMaxLength} symbols.`}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <TextEditor 
                      editorState={textEditorState}
                      onChange={textEditorChangeHandler} 
                      handleKeyCommand={textEditorKeyCommnad}
                      onBlur={textEditorInputBluerHandler}                       
                      applyStyle={textEditorApplyStyle} 
                      applyBlockStyle={textEditorApplyBlockStyle}
                      applyLink={textEditorApplyLink}                      
                      error={textEditorHasError && `Description should be between ${GlobalConstant.descriptionMinLength} and ${GlobalConstant.descriptionMaxLength} symbols.`}
                    />                       
                  </div>
                </div>
                
                <button type="submit" className={`btn btn-block col-4 offset-md-4 mb-4 ${style["create-button"]}`} disabled={isValid}>
                  {movieActionType}
                </button>
              </form>
            </>
          ) : (
            <h1 style={{ textAlign: "center" }}>You don't have rights to create a movie.</h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageMovie;

import { useContext, useState } from "react";

import * as GlobalConstant from "../../constants/GlobalConstants.js";
import Input from "../UI/Input/Input.jsx";
import Error from "../UI/Error/Error.jsx";
import TextEditor from "../UI/TextEditor/TextEditor.jsx";
import DynamicInput from "../UI/DynamicInput/DynamicInput.jsx";
import style from "./ManageMove.module.css";
import MultiSelect from "../UI/MultiSelect/MultiSelect.jsx";
import { convertToOptions } from "../../services/HelperService.js"
import { useInput } from "../../hooks/useInput.js";
import { DetailContext } from "../../contexts/DetailContext.js";
import { AuthContext } from "../../contexts/AuthContext.js";
import { MovieContext } from "../../contexts/MovieContext.js";
import { hasLength, isEqualToExactLenght, isValidUrl, hasLengthNumberValue } from "../../services/Validators.js";
import { useTextEditor } from "../../hooks/useTextEditor.js";
import { useMultiSelect } from "../../hooks/useMultiSelect.js"
import { StaticDataContext } from "../../contexts/StaticDataContext.js";

const ManageMovie = ({ isCreated }) => {
  const { user } = useContext(AuthContext);
  const { createHandler, editHandler, serverErrors } = useContext(MovieContext);
  const { movie } = useContext(DetailContext);  
  const { staticData } = useContext(StaticDataContext);

  console.log(staticData)

  const [starringValue, setStarringValue] = useState(isCreated && movie
    ? [] 
    : movie.starring.map(x => ({name: x.name, error: false, isFieldEdited: true, id: x.id}))
  ); 

  const [directorValue, setDirectorValue] = useState(isCreated && movie
    ? [] 
    : movie.directors.map(x => ({name: x.name, error: false, isFieldEdited: true, id: x.id}))
  );

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
    value: releaseValue,
    changeHandler: releaseChangeHandler,
    hasError: releaseHasError,
    inputBlurHandler: releaseInputBluerHandler,
    isEmpty: isReleaseFieldEmpty,
  } = useInput(isCreated ? "" : movie.release, (value) =>
    hasLength(value, GlobalConstant.releaseMinLength, GlobalConstant.releaseMaxLength)
  );

  const { 
    selectedOptions: countriesOptions, 
    error: countriesError, 
    changeHandler:  contriesChangeHandler} = useMultiSelect(isCreated ? [] : convertToOptions(movie.countries), 
    "Please select at least one country."
  );

  const { 
    selectedOptions: languagesOptions, 
    error: languagesError, 
    changeHandler:  languagesChangeHandler} = useMultiSelect(isCreated ? [] : convertToOptions(movie.languages), 
    "Please select at least one language."
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

  const startingInputHandler = (newValues) => {
    setStarringValue(newValues);    
  }

  const directorInputHandler = (newValues) => {
    setDirectorValue(newValues);    
  }

  const manageMovieHandler = (e) => {
    e.preventDefault();
    
    const movieData = {
      id: movie.id,
      title: titleValue,
      category: categoryValue,
      year: yearValue,
      imageUrl: imageUrlValue,
      duration: durationValue,
      description: textEditorInput,
      embededVideo: embededVideoValue,
      release: releaseValue,
      starring: isCreated 
      ? starringValue.map(field => field.name) 
      : starringValue.map((field) => ({id: field.id ? field.id : -1, name: field.name })),      
      directors: isCreated
      ? directorValue.map(field => field.name)
      : directorValue.map((field) => ({id: field.id ? field.id : -1, name: field.name }))
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
    serverErrors || 
    releaseHasError ||
    isReleaseFieldEmpty ||
    starringValue.some(input => input.error) ||
    starringValue.some(input => !input.isFieldEdited) ||
    directorValue.some(input => input.error) ||
    directorValue.some(input => !input.isFieldEdited); 

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
                  <div className="col-12 col-md-6">
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
                  <div className="col-12 col-md-6">
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
                <div className="row mb-5">                  
                  <div className="col-12 col-md-6">
                    <Input
                      label="Release Information"
                      type="text"
                      name="release"
                      className="form-control"
                      value={releaseValue}
                      onChange={releaseChangeHandler}
                      onBlur={releaseInputBluerHandler}
                      error={releaseHasError && `Title should be between ${GlobalConstant.titleMinLength} and ${GlobalConstant.titelMaxLength} symbols.`}
                    />
                  </div>                  
                  <div className="col-12 col-md-6">
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
                <div className="row mb-5">
                  <div className="col-12">
                      <DynamicInput 
                        sectionName={"Director Section"} 
                        inputData={isCreated ? undefined : movie.directors} 
                        onChange={directorInputHandler}
                      />
                  </div>
                </div>
                <div className="row mb-4">
                  <div className="col-12">
                      <DynamicInput 
                        sectionName={"Starring Section"} 
                        inputData={isCreated ? undefined : movie.starring} 
                        onChange={startingInputHandler}
                      />
                  </div>
                </div> 
                <div className="row mb-4">
                  <div className="col-12 col-md-6">
                      <MultiSelect 
                        label={"Countries"} 
                        options={convertToOptions(staticData.countries)} 
                        selectedOptions={countriesOptions} 
                        error={countriesError}
                        changeHandler={contriesChangeHandler}
                      />
                  </div>
                  <div className="col-12 col-md-6">
                      <MultiSelect 
                        label={"Languages"} 
                        options={convertToOptions(staticData.languages)} 
                        selectedOptions={languagesOptions} 
                        error={languagesError}
                        changeHandler={languagesChangeHandler}
                      />
                  </div>
                </div>               
                <div className="row mb-5">
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

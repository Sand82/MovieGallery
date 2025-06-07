import { useContext, useState } from "react";

import * as GlobalConstant from "../../constants/GlobalConstants.js";
import Input from "../UI/Input/Input.jsx";
import Error from "../UI/Error/Error.jsx";
import TextEditor from "../UI/TextEditor/TextEditor.jsx";
import DynamicInput from "../UI/DynamicInput/DynamicInput.jsx";
import style from "./ManageMove.module.css";
import MultiSelect from "../UI/MultiSelect/MultiSelect.jsx";
import Tags from "../UI/Tags/Tags.jsx"
import FildInput from "../UI/FileInput/FileInput.jsx"
import { convertToOptions, convertToEntity, objectArrayToStringArray } from "../../services/HelperService.js"
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

  console.log(movie);

  const [starringValue, setStarringValue] = useState(isCreated && movie
    ? [] 
    : movie.starring.map(x => ({name: x.name, error: false, isFieldEdited: true, id: x.id}))
  ); 

  const [directorValue, setDirectorValue] = useState(isCreated && movie
    ? [] 
    : movie.directors.map(x => ({name: x.name, error: false, isFieldEdited: true, id: x.id}))
  );  
  
  const [tags, setTags] = useState([]);

  const [fileInfo, setFileInfo] = useState({file: null, error: ""});
  
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
    value: companyValue,
    changeHandler: companyChangeHandler,
    hasError: companyHasError,
    inputBlurHandler: companyInputBluerHandler,
    isEmpty: isCompanyFieldEmpty,
  } = useInput(isCreated ? "" : movie.company, (value) =>
    hasLength(value, GlobalConstant.companyMinLength, GlobalConstant.companyMaxLength)
  );  

  const {
    value: yearValue,
    changeHandler: yearChangeHandler,
    hasError: yearHasError,
    inputBlurHandler: yearInputBluerHandler,
    isEmpty: isYearFieldEmpty,
  } = useInput(isCreated ? "" : movie.year, (value) => isEqualToExactLenght(value, GlobalConstant.yearLength));
  
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
    hasError: countriesHasError,
    isTouched: countriesIsTouched,
    changeHandler:  contriesChangeHandler} = useMultiSelect(isCreated ? [] : convertToOptions(movie.countries), 
    "Please select at least one country."
  );

  const { 
    selectedOptions: languagesOptions, 
    hasError: languagesHasError, 
    isTouched : languagesIsTouched,
    changeHandler:  languagesChangeHandler} = useMultiSelect(isCreated ? [] : convertToOptions(movie.languages), 
    "Please select at least one language."
  );

  const { 
    selectedOptions: categoriesOptions, 
    hasError: categoriesHasError, 
    isTouched : categoriesIsTouched,
    changeHandler:  categoriesChangeHandler} = useMultiSelect(isCreated ? [] : convertToOptions(movie.categories), 
    "Please select at least one category."
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

  const tagHandler = (value) => {    
    setTags(value);
  }

  const fileInfoHandler = (fileInfo) => {
    setFileInfo((state) => ({file: fileInfo.file, error: fileInfo.error}));
  }

  const manageMovieHandler = (e) => {
    e.preventDefault();
    
    const movieData = {
      id: movie.id,
      title: titleValue,
      company: companyValue,      
      year: yearValue,      
      duration: durationValue,
      description: textEditorInput,
      embededVideo: embededVideoValue,
      release: releaseValue,
      starring: isCreated 
      ? starringValue.map(field => field.name) 
      : starringValue.map((field) => ({id: field.id ? field.id : -1, name: field.name })),      
      directors: isCreated
      ? directorValue.map(field => field.name)
      : directorValue.map((field) => ({id: field.id ? field.id : -1, name: field.name })),
      countries: convertToEntity(countriesOptions),
      languages: convertToEntity(languagesOptions),
      categories: convertToEntity(categoriesOptions),
      tags: tags,      
    };     

    if (isCreated) {
      createHandler(movieData, fileInfo.file);
    } else {
      editHandler(movieData, fileInfo.file);
    }
  };  

  const isValid =
    titleHasError ||
    isTitleFieldEmpty ||
    companyHasError ||
    isCompanyFieldEmpty ||    
    yearHasError ||
    isYearFieldEmpty ||   
    durationHasError ||
    isDurationFieldEmpty ||
    isTextEditorFieldEmpty ||
    embededVideoHasError ||
    isEmbededVideoFieldEmpty ||     
    releaseHasError ||
    isReleaseFieldEmpty ||
    countriesHasError !== "" || !countriesIsTouched ||
    languagesHasError !== "" || !languagesIsTouched ||
    categoriesHasError !== "" || !categoriesIsTouched ||
    starringValue.some(input => input.error) ||
    starringValue.some(input => !input.isFieldEdited) ||
    directorValue.some(input => input.error) ||
    directorValue.some(input => !input.isFieldEdited) ||
    fileInfo.error !== "" ||
    serverErrors ; 

  const movieActionType = isCreated ? "Create" : "Edit";

  //TODO Server error functionality
  // <div className="col-12">
  //   <Error error={serverErrors} />
  // </div>

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
                      label="Company"
                      type="text"
                      name="company"
                      className="form-control"
                      value={companyValue}
                      onChange={companyChangeHandler}
                      onBlur={companyInputBluerHandler}
                      error={companyHasError && `company should be between ${GlobalConstant.companyMinLength} and ${GlobalConstant.companyMaxLength} symbols.`}
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
                <div className="row mb-4">                  
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
                  <FildInput fileHandler={fileInfoHandler} fileName={isCreated ? null : movie.mainImage} accessToken={user.AccessToken}/>
                </div> 
                <div className="row mb-5">
                  <div className="col-12 col-md-4">
                    <MultiSelect 
                      label={"Countries"} 
                      options={convertToOptions(staticData.countries)} 
                      selectedOptions={countriesOptions} 
                      error={countriesHasError}
                      changeHandler={contriesChangeHandler}
                    />
                  </div>
                  <div className="col-12 col-md-4">
                    <MultiSelect 
                      label={"Languages"} 
                      options={convertToOptions(staticData.languages)} 
                      selectedOptions={languagesOptions} 
                      error={languagesHasError}
                      changeHandler={languagesChangeHandler}
                    />
                  </div>
                  <div className="col-12 col-md-4">
                    <MultiSelect 
                      label={"Category"} 
                      options={convertToOptions(staticData.categories)} 
                      selectedOptions={categoriesOptions} 
                      error={categoriesHasError}
                      changeHandler={categoriesChangeHandler}
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
                <div className="row mb-5">
                  <div className="col-12">
                      <DynamicInput 
                        sectionName={"Starring Section"} 
                        inputData={isCreated ? undefined : movie.starring} 
                        onChange={startingInputHandler}
                      />
                  </div>
                </div>
                <div className="row mb-5">                  
                  <div className="col-12">
                    <Tags tagHandler={tagHandler} defaultValue={isCreated ? [] : objectArrayToStringArray(movie.tags)} />
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
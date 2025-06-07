import { useEffect, useState, useContext } from "react";

import * as fileService from "../../../services/FilesService.js"
import styles from "./FileInput.module.css";
import Error from "../Error/Error.jsx";
import { fileImageValidator } from "../../../services/Validators.js"
import { StaticDataContext } from "../../../contexts/StaticDataContext.js";
import { formatFileName } from "../../../services/HelperService.js"

const FileInput = ({fileHandler, fileName, accessToken}) => {
  const [file, setFile] = useState({file: null, error: ""});
  
  const { staticData } = useContext(StaticDataContext);

  useEffect(() => {
    if (!fileName) {
      setFile({ file: null, error: "" });
      return;
    }
    fileService.getFile(fileName, accessToken).then(blob => {
      const fetchedFile = new File([blob], fileName, { type: blob.type });
      setFile({ file: fetchedFile, error: "" });
      fileHandler({ file: fetchedFile, error: "" });
    });
}, [fileName, accessToken]);

  const fileChangeHandler = (event) => {
    const selectedFile = event.target.files[0];

    if (!selectedFile) {
      setFile((state) => ({file: null, error: ""}));      
      return;
    }    
    
    if (!fileImageValidator(selectedFile.type)) {      
      setFile((state) => ({file: null, error: "Invalid file type. Only png, jpeg, or gif allowed."}));
      return;
    }

    let fileName = formatFileName(event.target.files[0].name);  

    if (staticData.fileNames.includes(fileName)) {
      console.log("Error not allowed repat file name");
      setFile((state) => ({file: null, error: "Each image must have a unique name. Select a different file or rename the current one."}));
      return;
    }    

    setFile((state) => ({file: selectedFile, error: ""}));
    fileHandler({file: selectedFile, error: ""})
  };	

  return (
  <div className="mb-3 col-6">
    <label htmlFor="formFileSm" className="form-label">Upload Image</label>

    <div className="input-group">
      <input
        type="file"
        id="formFileSm"
        className={`form-control ${styles["file-hidden"]}`} 
        onChange={fileChangeHandler}               
      />

      <input
        type="text"
        className={`form-control form-control-sm ${styles["file-input"]}`}
        value={file.file?.name || "No file chosen"}
        disabled
      />

      <button
        type="button"
        className="btn btn-secondary btn-sm"
        onClick={() => document.getElementById("formFileSm").click()}
      >
        Choose file
      </button>
    </div>

    {file.error && <Error error={file.error} />}
  </div>
  );
};

export default FileInput;

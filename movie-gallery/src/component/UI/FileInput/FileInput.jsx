import { useState } from "react";

import styles from "./FileInput.module.css";
import Error from "../Error/Error.jsx";
import { fileImageValidator } from "../../../services/Validators.js"

const FileInput = ({fileHandler}) => {
  const [fileInfo, setFileInfo] = useState({file: null, error: ""});  

  const fileChangeHandler = (event) => {
    const selectedFile = event.target.files[0];

    if (!selectedFile) {
      setFileInfo((state) => ({file: null, error: ""}));      
      return;
    }
    
    if (!fileImageValidator(selectedFile.type)) {
      
      setFileInfo((state) => ({file: null, error: "Invalid file type. Only png, jpeg, or gif allowed."}));
      return;
    }
      setFileInfo((state) => ({file: selectedFile, error: ""}));
      fileHandler({file: selectedFile, error: ""})
  };	

  return (
    <div className="mb-3 col-6">
      <label htmlFor="formFileSm" className="form-label">Upload Image</label>
      <input
        className={`form-control form-control-sm ${styles["file-input"]}`}
        id="formFileSm"
        type="file"
        onChange={fileChangeHandler}
      />

      {fileInfo.error && (
        <Error error={fileInfo.error} />
      )}      
    </div>
  );
};

export default FileInput;

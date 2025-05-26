import { useState } from "react";

import styles from "./FileInput.module.css";
import Error from "../Error/Error.jsx";
import { fileImageValidator } from "../../../services/Validators.js"

const FileInput = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  const fileChangeHandler = (event) => {
    const selectedFile = event.target.files[0];

    if (!selectedFile) {
      setFile(null);
      setError("");
      return;
    }
    
    if (!fileImageValidator(selectedFile.type)) {
      setFile(null);
      setError("Invalid file type. Only png, jpeg, or gif allowed.");
      return;
    }    

    setFile(selectedFile);
    setError("");
  };

	console.log(file)

  return (
    <div className="mb-3 col-6">
      <label htmlFor="formFileSm" className="form-label">Upload Image</label>
      <input
        className={`form-control form-control-sm ${styles["file-input"]}`}
        id="formFileSm"
        type="file"
        onChange={fileChangeHandler}
      />

      {error && (
        <Error error={error} />
      )}      
    </div>
  );
};

export default FileInput;

import React from "react";
import { Editor } from "draft-js";
import "draft-js/dist/Draft.css";

import style from "./TextEditor.module.css"
import Error from "../Error/Error.jsx";

const TextEditor = ({ applyStyle, applyBlockStyle, applyLink, error, ...props }) => {
  
  return (
		<>
			<label>Long Description</label>
			<div className={`${style["editor-container"]}`}>      
    	  <div className={`${style["editor-toolbar"]}`}>
		
    	    <button className={`${style["editor-btn"]}`} onClick={(e) => applyStyle("BOLD", e)}><b>B</b></button>
    	    <button className={`${style["editor-btn"]}`} onClick={(e) => applyStyle("ITALIC", e)}><i>I</i></button>
    	    <button className={`${style["editor-btn"]}`} onClick={(e) => applyStyle("UNDERLINE", e)}><u>U</u></button>
		
    	    <button className={`${style["editor-btn"]}`} onClick={(e) => applyBlockStyle("header-one", e)}>H1</button>
    	    <button className={`${style["editor-btn"]}`} onClick={(e) => applyBlockStyle("header-two", e)}>H2</button>
					<button className={`${style["editor-btn"]}`} onClick={(e) => applyBlockStyle("header-three", e)}>H3</button>
					<button className={`${style["editor-btn"]}`} onClick={(e) => applyBlockStyle("header-four", e)}>H4</button>
					<button className={`${style["editor-btn"]}`} onClick={(e) => applyBlockStyle("header-five", e)}>H5</button>
					<button className={`${style["editor-btn"]}`} onClick={(e) => applyBlockStyle("header-six", e)}>H6</button>

    	    <button className={`${style["editor-btn"]}`} onClick={(e) => applyBlockStyle("unordered-list-item", e)}>• List</button>
    	    <button className={`${style["editor-btn"]}`} onClick={(e) => applyBlockStyle("ordered-list-item", e)}>1. List</button>
					<button className={`${style["editor-btn"]}`} onClick={ applyLink }> Link </button>    	   
    	  </div>
		
    	  <div className={`${style["editor-content"]}`}>
    	    <Editor {...props} />
    	  </div>
    	</div>
			<Error error={error}/>
		</>
    
  );
};

export default TextEditor;

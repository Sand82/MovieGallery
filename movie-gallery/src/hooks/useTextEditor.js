import { useState } from "react";
import { EditorState, RichUtils, ContentState } from "draft-js";
import { stateToHTML } from "draft-js-export-html";

import { convertHtmlToContentState } from "../services/HelperService.js";

export const useTextEditor = (value, validationFn) => {
  const [textEditorInput, setTextEditorInput] = useState(value ? value : "");
  const [didEdit, setDidEdit] = useState(value === "" ? false : true);

  const initialState = value
    ? convertHtmlToContentState(value)
    : ContentState.createFromText("");

  const [editorState, setEditorState] = useState(
    value
      ? EditorState.createWithContent(initialState)
      : EditorState.createEmpty()
  );

  const handleEditorChange = (newState) => {
    setEditorState(newState);
    const htmlContent = stateToHTML(newState.getCurrentContent());
    setTextEditorInput(htmlContent);
  };

  const handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      handleEditorChange(newState);
      return "handled";
    }
    return "not-handled";
  };

  const inputBlurHandler = () => {
    setDidEdit(true);
  };

  const applyStyle = (style, e) => {
    e.preventDefault();
    const newState = RichUtils.toggleInlineStyle(editorState, style);
    setEditorState(newState);
  };

  const applyBlockStyle = (blockType, e) => {
    e.preventDefault();
    setEditorState(
      EditorState.forceSelection(
        RichUtils.toggleBlockType(editorState, blockType),
        editorState.getSelection()
      )
    );
  };

  const applyLink = (e) => {
    e.preventDefault();

    const url = prompt("Enter the URL:");

    if (url) {
      const selection = editorState.getSelection();

      if (!selection.isCollapsed()) {
        const newEditorState = RichUtils.toggleLink(
          editorState,
          selection,
          url
        );
        setEditorState(newEditorState);
      }
    }
  };

  return {
    editorState,
    textEditorInput,
    handleKeyCommand,
    handleEditorChange,
    inputBlurHandler,
    applyStyle,
    applyBlockStyle,
    applyLink,
    hasError:
      didEdit && !validationFn(editorState.getCurrentContent().getPlainText()),
    isEmpty: !didEdit,
  };
};

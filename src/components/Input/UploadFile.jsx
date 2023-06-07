import React, { useRef, useState } from "react";
import TrashIcon from "../svg/TrashIcon.jsx";
import UploadIcon from "../svg/UploadIcon.jsx";
import RemoveIcon from "../svg/RemoveIcon.jsx";

export default function UploadFile() {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState();
  // ref
  const inputRef = useRef(null);

  const handleFile = (file) => {
    if (file && file.length > 0) {
      setFile(file[0]);
    }
  };

  // handle drag events
  const handleDrag = function (e) {
    e.preventDefault();
    e.stopPropagation();
    console.log("injaaaaa");
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // triggers when file is dropped
  const handleDrop = function (e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files);
    }
  };

  // triggers when file is selected with click
  const handleChange = function (e) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files);
    }
  };

  // triggers the input when the button is clicked
  const onButtonClick = () => {
    inputRef.current.click();
  };

  const deleteFile = () => {
    setFile(undefined);
  };

  return (
    <form
      className={"drop-container fa " + (dragActive ? "drag-active" : "")}
      method="post"
      encType="multipart/form-data"
      onDragEnter={handleDrag}
      onSubmit={(e) => e.preventDefault()}
      onClick={onButtonClick}
    >
      {!file && (
        <div className="before-drop">
          <span className="drop-title">فایل را اینجا رها کنید</span>
          یا
          <span className="">برای آپلود کلیک کنید</span>
          <input
            ref={inputRef}
            className="hidden"
            type="file"
            name="images"
            id="images"
            accept=".pdf"
            required
            onChange={handleChange}
          />
        </div>
      )}

      {file && (
        <div className="before-drop">
          <span>{file.name}</span>
          <div className="flex flex-row gap-2">
            <button
              className="btn btn-secondary p-1  gap-1"
              onClick={deleteFile}
            >
              <span class="material-symbols-outlined">delete</span>
              <span>حذف</span>
            </button>
            <button className="btn btn-primary p-1 gap-1" onClick={deleteFile}>
              <span class="material-symbols-outlined">upload</span>
              <span>آپلود</span>
            </button>
          </div>
        </div>
      )}

      {dragActive && (
        <div
          id="drag-file-element"
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        ></div>
      )}
    </form>
  );
}

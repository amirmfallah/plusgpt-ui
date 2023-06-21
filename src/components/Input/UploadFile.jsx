import React, { useEffect, useRef, useState } from "react";
import TrashIcon from "../svg/TrashIcon.jsx";
import UploadIcon from "../svg/UploadIcon.jsx";
import RemoveIcon from "../svg/RemoveIcon.jsx";
import {
  getSignedURL,
  uploadToS3,
  processFile,
} from "~/data-provider/data-service";
import { useQuery } from "@tanstack/react-query";
import { statusFile } from "~/data-provider/data-service";
import { MoonLoader, SyncLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import store from "~/store";
import { useAuthContext } from "~/hooks/AuthContext";

export default function UploadFile() {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState();
  const [key, setKey] = useState();
  const { user } = useAuthContext();
  const [error, setError] = useState("");

  const [processing, setProcessing] = useState(false);
  const [uploading, setUploading] = useState(false);

  const navigate = useNavigate();

  const { switchToConversation } = store.useConversation();

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
      setError(false);
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
    setError(false);
    inputRef.current?.click();
  };

  const deleteFile = () => {
    setFile(undefined);
    setError(false);
  };

  const resetUpload = () => {
    deleteFile();
    setKey();
    setError();
  };

  const uploadFile = async () => {
    setError(false);
    getSignedURL({
      contentType: "application/pdf",
    })
      .then(async (data) => {
        setKey(data.key);
        setUploading(true);

        const formData = new FormData();
        formData.append("Content-Type", file.type);
        formData.append("x-amz-meta-userid", user.id);
        Object.entries(data.fields).forEach(([k, v]) => {
          formData.append(k, v);
        });
        formData.append("file", file);

        await fetch(data.url, {
          method: "POST",
          body: formData,
        });

        await processFile({
          key: data.key,
        });

        setUploading(false);
        setProcessing(true);
      })
      .catch((e) => {
        console.log(e);
        if (e.response?.status == 401) {
          setError("شما بسته فعالی ندارید.");
        } else {
          setUploading(false);
          setError("خطا آپلود");
        }
      });
  };

  const res = useQuery(["status", key], async () => await statusFile(key), {
    refetchInterval: 5000,
    enabled: processing,
  });

  useEffect(() => {
    if (res.data) {
      if (res.data?.processed || res.data?.error) {
        setProcessing(false);
        setError("خطای ناشناخته رخ داد");
      }
      if (res.data?.processed) {
        switchToConversation(res.data?.conversation);
        navigate(`/chat/${res.data?.conversationId}`);
      }
    } else if (res.isError) {
      setProcessing(false);
      setError("خطای ناشناخته رخ داد");
    }
  }, [res.data, res.isError]);

  return (
    <form
      className={
        "drop-container fa  hover:bg-gray-100 dark:hover:bg-gray-800" +
        (dragActive ? "drag-active" : "")
      }
      method="post"
      encType="multipart/form-data"
      onDragEnter={handleDrag}
      onSubmit={(e) => e.preventDefault()}
      onClick={onButtonClick}
    >
      {!file && !processing && !uploading && !error && (
        <div className="before-drop">
          <span className="drop-title">فایل را اینجا رها کنید</span>
          یا
          <span className="">برای آپلود کلیک کنید</span>
          <span className="text-gray-400 text-xs">(ماکزیمم ۵ مگابایت)</span>
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

      {file && !processing && !uploading && !error && (
        <div className="before-drop">
          <span>{file.name}</span>
          <div className="flex flex-row gap-2">
            <button className="btn btn-primary p-1 gap-1" onClick={uploadFile}>
              <span className="material-symbols-rounded">upload</span>
              <span>آپلود</span>
            </button>
            <button
              className="btn btn-secondary p-1  gap-1"
              onClick={deleteFile}
            >
              <span className="material-symbols-rounded">delete</span>
              <span>حذف</span>
            </button>
          </div>
        </div>
      )}

      <SyncLoader
        color="#36d7b7"
        loading={processing || uploading}
        className="mb-3"
      />

      {processing && (
        <span className="font-semibold light:text-gray-900 mt-3">
          در حال پردازش فایل
        </span>
      )}
      {uploading && (
        <span className="font-semibold light:text-gray-900 mt-3">
          در حال آپلود کردن
        </span>
      )}
      {error && (
        <span className="rounded-md border border-red-500 bg-red-500/10 px-3 py-2 text-sm text-gray-600 dark:text-gray-100 fa">
          {error}
        </span>
      )}
      {error == "شما بسته فعالی ندارید." ? (
        <div className="btn btn-primary fa" onClick={() => navigate("/plans")}>
          برای خرید سرویس کلیک کنید
        </div>
      ) : (
        ""
      )}

      {error && (
        <span
          className="text-green-600 underline cursor-pointer"
          onClick={resetUpload}
        >
          بازگشت
        </span>
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
// fix usage_exceeded on pdf processing

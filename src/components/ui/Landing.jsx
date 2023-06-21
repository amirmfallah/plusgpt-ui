import React, { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import useDocumentTitle from "~/hooks/useDocumentTitle";
import Templates from "../ui/Templates";
import SunIcon from "../svg/SunIcon";
import LightningIcon from "../svg/LightningIcon";
import CautionIcon from "../svg/CautionIcon";
import ChatIcon from "../svg/ChatIcon";

import store from "~/store";
import UploadFile from "../Input/UploadFile.jsx";

export default function Landing() {
  const [showingTemplates, setShowingTemplates] = useState(false);
  const setText = useSetRecoilState(store.text);
  const conversation = useRecoilValue(store.conversation);
  const { title = "New Chat" } = conversation || {};

  useDocumentTitle(title);

  const clickHandler = (e) => {
    e.preventDefault();
    const { innerText } = e.target;
    const quote = innerText.split('"')[1].trim();
    setText(quote);
  };

  const showTemplates = (e) => {
    e.preventDefault();
    setShowingTemplates(!showingTemplates);
  };

  const red = () => {
    window.clzvvNIxHV("porsline-popup-iframe");
    window.showPopUp();
    window.getElementById("porsline-popup").classList.add("top");
  };

  return (
    <div className="flex h-full flex-col items-center overflow-y-auto pt-0 text-sm dark:bg-gray-800">
      <div className="w-full px-6 text-gray-800 dark:text-gray-100 md:flex md:max-w-2xl md:flex-col lg:max-w-3xl">
        <h1
          id="landing-title"
          className="mb-10 ml-auto mr-auto mt-6 flex items-center justify-center gap-2 text-center text-4xl font-semibold sm:mb-16 md:mt-[10vh] fa"
        >
          {import.meta.env.VITE_APP_TITLE || "پلاس جی‌پی‌تی"}
        </h1>
        <div className="items-start gap-3.5 text-center md:flex fa">
          <div className="mb-8 flex flex-1 flex-col gap-3.5 md:mb-auto">
            <h2 className="m-auto flex items-center gap-3 text-lg font-normal md:flex-col md:gap-2">
              <span className="material-symbols-rounded text-4xl">apps</span>
              نمونه{" "}
            </h2>
            <ul className="m-auto flex w-full flex-col gap-3.5 sm:max-w-md">
              <button
                onClick={clickHandler}
                className="w-full rounded-md bg-gray-50 p-3 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-gray-900"
              >
                &quot;پردازش کوانتومی را به زبان ساده توضیح بده&quot; →
              </button>
              <button
                onClick={clickHandler}
                className="w-full rounded-md bg-gray-50 p-3 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-gray-900"
              >
                &quot;نشانه های سرما خوردگی چه چیزهایی هستند؟&quot; →
              </button>
              <button
                onClick={clickHandler}
                className="w-full rounded-md bg-gray-50 p-3 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-gray-900"
              >
                &quot;کتاب دنیای سوفی را در یک پاراگراف خلاصه کن&quot; →
              </button>
            </ul>
          </div>

          {/* <div className="mb-8 flex flex-1 flex-col gap-3.5 md:mb-auto">
            <h2 className="m-auto flex items-center gap-3 text-lg font-normal md:flex-col md:gap-2 fa">
              <span className="material-symbols-rounded text-4xl">
                auto_detect_voice
              </span>{" "}
              فایل صوتی رو به متن یا جزوه تبدیل کن
            </h2>
            <ul className="m-auto flex w-full flex-col gap-3.5 sm:max-w-md">
              <li className="w-full rounded-md bg-gray-50 p-3 dark:bg-white/5">
                <UploadFile />
              </li>
            </ul>
          </div> */}

          <div className="mb-8 flex flex-1 flex-col gap-3.5 md:mb-auto">
            <h2 className="m-auto flex items-center gap-3 text-lg font-normal md:flex-col md:gap-2 fa">
              <span className="material-symbols-rounded text-4xl">
                description
              </span>
              از فایل متنی (PDF) سوال بپرس
            </h2>
            <ul className="m-auto flex w-full flex-col gap-3.5 sm:max-w-md">
              <li className="w-full rounded-md bg-gray-50 p-3 dark:bg-white/5">
                <UploadFile />
              </li>
            </ul>
            <button
              href="#porsline-popup"
              onClick={red}
              className="w-full rounded-md bg-gray-50 p-3 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-gray-900 flex flex-col items-center"
            >
              <span className="font-semibold mb-2">
                ثبت پیشنهاد برای این ویژگی
              </span>

              <span>این ویژگی به صورت آزمایشی در دسترس قرار گرفته است</span>
            </button>
          </div>
        </div>
        {/* {!showingTemplates && (
          <div className="mt-8 mb-4 flex flex-col items-center gap-3.5 md:mt-16">
            <button
              onClick={showTemplates}
              className="btn btn-neutral justify-center gap-2 border-0 md:border"
            >
              <ChatIcon />
              Show Prompt Templates
            </button>
          </div>
        )}
        {!!showingTemplates && <Templates showTemplates={showTemplates}/>} */}
        <div className="group h-32 w-full flex-shrink-0 dark:border-gray-900/50 dark:bg-gray-800 md:h-48" />
      </div>
    </div>
  );
}

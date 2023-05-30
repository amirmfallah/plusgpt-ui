import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function PaymentError() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const errorMsg = (code) => {
    if (code == -4) return "پرداخت لغو شده است";
    else return "سیستم پرداخت دچار مشکل شده است";
  };

  return (
    <div className="fa h-full">
      <div className="flex flex-col items-center overflow-y-auto pt-0 text-sm dark:bg-gray-800">
        <div className="w-1/3 rounded-md bg-gray-50 dark:bg-white/5 p-3 px-6 text-gray-800 dark:text-gray-100 md:flex md:max-w-2xl md:flex-col lg:max-w-3xl h-full">
          <h1
            id="landing-title"
            className="mb-10 ml-auto mr-auto mt-6 flex items-center justify-center gap-2 text-center text-4xl font-semibold sm:mb-16 md:mt-[10vh]"
          >
            تراکنش ناموفق
          </h1>
          <div className="items-start gap-3.5 text-center md:flex">
            <h2>{errorMsg(searchParams.get("code"))}</h2>
          </div>
          <button
            onClick={() => navigate("/")}
            className="btn btn-neutral justify-center gap-3 border-0 md:border w-30"
          >
            بازگشت
          </button>
        </div>
      </div>
    </div>
  );
}

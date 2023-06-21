import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="h-full w-full fa p-10 flex flex-col items-center md:justify-center lg:justify-center">
      <div className="w-full  text-gray-800 dark:text-gray-100 md:flex md:max-w-2xl md:flex-col lg:max-w-3xl">
        <div className="w-full flex flex-row justify-between content-center items-center mb-10">
          <h1
            id="pricing-title"
            className="flex items-center justify-center gap-2 text-center text-4xl font-semibold "
          >
            خطا ۴۰۴
          </h1>

          <div
            className="flex flex-row items-center text-green-600 hover:text-green-700 cursor-pointer"
            onClick={() => {
              navigate("/");
            }}
          >
            <span className="bold font-semibold">بازگشت</span>
            <span className="material-symbols-rounded">arrow_back_ios</span>
          </div>
        </div>
        <img src="/assets/404.svg" />
      </div>
    </div>
  );
}

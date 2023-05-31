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
    <div className="flex min-h-screen flex-col items-center justify-center bg-white pt-6 sm:pt-0 fa">
      <div className="mt-6 w-96 overflow-hidden bg-white px-6 py-4 sm:max-w-md sm:rounded-lg">
        <div className="mb-6 w-full flex flex-row justify-center ">
          <img src="/assets/logo.svg" alt="plusgpt" width={64} />
        </div>
        <h1 className="mb-4 text-center text-2xl font-semibold">خطا تراکنش</h1>
        <h1 className="mb-4 text-center text-xl">
          {errorMsg(searchParams.get("code"))}
        </h1>
        <p className="my-4 text-center text-sm font-light text-gray-700">
          <a href="/" className="p-1 text-green-500 hover:underline">
            بازگشت
          </a>
        </p>
      </div>
    </div>
  );
}

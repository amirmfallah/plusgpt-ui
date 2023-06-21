import React, { useEffect, useState } from "react";
import Plan from "./Plan";
import { useGetPlans } from "~/data-provider";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import store from "~/store";
import { useNavigate } from "react-router-dom";

export default function Plans() {
  const getPlans = useGetPlans();
  const [plans, setPlans] = useState([]);
  const [error, setError] = useState();
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (getPlans.data) {
      setPlans(getPlans.data);
    } else if (getPlans.isError) {
      console.error("Failed to get endpoints", getPlans.error);
    }
  }, [getPlans.isSuccess, getPlans.data, getPlans.isError]);

  return (
    <div className="h-full w-full fa p-10 flex flex-col items-center md:justify-center lg:justify-center">
      <div className="w-full  text-gray-800 dark:text-gray-100 md:flex md:max-w-2xl md:flex-col lg:max-w-3xl">
        <div className="w-full flex flex-row justify-between content-center items-center mb-10">
          <h1
            id="pricing-title"
            className="flex items-center justify-center gap-2 text-center text-4xl font-semibold "
          >
            قیمت گذاری
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
        {error && (
          <span className="rounded-md border border-red-500 bg-red-500/10 text-md text-gray-600 dark:text-gray-100 fa mb-4 p-5">
            {error == "Plan activation limit reached"
              ? "سرویس مجانی فقط می‌تواند یک بار فعال شود"
              : error}
          </span>
        )}
        <p className="text-right text-md light:text-gray-600">
          خدمات ما در قالب بسته های گوناگون قابل دسترسی هستند. در بسته های
          متفاوت، امکانات مختلفی ارائه شده است که با توجه به نیاز و میزان
          استفاده شما از هر بخش، میتوانید بسته ای را انتخاب و سفارش دهید.
        </p>
        <div className="items-start gap-3.5 text-center md:flex mt-10">
          {plans.map((plan) => {
            return (
              <Plan
                props={plan}
                setError={setError}
                processing={processing}
                setProcessing={setProcessing}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

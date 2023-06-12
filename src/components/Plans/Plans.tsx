import React, { useEffect, useState } from "react";
import Plan from "./Plan";
import { useGetPlans } from "~/data-provider";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import store from "~/store";
import { useNavigate } from "react-router-dom";

export default function Plans() {
  const getPlans = useGetPlans();
  const [plans, setPlans] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (getPlans.data) {
      setPlans(getPlans.data);
    } else if (getPlans.isError) {
      console.error("Failed to get endpoints", getPlans.error);
    }
  }, [getPlans.isSuccess, getPlans.data, getPlans.isError]);

  return (
    <div className="flex h-full flex-col items-center justify-center fa">
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
            <span className="material-symbols-outlined">arrow_back_ios</span>
          </div>
        </div>

        <p className="text-right text-md text-gray-600">
          خدمات ما در قالب بسته های گوناگون قابل دسترسی هستند. در بسته های
          متفاوت، امکانات مختلفی ارائه شده است که با توجه به نیاز و میزان
          استفاده شما از هر بخش، میتوانید بسته ای را انتخاب و سفارش دهید.
        </p>
        <div className="items-start gap-3.5 text-center md:flex mt-10">
          {plans.map((plan) => {
            return <Plan props={plan} />;
          })}
        </div>
      </div>
    </div>
  );
}

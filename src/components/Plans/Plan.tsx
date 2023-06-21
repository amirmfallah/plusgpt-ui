import React, { useEffect } from "react";
import LightningIcon from "../svg/LightningIcon.jsx";
import { useBuyPlan } from "~/data-provider";
import { useBuyPlanMutation } from "~/data-provider/react-query-service.js";

type Props = {
  _id: string;
  label: string;
  amount: number;
  description: string;
  metedata: Array<Object>;
  price: number;
};

export default function Plan({ props }) {
  const buyPlanMutaiton = useBuyPlanMutation();
  const clickHandler = (id) => {
    buyPlanMutaiton.mutate(
      { product_id: id },
      {
        onSuccess: (data) => {
          window.location.href = data.uri;
        },
        onError: () => {
          //setResetError(true);
        },
      }
    );
  };

  return (
    <div className="fa">
      <div className="mb-8 flex flex-1 flex-col gap-3.5 md:mb-auto">
        <h2 className="m-auto flex items-center gap-3 text-lg font-normal md:flex-col md:gap-2">
          <LightningIcon />
          {props.label}
        </h2>
        <ul className="m-auto flex w-full flex-col gap-3.5 sm:max-w-md">
          <li className="w-full rounded-md bg-gray-50 p-3 dark:bg-white/5">
            {props.description}
          </li>
          <li className="w-full rounded-md bg-gray-50 p-3 dark:bg-white/5">
            {`شامل ${props.amount} سوال از ChatGPT`}
          </li>
          <li className="w-full rounded-md bg-gray-50 p-3 dark:bg-white/5 fa">
            {`${props.price} تومان`}
          </li>
          <button
            onClick={() => clickHandler(props._id)}
            className="btn btn-primary justify-center gap-2 border-0 md:border"
          >
            خرید بسته
          </button>
        </ul>
      </div>
    </div>
  );
}

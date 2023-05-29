import React, { useEffect, useState } from 'react'
import LightningIcon from '../svg/LightningIcon.jsx'
import CautionIcon from '../svg/CautionIcon.jsx'
import SunIcon from '../svg/SunIcon.jsx'
import Plan from './Plan';

import { useGetPlans } from '~/data-provider';
import { getPlans } from '../../data-provider/react-query-service';

export default function Plans() {
  const getPlans = useGetPlans();
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    if (getPlans.data) {
      setPlans(getPlans.data);
    } else if (getPlans.isError) {
      console.error('Failed to get endpoints', getPlans.error);
    }
  }, [getPlans.isSuccess, getPlans.data, getPlans.isError]);

  return (
    <div className='fa'>
      <div className="flex h-full flex-col items-center overflow-y-auto pt-0 text-sm dark:bg-gray-800">
      <div className="w-full px-6 text-gray-800 dark:text-gray-100 md:flex md:max-w-2xl md:flex-col lg:max-w-3xl">
        <h1
          id="landing-title"
          className="mb-10 ml-auto mr-auto mt-6 flex items-center justify-center gap-2 text-center text-4xl font-semibold sm:mb-16 md:mt-[10vh]"
        >
          قیمت گذاری
        </h1>
      <div className="items-start gap-3.5 text-center md:flex">
      {
             plans.map((plan) => {
              return <Plan props={plan}/>
              })

      }
      </div>
    </div></div></div>
  )
}
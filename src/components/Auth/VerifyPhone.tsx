import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { TLoginUser } from "~/data-provider";
import { useNavigate, useSearchParams } from "react-router-dom";
import { TVerify, TSendOTP } from "~/data-provider/types";
import {
  useVerifyMutation,
  useSendOtpMutation,
} from "../../data-provider/react-query-service";
import { useAuthContext } from "~/hooks/AuthContext";

function Verify() {
  const [error, setError] = useState<string | undefined>();
  const [pending, setPending] = useState<boolean | undefined>(false);
  const [success, setSuccess] = useState<string | undefined>();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TVerify>();

  const verifyOtp = useVerifyMutation();
  const sendOtp = useSendOtpMutation();

  const verify = (data: TVerify) => {
    console.log(data);
    verifyOtp.mutate(data, {
      onSuccess: (payload) => {
        console.log(payload);
        navigate("/login");
      },
      onError: (error) => {
        if (error.response.status == 404) setError("کد وارد شده اشتباه است");

        setSuccess("");
      },
    });
  };

  const resend = () => {
    if (timeLeft != 0) {
      return;
    }
    setError("");
    sendOtp.mutate(undefined, {
      onSuccess: () => {
        setPending(false);
        setSuccess(`پیامک حاوی اطلاعات به شماره ${user.phone} ارسال شد`);
      },
      onError: (error) => {
        setPending(false);
        if (error.response.status == 400)
          setError("کد فعال سازی برای شما یکبار ارسال شده است");
        else setError("در هنگام ارسال کد فعال سازی خطای داخلی رخ داد");
        setSuccess(undefined);
      },
    });
  };
  const [timeLeft, setTimeLeft] = useState<number>(0);

  useEffect(() => {
    if (timeLeft != 0) return;
    if (!user) return;
    if (pending) return;
    setPending(true);
    resend();
    setTimeLeft(120);
  }, [user]);

  useEffect(() => {
    if (timeLeft === 0) {
      console.log("TIME LEFT IS 0");
      setTimeLeft(0);
    }
    if (!timeLeft) return;
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [timeLeft]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white pt-6 sm:pt-0 fa">
      <div className="mt-6 w-96 overflow-hidden bg-white px-6 py-4 sm:max-w-md sm:rounded-lg">
        <div className="mb-6 w-full flex flex-row justify-center ">
          <img src="/assets/logo.svg" alt="plusgpt" width={64} />
        </div>
        <h1 className="mb-4 text-center text-3xl font-semibold">
          فعال سازی حساب کاربری
        </h1>
        <h2 className="my-5 text-center text-sm text-gray-600">
          هم اکنون برای شما کد فعال سازی پیامک می‌شود.
        </h2>
        {error && (
          <div
            className="relative mt-4 rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700 fa"
            role="alert"
          >
            {error}
          </div>
        )}
        {success && (
          <div
            className="relative mt-4 rounded border border-green-400 bg-green-100 px-4 py-3 text-green-700"
            role="alert"
          >
            {success}
          </div>
        )}
        <form
          className="mt-6"
          aria-label="Login form"
          method="POST"
          onSubmit={handleSubmit((data) => verify(data))}
        >
          <div className="mb-2">
            <div className="relative">
              <input
                type="text"
                id="code"
                aria-label="Code"
                {...register("code", {
                  required: "این فیلد ضروری می‌باشد",
                  minLength: {
                    value: 5,
                    message: "طول کد فعال‌ سازی ۵ کاراکتر می‌باشد",
                  },
                  maxLength: {
                    value: 5,
                    message: "طول کد فعال‌ سازی ۵ کاراکتر می‌باشد",
                  },
                })}
                aria-invalid={!!errors.code}
                className="peer block w-full appearance-none rounded-t-md border-0 border-b-2 border-gray-300 bg-gray-50 px-2.5 pb-2.5 pt-5 text-sm text-gray-900 focus:border-green-500 focus:outline-none focus:ring-0"
                placeholder=" "
              ></input>
              <label
                htmlFor="code"
                className="absolute right-2.5 top-4 z-10 origin-[0] -translate-y-4 scale-75 transform text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-green-500"
              >
                کد فعال سازی
              </label>
            </div>

            {errors.code && (
              <span role="alert" className="mt-1 text-sm text-red-600">
                {/* @ts-ignore */}
                {errors.code.message}
              </span>
            )}
          </div>
          <div className="mt-6">
            <button
              aria-label="Sign in"
              type="submit"
              className="w-full transform rounded-sm bg-green-500 px-4 py-3 tracking-wide text-white transition-colors duration-200 hover:bg-green-600 focus:bg-green-600 focus:outline-none"
            >
              ادامه
            </button>
          </div>
        </form>
        <button
          aria-label="Sign in"
          className="btn btn-neutral justify-center border-0 md:border w-full mt-4 rounded-sm"
          style={{ padding: 12 }}
          onClick={() => {
            resend();
            setTimeLeft(120);
          }}
          disabled={timeLeft != 0}
        >
          {timeLeft == 0
            ? "ارسال مجدد"
            : `ارسال مجدد تا ${timeLeft} ثانیه دیگر`}
        </button>
        <p className="my-4 text-center text-sm font-light text-gray-700">
          {" "}
          اطلاعات اشتباه است؟{" "}
          <a
            href="/register"
            className="p-1 font-medium text-green-500 hover:underline"
          >
            ثبت نام مجدد
          </a>
        </p>
      </div>
    </div>
  );
}

export default Verify;

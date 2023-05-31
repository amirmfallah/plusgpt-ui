import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { TLoginUser } from "~/data-provider";
import { useNavigate, useSearchParams } from "react-router-dom";
import { TVerify, TSendOTP } from "~/data-provider/types";
import {
  useVerifyMutation,
  useSendOtpMutation,
} from "../../data-provider/react-query-service";

function Verify() {
  const [error, setError] = useState();
  const [success, setSuccess] = useState<string>();
  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();
  const phone = searchParams.get("phone");
  useEffect(() => {
    if (!phone) navigate("/login");
  }, [phone]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginUser>({
    defaultValues: {
      phone: phone,
    },
  });
  // useEffect(() => {
  //   if (isAuthenticated) {
  //     navigate("/chat/new");
  //   }
  // }, [isAuthenticated, navigate]);
  const verifyOtp = useVerifyMutation();
  const sendOtp = useSendOtpMutation();

  const verify = (data: TVerify) => {
    verifyOtp.mutate(data, {
      onSuccess: () => {
        navigate("/login");
      },
      onError: (error) => {
        setError(error.message);
        setSuccess("");
      },
    });
  };

  const resend = (data: TSendOTP) => {
    if (timeLeft != 0) {
      return;
    }
    sendOtp.mutate(data, {
      onSuccess: () => {
        setSuccess("A text message has been sent with verification code.");
      },
      onError: (error) => {
        setError(error.message);
        setSuccess("");
      },
    });
  };
  const [timeLeft, setTimeLeft] = useState<number>(0);

  useEffect(() => {
    resend({ phone: "09112475534" });
    setTimeLeft(120);
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      console.log("TIME LEFT IS 0");
      setTimeLeft(0);
    }

    // exit early when we reach 0
    if (!timeLeft) return;

    // save intervalId to clear the interval when the
    // component re-renders
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);
    // add timeLeft as a dependency to re-rerun the effect
    // when we update it
  }, [timeLeft]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white pt-6 sm:pt-0">
      <div className="mt-6 w-96 overflow-hidden bg-white px-6 py-4 sm:max-w-md sm:rounded-lg">
        <h1 className="mb-4 text-center text-3xl font-semibold">
          Verify Phone Number
        </h1>
        {error && (
          <div
            className="relative mt-4 rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700"
            role="alert"
          >
            Unable to login with the information provided. Please check your
            credentials and try again.
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
                  required: "Code is required",
                  minLength: {
                    value: 5,
                    message: "Code must be at least 5 characters",
                  },
                  maxLength: {
                    value: 5,
                    message: "Code must be less than 40 characters",
                  },
                })}
                aria-invalid={!!errors.code}
                className="peer block w-full appearance-none rounded-t-md border-0 border-b-2 border-gray-300 bg-gray-50 px-2.5 pb-2.5 pt-5 text-sm text-gray-900 focus:border-green-500 focus:outline-none focus:ring-0"
                placeholder=" "
              ></input>
              <label
                htmlFor="code"
                className="absolute left-2.5 top-4 z-10 origin-[0] -translate-y-4 scale-75 transform text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-green-500"
              >
                Code
              </label>
            </div>

            {errors.code && (
              <span role="alert" className="mt-1 text-sm text-red-600">
                {/* @ts-ignore */}
                {errors.code.message}
              </span>
            )}
          </div>
          <a
            className={
              "text-s" + (timeLeft == 0 ? "hover:underline text-green-500" : "")
            }
            onClick={() => {
              resend({ phone: phone });
              setTimeLeft(120);
            }}
          >
            {timeLeft == 0 ? "Resend" : timeLeft}
          </a>
          <div className="mt-6">
            <button
              aria-label="Sign in"
              type="submit"
              className="w-full transform rounded-sm bg-green-500 px-4 py-3 tracking-wide text-white transition-colors duration-200 hover:bg-green-600 focus:bg-green-600 focus:outline-none"
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Verify;

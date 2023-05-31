import { useState } from "react";
import { useForm } from "react-hook-form";
import { useResetPasswordMutation, TResetPassword } from "~/data-provider";
import { useNavigate, useSearchParams } from "react-router-dom";

function ResetPassword() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<TResetPassword>();
  const resetPassword = useResetPasswordMutation();
  const [resetError, setResetError] = useState<boolean>(false);
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const password = watch("password");

  const onSubmit = (data: TResetPassword) => {
    resetPassword.mutate(data, {
      onError: () => {
        setResetError(true);
      },
    });
  };

  if (resetPassword.isSuccess) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-white pt-6 sm:pt-0 fa">
        <div className="mt-6 w-96 overflow-hidden bg-white px-6 py-4 sm:max-w-md sm:rounded-lg">
          <div className="mb-6 w-full flex flex-row justify-center ">
            <img src="/assets/logo.svg" alt="plusgpt" width={64} />
          </div>
          <h1 className="mb-4 text-center text-3xl font-semibold">
            بازیابی رمز عبور
          </h1>
          <div
            className="relative mb-8 mt-4 rounded border border-green-400 bg-green-100 px-4 py-3 text-center text-green-700"
            role="alert"
          >
            رمز عبور با موفقیت به روز شد. با رمزعبور جدید وارد شوید.
          </div>
          <button
            onClick={() => navigate("/login")}
            aria-label="Sign in"
            className="w-full transform rounded-sm bg-green-500 px-4 py-3 tracking-wide text-white transition-colors duration-200 hover:bg-green-600 focus:bg-green-600 focus:outline-none"
          >
            ادامه
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-white pt-6 sm:pt-0 fa">
        <div className="mt-6 w-96 overflow-hidden bg-white px-6 py-4 sm:max-w-md sm:rounded-lg">
          <div className="mb-6 w-full flex flex-row justify-center ">
            <img src="/assets/logo.svg" alt="plusgpt" width={64} />
          </div>
          <h1 className="mb-4 text-center text-3xl font-semibold">
            تغییر رمز عبور
          </h1>
          {resetError && (
            <div
              className="relative mt-4 rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700"
              role="alert"
            >
              لینک ارسال شده منقضی شده است. .{" "}
              <a
                className="font-semibold text-green-600 hover:underline"
                href="/forgot-password"
              >
                دوباره تلاش کنید
              </a>{" "}
            </div>
          )}
          <form
            className="mt-6"
            aria-label="Password reset form"
            method="POST"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="mb-2">
              <div className="relative">
                <input
                  type="hidden"
                  id="token"
                  value={params.get("token")}
                  {...register("token", {
                    required: "Unable to process: No valid reset token",
                  })}
                />
                <input
                  type="hidden"
                  id="userId"
                  value={params.get("userId")}
                  {...register("userId", {
                    required: "Unable to process: No valid user id",
                  })}
                />
                <input
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  aria-label="Password"
                  {...register("password", {
                    required: "رمز عبور ضروری است",
                    minLength: {
                      value: 8,
                      message: "رمز عبور حداقل باید ۸ کاراکتر باشد",
                    },
                    maxLength: {
                      value: 40,
                      message: "رمز عبور حداقل باید حداکثر ۴۰ کاراکتر باشد",
                    },
                  })}
                  aria-invalid={!!errors.password}
                  className="peer block w-full appearance-none rounded-t-md border-0 border-b-2 border-gray-300 bg-gray-50 px-2.5 pb-2.5 pt-5 text-sm text-gray-900 focus:border-green-500 focus:outline-none focus:ring-0"
                  placeholder=" "
                ></input>
                <label
                  htmlFor="password"
                  className="absolute right-2.5 top-4 z-10 origin-[0] -translate-y-4 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-green-500"
                >
                  رمزعبور جدید
                </label>
              </div>

              {errors.password && (
                <span role="alert" className="mt-1 text-sm text-red-600">
                  {/* @ts-ignore */}
                  {errors.password.message}
                </span>
              )}
            </div>
            <div className="mb-2">
              <div className="relative">
                <input
                  type="password"
                  id="confirm_password"
                  aria-label="Confirm Password"
                  // uncomment to prevent pasting in confirm field
                  onPaste={(e) => {
                    e.preventDefault();
                    return false;
                  }}
                  {...register("confirm_password", {
                    validate: (value) =>
                      value === password || "رمز عبور و تکرار آن شباهت ندارند",
                  })}
                  aria-invalid={!!errors.confirm_password}
                  className="peer block w-full appearance-none rounded-t-md border-0 border-b-2 border-gray-300 bg-gray-50 px-2.5 pb-2.5 pt-5 text-sm text-gray-900 focus:border-green-500 focus:outline-none focus:ring-0"
                  placeholder=" "
                ></input>
                <label
                  htmlFor="confirm_password"
                  className="absolute right-2.5 top-4 z-10 origin-[0] -translate-y-4 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-green-500"
                >
                  تکرار رمزعبور جدید
                </label>
              </div>
              {errors.confirm_password && (
                <span role="alert" className="mt-1 text-sm text-red-600">
                  {/* @ts-ignore */}
                  {errors.confirm_password.message}
                </span>
              )}
              {errors.token && (
                <span role="alert" className="mt-1 text-sm text-red-600">
                  {/* @ts-ignore */}
                  {errors.token.message}
                </span>
              )}
              {errors.userId && (
                <span role="alert" className="mt-1 text-sm text-red-600">
                  {/* @ts-ignore */}
                  {errors.userId.message}
                </span>
              )}
            </div>
            <div className="mt-6">
              <button
                disabled={!!errors.password || !!errors.confirm_password}
                type="submit"
                aria-label="Submit registration"
                className="w-full transform rounded-sm bg-green-500 px-4 py-3 tracking-wide text-white transition-colors duration-200 hover:bg-green-600 focus:bg-green-600 focus:outline-none"
              >
                ادامه
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default ResetPassword;

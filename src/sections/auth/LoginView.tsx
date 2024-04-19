"use client";

import Button from "@/components/customize/atoms/button/Button";
import AuthTemplate from "@/components/customize/templates/AuthTemplate";
import { paths } from "@/routes/paths";
import { useRouter } from "next/navigation";
import React from "react";

function LoginView() {
  const push = useRouter().push;

  return (
    <AuthTemplate
      content={
        <div className="relative">
          <div className="absolute top-8 right-10 flex items-center gap-4">
            <p className="text-slate-500 text-base">Not a user yet?</p>
            <Button
              text="Register"
              btnStyle="outlined"
              onClick={() => push(paths.auth.register)}
            />
          </div>

          <div className="flex flex-col justify-center pl-20 pr-32 h-full gap-10">
            <div className="flex flex-col gap-4">
              <p className="text-teal-800 text-5xl font-extrabold">
                Hi, Welcome back!
              </p>
              <p className="text-slate-900 text-xl font-regular">
                Login to your account
              </p>
            </div>

            {/* TODO: integrate later */}
            <div>
              <form className="space-y-6 mb-[30px]">
                <div>
                  <label className="text-slate-900 text-sm font-medium">
                    Username
                  </label>
                  <input
                    type="text"
                    className="bg-white border border-slate-300 text-slate-900 focus:border-teal-600 text-sm rounded-lg block w-full px-3 py-2 transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="text-slate-900 text-sm font-medium">
                    Password
                  </label>
                  <input
                    type="password"
                    className="bg-white border border-slate-300 text-slate-900 focus:border-teal-600 text-sm rounded-lg block w-full px-3 py-2 transition-all"
                    required
                  />
                </div>
              </form>
              <Button text="Login" btnStyle="filled" />
            </div>
          </div>
        </div>
      }
    />
  );
}

export default LoginView;

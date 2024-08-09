import React from "react";
import Image from "next/image";
import { Logo } from "@/assets";
import { useStore } from "@/store";
import { observer } from "mobx-react-lite";
import { SaveButton } from "../Common";

const LoginComp = () => {
  const store = useStore();
  const loading = store?.user?.isLoading;
  const email = store?.user?.email;
  const password = store?.user?.password;
  const error = store?.user?.error;

  const handleNav = async () => {
    await store?.user?.signInWithEmail();
  };
  return (
    <section
      className=""
      style={{ background: "linear-gradient(to right, #c9d6ff, #e2e2e2)" }}
    >
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Image src={Logo} className="mx-auto h-24 w-auto mb-10" alt="Logo" />

        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Sign in to your account
            </h1>
            <div className="space-y-4 md:space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="name@company.com"
                  required
                  value={email}
                  onChange={(e) => (store.user.email = e?.target?.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  required
                  value={password}
                  onChange={(e) => (store.user.password = e?.target?.value)}
                />
              </div>
              {error && <div className="text-red-600 text-sm">{error}</div>}
              <div className="w-full">
                <SaveButton
                  loading={loading}
                  onClick={() => handleNav()}
                  text="Sign in"
                  fullButtonWidth={true}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const Login = observer(LoginComp);

"use client";

import React, { Fragment, useContext, useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { GrGithub } from "react-icons/gr";
import { RxCross1 } from "react-icons/rx";

import { signIn, useSession } from "next-auth/react";

import { LoginDialogContext } from "@/providers/contexts/LoginDialogContext";
import { Transition } from "@headlessui/react";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";

export const LoginDialog = () => {
  const { showDrawer, toggle } = useContext(LoginDialogContext);
  const { status } = useSession();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      setIsLoading(false);
    }
  }, [status]);

  const handleToggleDialog = () => {
    toggle();
  };

  const login = (provider: string) => {
    setIsLoading(true);

    signIn(provider, {
      callbackUrl: "/",
    });
  };

  return (
    <AlertDialogPrimitive.Root
      open={showDrawer}
      onOpenChange={handleToggleDialog}
    >
      <AlertDialogPrimitive.Portal forceMount>
        <Transition.Root show={showDrawer}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <AlertDialogPrimitive.Overlay
              forceMount
              className="fixed inset-0 z-20 bg-black/50"
            />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <AlertDialogPrimitive.Content
              forceMount
              className="fixed z-50 w-[95vw] max-w-md rounded-lg p-4 md:w-full top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] bg-gray-700 dark:bg-gray-800 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75 flex flex-col items-center"
            >
              <AlertDialogPrimitive.Cancel className="self-end focus:outline-none">
                <RxCross1 className="text-gray-400" />
              </AlertDialogPrimitive.Cancel>

              <AlertDialogPrimitive.Title>
                Choose how to login
              </AlertDialogPrimitive.Title>

              {isLoading ? (
                <svg
                  aria-hidden="true"
                  role="status"
                  className="inline w-10 h-10 my-10 text-purple-100 animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>
              ) : (
                <div className="flex flex-col gap-4 mt-10">
                  <button
                    disabled={isLoading}
                    className="flex items-center gap-5 w-96 text-gray-200 font-bold leading-[160%] bg-gray-600 py-5 px-6 rounded text-lg hover:bg-gray-500"
                    type="button"
                    onClick={() => login("google")}
                  >
                    <FcGoogle size={32} /> Login with Google
                  </button>

                  <button
                    disabled={isLoading}
                    className="flex items-center gap-5 w-96 text-gray-200 font-bold leading-[160%] bg-gray-600 py-5 px-6 rounded text-lg hover:bg-gray-500"
                    type="button"
                    onClick={() => login("github")}
                  >
                    <GrGithub size={32} className="fill-gray-100" /> Login with
                    GitHub
                  </button>
                </div>
              )}
            </AlertDialogPrimitive.Content>
          </Transition.Child>
        </Transition.Root>
      </AlertDialogPrimitive.Portal>
    </AlertDialogPrimitive.Root>
  );
};

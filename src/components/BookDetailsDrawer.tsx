/* eslint-disable jsx-a11y/label-has-associated-control */

"use client";

import React, { ReactNode, Fragment, useContext } from "react";

import clsx from "clsx";

import { ProductDrawer } from "@/providers/contexts/ProductDrawer";
import { Transition } from "@headlessui/react";
import * as DialogPrimitive from "@radix-ui/react-dialog";

export function BookDetailsDrawer(): ReactNode {
  const { showDrawer, toggle } = useContext(ProductDrawer);

  return (
    <DialogPrimitive.Root open={showDrawer} onOpenChange={toggle}>
      <DialogPrimitive.Portal forceMount>
        <Transition.Root show={showDrawer}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <DialogPrimitive.Overlay
              forceMount
              className="fixed inset-0 z-20 bg-black/50"
            />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <DialogPrimitive.Content
              forceMount
              className={clsx(
                "fixed z-50",
                "dark:bg-gray-800",
                "top-0 right-0 z-40 h-screen p-4 overflow-y-auto transition-transform bg-gray-700 w-[35%] dark:bg-gray-800"
              )}
            >
              <DialogPrimitive.Close
                className={clsx(
                  "absolute top-3.5 right-3.5 inline-flex items-center justify-center rounded-full p-1",
                  "focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
                )}
              />
            </DialogPrimitive.Content>
          </Transition.Child>
        </Transition.Root>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

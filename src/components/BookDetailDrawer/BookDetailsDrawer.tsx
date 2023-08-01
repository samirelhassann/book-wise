"use client";

import React, { ReactNode, Fragment, useContext } from "react";
import { RxCross1 } from "react-icons/rx";

import { ProductDrawerContext } from "@/providers/contexts/ProductDrawerContext";
import { Transition } from "@headlessui/react";
import * as DialogPrimitive from "@radix-ui/react-dialog";

import { BookDetail } from "./BookDetail";

export function BookDetailsDrawer(): ReactNode {
  const { showDrawer, toggle, bookId } = useContext(ProductDrawerContext);

  const handleToggleDrawer = () => {
    toggle("");
  };

  return (
    <DialogPrimitive.Root open={showDrawer} onOpenChange={handleToggleDrawer}>
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
              className="fixed dark:bg-gray-800 top-0 right-0 z-40 h-screen py-4 px-10 transition-transform bg-gray-700 w-[37%] flex flex-col overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-700 scrollbar-rounded-[20px]"
            >
              <DialogPrimitive.Close className="self-end mb-4 focus:outline-none">
                <RxCross1 className="text-gray-400" />
              </DialogPrimitive.Close>

              {!!bookId && <BookDetail bookId={bookId} />}
            </DialogPrimitive.Content>
          </Transition.Child>
        </Transition.Root>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

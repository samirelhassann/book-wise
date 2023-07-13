import tw from "tailwind-styled-components";

export const Container = tw.div`
    flex
    flex-col
    items-center
    justify-center
    gap-6
    xl:gap-56
    xl:flex-row my-7
`;

export const ImageContainer = tw.div`
    hidden
    xl:flex
    relative
    w-[41rem]
    h-[calc(100vh-3.5rem)]
`;

export const MobileImageContainer = tw.div`
    flex
    xl:hidden
    relative
    w-[calc(100vw-20px)]
    max-w-[400px]
    h-[200px]
`;

export const ButtonsContainer = tw.div`
    flex
    flex-col
    gap-10
    text-center
    xl:text-start
`;

export const WelcomeContainer = tw.div``;

export const WelcomeTitle = tw.h1`
    text-2xl
    font-bold
    leading-[140%]
    text-gray-100
`;

export const WelcomeSubtitle = tw.h2`
    text-base
    font-normal
    leadinng-[160%]
`;

export const ButtonsArea = tw.div`
    flex
    flex-col
    gap-4
`;

export const LoginButton = tw.button`
    flex
    items-center
    gap-5
    w-96
    text-gray-200
    font-bold
    leading-[160%]
    bg-gray-600
    py-5
    px-6
    rounded
    text-lg
    hover:bg-gray-500
`;

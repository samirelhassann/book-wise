import { MdOutlineStackedLineChart } from "react-icons/md";

import { getServerSession } from "next-auth";

import { DetailedCard } from "@/components/DetailedCard";
import { authOptions } from "@/lib/auth/auth";
import ListBooksRepository from "@/repository/ListBooksService";

export default async function Home() {
  const session = await getServerSession(authOptions);

  const books = await ListBooksRepository();

  const isLogged = !!session;

  return (
    <main className="flex flex-col gap-10 px-24 pt-20">
      <div className="flex items-center gap-3">
        <MdOutlineStackedLineChart size={32} className="fill-green-100" />
        <h1 className="font-bold leading-[140%] text-2xl text-gray-100">
          Início
        </h1>
      </div>

      <div className="flex gap-16 ">
        <div className="flex flex-col w-2/3 max-h-[82vh] gap-4 overflow-y-scroll no-scrollbar">
          <span className="text-base leading-[160%] text-gray-100">
            Recent ratings
          </span>

          <DetailedCard
            userImage="https://github.com/samirelhassann.png"
            userName="Samir El Hassan"
            bookName="test"
            bookDescription="lorem ipsum dolor sit amet consectetur adipisicing elit."
            BookCoverImage="https://a-static.mlcdn.com.br/800x560/to-kill-a-mockingbird/livrariainternacional/242448/21e8c3719e641ffeaeabbe508c05f24d.jpeg"
            authorName="Eu mesmo"
          />

          <DetailedCard
            userImage="https://github.com/samirelhassann.png"
            userName="Samir El Hassan"
            bookName="test"
            bookDescription="lorem ipsum dolor sit amet consectetur adipisicing elit."
            BookCoverImage="https://a-static.mlcdn.com.br/800x560/to-kill-a-mockingbird/livrariainternacional/242448/21e8c3719e641ffeaeabbe508c05f24d.jpeg"
            authorName="Eu mesmo"
          />

          <DetailedCard
            userImage="https://github.com/samirelhassann.png"
            userName="Samir El Hassan"
            bookName="test"
            bookDescription="lorem ipsum dolor sit amet consectetur adipisicing elit."
            BookCoverImage="https://a-static.mlcdn.com.br/800x560/to-kill-a-mockingbird/livrariainternacional/242448/21e8c3719e641ffeaeabbe508c05f24d.jpeg"
            authorName="Eu mesmo"
          />
        </div>

        <div className="flex flex-col w-1/3 gap-4">
          <span className="text-base leading-[160%] text-gray-100">
            Recent ratings
          </span>

          <div className="flex flex-col gap-3">
            <div className="h-5 bg-green-100 rounded " />
          </div>
        </div>
      </div>
    </main>
  );
}

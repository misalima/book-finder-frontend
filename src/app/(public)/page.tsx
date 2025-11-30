"use client";
import JumboImg from "@/components/JumboImg";
import BookSection from "@/components/BookSection";
import { useSession } from "next-auth/react";
import LoadingScreen from "@/components/LoadingScreen";
import { useRouter } from "next/navigation";

export default function App() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    // Session is loading
    return <LoadingScreen />;
  } else if (status === "authenticated") {
    router.push(`/user/${session.user.id}`);
  } else {

    return (
      <>
        <div className="w-full max-w-6xl mx-auto px-8 z-[99] flex flex-col pt-24 pb-4 items-start justify-center">
          <h1 className="max-w-xl text-white text-5xl font-semibold">
            Descubra, avalie e compartilhe seus livros favoritos.
          </h1>
          <h3 className="max-w-md text-white text-2xl mt-8">
            Sua próxima grande leitura está a um clique de distância.
          </h3>
          <button 
            onClick={() => router.push('/register')} 
            className="mt-8 bg-white px-12 py-3 rounded-lg text-lg font-semibold text-primary-green hover:bg-[#dddddd]"
          >
            Comece agora
          </button>
        </div>
        <JumboImg />
        <BookSection />
      </>
    );
  }
}

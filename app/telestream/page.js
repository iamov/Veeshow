"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Loading from "../Loading";
import { IoArrowBack } from "react-icons/io5";
import { useRouter } from 'nextjs-toploader/app';

function StreamContent() {
  const searchParams = useSearchParams();
  const link = searchParams.get("link");
  const router = useRouter();

  if (!link) return <div></div>;

  return (
    <div className=" h-[100dvh] w-[100vw]">
    <div className=" h-[15%] sm:h-[10%] flex items-center">
        <div
                  className='flex ml-5 text-4xl items-center cursor-pointer'
                  onClick={() => {               
                     window.open("https://poawooptugroo.com/4/8808782")
                    router.back();
                  }}
                >
                  <IoArrowBack />
        </div>
    </div>
   <div className=' h-[85%] sm:h-[90%] w-[100%]'>
        <section className='w-full h-full'>
          <iframe
            referrerPolicy="origin"
            className='w-full h-full select-none outline-none'
            src={link}
            title="video player"
            allowFullScreen
          ></iframe>
        </section>
      </div>
      </div>
  );
}

export default function TelestreamPage() {
  return (
    <Suspense fallback={<div><Loading/></div>}>
      <StreamContent />
    </Suspense>
  );
}

// 🚨 This tells Next.js not to prerender
export const dynamic = "force-dynamic";

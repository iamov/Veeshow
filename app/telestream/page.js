"use client";
import { useSearchParams } from "next/navigation";

export default function StreamPage() {
  const searchParams = useSearchParams();
  const link = searchParams.get("link"); // get ?link=...

  if (!link) {
    return <div>No link provided</div>;
  }

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <iframe
        src={link}
        width="100%"
        height="100%"
        allowFullScreen
        className="border-0"
      ></iframe>
    </div>
  );
}
